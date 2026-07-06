var authBox = document.getElementById('auth-box');
var adminPanel = document.getElementById('admin-panel');
var userArea = document.getElementById('user-area');
var userAvatar = document.getElementById('user-avatar');
var userEmail = document.getElementById('user-email');
var btnGoogle = document.getElementById('btn-google');
var btnLogout = document.getElementById('btn-logout');
var toastContainer = document.getElementById('toast-container');

function showAdmin(user) {
  authBox.style.display = 'none';
  adminPanel.style.display = 'block';
  userArea.style.display = 'flex';
  userEmail.textContent = user.email;
  if (user.photoURL) userAvatar.src = user.photoURL;
}

function showAuth() {
  authBox.style.display = 'flex';
  adminPanel.style.display = 'none';
  userArea.style.display = 'none';
}

function escHtml(s) {
  if (typeof s !== 'string') return '';
  var d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

window.showToast = function(msg, type) {
  var el = document.createElement('div');
  el.className = 'toast ' + type;
  el.textContent = msg;
  toastContainer.appendChild(el);
  requestAnimationFrame(function() {
    el.classList.add('show');
  });
  setTimeout(function() {
    el.classList.remove('show');
    setTimeout(function() { el.remove(); }, 300);
  }, 3000);
}

auth.onAuthStateChanged(function(user) {
  if (user) {
    showAdmin(user);
    if (window.loadCards) loadCards();
    if (window.loadSets) loadSets();
    if (window.loadProductsAdmin) loadProductsAdmin();
  } else {
    showAuth();
  }
});

btnGoogle.addEventListener('click', function() {
  var provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).catch(function(err) {
    showToast('Error: ' + err.message, 'error');
  });
});

btnLogout.addEventListener('click', function() {
  auth.signOut();
});

document.querySelectorAll('.tab-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
    document.querySelectorAll('.tab-content').forEach(function(c) { c.classList.remove('active'); });
    btn.classList.add('active');
    document.getElementById('tab-' + btn.getAttribute('data-tab')).classList.add('active');
    if (btn.getAttribute('data-tab') === 'raffles' && window.loadRafflesAdmin) loadRafflesAdmin();
    if (btn.getAttribute('data-tab') === 'sets' && window.loadSets) loadSets();
    if (btn.getAttribute('data-tab') === 'products' && window.loadProductsAdmin) loadProductsAdmin();
  });
});
