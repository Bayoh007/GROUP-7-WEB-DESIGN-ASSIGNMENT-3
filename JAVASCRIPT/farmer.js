    // Farmer Data (simulated from registration)
    let currentFarmer = {
        id: 1,
        name: "Mariatu Koroma",
        role: "Farmer",
        phone: "+23276123456",
        district: "Bo District",
        joinDate: "2026-01-15"
    };

    // Products Array
    let farmerProducts = [
        { id: 1, name: "Organic Cassava", price: 3500, quantity: 500, category: "Vegetables", status: "Active", sales: 120 },
        { id: 2, name: "Local Brown Rice", price: 7200, quantity: 300, category: "Grains", status: "Active", sales: 80 },
        { id: 3, name: "Red Palm Oil", price: 12000, quantity: 150, category: "Oils", status: "Active", sales: 45 }
    ];

    // Orders Array
    let farmerOrders = [
        { id: 101, customer: "Freetown Market Coop", product: "Organic Cassava", quantity: 50, total: 175000, status: "Completed", date: "2026-05-28" },
        { id: 102, customer: "Bo Restaurant", product: "Local Brown Rice", quantity: 30, total: 216000, status: "Completed", date: "2026-05-25" },
        { id: 103, customer: "Kenema Trader", product: "Red Palm Oil", quantity: 20, total: 240000, status: "Pending", date: "2026-05-30" }
    ];

    // Load data from localStorage if exists
    function loadFarmerData() {
        const storedProducts = localStorage.getItem("farmerProducts");
        if (storedProducts) farmerProducts = JSON.parse(storedProducts);
        
        const storedOrders = localStorage.getItem("farmerOrders");
        if (storedOrders) farmerOrders = JSON.parse(storedOrders);
        
        updateDashboardStats();
        displayProducts();
        displayOrders();
        displayMarketInsights();
        displayRecentActivity();
        
        // Set welcome name
        document.getElementById("welcomeName").innerText = currentFarmer.name;
        document.getElementById("displayFarmerName").innerText = currentFarmer.name;
        document.getElementById("displayFarmerRole").innerText = currentFarmer.role;
        
        // Profile form
        document.getElementById("profileName").value = currentFarmer.name;
        document.getElementById("profilePhone").value = currentFarmer.phone;
        document.getElementById("profileDistrict").value = currentFarmer.district;
    }

    function updateDashboardStats() {
        const activeProducts = farmerProducts.filter(p => p.status === "Active").length;
        const totalOrders = farmerOrders.length;
        const totalRevenue = farmerOrders.reduce((sum, order) => sum + order.total, 0);
        
        document.getElementById("totalProducts").innerText = activeProducts;
        document.getElementById("totalOrders").innerText = totalOrders;
        document.getElementById("totalRevenue").innerText = totalRevenue.toLocaleString();
    }

    function displayProducts() {
        const tbody = document.getElementById("productsList");
        if (farmerProducts.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No products yet. Add your first product!</td></tr>';
            return;
        }
        
        tbody.innerHTML = farmerProducts.map(product => `
            <tr>
                <td>${product.name}</td>
                <td>${product.price.toLocaleString()}</td>
                <td>${product.quantity} ${product.category === "Oils" ? "litres" : "kg"}</td>
                <td><span class="status-badge status-active">${product.status}</span></td>
                <td>
                    <button class="edit-btn" onclick="editProduct(${product.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            </tr>
        `).join("");
    }

    function displayOrders() {
        const ordersDiv = document.getElementById("ordersList");
        if (farmerOrders.length === 0) {
            ordersDiv.innerHTML = '<p>No orders yet.</p>';
            return;
        }
        
        ordersDiv.innerHTML = farmerOrders.map(order => `
            <div class="insight-card" style="margin-bottom: 0.8rem;">
                <strong>Order #${order.id}</strong><br>
                Customer: ${order.customer}<br>
                Product: ${order.product}<br>
                Quantity: ${order.quantity} | Total: ${order.total.toLocaleString()} SLL<br>
                Status: <span class="status-badge ${order.status === 'Completed' ? 'status-active' : 'status-pending'}">${order.status}</span><br>
                Date: ${order.date}
            </div>
        `).join("");
    }

    function displayMarketInsights() {
        const insights = [
            { crop: "Cassava", price: "3,200 - 3,800 SLL/kg", trend: "📈 +5%", demand: "High" },
            { crop: "Local Rice", price: "6,800 - 7,500 SLL/kg", trend: "📈 +8%", demand: "Very High" },
            { crop: "Palm Oil", price: "11,000 - 13,000 SLL/litre", trend: "📉 -2%", demand: "Medium" },
            { crop: "Groundnuts", price: "9,000 - 10,000 SLL/kg", trend: "📈 +3%", demand: "High" }
        ];
        
        document.getElementById("marketInsights").innerHTML = insights.map(insight => `
            <div class="insight-card">
                <strong>🌾 ${insight.crop}</strong><br>
                Price: ${insight.price}<br>
                Trend: ${insight.trend}<br>
                Demand: ${insight.demand}
            </div>
        `).join("");
    }

    function displayRecentActivity() {
        const activities = [
            "New order received from Freetown Market Coop",
            "Your cassava listing was viewed 15 times today",
            "Market price for rice increased by 5%",
            "Tip: Update your inventory for better visibility"
        ];
        
        document.getElementById("recentActivity").innerHTML = activities.map(activity => `
            <div class="insight-card" style="margin-bottom: 0.5rem;">
                📌 ${activity}
            </div>
        `).join("");
    }

    // Product Management
    function openAddProductModal() {
        document.getElementById("productModal").style.display = "flex";
    }

    function closeModal() {
        document.getElementById("productModal").style.display = "none";
        document.getElementById("productName").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("productQuantity").value = "";
    }

    function saveProduct() {
        const name = document.getElementById("productName").value;
        const price = parseFloat(document.getElementById("productPrice").value);
        const quantity = parseFloat(document.getElementById("productQuantity").value);
        const category = document.getElementById("productCategory").value;
        const desc = document.getElementById("productDesc").value;
        
        if (!name || !price || !quantity) {
            alert("Please fill all required fields");
            return;
        }
        
        const newProduct = {
            id: Date.now(),
            name: name,
            price: price,
            quantity: quantity,
            category: category,
            description: desc,
            status: "Active",
            sales: 0
        };
        
        farmerProducts.push(newProduct);
        localStorage.setItem("farmerProducts", JSON.stringify(farmerProducts));
        updateDashboardStats();
        displayProducts();
        closeModal();
        
        // Show success message
        alert(`✅ Product "${name}" added successfully!`);
    }

    function deleteProduct(id) {
        if (confirm("Are you sure you want to delete this product?")) {
            farmerProducts = farmerProducts.filter(p => p.id !== id);
            localStorage.setItem("farmerProducts", JSON.stringify(farmerProducts));
            updateDashboardStats();
            displayProducts();
        }
    }

    function editProduct(id) {
        const product = farmerProducts.find(p => p.id === id);
        if (product) {
            const newPrice = prompt("Enter new price (SLL):", product.price);
            const newQuantity = prompt("Enter new quantity:", product.quantity);
            if (newPrice) product.price = parseFloat(newPrice);
            if (newQuantity) product.quantity = parseFloat(newQuantity);
            localStorage.setItem("farmerProducts", JSON.stringify(farmerProducts));
            displayProducts();
            updateDashboardStats();
        }
    }

    // Profile Update
    document.getElementById("profileForm").addEventListener("submit", function(e) {
        e.preventDefault();
        currentFarmer.name = document.getElementById("profileName").value;
        currentFarmer.phone = document.getElementById("profilePhone").value;
        currentFarmer.district = document.getElementById("profileDistrict").value;
        
        localStorage.setItem("currentFarmer", JSON.stringify(currentFarmer));
        document.getElementById("welcomeName").innerText = currentFarmer.name;
        document.getElementById("displayFarmerName").innerText = currentFarmer.name;
        
        alert("✅ Profile updated successfully!");
    });

    // Tab Switching
    document.querySelectorAll(".sidebar-menu a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const tab = link.dataset.tab;
            
            // Update active class
            document.querySelectorAll(".sidebar-menu a").forEach(a => a.classList.remove("active"));
            link.classList.add("active");
            
            // Hide all tabs
            document.querySelectorAll(".tab-content").forEach(content => {
                content.style.display = "none";
            });
            
            // Show selected tab
            document.getElementById(`${tab}Tab`).style.display = "block";
        });
    });

    // Initialize
    loadFarmerData();
