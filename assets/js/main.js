import { education, heroSlides, profile, projects, workExperiences } from "./data.js";

const page = document.body.dataset.page;

document.addEventListener("DOMContentLoaded", () => {
  renderProfile();
  renderHeroCarousel();
  initExperienceSection();
  renderProjects();
  initProjectSliders();
  initNavState();
});

function renderProfile() {
  const summaryRoot = document.querySelector("#hero-summary");
  const locationRoot = document.querySelector("#hero-location");
  const statusRoot = document.querySelector("#hero-status");
  const ctaRoot = document.querySelector("#hero-cta");
  const contactRoot = document.querySelector("#contact-links");

  if (summaryRoot) {
    summaryRoot.innerHTML = profile.summary.map((line) => `<p>${line}</p>`).join("");
  }

  if (locationRoot) {
    locationRoot.textContent = profile.location;
  }

  if (statusRoot) {
    statusRoot.textContent = profile.status;
  }

  if (ctaRoot) {
    ctaRoot.innerHTML = buildActionButtons(
      [
        { label: "Resume", href: profile.links.resume, primary: true },
        { label: "LinkedIn", href: profile.links.linkedin },
        { label: "Email", href: profile.links.email }
      ],
      true
    );
  }

  if (contactRoot) {
    contactRoot.innerHTML = buildActionButtons([
      { label: "Email", href: profile.links.email, primary: true },
      { label: "LinkedIn", href: profile.links.linkedin }
    ]);
  }
}

function renderHeroCarousel() {
  const carousel = document.querySelector("#hero-carousel");
  if (!carousel) return;

  carousel.innerHTML = `
    ${heroSlides
      .map(
        (slide, index) => `
          <article class="hero-slide ${index === 0 ? "is-active" : ""}">
            ${
              slide.image
                ? `
                  <div class="hero-slide-media">
                    <img src="${slide.image}" alt="${slide.alt || ""}">
                  </div>
                `
                : '<div class="hero-photo-placeholder" aria-hidden="true"></div>'
            }
          </article>
        `
      )
      .join("")}
    <div class="hero-dots" aria-hidden="true">
      ${heroSlides
        .map(
          (_, index) => `<span class="hero-dot ${index === 0 ? "is-active" : ""}"></span>`
        )
        .join("")}
    </div>
  `;

  const slides = [...carousel.querySelectorAll(".hero-slide")];
  const dots = [...carousel.querySelectorAll(".hero-dot")];
  let activeIndex = 0;
  let intervalId = null;
  let resumeTimeoutId = null;

  const advanceSlide = () => {
    slides[activeIndex].classList.remove("is-active");
    dots[activeIndex].classList.remove("is-active");
    activeIndex = (activeIndex + 1) % slides.length;
    slides[activeIndex].classList.add("is-active");
    dots[activeIndex].classList.add("is-active");
  };

  const startRotation = () => {
    if (intervalId !== null || slides.length <= 1) return;
    intervalId = window.setInterval(advanceSlide, 3200);
  };

  const stopRotation = () => {
    if (intervalId === null) return;
    window.clearInterval(intervalId);
    intervalId = null;
  };

  const clearResumeTimeout = () => {
    if (resumeTimeoutId === null) return;
    window.clearTimeout(resumeTimeoutId);
    resumeTimeoutId = null;
  };

  carousel.addEventListener("mouseenter", () => {
    clearResumeTimeout();
    stopRotation();
  });

  carousel.addEventListener("mouseleave", () => {
    if (slides.length <= 1) return;

    clearResumeTimeout();
    stopRotation();
    resumeTimeoutId = window.setTimeout(() => {
      resumeTimeoutId = null;
      advanceSlide();
      startRotation();
    }, 1000);
  });

  startRotation();
}

function initExperienceSection() {
  const listRoot = document.querySelector("#experience-list");
  if (!listRoot) return;

  const toggles = [...document.querySelectorAll("[data-experience-view]")];
  const render = (mode) => {
    const dataset = mode === "education" ? education : workExperiences;
    listRoot.classList.toggle("education-timeline", mode === "education");
    listRoot.classList.toggle("work-timeline", mode === "work");
    listRoot.innerHTML = dataset.map((entry) => buildExperienceCard(entry, mode)).join("");

    toggles.forEach((toggle) => {
      const active = toggle.dataset.experienceView === mode;
      toggle.classList.toggle("is-active", active);
      toggle.setAttribute("aria-pressed", String(active));
    });
  };

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => render(toggle.dataset.experienceView));
  });

  render("work");
}

function renderProjects() {
  const featuredRoot = document.querySelector("#featured-projects");
  const allProjectsRoot = document.querySelector("#all-projects");

  if (featuredRoot) {
    featuredRoot.innerHTML = projects.map((project) => buildProjectCard(project, false)).join("");
  }

  if (allProjectsRoot) {
    allProjectsRoot.innerHTML = projects.map((project) => buildProjectCard(project, true)).join("");
  }
}

