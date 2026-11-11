/* Tech Punjab — shared behaviour for both language versions */
(function () {
  'use strict';

  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Remember the visitor's language choice (used by lang.js on the English home page)
  document.querySelectorAll('[data-set-lang]').forEach(function (link) {
    link.addEventListener('click', function () {
      try { localStorage.setItem('tp-lang', link.getAttribute('data-set-lang')); } catch (e) { /* storage blocked */ }
    });
  });

  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  // Contact form -> WhatsApp message (no backend, nothing stored on the site)
  var form = document.getElementById('contact-form');

  // "Get a quote" on a plan pre-selects the support-plan option and notes the plan
  document.querySelectorAll('[data-plan]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!form) return;
      var select = form.querySelector('#f-service');
      var message = form.querySelector('#f-message');
      if (select) select.selectedIndex = 1;
      if (message && !message.value.trim()) message.value = (form.getAttribute('data-plan-label') || 'Plan') + ': ' + btn.getAttribute('data-plan');
    });
  });

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var number = form.getAttribute('data-wa');
      var lines = [form.getAttribute('data-intro') || ''];
      form.querySelectorAll('[data-field]').forEach(function (input) {
        var value = (input.value || '').trim();
        if (input.tagName === 'SELECT') value = input.options[input.selectedIndex].text;
        if (!value) return;
        var label = form.querySelector('label[for="' + input.id + '"]');
        var name = label ? label.firstChild.textContent.trim().replace(/[?:？]+$/, '') : input.name;
        lines.push('• ' + name + ': ' + value);
      });

      var url = 'https://wa.me/' + number + '?text=' + encodeURIComponent(lines.join('\n'));
      // window.open returns null when 'noopener' is passed, so detach the opener manually instead
      var win = window.open(url, '_blank');
      if (win) { win.opener = null; } else { window.location.href = url; }
    });
  }
})();
