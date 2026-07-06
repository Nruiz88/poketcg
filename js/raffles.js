(function() {
  
  var container = document.getElementById('raffles-container');
  var loadingMsg = document.getElementById('loading-msg');
  var toastContainer = document.getElementById('toast-container');

  
  var allRaffles = []; window.allRaffles = allRaffles;
  var selectedRaffleId = null;
  var selectedNumbers = {}; // raffleId -> [nums]
  var raffleNumMap = {}; // raffleId -> {number: status}

  
  function escHtml(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function showToast(msg, type) {
    var el = document.createElement('div');
    el.className = 'toast ' + type;
    el.textContent = msg;
    toastContainer.appendChild(el);
    requestAnimationFrame(function() { el.classList.add('show'); });
    setTimeout(function() {
      el.classList.remove('show');
      setTimeout(function() { el.remove(); }, 300);
    }, 3000);
  }

  function formatPrice(n) {
    return '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  /* ===== LOAD RAFFLES ===== */
  function loadRaffles() {
    if (typeof firebase === 'undefined') {
      loadingMsg.innerHTML = '<p style="color:var(--text-dim);">Error: Firebase SDK no cargó. Serví los archivos con un servidor local (npx serve) en vez de abrirlos como archivo.</p>';
      return;
    }
    if (typeof db === 'undefined') {
      loadingMsg.innerHTML = '<p style="color:var(--text-dim);">Firebase no configurado. Revisá firebase-config.js</p>';
      return;
    }
    db.collection('raffles').where('status', '==', 'active').onSnapshot(function(snapshot) {
      allRaffles = [];
      snapshot.forEach(function(doc) { allRaffles.push({ id: doc.id, data: doc.data() }); });
      allRaffles.sort(function(a, b) { return (b.data.createdAt || 0) - (a.data.createdAt || 0); });
      if (allRaffles.length === 0) {
        container.innerHTML =
          '<div class="empty"><div class="icon">🎲</div><p>No hay rifas activas en este momento. Volvé pronto.</p></div>';
        return;
      }
      // Cargar números de cada rifa
      var promises = allRaffles.map(function(r) {
        return loadNumbersForRaffle(r.id);
      });
      Promise.all(promises).then(function() {
        renderRaffles();
      });
    }, function(err) {
      loadingMsg.innerHTML = '<p style="color:var(--red);">Error al cargar: ' + escHtml(err.message) + '</p>';
    });
  }

  function loadNumbersForRaffle(raffleId) {
    return db.collection('raffle_purchases')
      .where('raffleId', '==', raffleId)
      .get()
      .then(function(snapshot) {
        var map = {};
        snapshot.forEach(function(doc) {
          var d = doc.data();
          (d.numbers || []).forEach(function(n) {
            map[n] = d.status; // 'pending' | 'verified'
          });
        });
        raffleNumMap[raffleId] = map;
      });
  }

  
  function renderRaffles() {
    container.innerHTML = '<div class="raffle-list" id="raffle-list"></div>';
    var list = document.getElementById('raffle-list');
    allRaffles.forEach(function(r) {
      var d = r.data;
      var numMap = raffleNumMap[r.id] || {};
      var takenCount = Object.keys(numMap).length;
      var pct = Math.min(100, Math.round((takenCount / d.totalNumbers) * 100));
      var gridHtml = '';
      for (var i = 1; i <= d.totalNumbers; i++) {
        var status = numMap[i];
        var cls = 'num-cell';
        var sel = (selectedNumbers[r.id] || []).indexOf(i) !== -1;
        if (status === 'verified') cls += ' taken';
        else if (status === 'pending') cls += ' pending';
        else if (sel) cls += ' selected';
        gridHtml += '<div class="' + cls + '" data-raffle="' + r.id + '" data-num="' + i + '">' + i + '</div>';
      }
      var selNums = selectedNumbers[r.id] || [];
      var totalPrice = selNums.length * d.price;

      var card = document.createElement('div');
      card.className = 'raffle-card';
      card.innerHTML =
        '<div class="raffle-header">' +
          '<div class="info">' +
            '<h2>' + escHtml(d.title) + '</h2>' +
            '<p>' + escHtml(d.description || '') + '</p>' +
          '</div>' +
          '<div class="meta">' +
            '<div class="price">' + formatPrice(d.price) + ' c/u</div>' +
            '<div class="count">' + takenCount + '/' + d.totalNumbers + ' vendidos</div>' +
          '</div>' +
        '</div>' +
        '<div class="raffle-progress">' +
          '<div class="bar-track"><div class="fill" style="width:' + pct + '%;"></div></div>' +
          '<div class="stats"><span>' + pct + '% completado</span><span>' + (d.drawDate ? 'Sorteo: ' + new Date(d.drawDate.seconds * 1000).toLocaleDateString() : '') + '</span></div>' +
        '</div>' +
        '<div class="grid-section">' +
          '<div class="number-grid">' + gridHtml + '</div>' +
          '<div class="grid-legend">' +
            '<span><span class="dot avail"></span> Disponible</span>' +
            '<span><span class="dot sel"></span> Seleccionado</span>' +
            '<span><span class="dot pend"></span> Pendiente</span>' +
            '<span><span class="dot taken"></span> Vendido</span>' +
          '</div>' +
        '</div>' +
        '<div class="purchase-panel' + (selNums.length > 0 ? ' open' : '') + '" data-panel="' + r.id + '">' +
          '<div class="summary">' +
            '<div class="nums">' + (selNums.length > 0 ? 'Números: ' + selNums.join(', ') : 'Seleccioná números arriba') + '</div>' +
            '<div class="total">' + (selNums.length > 0 ? 'Total: ' + formatPrice(totalPrice) : '') + '</div>' +
          '</div>' +
          '<div id="purchase-form-' + r.id + '">' +
            (selNums.length > 0 ? buildPurchaseForm(r) : '') +
          '</div>' +
        '</div>';
      list.appendChild(card);
    });

    // Attach events
    document.querySelectorAll('.num-cell:not(.taken):not(.pending)').forEach(function(el) {
      el.addEventListener('click', function() {
        var rid = el.getAttribute('data-raffle');
        var num = parseInt(el.getAttribute('data-num'), 10);
        toggleNumber(rid, num);
      });
    });
  }

  function buildPurchaseForm(r) {
    var d = r.data;
    return (
      '<div class="form-grid">' +
        '<label>Nombre <input type="text" id="p-name-' + r.id + '" placeholder="Tu nombre" required autocomplete="off"></label>' +
        '<label>WhatsApp <input type="text" id="p-phone-' + r.id + '" placeholder="11 1234 5678" required autocomplete="off"></label>' +
        '<div class="full payment-info">' +
          '<strong>Datos para transferir</strong>' +
          '<div class="data-row"><span>Alias</span><span><code id="alias-display">POKETCG.ALIAS</code><button class="copy-btn" onclick="copyText(\'POKETCG.ALIAS\')">Copiar</button></span></div>' +
          '<div class="data-row"><span>CBU</span><span><code id="cbu-display">0000000000000000000000</code><button class="copy-btn" onclick="copyText(\'0000000000000000000000\')">Copiar</button></span></div>' +
          '<div style="font-size:0.7rem;color:var(--text-dim);margin-top:0.5rem;">💡 Transferí el monto exacto y subí el comprobante abajo.</div>' +
        '</div>' +
        '<div class="full upload-area">' +
          '<label class="upload-label" id="upload-label-' + r.id + '">' +
            '<input type="file" accept="image/*" onchange="handleFileUpload(event, \'' + r.id + '\')">' +
            '<span id="upload-text-' + r.id + '">📷 Subir comprobante de pago</span>' +
          '</label>' +
        '</div>' +
        '<div class="full" style="display:flex;gap:0.5rem;">' +
          '<button class="btn btn-primary" onclick="submitPurchase(\'' + r.id + '\')" id="btn-submit-' + r.id + '">Confirmar y participar</button>' +
          '<button class="btn btn-secondary" onclick="clearSelection(\'' + r.id + '\')">Limpiar</button>' +
        '</div>' +
      '</div>'
    );
  }

  
  window.toggleNumber = function(raffleId, num) {
    if (!selectedNumbers[raffleId]) selectedNumbers[raffleId] = [];
    var arr = selectedNumbers[raffleId];
    var idx = arr.indexOf(num);
    if (idx !== -1) { arr.splice(idx, 1); }
    else { arr.push(num); }
    renderRaffles();
  };

  window.clearSelection = function(raffleId) {
    selectedNumbers[raffleId] = [];
    renderRaffles();
  };

  // File upload handler
  window.pendingFiles = {};
  window.handleFileUpload = function(e, raffleId) {
    var file = e.target.files[0];
    if (!file) return;
    window.pendingFiles[raffleId] = file;
    var label = document.getElementById('upload-label-' + raffleId);
    if (label) {
      label.classList.add('has-file');
      label.querySelector('span').textContent = '✅ ' + file.name;
    }
  };

  // Copy
  window.copyText = function(text) {
    navigator.clipboard.writeText(text).then(function() {
      showToast('✓ Copiado', 'success');
    });
  };

  
  window.submitPurchase = function(raffleId) {
    var nums = selectedNumbers[raffleId];
    if (!nums || nums.length === 0) {
      showToast('Seleccioná al menos un número', 'error');
      return;
    }
    var name = document.getElementById('p-name-' + raffleId);
    var phone = document.getElementById('p-phone-' + raffleId);
    if (!name.value.trim()) { showToast('Ingresá tu nombre', 'error'); name.focus(); return; }
    if (!phone.value.trim()) { showToast('Ingresá tu WhatsApp', 'error'); phone.focus(); return; }

    var file = window.pendingFiles[raffleId];
    if (!file) { showToast('Subí el comprobante de pago', 'error'); return; }

    // Buscar la rifa para obtener el precio
    var raffle = allRaffles.find(function(r) { return r.id === raffleId; });
    if (!raffle) {
      showToast('Error: rifa no encontrada', 'error');
      return;
    }

    var btn = document.getElementById('btn-submit-' + raffleId);
    btn.disabled = true;
    btn.textContent = 'Procesando…';

    // Convertir imagen a base64
    var reader = new FileReader();
    reader.onload = function(e) {
      var base64 = e.target.result;

      db.collection('raffle_purchases').add({
        raffleId: raffleId,
        numbers: nums,
        userName: name.value.trim(),
        userPhone: phone.value.trim(),
        total: nums.length * raffle.data.price,
        paymentProof: base64,
        status: 'pending',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }).then(function(ref) {
        document.getElementById('order-code-display').textContent = ref.id;
        document.getElementById('success-modal').classList.add('open');
        delete window.pendingFiles[raffleId];
        selectedNumbers[raffleId] = [];
        renderRaffles();
      }).catch(function(err) {
        console.error('Error en submitPurchase:', err);
        showToast('Error: ' + err.message, 'error');
        btn.disabled = false;
        btn.textContent = 'Confirmar y participar';
      });
    };
    reader.onerror = function() {
      showToast('Error al leer el archivo', 'error');
      btn.disabled = false;
      btn.textContent = 'Confirmar y participar';
    };
    reader.readAsDataURL(file);
  };

  
  window.closeModal = function() {
    document.getElementById('success-modal').classList.remove('open');
  };

  window.closeTrackingModal = function() {
    document.getElementById('tracking-modal').classList.remove('open');
  };

  
  window.openTracking = function() {
    document.getElementById('tracking-input').value = '';
    document.getElementById('tracking-result').innerHTML = '';
    document.getElementById('tracking-section').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('tracking-input').focus();
  };

  window.trackOrder = function() {
    var code = document.getElementById('tracking-input').value.trim();
    if (!code) { showToast('Ingresá un código', 'error'); return; }
    if (typeof db === 'undefined') { showToast('Firebase no disponible', 'error'); return; }

    db.collection('raffle_purchases').doc(code).get().then(function(doc) {
      if (!doc.exists) {
        showToast('Código no encontrado', 'error');
        return;
      }
      var d = doc.data();
      var statusMap = { pending: '⏳ Pendiente de verificación', verified: '✅ Verificado', cancelled: '❌ Cancelado' };
      var statusText = statusMap[d.status] || d.status;

      // Buscar nombre de la rifa
      var raffleTitle = 'Rifa #' + d.raffleId;
      if (allRaffles.length > 0) {
        var found = allRaffles.find(function(r) { return r.id === d.raffleId; });
        if (found) raffleTitle = found.data.title;
      }

      var html =
        '<div style="margin-bottom:0.75rem;"><strong>Estado:</strong> ' + statusText + '</div>' +
        '<div style="margin-bottom:0.5rem;"><strong>Rifa:</strong> ' + escHtml(raffleTitle) + '</div>' +
        '<div style="margin-bottom:0.5rem;"><strong>Números:</strong> ' + (d.numbers || []).join(', ') + '</div>' +
        '<div style="margin-bottom:0.5rem;"><strong>Nombre:</strong> ' + escHtml(d.userName || '') + '</div>' +
        '<div style="margin-bottom:0.5rem;"><strong>WhatsApp:</strong> ' + escHtml(d.userPhone || '') + '</div>' +
        '<div style="margin-bottom:0.5rem;"><strong>Total:</strong> ' + formatPrice(d.total || 0) + '</div>';

      if (d.status === 'verified') {
        html += '<div style="margin-top:0.75rem;padding:0.75rem;background:rgba(58,170,53,0.1);border-radius:6px;color:#6c6;">✅ Pago verificado — estás participando. ¡Buena suerte!</div>';
      } else if (d.status === 'pending') {
        html += '<div style="margin-top:0.75rem;padding:0.75rem;background:rgba(255,203,5,0.06);border-radius:6px;color:var(--yellow);">⏳ Estamos revisando tu pago. Te confirmamos por WhatsApp a la brevedad.</div>';
      }

      document.getElementById('tracking-detail').innerHTML = html;
      document.getElementById('tracking-modal').classList.add('open');
    }).catch(function(err) {
      showToast('Error: ' + err.message, 'error');
    });
  };

  // Cerrar modales con Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
      closeTrackingModal();
    }
  });

  // Cerrar modal clickeando fuera
  document.querySelectorAll('.modal-overlay').forEach(function(el) {
    el.addEventListener('click', function(e) {
      if (e.target === el) {
        el.classList.remove('open');
      }
    });
  });

  
  loadRaffles();
})();
