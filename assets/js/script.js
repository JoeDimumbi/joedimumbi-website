document.addEventListener("DOMContentLoaded", function () {
    // Checking that elements exist before using them
    const toggles = document.querySelectorAll(".expand-toggle");
    const scrollContainer = document.querySelector(".projects-scroll");
    const scrollLeft = document.getElementById("scroll-left");
    const scrollRight = document.getElementById("scroll-right");
    const track = document.querySelector(".carousel-track");
    const slides = document.querySelectorAll(".carousel-slide");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    const backToTop = document.getElementById("back-to-top");
    const prevButton = document.querySelector(".prev-project");
    const nextButton = document.querySelector(".next-project");

    // RESUME SECTION: Expand/Collapse Functionality
    if (toggles.length > 0) {
        toggles.forEach(toggle => {
            toggle.addEventListener("click", function () {
                let parentItem = this.closest(".resume-item");
                let content = parentItem.querySelector(".resume-content");

                document.querySelectorAll(".resume-item").forEach(item => {
                    if (item !== parentItem) {
                        item.classList.remove("active");
                        let innerContent = item.querySelector(".resume-content");
                        if (innerContent) innerContent.style.maxHeight = "0";
                    }
                });

                if (parentItem.classList.contains("active")) {
                    parentItem.classList.remove("active");
                    content.style.maxHeight = "0";
                } else {
                    parentItem.classList.add("active");
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });
    }

    // FIX: Hide Prev/Next Project Buttons if no link exists (Currently looping projects)
    if (prevButton && !prevButton.getAttribute("href")) {
        prevButton.style.display = "none";
    }
    if (nextButton && !nextButton.getAttribute("href")) {
        nextButton.style.display = "none";
    }

    // PROJECT CAROUSEL NAVIGATION
    let activeIndex = Math.floor(slides.length / 2); // Default to middle project

    function adjustProjectsVisibility() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 768) {
            slides.forEach((slide, index) => {
                slide.style.display = index === activeIndex ? "flex" : "none";
            });
        } else {
            slides.forEach((slide, index) => {
                slide.style.display = (index >= activeIndex - 1 && index <= activeIndex + 1) ? "flex" : "none";
            });
        }
    }

    function updateCarousel() {
        slides.forEach((slide, i) => {
            if (i === activeIndex) {
                slide.classList.add("active");
                slide.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
            } else {
                slide.classList.remove("active");
            }
        });
    }

    function moveSelection(direction) {
        activeIndex += direction;
        if (activeIndex < 0) {
            activeIndex = slides.length - 1; // Loop back to last project
        } else if (activeIndex >= slides.length) {
            activeIndex = 0; // Loop back to first project
        }
        updateCarousel();
        adjustProjectsVisibility();
    }

    if (leftArrow && rightArrow) {
        leftArrow.addEventListener("click", () => moveSelection(-1));
        rightArrow.addEventListener("click", () => moveSelection(1));
    }

    window.addEventListener("resize", adjustProjectsVisibility);
    adjustProjectsVisibility();
    updateCarousel();

    // SMOOTH SCROLLING FOR ANCHOR LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // BACK TO TOP BUTTON
    if (backToTop) {
        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // CONTACT FORM POPUP BOX/BUBBLE
    const contactModal = document.getElementById("contactModal");
    if (contactModal) {
        document.querySelector(".contact-button").addEventListener("click", function () {
            contactModal.style.display = "flex";
        });

        document.querySelector(".close-contact").addEventListener("click", function () {
            contactModal.style.display = "none";
        });

        window.addEventListener("click", function (event) {
            if (event.target === contactModal) {
                contactModal.style.display = "none";
            }
        });
    }
});
