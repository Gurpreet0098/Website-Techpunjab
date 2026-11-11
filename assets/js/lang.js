/* Loaded only on the English home page: send returning visitors who chose Punjabi straight to /pa/ */
(function () {
  try {
    if (localStorage.getItem('tp-lang') === 'pa' && (location.pathname === '/' || location.pathname === '/index.html')) {
      location.replace('/pa/' + location.hash);
    }
  } catch (e) { /* storage blocked: stay on English */ }
})();
