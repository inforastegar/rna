/**
 * scroll-reveal.js
 * ----------------------------------------------------------------
 * Handles the staggered "fade/reveal on scroll" behaviour for
 * repeatable card groups (USP cards, social network cards, ...).
 *
 * Kept as an isolated module (separate from main.js) so new
 * "reveal on scroll" groups can be added in the future by simply
 * adding another entry to the REVEAL_GROUPS array below — no need
 * to touch any other part of the codebase.
 * ----------------------------------------------------------------
 */
(function () {
  "use strict";

  // Each group: a wrapper selector to observe + the selector for the
  // individual cards inside it that should receive the "is-visible" class.
  var REVEAL_GROUPS = [
    {
      sectionSelector: "#uspSection",
      cardSelector: ".usp-card",
      staggerMs: 100,
      threshold: 0.1,
    },
    {
      sectionSelector: "#ribazSocialSection",
      cardSelector: ".ribaz-card",
      staggerMs: 100,
      threshold: 0.2,
    },
  ];

  function revealCards(cards, staggerMs) {
    cards.forEach(function (card, index) {
      window.setTimeout(function () {
        card.classList.add("is-visible");
      }, index * staggerMs);
    });
  }

  function initGroup(group) {
    var section = document.querySelector(group.sectionSelector);
    var cards = document.querySelectorAll(group.cardSelector);

    if (!section || !cards.length) return;

    if (!("IntersectionObserver" in window)) {
      cards.forEach(function (card) {
        card.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            revealCards(cards, group.staggerMs);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: group.threshold }
    );

    observer.observe(section);
  }

  document.addEventListener("DOMContentLoaded", function () {
    REVEAL_GROUPS.forEach(initGroup);
  });
})();
