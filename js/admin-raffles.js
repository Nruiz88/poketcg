(function() {
  var raffleForm = document.getElementById('raffle-form');
  var rfTitle = document.getElementById('rf-title');
  var rfDesc = document.getElementById('rf-desc');
  var rfPrice = document.getElementById('rf-price');
  var rfTotal = document.getElementById('rf-total');
  var rfPrize = document.getElementById('rf-prize');
  var rfDate = document.getElementById('rf-date');
  var rfAlias = document.getElementById('rf-alias');
  var rfCbu = document.getElementById('rf-cbu');
  var editRaffleId = document.getElementById('edit-raffle-id');
  var raffleFormPanel = document.getElementById('raffle-form-panel');
  var raffleFormTitle = document.getElementById('raffle-form-title');
  var btnSaveRaffle = document.getElementById('btn-save-raffle');

  var editingRaffleId = null;

  window.showRaffleForm = function() {
    editingRaffleId = null;
    editRaffleId.value = '';
    raffleForm.reset();
    raffleFormTitle.textContent = 'Nueva rifa';
    btnSaveRaffle.textContent = 'Guardar rifa';
    raffleFormPanel.style.display = 'block';
    raffleFormPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    rfTitle.focus();
  };

  window.hideRaffleForm = function() {
    raffleFormPanel.style.display = 'none';
  };

  raffleForm.addEventListener('submit', function(e) {
    e.preventDefault();

    var data = {
      title: rfTitle.value.trim(),
      description: rfDesc.value.trim(),
      price: parseFloat(rfPrice.value) || 0,
      totalNumbers: parseInt(rfTotal.value, 10) || 100,
      prize: rfPrize.value.trim(),
      alias: rfAlias.value.trim() || 'POKETCG.ALIAS',
      cbu: rfCbu.value.trim() || '0000000000000000000000',
      status: 'active',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    if (rfDate.value) {
      data.drawDate = firebase.firestore.Timestamp.fromDate(new Date(rfDate.value + 'T23:59:59'));
    }

    btnSaveRaffle.disabled = true;
    btnSaveRaffle.textContent = 'Guardando\u2026';

    var save;
    if (editingRaffleId) {
      save = db.collection('raffles').doc(editingRaffleId).update(data);
    } else {
      save = db.collection('raffles').add(data);
    }

    save.then(function() {
      showToast(editingRaffleId ? 'Rifa actualizada' : 'Rifa creada', 'success');
      hideRaffleForm();
      loadRafflesAdmin();
    }).catch(function(err) {
      showToast('Error: ' + err.message, 'error');
    }).then(function() {
      btnSaveRaffle.disabled = false;
      btnSaveRaffle.textContent = editingRaffleId ? 'Actualizar rifa' : 'Guardar rifa';
    });
  });

  window.loadRafflesAdmin = function() {
    var list = document.getElementById('raffles-admin-list');
    list.innerHTML = '<div class="raffle-empty">Cargando rifas\u2026</div>';

    db.collection('raffles').orderBy('createdAt', 'desc').get().then(function(snapshot) {
      var raffles = [];
      snapshot.forEach(function(doc) { raffles.push({ id: doc.id, data: doc.data() }); });

      if (raffles.length === 0) {
        list.innerHTML = '<div class="raffle-empty">No hay rifas todav\u00EDa. Cre\u00E1 la primera.</div>';
        return;
      }

      list.innerHTML = '';
      raffles.forEach(function(r) {
        var d = r.data;
        var statusBadge = '<span class="badge ' + d.status + '">' + d.status + '</span>';
        var drawDate = d.drawDate ? new Date(d.drawDate.seconds * 1000).toLocaleDateString() : 'Sin fecha';

        var card = document.createElement('div');
        card.className = 'raffle-admin-card';
        card.innerHTML =
          '<div class="top">' +
            '<div><h4>' + escHtml(d.title) + '</h4></div>' +
            '<div>' + statusBadge + '</div>' +
          '</div>' +
          '<div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:0.5rem;">' +
            escHtml(d.description || '') +
          '</div>' +
          '<div style="font-size:0.75rem;color:var(--text-dim);margin-bottom:0.75rem;">' +
            'Precio: <strong>$' + d.price.toFixed(2) + '</strong> | ' +
            'N\u00FAmeros: ' + d.totalNumbers + ' | ' +
            'Sorteo: ' + drawDate +
          '</div>' +
          '<div id="purchases-' + r.id + '"><div class="raffle-empty">Cargando compras\u2026</div></div>' +
          '<div style="margin-top:0.5rem;display:flex;gap:0.3rem;flex-wrap:wrap;">' +
            '<button class="btn-sm" onclick="editRaffle(\'' + r.id + '\')">\u270E Editar</button> ' +
            (d.status === 'active' ? '<button class="btn-sm draw" onclick="drawWinner(\'' + r.id + '\')">\uD83C\uDFB2 Sortear</button> ' : '') +
            '<button class="btn-sm danger" onclick="deleteRaffle(\'' + r.id + '\')">\u2715 Eliminar</button>' +
          '</div>';

        list.appendChild(card);

        loadPurchases(r.id, d);
      });
    }).catch(function(err) {
      document.getElementById('raffles-admin-list').innerHTML =
        '<div class="raffle-empty">Error: ' + escHtml(err.message) + '</div>';
    });
  };

  function loadPurchases(raffleId, raffleData) {
    var container = document.getElementById('purchases-' + raffleId);
    db.collection('raffle_purchases')
      .where('raffleId', '==', raffleId)
      .get()
      .then(function(snapshot) {
        var purchases = [];
        snapshot.forEach(function(doc) { purchases.push({ id: doc.id, data: doc.data() }); });

        if (purchases.length === 0) {
          container.innerHTML = '<div class="raffle-empty" style="padding:0.5rem;">Sin compras a\u00FAn</div>';
          return;
        }

        container.innerHTML = '';
        purchases.forEach(function(p) {
          var d = p.data;
          var statusText = { pending: '\u23F3 Pendiente', verified: '\u2705 Verificado', cancelled: '\u274C Cancelado' }[d.status] || d.status;
          var item = document.createElement('div');
          item.className = 'purchase-item';
          item.innerHTML =
            '<div class="info">' +
              '<strong>' + escHtml(d.userName || '\u2014') + '</strong>' +
              '<span>' + escHtml(d.userPhone || '') + ' \u00B7 N\u00FAmeros: ' + (d.numbers || []).join(', ') + ' \u00B7 $' + (d.total || 0).toFixed(2) + '</span>' +
              '<span style="display:block;font-size:0.7rem;color:var(--text-dim);margin-top:0.2rem;">' + statusText + '</span>' +
              (d.paymentProof ? '<a href="' + d.paymentProof + '" target="_blank" style="font-size:0.7rem;color:var(--yellow);">\uD83D\uDCF7 Ver comprobante</a>' : '') +
            '</div>' +
            '<div class="actions">' +
              (d.status === 'pending' ? '<button class="btn-sm verify" onclick="verifyPayment(\'' + p.id + '\')">\u2713 Verificar</button> <button class="btn-sm danger" onclick="cancelPurchase(\'' + p.id + '\')">\u2715</button>' : '') +
            '</div>';
          container.appendChild(item);
        });
      }).catch(function() {
        container.innerHTML = '<div class="raffle-empty">Error al cargar compras</div>';
      });
  }

  window.editRaffle = function(id) {
    db.collection('raffles').doc(id).get().then(function(doc) {
      if (!doc.exists) return;
      var d = doc.data();
      editingRaffleId = id;
      editRaffleId.value = id;
      rfTitle.value = d.title || '';
      rfDesc.value = d.description || '';
      rfPrice.value = d.price || '';
      rfTotal.value = d.totalNumbers || '';
      rfPrize.value = d.prize || '';
      rfAlias.value = d.alias || '';
      rfCbu.value = d.cbu || '';
      if (d.drawDate) {
        var dt = new Date(d.drawDate.seconds * 1000);
        rfDate.value = dt.toISOString().split('T')[0];
      } else {
        rfDate.value = '';
      }
      raffleFormTitle.textContent = 'Editar rifa';
      btnSaveRaffle.textContent = 'Actualizar rifa';
      raffleFormPanel.style.display = 'block';
      raffleFormPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      rfTitle.focus();
    });
  };

  window.deleteRaffle = function(id) {
    if (!confirm('\u00BFEliminar esta rifa? Se eliminar\u00E1n tambi\u00E9n todas las compras asociadas.')) return;
    db.collection('raffles').doc(id).delete().then(function() {
      showToast('Rifa eliminada', 'success');
      loadRafflesAdmin();
    }).catch(function(err) {
      showToast('Error: ' + err.message, 'error');
    });
  };

  window.verifyPayment = function(purchaseId) {
    if (!confirm('\u00BFVerificar pago? Los n\u00FAmeros quedar\u00E1n confirmados.')) return;
    db.collection('raffle_purchases').doc(purchaseId).update({
      status: 'verified',
      verifiedAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function() {
      showToast('Pago verificado', 'success');
      loadRafflesAdmin();
    }).catch(function(err) {
      showToast('Error: ' + err.message, 'error');
    });
  };

  window.cancelPurchase = function(purchaseId) {
    if (!confirm('\u00BFCancelar esta compra?')) return;
    db.collection('raffle_purchases').doc(purchaseId).update({
      status: 'cancelled'
    }).then(function() {
      showToast('Compra cancelada', 'success');
      loadRafflesAdmin();
    }).catch(function(err) {
      showToast('Error: ' + err.message, 'error');
    });
  };

  window.drawWinner = function(raffleId) {
    if (!confirm('\u00BFRealizar sorteo? Esto seleccionar\u00E1 un n\u00FAmero ganador al azar entre los vendidos.')) return;
    db.collection('raffle_purchases')
      .where('raffleId', '==', raffleId)
      .where('status', '==', 'verified')
      .get()
      .then(function(snapshot) {
        var allNums = [];
        var purchaseMap = {};
        snapshot.forEach(function(doc) {
          var d = doc.data();
          (d.numbers || []).forEach(function(n) {
            allNums.push(n);
            purchaseMap[n] = { purchaseId: doc.id, userName: d.userName, userPhone: d.userPhone };
          });
        });

        if (allNums.length === 0) {
          showToast('No hay n\u00FAmeros vendidos para sortear', 'error');
          return;
        }

        var winnerNum = allNums[Math.floor(Math.random() * allNums.length)];
        var winner = purchaseMap[winnerNum];

        db.collection('raffle_winners').add({
          raffleId: raffleId,
          number: winnerNum,
          userName: winner.userName,
          userPhone: winner.userPhone,
          drawnAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(function() {
          return db.collection('raffles').doc(raffleId).update({ status: 'drawn' });
        }).then(function() {
          showToast('\uD83C\uDF89 Ganador: N\u00B0 ' + winnerNum + ' \u2014 ' + winner.userName, 'success');
          loadRafflesAdmin();
        });
      }).catch(function(err) {
        showToast('Error: ' + err.message, 'error');
      });
  };
})();
