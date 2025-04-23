document.addEventListener('DOMContentLoaded', () => {
    // Animate terminal typing effect
    const typingLines = document.querySelectorAll('.typing');
    typingLines.forEach(line => {
        const text = line.textContent;
        line.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                line.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                line.classList.remove('typing');
            }
        }
        
        setTimeout(() => {
            typeWriter();
        }, 1000);
    });

    // Animate on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.step, .benefit-card, .audience-card, .testimonial');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animation
    const elementsToAnimate = document.querySelectorAll('.step, .benefit-card, .audience-card, .testimonial');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(14, 14, 15, 0.95)';
            header.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(14, 14, 15, 0.9)';
            header.style.boxShadow = 'none';
        }
    });

    // Smooth scroll for navigation links - FIXED
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            // Remove the '#' before using getElementById
            const targetElementId = targetId.substring(1);
            const targetElement = document.getElementById(targetElementId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
