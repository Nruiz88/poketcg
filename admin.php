<?php
  $page_title = 'Admin — PokéTCG';
  $meta_desc = 'Panel de administración PokéTCG';
  $css_file = 'css/admin.css';
  $include_auth = true;
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

  <div class="bg-pattern"></div>
  <div class="bg-foil"></div>
  <div class="bg-grid"></div>

  <div class="app">

    <!-- ===== HEADER ===== -->
    <header class="header">
      <div class="logo">
        <span class="pixel-ball"></span>
        Poké<span>TCG</span>
        <span style="font-size:0.35rem;color:var(--text-dim);margin-left:0.5rem;">· Admin</span>
      </div>
      <div class="user-area" id="user-area" style="display:none;">
        <img class="user-avatar" id="user-avatar" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect fill='%23333' width='32' height='32'/%3E%3Ctext x='16' y='22' text-anchor='middle' fill='%23aaa' font-size='16' font-family='sans-serif'%3E👤%3C/text%3E%3C/svg%3E" alt="">
        <span id="user-email"></span>
        <button class="btn-logout" id="btn-logout">Salir</button>
      </div>
    </header>

    <!-- ===== AUTH ===== -->
    <div class="auth-box" id="auth-box">
      <div class="pixel-ball-big"></div>
      <h2>Accedé al panel de <span>PokéTCG</span> para gestionar tu colección</h2>
      <button class="btn-google" id="btn-google">
        <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.54 28.59A14.5 14.5 0 0 1 9.5 24c0-1.59.28-3.14.76-4.59l-7.98-6.19A23.99 23.99 0 0 0 0 24c0 3.77.87 7.35 2.56 10.56l7.98-5.97z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 5.97C6.51 42.62 14.62 48 24 48z"/></svg>
        Continuar con Google
      </button>
    </div>

    <!-- ===== ADMIN PANEL ===== -->
    <div id="admin-panel" style="display:none;">

      <!-- Tabs -->
      <div class="tabs">
        <button class="tab-btn active" data-tab="cards">✦ Cartas</button>
        <button class="tab-btn" data-tab="sets">📦 Sets</button>
        <button class="tab-btn" data-tab="products">🏪 Tienda</button>
        <button class="tab-btn" data-tab="raffles">🎲 Rifas</button>
      </div>

      <!-- ===== TAB: CARDS ===== -->
      <div class="tab-content active" id="tab-cards">
        <!-- Stats -->
        <div class="stats" id="stats-bar">
          <div class="stat-card">
            <div class="num" id="stat-total">0</div>
            <div class="label">Cartas</div>
          </div>
          <div class="stat-card">
            <div class="num" id="stat-rarity">0</div>
            <div class="label">Sets</div>
          </div>
          <div class="stat-card">
            <div class="num" id="stat-value" style="font-size:0.6rem;">$0</div>
            <div class="label">Valor total</div>
          </div>
        </div>

        <div class="admin-grid">

        <!-- ===== FORM ===== -->
        <div class="panel" id="form-panel">
          <div class="panel-header">
            <div class="icon" id="form-icon">✦</div>
            <h3 id="form-title">Agregar carta</h3>
          </div>
          <form id="card-form">
            <input type="hidden" id="edit-id">

            <div class="form-row">
              <label>Nombre</label>
              <input type="text" id="f-name" placeholder="Pikachu VMAX" required autocomplete="off">
            </div>

            <div class="form-row">
              <label>Expansión <span id="f-set-hint" style="font-weight:400;color:var(--text-dim);font-size:0.6rem;">(sin sets cargados)</span></label>
              <input type="text" id="f-set" list="set-list" placeholder="Evolving Skies" required autocomplete="off">
              <datalist id="set-list"></datalist>
            </div>

            <div class="form-row-inline">
              <div class="form-row">
                <label>Rareza</label>
                <select id="f-rarity">
                  <option value="rare">Rare</option>
                  <option value="ultra">Ultra</option>
                  <option value="secret">Secret</option>
                  <option value="sar">SAR</option>
                </select>
              </div>
              <div class="form-row">
                <label>Tipo</label>
                <select id="f-type">
                  <option value="electric">⚡ Eléctrico</option>
                  <option value="fire">🔥 Fuego</option>
                  <option value="water">💧 Agua</option>
                  <option value="grass">🌱 Planta</option>
                  <option value="psychic">🌀 Psíquico</option>
                  <option value="dark">🌙 Siniestro</option>
                  <option value="dragon">🐉 Dragón</option>
                  <option value="metal">⚙️ Metal</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <label>Precio $</label>
              <input type="number" id="f-price" step="0.01" min="0" placeholder="24.99" required>
            </div>

            <div class="form-row">
              <label>Imagen de la carta</label>
              <div style="display:flex;gap:0.75rem;align-items:flex-start;flex-wrap:wrap;">
                <label class="upload-btn">
                  <input type="file" id="f-image" accept="image/*" style="display:none;">
                  <span class="upload-label">Seleccionar archivo</span>
                </label>
                <div class="upload-preview" id="upload-preview" style="display:none;">
                  <img id="preview-img" alt="preview">
                  <button type="button" class="btn-icon remove-img" id="remove-img" title="Quitar imagen">✕</button>
                </div>
              </div>
              <span class="hint">Formatos: JPG, PNG, WEBP. Tamaño recomendado: 350x490px.</span>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary" id="btn-submit">
                <span id="btn-submit-text">Guardar</span>
              </button>
              <button type="button" class="btn btn-secondary" id="btn-cancel" style="display:none;">Cancelar</button>
            </div>
          </form>
        </div>

        <!-- ===== TABLE ===== -->
        <div class="panel">
          <div class="panel-header">
            <div class="icon">📋</div>
            <h3>Cartas <span id="table-count" style="color:var(--yellow);">(0)</span></h3>
            <button class="btn-icon" onclick="loadCards()" title="Refrescar" style="margin-left:auto;">↻</button>
          </div>
          <div class="search-bar">
            <span class="search-icon">🔍</span>
            <input type="text" id="search-input" placeholder="Filtrar por nombre, expansión, rareza…" autocomplete="off">
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th style="width:38px;"></th>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Expansión</th>
                  <th>Tipo</th>
                  <th>Rareza</th>
                  <th>Precio</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="cards-tbody"></tbody>
            </table>
            <div class="empty-state" id="empty-msg">
              <div class="empty-icon">📦</div>
              <p>No hay cartas todavía. Agregá la primera desde el formulario.</p>
            </div>
          </div>
        </div>

      </div> <!-- /admin-grid -->
    </div> <!-- /tab-cards -->

    <!-- ===== TAB: SETS ===== -->
    <div class="tab-content" id="tab-sets">
      <!-- Stats -->
      <div class="stats" id="sets-stats">
        <div class="stat-card">
          <div class="num" id="stat-sets-total">0</div>
          <div class="label">Sets</div>
        </div>
        <div class="stat-card">
          <div class="num" id="stat-sets-cards">0</div>
          <div class="label">Cartas totales</div>
        </div>
        <div class="stat-card">
          <div class="num" id="stat-sets-latest" style="font-size:0.5rem;">—</div>
          <div class="label">Último</div>
        </div>
      </div>

      <div class="admin-grid">

        <!-- ===== SETS FORM ===== -->
        <div class="panel" id="sets-form-panel">
          <div class="panel-header">
            <div class="icon" id="sets-form-icon">📦</div>
            <h3 id="sets-form-title">Agregar set</h3>
          </div>
          <form id="sets-form">
            <input type="hidden" id="edit-set-id">

            <div class="form-row">
              <label>Nombre del set</label>
              <input type="text" id="sf-name" placeholder="Evolving Skies" required autocomplete="off">
            </div>

            <div class="form-row-inline">
              <div class="form-row">
                <label>Código</label>
                <input type="text" id="sf-code" placeholder="EVS" maxlength="6" required autocomplete="off" style="text-transform:uppercase;">
                <span class="hint">Abreviatura (3-6 caracteres)</span>
              </div>
              <div class="form-row">
                <label>Fecha de lanzamiento</label>
                <input type="date" id="sf-date">
              </div>
            </div>

            <div class="form-row">
              <label>Descripción</label>
              <input type="text" id="sf-desc" placeholder="Set basado en Pokémon Espada y Escudo…" autocomplete="off">
            </div>

            <div class="form-row">
              <label>Logo del set</label>
              <div style="display:flex;gap:0.75rem;align-items:flex-start;flex-wrap:wrap;">
                <label class="upload-btn">
                  <input type="file" id="sf-logo" accept="image/*" style="display:none;">
                  <span class="upload-label">Seleccionar logo</span>
                </label>
                <div class="upload-preview" id="sf-logo-preview" style="display:none;">
                  <img id="sf-logo-img" alt="logo preview">
                  <button type="button" class="btn-icon remove-img" id="sf-remove-logo" title="Quitar logo">✕</button>
                </div>
              </div>
              <span class="hint">Logo cuadrado, tamaño recomendado: 200x200px.</span>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary" id="btn-save-set">
                <span id="btn-save-set-text">Guardar</span>
              </button>
              <button type="button" class="btn btn-secondary" id="btn-cancel-set" style="display:none;">Cancelar</button>
            </div>
          </form>
        </div>

        <!-- ===== SETS TABLE ===== -->
        <div class="panel">
          <div class="panel-header">
            <div class="icon">📋</div>
            <h3>Sets <span id="sets-table-count" style="color:var(--yellow);">(0)</span></h3>
            <button class="btn-icon" onclick="loadSets()" title="Refrescar" style="margin-left:auto;">↻</button>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th style="width:38px;"></th>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Fecha</th>
                  <th>Cartas</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="sets-tbody"></tbody>
            </table>
            <div class="empty-state" id="sets-empty-msg">
              <div class="empty-icon">📦</div>
              <p>No hay sets todavía. Agregá el primero desde el formulario.</p>
            </div>
          </div>
        </div>

      </div> <!-- /admin-grid -->
    </div> <!-- /tab-sets -->

    <!-- ===== TAB: TIENDA ===== -->
    <div class="tab-content" id="tab-products">

      <div class="admin-grid">

        <!-- ===== PRODUCTS FORM ===== -->
        <div class="panel">
          <div class="panel-header">
            <div class="icon" id="pf-icon-header">🏪</div>
            <h3 id="pf-form-title">Agregar producto</h3>
          </div>
          <form id="products-form">
            <input type="hidden" id="pf-edit-id">

            <div class="form-row">
              <label>Slug</label>
              <input type="text" id="pf-slug" placeholder="etb-escarlata" required autocomplete="off">
              <span class="hint">Identificador único para la URL (sin espacios)</span>
            </div>

            <div class="form-row">
              <label>Nombre</label>
              <input type="text" id="pf-name" placeholder="ETB Escarlata & Púrpura" required autocomplete="off">
            </div>

            <div class="form-row-inline">
              <div class="form-row">
                <label>Tipo</label>
                <select id="pf-type">
                  <option value="ETB">ETB</option>
                  <option value="BB">BB</option>
                  <option value="Bundle">Bundle</option>
                  <option value="Sobre">Sobre</option>
                </select>
              </div>
              <div class="form-row">
                <label>Precio $</label>
                <input type="number" id="pf-price" step="0.01" min="0" placeholder="49.99" required>
              </div>
            </div>

            <div class="form-row">
              <label>Expansión / Set</label>
              <input type="text" id="pf-set" placeholder="Escarlata & Púrpura" autocomplete="off">
            </div>

            <div class="form-row-inline">
              <div class="form-row">
                <label>Icono (emoji)</label>
                <input type="text" id="pf-icon" placeholder="📦" maxlength="2" style="font-size:1.2rem;">
              </div>
              <div class="form-row">
                <label>Gradient (CSS)</label>
                <input type="text" id="pf-gradient" placeholder="linear-gradient(135deg,rgba(58,170,53,0.2),rgba(58,170,53,0.04))">
              </div>
            </div>

            <div class="form-row">
              <label>Descripción</label>
              <textarea id="pf-desc" rows="3" placeholder="Descripción del producto…" autocomplete="off"></textarea>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary" id="btn-save-product">
                <span id="btn-save-product-text">Guardar</span>
              </button>
              <button type="button" class="btn btn-secondary" id="btn-cancel-product" style="display:none;">Cancelar</button>
            </div>
          </form>
        </div>

        <!-- ===== PRODUCTS TABLE ===== -->
        <div class="panel">
          <div class="panel-header">
            <div class="icon">📋</div>
            <h3>Productos de la tienda <span id="products-table-count" style="color:var(--yellow);">(0)</span></h3>
            <button class="btn-icon" onclick="loadProductsAdmin()" title="Refrescar" style="margin-left:auto;">↻</button>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Slug</th>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Precio</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="products-tbody"></tbody>
            </table>
            <div class="empty-state" id="products-empty-msg">
              <div class="empty-icon">🏪</div>
              <p>No hay productos en la tienda todavía. Agregá el primero desde el formulario.</p>
            </div>
          </div>
        </div>

      </div> <!-- /admin-grid -->
    </div> <!-- /tab-products -->

    <!-- ===== TAB: RAFFLES ===== -->
    <div class="tab-content" id="tab-raffles">

      <div style="margin-bottom:1rem;">
        <button class="btn btn-primary" onclick="showRaffleForm()">+ Nueva rifa</button>
      </div>

      <!-- Create Raffle Form -->
      <div class="panel" id="raffle-form-panel" style="display:none;margin-bottom:1.5rem;">
        <div class="panel-header">
          <div class="icon">🎲</div>
          <h3 id="raffle-form-title">Nueva rifa</h3>
        </div>
        <form id="raffle-form">
          <input type="hidden" id="edit-raffle-id">

          <div class="form-row">
            <label>Título</label>
            <input type="text" id="rf-title" placeholder="PlayStation 5 + 2 Juegos" required autocomplete="off">
          </div>

          <div class="form-row">
            <label>Descripción</label>
            <input type="text" id="rf-desc" placeholder="PS5 edición digital + 2 juegos a elección" autocomplete="off">
          </div>

          <div class="form-row-inline">
            <div class="form-row">
              <label>Precio por número $</label>
              <input type="number" id="rf-price" step="0.01" min="0" placeholder="2500" required>
            </div>
            <div class="form-row">
              <label>Total de números</label>
              <input type="number" id="rf-total" min="1" placeholder="100" required>
            </div>
          </div>

          <div class="form-row-inline">
            <div class="form-row">
              <label>Premio</label>
              <input type="text" id="rf-prize" placeholder="PlayStation 5" autocomplete="off">
            </div>
            <div class="form-row">
              <label>Fecha de sorteo</label>
              <input type="date" id="rf-date">
            </div>
          </div>

          <div class="form-row">
            <label>Alias para transferencia</label>
            <input type="text" id="rf-alias" placeholder="POKETCG.ALIAS" autocomplete="off">
          </div>

          <div class="form-row">
            <label>CBU / CVU</label>
            <input type="text" id="rf-cbu" placeholder="0000000000000000000000" autocomplete="off">
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary" id="btn-save-raffle">Guardar rifa</button>
            <button type="button" class="btn btn-secondary" onclick="hideRaffleForm()">Cancelar</button>
          </div>
        </form>
      </div>

      <!-- Raffles List -->
      <div id="raffles-admin-list">
        <div class="raffle-empty" id="raffles-loading">Cargando rifas…</div>
      </div>
    </div> <!-- /tab-raffles -->

  </div> <!-- /admin-panel -->

  <!-- Toast -->
  <div class="toast-container" id="toast-container"></div>

<?php include 'partials/footer.php'; ?>
  <script src="js/admin.js"></script>
  <script src="js/admin-cards.js"></script>
  <script src="js/admin-sets.js"></script>
  <script src="js/admin-productos.js"></script>
  <script src="js/admin-raffles.js"></script>
</body>
</html>
