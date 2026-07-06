(function() {
  var productsRef = db.collection('products');
  var allProducts = [];

  var form = document.getElementById('products-form');
  var editId = document.getElementById('pf-edit-id');
  var pfSlug = document.getElementById('pf-slug');
  var pfName = document.getElementById('pf-name');
  var pfType = document.getElementById('pf-type');
  var pfSet = document.getElementById('pf-set');
  var pfPrice = document.getElementById('pf-price');
  var pfIcon = document.getElementById('pf-icon');
  var pfGradient = document.getElementById('pf-gradient');
  var pfDesc = document.getElementById('pf-desc');
  var btnSave = document.getElementById('btn-save-product');
  var btnSaveText = document.getElementById('btn-save-product-text');
  var btnCancel = document.getElementById('btn-cancel-product');
  var formTitle = document.getElementById('pf-form-title');
  var formIcon = document.getElementById('pf-icon-header');
  var tbody = document.getElementById('products-tbody');
  var emptyMsg = document.getElementById('products-empty-msg');
  var tableCount = document.getElementById('products-table-count');

  var editingId = null;

  window.loadProductsAdmin = function() {
    productsRef.get().then(function(snapshot) {
      allProducts = [];
      snapshot.forEach(function(doc) { allProducts.push({ id: doc.id, data: doc.data() }); });
      allProducts.sort(function(a, b) { return (a.data.name || '').localeCompare(b.data.name || ''); });
      renderProductsTable(allProducts);
    }).catch(function(err) {
      showToast('Error al cargar productos: ' + err.message, 'error');
    });
  };

  function renderProductsTable(products) {
    tableCount.textContent = '(' + products.length + ')';

    if (products.length === 0) {
      tbody.innerHTML = '';
      emptyMsg.style.display = 'block';
      return;
    }
    emptyMsg.style.display = 'none';

    tbody.innerHTML = products.map(function(p) {
      var d = p.data;
      var icon = d.icon
        ? '<span style="font-size:1.3rem;">' + d.icon + '</span>'
        : '<span style="color:var(--text-dim);font-size:0.7rem;">—</span>';
      return (
        '<tr>' +
          '<td>' + icon + '</td>' +
          '<td><code style="color:var(--yellow);font-size:0.78rem;">' + escHtml(d.slug) + '</code></td>' +
          '<td><span class="cell-name">' + escHtml(d.name) + '</span></td>' +
          '<td><span class="cell-type">' + escHtml(d.type) + '</span></td>' +
          '<td><span class="cell-price">$' + (d.price || 0).toFixed(2) + '</span></td>' +
          '<td><div class="cell-actions">' +
            '<button class="btn-icon" onclick="editProduct(\'' + p.id + '\')" title="Editar">✎</button>' +
            '<button class="btn-icon delete" onclick="deleteProduct(\'' + p.id + '\')" title="Eliminar">✕</button>' +
          '</div></td>' +
        '</tr>'
      );
    }).join('');
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    btnSave.disabled = true;
    btnSaveText.textContent = 'Guardando…';

    var data = {
      slug: pfSlug.value.trim().toLowerCase().replace(/\s+/g, '-'),
      name: pfName.value.trim(),
      type: pfType.value,
      set: pfSet.value.trim() || '',
      price: parseFloat(pfPrice.value) || 0,
      icon: pfIcon.value.trim() || '📦',
      gradient: pfGradient.value.trim() || '',
      description: pfDesc.value.trim() || ''
    };

    function doSave() {
      if (editingId) {
        return productsRef.doc(editingId).update({ name: data.name, type: data.type, set: data.set, price: data.price, icon: data.icon, gradient: data.gradient, description: data.description });
      } else {
        return productsRef.doc(data.slug).set(data);
      }
    }

    doSave().then(function() {
      showToast(editingId ? 'Producto actualizado' : 'Producto agregado', 'success');
      resetForm();
      loadProductsAdmin();
    }).catch(function(err) {
      showToast('Error: ' + err.message, 'error');
    }).then(function() {
      btnSave.disabled = false;
      btnSaveText.textContent = editingId ? 'Actualizar' : 'Guardar';
    });
  });

  window.editProduct = function(docId) {
    productsRef.doc(docId).get().then(function(doc) {
      if (!doc.exists) return;
      var d = doc.data();
      editingId = docId;
      pfSlug.value = d.slug || '';
      pfName.value = d.name || '';
      pfType.value = d.type || 'ETB';
      pfSet.value = d.set || '';
      pfPrice.value = d.price || '';
      pfIcon.value = d.icon || '';
      pfGradient.value = d.gradient || '';
      pfDesc.value = d.description || '';

      formTitle.textContent = 'Editar producto';
      formIcon.textContent = '✎';
      btnSaveText.textContent = 'Actualizar';
      btnCancel.style.display = 'inline-flex';
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      pfName.focus();
    }).catch(function(err) {
      showToast('Error: ' + err.message, 'error');
    });
  };

  window.deleteProduct = function(docId) {
    if (!confirm('¿Eliminar este producto?')) return;
    productsRef.doc(docId).delete().then(function() {
      showToast('Producto eliminado', 'success');
      loadProductsAdmin();
    }).catch(function(err) {
      showToast('Error: ' + err.message, 'error');
    });
  };

  btnCancel.addEventListener('click', resetForm);

  function resetForm() {
    editingId = null;
    editId.value = '';
    form.reset();
    formTitle.textContent = 'Agregar producto';
    formIcon.textContent = '📦';
    btnSaveText.textContent = 'Guardar';
    btnCancel.style.display = 'none';
    btnSave.disabled = false;
  }
})();
