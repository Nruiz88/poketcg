function obtenerSlug() {
  var match = window.location.search.match(/slug=([^&]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function cargarProducto() {
  var slug = obtenerSlug();
  if (!slug) {
    document.getElementById('prod-name').innerHTML = 'Producto <span>no encontrado</span>';
    document.getElementById('prod-desc').textContent = 'El producto que buscás no existe o el enlace es incorrecto.';
    document.getElementById('btn-add-cart').style.display = 'none';
    document.getElementById('qty-value').style.display = 'none';
    document.getElementById('qty-minus').style.display = 'none';
    document.getElementById('qty-plus').style.display = 'none';
    return;
  }

  var prod = null;
  productos.forEach(function(p) { if (p.slug === slug) prod = p; });

  if (!prod) {
    document.getElementById('prod-name').innerHTML = 'Producto <span>no encontrado</span>';
    document.getElementById('prod-desc').textContent = 'El producto solicitado no está disponible.';
    document.getElementById('btn-add-cart').style.display = 'none';
    return;
  }

  document.title = prod.name + ' — PokéTCG';
  document.getElementById('breadcrumb-name').textContent = prod.name;
  document.getElementById('prod-visual').style.background = prod.gradient;
  document.getElementById('prod-icon').textContent = prod.icon;
  document.getElementById('prod-badge-type').textContent = prod.type;
  document.getElementById('prod-type').textContent = prod.type;
  document.getElementById('prod-name').innerHTML = prod.name.replace(/(\S+)$/, '<span>$1</span>');
  document.getElementById('prod-set').textContent = '✦ ' + prod.set;
  document.getElementById('prod-desc').textContent = prod.description;
  document.getElementById('prod-price').innerHTML = '$' + prod.price.toFixed(2) + ' <small>+IVA</small>';

  var btn = document.getElementById('btn-add-cart');
  btn.onclick = function() {
    var qty = parseInt(document.getElementById('qty-value').value, 10) || 1;
    Carrito.agregar(slug, qty);
    btn.textContent = '✓ Agregado';
    btn.classList.add('added');
    setTimeout(function() {
      btn.textContent = 'Agregar al carrito';
      btn.classList.remove('added');
    }, 2000);
  };
}

var qtyInput = document.getElementById('qty-value');
document.getElementById('qty-minus').addEventListener('click', function() {
  var val = parseInt(qtyInput.value, 10) || 1;
  if (val > 1) qtyInput.value = val - 1;
});
document.getElementById('qty-plus').addEventListener('click', function() {
  var val = parseInt(qtyInput.value, 10) || 1;
  if (val < 99) qtyInput.value = val + 1;
});
qtyInput.addEventListener('change', function() {
  var val = parseInt(this.value, 10);
  if (isNaN(val) || val < 1) this.value = 1;
  if (val > 99) this.value = 99;
});

document.addEventListener('DOMContentLoaded', cargarProducto);
