    // Animated counter for impact statistics
    function animateCounter(element, target, suffix = '') {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    }

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= window.innerHeight - 100;
    }

    // Trigger animations when scrolled into view
    let animationsTriggered = false;
    
    function checkAnimations() {
        if (!animationsTriggered) {
            const impactSection = document.querySelector('.impact-section');
            if (impactSection && isInViewport(impactSection)) {
                animationsTriggered = true;
                animateCounter(document.getElementById('farmerCount'), 500, '+');
                animateCounter(document.getElementById('districtCount'), 16, '');
                animateCounter(document.getElementById('incomeIncrease'), 30, '%');
                animateCounter(document.getElementById('wasteReduction'), 40, '%');
                animateCounter(document.getElementById('monthlyTransactions'), 2500, '+');
                animateCounter(document.getElementById('womenFarmers'), 45, '%');
            }
        }
    }

    // Listen for scroll events
    window.addEventListener('scroll', checkAnimations);
    window.addEventListener('load', checkAnimations);

    // Add hover effects to team cards
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Dynamic year update in footer
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('footer p');
    if (footerText) {
        footerText.innerHTML = footerText.innerHTML.replace('2026', currentYear);
    }

    // Store visit tracking in localStorage
    const visitCount = localStorage.getItem('aboutPageVisits') || 0;
    localStorage.setItem('aboutPageVisits', parseInt(visitCount) + 1);
    console.log(`About page visited ${parseInt(visitCount) + 1} times`);