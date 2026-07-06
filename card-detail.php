<?php
  $page_title = 'Detalle de Carta — PokéTCG';
  $meta_desc = 'Detalle de carta Pokémon TCG — Información, precio y disponibilidad.';
  $css_file = 'css/card-detail.css';
  $show_anchors = true;
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

  <div class="page-header">
    <div class="container">
      <div class="breadcrumb">
        <a href="/">Inicio</a>
        <span class="sep">▸</span>
        <a href="/singles">Singles</a>
        <span class="sep">▸</span>
        <span id="breadcrumb-name" style="color:var(--text-muted);">Carta</span>
      </div>
    </div>
  </div>

  <div class="detail-section" style="position:relative;">
    <div class="card-back-pattern"></div>
    <div class="playmat-overlay"></div>
    <div class="foil-texture"></div>

    <div id="detail-content">
      <div class="container">
        <div class="error-state" id="loading-state">
          <span class="icon">🃏</span>
          <h2>Cargando carta…</h2>
        </div>
      </div>
    </div>
  </div>

<?php include 'partials/footer.php'; ?>
  <script src="js/card-detail.js"></script>
</body>
</html>