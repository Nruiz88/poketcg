<style>
.cart-link { position:relative; }
.cart-badge {
  position:absolute; top:-8px; right:-12px;
  min-width:18px; height:18px;
  font-size:0.62rem; font-weight:700;
  background:var(--yellow); color:#000;
  border-radius:10px; display:flex;
  align-items:center; justify-content:center;
  padding:0 4px; display:none;
  line-height:1;
}
</style>
<nav>
  <a href="/" class="logo">
    <span class="pixel-ball"></span>
    Poké<span>TCG</span>
  </a>
  <button class="hamburger" aria-label="Menú de navegación" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
  <ul class="nav-links" role="list">
    <li><a href="/">Inicio</a></li>
    <?php if ($show_anchors): ?>
    <li><a href="/#productos">Productos</a></li>
    <li><a href="/#destacados">Destacados</a></li>
    <?php endif; ?>
    <li><a href="/singles">Singles</a></li>
    <li><a href="/raffles" style="color:var(--yellow);">🎲 Rifas</a></li>
    <li><a href="/faq">❓ FAQ</a></li>
    <li><a href="/carrito" class="cart-link">🛒<span class="cart-badge" id="nav-cart-badge">0</span></a></li>
    <?php if ($show_anchors): ?>
    <li><a href="/#nosotros">Nosotros</a></li>
    <?php endif; ?>
  </ul>
</nav>