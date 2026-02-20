// ============== HAMBURGER MENU ==============
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ============== SMOOTH SCROLLING ==============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ============== ORDER PAGE FUNCTIONALITY ==============
const orderForm = document.getElementById('orderForm');
if (orderForm) {
    orderForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const teaType = document.getElementById('teaType').value;
        const quantity = document.getElementById('quantity').value;
        const temperature = document.getElementById('temperature').value;
        const totalPrice = document.getElementById('totalPrice').textContent;

        // Validate form
        if (!teaType) {
            alert('Please select a tea');
            return;
        }

        // Create order summary
        const orderSummary = `
Order Confirmation
==================
Name: ${fullName}
Email: ${email}
Phone: ${phone}
Tea: ${document.getElementById('teaType').options[document.getElementById('teaType').selectedIndex].text}
Quantity: ${quantity}
Temperature: ${temperature}
Total Amount: ${totalPrice}

Your order will be delivered in 15-20 minutes.
Thank you for ordering with CHAI GALI!`;

        // Show confirmation
        alert(orderSummary);

        // Reset form
        orderForm.reset();
        updatePrice();
    });
}

// ============== ORDER PRICE CALCULATION ==============
function updatePrice() {
    const teaTypeSelect = document.getElementById('teaType');
    const quantityInput = document.getElementById('quantity');
    const deliveryRadios = document.querySelectorAll('input[name="delivery"]');
    const addonsCheckboxes = document.querySelectorAll('input[name="addons"]');

    let basePrice = 0;
    let quantity = parseInt(quantityInput.value) || 1;
    let addonsTotal = 0;
    let deliveryCharge = 0;

    // Get base price
    if (teaTypeSelect.value) {
        basePrice = parseInt(teaTypeSelect.options[teaTypeSelect.selectedIndex].getAttribute('data-price')) || 0;
    }

    // Calculate addons
    addonsCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            addonsTotal += parseInt(checkbox.getAttribute('data-price')) || 0;
        }
    });

    // Get delivery charge
    deliveryRadios.forEach(radio => {
        if (radio.checked && radio.value === 'express') {
            deliveryCharge = 20;
        }
    });

    // Calculate total
    const totalPrice = (basePrice * quantity) + (addonsTotal * quantity) + deliveryCharge;

    // Update summary
    const teaLabel = teaTypeSelect.value ? teaTypeSelect.options[teaTypeSelect.selectedIndex].text : 'Select a tea';
    document.getElementById('summaryTea').textContent = teaLabel;
    document.getElementById('summaryQuantity').textContent = quantity + ' cup' + (quantity !== 1 ? 's' : '');
    document.getElementById('summaryAddons').textContent = '₹' + (addonsTotal * quantity);
    document.getElementById('summaryDelivery').textContent = deliveryCharge === 0 ? 'Free' : '₹' + deliveryCharge;
    document.getElementById('totalPrice').textContent = '₹' + totalPrice;
}

// Add event listeners for price updates
document.addEventListener('DOMContentLoaded', function () {
    const teaTypeSelect = document.getElementById('teaType');
    const quantityInput = document.getElementById('quantity');
    const addonsCheckboxes = document.querySelectorAll('input[name="addons"]');
    const deliveryRadios = document.querySelectorAll('input[name="delivery"]');

    if (teaTypeSelect) {
        teaTypeSelect.addEventListener('change', updatePrice);
    }
    if (quantityInput) {
        quantityInput.addEventListener('change', updatePrice);
    }
    addonsCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updatePrice);
    });
    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', updatePrice);
    });

    // Initialize price on page load
    updatePrice();
});

// ============== CONTACT FORM FUNCTIONALITY ==============
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const phone = document.getElementById('contactPhone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Validate form
        if (!name || !email || !subject || !message) {
            alert('Please fill in all required fields');
            return;
        }

        // Create message
        const contactMessage = `
Contact Form Submission
======================
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject}
Message: ${message}

Thank you for reaching out to CHAI GALI!
We will get back to you soon.`;

        alert(contactMessage);
        contactForm.reset();
    });
}

// ============== ANIMATION ON SCROLL ==============
function animateElementsOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .item-card, .menu-item, .faq-item, .team-member');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Call animation function when DOM is loaded
document.addEventListener('DOMContentLoaded', animateElementsOnScroll);

// ============== ACTIVE NAV LINK ==============
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', setActiveNavLink);

// ============== FORM VALIDATION ==============
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

// ============== THEME INTERACTIVITY ==============
// Add hover effects to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseover', function () {
        this.style.transform = 'scale(1.05)';
    });
    button.addEventListener('mouseout', function () {
        this.style.transform = 'scale(1)';
    });
});

// ============== MENU FILTERING (OPTIONAL) ==============
// This can be enhanced with actual filtering functionality

// ============== LOCAL STORAGE FOR CART (OPTIONAL) ==============
function saveToCart(teaName, price, quantity) {
    let cart = JSON.parse(localStorage.getItem('chai-gali-cart')) || [];

    const existingItem = cart.find(item => item.name === teaName);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name: teaName, price: price, quantity: quantity });
    }

    localStorage.setItem('chai-gali-cart', JSON.stringify(cart));
}

// ============== CLOSING MENU ON OUTSIDE CLICK ==============
document.addEventListener('click', function (event) {
    const navbar = document.querySelector('.navbar');
    const hamburgerBtn = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (navbar && !navbar.contains(event.target) && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// ============== SCROLL TO TOP BUTTON ==============
function scrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.setAttribute('id', 'scrollToTop');
    scrollBtn.textContent = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #8B4513;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 999;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollBtn.addEventListener('mouseover', () => {
        scrollBtn.style.backgroundColor = '#D2691E';
        scrollBtn.style.transform = 'scale(1.1)';
    });

    scrollBtn.addEventListener('mouseout', () => {
        scrollBtn.style.backgroundColor = '#8B4513';
        scrollBtn.style.transform = 'scale(1)';
    });
}

document.addEventListener('DOMContentLoaded', scrollToTopButton);