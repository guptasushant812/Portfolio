// =========================
// PORTFOLIO - Main Application
// Handles: Lenis smooth scroll, GSAP animations,
// skills/projects rendering, contact form, navigation
// =========================

document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // ADAPTIVE LENIS SMOOTH SCROLL
    // =========================
    let lenis = null;
    let resizeTimer = null;

    // Update active navigation link based on scroll position
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

    // Return Lenis options based on current window width
    function getLenisOptions() {
        const width = window.innerWidth;
        if (width < 768) {
            // Mobile: quick, responsive, with touch bounce
            return {
                autoRaf: true,
                duration: 0.6,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smooth: true,
                smoothTouch: true,
                touchMultiplier: 2.5,
                wheelMultiplier: 1.0,
                lerp: 0.06,
                syncTouch: true,
                syncTouchLerp: 0.06,
                autoResize: true,
                wrapper: window,
                content: document.documentElement,
                wheelEventsTarget: window,
                touchEventsTarget: window,
                gestureOrientation: "vertical",
                infinite: false,
            };
        } else if (width < 1024) {
            // Tablet: balanced
            return {
                autoRaf: true,
                duration: 0.9,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smooth: true,
                smoothTouch: true,
                touchMultiplier: 2.0,
                wheelMultiplier: 0.9,
                lerp: 0.08,
                syncTouch: true,
                syncTouchLerp: 0.08,
                autoResize: true,
                wrapper: window,
                content: document.documentElement,
                wheelEventsTarget: window,
                touchEventsTarget: window,
                gestureOrientation: "vertical",
                infinite: false,
            };
        } else {
            // Desktop: classic smooth (slightly slower, elegant)
            return {
                autoRaf: true,
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smooth: true,
                smoothTouch: true,
                touchMultiplier: 1.5,
                wheelMultiplier: 0.8,
                lerp: 0.1,
                syncTouch: true,
                syncTouchLerp: 0.1,
                autoResize: true,
                wrapper: window,
                content: document.documentElement,
                wheelEventsTarget: window,
                touchEventsTarget: window,
                gestureOrientation: "vertical",
                infinite: false,
            };
        }
    }

    // Initialise (or re-initialise) Lenis
    function initLenis() {
        if (lenis) {
            lenis.destroy();
            lenis = null;
        }
        lenis = new Lenis(getLenisOptions());
        document.body.classList.add("lenis", "lenis-smooth");

        // Scroll event handler for header, active nav, scroll-to-top button
        lenis.on("scroll", ({ scroll }) => {
            const header = document.getElementById("header");
            if (header) {
                header.classList.toggle("scrolled", scroll > 100);
            }
            updateActiveNavLink(scroll);
            const scrollToTopBtn = document.getElementById("scrollToTop");
            if (scrollToTopBtn) {
                scrollToTopBtn.style.display = scroll > 500 ? "flex" : "none";
            }
        });

        // Update GSAP ScrollTrigger on every scroll
        if (typeof ScrollTrigger !== "undefined") {
            lenis.on("scroll", ScrollTrigger.update);
        }
    }

    // Start with current screen size
    initLenis();

    // Re-initialise on resize (debounced)
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            initLenis();
        }, 200);
    });

    // =========================
    // HELPER FUNCTIONS
    // =========================
    function updateLenis() {
        setTimeout(() => lenis?.resize(), 300);
    }

    // =========================
    // MOBILE MENU TOGGLE
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
    // SMOOTH NAVIGATION (anchor links)
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
    // GSAP + SCROLLTRIGGER SETUP AND ANIMATIONS
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

        // No need for gsap.ticker – Lenis autoRaf already runs
        ScrollTrigger.addEventListener("refresh", () => lenis?.resize());
        ScrollTrigger.refresh();

        // --- Hero Section Animations ---
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

        // --- About Section Animations ---
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

        // --- Experience Section Animations ---
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

        // --- Skills Section Animations ---
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

        // --- Projects Section Animations ---
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

        // --- Contact Section Animations ---
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
    // SKILLS RENDER + FILTER
    // (data from js/data.js)
    // =========================
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
        setTimeout(() => lenis?.resize(), 100);
    }

    renderAllSkills();

    // Skills filter functionality
    document.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
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
    // PROJECTS RENDER
    // (data from js/data.js)
    // =========================
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
                        <img src="${faviconUrl}" alt="icon">
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
                        ${project.live ? `<a href="${project.live}" target="_blank" rel="noopener noreferrer" class="btn-icon primary"><i class="fas fa-external-link-alt"></i> Live</a>` : ""}
                        ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn-icon"><i class="fab fa-github"></i> GitHub</a>` : ""}
                    </div>
                </div>
            </div>
        `;
            })
            .join("");
    }

    renderProjects();

    // =========================
    // CONTACT FORM TEMPLATES
    // =========================
    const hiringBtn = document.getElementById("hiringTemplate");
    const chatBtn = document.getElementById("chatTemplate");
    const clearBtn = document.getElementById("clearTemplate");
    const msgArea = document.getElementById("message");

    if (hiringBtn && chatBtn && clearBtn && msgArea) {
        function activateTemplate(activeButton, inactiveButton) {
            hiringBtn.classList.add("hidden");
            chatBtn.classList.add("hidden");
            clearBtn.classList.add("show");
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
            hiringBtn.classList.remove("hidden");
            chatBtn.classList.remove("hidden");
            clearBtn.classList.remove("show");
            hiringBtn.classList.remove("active");
            chatBtn.classList.remove("active");
        });
    }

    // =========================
    // MNC TOAST NOTIFICATION SYSTEM
    // =========================
    function showToast(type, title, message, duration = 6000) {
        let container = document.getElementById("toastContainer");
        if (!container) {
            container = document.createElement("div");
            container.id = "toastContainer";
            container.className = "toast-container";
            document.body.appendChild(container);
        }

        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;
        const iconClass = type === "success" ? "fa-circle-check" : "fa-circle-exclamation";

        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas ${iconClass}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" aria-label="Close notification">&times;</button>
            <div class="toast-progress" style="animation: toastProgress ${duration}ms linear forwards;"></div>
        `;

        container.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add("show");
        });

        const closeToast = () => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 400);
        };

        toast.querySelector(".toast-close").addEventListener("click", closeToast);
        setTimeout(closeToast, duration);
    }

    // =========================
    // EMAILJS INITIALIZATION
    // =========================
    const EMAILJS_PUBLIC_KEY = "tsg8YnoCvOkvJIuFt";
    const EMAILJS_SERVICE_ID = "service_dcyd60e";
    // const EMAILJS_TEMPLATE_OWNER = "template_agnp6nu";
    const EMAILJS_TEMPLATE_OWNER = "template_ebufyes";
    const EMAILJS_TEMPLATE_AUTOREPLY = "template_yhvmva8";

    if (typeof emailjs !== "undefined") {
        try {
            emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
        } catch (err) {
            console.warn("EmailJS init warning:", err);
        }
    }

    // =========================
    // CONTACT FORM SUBMISSION
    // =========================
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !subject || !message) {
                showToast("error", "Validation Error", "Please fill in all fields before sending your message.");
                return;
            }

            // Show loading state
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.7";
            submitBtn.style.cursor = "not-allowed";

            const templateParams = {
                from_name: name,
                name: name,
                from_email: email,
                email: email,
                subject: subject,
                message: message,
                to_email: "guptasushant812@gmail.com",
            };

            // Send email to site owner (with 4th param publicKey for fail-safe v4 compatibility)
            const ownerEmailPromise = emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_OWNER,
                templateParams,
                EMAILJS_PUBLIC_KEY
            );

            // Send confirmation copy to sender
            const senderCopyPromise = emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_AUTOREPLY,
                templateParams,
                EMAILJS_PUBLIC_KEY
            ).catch(err => {
                console.warn("Auto-reply copy error:", err);
                return null;
            });

            ownerEmailPromise
                .then(() => {
                    senderCopyPromise; // Trigger auto-reply in background

                    // Success UI state
                    submitBtn.textContent = "Message Sent! ✓";
                    submitBtn.style.background = "var(--color-green-500)";
                    submitBtn.style.opacity = "1";
                    contactForm.reset();

                    // Reset template buttons
                    if (hiringBtn && chatBtn && clearBtn) {
                        hiringBtn.classList.remove("active", "hidden");
                        chatBtn.classList.remove("active", "hidden");
                        clearBtn.classList.remove("show");
                    }

                    // Show top MNC-grade Success Toast (Stripe / Apple standard format)
                    showToast(
                        "success",
                        "Inquiry Submitted",
                        `Thank you, ${name}. Your message has been delivered to Sushant. A confirmation receipt was sent to ${email}.`
                    );

                    // Restore button after 4 seconds
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = "";
                        submitBtn.style.cursor = "";
                        submitBtn.disabled = false;
                    }, 4000);
                })
                .catch((error) => {
                    console.error("EmailJS Owner Email Error:", error);
                    console.error("Check Owner Template ID:", EMAILJS_TEMPLATE_OWNER);
                    console.error("Check Service ID:", EMAILJS_SERVICE_ID);

                    submitBtn.textContent = "Failed to Send ✗";
                    submitBtn.style.background = "var(--color-red-500)";
                    submitBtn.style.opacity = "1";

                    let rawError = error?.text || error?.message || "";
                    let customHint = "";

                    if (rawError.includes("template ID not found")) {
                        customHint = " 💡 Fix: Click the blue 'Save' button in your EmailJS dashboard top-right, or verify Template ID under Settings tab.";
                    }

                    showToast(
                        "error",
                        "Template Error ⚠️",
                        `${rawError}${customHint}`
                    );

                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = "";
                        submitBtn.style.cursor = "";
                        submitBtn.disabled = false;
                    }, 5000);
                });
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
});
