<script>
async function loadHTML(id, file) {
    try {
        const res = await fetch(file);
        if (!res.ok) throw new Error(`Failed to fetch ${file}`);
        const html = await res.text();
        document.getElementById(id).innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${file}:`, error);
    }
}

Promise.all([
    loadHTML("nav", "pages/nav.html"),
    loadHTML("footer", "pages/footer.html")
]).then(() => {
    // Mobile Menu Toggle
    const mobileMenuButton = document.querySelector(
        '.md\\:hidden button[aria-controls="mobile-menu-list"]');
    const mobileMenu = document.getElementById('mobile-menu-list');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);

            if (!isExpanded) {
                mobileMenu.classList.remove('max-h-0', 'opacity-0', 'invisible');
                mobileMenu.classList.add('max-h-screen', 'opacity-100', 'visible');
                mobileMenu.style.maxHeight = '100vh';
            } else {
                mobileMenu.classList.remove('max-h-screen', 'opacity-100', 'visible');
                mobileMenu.classList.add('max-h-0', 'opacity-0', 'invisible');
                mobileMenu.style.maxHeight = '0px';
            }
        });

        // 🔽 Close menu when any link is clicked
        const allLinks = mobileMenu.querySelectorAll('a');
        allLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('max-h-screen', 'opacity-100', 'visible');
                mobileMenu.classList.add('max-h-0', 'opacity-0', 'invisible');
                mobileMenu.style.maxHeight = '0px';
                mobileMenuButton.setAttribute('aria-expanded', false);
            });
        });

        // 🔽 Submenu toggle
        const submenuButtons = document.querySelectorAll('[aria-controls^="mobile-submenu-"]');
        submenuButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault(); // prevent accidental navigation
                const submenuId = button.getAttribute('aria-controls');
                const submenu = document.getElementById(submenuId);
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                button.setAttribute('aria-expanded', !isExpanded);
                const svg = button.querySelector('svg');
                if (submenu) {
                    submenu.classList.toggle('hidden', isExpanded);
                    svg.classList.toggle('rotate-180', !isExpanded);
                }
            });
        });
    }

    // Contact Form Submission
    const contactForm = document.querySelector('#contact-form');
    const formStatus = document.querySelector('[role="status"]');
    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('fullName').trim();
            const email = formData.get('email').trim();
            const message = formData.get('message').trim();
            if (name && email && message) {
                formStatus.textContent = 'Message sent successfully! (This is a placeholder)';
                formStatus.classList.add('text-green-700');
                contactForm.reset();
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.classList.remove('text-green-700');
                }, 3000);
            } else {
                formStatus.textContent = 'Please fill out all fields.';
                formStatus.classList.add('text-red-600');
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.classList.remove('text-red-600');
                }, 3000);
            }
        });
    }

    // Breadcrumb Navigation
    const breadcrumbHome = document.querySelector('nav[aria-label="Breadcrumb"] button:first-child');
    if (breadcrumbHome) {
        breadcrumbHome.addEventListener('click', () => {
            window.location.href = '/index.html';
        });
    }
    const breadcrumbServices = document.querySelector('nav[aria-label="Breadcrumb"] button:nth-child(3)');
    if (breadcrumbServices) {
        breadcrumbServices.addEventListener('click', () => {
            alert('This is a placeholder. Navigate to Services page here.');
        });
    }
    const breadcrumbManpower = document.querySelector('nav[aria-label="Breadcrumb"] button:nth-child(5)');
    if (breadcrumbManpower) {
        breadcrumbManpower.addEventListener('click', () => {
            alert('This is a placeholder. Navigate to Extend Your Technical Manpower page here.');
        });
    }

    // CTA Buttons
    const findTalentButton = document.querySelector('button[aria-label="Find Your Expert Talent Now"]');
    if (findTalentButton) {
        findTalentButton.addEventListener('click', () => {
            alert('This is a placeholder. Implement talent request form here.');
        });
    }
    const backToManpowerButton = document.querySelector(
        'button[aria-label="Back to Extend Your Technical Manpower"]');
    if (backToManpowerButton) {
        backToManpowerButton.addEventListener('click', () => {
            alert('This is a placeholder. Navigate to Extend Your Technical Manpower page here.');
        });
    }
    const heroManpowerButton = document.querySelector('p button.text-sm');
    if (heroManpowerButton) {
        heroManpowerButton.addEventListener('click', () => {
            alert('This is a placeholder. Navigate to Extend Your Technical Manpower page here.');
        });
    }

    // Technology Buttons
    const technologyButtons = document.querySelectorAll('.buttons button');
    technologyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const techName = button.querySelector('span').textContent;
            alert(`Clicked on ${techName}. Implement technology details page here.`);
        });
    });
});
</script>
<script>
async function loadHTML(id, file) {
    try {
        const res = await fetch(file);
        if (!res.ok) throw new Error(`Failed to fetch ${file}`);
        const html = await res.text();
        document.getElementById(id).innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${file}:`, error);
    }
}

