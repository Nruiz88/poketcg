(function() {
  var cardForm = document.getElementById('card-form');
  var editId = document.getElementById('edit-id');
  var fName = document.getElementById('f-name');
  var fSet = document.getElementById('f-set');
  var fRarity = document.getElementById('f-rarity');
  var fType = document.getElementById('f-type');
  var fPrice = document.getElementById('f-price');
  var fImage = document.getElementById('f-image');
  var previewWrap = document.getElementById('upload-preview');
  var previewImg = document.getElementById('preview-img');
  var removeImgBtn = document.getElementById('remove-img');
  var btnSubmit = document.getElementById('btn-submit');
  var btnSubmitText = document.getElementById('btn-submit-text');
  var btnCancel = document.getElementById('btn-cancel');
  var formTitle = document.getElementById('form-title');
  var formIcon = document.getElementById('form-icon');
  var tbody = document.getElementById('cards-tbody');
  var emptyMsg = document.getElementById('empty-msg');
  var tableCount = document.getElementById('table-count');
  var statTotal = document.getElementById('stat-total');
  var statRarity = document.getElementById('stat-rarity');
  var statValue = document.getElementById('stat-value');
  var searchInput = document.getElementById('search-input');
  var filteredDocs = [];

  var editingId = null;
  var cardsRef = db.collection('cards');
  var unsubscribe = null;
  var allDocs = [];
  var pendingImageBase64 = null;
  var existingImageUrl = null;

  var typeIcons = {
    electric: '\u26A1', fire: '\uD83D\uDD25', water: '\uD83D\uDCA7', grass: '\uD83C\uDF31',
    psychic: '\uD83C\uDF00', dark: '\uD83C\uDF19', dragon: '\uD83D\uDC09', metal: '\u2699\uFE0F'
  };

  fImage.addEventListener('change', function() {
    var file = fImage.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
      pendingImageBase64 = e.target.result;
      previewImg.src = pendingImageBase64;
      previewWrap.style.display = 'block';
    };
    reader.readAsDataURL(file);
  });

  removeImgBtn.addEventListener('click', function() {
    fImage.value = '';
    pendingImageBase64 = null;
    previewWrap.style.display = 'none';
  });

  function rarityLabel(r) {
    return { rare: 'Rare', ultra: 'Ultra', secret: 'Secret', sar: 'SAR' }[r] || r;
  }

  function rarityClass(r) {
    return { rare: 'rare', ultra: 'ultra', secret: 'secret', sar: 'sar' }[r] || '';
  }

  function filterCards() {
    var q = searchInput.value.toLowerCase().trim();
    if (!q) { filteredDocs = allDocs.slice(); return; }
    filteredDocs = allDocs.filter(function(doc) {
      var d = doc.data;
      return (d.name && d.name.toLowerCase().indexOf(q) !== -1) ||
             (d.setName && d.setName.toLowerCase().indexOf(q) !== -1) ||
             (d.rarity && d.rarity.toLowerCase().indexOf(q) !== -1) ||
             (d.type && d.type.toLowerCase().indexOf(q) !== -1);
    });
  }

  function renderTable(docs) {
    tableCount.textContent = '(' + docs.length + ')';

    if (docs.length === 0) {
      tbody.innerHTML = '';
      emptyMsg.style.display = 'block';
      return;
    }
    emptyMsg.style.display = 'none';

    tbody.innerHTML = docs.map(function(doc) {
      var d = doc.data;
      var thumb = d.imageUrl
        ? '<img class="cell-thumb" src="' + d.imageUrl + '" alt="" loading="lazy">'
        : '<span class="cell-thumb" style="display:inline-flex;align-items:center;justify-content:center;font-size:0.6rem;color:var(--text-dim);">\u2014</span>';
      var typeIcon = typeIcons[d.type] || '\u2753';
      return (
        '<tr>' +
          '<td>' + thumb + '</td>' +
          '<td style="color:var(--text-dim);font-size:0.7rem;">#' + String(d.id).padStart(3, '0') + '</td>' +
          '<td><span class="cell-name">' + escHtml(d.name) + '</span></td>' +
          '<td><span class="cell-set">' + escHtml(d.setName) + '</span></td>' +
          '<td><span class="cell-type" title="' + escHtml(d.type || '') + '">' + typeIcon + '</span></td>' +
          '<td><span class="cell-rarity rarity-badge ' + rarityClass(d.rarity) + '">' + rarityLabel(d.rarity) + '</span></td>' +
          '<td><span class="cell-price">$' + d.price.toFixed(2) + '</span></td>' +
          '<td><div class="cell-actions">' +
            '<button class="btn-icon" onclick="editCard(\'' + doc.id + '\')" title="Editar">\u270E</button>' +
            '<button class="btn-icon delete" onclick="deleteCard(\'' + doc.id + '\')" title="Eliminar">\u2715</button>' +
          '</div></td>' +
        '</tr>'
      );
    }).join('');
  }

  function updateStats(docs) {
    statTotal.textContent = docs.length;

    var setMap = {};
    var totalVal = 0;
    docs.forEach(function(d) {
      setMap[d.data.setName] = true;
      totalVal += d.data.price || 0;
    });
    statRarity.textContent = Object.keys(setMap).length;
    statValue.textContent = '$' + totalVal.toFixed(0);
  }

  function refreshView() {
    filterCards();
    renderTable(filteredDocs);
    updateStats(allDocs);
  }

  window.loadCards = function() {
    if (unsubscribe) unsubscribe();
    cardsRef.get().then(function(snapshot) {
      allDocs = [];
      snapshot.forEach(function(doc) { allDocs.push({ id: doc.id, data: doc.data() }); });
      allDocs.sort(function(a, b) { return (a.data.id || 0) - (b.data.id || 0); });
      refreshView();
    }).catch(function(err) {
      console.error('Firestore error:', err);
      showToast('Error al cargar: ' + err.message, 'error');
    });
    unsubscribe = cardsRef.onSnapshot(function(snapshot) {
      allDocs = [];
      snapshot.forEach(function(doc) { allDocs.push({ id: doc.id, data: doc.data() }); });
      allDocs.sort(function(a, b) { return (a.data.id || 0) - (b.data.id || 0); });
      refreshView();
    }, function(err) {
      console.error('Firestore onSnapshot error:', err);
    });
  }

  searchInput.addEventListener('input', function() {
    refreshView();
  });

  cardForm.addEventListener('submit', function(e) {
    e.preventDefault();

    btnSubmit.disabled = true;
    btnSubmitText.textContent = 'Guardando\u2026';

    var cardData = {
      name: fName.value.trim(),
      setName: fSet.value.trim(),
      rarity: fRarity.value,
      type: fType.value,
      price: parseFloat(fPrice.value) || 0
    };

    if (pendingImageBase64) {
      cardData.imageUrl = pendingImageBase64;
    }

    function doSave() {
      if (editingId) {
        var updateData = {
          name: cardData.name,
          setName: cardData.setName,
          rarity: cardData.rarity,
          type: cardData.type,
          price: cardData.price
        };
        if (cardData.imageUrl) updateData.imageUrl = cardData.imageUrl;
        return cardsRef.doc(editingId).update(updateData);
      } else {
        return cardsRef.get().then(function(snapshot) {
          var maxId = 0;
          snapshot.forEach(function(doc) {
            if (doc.data().id > maxId) maxId = doc.data().id;
          });
          cardData.id = maxId + 1;
          return cardsRef.add(cardData);
        });
      }
    }

    doSave().then(function() {
      showToast(editingId ? 'Carta actualizada' : 'Carta agregada', 'success');
      resetForm();
    }).catch(function(err) {
      showToast('Error: ' + err.message, 'error');
    }).then(function() {
      btnSubmit.disabled = false;
      btnSubmitText.textContent = editingId ? 'Actualizar' : 'Guardar';
    });
  });

  window.editCard = function(docId) {
    cardsRef.doc(docId).get().then(function(doc) {
      if (!doc.exists) return;
      var d = doc.data();
      editingId = docId;
      existingImageUrl = d.imageUrl || null;
      editId.value = d.id;
      fName.value = d.name;
      fSet.value = d.setName;
      fRarity.value = d.rarity;
      fType.value = d.type;
      fPrice.value = d.price;

      if (d.imageUrl) {
        previewImg.src = d.imageUrl;
        previewWrap.style.display = 'block';
      } else {
        previewWrap.style.display = 'none';
      }
      pendingImageBase64 = null;
      fImage.value = '';

      formTitle.textContent = 'Editar carta';
      formIcon.textContent = '\u270E';
      btnSubmitText.textContent = 'Actualizar';
      btnCancel.style.display = 'inline-flex';
      document.getElementById('form-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
      fName.focus();
    }).catch(function(err) {
      showToast('Error: ' + err.message, 'error');
    });
  };

  window.deleteCard = function(docId) {
    if (!confirm('\u00BFEliminar esta carta?')) return;
    cardsRef.doc(docId).delete().then(function() {
      showToast('Carta eliminada', 'success');
    }).catch(function(err) {
      showToast('Error: ' + err.message, 'error');
    });
  };

  btnCancel.addEventListener('click', resetForm);

  function resetForm() {
    editingId = null;
    existingImageUrl = null;
    editId.value = '';
    cardForm.reset();
    fImage.value = '';
    pendingImageBase64 = null;
    previewWrap.style.display = 'none';
    formTitle.textContent = 'Agregar carta';
    formIcon.textContent = '\u2726';
    btnSubmitText.textContent = 'Guardar';
    btnCancel.style.display = 'none';
    btnSubmit.disabled = false;
  }
})();
