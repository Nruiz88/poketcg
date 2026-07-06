(function() {
  var allCards = [];

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

    renderDetail();
  });

  function getCardById(id) {
    var numId = parseInt(id, 10);
    for (var i = 0; i < allCards.length; i++) {
      if (allCards[i].id === numId) return allCards[i];
    }
    return null;
  }

  var typeIcons = {
    electric: '⚡', fire: '🔥', water: '💧', grass: '🌱',
    psychic: '🌀', dark: '🌙', dragon: '🐉', metal: '⚙️'
  };

  var typeNames = {
    electric: 'Eléctrico', fire: 'Fuego', water: 'Agua', grass: 'Planta',
    psychic: 'Psíquico', dark: 'Siniestro', dragon: 'Dragón', metal: 'Metal'
  };

  var rarityLabels = {
    rare: 'Rare', ultra: 'Ultra Rare', secret: 'Secret Rare', sar: 'SAR'
  };

  function getBadge(c) {
    if (c.price >= 70) return '<span class="card-badge-detail best-seller">🔥 Más vendida</span>';
    if (c.price >= 35 && c.rarity === 'sar') return '<span class="card-badge-detail new">✦ Nuevo</span>';
    if (c.price >= 15 && c.rarity === 'rare') return '<span class="card-badge-detail sale">-20%</span>';
    return '';
  }

  function getStock(c) {
    if (c.price >= 70) return '<span class="dot red"></span><span class="label red">Queda 1 unidad</span>';
    if (c.price >= 35) return '<span class="dot yellow"></span><span class="label yellow">Quedan 3 unidades</span>';
    return '<span class="dot green"></span><span class="label green">En stock</span>';
  }

  function renderDetail() {
    var params = new URLSearchParams(window.location.search);
    var cardId = params.get('id');

    if (!cardId) {
      showError();
      return;
    }

    var c = getCardById(cardId);

    if (!c) {
      showError();
      return;
    }

    document.getElementById('breadcrumb-name').textContent = c.name;

    var icon = typeIcons[c.type] || '⚡';
    var rarityLabel = rarityLabels[c.rarity] || c.rarity.charAt(0).toUpperCase() + c.rarity.slice(1);
    var rarityClass = c.rarity;

    var artHtml = c.imageUrl
      ? '<img class="card-img" src="' + c.imageUrl + '" alt="' + c.name + '">'
      : '<span class="card-fallback">' + (c.art || '⚡') + '</span>';

    var bgStyle = c.bg ? 'background:linear-gradient(145deg,' + c.bg + ',' + c.bg + '44);' : '';

    document.getElementById('detail-content').innerHTML =
      '<div class="container">' +
        '<div class="detail-grid">' +
          '<div class="card-art-wrap rarity-' + rarityClass + '" style="' + bgStyle + '">' +
            '<div class="glow-overlay"></div>' +
            artHtml +
          '</div>' +
          '<div class="card-info">' +
            '<div class="card-number">#' + String(c.id).padStart(3, '0') + '</div>' +
            getBadge(c) +
            '<h1><span class="energy-icon" style="font-size:1.2rem;margin-right:0.3rem;">' + icon + '</span>' + c.name + '</h1>' +
            '<div class="meta-row">' +
              '<span class="rarity-badge-detail ' + rarityClass + '">' + rarityLabel + '</span>' +
              '<span class="set-name">' + c.setName + '</span>' +
            '</div>' +
            '<div class="energy-type">' +
              '<span class="e-icon">' + icon + '</span>' +
              (typeNames[c.type] || c.type) +
            '</div>' +
            '<div class="divider"></div>' +
            '<div class="price-large">$' + c.price.toFixed(2) + '</div>' +
            '<div class="stock-detail">' + getStock(c) + '</div>' +
            '<div class="divider"></div>' +
            '<div class="qty-selector">' +
              '<label for="qty">Cantidad</label>' +
              '<select id="qty">' +
                '<option value="1">1</option>' +
                '<option value="2">2</option>' +
                '<option value="3">3</option>' +
              '</select>' +
            '</div>' +
            '<div class="action-row">' +
              '<button class="btn btn-primary btn-buy-large" onclick="alert(\'Carrito próximamente\')">Agregar al carrito</button>' +
              '<a href="singles.html" class="btn btn-secondary">← Volver</a>' +
            '</div>' +
            '<div class="divider"></div>' +
            '<div class="specs">' +
              '<div class="spec-item">' +
                '<div class="spec-label">Número</div>' +
                '<div class="spec-value">#' + String(c.id).padStart(3, '0') + '</div>' +
              '</div>' +
              '<div class="spec-item">' +
                '<div class="spec-label">Expansión</div>' +
                '<div class="spec-value">' + c.setName + '</div>' +
              '</div>' +
              '<div class="spec-item">' +
                '<div class="spec-label">Rareza</div>' +
                '<div class="spec-value">' + rarityLabel + '</div>' +
              '</div>' +
              '<div class="spec-item">' +
                '<div class="spec-label">Tipo</div>' +
                '<div class="spec-value">' + (typeNames[c.type] || c.type) + '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function showError() {
    document.getElementById('detail-content').innerHTML =
      '<div class="container">' +
        '<div class="error-state">' +
          '<span class="icon">🔍</span>' +
          '<h2>Carta no encontrada</h2>' +
          '<p>No encontramos la carta que buscás. Podría haber sido removida o el enlace es inválido.</p>' +
          '<div style="margin-top:1.5rem;"><a href="singles.html" class="btn btn-secondary">← Volver al catálogo</a></div>' +
        '</div>' +
      '</div>';
  }

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
})();
