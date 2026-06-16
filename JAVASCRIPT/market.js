// Product Database
const products = [
    { id: 1, name: "Local Brown Rice", category: "grains", price: "7,200 SLL/kg", priceValue: 7200, location: "Kenema District", quantity: "500 kg available", image: "image/redrice.png", farmer: "Mama Fatmata's Farm" },
    { id: 2, name: "Fresh Cassava", category: "vegetables", price: "3,500 SLL/kg", priceValue: 3500, location: "Bo District", quantity: "1,200 kg available", image: "image/cassava.png", farmer: "Kailahun Cooperative" },
    { id: 3, name: "Red Palm Oil", category: "oils", price: "12,000 SLL/litre", priceValue: 12000, location: "Pujehun District", quantity: "300 litres available", image: "image/redpalmoil.png", farmer: "Sierra Palm Growers" },
    { id: 4, name: "Raw Groundnuts", category: "nuts", price: "9,500 SLL/kg", priceValue: 9500, location: "Makeni", quantity: "800 kg available", image: "image/grandnut.png", farmer: "Northern Farmers Union" },
    { id: 5, name: "Fresh Onions", category: "vegetables", price: "4,800 SLL/kg", priceValue: 4800, location: "Port Loko", quantity: "400 kg available", image: "image/onion.png", farmer: "Onion Valley Cooperative" },
    { id: 6, name: "African Rice", category: "grains", price: "6,500 SLL/kg", priceValue: 6500, location: "Kambia District", quantity: "1,000 kg available", image: "image/redrice.png", farmer: "Rokel Rice Farms" },
    { id: 7, name: "Vegetable Oil", category: "oils", price: "10,000 SLL/litre", priceValue: 10000, location: "Freetown", quantity: "600 litres available", image: "image/vegetableoil.png", farmer: "Western Area Processors" },
    { id: 8, name: "Sweet Potatoes", category: "vegetables", price: "3,200 SLL/kg", priceValue: 3200, location: "Kono District", quantity: "700 kg available", image: "image/potatoes.png", farmer: "Kono Women's Group" }
];

let currentCategory = "all";
let currentSearch = "";

// Render Products
function renderProducts() {
    const grid = document.getElementById("productGrid");
    let filtered = products;

    // Filter by category
    if (currentCategory !== "all") {
        filtered = filtered.filter(p => p.category === currentCategory);
    }

    // Filter by search
    if (currentSearch) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
            p.location.toLowerCase().includes(currentSearch.toLowerCase())
        );
    }

    if (filtered.length === 0) {
        grid.innerHTML = `<div style="text-align: center; padding: 3rem; grid-column: 1/-1; background: white; border-radius: 20px;">
            <p>No products found. Try a different search!</p>
        </div>`;
        return;
    }

    grid.innerHTML = filtered.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-location">📍 ${product.location}</div>
                <div class="product-price">💰 ${product.price}</div>
                <div class="product-quantity">📦 ${product.quantity}</div>
                <div class="contact-seller">
                    👩‍🌾 Seller: ${product.farmer}
                </div>
            </div>
        </div>
    `).join("");
}

// Price Calculator (JavaScript Interaction)
function setupCalculator() {
    const priceMap = {
        rice: 7200,
        cassava: 3500,
        palmOil: 12000,
        groundnuts: 9500,
        onions: 4800
    };

    const productNames = {
        rice: "Local Rice",
        cassava: "Cassava",
        palmOil: "Palm Oil",
        groundnuts: "Groundnuts",
        onions: "Onions"
    };

    const calculateBtn = document.getElementById("calculateBtn");
    const productSelect = document.getElementById("productSelect");
    const quantityInput = document.getElementById("quantity");
    const resultDiv = document.getElementById("calcResult");

    calculateBtn.addEventListener("click", () => {
        const product = productSelect.value;
        const quantity = parseFloat(quantityInput.value);
        const pricePerUnit = priceMap[product];
        const total = pricePerUnit * quantity;
        const unit = product === "palmOil" ? "litre" : "kg";
        
        resultDiv.innerHTML = `💰 Estimated market price: ${total.toLocaleString()} SLL for ${quantity} ${unit} of ${productNames[product]}<br>
        <span style="font-size: 0.85rem;">📊 Based on current Freetown wholesale market rates</span>`;
        resultDiv.style.background = "#FFF3E0";
        resultDiv.style.padding = "12px";
        resultDiv.style.borderRadius = "12px";
        resultDiv.style.marginTop = "1rem";
    });
}

// Setup Filters
function setupFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentCategory = btn.dataset.category;
            renderProducts();
        });
    });

    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", (e) => {
        currentSearch = e.target.value;
        renderProducts();
    });
}

// Initialize Page
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    setupFilters();
    setupCalculator();
});
