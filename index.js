document.addEventListener('DOMContentLoaded', function () {
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
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
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

    const popup = document.getElementById("appPopup");
    const closeBtn = document.querySelector(".close-btn");
    const yesButton = document.getElementById("yesButton");
    const noButton = document.getElementById("noButton");

    // Function to show popup only once
    const showPopupOnce = () => {
        if (!sessionStorage.getItem('popupShown')) {
            popup.style.display = "flex";
            sessionStorage.setItem('popupShown', 'true');
        }
    };

    // Show popup when the user scrolls to the bottom
    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            showPopupOnce();
        }
    });

    // Close popup when the close button is clicked
    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });

    // Send response to your backend server
    const sendResponseToServer = (response) => {
        fetch("http://localhost:3000/api/response", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ response }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Response recorded on server:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    // Event listeners for Yes and No buttons
    yesButton.addEventListener("click", () => {
        sendResponseToServer("Yes");
        popup.style.display = "none";
    });

    noButton.addEventListener("click", () => {
        sendResponseToServer("No");
        popup.style.display = "none";
    });
});
