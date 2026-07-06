<?php
  $page_title = 'Preguntas Frecuentes — PokéTCG';
  $meta_desc = 'Resolvé tus dudas sobre envíos, pagos, devoluciones y productos Pokémon TCG en PokéTCG. FAQ actualizada.';
  $css_file = 'css/faq.css';
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

  <div class="page-header-faq">
    <h1>Preguntas <span>Frecuentes</span></h1>
    <p>Todo lo que necesitás saber antes de comprar. Si no encontrás lo que buscás, hablanos.</p>
  </div>

  <div class="faq-section">
    <div class="card-back-pattern" style="opacity:0.015;"></div>

    <!-- ===== Productos ===== -->
    <div class="faq-category">
      <h2>🃏 Productos</h2>

      <details class="faq-item">
        <summary>¿Las cartas son originales?</summary>
        <div class="answer">
          <strong>Sí, 100% originales.</strong> Trabajamos con distribuidores oficiales y cada producto sellado llega directamente de The Pokémon Company International. Las cartas sueltas son verificadas una por una antes de publicarlas.
        </div>
      </details>

      <details class="faq-item">
        <summary>¿En qué estado están las cartas sueltas?</summary>
        <div class="answer">
          Todas nuestras singles están en estado <strong>Near Mint (NM)</strong> o <strong>Mint (M)</strong>. Las revisamos a contraluz, verificamos bordes, esquinas y superficie. Si una carta no cumple, no se publica.
        </div>
      </details>

      <details class="faq-item">
        <summary>¿Cómo sé qué expansión estoy comprando?</summary>
        <div class="answer">
          Cada carta y producto sellado tiene la expansión indicada en su título y descripción. Podés filtrar por set en nuestro <a href="/singles">catálogo de singles</a> para ver todas las cartas de una expansión específica.
        </div>
      </details>
    </div>

    <!-- ===== Envíos ===== -->
    <div class="faq-category">
      <h2>📦 Envíos</h2>

      <details class="faq-item">
        <summary>¿Hacen envíos a todo el país?</summary>
        <div class="answer">
          <strong>Sí.</strong> Enviamos a toda la Argentina a través de <strong>Correo Argentino</strong>, tanto a domicilio como a sucursal. El tiempo estimado es de <strong>5 a 10 días hábiles</strong> según la distancia.
        </div>
      </details>

      <details class="faq-item">
        <summary>¿Cuánto cuesta el envío?</summary>
        <div class="answer">
          El costo varía según el destino y el peso del pedido. Al momento de confirmar la compra te mostramos el valor exacto. Para compras superiores a <strong>$30.000</strong>, el envío <strong>es gratis</strong>.
        </div>
      </details>

      <details class="faq-item">
        <summary>¿Puedo retirar el pedido en persona?</summary>
        <div class="answer">
          <strong>Sí.</strong> Ofrecemos punto de encuentro en <strong>Neuquén Capital</strong>. Coordinamos día y horario por WhatsApp una vez que el pedido esté listo. Sin costo adicional.
        </div>
      </details>

      <details class="faq-item">
        <summary>¿Cómo hago el seguimiento de mi pedido?</summary>
        <div class="answer">
          Una vez despachado, te compartimos el <strong>código de seguimiento</strong> de Correo Argentino por WhatsApp o por la sección <strong>"Mis números"</strong> en nuestra página de <a href="/raffles">Rifas</a>. También podés consultarnos directamente.
        </div>
      </details>
    </div>

    <!-- ===== Pagos ===== -->
    <div class="faq-category">
      <h2>💳 Pagos</h2>

      <details class="faq-item">
        <summary>¿Qué medios de pago aceptan?</summary>
        <div class="answer">
          Aceptamos:
          <br><strong>• Transferencia bancaria</strong> — por alias o CBU
          <br><strong>• Depósito</strong> — en cualquier sucursal
          <br><strong>• Mercado Pago</strong> — tarjetas de crédito/débito, link de pago
          <br><strong>• Efectivo</strong> — solo en punto de encuentro
        </div>
      </details>

      <details class="faq-item">
        <summary>¿Cómo pago por transferencia?</summary>
        <div class="answer">
          Al finalizar tu compra te damos nuestro <strong>alias y CBU</strong>. Una vez realizada la transferencia, subís el comprobante desde la página y lo verificamos en menos de 24 horas hábiles.
        </div>
      </details>

      <details class="faq-item">
        <summary>¿Cómo sé que mi pago fue recibido?</summary>
        <div class="answer">
          Te llega una <strong>notificación por WhatsApp</strong> cuando verificamos el pago. También podés consultar el estado de tu pedido en la sección <strong>"Mis números"</strong> de las rifas, o escribirnos directamente.
        </div>
      </details>
    </div>

    <!-- ===== Devoluciones ===== -->
    <div class="faq-category">
      <h2>🔄 Devoluciones</h2>

      <details class="faq-item">
        <summary>¿Puedo cancelar o modificar mi pedido?</summary>
        <div class="answer">
          <strong>Sí, siempre que el pedido no haya sido despachado.</strong> Si ya está en camino, no podemos modificarlo. Escribinos lo antes posible por WhatsApp y lo solucionamos.
        </div>
      </details>

      <details class="faq-item">
        <summary>¿Qué hago si la carta llegó dañada?</summary>
        <div class="answer">
          Si el producto llegó en mal estado por un problema nuestro o del correo, <strong>hacemos el cambio sin costo</strong>. Envianos fotos del daño por WhatsApp dentro de las <strong>48 horas</strong> de recibido y gestionamos el reemplazo.
        </div>
      </details>
    </div>

    <!-- ===== Contacto ===== -->
    <div class="faq-category">
      <h2>💬 Contacto</h2>

      <details class="faq-item">
        <summary>¿Cómo me comunico con soporte?</summary>
        <div class="answer">
          Podés escribirnos por <strong>WhatsApp al +54 11 XXXX-XXXX</strong>. Respondemos de <strong>lunes a viernes de 10 a 19 h</strong> y los <strong>sábados de 10 a 14 h</strong>. También podés enviarnos un mensaje directo desde la página y te contactamos a la brevedad.
        </div>
      </details>

      <details class="faq-item">
        <summary>¿Tienen redes sociales?</summary>
        <div class="answer">
          Sí, seguinos en <strong>Instagram</strong> y <strong>TikTok</strong> como <strong>@poketcg</strong>. Ahí publicamos novedades, pulls destacados y avisos de nuevos ingresos.
        </div>
      </details>
    </div>
  </div>

  <div class="faq-cta">
    <div class="foil-texture" style="opacity:0.04;"></div>
    <h3>¿No encontraste lo que buscabas?</h3>
    <p>Mandanos un mensaje directo por WhatsApp y te respondemos al toque.</p>
    <a href="https://wa.me/5411XXXXXXXX" class="btn btn-primary" target="_blank" rel="noopener">💬 Escribinos por WhatsApp</a>
  </div>

<?php include 'partials/footer.php'; ?>
  <script src="js/index.js"></script>
</body>
</html>