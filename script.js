const heading = document.getElementById("title-h3");

const phrases = [
    "I'm a Web Developer",
    "I'm a Front-End Developer",
    "I'm a Creative Problem Solver"
];

let phraseIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (deleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    heading.textContent = currentPhrase.substring(0, characterIndex);

    let speed = deleting ? 50 : 100;

    if (!deleting && characterIndex === currentPhrase.length) {
        deleting = true;
        speed = 1500;
    } else if (deleting && characterIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

if (heading) {
    typeEffect();
}

////////////////////////////////////////////////////////////////////

const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar-nav");

if (menuToggle && sidebar) {

    menuToggle.addEventListener("click", function() {

        sidebar.classList.toggle("active");

        const isOpen = sidebar.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.innerHTML = isOpen ? "&times;" : "&#9776;";

    });

    const navLinks = sidebar.querySelectorAll("a");

    navLinks.forEach(function(link) {

        link.addEventListener("click", function() {

            sidebar.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.innerHTML = "&#9776;";

        });

    });

}

////////////////////////////////////////////////////////////////////

const contactForm = document.getElementById("form");

if (contactForm) {

    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const feedback = document.getElementById("form-feedback");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phonePattern = /^(?:(?:\+44|0044)\d{9,10}|0\d{9,10})$/;

    const fields = [firstName, lastName, email, phone];

    fields.forEach(function(field) {

        field.addEventListener("input", function() {
            field.setCustomValidity("");
            feedback.textContent = "";
        });

    });

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        fields.forEach(function(field) {
            field.setCustomValidity("");
        });

        feedback.textContent = "";

        if (!firstName.value.trim()) {
            firstName.setCustomValidity("Please enter your first name.");
        }

        if (!lastName.value.trim()) {
            lastName.setCustomValidity("Please enter your last name.");
        }

        if (!emailPattern.test(email.value.trim())) {
            email.setCustomValidity("Please enter a valid email address.");
        }

        const cleanedPhone = phone.value.replace(/[\s()-]/g, "");

        if (!phonePattern.test(cleanedPhone)) {
            phone.setCustomValidity("Please enter a valid UK phone number.");
        }

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        // Submit the validated form to FormSubmit
        contactForm.submit();

    });

}
