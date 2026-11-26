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

// All 10 Core Services explicitly enforced
const defaultServices = [
    { id: 1, title: "Official E-Stamp Papers", icon: "fa-stamp", image: "images.jfif", desc: "Official government E-Stamp papers issued immediately for affidavits, agreements, registry, and legal documentation." },
    { id: 2, title: "Biometric Verification", icon: "fa-fingerprint", image: "images (2).jfif", desc: "Fast and accurate NADRA, SIM, and bank biometric thumb verification services." },
    { id: 3, title: "Duplicate PVC Card Printing", icon: "fa-id-card", image: "images (3).jfif", desc: "High-quality, waterproof duplicate PVC card printing for ID cards, driving licenses, and official cards." },
    { id: 4, title: "Driving Learner License Apply", icon: "fa-car-side", image: "images (1).jfif", desc: "Complete online registration and fee processing for new bike & car driving learner permits." },
    { id: 5, title: "New Govt Jobs & Schemes", icon: "fa-laptop-file", image: "images (4).jfif", desc: "Online application submission for all latest government jobs and public welfare schemes." },
    { id: 6, title: "Lahore Board Admissions & Results", icon: "fa-graduation-cap", image: "images (8).jfif", desc: "Lahore Board matric & intermediate online admission forms submission and instant result card printing." },
    { id: 7, title: "Urgent Passport Size Photos", icon: "fa-camera", image: "images (5).jfif", desc: "High-resolution studio passport size photographs printed in minutes for visas, jobs, and admissions." },
    { id: 8, title: "A4 Size Photo Frames", icon: "fa-image", image: "download.jfif", desc: "Elegant A4 size frames available for certificates, degrees, portraits, and memorable photos." },
    { id: 9, title: "Custom Number Plates", icon: "fa-car", image: "images (6).jfif", desc: "Standard and stylish number plates made to order for motorcycles, cars, and commercial vehicles." },
    { id: 10, title: "Complete Stationery Store", icon: "fa-pen-ruler", image: "images (7).jfif", desc: "All school, college, and office stationery items, files, registers, and application forms available." }
];

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

// Always load default services + any newly added ones from admin
let customServices = JSON.parse(localStorage.getItem('geoCafeCustomServicesV13')) || [];
let services = [...defaultServices, ...customServices];

let storedUpdates = JSON.parse(localStorage.getItem('geoCafeUpdatesV13'));
let updates = (storedUpdates && storedUpdates.length > 0) ? storedUpdates : defaultUpdates;

const adminSection = document.getElementById('adminSection');
const servicesContainer = document.getElementById('servicesContainer');
const updatesContainer = document.getElementById('updatesContainer');

