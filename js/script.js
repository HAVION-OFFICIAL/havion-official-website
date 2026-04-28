/*** code by wizz */
$(document).ready(function () {
    const slides = document.querySelectorAll(".slide");
    const dots = $(".dot");
    const section = document.querySelector(".service-sec");

    let currentSlide = 0;
    let isLocked = false;
    let isAnimating = false;

    function updateSlides() {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentSlide);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentSlide);
        });
    }

    window.addEventListener("scroll", () => {
        const rect = section.getBoundingClientRect();

        // ✅ Lock when section reaches viewport
        if (
            rect.top <= 0 &&
            rect.bottom > window.innerHeight &&
            !isLocked
        ) {
            isLocked = true;
            document.body.style.overflow = "hidden";
            section.classList.add("sticky-section");
        }
    });

    // 👇 Handle scroll (wheel)
    window.addEventListener("wheel", (e) => {
        if (!isLocked || isAnimating) return;

        isAnimating = true;

        if (e.deltaY > 0) {
            // scroll down
            if (currentSlide < slides.length - 1) {
                currentSlide++;
            } else {
                //  unlock after last slide
                unlockScroll();
                return;
            }
        } else {
            // scroll up
            if (currentSlide > 0) {
                currentSlide--;
            }
        }

        updateSlides();

        setTimeout(() => {
            isAnimating = false;
        }, 700); // match CSS transition
    });

    function unlockScroll() {
        isLocked = false;
        document.body.style.overflow = "auto";
        section.classList.remove("sticky-section");

        // move page slightly forward so it continues naturally
        window.scrollBy(0, 5);
    }

    dots.each(function (i) {
        $(this).on("click", function () {
            dots.removeClass("active");
            slides.removeClass("active");

            $(this).addClass("active");
            $(slides[i]).addClass("active");
        });
    });

    /** end of code by wizz */


    // KEYBOARD SUPPORT
    window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") handleScroll("down");
        if (e.key === "ArrowUp") handleScroll("up");
    });


    // TOUCH SUPPORT
    let touchStartY = 0;

    window.addEventListener("touchstart", (e) => {
        touchStartY = e.touches[0].clientY;
    });

    window.addEventListener("touchend", (e) => {
        let touchEndY = e.changedTouches[0].clientY;
        let diff = touchStartY - touchEndY;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                handleScroll("down");
            } else {
                handleScroll("up");
            }
        }
    });





    // products

    const slider = document.getElementById("slider");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    const card = slider.querySelector(".card");

    updateNavButtons();

    function updateNavButtons() {
        const maxScroll = slider.scrollWidth - slider.clientWidth;

        // at start
        if (slider.scrollLeft <= 0) {
            prevBtn.classList.add("disabled");
        } else {
            prevBtn.classList.remove("disabled");
        }

        // at end
        if (slider.scrollLeft >= maxScroll - 1) {
            nextBtn.classList.add("disabled");
        } else {
            nextBtn.classList.remove("disabled");
        }
    }

    function getScrollAmount() {
        const cardStyle = window.getComputedStyle(card);
        const gap = parseInt(window.getComputedStyle(slider).gap) || 0;

        return card.offsetWidth + gap;
    }


    /* ARROWS */
    nextBtn.addEventListener("click", () => {
        slider.scrollBy({
            left: getScrollAmount(),
            behavior: "smooth",
        });

        setTimeout(updateNavButtons, 100);
    });

    prevBtn.addEventListener("click", () => {
        slider.scrollBy({
            left: -getScrollAmount(),
            behavior: "smooth",
        });

        setTimeout(updateNavButtons, 100);
    });

    /* SYNC THUMB WITH SLIDER */
    function updateThumb() {
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    const ratio = slider.scrollLeft / maxScroll;
    }

    slider.addEventListener("scroll", updateThumb);

    /* DRAG FUNCTIONALITY */
    let isDragging = false;
    let startX;
    let startLeft;


    document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    const newLeft = startLeft + dx;

    const clampedLeft = Math.max(0, Math.min(newLeft, maxLeft));


    /* MOVE SLIDER */
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const ratio = clampedLeft / maxLeft;
    slider.scrollLeft = ratio * maxScroll;
    });

    document.addEventListener("mouseup", () => {
    isDragging = false;
    });


    /* INIT */
    updateThumb();



    // banner shapes

    const banner = document.querySelector('.banner-shape');

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animate() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    banner.style.transform = `translate(${currentX * 20}px, ${currentY * 20}px) scale(1.05)`;

    requestAnimationFrame(animate);
    }

    animate();
})