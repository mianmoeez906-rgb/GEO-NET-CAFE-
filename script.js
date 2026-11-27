// Easy-to-change default name & number (can also be updated live from Owner Panel)
const DEFAULT_INFO_CONTACT_NAME = "Mr. Baloch";
const DEFAULT_INFO_CONTACT_PHONE = "0301-7625888";

function escapeXml(str = "") {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function hashSeed(text = "") {
    let h = 2166136261;
    for (let i = 0; i < text.length; i++) {
        h ^= text.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return Math.abs(h);
}

// AI-style layered vector graphic generator for posters & service previews
function createAIArtImage(title, subtitle, tagText = "AI STUDIO PREVIEW") {
    const seed = hashSeed(`${title}|${subtitle}`);
    const palettes = [
        { c1: "#4A1129", c2: "#8F3B60", c3: "#0F766E", accent: "#6EE7B7", soft: "#F3E5E0" },
        { c1: "#0F5132", c2: "#0D9488", c3: "#6E1B3E", accent: "#FDE68A", soft: "#ECFDF5" },
        { c1: "#581C35", c2: "#9A4C6E", c3: "#059669", accent: "#A7F3D0", soft: "#FDF2F8" },
        { c1: "#115E59", c2: "#0F766E", c3: "#831843", accent: "#FBCFE8", soft: "#F0FDFA" }
    ];
    const pal = palettes[seed % palettes.length];
    const cx1 = 95 + (seed % 110);
    const cy1 = 75 + ((seed >> 3) % 70);
    const cx2 = 430 + ((seed >> 5) % 110);
    const cy2 = 210 + ((seed >> 7) % 75);
    const r1 = 58 + (seed % 34);
    const r2 = 68 + ((seed >> 4) % 38);

    const safeTitle = escapeXml(title.toUpperCase());
    const safeSub = escapeXml(subtitle);
    const safeTag = escapeXml(tagText);

    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340">
        <defs>
            <linearGradient id="aiBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${pal.c1}"/>
                <stop offset="55%" stop-color="${pal.c2}"/>
                <stop offset="100%" stop-color="${pal.c3}"/>
            </linearGradient>
            <radialGradient id="aiOrb1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="${pal.accent}" stop-opacity="0.45"/>
                <stop offset="100%" stop-color="${pal.accent}" stop-opacity="0"/>
            </radialGradient>
            <pattern id="aiGrid" width="28" height="28" patternUnits="userSpaceOnUse">
                <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#FFFFFF" stroke-opacity="0.06" stroke-width="1"/>
            </pattern>
        </defs>
        <rect width="600" height="340" fill="url(#aiBg)"/>
        <rect width="600" height="340" fill="url(#aiGrid)"/>
        <circle cx="${cx1}" cy="${cy1}" r="${r1 + 45}" fill="url(#aiOrb1)"/>
        <circle cx="${cx1}" cy="${cy1}" r="${r1}" fill="none" stroke="${pal.accent}" stroke-opacity="0.35" stroke-width="2"/>
        <polygon points="${cx2},${cy2 - r2} ${cx2 + r2 * 0.9},${cy2} ${cx2},${cy2 + r2} ${cx2 - r2 * 0.9},${cy2}" fill="none" stroke="${pal.soft}" stroke-opacity="0.25" stroke-width="2"/>
        <rect x="28" y="24" width="544" height="292" rx="16" fill="rgba(17, 12, 18, 0.28)" stroke="${pal.accent}" stroke-opacity="0.45" stroke-width="1.5"/>
        <rect x="200" y="46" width="200" height="26" rx="13" fill="rgba(0,0,0,0.35)" stroke="${pal.accent}" stroke-opacity="0.6" stroke-width="1"/>
        <text x="300" y="64" font-family="Segoe UI, sans-serif" font-size="11" font-weight="bold" letter-spacing="1.2" fill="${pal.accent}" text-anchor="middle">${safeTag}</text>
        <text x="300" y="146" font-family="Segoe UI, sans-serif" font-size="25" font-weight="bold" fill="#FFFFFF" text-anchor="middle">${safeTitle}</text>
        <line x1="175" y1="170" x2="425" y2="170" stroke="${pal.accent}" stroke-opacity="0.55" stroke-width="2"/>
        <text x="300" y="208" font-family="Segoe UI, sans-serif" font-size="15" fill="${pal.soft}" text-anchor="middle">${safeSub}</text>
        <text x="300" y="274" font-family="Segoe UI, sans-serif" font-size="13" font-weight="bold" fill="${pal.accent}" text-anchor="middle">GEO NET CAFE • NADEEM ASGHAR</text>
    </svg>`;
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

function createUpdatePosterGraphic(title, category) {
    return createAIArtImage(title, `Category: ${category} • Apply via WhatsApp`, "AI UPDATE POSTER");
}

function createServiceGraphic(label, sublabel) {
    return createAIArtImage(label, sublabel, "AI SERVICE VISUAL");
}

// Updated Core Services (V16)
const defaultServices = [
    {
        id: 1,
        title: "Official E-Stamp Papers",
        icon: "fa-stamp",
        image: "WhatsApp Image 2026-11-26 at 3.19.33 PM_2.jpeg",
        desc: "Official E-Stamp papers available in Rs. 100 / 200 / 300 / 500 / 1000 / 1200 / 2000 / 3000 denominations for affidavits, agreements, and legal documentation."
    },
    {
        id: 2,
        title: "NADRA & PakID Services",
        icon: "fa-id-card",
        image: "images (3).jfif",
        desc: "New CNIC Application, CNIC Renewal, CNIC Modification, CNIC Reprint, FRC (Family Registration), NICOP / POC Services, PakID Online Application & PakID Tracking."
    },
    {
        id: 3,
        title: "Vehicle Services & Biometric",
        icon: "fa-fingerprint",
        image: "images (2).jfif",
        desc: "Vehicle Transfer, Vehicle Registration, Token Tax Assistance, Vehicle Verification, and General / Online Biometric Verification."
    },
    {
        id: 4,
        title: "Printing, Typing & CV Services",
        icon: "fa-print",
        image: "images (8).jfif",
        desc: "Scanning, Lamination, Color Print, B&W Print, PDF Making, Editing, PDF to JPG & Other Services, Document Typing, and <span class='highlighted-pill'>CV Printing</span>."
    },
    {
        id: 5,
        title: "Online Govt Jobs & Schemes",
        icon: "fa-laptop-file",
        image: "images (4).jfif",
        desc: "Scholarship Online Forms, Govt Job Apply, and Govt Welfare Schemes Online Application."
    },
    {
        id: 6,
        title: "Education & Testing Services",
        icon: "fa-graduation-cap",
        image: "Lahore Board Admissions Poster.png",
        desc: "University Admissions, Scholarship Applications, NTS, PTS, OTS, AIOU Admissions / Results / Registration / Roll No Slip, College Admissions, LAT Registration & Other Services."
    },
    {
        id: 7,
        title: "Photo Studio Services",
        icon: "fa-camera",
        image: "images (5).jfif",
        desc: "Urgent Passport Size Pictures, Visa Photos, White & Blue Background Images, Photo Retouching, <span class='highlighted-pill'>35x45mm Visa Photos</span>, and HD Photo Enhancing."
    },
    {
        id: 8,
        title: "A4 Size Photo Frames",
        icon: "fa-image",
        image: "0001.jfif",
        desc: "Elegant A4 size frames available for certificates, degrees, portraits, and memorable photos."
    },
    {
        id: 9,
        title: "Custom Number Plates",
        icon: "fa-car",
        image: "images (6).jfif",
        desc: "Standard and stylish number plates made to order for motorcycles, cars, and commercial vehicles."
    },
    {
        id: 10,
        title: "Driving Learner License Apply",
        icon: "fa-car-side",
        image: "images (1).jfif",
        desc: "Complete online registration and fee processing for new bike & car driving learner permits."
    },
    {
        id: 11,
        title: "Complete Stationery Store",
        icon: "fa-pen-ruler",
        image: "images (7).jfif",
        desc: "All school, college, and office stationery items, files, registers, and application forms available."
    }
];

const defaultUpdates = [
    {
        id: 101,
        title: "Latest Government Jobs & Scholarship Forms Open",
        category: "Govt Jobs",
        date: "Updated Today",
        image: "images (4).jfif",
        desc: "Visit Geo Net Cafe with your CNIC, educational certificates, and passport size photos to apply online for jobs, scholarships, and govt schemes."
    },
    {
        id: 102,
        title: "BISE Lahore Board, Admissions & Testing Services",
        category: "Board & Results",
        date: "Active Notice",
        image: "Lahore Board Admissions Poster.png",
        desc: "Board admissions, university & college admissions, AIOU, NTS / PTS / OTS, LAT registration, and result card printouts available at our counter."
    },
    {
        id: 103,
        title: "E-Stamp (100–3000), NADRA / PakID & Vehicle Services",
        category: "Online Scheme",
        date: "Daily Service",
        image: createUpdatePosterGraphic("E-Stamp, NADRA / PakID & Vehicle Services", "Online Scheme"),
        desc: "Get E-Stamp papers (100 to 3000), NADRA/PakID applications, biometric & vehicle transfer/token tax assistance under one roof."
    }
];

// Contact state (can be changed easily from Owner Admin Panel)
let infoContact = JSON.parse(localStorage.getItem('geoCafeInfoContactV16')) || {
    name: DEFAULT_INFO_CONTACT_NAME,
    phone: DEFAULT_INFO_CONTACT_PHONE
};

function sanitizeWaNumber(phone) {
    const digits = String(phone || "").replace(/\D/g, "");
    if (!digits) return "923017625888";
    if (digits.startsWith("0")) return "92" + digits.slice(1);
    return digits;
}

function getWhatsappLink(customText = "") {
    const waNum = sanitizeWaNumber(infoContact.phone);
    if (!customText) return `https://wa.me/${waNum}`;
    return `https://wa.me/${waNum}?text=${encodeURIComponent(customText)}`;
}

function applyContactInfo() {
    const displayName = document.getElementById('displayInfoName');
    const displayPhone = document.getElementById('displayInfoPhone');
    const footerName = document.getElementById('footerInfoName');
    const footerPhone = document.getElementById('footerInfoPhone');
    const infoWhatsappBtn = document.getElementById('infoWhatsappBtn');
    const footerWhatsappLink = document.getElementById('footerWhatsappLink');

    if (displayName) displayName.textContent = infoContact.name;
    if (displayPhone) displayPhone.textContent = infoContact.phone;
    if (footerName) footerName.textContent = infoContact.name;
    if (footerPhone) footerPhone.textContent = infoContact.phone;

    const waUrl = getWhatsappLink();
    if (infoWhatsappBtn) {
        infoWhatsappBtn.href = waUrl;
        infoWhatsappBtn.innerHTML = `<i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp (${infoContact.phone})`;
    }
    if (footerWhatsappLink) {
        footerWhatsappLink.href = waUrl;
    }

    const nameInput = document.getElementById('infoContactNameInput');
    const phoneInput = document.getElementById('infoContactPhoneInput');
    if (nameInput) nameInput.value = infoContact.name;
    if (phoneInput) phoneInput.value = infoContact.phone;
}

// Always load default services + any newly added ones from admin
let customServices = JSON.parse(localStorage.getItem('geoCafeCustomServicesV16')) || [];
let services = [...defaultServices, ...customServices];

let storedUpdates = JSON.parse(localStorage.getItem('geoCafeUpdatesV16'));
let updates = (storedUpdates && storedUpdates.length > 0) ? storedUpdates : defaultUpdates;

const adminSection = document.getElementById('adminSection');
const servicesContainer = document.getElementById('servicesContainer');
const updatesContainer = document.getElementById('updatesContainer');

function renderUpdates() {
    if (!updatesContainer) return;
    updatesContainer.innerHTML = '';
    updates.forEach(item => {
        const fallbackImg = createUpdatePosterGraphic(item.title, item.category);
        const posterImg = item.image || fallbackImg;
        const card = document.createElement('div');
        card.className = 'update-card reactive-card';
        card.innerHTML = `
            <button class="delete-btn" onclick="deleteUpdate(${item.id})">Delete</button>
            <div class="update-poster-wrapper">
                <img src="${posterImg}" alt="${item.title} Poster" onerror="this.onerror=null;this.src='${fallbackImg}';">
            </div>
            <div class="update-body">
                <div class="update-meta">
                    <span class="badge">${item.category}</span>
                    <span class="update-date"><i class="fa-regular fa-clock"></i> ${item.date}</span>
                </div>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
                <a href="${getWhatsappLink(`Hi Nadeem Asghar / ${infoContact.name}, I want to apply for: ${item.title}`)}" target="_blank" class="btn-update-action reactive-tab">
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
        const fallbackImg = createServiceGraphic(service.title.toUpperCase(), "Geo Net Cafe • AI Service Visual");
        const imgSrc = service.image || fallbackImg;
        const card = document.createElement('div');
        card.className = 'service-card reactive-card';
        const deleteBtnHtml = service.isCustom ? `<button class="delete-btn" onclick="deleteService(${service.id})">Delete</button>` : '';
        card.innerHTML = `
            ${deleteBtnHtml}
            <div class="service-img-wrapper">
                <img src="${imgSrc}" alt="${service.title} Sample" onerror="this.onerror=null;this.src='${fallbackImg}';">
                <span class="sample-tag">AI & Sample Preview</span>
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

function deleteUpdate(id) {
    updates = updates.filter(u => u.id !== id);
    localStorage.setItem('geoCafeUpdatesV16', JSON.stringify(updates));
    renderUpdates();
}

function deleteService(id) {
    customServices = customServices.filter(s => s.id !== id);
    localStorage.setItem('geoCafeCustomServicesV16', JSON.stringify(customServices));
    services = [...defaultServices, ...customServices];
    renderServices();
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
if (closeAdminBtn) {
    closeAdminBtn.addEventListener('click', () => {
        adminSection.classList.add('hidden');
        document.body.classList.remove('admin-mode');
    });
}

// Image file preview helpers
function bindFilePreview(fileInputId, previewImgId) {
    const fileInput = document.getElementById(fileInputId);
    const previewImg = document.getElementById(previewImgId);
    if (!fileInput || !previewImg) return;

    fileInput.addEventListener('change', () => {
        const file = fileInput.files && fileInput.files[0];
        if (!file) {
            previewImg.hidden = true;
            previewImg.src = "";
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            previewImg.src = reader.result;
            previewImg.hidden = false;
        };
        reader.readAsDataURL(file);
    });
}

bindFilePreview('updateImageFile', 'updateImagePreview');
bindFilePreview('serviceImageFile', 'serviceImagePreview');

// Add Daily Update Form
const addUpdateForm = document.getElementById('addUpdateForm');
if (addUpdateForm) {
    addUpdateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('updateTitle').value.trim();
        const category = document.getElementById('updateCategory').value;
        const urlVal = document.getElementById('updateImage').value.trim();
        const fileInput = document.getElementById('updateImageFile');
        const desc = document.getElementById('updateDesc').value.trim();

        const saveUpdate = (imgSource) => {
            const newUpdate = {
                id: Date.now(),
                title,
                category,
                date: "Just Now",
                image: imgSource || createUpdatePosterGraphic(title, category),
                desc
            };
            updates.unshift(newUpdate);
            localStorage.setItem('geoCafeUpdatesV16', JSON.stringify(updates));
            renderUpdates();
            addUpdateForm.reset();
            const preview = document.getElementById('updateImagePreview');
            if (preview) preview.hidden = true;
        };

        if (fileInput && fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = () => saveUpdate(reader.result);
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            saveUpdate(urlVal);
        }
    });
}

// Add Service Form
const addServiceForm = document.getElementById('addServiceForm');
if (addServiceForm) {
    addServiceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('serviceTitle').value.trim();
        const urlVal = document.getElementById('serviceImage').value.trim();
        const fileInput = document.getElementById('serviceImageFile');
        const icon = document.getElementById('serviceIcon').value;
        const desc = document.getElementById('serviceDesc').value.trim();

        const saveService = (imgSource) => {
            const newService = {
                id: Date.now(),
                title,
                icon,
                image: imgSource || createServiceGraphic(title.toUpperCase(), "Geo Net Cafe • AI Service Visual"),
                desc,
                isCustom: true
            };
            customServices.push(newService);
            localStorage.setItem('geoCafeCustomServicesV16', JSON.stringify(customServices));
            services = [...defaultServices, ...customServices];
            renderServices();
            addServiceForm.reset();
            const preview = document.getElementById('serviceImagePreview');
            if (preview) preview.hidden = true;
        };

        if (fileInput && fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = () => saveService(reader.result);
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            saveService(urlVal);
        }
    });
}

// Save Info Contact Form (Mr. Baloch / 0301-7625888)
const contactSettingsForm = document.getElementById('contactSettingsForm');
if (contactSettingsForm) {
    contactSettingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newName = document.getElementById('infoContactNameInput').value.trim() || DEFAULT_INFO_CONTACT_NAME;
        const newPhone = document.getElementById('infoContactPhoneInput').value.trim() || DEFAULT_INFO_CONTACT_PHONE;
        infoContact = { name: newName, phone: newPhone };
        localStorage.setItem('geoCafeInfoContactV16', JSON.stringify(infoContact));
        applyContactInfo();
        renderUpdates();
        alert("Information contact updated!");
    });
}

