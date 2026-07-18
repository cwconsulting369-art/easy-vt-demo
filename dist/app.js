/* easy Veranstaltungstechnik — Interaktion: Burger-Menü, Scroll-Header, Einblend-Animationen. */
(function () {
  "use strict";

  function init() {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();

    var hdr = document.getElementById("hdr");
    var onScroll = function () { hdr.classList.toggle("is-stuck", window.scrollY > 40); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    var burger = document.getElementById("burger");
    var navEl = document.getElementById("nav");
    if (burger && navEl) {
      var setMenu = function (open) {
        navEl.classList.toggle("is-open", open);
        burger.setAttribute("aria-expanded", String(open));
      };
      burger.addEventListener("click", function () { setMenu(!navEl.classList.contains("is-open")); });
      navEl.addEventListener("click", function (e) { if (e.target.tagName === "A") setMenu(false); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
      document.addEventListener("click", function (e) {
        if (navEl.classList.contains("is-open") && !navEl.contains(e.target) && e.target !== burger && !burger.contains(e.target)) {
          setMenu(false);
        }
      });
    }

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: .08 });
      document.querySelectorAll(".rise").forEach(function (el) { io.observe(el); });
    } else {
      document.querySelectorAll(".rise").forEach(function (el) { el.classList.add("in"); });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
