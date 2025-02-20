// GLOBAL VARIABLES
const durationFast = 0.5;
const durationBase = 0.8;
const durationSlow = 1.2;
const easeBase = "power3.inOut";

//
// FUNCTION DECLARATIONS
//

// LOADER

function loader() {
  const bg = document.querySelector('[data-load="bg"]');
  const heading = document.querySelector('[data-load="split"] > *');
  const fades = document.querySelectorAll('[data-load="fade-up"]');

  gsap.set('[data-load="split"]', { opacity: 1 });

  const headlineSplit = new SplitType(heading, {
    types: "words",
    tagName: "span",
  });

  const splitText = heading.querySelectorAll(".word");

  gsap.set(splitText, { x: "4rem", opacity: 0, filter: "blur(4px)" });

  let loadAnim = gsap.timeline({
    defaults: {
      duration: durationSlow,
      ease: "power3.out",
    },
  });

  if (bg) {
    loadAnim.to(bg, {
      opacity: 1,
      duration: 2,
    });
  }

  loadAnim.to(
    splitText,
    {
      x: "0rem",
      opacity: 1,
      filter: "blur(0px)",
      stagger: 0.08,
    },
    "<0.1"
  );

  if (fades.length) {
    loadAnim.to(
      fades,
      {
        y: "0rem",
        opacity: 1,
        stagger: 0.1,
      },
      "<0.1"
    );
  }
}

// FUNCTIONS

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

// SCROLL ANIMATIONS

function splitText() {
  const headings = document.querySelectorAll('[data-scroll="split"] > *');

  if (!headings.length) {
    return;
  }

  headings.forEach((heading) => {
    const headlineSplit = new SplitType(heading, {
      types: "words",
      tagName: "span",
    });

    const splitText = heading.querySelectorAll(".word");

    gsap.set(splitText, { x: "4rem", opacity: 0, filter: "blur(4px)" });

    let splitAnim = gsap.timeline({
      scrollTrigger: {
        trigger: heading,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      defaults: {
        duration: durationBase,
        ease: "power3.out",
      },
    });

    splitAnim.to(splitText, {
      x: "0rem",
      opacity: 1,
      filter: "blur(0px)",
      stagger: 0.07,
    });
  });
}

function fadeUp() {
  const fadeEls = document.querySelectorAll('[data-scroll="fade-up"]');

  if (!fadeEls.length) {
    return;
  }

  fadeEls.forEach((el) => {
    let fadeUp = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      defaults: {
        duration: durationBase,
        ease: "power3.out",
      },
    });

    fadeUp.to(el, {
      opacity: 1,
      y: "0rem",
    });
  });
}

function imageReveal() {
  const wrappers = document.querySelectorAll('[data-scroll="image"]');

  if (!wrappers.length) {
    return;
  }

  wrappers.forEach((wrapper) => {
    const imageAnim = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top bottom",
        toggleActions: "play none none reverse",
      },
      defaults: {
        duration: durationSlow,
        ease: "power3.out",
      },
    });

    imageAnim.to(wrapper, {
      scale: 1,
      filter: "blur(0px)",
    });
  });
}

function footerReveal() {
  const footer = document.querySelector('[data-scroll="footer"]');
  const logo = footer.querySelector(".footer_logo_wrap");

  let footerAnim = gsap.timeline({
    scrollTrigger: {
      trigger: footer,
      start: "top bottom",
      toggleActions: "play none none reverse",
    },
    defaults: {
      duration: durationSlow,
      ease: "power3.out",
    },
  });

  footerAnim.from(logo, {
    y: "4rem",
  });
}

//
// FUNCTION INITS
//

loader();
floatingLabel();
copyright();
splitText();
fadeUp();
imageReveal();
footerReveal();