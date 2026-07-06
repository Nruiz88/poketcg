(function() {
  var setsForm = document.getElementById('sets-form');
  var sfName = document.getElementById('sf-name');
  var sfCode = document.getElementById('sf-code');
  var sfDate = document.getElementById('sf-date');
  var sfDesc = document.getElementById('sf-desc');
  var sfLogo = document.getElementById('sf-logo');
  var sfLogoPreview = document.getElementById('sf-logo-preview');
  var sfLogoImg = document.getElementById('sf-logo-img');
  var sfRemoveLogo = document.getElementById('sf-remove-logo');
  var editSetId = document.getElementById('edit-set-id');
  var setsFormTitle = document.getElementById('sets-form-title');
  var setsFormIcon = document.getElementById('sets-form-icon');
  var btnSaveSet = document.getElementById('btn-save-set');
  var btnSaveSetText = document.getElementById('btn-save-set-text');
  var btnCancelSet = document.getElementById('btn-cancel-set');
  var setsTbody = document.getElementById('sets-tbody');
  var setsEmptyMsg = document.getElementById('sets-empty-msg');
  var setsTableCount = document.getElementById('sets-table-count');
  var statSetsTotal = document.getElementById('stat-sets-total');
  var statSetsCards = document.getElementById('stat-sets-cards');
  var statSetsLatest = document.getElementById('stat-sets-latest');

  var editingSetId = null;
  var setsRef = db.collection('sets');
  var allSets = [];

  var pendingLogoBase64 = null;

  sfLogo.addEventListener('change', function() {
    var file = sfLogo.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
      pendingLogoBase64 = e.target.result;
      sfLogoImg.src = pendingLogoBase64;
      sfLogoPreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  });

  sfRemoveLogo.addEventListener('click', function() {
    sfLogo.value = '';
    pendingLogoBase64 = null;
    sfLogoPreview.style.display = 'none';
  });

  function populateCardSetSelect() {
    var list = document.getElementById('set-list');
    var hint = document.getElementById('f-set-hint');
    if (!list) return;
    list.innerHTML = '';
    allSets.forEach(function(s) {
      var opt = document.createElement('option');
      opt.value = s.data.name;
      list.appendChild(opt);
    });
    if (hint) hint.style.display = allSets.length > 0 ? 'none' : 'inline';
  }

  window.loadSets = function() {
    setsRef.get().then(function(snapshot) {
      allSets = [];
      snapshot.forEach(function(doc) { allSets.push({ id: doc.id, data: doc.data() }); });
      allSets.sort(function(a, b) { return (a.data.name || '').localeCompare(b.data.name || ''); });
      renderSetsTable(allSets);
      updateSetsStats(allSets);
      populateCardSetSelect();
    }).catch(function(err) {
      console.error('Firestore sets error:', err);
      showToast('Error al cargar sets: ' + err.message, 'error');
    });
  };

  function updateSetsStats(sets) {
    statSetsTotal.textContent = sets.length;

    var totalCards = 0;
    sets.forEach(function(s) { totalCards += s.data.cardCount || 0; });
    statSetsCards.textContent = totalCards;

    var latest = sets.slice().sort(function(a, b) {
      var da = a.data.releaseDate || '';
      var db = b.data.releaseDate || '';
      return db.localeCompare(da);
    });
    statSetsLatest.textContent = latest.length > 0 && latest[0].data.releaseDate
      ? latest[0].data.name + ' (' + latest[0].data.releaseDate + ')'
      : '\u2014';
  }

  function renderSetsTable(sets) {
    setsTableCount.textContent = '(' + sets.length + ')';

    if (sets.length === 0) {
      setsTbody.innerHTML = '';
      setsEmptyMsg.style.display = 'block';
      return;
    }
    setsEmptyMsg.style.display = 'none';

    setsTbody.innerHTML = sets.map(function(s) {
      var d = s.data;
      var logo = d.logoUrl
        ? '<img class="cell-thumb" src="' + d.logoUrl + '" alt="" loading="lazy" style="border-radius:0;">'
        : '<span class="cell-thumb" style="display:inline-flex;align-items:center;justify-content:center;font-size:0.6rem;color:var(--text-dim);">\uD83D\uDCE6</span>';
      var date = d.releaseDate || '\u2014';
      var cards = d.cardCount || 0;
      return (
        '<tr>' +
          '<td>' + logo + '</td>' +
          '<td><code style="color:var(--yellow);font-size:0.8rem;font-weight:700;">' + escHtml(d.code || '\u2014') + '</code></td>' +
          '<td><span class="cell-name">' + escHtml(d.name) + '</span></td>' +
          '<td style="color:var(--text-dim);font-size:0.75rem;">' + date + '</td>' +
          '<td style="text-align:center;font-weight:700;">' + cards + '</td>' +
          '<td><div class="cell-actions">' +
            '<button class="btn-icon" onclick="editSet(\'' + s.id + '\')" title="Editar">\u270E</button>' +
            '<button class="btn-icon delete" onclick="deleteSet(\'' + s.id + '\')" title="Eliminar">\u2715</button>' +
          '</div></td>' +
        '</tr>'
      );
    }).join('');
  }

  setsForm.addEventListener('submit', function(e) {
    e.preventDefault();

    btnSaveSet.disabled = true;
    btnSaveSetText.textContent = 'Guardando\u2026';

    var setData = {
      name: sfName.value.trim(),
      code: sfCode.value.trim().toUpperCase(),
      description: sfDesc.value.trim() || '',
      releaseDate: sfDate.value || '',
      cardCount: 0
    };

    if (pendingLogoBase64) {
      setData.logoUrl = pendingLogoBase64;
    }

    function doSave() {
      if (editingSetId) {
        var updateData = {
          name: setData.name,
          code: setData.code,
          description: setData.description,
          releaseDate: setData.releaseDate
        };
        if (setData.logoUrl) updateData.logoUrl = setData.logoUrl;
        return setsRef.doc(editingSetId).update(updateData);
      } else {
        setData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        return setsRef.add(setData);
      }
    }

    doSave().then(function() {
      showToast(editingSetId ? 'Set actualizado' : 'Set agregado', 'success');
      resetSetForm();
      loadSets();
    }).catch(function(err) {
      showToast('Error: ' + err.message, 'error');
    }).then(function() {
      btnSaveSet.disabled = false;
      btnSaveSetText.textContent = editingSetId ? 'Actualizar' : 'Guardar';
    });
  });

  btnCancelSet.addEventListener('click', resetSetForm);

  function resetSetForm() {
    editingSetId = null;
    editSetId.value = '';
    setsForm.reset();
    sfLogo.value = '';
    pendingLogoBase64 = null;
    sfLogoPreview.style.display = 'none';
    setsFormTitle.textContent = 'Agregar set';
    setsFormIcon.textContent = '\uD83D\uDCE6';
    btnSaveSetText.textContent = 'Guardar';
    btnCancelSet.style.display = 'none';
    btnSaveSet.disabled = false;
  }

  window.editSet = function(docId) {
    setsRef.doc(docId).get().then(function(doc) {
      if (!doc.exists) return;
      var d = doc.data();
      editingSetId = docId;
      editSetId.value = docId;
      sfName.value = d.name || '';
      sfCode.value = d.code || '';
      sfDate.value = d.releaseDate || '';
      sfDesc.value = d.description || '';

      if (d.logoUrl) {
        sfLogoImg.src = d.logoUrl;
        sfLogoPreview.style.display = 'block';
      } else {
        sfLogoPreview.style.display = 'none';
      }
      pendingLogoBase64 = null;
      sfLogo.value = '';

      setsFormTitle.textContent = 'Editar set';
      setsFormIcon.textContent = '\u270E';
      btnSaveSetText.textContent = 'Actualizar';
      btnCancelSet.style.display = 'inline-flex';
      document.getElementById('sets-form-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
      sfName.focus();
    }).catch(function(err) {
      showToast('Error: ' + err.message, 'error');
    });
  };

  window.deleteSet = function(docId) {
    if (!confirm('\u00BFEliminar este set? Las cartas asociadas no se eliminar\u00E1n.')) return;
    setsRef.doc(docId).delete().then(function() {
      showToast('Set eliminado', 'success');
      loadSets();
    }).catch(function(err) {
      showToast('Error: ' + err.message, 'error');
    });
  };
})();
