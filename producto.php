<?php
  $page_title = 'Producto — PokéTCG';
  $meta_desc = 'Información y compra de productos sellados Pokémon TCG. ETB, Booster Box, y más.';
  $css_file = 'css/producto.css';
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

  <div class="foil-texture" style="position:absolute;inset:0;opacity:0.03;pointer-events:none;"></div>
  <div class="card-back-pattern" style="position:absolute;inset:0;opacity:0.012;pointer-events:none;"></div>

  <div class="producto-section">
    <div class="producto-container">
      <div class="breadcrumb-prod">
        <a href="/">Inicio</a>
        <span class="sep">▸</span>
        <span id="breadcrumb-name">Producto</span>
      </div>

      <div class="producto-visual">
        <div class="producto-card-placeholder" id="prod-visual">
          <span class="icon" id="prod-icon">📦</span>
          <span class="badge-type" id="prod-badge-type">ETB</span>
        </div>
      </div>

      <div class="producto-info">
        <div class="prod-type" id="prod-type">ETB</div>
        <h1 id="prod-name">Producto <span>PokéTCG</span></h1>
        <div class="prod-set" id="prod-set">Expansión</div>
        <div class="prod-desc" id="prod-desc">Descripción del producto.</div>
        <div class="prod-price" id="prod-price">$49.99 <small>+IVA</small></div>
        <div class="prod-stock" id="prod-stock">
          <span class="dot green"></span>
          <span>En stock</span>
        </div>
        <div class="prod-actions">
          <div class="qty-selector">
            <button id="qty-minus" aria-label="Restar">−</button>
            <input type="number" class="qty-value" id="qty-value" value="1" min="1" max="99">
            <button id="qty-plus" aria-label="Sumar">+</button>
          </div>
          <button class="btn btn-primary" id="btn-add-cart">Agregar al carrito</button>
        </div>
      </div>
    </div>
  </div>

<?php include 'partials/footer.php'; ?>
  <script src="js/productos.js"></script>
  <script src="js/producto.js"></script>
</body>
</html>