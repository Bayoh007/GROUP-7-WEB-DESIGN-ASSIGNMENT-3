    // Load registered users from localStorage
    let registeredUsers = [];

    function loadRegisteredUsers() {
        const stored = localStorage.getItem("saloneBazarFarmers");
        if (stored) {
            registeredUsers = JSON.parse(stored);
        } else {
            // Sample initial data
            registeredUsers = [
                { name: "Mariatu Koroma", district: "Bo", role: "Farmer", date: "2026-06-01" },
                { name: "Alhaji Kamara", district: "Kenema", role: "Vendor/Trader", date: "2026-06-01" },
                { name: "Makeni Women's Coop", district: "Makeni", role: "Cooperative", date: "2026-05-31" }
            ];
            localStorage.setItem("saloneBazarFarmers", JSON.stringify(registeredUsers));
        }
        displayRegisteredUsers();
    }

    function displayRegisteredUsers() {
        const container = document.getElementById("registeredList");
        if (registeredUsers.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--gray);">No registered farmers yet. Be the first!</p>';
            return;
        }
        
        container.innerHTML = registeredUsers.slice(-5).reverse().map(user => `
            <div class="registered-item">
                <strong>${user.name}</strong> - ${user.role}<br>
                <small>📍 ${user.district} | Joined: ${user.date}</small>
            </div>
        `).join("");
    }

    function saveUserToLocalStorage(userData) {
        registeredUsers.push(userData);
        localStorage.setItem("saloneBazarFarmers", JSON.stringify(registeredUsers));
        displayRegisteredUsers();
    }

    // Validation Functions
    function validatePhone(phone) {
        // Sierra Leone phone format: +232XXXXXXXXX or 0XXXXXXXXX
        const phoneRegex = /^(\+232|0)[0-9]{8,9}$/;
        return phoneRegex.test(phone);
    }

    function validateEmail(email) {
        if (email === "") return true; // Email is optional
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Form Submission
    document.getElementById("registrationForm").addEventListener("submit", function(e) {
        e.preventDefault();
        
        // Get values
        const fullName = document.getElementById("fullName").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const district = document.getElementById("district").value;
        const role = document.querySelector('input[name="role"]:checked').value;
        const products = Array.from(document.getElementById("products").selectedOptions).map(opt => opt.value);
        const farmSize = document.getElementById("farmSize").value;
        const additionalInfo = document.getElementById("additionalInfo").value;
        const terms = document.getElementById("terms").checked;
        
        // Reset errors
        document.querySelectorAll(".error-message").forEach(el => el.textContent = "");
        document.querySelectorAll("input, select").forEach(el => el.classList.remove("error"));
        
        let isValid = true;
        
        // Validate Full Name
        if (fullName === "") {
            document.getElementById("nameError").textContent = "Please enter your full name";
            document.getElementById("fullName").classList.add("error");
            isValid = false;
        } else if (fullName.length < 3) {
            document.getElementById("nameError").textContent = "Name must be at least 3 characters";
            document.getElementById("fullName").classList.add("error");
            isValid = false;
        }
        
        // Validate Phone
        if (phone === "") {
            document.getElementById("phoneError").textContent = "Please enter your phone number";
            document.getElementById("phone").classList.add("error");
            isValid = false;
        } else if (!validatePhone(phone)) {
            document.getElementById("phoneError").textContent = "Please enter a valid Sierra Leone number (e.g., +23276123456 or 076123456)";
            document.getElementById("phone").classList.add("error");
            isValid = false;
        }
        
        // Validate Email (if provided)
        if (email !== "" && !validateEmail(email)) {
            document.getElementById("emailError").textContent = "Please enter a valid email address";
            document.getElementById("email").classList.add("error");
            isValid = false;
        }
        
        // Validate District
        if (district === "") {
            document.getElementById("districtError").textContent = "Please select your district";
            document.getElementById("district").classList.add("error");
            isValid = false;
        }
        
        // Validate Products
        if (products.length === 0) {
            document.getElementById("productsError").textContent = "Please select at least one product";
            isValid = false;
        }
        
        // Validate Terms
        if (!terms) {
            document.getElementById("termsError").textContent = "You must agree to the Terms & Conditions";
            isValid = false;
        }
        
        if (isValid) {
            // Create user object
            const newUser = {
                name: fullName,
                phone: phone,
                email: email,
                district: district,
                role: role,
                products: products,
                farmSize: farmSize || "Not specified",
                date: new Date().toLocaleDateString()
            };
            
            // Save to localStorage
            saveUserToLocalStorage(newUser);
            
            // Show success message
            const successDiv = document.getElementById("successMessage");
            successDiv.innerHTML = `
                ✅ <strong>Registration Successful!</strong><br>
                Thank you ${fullName}! You are now registered with SaloneBazar. 
                We will contact you within 24-48 hours via ${phone}. Welcome to the marketplace! 🎉
            `;
            successDiv.style.display = "block";
            
            // Reset form
            document.getElementById("registrationForm").reset();
            
            // Scroll to success message
            successDiv.scrollIntoView({ behavior: "smooth", block: "center" });
            
            // Hide success message after 6 seconds
            setTimeout(() => {
                successDiv.style.display = "none";
            }, 6000);
            
            // Store in sessionStorage for this session (additional JS interaction)
            sessionStorage.setItem("lastRegisteredFarmer", fullName);
            console.log("New farmer registered:", newUser);
        } else {
            // Scroll to first error
            const firstError = document.querySelector(".error-message:not(:empty)");
            if (firstError) {
                firstError.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    });
    
    // Real-time validation for phone
    document.getElementById("phone").addEventListener("input", function() {
        if (this.value !== "" && !validatePhone(this.value)) {
            document.getElementById("phoneError").textContent = "Format: +23276123456 or 076123456";
        } else {
            document.getElementById("phoneError").textContent = "";
        }
    });
    
    // Load registered users on page load
    loadRegisteredUsers();
    
    // Display welcome message if returning user from sessionStorage
    const lastUser = sessionStorage.getItem("lastRegisteredFarmer");
    if (lastUser) {
        console.log(`Welcome back, ${lastUser}!`);
    }