function initProjectSliders() {
  const sliders = [...document.querySelectorAll("[data-project-slider]")];
  if (!sliders.length) return;

  sliders.forEach((slider) => {
    const prev = document.querySelector(`[data-slider-prev="${slider.id}"]`);
    const next = document.querySelector(`[data-slider-next="${slider.id}"]`);
    const scrollByCard = (direction) => {
      const firstCard = slider.querySelector(".project-card, .project-card-wide");
      if (!firstCard) return;

      const gap = Number.parseFloat(window.getComputedStyle(slider).columnGap || window.getComputedStyle(slider).gap || "0");
      const amount = firstCard.getBoundingClientRect().width + gap;
      slider.scrollBy({ left: amount * direction, behavior: "smooth" });
    };

    prev?.addEventListener("click", () => scrollByCard(-1));
    next?.addEventListener("click", () => scrollByCard(1));
  });
}

function initNavState() {
  const navLinks = [...document.querySelectorAll(".nav-link")];
  if (!navLinks.length) return;

  if (page === "projects") {
    setActiveNav("projects");
    return;
  }

  const sections = [...document.querySelectorAll("[data-section]")];
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        setActiveNav(visible.target.dataset.section);
      }
    },
    {
      rootMargin: "-35% 0px -45% 0px",
      threshold: [0.2, 0.45, 0.7]
    }
  );

  sections.forEach((section) => observer.observe(section));

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
    });
  });

  const initial = window.location.hash.replace("#", "");
  if (initial) {
    setActiveNav(initial);
  }

  function setActiveNav(section) {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.navTarget === section);
    });
  }
}

function buildExperienceCard(entry, mode) {
  if (mode === "education") {
    return buildEducationCard(entry);
  }

  const title = mode === "education" ? `${entry.org} - ${entry.degree}` : `${entry.org} - ${entry.role}`;
  const badge = entry.logoImage
    ? `<div class="logo-badge logo-badge-image" aria-hidden="true"><img src="${entry.logoImage}" alt=""></div>`
    : `<div class="logo-badge" aria-hidden="true">${entry.logoText}</div>`;

  const tagsMarkup = Array.isArray(entry.tags) && entry.tags.length
    ? `<div class="card-tags">${entry.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>`
    : "";

  return `
    <article class="experience-card">
      ${badge}
      <div>
        <div class="card-header">
          <h3>${title}</h3>
          <div class="card-meta">
            <span>${entry.start} - ${entry.end}</span>
            <span>${entry.location}</span>
          </div>
        </div>
        ${tagsMarkup}
        <ul class="bullet-list">
          ${entry.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
        </ul>
      </div>
    </article>
  `;
}

function buildEducationCard(entry) {
  const badge = entry.logoImage
    ? `<div class="logo-badge logo-badge-image" aria-hidden="true"><img src="${entry.logoImage}" alt=""></div>`
    : `<div class="logo-badge" aria-hidden="true">${entry.logoText}</div>`;

  return `
    <article class="education-card">
      <div class="education-badge-wrap">
        ${badge}
      </div>
      <div class="education-card-body">
        <div class="education-card-header">
          <div class="education-heading">
            ${entry.subline ? `<p class="education-subline">${entry.subline}</p>` : ""}
            <h3>${entry.org} - ${entry.degree}</h3>
          </div>
          <p class="education-date">${entry.graduation}</p>
        </div>
      </div>
    </article>
  `;
}

function buildProjectCard(project, wide) {
  const figure = project.image
    ? `<figure class="card-figure"><img src="${project.image}" alt="${project.title}"></figure>`
    : `<div class="card-figure">Project image placeholder</div>`;
  const actions = [];

  if (project.links.github) {
    actions.push(buildSingleAction(project.links.github, "GitHub"));
  }

  if (project.links.website) {
    actions.push(buildSingleAction(project.links.website, "Project Website"));
  }

  if (project.links.cad) {
    actions.push(buildSingleAction(project.links.cad, "CAD"));
  }

  return `
    <article class="${wide ? "project-card-wide" : "project-card"}">
      ${figure}
      <h3>${project.title}</h3>
      <div class="card-tags">${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
      <p class="project-description">${project.description}</p>
      ${actions.length ? `<div class="project-actions">${actions.join("")}</div>` : ""}
    </article>
  `;
}

function buildActionButtons(items, emphasizeFirst = false) {
  return items
    .map((item, index) => {
      const classes = ["button"];
      classes.push(index === 0 && emphasizeFirst ? "button-primary" : "button-secondary");
      if (item.href === "#") classes.push("is-disabled");

      return `
        <a
          class="${classes.join(" ")}"
          href="${item.href}"
          ${item.href.startsWith("mailto:") || item.href.startsWith("#") ? "" : 'target="_blank" rel="noreferrer"'}
        >
          ${item.label}
        </a>
      `;
    })
    .join("");
}

function buildSingleAction(href, label) {
  const disabled = !href || href === "#";
  return `
    <a
      class="button button-secondary ${disabled ? "is-disabled" : ""}"
      href="${href}"
      ${disabled ? 'tabindex="-1" aria-disabled="true"' : 'target="_blank" rel="noreferrer"'}
    >
      ${label}
    </a>
  `;
}
