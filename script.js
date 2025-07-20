// --- DATA ---
const products = [
    { id: 1, name: "Ribeye Steak", price: 18.99, category: "beef", desc: "Premium ribeye, tender and juicy.", image: "ribeye-steak.jpg" },
    { id: 2, name: "Ground Beef", price: 8.99, category: "beef", desc: "Fresh 85/15 ground beef for burgers.", image: "ground-beef.jpeg" },
    { id: 3, name: "Beef Brisket", price: 15.99, category: "beef", desc: "Slow-cooked brisket, fall-off-the-bone tender.", image: "beef-brisket.jpg" },
    { id: 4, name: "Chicken Breast", price: 9.99, category: "chicken", desc: "Boneless, skinless chicken breast.", image: "chicken-breast.jpg" },
    { id: 5, name: "Chicken Thighs", price: 7.99, category: "chicken", desc: "Juicy, bone-in chicken thighs, full of flavor.", image: "chicken-thighs.jpg" },
    { id: 6, name: "Whole Chicken", price: 12.99, category: "chicken", desc: "Fresh whole roaster chicken, family size.", image: "whole-chicken.jpg" },
    { id: 7, name: "Mutton Chops", price: 22.99, category: "mutton", desc: "Premium mutton chops, restaurant quality.", image: "mutton-chops.jpg" },
    { id: 8, name: "Lamb Leg", price: 28.99, category: "mutton", desc: "Tender lamb leg, perfect for special occasions.", image: "lamb-leg.jpg" },
    { id: 9, name: "Ground Lamb", price: 16.99, category: "mutton", desc: "Fresh ground lamb, great for kebabs.", image: "ground-lamb.jpg" },
    { id: 10, name: "Dozen Eggs", price: 4.99, category: "other", desc: "Farm-fresh, free-range eggs.", image: "dozen-eggs.jpg" },
    { id: 11, name: "Goat Meat", price: 24.99, category: "other", desc: "Fresh goat meat, a traditional favorite.", image: "goat-meat.jpg" },
    { id: 12, name: "Beef Liver", price: 6.99, category: "other", desc: "Fresh beef liver, rich in nutrients.", image: "beef-liver.jpg" },
    { id: 13, name: "Lamb Shank", price: 19.99, category: "mutton", desc: "Premium lamb shanks, perfect for slow cooking.", image: "lamb-shank.jpg" },
    { id: 14, name: "Beef Tenderloin", price: 24.99, category: "beef", desc: "The most tender cut of beef, perfect for special occasions.", image: "beef-tenderlion.jpg" }, // Corrected filename
    { id: 15, name: "Chicken Wings", price: 5.99, category: "chicken", desc: "Fresh chicken wings, great for grilling or frying.", image: "chicken-wing.jpg" }, // Corrected filename
    { id: 16, name: "Halal Sausages", price: 8.99, category: "other", desc: "Freshly made halal sausages with premium spices.", image: "halal-sausages.jpg" }
];
const faqs = [
    { q: "Is all your meat 100% Zabiha Halal?", a: "Yes, absolutely. We are proudly certified by Halal Monitoring Services (HMS). Every product we sell adheres to the strictest standards of Zabiha Halal, ensuring authenticity and peace of mind for our customers." },
    { q: "Where do you source your meat from?", a: "We partner with trusted local and regional farms that prioritize ethical and humane treatment of animals. Our commitment to quality starts at the source." },
    { q: "Do you offer delivery?", a: "Currently, we offer online ordering for in-store pickup. This ensures you receive your meat at its peak freshness. We are exploring local delivery options for the near future!" },
    { q: "Can I place a special order for a specific cut?", a: "Of course! Our expert butchers are happy to accommodate special requests. Please call us or visit the store to discuss your needs, and we'll do our best to prepare the perfect cut for you." }
];

let cart = [];
let currentFilter = 'all';

// --- CORE FUNCTIONS ---
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    initFaqs();
    updateCartUI();
    initScrollAnimations();
});

function displayProducts() {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    const filteredProducts = currentFilter === 'all' ? products : products.filter(p => p.category === currentFilter);
    productList.innerHTML = '';
    
    filteredProducts.forEach((product, index) => {
        const div = document.createElement('div');
        div.className = 'product-card bg-white rounded-xl shadow-lg overflow-hidden border border-stone-200 fade-in-up stagger';
        div.style.setProperty('--delay', `${index * 50}ms`);
        
        // **FIX:** Used backticks (`) for template literal
        div.innerHTML = `
            <div class="overflow-hidden h-48">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <div class="p-6 flex flex-col justify-between" style="min-height: 200px;">
                <div>
                    <h3 class="text-xl font-bold mb-2 text-text-main">${product.name}</h3>
                    <p class="text-text-muted mb-4 h-12">${product.desc}</p>
                </div>
                <div class="flex items-center justify-between mt-4">
                    <span class="text-2xl font-extrabold text-text-main">$${product.price.toFixed(2)}</span>
                    <button onclick="addToCart(${product.id})" class="btn-primary text-white px-4 py-2 rounded-full font-semibold hover:bg-brand-maroon-dark transition-all flex items-center gap-2 transform hover:scale-105">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                        <span>Add</span>
                    </button>
                </div>
            </div>`;
        productList.appendChild(div);
    });
    // Re-initialize animations for the newly added elements
    initScrollAnimations();
}

