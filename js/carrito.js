function renderCarrito() {
  var data = Carrito.obtener();
  var container = document.getElementById('carrito-items');
  var resumen = document.getElementById('carrito-resumen');
  var empty = document.getElementById('carrito-empty');
  var count = document.getElementById('carrito-count');

  if (!container) return;

  count.textContent = Carrito.cantidad() + ' artículo' + (Carrito.cantidad() !== 1 ? 's' : '');

  if (data.items.length === 0) {
    container.innerHTML = '';
    empty.style.display = 'block';
    resumen.style.display = 'none';
    return;
  }

  empty.style.display = 'none';
  resumen.style.display = 'block';

  container.innerHTML = '';
  data.items.forEach(function(item) {
    var total = (item.price * item.cantidad).toFixed(2);
    var div = document.createElement('div');
    div.className = 'carrito-item';
    div.innerHTML =
      '<div class="item-icon" style="background:' + (item.gradient || 'var(--surface)') + '">' +
        item.icon +
      '</div>' +
      '<div class="item-info">' +
        '<h3>' + escHtml(item.name) + '</h3>' +
        '<span class="item-type">' + escHtml(item.type) + '</span>' +
        '<div class="item-price">$' + item.price.toFixed(2) + ' c/u</div>' +
      '</div>' +
      '<div class="item-right">' +
        '<div class="item-total">$' + total + '</div>' +
        '<div class="qty-controls">' +
          '<button onclick="cambiarCant(\'' + item.slug + '\', -1)" ' + (item.cantidad <= 1 ? 'disabled' : '') + '>−</button>' +
          '<span class="qty-val">' + item.cantidad + '</span>' +
          '<button onclick="cambiarCant(\'' + item.slug + '\', 1)">+</button>' +
        '</div>' +
        '<button class="btn-remove" onclick="eliminarItem(\'' + item.slug + '\')">Eliminar</button>' +
      '</div>';
    container.appendChild(div);
  });

  actualizarResumen();
}

function actualizarResumen() {
  var subtotal = Carrito.total();
  var envio = subtotal >= 30 ? 0 : 7.99;
  var total = subtotal + envio;

  document.getElementById('resumen-subtotal').textContent = '$' + subtotal.toFixed(2);
  document.getElementById('resumen-envio').textContent = envio === 0 ? 'Gratis' : '$' + envio.toFixed(2);
  document.getElementById('resumen-total').textContent = '$' + total.toFixed(2);
}

function cambiarCant(slug, delta) {
  var data = Carrito.obtener();
  var item = null;
  data.items.forEach(function(i) { if (i.slug === slug) item = i; });
  if (!item) return;
  Carrito.actualizarCantidad(slug, item.cantidad + delta);
  renderCarrito();
  Carrito.actualizarBadge();
}

function eliminarItem(slug) {
  Carrito.eliminar(slug);
  renderCarrito();
  Carrito.actualizarBadge();
}

function escHtml(s) {
  if (typeof s !== 'string') return '';
  var d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

document.addEventListener('DOMContentLoaded', renderCarrito);
