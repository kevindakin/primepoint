// GLOBAL VARIABLES
const durationBase = 0.8;
const durationSlow = 1.2;
const durationFast = 0.4;
const easeBase = "power4.inOut";

// GENERAL

function lenisScroll() {
  const lenis = new Lenis({
    lerp: 0.12,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
}

function isMenuOpen() {
  const menu = document.querySelector(".nav_menu");
  return menu && menu.getAttribute("aria-hidden") === "false";
}

function navScroll() {
  const navComponent = document.querySelector('[data-menu="nav"]');
  const heroSection = document.querySelector('[data-menu="hero"]');

  if (!navComponent || !heroSection) return;

  let navHidden = false;
  let activeTween = null;
  let pastHero = false;

  const instantBehavior =
    heroSection.getAttribute("data-menu-timing") === "instant";

  ScrollTrigger.create({
    trigger: heroSection,
    start: "bottom top",
    end: "bottom top",
    onEnter: () => {
      pastHero = true;
    },
    onEnterBack: () => {
      pastHero = false;
      navComponent.classList.remove("is-scrolled");
    },
  });

  ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      if (isMenuOpen()) {
        if (activeTween) activeTween.kill();
        gsap.set(navComponent, { y: "0%" });
        navComponent.classList.remove("is-scrolled");
        navHidden = false;
        return;
      }

      const scrollingUp = self.direction === -1;

      // Scrolling up - always show nav
      if (scrollingUp && navHidden) {
        if (activeTween) activeTween.kill();
        navHidden = false;

        activeTween = gsap.to(navComponent, {
          y: "0%",
          opacity: 1,
          duration: durationBase,
          ease: easeBase,
          onComplete: () => {
            activeTween = null;
          },
        });
      }
      // Scrolling down - hide based on behavior type
      else if (!scrollingUp && !navHidden) {
        // Instant behavior: always hide on scroll down
        // Default behavior: only hide if past hero
        if (instantBehavior || pastHero) {
          if (activeTween) activeTween.kill();
          navHidden = true;

          activeTween = gsap.to(navComponent, {
            y: "-100%",
            opacity: 1,
            duration: durationBase,
            ease: easeBase,
            onComplete: () => {
              if (pastHero) {
                navComponent.classList.add("is-scrolled");
              }
              activeTween = null;
            },
          });
        }
      }
    },
  });
}

function floatingLabel() {
  document.querySelectorAll(".form_main_input").forEach(function (input) {
    input.addEventListener("focusout", function () {
      if (this.value.length > 0) {
        this.classList.add("focus-out");
      } else {
        this.classList.remove("focus-out");
      }
    });
  });
}

function copyright() {
  const copyrightDate = document.querySelector(
    '[data-element="copyright-date"]'
  );

  if (copyrightDate) {
    const currentYear = new Date().getFullYear();
    copyrightDate.textContent = currentYear;
  }
}

// MOBILE MENU

function mobileMenu() {
  const nav = document.querySelector('[data-menu="nav"]');
  const menu = nav.querySelector(".nav_content");
  const button = nav.querySelector(".nav_hamburger");
  const buttonInner = button.querySelector(".nav_hamburger_inner");
  const links = menu.querySelectorAll('[data-menu="item"]');

  const lineTop = buttonInner.children[0];
  const lineMiddle = buttonInner.children[1];
  const lineBottom = buttonInner.children[2];

  gsap.set(links, { y: "4rem", opacity: 0 });

  let isAnimating = false;
  let isMenuOpen = false;

  let menuOpen = gsap.timeline({
    paused: true,
    defaults: {
      duration: 0.7,
      ease: "power4.out",
    },
    onStart: () => {
      isAnimating = true;
      gsap.set(menu, { display: "flex" });
      nav.classList.add("is-open");
    },
    onComplete: () => {
      isAnimating = false;
    },
  });

  let menuClose = gsap.timeline({
    paused: true,
    defaults: {
      duration: 0.7,
      ease: "power4.out",
    },
    onStart: () => {
      isAnimating = true;
    },
    onComplete: () => {
      gsap.set(menu, { display: "none" });
      nav.classList.remove("is-open");
      isAnimating = false;
    },
  });

  menuOpen
    .to(
      lineTop,
      {
        y: 7.5,
        rotate: -45,
        duration: 0.4,
      },
      0
    )
    .to(
      lineMiddle,
      {
        x: 8,
        opacity: 0,
        duration: 0.4,
      },
      0
    )
    .to(
      lineBottom,
      {
        width: "100%",
        y: -7.5,
        rotate: 45,
        duration: 0.4,
      },
      0
    )
    .to(menu, { opacity: 1 }, 0)
    .to(links, { y: "0rem", opacity: 1, stagger: 0.06 }, 0.05);

  menuClose
    .to(links, { y: "0rem", opacity: 0 }, 0)
    .to(menu, { opacity: 0 }, 0)
    .to(
      lineTop,
      {
        y: 0,
        rotate: 0,
        duration: 0.4,
      },
      0
    )
    .to(
      lineMiddle,
      {
        x: 0,
        opacity: 1,
        duration: 0.4,
      },
      0
    )
    .to(
      lineBottom,
      {
        width: "75%",
        y: 0,
        rotate: 0,
        duration: 0.4,
      },
      0
    );

  button.addEventListener("click", () => {
    if (isAnimating) return;

    if (!isMenuOpen) {
      menuOpen.restart();
      isMenuOpen = true;
    } else {
      menuClose.restart();
      isMenuOpen = false;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMenuOpen && !isAnimating) {
      menuClose.restart();
      isMenuOpen = false;
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  lenisScroll();
  navScroll();
  floatingLabel();
  copyright();

  gsap.matchMedia().add("(max-width: 991px)", () => {
    mobileMenu();
  });
});