// Remove the loadHTML calls, but still keep the rest of the logic
Promise.all([]).then(() => {

    // Desktop Dropdowns
    const dropdowns = [{
        buttonId: 'desktop-menu-button-solutions',
        menuId: 'desktop-dropdown-solutions'
    },
    {
        buttonId: 'desktop-menu-button-industries',
        menuId: 'desktop-dropdown-industries'
    },
    {
        buttonId: 'desktop-menu-button-company',
        menuId: 'desktop-dropdown-company'
    }
    ];

    dropdowns.forEach(({
        buttonId,
        menuId
    }) => {
        const button = document.getElementById(buttonId);
        const menu = document.getElementById(menuId);
        const parent = button?.parentElement;

        if (button && menu && parent) {
            let isClicked = false;

            button.addEventListener('click', (e) => {
                e.stopPropagation();
                isClicked = !isClicked;
                menu.classList.toggle('hidden', !isClicked);
                button.setAttribute('aria-expanded', isClicked);
                const svg = button.querySelector('svg');
                svg.classList.toggle('rotate-180', isClicked);
                dropdowns.forEach(other => {
                    if (other.menuId !== menuId) {
                        const otherMenu = document.getElementById(other.menuId);
                        const otherButton = document.getElementById(other.buttonId);
                        if (otherMenu && otherButton) {
                            otherMenu.classList.add('hidden');
                            otherButton.setAttribute('aria-expanded', 'false');
                            const otherSvg = otherButton.querySelector('svg');
                            otherSvg.classList.remove('rotate-180');
                        }
                    }
                });
            });

            parent.addEventListener('mouseenter', () => {
                if (!isClicked) {
                    menu.classList.remove('hidden');
                    button.setAttribute('aria-expanded', 'true');
                    const svg = button.querySelector('svg');
                    svg.classList.add('rotate-180');
                }
            });

            parent.addEventListener('mouseleave', () => {
                if (!isClicked) {
                    menu.classList.add('hidden');
                    button.setAttribute('aria-expanded', 'false');
                    const svg = button.querySelector('svg');
                    svg.classList.remove('rotate-180');
                }
            });

            menu.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    });

    document.addEventListener('click', (e) => {
        dropdowns.forEach(({
            buttonId,
            menuId
        }) => {
            const button = document.getElementById(buttonId);
            const menu = document.getElementById(menuId);
            if (button && menu && !button.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.add('hidden');
                button.setAttribute('aria-expanded', 'false');
                const svg = button.querySelector('svg');
                svg.classList.remove('rotate-180');
            }
        });
    });

    // FAQ Accordion Initialization
    const faqButtons = document.querySelectorAll('[aria-controls^="faq-answer-"]');
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('aria-controls');
            const target = document.getElementById(targetId);
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', !isExpanded);
            const chevron = button.querySelector('svg');
            chevron.classList.toggle('rotate-180');
            if (!isExpanded) {
                target.style.maxHeight = target.scrollHeight + 'px';
                setTimeout(() => target.style.maxHeight = 'none', 300);
            } else {
                target.style.maxHeight = target.scrollHeight + 'px';
                setTimeout(() => target.style.maxHeight = '0px', 0);
            }
        });
    });

    // Hero Section AI Assistant Initialization
    const aiButton = document.querySelector('#hero button.bg-amber-500');
    const aiInput = document.querySelector('#quickQuestionInput');
    if (aiButton && aiInput) {
        aiButton.addEventListener('click', () => {
            const question = aiInput.value.trim();
            if (question) {
                alert(
                    `You asked: "${question}"\nThis is a placeholder. Implement AI API call here.`);
                aiInput.value = '';
            } else {
                aiInput.classList.add('border-red-500');
                setTimeout(() => aiInput.classList.remove('border-red-500'), 2000);
            }
        });

        aiInput.addEventListener('input', () => {
            aiInput.classList.remove('border-red-500');
        });

        const suggestions = document.querySelector('#ai-suggestions');
        if (suggestions) {
            aiInput.addEventListener('focus', () => {
                suggestions.classList.remove('hidden');
                aiInput.setAttribute('aria-expanded', 'true');
            });
            aiInput.addEventListener('blur', () => {
                setTimeout(() => {
                    suggestions.classList.add('hidden');
                    aiInput.setAttribute('aria-expanded', 'false');
                }, 200);
            });
        }
    }
});
</script>
<script>
document.addEventListener("DOMContentLoaded", () => {
    const aiInput = document.getElementById("quickQuestionInput");
    const aiButton = document.getElementById("aiSubmitButton");
    const suggestionList = document.getElementById("ai-suggestions");

    // Show suggestions on focus
    aiInput.addEventListener("focus", () => {
        suggestionList.classList.remove("hidden");
        aiInput.setAttribute("aria-expanded", "true");
    });

    // Hide suggestions on blur (delayed to allow click)
    aiInput.addEventListener("blur", () => {
        setTimeout(() => {
            suggestionList.classList.add("hidden");
            aiInput.setAttribute("aria-expanded", "false");
        }, 150);
    });

    // Remove red border when user types
    aiInput.addEventListener("input", () => {
        aiInput.classList.remove("border-red-500");
    });

    // Submit handler
    aiButton.addEventListener("click", () => {
        const question = aiInput.value.trim();
        if (question) {
            alert(`You asked: "${question}"\nThis is a placeholder. Implement AI API call here.`);
            aiInput.value = "";
            suggestionList.classList.add("hidden");
        } else {
            aiInput.classList.add("border-red-500");
        }
    });

    // Handle click on suggestion
    document.querySelectorAll("#ai-suggestions button").forEach((btn) => {
        btn.addEventListener("click", () => {
            aiInput.value = btn.textContent.trim();
            aiButton.click(); // Trigger AI response
        });
    });
});
</script>