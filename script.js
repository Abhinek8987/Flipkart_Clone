let slideIndex = 0;

function slideImages() {
    const slides = document.querySelector(".slides");
    const totalSlides = slides.children.length;

    slideIndex++;

    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    }

    slides.style.transform = `translateX(-${slideIndex * 100}%)`;
}

setInterval(slideImages, 3000);


// Get cart from localStorage or initialize empty array
// Get cart from localStorage or initialize an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add item to cart
function addToCart(productName, productPrice, productImage) {
    let existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item already exists
    } else {
        let product = { name: productName, price: productPrice, image: productImage, quantity: 1 };
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Function to update the cart count in the navbar
function updateCartCount() {
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").innerText = totalItems;
}

// Redirect to cart page
document.getElementById("cart-btn").addEventListener("click", function () {
    window.location.href = "cart.html";
});

// Initialize cart count on page load
updateCartCount();

// Search Button Functionality

document.addEventListener("DOMContentLoaded", function () {
    loadCartCount(); // Load cart count on page load

    // Live Search Functionality
    document.querySelector("#search-box").addEventListener("input", function () {
        searchProducts();
    });
});

// Function to filter products dynamically as user types
function searchProducts() {
    let query = document.getElementById("search-box").value.trim().toLowerCase();
    let products = document.querySelectorAll(".product");

    products.forEach(product => {
        let title = product.querySelector(".title").innerText.toLowerCase();
        if (title.includes(query)) {
            product.style.display = "block"; // Show matching products
        } else {
            product.style.display = "none"; // Hide non-matching products
        }
    });
}

// Function to update cart count
function loadCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").innerText = cart.length;
}

// Function to add items to the cart
function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price, image, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Update cart count
    loadCartCount();
    alert(`${name} added to cart!`);
}


