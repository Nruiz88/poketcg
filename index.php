<?php
  $page_title = 'PokéTCG — Tu Tienda de Cartas Pokémon';
  $meta_desc = 'PokéTCG — Tienda especializada en Pokémon TCG. ETB, Booster Box, Boosters sueltos y cartas individuales.';
  $css_file = 'css/index.css';
  $show_anchors = true;
  $include_auth = false;
  include 'partials/head.php';
?>

  <!-- scanlines CRT effect -->
  <div class="scanlines" aria-hidden="true"></div>

  <!-- floating particles -->
  <div class="bg-particles" aria-hidden="true">
    <div class="particle" style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);"></div>
    <div class="particle" style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);"></div>
    <div class="particle" style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);"></div>
    <div class="particle" style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);"></div>
    <div class="particle" style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);"></div>
    <div class="particle" style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);"></div>
    <div class="particle" style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);"></div>
    <div class="particle" style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);"></div>
  </div>

  <?php include 'partials/nav.php'; ?>

  <!-- ========== HERO ========== -->
  <section class="hero" id="inicio">
    <!-- foil texture -->
    <div class="foil-texture"></div>
    <!-- scattered cards -->
    <div class="scattered-cards" aria-hidden="true">
      <div class="card-silhouette" style="top:15%;left:5%;--r:-12deg;"></div>
      <div class="card-silhouette" style="top:10%;right:8%;--r:8deg;"></div>
      <div class="card-silhouette" style="bottom:20%;left:10%;--r:20deg;"></div>
      <div class="card-silhouette" style="bottom:15%;right:5%;--r:-18deg;"></div>
      <div class="card-silhouette" style="top:45%;left:2%;--r:-25deg;width:60px;height:84px;"></div>
      <div class="card-silhouette" style="top:40%;right:3%;--r:15deg;width:60px;height:84px;"></div>
    </div>
    <!-- energy pattern -->
    <div class="energy-pattern" aria-hidden="true" style="opacity:0.025;font-size:14px;">
      <span style="--r:-5deg;">⚡</span><span style="--r:3deg;">🔥</span><span style="--r:-8deg;">💧</span><span style="--r:6deg;">🌱</span>
      <span style="--r:-4deg;">🌀</span><span style="--r:7deg;">⚙️</span><span style="--r:-6deg;">🌙</span><span style="--r:4deg;">🐉</span>
      <span style="--r:-3deg;">⚡</span><span style="--r:5deg;">🔥</span><span style="--r:-7deg;">💧</span><span style="--r:2deg;">🌱</span>
      <span style="--r:-5deg;">🌀</span><span style="--r:3deg;">⚙️</span><span style="--r:-4deg;">🌙</span><span style="--r:6deg;">🐉</span>
    </div>
    <div class="hero-content">
      <div class="hero-badge">
        <span class="star">✦</span> Tienda Oficial Pokémon TCG
      </div>
      <h1>Atrapa <span>todos</span><br>los que puedas</h1>
      <p>ETB, Booster Boxes, Boosters Sueltos y las mejores cartas individuales. Todo lo que necesitas para armar tu colección está aquí.</p>
      <div class="hero-buttons">
        <a href="#productos" class="btn btn-primary">Ver Productos</a>
        <a href="#destacados" class="btn btn-secondary">Destacados</a>
      </div>
    </div>
  </section>

  <!-- ========== PRODUCTOS ========== -->
  <section id="productos">
    <div class="playmat-overlay"></div>
    <div class="card-back-pattern"></div>
    <div class="container">
      <header class="section-header reveal">
        <span class="section-label">✦ Catálogo</span>
        <h2 class="section-title">Nuestros Productos</h2>
        <p class="section-sub">Desde sellados hasta cartas individuales, tenemos todo para entrenadores y coleccionistas.</p>
      </header>
      <div class="products-grid">
        <a href="/producto?slug=etb-escarlata" class="product-card reveal" style="transition-delay:0.1s;text-decoration:none;color:inherit;display:block;">
          <div class="product-icon" style="background:rgba(58,170,53,0.1); border-color:rgba(58,170,53,0.15);">📦</div>
          <h3>Elite Trainer Box</h3>
          <p>8 sobres, dados, marcadores de daño y 2 cartas promosal. El kit completo para cualquier entrenador.</p>
          <span class="product-tag">✦ ETB</span>
        </a>
        <a href="/producto?slug=sobre-suelto" class="product-card reveal" style="transition-delay:0.2s;text-decoration:none;color:inherit;display:block;">
          <div class="product-icon" style="background:rgba(60,90,200,0.1); border-color:rgba(60,90,200,0.15);">🃏</div>
          <h3>Booster Pack</h3>
          <p>10 cartas por sobre. La emoción de abrir uno tras otro en busca de esa carta que tanto deseas.</p>
          <span class="product-tag">✦ Sobre</span>
        </a>
        <a href="/producto?slug=bb-estandar" class="product-card reveal" style="transition-delay:0.3s;text-decoration:none;color:inherit;display:block;">
          <div class="product-icon" style="background:rgba(200,60,60,0.1); border-color:rgba(200,60,60,0.15);">📐</div>
          <h3>Booster Box</h3>
          <p>Caja sellada de 36 sobres. La forma más eficiente de completar sets y conseguir los mejores hits.</p>
          <span class="product-tag">✦ BB</span>
        </a>
        <a href="/producto?slug=bundle-estandar" class="product-card reveal" style="transition-delay:0.4s;text-decoration:none;color:inherit;display:block;">
          <div class="product-icon" style="background:rgba(180,120,50,0.1); border-color:rgba(180,120,50,0.15);">🎁</div>
          <h3>Booster Bundle</h3>
          <p>6 sobres + 1 carta promosal en estuche compacto. Perfecto para llevar a cualquier parte.</p>
          <span class="product-tag">✦ Bundle</span>
        </a>
      </div>
    </div>
  </section>

  <!-- ========== DESTACADOS ========== -->
  <section id="destacados" class="alt-bg">
    <div class="card-back-pattern"></div>
    <div class="container">
      <header class="section-header reveal">
        <span class="section-label">✦ Lo más vendido</span>
        <h2 class="section-title">Productos Destacados</h2>
        <p class="section-sub">Los favoritos de nuestra comunidad. Stock limitado — no te quedes sin el tuyo.</p>
      </header>
      <div class="featured-grid">
        <article class="featured-card reveal" style="transition-delay:0.1s;">
          <div class="featured-banner" style="background:linear-gradient(135deg,rgba(58,170,53,0.2),rgba(58,170,53,0.04));">🌿</div>
          <div class="featured-body">
            <h3>ETB Escarlata &amp; Púrpura</h3>
            <p>9 sobres, dados, counters y 2 cartas promosal de la última expansión.</p>
            <div class="featured-footer">
              <span class="price">$49.99</span>
              <a href="/producto?slug=etb-escarlata" class="btn-sm">Comprar</a>
            </div>
          </div>
        </article>
        <article class="featured-card reveal" style="transition-delay:0.2s;">
          <div class="featured-banner" style="background:linear-gradient(135deg,rgba(60,90,200,0.2),rgba(60,90,200,0.04));">💧</div>
          <div class="featured-body">
            <h3>BB Evoluciones Prismáticas</h3>
            <p>Caja sellada de 36 sobres de la expansión más reciente. ¡Busca tus cartas favoritas!</p>
            <div class="featured-footer">
              <span class="price">$149.99</span>
              <a href="/producto?slug=bb-evoluciones" class="btn-sm">Comprar</a>
            </div>
          </div>
        </article>
        <article class="featured-card reveal" style="transition-delay:0.3s;">
          <div class="featured-banner" style="background:linear-gradient(135deg,rgba(200,60,60,0.2),rgba(200,60,60,0.04));">🔥</div>
          <div class="featured-body">
            <h3>Bundle Llama Oscura</h3>
            <p>6 sobres + 1 carta promosal. Ideal para empezar tu colección o para un buen regalo.</p>
            <div class="featured-footer">
              <span class="price">$29.99</span>
              <a href="/producto?slug=bundle-llama-oscura" class="btn-sm">Comprar</a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- ========== CARTAS SUELTAS ========== -->
  <section id="singles">
    <div class="card-back-pattern"></div>
    <div class="scattered-cards" aria-hidden="true">
      <div class="card-silhouette" style="top:5%;right:3%;--r:12deg;width:60px;height:84px;"></div>
      <div class="card-silhouette" style="bottom:10%;left:2%;--r:-15deg;width:60px;height:84px;"></div>
    </div>
    <div class="container">
      <header class="section-header reveal">
        <span class="section-label">✦ Singles</span>
        <h2 class="section-title">Cartas Sueltas</h2>
        <p class="section-sub">Completa tu colección carta por carta. Todas nuestras singles están en estado Near Mint / Mint.</p>
      </header>
      <!-- rare / ultra row -->
      <div class="rarity-group-label reveal">
        <span class="group-line"></span>
        <span class="group-text">✦ Rare / Ultra Rare</span>
        <span class="group-line"></span>
      </div>
      <div class="singles-grid">
        <article class="single-card rarity-ultra reveal card-flip" style="animation-delay:0.1s;">
          <span class="card-badge best-seller">🔥 Más vendida</span>
          <div class="card-art" style="background:linear-gradient(145deg,#2d1b69,#1a0f3e);">⚡</div>
          <h4><span class="energy-icon">⚡</span>Pikachu VMAX</h4>
          <p class="sub">Vivid Voltage · Ultra Rare</p>
          <div class="stock"><span class="dot green"></span><span class="label green">En stock</span></div>
          <span class="price-sm">$24.99</span>
        </article>
        <article class="single-card rarity-rare reveal card-flip" style="animation-delay:0.15s;">
          <span class="card-badge sale">-20%</span>
          <div class="card-art" style="background:linear-gradient(145deg,#1b5e3a,#0f3d25);">🌿</div>
          <h4><span class="energy-icon">🔥</span>Charizard ex</h4>
          <p class="sub">Obsidian Flames · Double Rare</p>
          <div class="stock"><span class="dot yellow"></span><span class="label yellow">Quedan 3</span></div>
          <span class="price-sm">$19.99</span>
        </article>
        <article class="single-card rarity-ultra reveal card-flip" style="animation-delay:0.2s;">
          <div class="card-art" style="background:linear-gradient(145deg,#5e3a1b,#3d2510);">💎</div>
          <h4><span class="energy-icon">🌀</span>Mewtwo VSTAR</h4>
          <p class="sub">Pokémon Go · VSTAR</p>
          <div class="stock"><span class="dot green"></span><span class="label green">En stock</span></div>
          <span class="price-sm">$14.99</span>
        </article>
        <article class="single-card rarity-ultra reveal card-flip" style="animation-delay:0.3s;">
          <div class="card-art" style="background:linear-gradient(145deg,#5e1b3d,#3d1025);">🌀</div>
          <h4><span class="energy-icon">🌀</span>Giratina V</h4>
          <p class="sub">Lost Origin · Ultra Rare</p>
          <div class="stock"><span class="dot green"></span><span class="label green">En stock</span></div>
          <span class="price-sm">$29.99</span>
        </article>
      </div>

      <!-- separator -->
      <div class="rarity-divider reveal">
        <span class="divider-pixel"></span>
      </div>

      <!-- secret / sar row -->
      <div class="rarity-group-label reveal">
        <span class="group-line"></span>
        <span class="group-text">✦ Secret / SAR</span>
        <span class="group-line"></span>
      </div>
      <div class="singles-grid">
        <article class="single-card rarity-sar reveal card-flip" style="animation-delay:0.25s;">
          <span class="card-badge new">✦ Nuevo</span>
          <div class="card-art" style="background:linear-gradient(145deg,#1b3d5e,#10253d);">🌊</div>
          <h4><span class="energy-icon">💧</span>Greninja ex</h4>
          <p class="sub">Twilight Masquerade · SAR</p>
          <div class="stock"><span class="dot green"></span><span class="label green">En stock</span></div>
          <span class="price-sm">$34.99</span>
        </article>
        <article class="single-card rarity-secret reveal card-flip" style="animation-delay:0.35s;">
          <span class="card-badge best-seller">🔥 Más vendida</span>
          <div class="card-art" style="background:linear-gradient(145deg,#2a2a2a,#111);">🌌</div>
          <h4><span class="energy-icon">🌙</span>Umbreon VMAX</h4>
          <p class="sub">Evolving Skies · Secret Rare</p>
          <div class="stock"><span class="dot red"></span><span class="label red">Queda 1</span></div>
          <span class="price-sm">$89.99</span>
        </article>
      </div>
      <div style="text-align:center;margin-top:2.5rem;">
        <a href="/singles" class="btn btn-secondary">Ver catálogo completo →</a>
        <a href="/raffles" class="btn btn-primary">🎲 Rifas activas</a>
      </div>
    </div>
  </section>

  <!-- ========== NOSOTROS ========== -->
  <section id="nosotros" class="alt-bg">
    <div class="card-back-pattern"></div>
    <div class="energy-pattern" aria-hidden="true" style="opacity:0.02;font-size:12px;bottom:0;">
      <span style="--r:-4deg;">⚡</span><span style="--r:5deg;">🔥</span><span style="--r:-6deg;">💧</span><span style="--r:3deg;">🌱</span>
      <span style="--r:-5deg;">🌀</span><span style="--r:4deg;">⚙️</span><span style="--r:-3deg;">🌙</span><span style="--r:6deg;">🐉</span>
    </div>
    <div class="container">
      <div class="about-grid">
        <div class="about-text reveal-left">
          <span class="section-label">✦ Quiénes Somos</span>
          <h2>Pasión por las cartas <span>Pokémon</span></h2>
          <p>Somos un grupo de coleccionistas apasionados que decidió convertir su hobby en una tienda. Cada producto que ofrecemos es seleccionado cuidadosamente para garantizar autenticidad y calidad.</p>
          <p>Trabajamos con distribuidores oficiales y hacemos revisión manual de cada carta suelta para que recibas exactamente lo que ves. Desde 2023, cientos de entrenadores ya confían en nosotros.</p>
          <div class="about-stats">
            <div class="stat"><h3>500+</h3><p>Clientes</p></div>
            <div class="stat"><h3>2.5K</h3><p>Órdenes</p></div>
            <div class="stat"><h3>4.9</h3><p>Calificación</p></div>
          </div>
        </div>
        <div class="about-visual reveal-right">
          <span class="emoji-big">⚡</span>
          <span class="tagline">Gotta Catch 'Em All</span>
          <span class="since">✦ Desde 2023 ✦</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== NEWSLETTER ========== -->
  <section>
    <div class="card-back-pattern" style="opacity:0.02;"></div>
    <div class="container">
      <div class="newsletter-card reveal">
        <h2>¿Buscas algo en <span>especial</span>?</h2>
        <p>Déjanos tu correo y te avisamos cuando llegue nuevo stock, lanzamientos y ofertas exclusivas.</p>
        <form class="newsletter-form" id="newsletter-form">
          <input type="email" id="newsletter-email" placeholder="tu@email.com" required autocomplete="email">
          <button type="submit" class="btn btn-primary">Suscribirse</button>
        </form>
      </div>
    </div>
  </section>

  <?php include 'partials/footer.php'; ?>

  <script src="js/index.js"></script>
</body>
</html>
