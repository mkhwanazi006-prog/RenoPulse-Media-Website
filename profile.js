// ==========================================================================
// RENOPULSE PROFILE RENDERING ENGINE
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Extract the contractor name parameter from the browser URL address bar
    const urlParams = new URLSearchParams(window.location.search);
    const targetName = urlParams.get('name');

    const container = document.getElementById("profileContainer");
    const errorBox = document.getElementById("profileError");

    // 2. Scan the database array that lives inside contractors.js to match the name perfectly
    if (targetName && typeof directoryDatabase !== 'undefined') {
        const contractor = directoryDatabase.find(item => item.title === decodeURIComponent(targetName));

        if (contractor) {
            // 3. Inject all their granular profile data fields cleanly onto the page elements
            if (document.getElementById("profHeroImg")) {
                document.getElementById("profHeroImg").src = contractor.img;
                document.getElementById("profHeroImg").alt = contractor.title;
            }
            if (document.getElementById("profName")) document.getElementById("profName").textContent = contractor.title;
            if (document.getElementById("profTag")) document.getElementById("profTag").textContent = contractor.tag;
            if (document.getElementById("profRating")) document.getElementById("profRating").textContent = contractor.rating;
            if (document.getElementById("profLocation")) document.getElementById("profLocation").textContent = contractor.location;
            if (document.getElementById("profPhone")) document.getElementById("profPhone").textContent = contractor.phone;
            if (document.getElementById("profDesc")) document.getElementById("profDesc").textContent = contractor.desc;
            
            // Format phone link string safely
            const callBtn = document.getElementById("profCallBtn");
            if (callBtn) {
                callBtn.href = "tel:" + contractor.phone.replace(/\s+/g, '');
            }

            // Toggle views to reveal the populated layout card template sheet container block
            if (errorBox) errorBox.style.display = "none";
            if (container) container.style.display = "block";
            return;
        }
    }
    
    // Fallback Error State: If anything fails or contractor is missing, reveal error layout panel
    if (errorBox) errorBox.style.display = "block";
    if (container) container.style.display = "none";
    console.log("Profile not found or no contractor specified in the URL.");
});