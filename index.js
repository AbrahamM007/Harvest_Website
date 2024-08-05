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

 document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("appPopup");
    const closeBtn = document.querySelector(".close-btn");
    const yesButton = document.getElementById("yesButton");
    const noButton = document.getElementById("noButton");

    // Show popup when the user scrolls to the bottom
    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            popup.style.display = "flex";
        }
    });

    // Close popup when the close button is clicked
    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });

    // Send response to Google Sheets
    const sendResponse = (response) => {
        fetch("https://script.google.com/macros/s/AKfycbyoqTHJU-u1WKAoumwlxKplSBOzgIGk7u_QssmhjhCx8JdUtV-pjlqCYg4Se5Fb4m2r/exec", {
            method: "POST",
            mode: 'no-cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ response }),
        })
        .then(() => {
            console.log("Response recorded: ", response);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };

    // Event listeners for Yes and No buttons
    yesButton.addEventListener("click", () => {
        sendResponse("Yes");
        popup.style.display = "none";
    });

    noButton.addEventListener("click", () => {
        sendResponse("No");
        popup.style.display = "none";
    });
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
