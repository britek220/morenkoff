// metrika-lazy.js — Яндекс.Метрика с ленивой загрузкой
(function() {
  // Проверяем, загружена ли уже Метрика
  if (window.ym) return;

  // Функция загрузки Метрики
  function loadMetrika() {
    if (document.querySelector('script[src*="mc.yandex.ru"]')) return;
    
    (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=108365516', 'ym');

    ym(108365516, 'init', {
      ssr:true, 
      webvisor:true, 
      clickmap:true, 
      ecommerce:"dataLayer", 
      referrer: document.referrer, 
      url: location.href, 
      accurateTrackBounce:true, 
      trackLinks:true
    });

    // Отправляем hit сразу после загрузки
    ym(108365516, 'reachGoal', 'page_view');
  }

  // Загрузка при скролле (lazy)
  let scrolled = false;
  window.addEventListener('scroll', function() {
    if (!scrolled && window.scrollY > 300) {
      scrolled = true;
      loadMetrika();
      window.removeEventListener('scroll', arguments.callee);
    }
  }, { passive: true });

  // Fallback: загрузка через 5 сек или при клике
  setTimeout(() => {
    if (!scrolled) loadMetrika();
  }, 5000);

  // Триггер по клику на любой интерактив (кнопки/links)
  document.addEventListener('click', function(e) {
    if (e.target.matches('a, button, [data-track]') && !scrolled) {
      scrolled = true;
      loadMetrika();
    }
  }, { passive: true });

  // Noscript fallback
  if (!window.addEventListener) {
    document.write('<img src="https://mc.yandex.ru/watch/108365516" style="position:absolute;left:-9999px;" alt="" />');
  }
})();
