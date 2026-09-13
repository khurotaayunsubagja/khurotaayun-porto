document.addEventListener("DOMContentLoaded", () => {

    // =========================================================
    // ELEMENTS
    // =========================================================

    const header = document.querySelector(".header");
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-menu a");

    const backToTop = document.getElementById("backToTop");
    const currentYear = document.getElementById("currentYear");

    const imageModal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const modalClose = document.getElementById("modalClose");

    const galleryItems = document.querySelectorAll("[data-image]");
    const revealElements = document.querySelectorAll(".reveal");
    const sections = document.querySelectorAll("main section[id]");
    const videos = document.querySelectorAll("video");


    // =========================================================
    // CURRENT YEAR
    // =========================================================

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // =========================================================
    // MOBILE NAVIGATION
    // =========================================================

    function openMobileMenu() {
        if (!navMenu || !menuToggle) return;

        navMenu.classList.add("active");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        }

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );
    }


    function closeMobileMenu() {
        if (!navMenu || !menuToggle) return;

        navMenu.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    }


    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            if (navMenu.classList.contains("active")) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }

        });

    }


    // =========================================================
    // CLOSE NAVIGATION AFTER LINK CLICK
    // =========================================================

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            closeMobileMenu();

        });

    });


    // =========================================================
    // CLOSE MOBILE MENU WHEN WINDOW BECOMES DESKTOP
    // =========================================================

    window.addEventListener("resize", () => {

        if (window.innerWidth > 1000) {
            closeMobileMenu();
        }

    });


    // =========================================================
    // HEADER EFFECT + BACK TO TOP
    // =========================================================

    function handleScroll() {

        const scrollY = window.scrollY;


        // Header shadow

        if (header) {

            if (scrollY > 30) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        }


        // Back to top

        if (backToTop) {

            if (scrollY > 600) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        }

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );


    handleScroll();


    // =========================================================
    // BACK TO TOP BUTTON
    // =========================================================

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    // =========================================================
    // ACTIVE NAVIGATION SECTION
    // =========================================================

    function updateActiveNavigation() {

        const scrollPosition =
            window.scrollY + 170;


        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            const sectionId =
                section.getAttribute("id");


            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {

                navLinks.forEach((link) => {

                    link.classList.remove("active");


                    if (
                        link.getAttribute("href") ===
                        `#${sectionId}`
                    ) {

                        link.classList.add("active");

                    }

                });

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    updateActiveNavigation();


    // =========================================================
    // SCROLL REVEAL ANIMATION
    // =========================================================

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.1,
                    rootMargin:
                        "0px 0px -40px 0px"
                }

            );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        // Fallback for older browsers

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }


    // =========================================================
    // IMAGE MODAL
    // =========================================================

    function openModal(imageSource) {

        if (
            !imageModal ||
            !modalImage ||
            !imageSource
        ) {
            return;
        }


        modalImage.src = imageSource;


        imageModal.classList.add("active");


        imageModal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "no-scroll"
        );

    }


    function closeModal() {

        if (
            !imageModal ||
            !modalImage
        ) {
            return;
        }


        imageModal.classList.remove(
            "active"
        );


        imageModal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "no-scroll"
        );


        setTimeout(() => {

            modalImage.src = "";

        }, 200);

    }


    // Open image

    galleryItems.forEach((item) => {

        item.addEventListener("click", () => {

            const imageSource =
                item.getAttribute("data-image");


            if (imageSource) {
                openModal(imageSource);
            }

        });

    });


    // Close button

    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );

    }


    // Click outside image

    if (imageModal) {

        imageModal.addEventListener(
            "click",
            (event) => {

                if (event.target === imageModal) {
                    closeModal();
                }

            }
        );

    }


    // Escape key

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                imageModal &&
                imageModal.classList.contains(
                    "active"
                )
            ) {

                closeModal();

            }

        }
    );


    // =========================================================
    // VIDEO HANDLING
    // =========================================================

    // Pause other videos if one video starts playing

    videos.forEach((video) => {

        video.addEventListener("play", () => {

            videos.forEach((otherVideo) => {

                if (otherVideo !== video) {
                    otherVideo.pause();
                }

            });

        });

    });


    // Pause videos when browser tab becomes inactive

    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                videos.forEach((video) => {
                    video.pause();
                });

            }

        }
    );


    // =========================================================
    // SMOOTH INTERNAL LINK
    // =========================================================

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((anchor) => {

            anchor.addEventListener(
                "click",
                function (event) {

                    const href =
                        this.getAttribute("href");


                    if (
                        !href ||
                        href === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(href);


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        headerHeight -
                        10;


                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }
            );

        });

});