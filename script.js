// Default Initial Services Requested for Geo Net Cafe
const defaultServices = [
    {
        id: 1,
        title: "E-Stamp Paper Issuance",
        icon: "fa-stamp",
        desc: "Official government E-Stamp papers issued immediately for affidavits, agreements, registry, and legal documentation."
    },
    {
        id: 2,
        title: "Biometric Verification",
        icon: "fa-fingerprint",
        desc: "Fast and accurate NADRA & bank biometric thumb verification services."
    },
    {
        id: 3,
        title: "Duplicate PVC Card Printing",
        icon: "fa-id-card",
        desc: "High-quality, durable duplicate PVC card printing for ID cards, licenses, and official cards."
    },
    {
        id: 4,
        title: "Driving Learner License Apply",
        icon: "fa-car-side",
        desc: "Complete online registration and fee processing for new driving learner permits."
    },
    {
        id: 5,
        title: "New Govt Jobs & Online Schemes",
        icon: "fa-laptop-file",
        desc: "Online application submission for all latest government jobs, PPSC, FPSC, and public welfare schemes."
    },
    {
        id: 6,
        title: "Lahore Board Admissions & Results",
        icon: "fa-graduation-cap",
        desc: "BISE Lahore matric & inter online admission forms submission and instant result card printing."
    },
    {
        id: 7,
        title: "Urgent Passport Size Photos",
        icon: "fa-camera",
        desc: "High-resolution studio passport size photographs printed in minutes with blue or white backgrounds."
    },
    {
        id: 8,
        title: "A4 Size Photo Frames",
        icon: "fa-image",
        desc: "Elegant A4 size frames available for certificates, degrees, portraits, and memorable photos."
    },
    {
        id: 9,
        title: "Custom Number Plates",
        icon: "fa-car",
        desc: "Standard and stylish number plates made to order for bikes, cars, and commercial vehicles."
    },
    {
        id: 10,
        title: "Complete Stationery Store",
        icon: "fa-pen-ruler",
        desc: "All school, college, and office stationery items, files, registers, and forms available."
    }
];

// Default Initial Daily Updates
const defaultUpdates = [
    {
        id: 101,
        title: "Latest Government Jobs Applications Open",
        category: "Govt Jobs",
        date: "Updated Today",
        desc: "Visit Geo Net Cafe with your CNIC, educational certificates, and passport size photos to apply online before the closing date."
    },
    {
        id: 102,
        title: "BISE Lahore Board Admissions & Result Cards",
        category: "Board & Results",
        date: "Active Notice",
        desc: "Online admission forms for Lahore Board and official result card printouts are available at our counter."
    },
    {
        id: 103,
        title: "Instant E-Stamp & Driving Learner Permits",
        category: "Online Scheme",
        date: "Daily Service",
        desc: "Get your E-Stamp papers and online driving learner license registered within minutes without waiting in long queues."
    }
];

// Load from LocalStorage or use Defaults
let services = JSON.parse(localStorage.getItem('geoCafeServices')) || defaultServices;
let updates = JSON.parse(localStorage.getItem('geoCafeUpdates')) || defaultUpdates;

// DOM Elements
const servicesContainer = document.getElementById('servicesContainer');
const updatesContainer = document.getElementById('updatesContainer');
const adminToggleBtn = document.getElementById('adminToggleBtn');
const closeAdminBtn = document.getElementById('closeAdminBtn');
const adminSection = document.getElementById('adminSection');
const addUpdateForm = document.getElementById('addUpdateForm');
const addServiceForm = document.getElementById('addServiceForm');

// Render Daily Updates
function renderUpdates() {
    updatesContainer.innerHTML = '';
    updates.forEach(item => {
        const card = document.createElement('div');
        card.className = 'update-card';
        card.innerHTML = `
            <button class="delete-btn" onclick="deleteUpdate(${item.id})">Delete</button>
            <div class="update-meta">
                <span class="badge">${item.category}</span>
                <span class="update-date"><i class="fa-regular fa-clock"></i> ${item.date}</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
        `;
        updatesContainer.appendChild(card);
    });
}

// Render Shop Services
function renderServices() {
    servicesContainer.innerHTML = '';
    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <button class="delete-btn" onclick="deleteService(${service.id})">Delete</button>
            <div class="service-icon">
                <i class="fa-solid ${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.desc}</p>
        `;
        servicesContainer.appendChild(card);
    });
}

// Toggle Owner Admin Panel (with simple PIN protection: 1234)
adminToggleBtn.addEventListener('click', () => {
    if (adminSection.classList.contains('hidden')) {
        const pin = prompt("Enter Owner PIN to manage updates & services (Default PIN: 1234):");
        if (pin === "1234") {
            adminSection.classList.remove('hidden');
            document.body.classList.add('admin-mode');
        } else if (pin !== null) {
            alert("Incorrect PIN! Please try again.");
        }
    } else {
        adminSection.classList.add('hidden');
        document.body.classList.remove('admin-mode');
    }
});

closeAdminBtn.addEventListener('click', () => {
    adminSection.classList.add('hidden');
    document.body.classList.remove('admin-mode');
});

// Add New Daily Update
addUpdateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('updateTitle').value.trim();
    const category = document.getElementById('updateCategory').value;
    const desc = document.getElementById('updateDesc').value.trim();

    const today = new Date().toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
    });

    const newUpdate = {
        id: Date.now(),
        title: title,
        category: category,
        date: today,
        desc: desc
    };

    updates.unshift(newUpdate); // Add to the top of the list
    localStorage.setItem('geoCafeUpdates', JSON.stringify(updates));
    renderUpdates();
    addUpdateForm.reset();
    alert("New daily update published successfully!");
});

// Add New Service
addServiceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('serviceTitle').value.trim();
    const icon = document.getElementById('serviceIcon').value;
    const desc = document.getElementById('serviceDesc').value.trim();

    const newService = {
        id: Date.now(),
        title: title,
        icon: icon,
        desc: desc
    };

    services.push(newService);
    localStorage.setItem('geoCafeServices', JSON.stringify(services));
    renderServices();
    addServiceForm.reset();
    alert("New service added to Geo Net Cafe!");
});

// Delete Functions for Owner
window.deleteUpdate = function(id) {
    if (confirm("Remove this update?")) {
        updates = updates.filter(u => u.id !== id);
        localStorage.setItem('geoCafeUpdates', JSON.stringify(updates));
        renderUpdates();
    }
};

window.deleteService = function(id) {
    if (confirm("Remove this service?")) {
        services = services.filter(s => s.id !== id);
        localStorage.setItem('geoCafeServices', JSON.stringify(services));
        renderServices();
    }
};

// Initial Load
renderUpdates();
renderServices();