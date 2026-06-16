// Contact Form Submission
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Get values
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const phone = document.getElementById("contactPhone").value.trim();
    const subject = document.getElementById("contactSubject").value;
    const message = document.getElementById("contactMessage").value.trim();
    const sendCopy = document.getElementById("contactCopy").checked;
    
    // Validation
    if (!name || !email || !subject || !message) {
        alert("Please fill in all required fields (*)");
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
    }
    
    // Create message object
    const contactMessage = {
        id: Date.now(),
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
        date: new Date().toLocaleString(),
        status: "Pending"
    };
    
    // Save to localStorage
    let allMessages = JSON.parse(localStorage.getItem("contactMessages") || "[]");
    allMessages.push(contactMessage);
    localStorage.setItem("contactMessages", JSON.stringify(allMessages));
    
    // If send copy, simulate email (in reality would send via backend)
    if (sendCopy) {
        console.log(`Sending copy to ${email}`);
    }
    
    // Show success message
    const successDiv = document.getElementById("formSuccess");
    successDiv.innerHTML = `
        ✅ <strong>Message Sent Successfully!</strong><br>
        Thank you ${name}! We've received your inquiry about "${subject}". 
        Our team will respond within 24-48 hours at ${email}.
    `;
    successDiv.style.display = "block";
    
    // Reset form
    document.getElementById("contactForm").reset();
    
    // Scroll to success message
    successDiv.scrollIntoView({ behavior: "smooth", block: "center" });
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successDiv.style.display = "none";
    }, 5000);
    
    // Store in sessionStorage for tracking
    sessionStorage.setItem("lastContact", name);
});

// FAQ Accordion
document.querySelectorAll(".faq-question").forEach(question => {
    question.addEventListener("click", () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle("active");
        
        // Change arrow direction
        const arrow = question.querySelector("span");
        if (faqItem.classList.contains("active")) {
            arrow.style.transform = "rotate(180deg)";
        } else {
            arrow.style.transform = "rotate(0deg)";
        }
    });
});

// Load saved contact messages count (for admin reference)
function loadMessageStats() {
    const messages = JSON.parse(localStorage.getItem("contactMessages") || "[]");
    console.log(`Total contact messages received: ${messages.length}`);
    
    // Optional: Display unread count if needed
    const unread = messages.filter(m => m.status === "Pending").length;
    if (unread > 0) {
        console.log(`You have ${unread} unread messages`);
    }
}

// Check if user just registered and show welcome message
const lastContact = sessionStorage.getItem("lastContact");
if (lastContact) {
    console.log(`Welcome back, ${lastContact}!`);
}

// Initialize
loadMessageStats();

// Real-time character counter for message
const messageField = document.getElementById("contactMessage");
if (messageField) {
    messageField.addEventListener("input", function() {
        const remaining = 500 - this.value.length;
        if (remaining < 50 && remaining > 0) {
            console.log(`${remaining} characters remaining`);
        }
    });
}

// Interactive phone number formatting
const phoneField = document.getElementById("contactPhone");
if (phoneField) {
    phoneField.addEventListener("input", function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 0 && !value.startsWith('232') && !value.startsWith('0')) {
            if (value.length <= 8) {
                this.value = '0' + value;
            } else if (value.length <= 11) {
                this.value = '+232' + value.slice(-8);
            }
        }
    });
}

// Live validation for email
const emailField = document.getElementById("contactEmail");
if (emailField) {
    emailField.addEventListener("blur", function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value && !emailRegex.test(this.value)) {
            this.style.borderColor = "#e74c3c";
            setTimeout(() => {
                this.style.borderColor = "#e0e4e8";
            }, 2000);
        } else {
            this.style.borderColor = "#27ae60";
            setTimeout(() => {
                this.style.borderColor = "#e0e4e8";
            }, 2000);
        }
    });
}