function renderUpdates() {
    if (!updatesContainer) return;
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

function renderServices() {
    if (!servicesContainer) return;
    servicesContainer.innerHTML = '';
    services.forEach(service => {
        const imgSrc = service.image || createServiceGraphic(service.title.toUpperCase(), "Geo Net Cafe Service Sample");
        const card = document.createElement('div');
        card.className = 'service-card';
        // Only custom services can be deleted, default 10 remain permanent
        const deleteBtnHtml = service.isCustom ? `<button class="delete-btn" onclick="deleteService(${service.id})">Delete</button>` : '';
        card.innerHTML = `
            ${deleteBtnHtml}
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
// PASSWORD CONFIGURATION
// -----------------------------------------------------------------
const OWNER_PASSWORD = "Pakistan@1122"; 
// -----------------------------------------------------------------

function openSecretAdmin() {
    if (adminSection) {
        if (adminSection.classList.contains('hidden')) {
            const pin = prompt("Enter Owner Secret Password:");
            if (pin === OWNER_PASSWORD) {
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
}

const adminLoginBtn = document.getElementById('adminLoginBtn');
if (adminLoginBtn) {
    adminLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openSecretAdmin();
    });
}

const closeAdminBtn = document.getElementById('closeAdminBtn');
if(closeAdminBtn) {
    closeAdminBtn.addEventListener('click', () => {
        adminSection.classList.add('hidden');
        document.body.classList.remove('admin-mode');
    });
}

// Read an uploaded image as a data URL so it can be saved with the item.
function readImageFile(file) {
    return new Promise((resolve, reject) => {
        if (!file) return resolve('');
        if (!file.type.startsWith('image/')) return reject(new Error('Please select an image file.'));
        if (file.size > 2 * 1024 * 1024) return reject(new Error('Please choose an image smaller than 2 MB.'));
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Could not read the selected image.'));
        reader.readAsDataURL(file);
    });
}

function connectImagePreview(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    if (!input || !preview) return;
    input.addEventListener('change', () => {
        const file = input.files && input.files[0];
        if (!file) { preview.hidden = true; preview.removeAttribute('src'); return; }
        if (!file.type.startsWith('image/')) { alert('Please select an image file.'); input.value = ''; return; }
        const reader = new FileReader();
        reader.onload = () => { preview.src = reader.result; preview.hidden = false; };
        reader.readAsDataURL(file);
    });
}

connectImagePreview('serviceImageFile', 'serviceImagePreview');
connectImagePreview('updateImageFile', 'updateImagePreview');

const addUpdateForm = document.getElementById('addUpdateForm');
if (addUpdateForm) {
    addUpdateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('updateTitle').value.trim();
        const category = document.getElementById('updateCategory').value;
        const imageUrl = document.getElementById('updateImage').value.trim();
        const imageFile = document.getElementById('updateImageFile').files[0];
        const desc = document.getElementById('updateDesc').value.trim();
        const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        try {
            const uploadedImage = await readImageFile(imageFile);
            const image = uploadedImage || imageUrl || createUpdatePosterGraphic(title, category);
            updates.unshift({ id: Date.now(), title, category, date: today, image, desc });
            localStorage.setItem('geoCafeUpdatesV13', JSON.stringify(updates));
            renderUpdates();
            e.target.reset();
            document.getElementById('updateImagePreview').hidden = true;
            alert('New job/update poster published successfully!');
        } catch (error) { alert(error.message || 'Image upload failed.'); }
    });
}

const addServiceForm = document.getElementById('addServiceForm');
if (addServiceForm) {
    addServiceForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('serviceTitle').value.trim();
        const imageUrl = document.getElementById('serviceImage').value.trim();
        const imageFile = document.getElementById('serviceImageFile').files[0];
        const icon = document.getElementById('serviceIcon').value;
        const desc = document.getElementById('serviceDesc').value.trim();
        try {
            const uploadedImage = await readImageFile(imageFile);
            const image = uploadedImage || imageUrl || createServiceGraphic(title.toUpperCase(), 'Geo Net Cafe Service Sample');
            const newService = { id: Date.now(), title, icon, image, desc, isCustom: true };
            customServices.push(newService);
            services.push(newService);
            localStorage.setItem('geoCafeCustomServicesV13', JSON.stringify(customServices));
            renderServices();
            e.target.reset();
            document.getElementById('serviceImagePreview').hidden = true;
            alert('New service added successfully!');
        } catch (error) { alert(error.message || 'Image upload failed.'); }
    });
}

window.deleteUpdate = function(id) {
    if (confirm("Delete this update poster?")) {
        updates = updates.filter(u => u.id !== id);
        localStorage.setItem('geoCafeUpdatesV13', JSON.stringify(updates));
        renderUpdates();
    }
};

window.deleteService = function(id) {
    if (confirm("Delete this custom service?")) {
        customServices = customServices.filter(s => s.id !== id);
        services = [...defaultServices, ...customServices];
        localStorage.setItem('geoCafeCustomServicesV13', JSON.stringify(customServices));
        renderServices();
    }
};

// Initial Render on Load
renderUpdates();
renderServices();
