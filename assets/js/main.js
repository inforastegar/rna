(function () {
  // لودینگ صفحه
  // window.onload = function () {
  //   window.setTimeout(fadeout, 300);
  // };
  // function fadeout() {
  //   document.querySelector(".preloader").style.opacity = "0";
  //   document.querySelector(".preloader").style.display = "none";
  // }

  // منوی چسبان و دکمه اسکرول به بالا
  window.onscroll = function () {
    var header_navbar = document.querySelector(
      ".hero-section-wrapper-5 .header"
    );
    var sticky = header_navbar.offsetTop;

    if (window.pageYOffset > sticky) {
      header_navbar.classList.add("sticky");
    } else {
      header_navbar.classList.remove("sticky");
    }

    var backToTo = document.querySelector(".scroll-top");
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      backToTo.style.display = "flex";
    } else {
      backToTo.style.display = "none";
    }
  };

  // منوی تمام‌صفحه موبایل و تبلت
  var navbarToggler6 = document.querySelector(".header-6 .navbar-toggler");
  var navbarCollapse6 = document.querySelector(".header-6 .navbar-collapse");
  var mobileNavClose = document.querySelector(".mobile-nav-close");
  var HEADER_OFFSET = 73; // هماهنگ با آفست استفاده‌شده در تشخیص سکشن فعال هنگام اسکرول

  function openMobileMenu() {
    if (!navbarToggler6 || !navbarCollapse6) return;
    navbarToggler6.classList.add("active");
    navbarCollapse6.classList.add("mobile-nav-active");
    navbarToggler6.setAttribute("aria-expanded", "true");
    document.body.classList.add("mobile-nav-open");
  }

  function closeMobileMenu() {
    if (!navbarToggler6 || !navbarCollapse6) return;
    navbarToggler6.classList.remove("active");
    navbarCollapse6.classList.remove("mobile-nav-active");
    navbarToggler6.setAttribute("aria-expanded", "false");
    document.body.classList.remove("mobile-nav-open");
  }

  function smoothScrollToTarget(targetId) {
    var target = document.querySelector(targetId);
    if (!target) return;
    var targetTop =
      target.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  }

  if (navbarToggler6 && navbarCollapse6) {
    navbarToggler6.addEventListener("click", function () {
      if (navbarCollapse6.classList.contains("mobile-nav-active")) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener("click", closeMobileMenu);
  }

  document.querySelectorAll(".header-6 .page-scroll").forEach((link) =>
    link.addEventListener("click", function (e) {
      var href = this.getAttribute("href");
      var isMobileMenuOpen =
        navbarCollapse6 && navbarCollapse6.classList.contains("mobile-nav-active");

      if (isMobileMenuOpen && href && href.charAt(0) === "#") {
        e.preventDefault();
        closeMobileMenu();
        window.setTimeout(function () {
          smoothScrollToTarget(href);
        }, 420); // هم‌زمان با پایان انیمیشن بسته‌شدن منو
      }
    })
  );

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMobileMenu();
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 992) closeMobileMenu();
  });

  // فعال‌سازی لینک‌های منو هنگام اسکرول
  function onScroll(event) {
    var sections = document.querySelectorAll(".page-scroll");
    var scrollPos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    for (var i = 0; i < sections.length; i++) {
      var currLink = sections[i];
      var val = currLink.getAttribute("href");
      var refElement = document.querySelector(val);

      if (refElement) {
        var scrollTopMinus = scrollPos + 73;
        if (
          refElement.offsetTop <= scrollTopMinus &&
          refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
        ) {
          document.querySelector(".page-scroll").classList.remove("active");
          currLink.classList.add("active");
        } else {
          currLink.classList.remove("active");
        }
      }
    }
  }

  window.document.addEventListener("scroll", onScroll);

  // تنظیمات اسلایدر قیمت‌گذاری
  if (document.querySelector(".pricing-active")) {
    tns({
      container: ".pricing-active",
      autoplay: false,
      mouseDrag: true,
      gutter: 0,
      nav: false,
      controls: true,
      controlsText: [
        '<i class="lni lni-chevron-left prev"></i>',
        '<i class="lni lni-chevron-right prev"></i>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 2,
        },
        992: {
          items: 1.2,
        },
        1200: {
          items: 2,
        },
      },
    });
  }

  // فرم ارسال پیام
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (form && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      status.innerHTML = "در حال ارسال پیام...";

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then((response) => {
          if (response.ok) {
            status.innerHTML = "✅ پیام با موفقیت ارسال شد.";
            form.reset();
          } else {
            status.innerHTML = "❌ خطا در ارسال پیام. دوباره تلاش کنید.";
          }
        })
        .catch(() => {
          status.innerHTML = "❌ ارتباط با سرور برقرار نشد.";
        });
    });
  }

  // هم‌ارتفاع کردن هدر کارت‌های خدمات (مستقل از باز/بسته بودن آکاردئون)
  function equalizeServiceHeadHeights() {
    var heads = document.querySelectorAll(".service-card-head");
    if (!heads.length) return;
    heads.forEach((head) => (head.style.minHeight = "0px"));
    var maxHeight = 0;
    heads.forEach((head) => {
      if (head.offsetHeight > maxHeight) maxHeight = head.offsetHeight;
    });
    heads.forEach((head) => (head.style.minHeight = maxHeight + "px"));
  }

  // آکاردئون سکشن خدمات
  var serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    var head = card.querySelector(".service-card-head");
    var panel = card.querySelector(".service-panel");
    if (!head || !panel) return;

    head.addEventListener("click", function (e) {
      e.preventDefault();
      var nowActive = !card.classList.contains("active");
      card.classList.toggle("active", nowActive);
      head.setAttribute("aria-expanded", String(nowActive));
      panel.style.maxHeight = nowActive ? panel.scrollHeight + "px" : "0px";
    });
  });

  if (serviceCards.length) {
    equalizeServiceHeadHeights();
    window.addEventListener("load", equalizeServiceHeadHeights);
  }

  // به‌روزرسانی ارتفاع کارت‌های باز هنگام تغییر سایز صفحه (چرخش موبایل و ...)
  window.addEventListener("resize", function () {
    equalizeServiceHeadHeights();
    document.querySelectorAll(".service-card.active .service-panel").forEach((panel) => {
      panel.style.maxHeight = panel.scrollHeight + "px";
    });
  });

  // دکمه‌ی فیکس انتخاب زبان (منوی بازشونده به سمت بالا / شیت تمام‌عرض در موبایل)
  var langSwitcher = document.getElementById("fixedLangSwitcher");
  var langSwitcherToggle = langSwitcher
    ? langSwitcher.querySelector(".lang-switcher-toggle")
    : null;
  var langSwitcherBackdrop = langSwitcher
    ? langSwitcher.querySelector(".lang-switcher-backdrop")
    : null;

  function closeLangSwitcher() {
    if (!langSwitcher || !langSwitcherToggle) return;
    langSwitcher.classList.remove("open");
    langSwitcherToggle.setAttribute("aria-expanded", "false");
  }

  if (langSwitcher && langSwitcherToggle) {
    langSwitcherToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = langSwitcher.classList.toggle("open");
      langSwitcherToggle.setAttribute("aria-expanded", String(isOpen));
    });

    if (langSwitcherBackdrop) {
      langSwitcherBackdrop.addEventListener("click", closeLangSwitcher);
    }

    document.addEventListener("click", function (e) {
      if (!langSwitcher.contains(e.target) || e.target === langSwitcherBackdrop) {
        closeLangSwitcher();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLangSwitcher();
    });
  }

  // فعال‌سازی انیمیشن‌ها
  new WOW({
    offset: -150, // با مقدار منفی، انیمیشن قبل از رسیدن کامل به المنت اجرا می‌شود
    mobile: true,
    live: true,
  }).init();
})();
