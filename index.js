document.addEventListener('DOMContentLoaded', function() {
    const harvestingAnimation = document.querySelector('.harvesting-animation');
 
    // Wait for the animation to complete before removing the container
    setTimeout(() => {
        harvestingAnimation.style.opacity = '0';
        setTimeout(() => {
            harvestingAnimation.remove();
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }, 500); // Adjust this delay to match the CSS animation duration
    }, 2000); // Duration of the animation in milliseconds
 
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
 });

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

 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add pop-up animation to sections on scroll
