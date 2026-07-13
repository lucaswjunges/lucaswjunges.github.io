// Language preference handling.
//
// SEO constraint: never auto-redirect a first-time visitor (Googlebot crawls
// from US IPs and must always see the English root). Instead:
//   1. First visit from a pt-* browser on the EN page → show a suggestion banner.
//   2. Any explicit language choice is stored in localStorage.
//   3. Returning visitors with a stored "pt" preference are redirected from
//      the root to /pt/ — an interaction-backed choice, not a guess.

(function () {
  var LANG_KEY = "lang";

  function getPref() {
    try { return localStorage.getItem(LANG_KEY); } catch (e) { return null; }
  }
  function setPref(lang) {
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* private mode */ }
  }

  var onPortuguesePage = document.documentElement.lang.toLowerCase().indexOf("pt") === 0;

  // Returning visitor who chose PT: honor the choice from the EN root.
  if (!onPortuguesePage && getPref() === "pt") {
    location.replace("pt/");
    return;
  }

  // Remember explicit choices made through any language link.
  document.addEventListener("click", function (ev) {
    var link = ev.target.closest ? ev.target.closest("[data-set-lang]") : null;
    if (link) setPref(link.getAttribute("data-set-lang"));
  });

  // First-visit suggestion for pt-* browsers on the EN page.
  var banner = document.getElementById("lang-banner");
  if (banner && !getPref()) {
    var browserLang = (navigator.language || "").toLowerCase();
    if (browserLang.indexOf("pt") === 0) {
      banner.classList.add("show");
      var dismiss = document.getElementById("lang-banner-dismiss");
      if (dismiss) {
        dismiss.addEventListener("click", function () {
          setPref("en");
          banner.classList.remove("show");
        });
      }
    }
  }
})();