// Mouse-movement Hive color shift + subtle 3D card tilt
function initMouseHiveEffects() {
    const aura = document.getElementById('mouseAura');

    document.addEventListener('mousemove', (e) => {
        if (aura) {
            aura.style.left = `${e.clientX}px`;
            aura.style.top = `${e.clientY}px`;
        }

        const surface = e.target.closest('.reactive-surface');
        if (surface) {
            const rect = surface.getBoundingClientRect();
            const xPct = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 100;
            const yPct = ((e.clientY - rect.top) / Math.max(rect.height, 1)) * 100;
            surface.style.setProperty('--mx', `${xPct.toFixed(1)}%`);
            surface.style.setProperty('--my', `${yPct.toFixed(1)}%`);
        }

        const card = e.target.closest('.reactive-card');
        if (card) {
            const cRect = card.getBoundingClientRect();
            const normX = ((e.clientX - cRect.left) / Math.max(cRect.width, 1)) - 0.5;
            const normY = ((e.clientY - cRect.top) / Math.max(cRect.height, 1)) - 0.5;
            const ry = (normX * 7).toFixed(2);
            const rx = (-normY * 7).toFixed(2);
            card.style.setProperty('--rx', `${rx}deg`);
            card.style.setProperty('--ry', `${ry}deg`);
        }
    });

    document.addEventListener('mouseleave', (e) => {
        const card = e.target && e.target.closest ? e.target.closest('.reactive-card') : null;
        if (card) {
            card.style.setProperty('--rx', '0deg');
            card.style.setProperty('--ry', '0deg');
        }
    }, true);
}

// Initial Render
applyContactInfo();
renderUpdates();
renderServices();
initMouseHiveEffects();
