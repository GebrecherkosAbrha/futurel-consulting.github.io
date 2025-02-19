document.addEventListener('DOMContentLoaded', function() {
    // Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Form submission (example using Formspree)
            try {
                const response = await fetch('https://formspree.io/f/your-form-id', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, message })
                });
                
                if (response.ok) {
                    alert('Message sent successfully!');
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                alert('Failed to send message. Please try again later.');
                console.error('Error:', error);
            }
        });
    }

    // Scroll Animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });

    // Add to your existing JavaScript
    const scrollBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Update the dark mode toggle code
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize dark mode based on user's system preference
    if (prefersDarkScheme.matches) {
        document.body.setAttribute('data-theme', 'dark');
        darkModeToggle.textContent = '☀️';
    }

    darkModeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        darkModeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        
        // Optionally save the preference
        localStorage.setItem('theme', newTheme);
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        darkModeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }
}); 