<?php
  $page_title = 'Carrito — PokéTCG';
  $meta_desc = 'Revisá tu carrito de compras antes de finalizar. Productos Pokémon TCG seleccionados.';
  $css_file = 'css/carrito.css';
  $show_anchors = false;
  $include_auth = false;
  include 'partials/head.php';
?>

  <div class="scanlines" aria-hidden="true"></div>
  <div class="bg-particles" aria-hidden="true">
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
  </div>

<?php include 'partials/nav.php'; ?>

  <div class="carrito-section">
    <div class="card-back-pattern" style="position:absolute;inset:0;opacity:0.012;pointer-events:none;"></div>
    <div class="carrito-container">
      <div class="carrito-header">
        <h1>Tu <span>Carrito</span></h1>
        <span class="count" id="carrito-count">0 artículos</span>
      </div>

      <div class="carrito-empty" id="carrito-empty" style="display:none;">
        <div class="icon">🛒</div>
        <h2>Tu carrito está vacío</h2>
        <p>Explorá nuestros productos y agregá lo que más te guste.</p>
        <a href="/" class="btn btn-primary">Ver productos</a>
      </div>

      <div id="carrito-items"></div>

      <div class="carrito-resumen" id="carrito-resumen" style="display:none;">
        <div class="resumen-row">
          <span>Subtotal</span>
          <span id="resumen-subtotal">$0.00</span>
        </div>
        <div class="resumen-row">
          <span>Envío</span>
          <span id="resumen-envio">—</span>
        </div>
        <div class="resumen-row total">
          <span>Total</span>
          <span id="resumen-total">$0.00</span>
        </div>
        <button class="btn btn-primary btn-checkout" id="btn-checkout">
          Finalizar compra
        </button>
        <div class="checkout-note">Podés modificar las cantidades antes de finalizar.</div>
      </div>
    </div>
  </div>

<?php include 'partials/footer.php'; ?>
  <script src="js/productos.js"></script>
  <script src="js/carrito.js"></script>
</body>
</html>