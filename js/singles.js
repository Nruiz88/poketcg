(function() {
  
  var allCards = [];

  // Intenta cargar desde Firestore
  function loadFromFirestore(callback) {
    if (typeof db === 'undefined') { callback([]); return; }
    db.collection('cards').get()
      .then(function(snapshot) {
        var cards = [];
        snapshot.forEach(function(doc) { cards.push(doc.data()); });
        cards.sort(function(a, b) { return a.id - b.id; });
        callback(cards.length ? cards : null);
      })
      .catch(function(err) { console.error('Firestore error:', err); callback(null); });
  }

  loadFromFirestore(function(cards) {
    if (cards) {
      allCards = cards;
    } else {
      // fallback estático
      allCards = [
    { id: 1,  name: 'Pikachu VMAX',       setName: 'Vivid Voltage',       rarity: 'ultra',  type: 'electric', price: 24.99,  art: '⚡', bg: '#2d1b69' },
    { id: 2,  name: 'Charizard ex',        setName: 'Obsidian Flames',    rarity: 'rare',   type: 'fire',    price: 19.99,  art: '🌿', bg: '#1b5e3a' },
    { id: 3,  name: 'Mewtwo VSTAR',        setName: 'Pokémon Go',         rarity: 'ultra',  type: 'psychic', price: 14.99,  art: '💎', bg: '#5e3a1b' },
    { id: 4,  name: 'Greninja ex',         setName: 'Twilight Masquerade',rarity: 'sar',    type: 'water',  price: 34.99,  art: '🌊', bg: '#1b3d5e' },
    { id: 5,  name: 'Giratina V',          setName: 'Lost Origin',        rarity: 'ultra',  type: 'psychic', price: 29.99,  art: '🌀', bg: '#5e1b3d' },
    { id: 6,  name: 'Umbreon VMAX',        setName: 'Evolving Skies',     rarity: 'secret', type: 'dark',    price: 89.99,  art: '🌌', bg: '#2a2a2a' },
    { id: 7,  name: 'Charizard V',         setName: 'Brilliant Stars',    rarity: 'ultra',  type: 'fire',    price: 39.99,  art: '🔥', bg: '#5e1b1b' },
    { id: 8,  name: 'Eevee VMAX',          setName: 'Sword & Shield',     rarity: 'ultra',  type: 'electric',price: 22.50,  art: '⚡', bg: '#2d4a1b' },
    { id: 9,  name: 'Lugia V',             setName: 'Silver Tempest',     rarity: 'ultra',  type: 'psychic', price: 44.99,  art: '🌀', bg: '#3b2d5e' },
    { id: 10, name: 'Rayquaza VMAX',       setName: 'Evolving Skies',     rarity: 'secret', type: 'dragon',  price: 74.99,  art: '🐉', bg: '#1b5e4a' },
    { id: 11, name: 'Gardevoir ex',        setName: 'Scarlet & Violet',   rarity: 'sar',    type: 'psychic', price: 18.99,  art: '🌀', bg: '#4a1b5e' },
    { id: 12, name: 'Blastoise ex',        setName: '151',                rarity: 'rare',   type: 'water',  price: 15.99,  art: '💧', bg: '#1b3d6e' },
    { id: 13, name: 'Venusaur ex',         setName: '151',                rarity: 'rare',   type: 'grass',  price: 14.99,  art: '🌱', bg: '#1b5e3a' },
    { id: 14, name: 'Gengar VMAX',         setName: 'Fusion Strike',      rarity: 'secret', type: 'psychic', price: 59.99,  art: '🌀', bg: '#2a1b3d' },
    { id: 15, name: 'Leafeon VMAX',        setName: 'Evolving Skies',     rarity: 'ultra',  type: 'grass',  price: 28.99,  art: '🌱', bg: '#2d5e1b' },
    { id: 16, name: 'Glaceon VMAX',        setName: 'Evolving Skies',     rarity: 'ultra',  type: 'water',  price: 32.99,  art: '💧', bg: '#1b4a5e' },
    { id: 17, name: 'Sylveon VMAX',        setName: 'Evolving Skies',     rarity: 'secret', type: 'psychic', price: 69.99,  art: '🌀', bg: '#4a1b4a' },
    { id: 18, name: 'Arceus VSTAR',        setName: 'Brilliant Stars',    rarity: 'ultra',  type: 'dragon',  price: 49.99,  art: '🐉', bg: '#3d3d1b' },
    { id: 19, name: 'Dialga VSTAR',        setName: 'Astral Radiance',    rarity: 'ultra',  type: 'metal',  price: 27.99,  art: '⚙️', bg: '#3b4a5e' },
    { id: 20, name: 'Palkia VSTAR',        setName: 'Astral Radiance',    rarity: 'ultra',  type: 'water',  price: 26.99,  art: '💧', bg: '#1b3d5e' },
    { id: 21, name: 'Mew VMAX',            setName: 'Fusion Strike',      rarity: 'secret', type: 'psychic', price: 54.99,  art: '🌀', bg: '#3a1b5e' },
    { id: 22, name: 'Lucario VSTAR',       setName: 'Brilliant Stars',    rarity: 'ultra',  type: 'metal',  price: 16.99,  art: '⚙️', bg: '#3b4a3b' },
    { id: 23, name: 'Zoroark VSTAR',       setName: 'Sword & Shield',     rarity: 'ultra',  type: 'dark',   price: 15.99,  art: '🌙', bg: '#2a1b1b' },
    { id: 24, name: 'Dragonite V',         setName: 'Evolving Skies',     rarity: 'rare',   type: 'dragon', price: 12.99,  art: '🐉', bg: '#3b4a1b' },
    { id: 25, name: 'Hisuian Zoroark V',   setName: 'Astral Radiance',    rarity: 'rare',   type: 'dark',   price: 8.99,   art: '🌙', bg: '#2a2a3d' },
    { id: 26, name: 'Regieleki VMAX',      setName: 'Silver Tempest',     rarity: 'ultra',  type: 'electric',price:21.99,  art: '⚡', bg: '#1b3d5e' },
    { id: 27, name: 'Reshiram V',          setName: 'Astral Radiance',    rarity: 'rare',   type: 'fire',   price: 9.99,   art: '🔥', bg: '#5e3a1b' },
    { id: 28, name: 'Zekrom V',            setName: 'Astral Radiance',    rarity: 'rare',   type: 'electric',price:9.99,  art: '⚡', bg: '#1b3d5e' },
    { id: 29, name: 'Kyogre V',            setName: 'Brilliant Stars',    rarity: 'rare',   type: 'water',  price: 10.99,  art: '💧', bg: '#1b4a5e' },
    { id: 30, name: 'Groudon V',           setName: 'Brilliant Stars',    rarity: 'rare',   type: 'fire',   price: 10.99,  art: '🔥', bg: '#5e3a1b' },
    { id: 31, name: 'Alakazam ex',         setName: '151',                rarity: 'sar',    type: 'psychic',price:28.99,  art: '🌀', bg: '#3b1b5e' },
    { id: 32, name: 'Zapdos ex',           setName: '151',                rarity: 'rare',   type: 'electric',price:11.99, art: '⚡', bg: '#3b4a1b' },
    { id: 33, name: 'Moltres ex',          setName: '151',                rarity: 'rare',   type: 'fire',   price: 12.99,  art: '🔥', bg: '#5e2d1b' },
    { id: 34, name: 'Articuno ex',         setName: '151',                rarity: 'rare',   type: 'water',  price: 11.99,  art: '💧', bg: '#1b4a5e' },
    { id: 35, name: 'Mew ex',              setName: 'Fusion Strike',      rarity: 'sar',    type: 'psychic',price:42.99,  art: '🌀', bg: '#4a1b5e' },
    { id: 36, name: 'Deoxys VMAX',         setName: 'Astral Radiance',    rarity: 'secret', type: 'psychic',price:49.99,  art: '🌀', bg: '#2a1b4a' },
    { id: 37, name: 'Celebi V',            setName: 'Fusion Strike',      rarity: 'rare',   type: 'grass',  price: 7.99,   art: '🌱', bg: '#2d4a1b' },
    { id: 38, name: 'Jirachi V',           setName: 'Brilliant Stars',    rarity: 'rare',   type: 'psychic',price:8.99,   art: '🌀', bg: '#3b2d4a' },
    { id: 39, name: 'Shaymin V',           setName: 'Brilliant Stars',    rarity: 'rare',   type: 'grass',  price: 6.99,   art: '🌱', bg: '#2d5e3a' },
    { id: 40, name: 'Manaphy V',           setName: 'Astral Radiance',    rarity: 'rare',   type: 'water',  price: 5.99,   art: '💧', bg: '#1b4a5e' },
    { id: 41, name: 'Darkrai VSTAR',       setName: 'Astral Radiance',    rarity: 'ultra',  type: 'dark',   price: 23.99,  art: '🌙', bg: '#1b1b2a' },
    { id: 42, name: 'Cresselia V',         setName: 'Astral Radiance',    rarity: 'rare',   type: 'psychic',price:7.99,   art: '🌀', bg: '#3b1b4a' },
    { id: 43, name: 'Unown V',             setName: 'Astral Radiance',    rarity: 'rare',   type: 'psychic',price:5.99,   art: '🌀', bg: '#2a2a3d' },
    { id: 44, name: 'Tyranitar V',         setName: 'Battle Styles',      rarity: 'rare',   type: 'dark',   price: 8.99,   art: '🌙', bg: '#2a1b1b' },
    { id: 45, name: 'Empoleon V',          setName: 'Battle Styles',      rarity: 'rare',   type: 'water',  price: 7.99,   art: '💧', bg: '#1b3d5e' },
    { id: 46, name: 'Togekiss V',          setName: 'Brilliant Stars',    rarity: 'rare',   type: 'psychic',price:6.99,   art: '🌀', bg: '#3b2d4a' },
    { id: 47, name: 'Honchkrow V',         setName: 'Brilliant Stars',    rarity: 'rare',   type: 'dark',   price: 5.99,   art: '🌙', bg: '#2a1b2a' },
    { id: 48, name: 'Whimsicott V',        setName: 'Brilliant Stars',    rarity: 'rare',   type: 'grass',  price: 4.99,   art: '🌱', bg: '#2d4a3a' },
  ];
    }

    
    var state = {
      search: '',
      type: 'all',
      rarity: 'all',
      set: 'all',
      page: 1,
      perPage: 24
    };

    var grid = document.getElementById('singles-grid');
    var countEl = document.getElementById('results-count');
    var paginationEl = document.getElementById('pagination');

    
    function getFilteredCards() {
      var cards = allCards.slice();

      if (state.search) {
        var q = state.search.toLowerCase();
        cards = cards.filter(function(c) {
          return c.name.toLowerCase().indexOf(q) !== -1 ||
                 c.setName.toLowerCase().indexOf(q) !== -1;
        });
      }

      if (state.type !== 'all') {
        cards = cards.filter(function(c) { return c.type === state.type; });
      }

      if (state.rarity !== 'all') {
        cards = cards.filter(function(c) { return c.rarity === state.rarity; });
      }

      if (state.set !== 'all') {
        cards = cards.filter(function(c) { return c.setName === state.set; });
      }

      return cards;
    }

    function rarityClass(rarity) {
      var map = { rare: 'rarity-rare', ultra: 'rarity-ultra', secret: 'rarity-secret', sar: 'rarity-sar' };
      return map[rarity] || '';
    }

    function formatPrice(p) {
      return '$' + p.toFixed(2);
    }

    var typeIcons = {
      electric: '⚡', fire: '🔥', water: '💧', grass: '🌱',
      psychic: '🌀', dark: '🌙', dragon: '🐉', metal: '⚙️'
    };

    function getBadge(c) {
      if (c.price >= 70) return '<span class="card-badge best-seller">🔥 Más vendida</span>';
      if (c.price >= 35 && c.rarity === 'sar') return '<span class="card-badge new">✦ Nuevo</span>';
      if (c.price >= 15 && c.rarity === 'rare') return '<span class="card-badge sale">-20%</span>';
      return '';
    }

    function getStock(c) {
      if (c.price >= 70) return '<div class="stock"><span class="dot red"></span><span class="label red">Queda 1</span></div>';
      if (c.price >= 35) return '<div class="stock"><span class="dot yellow"></span><span class="label yellow">Quedan 3</span></div>';
      return '<div class="stock"><span class="dot green"></span><span class="label green">En stock</span></div>';
    }

    function render() {
      var filtered = getFilteredCards();
      var total = filtered.length;
      var totalPages = Math.ceil(total / state.perPage) || 1;

      if (state.page > totalPages) state.page = totalPages;

      var start = (state.page - 1) * state.perPage;
      var pageCards = filtered.slice(start, start + state.perPage);

      countEl.textContent = total;

      // Grid
      if (pageCards.length === 0) {
        grid.innerHTML =
          '<div class="no-results">' +
            '<span class="icon">🔍</span>' +
            '<h3>Sin resultados</h3>' +
            '<p>No encontramos cartas con esos filtros. Intentá con otra búsqueda.</p>' +
          '</div>';
      } else {
        grid.innerHTML = pageCards.map(function(c) {
          var rarityLabel = c.rarity.charAt(0).toUpperCase() + c.rarity.slice(1);
          var icon = typeIcons[c.type] || '⚡';
          return (
            '<article class="single-card ' + rarityClass(c.rarity) + '" onclick="location.href=\'card-detail.html?id=' + c.id + '\'" style="cursor:pointer;">' +
              getBadge(c) +
              (c.imageUrl
                ? '<div class="card-art" style="background:#0a0a0f;"><img src="' + c.imageUrl + '" alt="' + c.name + '" loading="lazy" style="width:100%;height:100%;object-fit:contain;display:block;"></div>'
                : '<div class="card-art" style="background:linear-gradient(145deg,' + (c.bg || '#2d1b69') + ',' + (c.bg || '#2d1b69') + '22);">' + (c.art || '⚡') + '</div>') +
              '<div class="card-number">#' + String(c.id).padStart(3, '0') + '</div>' +
              '<h4><span class="energy-icon">' + icon + '</span>' + c.name + '</h4>' +
              '<p class="sub">' + c.setName + ' &middot; ' + rarityLabel + '</p>' +
              getStock(c) +
              '<div class="card-footer">' +
                '<span class="price-sm">' + formatPrice(c.price) + '</span>' +
                '<button class="btn-buy" onclick="event.stopPropagation();location.href=\'card-detail.html?id=' + c.id + '\'">Ver</button>' +
              '</div>' +
            '</article>'
          );
        }).join('');
      }

      // Pagination
      var pagHtml = '';
      var prevDisabled = state.page <= 1;
      var nextDisabled = state.page >= totalPages;

      pagHtml += '<button class="page-btn" data-page="prev"' + (prevDisabled ? ' disabled' : '') + '>◀</button>';

      for (var i = 1; i <= totalPages; i++) {
        pagHtml += '<button class="page-btn' + (i === state.page ? ' active' : '') + '" data-page="' + i + '">' + i + '</button>';
      }

      pagHtml += '<button class="page-btn" data-page="next"' + (nextDisabled ? ' disabled' : '') + '>▶</button>';

      paginationEl.innerHTML = pagHtml;

      // Scroll to top of grid
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    

    // Search
    var searchInput = document.getElementById('search-input');
    var searchTimer;

    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(function() {
        state.search = searchInput.value.trim();
        state.page = 1;
        render();
      }, 250);
    });

    // Filter buttons
    var filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var filter = btn.getAttribute('data-filter');
        var value = btn.getAttribute('data-value');

        var group = btn.closest('.filter-group');
        if (group) {
          group.querySelectorAll('.filter-btn').forEach(function(b) {
            b.classList.remove('active');
          });
        }
        btn.classList.add('active');

        state[filter] = value;
        state.page = 1;
        render();
      });
    });

    // Pagination (delegated)
    paginationEl.addEventListener('click', function(e) {
      var btn = e.target.closest('.page-btn');
      if (!btn || btn.disabled) return;

      var page = btn.getAttribute('data-page');

      if (page === 'prev' && state.page > 1) { state.page--; render(); }
      else if (page === 'next') { state.page++; render(); }
      else {
        var p = parseInt(page, 10);
        if (!isNaN(p)) { state.page = p; render(); }
      }
    });

    // Hamburger
    var hamburger = document.querySelector('.hamburger');
    var navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function() {
        var open = navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', open);
      });

      navLinks.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
          navLinks.classList.remove('open');
          hamburger.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });

      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          hamburger.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
          hamburger.focus();
        }
      });
    }

    // Build expansion filter buttons from data
    (function() {
      var setGroups = {};
      allCards.forEach(function(c) {
        if (!setGroups[c.setName]) setGroups[c.setName] = true;
      });
      var uniqueSets = Object.keys(setGroups).sort();
      var container = document.getElementById('set-filters');
      uniqueSets.forEach(function(s) {
        var btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.setAttribute('data-filter', 'set');
        btn.setAttribute('data-value', s);
        btn.textContent = s;
        container.appendChild(btn);
      });
    })();

    // Initial render
    render();
  });
})();
  