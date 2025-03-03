document.addEventListener("DOMContentLoaded", function () {
    let toggles = document.querySelectorAll(".expand-toggle");
	
    toggles.forEach(toggle => {
        toggle.addEventListener("click", function () {
            let parentItem = this.closest(".resume-item");
            let content = parentItem.querySelector(".resume-content");

            document.querySelectorAll(".resume-item").forEach(item => {
                if (item !== parentItem) {
                    item.classList.remove("active");
                    item.querySelector(".resume-content").style.maxHeight = "0";
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
	
document.addEventListener("DOMContentLoaded", function () {
    const prevButton = document.querySelector(".prev-project");
    const nextButton = document.querySelector(".next-project");

    if (!prevButton.getAttribute("href")) {
        prevButton.style.display = "none";
    }

    if (!nextButton.getAttribute("href")) {
        nextButton.style.display = "none";
    }
});

    // Project Scroll Arrows
    const scrollContainer = document.querySelector(".projects-scroll");
    const scrollLeft = document.getElementById("scroll-left");
    const scrollRight = document.getElementById("scroll-right");

    scrollLeft.addEventListener("click", function () {
        scrollContainer.scrollBy({ left: -300, behavior: "smooth" });
    });

    scrollRight.addEventListener("click", function () {
        scrollContainer.scrollBy({ left: 300, behavior: "smooth" });
    });
});

document.querySelectorAll(".expand-toggle").forEach((button) => {
    button.addEventListener("click", function () {
        let content = this.nextElementSibling;
        this.classList.toggle("active");

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling
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
});

function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".carousel-track");
    const slides = document.querySelectorAll(".carousel-slide");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");

    let activeIndex = Math.floor(slides.length / 2); // Start with the middle project

    function adjustProjectsVisibility() {
        const screenWidth = window.innerWidth;

        if (screenWidth <= 768) {
            // Show only one project at a time
            slides.forEach((slide, index) => {
                if (index === activeIndex) {
                    slide.style.display = "flex";
                } else {
                    slide.style.display = "none";
                }
            });
        } else {
            // Show three projects at a time
            slides.forEach((slide, index) => {
                if (index >= activeIndex - 1 && index <= activeIndex + 1) {
                    slide.style.display = "flex"; // Show surrounding projects
                } else {
                    slide.style.display = "none"; // Hide others
                }
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

    // Event Listeners for Arrows
    leftArrow.addEventListener("click", () => moveSelection(-1));
    rightArrow.addEventListener("click", () => moveSelection(1));

    // Adjust when resizing
    window.addEventListener("resize", adjustProjectsVisibility);
    adjustProjectsVisibility();
    updateCarousel();
});

function openContactForm() {
    document.getElementById("contactModal").style.display = "flex";
}

function closeContactForm() {
    document.getElementById("contactModal").style.display = "none";
}

// Close modal when clicking outside of the form
window.onclick = function(event) {
    let modal = document.getElementById("contactModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}




// Scroll to Top when Clicking the Button
document.getElementById("back-to-top").addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
