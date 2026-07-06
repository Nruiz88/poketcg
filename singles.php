<?php
  $page_title = 'Cartas Sueltas — PokéTCG';
  $meta_desc = 'Cartas sueltas Pokémon TCG — Amplio catálogo de singles NM/M. Pikachu, Charizard, Umbreon y más.';
  $css_file = 'css/singles.css';
  $show_anchors = false;
  $include_auth = false;
  include 'partials/head.php';
?>

  <!-- scanlines CRT effect -->
  <div class="scanlines" aria-hidden="true"></div>

  <!-- floating particles -->
  <div class="bg-particles" aria-hidden="true">
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
    <div class="particle"></div>
  </div>

<?php include 'partials/nav.php'; ?>

  <!-- ========== PAGE HEADER ========== -->
  <div class="page-header" style="position:relative;overflow:hidden;">
    <div class="foil-texture"></div>
    <div class="card-back-pattern" style="opacity:0.02;"></div>
    <div class="badge">✦ Catálogo de Singles</div>
    <h1>Cartas <span>Sueltas</span></h1>
    <p>Todas nuestras cartas individuales en estado Near Mint / Mint. Revisadas una por una para garantizar la mejor calidad.</p>
  </div>

  <!-- ========== FILTERS ========== -->
  <div class="filters">
    <div class="filters-inner">
      <div class="search-wrap">
        <span class="icon">🔍</span>
        <input type="text" id="search-input" placeholder="Buscar carta..." autocomplete="off">
      </div>

      <div class="filter-group">
        <span class="filter-label">Tipo</span>
        <button class="filter-btn active" data-filter="type" data-value="all">Todas</button>
        <button class="filter-btn" data-filter="type" data-value="grass">🌱</button>
        <button class="filter-btn" data-filter="type" data-value="fire">🔥</button>
        <button class="filter-btn" data-filter="type" data-value="water">💧</button>
        <button class="filter-btn" data-filter="type" data-value="electric">⚡</button>
        <button class="filter-btn" data-filter="type" data-value="psychic">🌀</button>
        <button class="filter-btn" data-filter="type" data-value="dark">🌙</button>
        <button class="filter-btn" data-filter="type" data-value="dragon">🐉</button>
        <button class="filter-btn" data-filter="type" data-value="metal">⚙️</button>
      </div>

      <div class="filter-group">
        <span class="filter-label">Rareza</span>
        <button class="filter-btn active" data-filter="rarity" data-value="all">Todas</button>
        <button class="filter-btn" data-filter="rarity" data-value="rare">Rare</button>
        <button class="filter-btn" data-filter="rarity" data-value="ultra">Ultra</button>
        <button class="filter-btn" data-filter="rarity" data-value="secret">Secret</button>
        <button class="filter-btn" data-filter="rarity" data-value="sar">SAR</button>
      </div>

      <div class="filter-group" id="set-filters">
        <span class="filter-label">Expansión</span>
        <button class="filter-btn active" data-filter="set" data-value="all">Todas</button>
      </div>
    </div>
  </div>

  <!-- ========== RESULTS COUNT ========== -->
  <div class="results-count">
    Mostrando <strong id="results-count">48</strong> cartas
  </div>

  <!-- ========== SINGLES CATALOG ========== -->
  <div class="singles-section" style="position:relative;">
    <div class="card-back-pattern"></div>
    <div class="playmat-overlay"></div>
    <div class="scattered-cards" aria-hidden="true">
      <div class="card-silhouette" style="top:8%;left:3%;--r:-10deg;width:60px;height:84px;"></div>
      <div class="card-silhouette" style="bottom:12%;right:4%;--r:14deg;width:60px;height:84px;"></div>
      <div class="card-silhouette" style="top:50%;left:1%;--r:-20deg;width:50px;height:70px;"></div>
    </div>
    <div class="singles-grid" id="singles-grid">
      <!-- Cards injected by JS -->
    </div>

    <div class="pagination" id="pagination"></div>
  </div>

<?php include 'partials/footer.php'; ?>
  <script src="js/singles.js"></script>
</body>
</html>