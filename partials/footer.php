  <footer>
    <div class="container">
      <div class="logo">
        <span class="pixel-ball"></span>
        Poké<span>TCG</span>
      </div>
      <div class="links">
        <a href="/">Inicio</a>
        <a href="/#productos">Productos</a>
        <a href="/#destacados">Destacados</a>
        <a href="/singles">Singles</a>
        <a href="/raffles">Rifas</a>
        <a href="/faq">FAQ</a>
        <a href="/carrito">Carrito</a>
        <a href="/#nosotros">Nosotros</a>
      </div>
      <p>&copy; 2026 PokéTCG &mdash; Pokémon es propiedad de Nintendo, Game Freak y Creatures.</p>
    </div>
  </footer>

  <!-- Firebase -->
  <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>
  <?php if ($include_auth): ?>
  <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
  <?php endif; ?>
  <script src="js/firebase-config.js"></script>