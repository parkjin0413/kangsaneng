// 강산이엔지 — shared front-end behavior (mobile nav, product tabs)
document.addEventListener("DOMContentLoaded", function () {
  // Hero video: respect prefers-reduced-motion (pause autoplay, fall back to poster)
  var heroVideo = document.querySelector(".hero-media__asset");
  if (heroVideo && heroVideo.tagName === "VIDEO") {
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      heroVideo.pause();
      heroVideo.removeAttribute("autoplay");
    }
  }

  // Mobile nav drawer
  var openBtn = document.querySelector("[data-nav-open]");
  var closeBtn = document.querySelector("[data-nav-close]");
  var scrim = document.querySelector("[data-nav-scrim]");
  var drawer = document.querySelector("[data-mobile-nav]");

  function openNav() {
    if (!drawer) return;
    drawer.classList.add("is-open");
    document.body.style.overflow = "hidden";
    if (closeBtn) closeBtn.focus();
  }
  function closeNav() {
    if (!drawer) return;
    drawer.classList.remove("is-open");
    document.body.style.overflow = "";
    if (openBtn) openBtn.focus();
  }
  if (openBtn) openBtn.addEventListener("click", openNav);
  if (closeBtn) closeBtn.addEventListener("click", closeNav);
  if (scrim) scrim.addEventListener("click", closeNav);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });

  // Product category tabs
  var tabButtons = document.querySelectorAll("[data-tab-btn]");
  var tabPanels = document.querySelectorAll("[data-tab-panel]");
  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = btn.getAttribute("data-tab-btn");
      tabButtons.forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-selected", b === btn ? "true" : "false");
      });
      tabPanels.forEach(function (p) {
        p.classList.toggle("is-active", p.getAttribute("data-tab-panel") === target);
      });
    });
  });

  // Basic client-side required-field check for inquiry form (real validation happens server-side in Gnuboard5)
  var form = document.querySelector("[data-inquiry-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector("[data-form-status]");
      if (status) {
        status.textContent = "이 화면은 디자인 시안입니다. 실제 접수는 그누보드5 연동 후 정상 동작합니다.";
        status.style.display = "block";
      }
    });
  }
});
