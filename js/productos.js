var productos = [
  {
    slug: 'etb-escarlata',
    name: 'ETB Escarlata & Púrpura',
    type: 'ETB',
    set: 'Escarlata & Púrpura',
    price: 49.99,
    icon: '📦',
    gradient: 'linear-gradient(135deg,rgba(58,170,53,0.2),rgba(58,170,53,0.04))',
    description: '9 sobres, dados, counters, marcadores de daño y 2 cartas promosel de la última expansión. El kit completo para cualquier entrenador.'
  },
  {
    slug: 'bb-evoluciones',
    name: 'BB Evoluciones Prismáticas',
    type: 'BB',
    set: 'Evoluciones Prismáticas',
    price: 149.99,
    icon: '📐',
    gradient: 'linear-gradient(135deg,rgba(60,90,200,0.2),rgba(60,90,200,0.04))',
    description: 'Caja sellada de 36 sobres de la expansión más reciente. La forma más eficiente de completar sets y conseguir los mejores hits.'
  },
  {
    slug: 'bundle-llama-oscura',
    name: 'Bundle Llama Oscura',
    type: 'Bundle',
    set: 'Llama Oscura',
    price: 29.99,
    icon: '🎁',
    gradient: 'linear-gradient(135deg,rgba(200,60,60,0.2),rgba(200,60,60,0.04))',
    description: '6 sobres + 1 carta promosal en estuche compacto. Ideal para empezar tu colección o para un buen regalo.'
  },
  {
    slug: 'sobre-suelto',
    name: 'Booster Pack',
    type: 'Sobre',
    set: 'Selección variada',
    price: 5.99,
    icon: '🃏',
    gradient: 'linear-gradient(135deg,rgba(60,90,200,0.1),rgba(60,90,200,0.04))',
    description: '10 cartas por sobre. La emoción de abrir uno tras otro en busca de esa carta que tanto deseas.'
  },
  {
    slug: 'bb-estandar',
    name: 'Booster Box',
    type: 'BB',
    set: 'Selección variada',
    price: 129.99,
    icon: '📐',
    gradient: 'linear-gradient(135deg,rgba(200,60,60,0.1),rgba(200,60,60,0.04))',
    description: 'Caja sellada de 36 sobres. La forma más eficiente de completar sets y conseguir los mejores hits.'
  },
  {
    slug: 'bundle-estandar',
    name: 'Booster Bundle',
    type: 'Bundle',
    set: 'Selección variada',
    price: 24.99,
    icon: '🎁',
    gradient: 'linear-gradient(135deg,rgba(180,120,50,0.1),rgba(180,120,50,0.04))',
    description: '6 sobres + 1 carta promosal en estuche compacto. Perfecto para llevar a cualquier parte.'
  }
];

try {
  if (typeof db !== 'undefined' && db) {
    db.collection('products').get().then(function(snapshot) {
      if (!snapshot.empty) {
        var loaded = [];
        snapshot.forEach(function(doc) { loaded.push(doc.data()); });
        if (loaded.length > 0) {
          productos.length = 0;
          loaded.forEach(function(p) { productos.push(p); });
        }
      }
    }).catch(function() {});
  }
} catch(e) {}

var Carrito = {
  KEY: 'poketcg_carrito',

  obtener: function() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY)) || { items: [] };
    } catch (e) {
      return { items: [] };
    }
  },

  guardar: function(data) {
    localStorage.setItem(this.KEY, JSON.stringify(data));
    this.actualizarBadge();
  },

  cantidad: function() {
    var data = this.obtener();
    return data.items.reduce(function(sum, item) { return sum + item.cantidad; }, 0);
  },

  agregar: function(slug, cantidad) {
    cantidad = cantidad || 1;
    var prod = null;
    productos.forEach(function(p) { if (p.slug === slug) prod = p; });
    if (!prod) return;

    var data = this.obtener();
    var existente = null;
    data.items.forEach(function(item) { if (item.slug === slug) existente = item; });

    if (existente) {
      existente.cantidad += cantidad;
    } else {
      data.items.push({
        slug: prod.slug,
        name: prod.name,
        type: prod.type,
        price: prod.price,
        icon: prod.icon,
        gradient: prod.gradient,
        cantidad: cantidad
      });
    }
    this.guardar(data);
  },

  actualizarCantidad: function(slug, cantidad) {
    var data = this.obtener();
    if (cantidad < 1) {
      data.items = data.items.filter(function(item) { return item.slug !== slug; });
    } else {
      data.items.forEach(function(item) { if (item.slug === slug) item.cantidad = cantidad; });
    }
    this.guardar(data);
  },

  eliminar: function(slug) {
    var data = this.obtener();
    data.items = data.items.filter(function(item) { return item.slug !== slug; });
    this.guardar(data);
  },

  total: function() {
    var data = this.obtener();
    var total = 0;
    data.items.forEach(function(item) { total += item.price * item.cantidad; });
    return total;
  },

  vaciar: function() {
    this.guardar({ items: [] });
  },

  actualizarBadge: function() {
    var count = this.cantidad();
    var badges = document.querySelectorAll('.cart-badge');
    badges.forEach(function(el) {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }
};

document.addEventListener('DOMContentLoaded', function() {
  Carrito.actualizarBadge();
});
