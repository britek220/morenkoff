// metrika-lazy.js — Яндекс.Метрика с ленивой загрузкой (2 счётчика)
(function() {
  if (window.__metrikaLazyLoaded) return;
  window.__metrikaLazyLoaded = true;

  // ===== СПИСОК СЧЁТЧИКОВ =====
  const COUNTERS = [
    {
      id: 108365516, // счётчик №1
      opts: {
        ssr: true,
        webvisor: true,
        clickmap: true,
        ecommerce: "dataLayer",
        referrer: document.referrer,
        url: location.href,
        accurateTrackBounce: true,
        trackLinks: true
      }
    },
    {
      id: 114379424, // счётчик №2
      opts: {
        ssr: true,
        webvisor: true,
        clickmap: true,
        ecommerce: "dataLayer",
        referrer: document.referrer,
        url: location.href,
        accurateTrackBounce: true,
        trackLinks: true
      }
    }
  ];

  let loaded = false;

  function loadMetrika() {
    if (loaded) return;
    loaded = true;

    // Загружаем tag.js один раз (он общий для всех счётчиков)
    if (!document.querySelector('script[src*="mc.yandex.ru/metrika/tag.js"]')) {
      (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        k=e.createElement(t),a=e.getElementsByTagName(t)[0];
        k.async=1;k.src=r;a.parentNode.insertBefore(k,a);
      })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
    }

    // Инициализируем каждый счётчик
    COUNTERS.forEach(function(c) {
      ym(c.id, 'init', c.opts);
    });
  }

  // 1) Lazy: при скролле > 300px
  function onScroll() {
    if (window.scrollY > 300) {
      window.removeEventListener('scroll', onScroll);
      loadMetrika();
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // 2) Fallback: через 5 секунд
  setTimeout(loadMetrika, 5000);

  // 3) Триггер по клику на интерактив
  document.addEventListener('click', function(e) {
    if (e.target.closest && e.target.closest('a, button, [data-track]')) {
      loadMetrika();
    }
  }, { passive: true });

  // 4) Noscript-fallback для обоих счётчиков
  if (!window.addEventListener) {
    COUNTERS.forEach(function(c) {
      document.write(
        '<img src="https://mc.yandex.ru/watch/' + c.id +
        '" style="position:absolute;left:-9999px;" alt="" />'
      );
    });
  }
})();
