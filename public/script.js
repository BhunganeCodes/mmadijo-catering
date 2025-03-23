document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Hamburger Menu Toggle
    if (hamburger) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            body.classList.toggle('menu-open'); // Prevent scrolling when menu is open
        });
    }

    // Close Mobile Menu When a Link is Clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Close Mobile Menu When Clicking Outside
    document.addEventListener('click', function (e) {
        const isMenuOpen = navLinks.classList.contains('active');
        const isClickInsideMenu = navLinks.contains(e.target);
        const isClickOnHamburger = hamburger.contains(e.target);

        if (isMenuOpen && !isClickInsideMenu && !isClickOnHamburger) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header Scroll Effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }

    // Form Submission Handling
    const form = document.getElementById('inquiry-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const submitButton = form.querySelector('button[type="submit"]');

            // Disable the submit button to prevent multiple submissions
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Thank you! Your message has been sent.');
                    form.reset(); // Clear the form
                } else {
                    alert('Oops! Something went wrong. Please try again.');
                }
            } catch (error) {
                alert('Oops! Something went wrong. Please try again.');
            } finally {
                // Re-enable the submit button
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        });
    }
});