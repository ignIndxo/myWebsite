document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Scroll Reveal Animation
    const reveals = document.querySelectorAll(".reveal");

    const revealOptions = {
        threshold: 0.1, // Trigger when 10% of element is in view
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // 2. Parallax Mouse Move Effect (for the Scrapbook Hero)
    // This gives the images a floating, Readymag-style interactivity
    const parallaxElements = document.querySelectorAll('.parallax-element');
    const heroSection = document.querySelector('.hero-collage');

    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            let x = (e.clientX / window.innerWidth) - 0.5;
            let y = (e.clientY / window.innerHeight) - 0.5;

            parallaxElements.forEach(el => {
                let speed = el.getAttribute('data-speed');
                let xOffset = x * speed * 30; // 30 is the multiplier for movement distance
                let yOffset = y * speed * 30;
                
                // Only move translation, keeping existing CSS transforms intact via calculation
                // Note: The images have static rotation in CSS, this adds to it seamlessly
                let currentTransform = window.getComputedStyle(el).transform;
                // If it's the quote block, it doesn't have rotation
                if(currentTransform === 'none') {
                    el.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
                } else {
                    el.style.transform = `translate(${xOffset}px, ${yOffset}px) ${currentTransform.replace('matrix', 'matrix')}`;
                }
            });
        });

        // Reset positions when mouse leaves the area
        heroSection.addEventListener('mouseleave', () => {
            parallaxElements.forEach(el => {
                el.style.transform = ''; 
            });
        });
    }
});