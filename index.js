document.addEventListener('DOMContentLoaded', function() {
    // Ensure the green circle animation has completed before removing it
    setTimeout(() => {
        document.querySelector('body').style.overflow = 'auto';
    }, 4000); // Adjust time based on the duration of the animation
 
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
 
    // Add pop-up animation to sections on scroll
    const sections = document.querySelectorAll('.hero, .features, .values, .contact, .feature-item, .value-item');
    const options = {
        threshold: 0.1
    };
 
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('popUp');
            }
        });
    }, options);
 
    sections.forEach(section => {
        observer.observe(section);
    });
 });
 