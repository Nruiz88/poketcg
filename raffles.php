<?php
  $page_title = 'Rifas — PokéTCG';
  $meta_desc = 'Participá en nuestras rifas de Pokémon TCG — Números limitados, sorteos semanales. ¡Comprá tu número y ganá premios exclusivos!';
  $css_file = 'css/raffles.css';
  $include_auth = false;
  include 'partials/head.php';
?>
  <div class="bg-pattern"></div>
  <div class="bg-foil"></div>
  <div class="bg-grid"></div>

  <div class="container">

    <!-- Top Nav -->
    <nav class="top-nav">
      <a href="/" class="logo"><span class="pixel-ball"></span>Poké<span>TCG</span></a>
      <div class="nav-links">
        <a href="/">Tienda</a>
        <a href="/singles">Singles</a>
        <a href="/raffles" style="color:var(--yellow);">Rifas</a>
        <a href="#" onclick="openTracking()">Mis números</a>
      </div>
    </nav>

    <!-- Hero -->
    <header class="hero">
      <h1>Elegí tu número.<br>Ganá premios <span>grandiosos</span>.</h1>
      <p>Rifas oficiales de PokéTCG. Elegí tus números, pagá por transferencia, subí tu comprobante y participá. Todo desde acá.</p>
      <div class="hero-badges">
        <span>✅ Pago verificado</span>
        <span>🎲 Sorteo transparente</span>
        <span>💬 Soporte por WhatsApp</span>
      </div>
    </header>

    <!-- Raffles List -->
    <div id="raffles-container">
      <div class="loading" id="loading-msg">
        <div style="font-size:2rem;margin-bottom:0.5rem;">🎲</div>
        <p>Cargando rifas…</p>
      </div>
    </div>

    <!-- Tracking -->
    <section class="tracking" id="tracking-section">
      <h3>✦ Mis números</h3>
      <p style="font-size:0.8rem;color:var(--text-dim);margin-bottom:0.75rem;">Ingresá tu código de seguimiento para ver el estado de tu pedido.</p>
      <div class="tracking-form">
        <input type="text" id="tracking-input" placeholder="Código de pedido" autocomplete="off">
        <button class="btn btn-primary" onclick="trackOrder()">Buscar</button>
      </div>
      <div id="tracking-result" style="margin-top:1rem;"></div>
    </section>

    <!-- Footer -->
    <footer>
      <div class="links">
        <a href="/">Tienda</a>
        <a href="/singles">Singles</a>
        <a href="/raffles">Rifas activas</a>
        <a href="/admin">Admin</a>
      </div>
      <p>&copy; 2026 PokéTCG &mdash; Pokémon es propiedad de Nintendo, Game Freak y Creatures.</p>
    </footer>
  </div>

  <!-- Success Modal -->
  <div class="modal-overlay" id="success-modal">
    <div class="modal">
      <div class="icon">🎉</div>
      <h2>Reserva confirmada</h2>
      <p style="margin-bottom:0.75rem;">Guardá este código para seguir tu pedido:</p>
      <div class="code-box" id="order-code-display">---</div>
      <p style="font-size:0.75rem;">Te llegará un WhatsApp de confirmación cuando verifiquemos el pago.</p>
      <button class="btn btn-primary" style="margin-top:1rem;" onclick="closeModal()">Listo</button>
    </div>
  </div>

  <!-- Tracking Result Modal -->
  <div class="modal-overlay" id="tracking-modal">
    <div class="modal" style="text-align:left;">
      <div class="icon" style="text-align:center;">📋</div>
      <h2 style="text-align:center;">Tu pedido</h2>
      <div id="tracking-detail" style="margin-top:1rem;font-size:0.85rem;"></div>
      <button class="btn btn-primary" style="margin-top:1rem;width:100%;" onclick="closeTrackingModal()">Cerrar</button>
    </div>
  </div>

  <!-- Toast -->
  <div class="toast-container" id="toast-container"></div>
  <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>
  <script src="js/firebase-config.js"></script>
  <script src="js/raffles.js"></script>
</body>
</html>