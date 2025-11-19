document.addEventListener('DOMContentLoaded', () => {
    
    // --- Theme Toggle ---
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'dark';

    // Set initial theme to dark
    if (savedTheme === 'dark') {
        htmlElement.classList.remove('light-mode');
        updateThemeIcon('moon');
    } else {
        htmlElement.classList.add('light-mode');
        updateThemeIcon('sun');
    }

    themeToggle.addEventListener('click', () => {
        const isLightMode = htmlElement.classList.toggle('light-mode');
        const newTheme = isLightMode ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(isLightMode ? 'sun' : 'moon');
    });

    function updateThemeIcon(icon) {
        const iconElement = themeToggle.querySelector('i');
        iconElement.className = `fas fa-${icon}`;
    }
    
    // --- Mobile Menu Toggle ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            
            // Change icon based on state
            const icon = mobileBtn.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#' || targetId.length === 1) return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Carousel with API ---
    const carouselItems = document.getElementById('carouselItems');
    const carouselDots = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;
    let cars = [];

    // Fetch cars from MockAPI
    async function fetchCars() {
        try {
            // MockAPI endpoint
            const response = await fetch('https://691e2f61bb52a1db22bd3fbb.mockapi.io/api/v1/cars?limit=6');
            
            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            cars = data || [];
            renderCarousel();
        } catch (error) {
            console.log('Using sample data');
            // Fallback to sample data
            cars = getSampleCars();
            renderCarousel();
        }
    }

    function getSampleCars() {
        return [
            {
                make: 'Mazda',
                model: 'CX-5',
                year: 2020,
                class: 'SUV',
                transmission: 'Automático',
                fuel: 'Gasolina',
                mileage: '45,000 km',
                price: '$18,500',
                color: '#e74c3c',
                emoji: '🚙'
            },
            {
                make: 'Toyota',
                model: 'Corolla',
                year: 2021,
                class: 'Sedán',
                transmission: 'Automático',
                fuel: 'Híbrido',
                mileage: '32,000 km',
                price: '$22,000',
                color: '#3498db',
                emoji: '🚗'
            },
            {
                make: 'Chevrolet',
                model: 'Equinox',
                year: 2019,
                class: 'SUV',
                transmission: 'Automático',
                fuel: 'Gasolina',
                mileage: '67,000 km',
                price: '$15,800',
                color: '#2ecc71',
                emoji: '🚙'
            },
            {
                make: 'Honda',
                model: 'Civic',
                year: 2022,
                class: 'Sedán',
                transmission: 'Manual',
                fuel: 'Gasolina',
                mileage: '18,500 km',
                price: '$24,200',
                color: '#f39c12',
                emoji: '🚗'
            },
            {
                make: 'Kia',
                model: 'Sportage',
                year: 2020,
                class: 'SUV',
                transmission: 'Automático',
                fuel: 'Diesel',
                mileage: '52,000 km',
                price: '$19,900',
                color: '#9b59b6',
                emoji: '🚙'
            },
            {
                make: 'Hyundai',
                model: 'Elantra',
                year: 2021,
                class: 'Sedán',
                transmission: 'Automático',
                fuel: 'Gasolina',
                mileage: '41,000 km',
                price: '$16,500',
                color: '#34495e',
                emoji: '🚗'
            }
        ];
    }

    function renderCarousel() {
        if (cars.length === 0) return;

        // Render carousel items
        carouselItems.innerHTML = cars.map((car, index) => `
            <div class="carousel-item">
                <div class="carousel-image" style="background-color: ${car.color}; color: white;">
                    <span style="font-size: 6rem;">${car.emoji || '🚗'}</span>
                </div>
                <div class="carousel-content">
                    <h3>${car.make} ${car.model}</h3>
                    <p>${car.year} | ${car.class} | ${car.transmission}</p>
                    <p style="font-size: 0.9rem; color: var(--secondary-color); margin: 15px 0;">
                        Vehículo en excelentes condiciones, listo para llevar. 
                        Todos los papeles en orden, revisión técnico-mecánica al día.
                    </p>
                    <div class="carousel-specs">
                        <div class="carousel-spec">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>${car.mileage || 'N/A'}</span>
                        </div>
                        <div class="carousel-spec">
                            <i class="fas fa-gas-pump"></i>
                            <span>${car.fuel || 'Gasolina'}</span>
                        </div>
                        <div class="carousel-spec">
                            <i class="fas fa-calendar"></i>
                            <span>${car.year}</span>
                        </div>
                        <div class="carousel-spec">
                            <i class="fas fa-tag"></i>
                            <span>${car.price || 'Contactar'}</span>
                        </div>
                    </div>
                    <a href="#contacto" class="btn btn-primary">Contactar sobre este auto</a>
                </div>
            </div>
        `).join('');

        // Render dots
        carouselDots.innerHTML = cars.map((_, index) => 
            `<div class="carousel-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>`
        ).join('');

        // Add dot click handlers
        document.querySelectorAll('.carousel-dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                currentIndex = parseInt(e.target.dataset.index);
                updateCarousel();
            });
        });

        updateCarousel();
    }

    function updateCarousel() {
        const carousel = document.getElementById('carouselItems');
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update dots
        document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + cars.length) % cars.length;
            updateCarousel();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % cars.length;
            updateCarousel();
        });
    }

    // Fetch cars on load
    fetchCars();

    // --- Contact Form Validation & Simulation ---
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic Validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name === '' || email === '' || message === '') {
                alert('Por favor, completa todos los campos requeridos.');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }

            // Simulate Sending
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.disabled = true;
            submitBtn.innerText = 'Enviando...';

            setTimeout(() => {
                // Success Feedback
                alert(`¡Gracias ${name}! Tu mensaje ha sido enviado. Julio te contactará pronto.`);
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerText = originalText;
            }, 1500);
        });
    }

    // Helper: Email Validation Regex
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // --- Scroll Animation (Optional Polish) ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.service-card, .vehicle-card, .section-title');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

});