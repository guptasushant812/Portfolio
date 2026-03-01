// =========================
// DOM CONTENT LOADED - INIT
// =========================
document.addEventListener("DOMContentLoaded", function () {
  // =========================
  // LENIS SMOOTH SCROLL
  // =========================
  const lenis = new Lenis({
    autoRAID: true,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: true,
    touchMultiplier: 1.8,
    wheelMultiplier: 0.8,
    infinite: false,
    gestureOrientation: "vertical",
    lerp: 0.08,
    syncTouch: true,
    syncTouchLerp: 0.08,
    autoResize: true,
    wrapper: window,
    content: document.documentElement,
    wheelEventsTarget: window,
    touchEventsTarget: window,
  });
  document.body.classList.add("lenis", "lenis-smooth");

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // =========================
  // HELPER FUNCTIONS
  // =========================
  function updateLenis() {
    setTimeout(() => lenis.resize(), 300);
  }

  // =========================
  // MOBILE MENU
  // =========================
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      mobileMenuBtn.innerHTML = navLinks.classList.contains("active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
      updateLenis();
    });
  }

  // =========================
  // SMOOTH NAVIGATION
  // =========================
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      if (navLinks) {
        navLinks.classList.remove("active");
        if (mobileMenuBtn)
          mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
      const targetId = link.getAttribute("href");
      if (targetId && targetId !== "#") {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          lenis.scrollTo(targetElement, {
            offset: -80,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            lerp: 0.08,
          });
        }
      }
      updateLenis();
    });
  });

  // =========================
  // SCROLL EVENT (HEADER + ACTIVE NAV)
  // =========================
  function updateActiveNavLink(scroll) {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");
    let current = "";
    sections.forEach((section) => {
      if (scroll >= section.offsetTop - 200)
        current = section.getAttribute("id");
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`)
        link.classList.add("active");
    });
  }
  lenis.on("scroll", ({ scroll }) => {
    const header = document.getElementById("header");
    if (header) {
      header.classList.toggle("scrolled", scroll > 100);
    }
    updateActiveNavLink(scroll);
    const scrollToTopBtn = document.getElementById("scrollToTop");
    if (scrollToTopBtn)
      scrollToTopBtn.style.display = scroll > 500 ? "flex" : "none";
  });

  // =========================
  // GSAP + SCROLLTRIGGER - INIT
  // =========================
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length ? lenis.scrollTo(value, 0, 0) : lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    ScrollTrigger.addEventListener("refresh", () => lenis.resize());
    ScrollTrigger.refresh();

    // home section - animations
    gsap.from(".hero-content h1", {
      duration: 1.2,
      y: 30,
      opacity: 0,
      ease: "power3.out",
    });
    gsap.from(".hero-content p", {
      duration: 1,
      y: 20,
      opacity: 0,
      delay: 0.3,
      ease: "power3.out",
    });
    gsap.from(".hero-buttons", {
      duration: 1,
      y: 20,
      opacity: 0,
      delay: 0.6,
      ease: "power3.out",
    });
    gsap.to(".shape-1", {
      y: "+=30",
      rotation: "+=10",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(".shape-2", {
      y: "+=40",
      rotation: "-=15",
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.5,
    });
    gsap.to(".shape-3", {
      y: "+=20",
      rotation: "+=5",
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1,
    });

    // about section - animations
    gsap.from(".about-image", {
      scrollTrigger: { trigger: "#about", start: "top 80%" },
      x: -40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
    gsap.from(".about-text", {
      scrollTrigger: { trigger: "#about", start: "top 80%" },
      x: 40,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
    });
    gsap.set(".stat-card", { opacity: 0, y: 30 });
    gsap.to(".stat-card", {
      scrollTrigger: {
        trigger: ".about-stats",
        start: "top 85%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
    });
    function animateCounters() {
      document.querySelectorAll(".counter").forEach((c) => {
        let target = +c.getAttribute("data-target");
        gsap.fromTo(
          c,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power1.out",
            snap: { innerText: 1 },
            onUpdate: function () {
              c.innerText = Math.floor(c.innerText);
            },
          },
        );
      });
    }
    ScrollTrigger.create({
      trigger: ".about-stats",
      start: "top 85%",
      once: true,
      onEnter: animateCounters,
    });
    document.querySelectorAll(".achievement-card").forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "bottom 70%",
          toggleActions: "play none none reverse",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.1,
        ease: "power3.out",
      });
    });

    // experience section - animations (timeline + cards + dot + spotlight)
    gsap.to(".line-fill", {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".experience-wrapper",
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });
    document.querySelectorAll(".exp-row").forEach((row) => {
      const card = row.querySelector(".exp-card");
      const dot = row.querySelector(".exp-dot");
      const isLeft = card.classList.contains("left-card");
      gsap.from(card, {
        scrollTrigger: {
          trigger: row,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        x: isLeft ? -50 : 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.to(dot, {
        scrollTrigger: {
          trigger: row,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        scale: 1,
        duration: 0.5,
        delay: 0.2,
        ease: "back.out(1.7)",
      });
      card.addEventListener("mousemove", (e) => {
        let rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      });
    });

    // skills section - animations
    gsap.from(".skill-item", {
      scrollTrigger: {
        trigger: "#skills",
        start: "top 80%",
        end: "bottom 50%",
        toggleActions: "play none none reverse",
      },
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: "power3.out",
    });

    // projects section - animations
    document.querySelectorAll(".project-card").forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "bottom 70%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power3.out",
      });
    });

    // contact section - animations
    gsap.from(".contact-container", {
      scrollTrigger: {
        trigger: "#contact",
        start: "top 85%",
        end: "bottom 60%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }

  // =========================
  // SKILLS DATA + RENDER + FILTER
  // =========================
  const skillsData = [
    {
      name: "HTML5",
      category: "frontend",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
      color: "#E34F26",
    },
    {
      name: "CSS3",
      category: "frontend",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
      color: "#1572B6",
    },
    {
      name: "JavaScript",
      category: "frontend",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      color: "#F7DF1E",
    },
    {
      name: "ReactJS",
      category: "frontend",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      color: "#61DAFB",
    },
    {
      name: "Bootstrap",
      category: "frontend",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
      color: "#7952B3",
    },
    {
      name: "Tailwind",
      category: "frontend",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
      color: "#06B6D4",
    },
    {
      name: "C#",
      category: "backend",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
      color: "#239120",
    },
    {
      name: ".NET Core",
      category: "backend",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg",
      color: "#512BD4",
    },
    {
      name: "Python",
      category: "backend",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      color: "#3776AB",
    },
    {
      name: "MS SQL",
      category: "database",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg",
      color: "#CC292B",
    },
    {
      name: "MySQL",
      category: "database",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
      color: "#4479A1",
    },
    {
      name: "Firebase",
      category: "database",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
      color: "#FFCA28",
    },
    {
      name: "Git",
      category: "tools",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
      color: "#F05032",
    },
    {
      name: "GitHub",
      category: "tools",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
      color: "#FFFFFF",
      invert: true,
    },
    {
      name: "VS Code",
      category: "tools",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
      color: "#007ACC",
    },
    {
      name: "Visual Studio",
      category: "tools",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualstudio/visualstudio-original.svg",
      color: "#5C2D91",
    },
    {
      name: "Postman",
      category: "additional",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
      color: "#FF6C37",
    },
    {
      name: "Canva",
      category: "additional",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg",
      color: "#00C4CC",
    },
    {
      name: "Figma",
      category: "additional",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
      color: "#F24E1E",
    },
  ];
  const skillsGrid = document.getElementById("skillsGrid");
  function renderAllSkills() {
    if (!skillsGrid) return;
    skillsGrid.innerHTML = "";
    skillsData.forEach((skill) => {
      let el = document.createElement("div");
      el.className = "skill-item";
      el.setAttribute("data-category", skill.category);
      el.style.setProperty("--brand-color", skill.color);
      el.style.setProperty("--brand-glow", `${skill.color}33`);
      let filterStyle = skill.invert ? 'style="filter: invert(1);"' : "";
      el.innerHTML = `<img src="${skill.logo}" alt="${skill.name} logo" class="skill-logo" ${filterStyle}><h4>${skill.name}</h4>`;
      skillsGrid.appendChild(el);
    });
    setTimeout(() => lenis.resize(), 100);
  }
  renderAllSkills();

  // skills filter - functionality
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      let filter = btn.getAttribute("data-filter");
      document.querySelectorAll(".skill-item").forEach((item) => {
        item.classList.toggle(
          "dimmed",
          !(filter === "all" || item.getAttribute("data-category") === filter),
        );
      });
    });
  });

  // =========================
  // PROJECTS DATA + RENDER
  // =========================
  const projectShowcase = [
    {
      title: "ANTARISHK - India's Space Journey",
      role: "SkillsVarz 1.0",
      duration: "2025",
      description:
        "Interactive web platform exploring ISRO's space missions with 3D satellite orbits, cinematic scroll animations, and real-time satellite visualizations.",
      tech: ["HTML5", "CSS3", "JavaScript", "GSAP", "Three.js", "Swiper JS"],
      live: "https://codebuddies-antarishk.vercel.app",
      github: "https://github.com/guptasushant812/CodeBuddies-ANTARISHK",
      customImg:
        "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800",
      logoOverride:
        "https://codebuddies-antarishk.vercel.app/assets/images/rocket.png",
    },
    {
      title: "Product Launch India",
      role: "Skillsvarz 1.0",
      duration: "2025",
      description:
        "Interactive product launch experience for an innovative Electric Cycle with 3D showcase, scroll-based animations, and immersive storytelling.",
      tech: ["HTML", "CSS", "JavaScript", "GSAP", "Babylon.js", "Lucide Icons"],
      live: "https://productlaunchindia.vercel.app",
      github: "https://github.com/guptasushant812/ProductLaunch",
      customImg:
        "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=800",
      logoOverride:
        "https://productlaunchindia.vercel.app/assets/favicon/favicon.png",
    },
    {
      title: "AI-Powered Learning Platform",
      role: "Final Year Project",
      duration: "03/25",
      description:
        "Adaptive learning platform delivering personalized roadmaps with intelligent quizzes, performance tracking, and real-time feedback optimization.",
      tech: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React",
        "Firebase",
        "Python",
        "APIs",
      ],
      live: "https://educationai-frontend.vercel.app",
      github: "https://github.com/guptasushant812/EduaAI-main",
      customImg:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800",
      logoOverride: "https://educationai-frontend.vercel.app/mainlogo.jpg",
    },
    {
      title: "TechBlend Edu",
      role: "Frontend Developer Intern",
      duration: "08/24",
      description:
        "Interactive educational website featuring responsive design and student-focused UI.",
      tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "UI/UX Design"],
      live: "https://techblend-edu.netlify.app",
      github: "https://github.com/guptasushant812/TechBlend-Edu",
      customImg:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800",
      logoOverride: "https://techblend-edu.netlify.app/img/icon.png",
    },
    {
      title: "RLMS Monitoring",
      role: "Aavishkar",
      duration: "11/23 - 02/23",
      description:
        "Remote lab monitoring solution designed to prevent academic malpractice through USB/Internet detection, remote system shutdown, and centralized student oversight.",
      tech: ["Python", "Python GUI"],
      live: null,
      github: null,
      customImg:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800",
      logoOverride:
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    },
    {
      title: "MR-Manage",
      role: "Connexa",
      duration: "2024",
      description:
        "Secure medical records platform improving emergency care and reducing duplicate tests.",
      tech: ["Wix", "UI/UX Design"],
      live: "https://veetchheda.wixsite.com/mr-manage",
      github: "https://github.com/guptasushant812/RLMS",
      customImg:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800",
      logoOverride: "https://www.google.com/s2/favicons?domain=wix.com&sz=64",
    },
  ];

  function renderProjects() {
    const container = document.getElementById("projectsContainer");
    if (!container) return;

    container.innerHTML = projectShowcase
      .map((project) => {
        const thumbUrl = project.live
          ? `https://s0.wp.com/mshots/v1/${encodeURIComponent(project.live)}?w=800`
          : project.customImg;

        const brandColor = "8b3cfd";

        const faviconUrl = project.logoOverride
          ? project.logoOverride
          : project.live
            ? `https://unavatar.io/${new URL(project.live).hostname}?fallback=https://ui-avatars.com/api/?name=${project.title[0]}&background=${brandColor}&color=fff`
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(project.title)}&background=${brandColor}&color=fff&bold=true`;

        return `
            <div class="project-card">
                <div class="project-image-wrapper">
                    <div class="project-identity">
                        <img src="${faviconUrl}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(project.title)}&background=${brandColor}&color=fff&bold=true'" alt="icon">
                    </div>
                    <img src="${thumbUrl}" class="project-thumbnail" alt="${project.title}" loading="lazy">
                </div>
                <div class="project-content">
                    <div class="project-header">
                        <div class="project-duration">${project.duration}</div>
                        <h3 class="project-title">${project.title}</h3>
                        <p style="font-size: 12px; color: var(--color-brand-pink); font-weight: 600;" class="project-role">${project.role}</p>
                    </div>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech-list">
                        ${project.tech.map((t) => `<span class="tech-pill">${t}</span>`).join("")}
                    </div>
                    <div class="project-footer">
                        ${project.live ? `<a href="${project.live}" target="_blank" class="btn-icon primary"><i class="fas fa-external-link-alt"></i> Live</a>` : ""}
                        ${project.github ? `<a href="${project.github}" target="_blank" class="btn-icon"><i class="fab fa-github"></i> GitHub</a>` : ""}
                    </div>
                </div>
            </div>
        `;
      })
      .join("");
  }

  // render projects
  renderProjects();

  // =========================
  // CONTACT FORM TEMPLATES
  // =========================
  const hiringBtn = document.getElementById("hiringTemplate");
  const chatBtn = document.getElementById("chatTemplate");
  const clearBtn = document.getElementById("clearTemplate");
  const msgArea = document.getElementById("message");

  if (hiringBtn && chatBtn && clearBtn && msgArea) {
    // Helper to hide both template buttons and show clear button
    function activateTemplate(activeButton, inactiveButton) {
      // Hide both template buttons
      hiringBtn.classList.add("hidden");
      chatBtn.classList.add("hidden");
      // Show clear button
      clearBtn.classList.add("show");
      // Set active state for styling (optional)
      activeButton.classList.add("active");
      inactiveButton.classList.remove("active");
    }

    hiringBtn.addEventListener("click", () => {
      msgArea.value = `Hello Sushant, I am reaching out to discuss an exciting opportunity at our place.\n## Position Details:\n\n## Company Details:`;
      activateTemplate(hiringBtn, chatBtn);
    });

    chatBtn.addEventListener("click", () => {
      msgArea.value = `Hello Sushant! I am reaching out to have a casual chat scheduled sometime.\nI am available on <AVAILABLE_TIME>.\nSpecific Topics I would like to discuss: <IF_ANY_SPECIFIC_TOPICS>`;
      activateTemplate(chatBtn, hiringBtn);
    });

    clearBtn.addEventListener("click", () => {
      msgArea.value = "";
      // Show template buttons again
      hiringBtn.classList.remove("hidden");
      chatBtn.classList.remove("hidden");
      // Hide clear button
      clearBtn.classList.remove("show");
      // Remove active states
      hiringBtn.classList.remove("active");
      chatBtn.classList.remove("active");
    });
  }

  // contact form - submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let name = document.getElementById("name").value;
      let email = document.getElementById("email").value;
      alert(
        `Thank you for your message, ${name}! I'll get back to you soon at ${email}.`,
      );
      contactForm.reset();
      if (hiringBtn && chatBtn && clearBtn) {
        hiringBtn.classList.remove("active");
        chatBtn.classList.remove("active");
        clearBtn.classList.remove("show");
      }
    });
  }

  // =========================
  // SCROLL TO TOP BUTTON
  // =========================
  const scrollTopBtn = document.getElementById("scrollToTop");
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      lenis.scrollTo(0, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lerp: 0.08,
      });
    });
  }

  // =========================
  // RESIZE HANDLER & FINAL UPDATE
  // =========================
  window.addEventListener("resize", () => updateLenis());
  updateLenis();
  setTimeout(() => updateLenis(), 1000);
  console.log("Portfolio initialized with Lenis smooth scrolling!");
});
