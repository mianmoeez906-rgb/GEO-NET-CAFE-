// Helper for generating update poster banners
function createUpdatePosterGraphic(title, category) {
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340">
        <defs>
            <linearGradient id="upGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#6E1B3E"/>
                <stop offset="100%" stop-color="#9A4C6E"/>
            </linearGradient>
        </defs>
        <rect width="600" height="340" fill="url(#upGrad)"/>
        <rect x="25" y="25" width="550" height="290" rx="12" fill="rgba(199,138,159,0.15)" stroke="#C78A9F" stroke-width="2" stroke-dasharray="6 4"/>
        <text x="300" y="80" font-family="Segoe UI, sans-serif" font-size="16" font-weight="bold" fill="#C78A9F" text-anchor="middle">★ GEO NET CAFE OFFICIAL UPDATE ★</text>
        <text x="300" y="150" font-family="Segoe UI, sans-serif" font-size="26" font-weight="bold" fill="#FFFFFF" text-anchor="middle">${title.toUpperCase()}</text>
        <text x="300" y="200" font-family="Segoe UI, sans-serif" font-size="16" fill="#F3E5E0" text-anchor="middle">Category: ${category}</text>
        <text x="300" y="260" font-family="Segoe UI, sans-serif" font-size="14" fill="#C78A9F" text-anchor="middle">Visit shop or click WhatsApp to apply online!</text>
    </svg>`;
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

function createServiceGraphic(label, sublabel) {
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340">
        <defs>
            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#6E1B3E"/>
                <stop offset="100%" stop-color="#9A4C6E"/>
            </linearGradient>
        </defs>
        <rect width="600" height="340" fill="url(#g)"/>
        <rect x="35" y="35" width="530" height="270" rx="14" fill="rgba(199,138,159,0.1)" stroke="#C78A9F" stroke-width="2" stroke-dasharray="8 6"/>
        <text x="300" y="150" font-family="Segoe UI, sans-serif" font-size="28" font-weight="bold" fill="#C78A9F" text-anchor="middle">${label}</text>
        <text x="300" y="195" font-family="Segoe UI, sans-serif" font-size="16" fill="#F3E5E0" text-anchor="middle">${sublabel}</text>
    </svg>`;
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

// Default Complete Services
const defaultServices = [
    { id: 1, title: "E-Stamp Paper Issuance", icon: "fa-stamp", image: createServiceGraphic("GOVT E-STAMP PAPER", "Official Stamp Papers Issued Instantly"), desc: "Official government E-Stamp papers issued immediately for affidavits, agreements, registry, and legal documentation." },
    { id: 2, title: "Biometric Verification", icon: "fa-fingerprint", image: createServiceGraphic("BIOMETRIC VERIFICATION", "NADRA & Banking Thumb Scan Service"), desc: "Fast and accurate NADRA, SIM, and bank biometric thumb verification services." },
    { id: 3, title: "Duplicate PVC Card Printing", icon: "fa-id-card", image: createServiceGraphic("DUPLICATE PVC CARD", "High-Durability Smart ID & License Card"), desc: "High-quality, waterproof duplicate PVC card printing for ID cards, driving licenses, and official cards." },
    { id: 4, title: "Driving Learner License Apply", icon: "fa-car-side", image: createServiceGraphic("LEARNER PERMIT APPLY", "Online Driving License Registration"), desc: "Complete online registration and fee processing for new bike & car driving learner permits." },
    { id: 5, title: "New Govt Jobs & Schemes", icon: "fa-laptop-file", image: createServiceGraphic("GOVT JOBS & SCHEMES", "PPSC • FPSC • Punjab Welfare Portals"), desc: "Online application submission for all latest government jobs and public welfare schemes." },
    { id: 6, title: "Lahore Board Admissions & Results", icon: "fa-graduation-cap", image: createServiceGraphic("BISE LAHORE BOARD", "Online Admission Forms & Result Cards"), desc: "Lahore Board matric & intermediate online admission forms submission and instant result card printing." },
    { id: 7, title: "Urgent Passport Size Photos", icon: "fa-camera", image: createServiceGraphic("PASSPORT SIZE PHOTOS", "Blue & White Background Studio Print"), desc: "High-resolution studio passport size photographs printed in minutes for visas, jobs, and admissions." },
    { id: 8, title: "A4 Size Photo Frames", icon: "fa-image", image: createServiceGraphic("A4 SIZE WALL FRAMES", "Certificate, Degree & Portrait Framing"), desc: "Elegant A4 size frames available for certificates, degrees, portraits, and memorable photos." },
    { id: 9, title: "Custom Number Plates", icon: "fa-car", image: createServiceGraphic("VEHICLE NUMBER PLATES", "Bike & Car Embossed / Stylish Plates"), desc: "Standard and stylish number plates made to order for motorcycles, cars, and commercial vehicles." },
    { id: 10, title: "Complete Stationery Store", icon: "fa-pen-ruler", image: createServiceGraphic("OFFICE & SCHOOL STATIONERY", "Files, Registers, Pens & Forms"), desc: "All school, college, and office stationery items, files, registers, and application forms available." }
];

// Default Initial Updates
const defaultUpdates = [
    {
        id: 101,
        title: "Latest Government Jobs Applications Open",
        category: "Govt Jobs",
        date: "Updated Today",
        image: createUpdatePosterGraphic("Latest Government Jobs Open", "Govt Jobs"),
        desc: "Visit Geo Net Cafe with your CNIC, educational certificates, and passport size photos to apply online before the closing date."
    },
    {
        id: 102,
        title: "BISE Lahore Board Admissions & Result Cards",
        category: "Board & Results",
        date: "Active Notice",
        image: createUpdatePosterGraphic("Lahore Board Admissions", "Board & Results"),
        desc: "Online admission forms for Lahore Board and official result card printouts are available at our counter."
    },
    {
        id: 103,
        title: "Instant E-Stamp & Driving Learner Permits",
        category: "Online Scheme",
        date: "Daily Service",
        image: createUpdatePosterGraphic("Instant E-Stamp & Learner Permit", "Online Scheme"),
        desc: "Get your E-Stamp papers and online driving learner license registered within minutes without waiting in long queues."
    }
];

// LocalStorage
let services = JSON.parse(localStorage.getItem('geoCafeServicesV5')) || defaultServices;
let updates = JSON.parse(localStorage.getItem('geoCafeUpdatesV5')) || defaultUpdates;

const adminSection = document.getElementById('adminSection');
const servicesContainer = document.getElementById('servicesContainer');
const updatesContainer = document.getElementById('updatesContainer');
const closeAdminBtn = document.getElementById('closeAdminBtn');

// Render Updates
function renderUpdates() {
    updatesContainer.innerHTML = '';
    updates.forEach(item => {
        const posterImg = item.image || createUpdatePosterGraphic(item.title, item.category);
        const card = document.createElement('div');
        card.className = 'update-card';
        card.innerHTML = `
            <button class="delete-btn" onclick="deleteUpdate(${item.id})">Delete</button>
            <div class="update-poster-wrapper">
                <img src="${posterImg}" alt="${item.title} Poster">
            </div>
            <div class="update-body">
                <div class="update-meta">
                    <span class="badge">${item.category}</span>
                    <span class="update-date"><i class="fa-regular fa-clock"></i> ${item.date}</span>
                </div>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
                <a href="https://wa.me/923144409322?text=Hi%20Muhammad%20Nadeem,%20I%20want%20to%20apply%20for:%20${encodeURIComponent(item.title)}" target="_blank" class="btn-update-action">
                    <i class="fa-brands fa-whatsapp"></i> Apply via WhatsApp
                </a>
            </div>
        `;
        updatesContainer.appendChild(card);
    });
}

// Render Services
function renderServices() {
    servicesContainer.innerHTML = '';
    services.forEach(service => {
        const imgSrc = service.image || createServiceGraphic(service.title.toUpperCase(), "Geo Net Cafe Service Sample");
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <button class="delete-btn" onclick="deleteService(${service.id})">Delete</button>
            <div class="service-img-wrapper">
                <img src="${imgSrc}" alt="${service.title} Sample">
                <span class="sample-tag">Sample Preview</span>
            </div>
            <div class="service-icon-badge">
                <i class="fa-solid ${service.icon}"></i>
            </div>
            <div class="service-body">
                <h3>${service.title}</h3>
                <p>${service.desc}</p>
            </div>
        `;
        servicesContainer.appendChild(card);
    });
}

// -----------------------------------------------------------------
// SECRET ADMIN PANEL ACCESS & PASSWORD CONFIGURATION GUIDE
// -----------------------------------------------------------------
// PASSWORD KAHAN CHANGE HOTA HAI?
// Neeche line mein `"nadeem2026"` likha hai. Isko hata kar apna marzi ka 
// secret password likh lein (misal ke tor par `"nadeem@123"`).
const OWNER_PASSWORD = "nadeem2026"; 
// -----------------------------------------------------------------

function openSecretAdmin() {
    if (adminSection.classList.contains('hidden')) {
        const pin = prompt("Enter Owner Secret Password:");
        if (pin === Pakistan@1122) {
            adminSection.classList.remove('hidden');
            document.body.classList.add('admin-mode');
            adminSection.scrollIntoView({ behavior: 'smooth' });
        } else if (pin !== null) {
            alert("Incorrect Password!");
        }
    } else {
        adminSection.classList.add('hidden');
        document.body.classList.remove('admin-mode');
    }
}

// Tareeqa 1: Website ke header mein "GEO NET CAFE" logo par lagatar 3 baar click karne se khule ga
let logoClicks = 0;
let clickTimer;
const logoElement = document.querySelector('.logo');
if (logoElement) {
    logoElement.addEventListener('click', () => {
        logoClicks++;
        clearTimeout(clickTimer);
        if (logoClicks === 3) {
            openSecretAdmin();
            logoClicks = 0;
        }
        clickTimer = setTimeout(() => { logoClicks = 0; }, 800);
    });
}

// Tareeqa 2: Keyboard par Ctrl + Shift + A dabane se bhi khule ga
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        openSecretAdmin();
    }
});

closeAdminBtn.addEventListener('click', () => {
    adminSection.classList.add('hidden');
    document.body.classList.remove('admin-mode');
});

// Add Update Form
document.getElementById('addUpdateForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('updateTitle').value.trim();
    const category = document.getElementById('updateCategory').value;
    const customImage = document.getElementById('updateImage').value.trim();
    const desc = document.getElementById('updateDesc').value.trim();
    const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    const image = customImage || createUpdatePosterGraphic(title, category);

    updates.unshift({ id: Date.now(), title, category, date: today, image, desc });
    localStorage.setItem('geoCafeUpdatesV5', JSON.stringify(updates));
    renderUpdates();
    e.target.reset();
    alert("New job/update poster published successfully!");
});

// Add Service Form
document.getElementById('addServiceForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('serviceTitle').value.trim();
    const customImage = document.getElementById('serviceImage').value.trim();
    const icon = document.getElementById('serviceIcon').value;
    const desc = document.getElementById('serviceDesc').value.trim();

    const image = customImage || createServiceGraphic(title.toUpperCase(), "Geo Net Cafe Service Sample");

    services.push({ id: Date.now(), title, icon, image, desc });
    localStorage.setItem('geoCafeServicesV5', JSON.stringify(services));
    renderServices();
    e.target.reset();
    alert("New service added successfully!");
});

window.deleteUpdate = function(id) {
    if (confirm("Delete this update poster?")) {
        updates = updates.filter(u => u.id !== id);
        localStorage.setItem('geoCafeUpdatesV5', JSON.stringify(updates));
        renderUpdates();
    }
};

window.deleteService = function(id) {
    if (confirm("Delete this service?")) {
        services = services.filter(s => s.id !== id);
        localStorage.setItem('geoCafeServicesV5', JSON.stringify(services));
        renderServices();
    }
};

// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));

// Initialize
renderUpdates();
renderServices();
