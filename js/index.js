(function() {
  // Hamburger menu
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

  // Newsletter
  var form = document.getElementById('newsletter-form');
  var emailInput = document.getElementById('newsletter-email');

  if (form && emailInput) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var email = emailInput.value.trim();
      if (!email || email.indexOf('@') === -1) {
        emailInput.style.borderColor = '#e44';
        emailInput.focus();
        return;
      }
      emailInput.style.borderColor = '';
      var btn = form.querySelector('.btn');
      var originalText = btn.textContent;
      btn.textContent = '✓ Recibido!';
      btn.style.pointerEvents = 'none';
      emailInput.value = '';
      setTimeout(function() {
        btn.textContent = originalText;
        btn.style.pointerEvents = '';
      }, 3000);
    });

    emailInput.addEventListener('input', function() {
      emailInput.style.borderColor = '';
    });
  }

  // Intersection Observer for scroll reveals
  var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function(el) { observer.observe(el); });
  } else {
    revealElements.forEach(function(el) { el.classList.add('visible'); });
  }
})();
