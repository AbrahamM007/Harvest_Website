document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for scroll animations
    const options = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, options);

    // Targeting all sections, feature items, value items, header, logo, and button
    document.querySelectorAll('section, .feature-item, .value-item, header, #logo-header, .app-button').forEach(element => {
        element.classList.add('animate');
        observer.observe(element);
    });

    // Popup management
    const popup = document.getElementById("appPopup");
    const closeBtn = document.querySelector(".close-btn");
    const yesButton = document.getElementById("yesButton");
    const noButton = document.getElementById("noButton");

    const showPopupOnce = () => {
        if (!sessionStorage.getItem('popupShown')) {
            popup.style.display = "flex";
            sessionStorage.setItem('popupShown', 'true');
        }
    };

    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            showPopupOnce();
        }
    });

    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });

    const sendResponseToServer = (response) => {
        fetch("http://localhost:3000/api/response", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ response }),
        })
            .then(res => res.json())
            .then(data => console.log("Response recorded on server:", data))
            .catch(error => console.error("Error:", error));
    };

    yesButton.addEventListener("click", () => {
        sendResponseToServer("Yes");
        popup.style.display = "none";
    });

    noButton.addEventListener("click", () => {
        sendResponseToServer("No");
        popup.style.display = "none";
    });

    // Try our app button scroll
    const tryAppButton = document.getElementById('try-app-button');
    const featuresSection = document.getElementById('features');
    if (tryAppButton && featuresSection) {
        tryAppButton.addEventListener('click', function() {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Initial load and scroll animations
    const handleScrollAnimations = () => {
        document.querySelectorAll('section').forEach(section => {
            if (section.getBoundingClientRect().top < window.innerHeight) {
                section.classList.add('in-view');
            }
        });
    };

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('initial-load');
    });

    window.addEventListener('scroll', handleScrollAnimations);
    handleScrollAnimations(); // Initial check for elements in view
});