function filterProducts(category, btnElement) {
    currentFilter = category;
    displayProducts();
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-brand-maroon', 'text-white');
        btn.classList.add('bg-stone-200', 'text-text-main');
    });
    
    if (btnElement) {
        btnElement.classList.add('bg-brand-maroon', 'text-white');
        btnElement.classList.remove('bg-stone-200', 'text-text-main');
    }
}

// --- CART LOGIC ---
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) { 
        existingItem.quantity++; 
    } else { 
        cart.push({...product, quantity: 1}); 
    }
    updateCartUI();
    // **FIX:** Used backticks (`) for template literal
    showNotification(`${product.name} added to cart!`);
}

function updateQuantity(productId, change) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) { 
            removeFromCart(productId); 
        } else { 
            updateCartUI(); 
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Update cart counts in all places
    document.getElementById('cart-count').textContent = totalItems;
    document.getElementById('mobile-cart-count').textContent = totalItems;
    document.getElementById('mobile-cart-count-icon').textContent = totalItems;
    
    if (cart.length === 0) {
        // **FIX:** Used backticks (`) for template literal
        cartItemsContainer.innerHTML = `
            <div class="text-center text-text-muted py-16">
                <svg class="w-16 h-16 mx-auto mb-4 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                <p class="font-semibold text-lg">Your cart is empty</p>
                <p>Add some fresh meats to get started!</p>
            </div>`;
        checkoutBtn.disabled = true;
    } else {
        checkoutBtn.disabled = false;
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const div = document.createElement('div');
            div.className = 'cart-item flex items-center justify-between border-b border-stone-200 pb-4 mb-4';
            // **FIX:** Used backticks (`) for template literal
            div.innerHTML = `
                <div class="flex items-center gap-4 flex-1">
                    <div class="bg-gray-200 rounded-xl w-16 h-16 flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
                    </div>
                    <div>
                        <h4 class="font-semibold text-text-main">${item.name}</h4>
                        <p class="text-text-muted">$${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="updateQuantity(${item.id}, -1)" class="w-7 h-7 bg-stone-200 rounded-full flex items-center justify-center hover:bg-stone-300 transition-colors">-</button>
                    <span class="w-8 text-center font-semibold">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" class="w-7 h-7 bg-stone-200 rounded-full flex items-center justify-center hover:bg-stone-300 transition-colors">+</button>
                    <button onclick="removeFromCart(${item.id})" class="ml-2 text-brand-maroon/70 hover:text-brand-maroon transition-colors" aria-label="Remove item">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>`;
            cartItemsContainer.appendChild(div);
        });
    }
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalEl.textContent = `$${totalPrice.toFixed(2)}`;
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    const panel = document.getElementById('cart-panel');
    const isOpen = !sidebar.classList.contains('pointer-events-none');
    
    if (isOpen) {
        overlay.classList.add('opacity-0');
        panel.classList.add('translate-x-full');
        setTimeout(() => sidebar.classList.add('pointer-events-none'), 300);
    } else {
        updateCartUI(); // Update cart just before showing it
        sidebar.classList.remove('pointer-events-none');
        overlay.classList.remove('opacity-0');
        panel.classList.remove('translate-x-full');
    }
}

// --- UI & UX ---
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    if (!notification) return;

    notification.querySelector('#notification-text').textContent = message;
    // Animate in
    notification.style.transform = 'translateX(-50%) translateY(0)';
    // Animate out after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(200%)';
    }, 3000);
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in-up').forEach(el => {
        el.classList.remove('is-visible'); // Ensure it's hidden initially
        observer.observe(el);
    });
}

function initFaqs() {
    const container = document.getElementById('faq-container');
    if (!container) return;
    container.innerHTML = ''; // Clear existing content
    faqs.forEach(faq => {
        const div = document.createElement('div');
        div.className = 'border border-stone-200 rounded-lg bg-white overflow-hidden transition-shadow duration-300 hover:shadow-md';
        // **FIX:** Used backticks (`) for template literal
        div.innerHTML = `
            <button class="faq-question flex justify-between items-center w-full p-5 text-left font-semibold text-text-main">
                <span>${faq.q}</span>
                <svg class="faq-icon w-5 h-5 transform transition-transform duration-300 text-brand-maroon flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div class="faq-answer px-5 text-text-muted">
                <p class="pb-5">${faq.a}</p>
            </div>`;
        container.appendChild(div);
    });

    container.addEventListener('click', (e) => {
        const questionBtn = e.target.closest('.faq-question');
        if (questionBtn) {
            const answer = questionBtn.nextElementSibling;
            const icon = questionBtn.querySelector('.faq-icon');
            
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                icon.style.transform = 'rotate(0deg)';
                questionBtn.parentElement.classList.remove('shadow-lg');
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(-180deg)';
                questionBtn.parentElement.classList.add('shadow-lg');
            }
        }
    });
}