// ==========================================================================
// SECTION 1: GLOBAL CONTRACTOR DIRECTORY DATABASE
// ==========================================================================
const directoryDatabase = [
    {
       // id: 1,
       // category: "bathroom",
        //name: "Elite Bathrooms & Spas", 
        //title: "Elite Bathrooms & Spas",
        //tag: "Bathroom Remodeling Expert",
        //rating: "4.8",
        //img: "pictures/pexels-curtis-adams-1694007-36777927.jpg",
        //desc: "Transforming standard home bathrooms into luxury wellness suites. Custom wet-rooms, frameless glass showers, floating vanities, and premium modern tiling layouts.",
        //phone: "083 999 8888",
        //location: "Sandton, Gauteng",
        //initials: "EB",
        //featured: false
    },
    
];

// ==========================================================================
// SECTION 2: CENTRAL INITIALIZATION DISPATCHER
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    initHomepageCarousel();
    initDirectoryEngine();
    initProfileEngine();
});

// ==========================================================================
// SECTION 3: HOMEPAGE RECENTLY FEATURED CAROUSEL ENGINE
// ==========================================================================
function initHomepageCarousel() {
    const carouselContainer = document.getElementById("contractorCardsContainer");
    if (!carouselContainer) return;
    
    const premiumContractors = directoryDatabase.filter(item => item.featured === true);
    carouselContainer.innerHTML = "";
    
    premiumContractors.forEach(contractor => {
        const cardMarkup = `
            <div class="contractor-showcase-card" data-card-cat="${contractor.category}">
                <div class="card-hero-img-box">
                    <img src="${contractor.img}" alt="${contractor.title}">
                    <span class="card-rating-badge">★ ${contractor.rating}</span>
                </div>
                <div class="card-business-details">
                    <div class="business-logo-circle" style="background-color: #c29438; color: #fff; font-weight: 700; width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 12px;">${contractor.initials}</div>
                    <h3 class="business-title">${contractor.title}</h3>
                    <p class="business-category">${contractor.tag}</p>
                    <p class="business-summary">${contractor.desc}</p>
                    <div class="business-contact-info">
                        <span class="contact-row">📞 ${contractor.phone}</span>
                        <span class="contact-row">📍 ${contractor.location}</span>
                    </div>
                    <a href="profile.html?name=${encodeURIComponent(contractor.name)}" class="link-view-profile">View Profile &rarr;</a>
                </div>
            </div>
        `;
        carouselContainer.innerHTML += cardMarkup;
    });

    // Carousel Navigation Trigger System
    const nextBtn = document.getElementById("carouselNextBtn");
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            const cardNode = carouselContainer.querySelector('.contractor-showcase-card');
            if (cardNode) {
                const scrollAmount = cardNode.offsetWidth + 20; 
                carouselContainer.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// ==========================================================================
// SECTION 4: DIRECTORY GRID FILTRATION ENGINE (contractors.html)
// ==========================================================================
function initDirectoryEngine() {
    const gridContainer = document.getElementById("contractor-grid");
    if (!gridContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    let activeCategory = urlParams.get('category') || "all";
    let searchQuery = "";

    const directoryTitle = document.getElementById("dirCategoryTitle");
    if (directoryTitle) {
        directoryTitle.textContent = activeCategory !== "all" 
            ? `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Contractors` 
            : "All Verified Contractors";
    }

    function render() {
        gridContainer.innerHTML = "";

        const filteredData = directoryDatabase.filter(contractor => {
            const matchesCategory = activeCategory === "all" || 
                                    contractor.category.toLowerCase().trim() === activeCategory.toLowerCase().trim();
            const searchString = `${contractor.name} ${contractor.location} ${contractor.desc}`.toLowerCase();
            const matchesSearch = searchString.includes(searchQuery);
            return matchesCategory && matchesSearch;
        });

        if (filteredData.length === 0) {
            gridContainer.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #aaaaaa;">
                    <p style="font-size: 18px; font-weight: 600; text-transform: capitalize;">No verified ${activeCategory} providers found.</p>
                    <p style="font-size: 14px; margin-top: 5px;">Try pressing back and selecting a different home specialization category.</p>
                </div>`;
            return;
        }

        filteredData.forEach(contractor => {
            const cardHTML = `
                <div class="contractor-card">
                    <div class="card-hero-img-box">
                        <img src="${contractor.img}" alt="${contractor.title}">
                        <div class="card-rating-badge">★ ${contractor.rating}</div>
                    </div>
                    <div class="card-business-details">
                        <div class="business-logo-circle" style="background-color: #c29438; color: #fff; font-weight: 700; width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 12px;">${contractor.initials}</div>
                        <h3 class="business-title">${contractor.title}</h3>
                        <div class="business-category">${contractor.tag}</div>
                        <p class="business-summary">${contractor.desc}</p>
                        <div class="business-contact-info">
                            <div>📍 Location: ${contractor.location}</div>
                            <div>📞 Phone: ${contractor.phone}</div>
                        </div>
                        <a href="profile.html?name=${encodeURIComponent(contractor.name)}" class="link-view-profile" style="margin-top: 15px; display: inline-block;">
                            View Profile &rarr;
                        </a>
                    </div>
                </div>
            `;
            gridContainer.innerHTML += cardHTML;
        });
    }

    // Connect Search Event Listeners if present
    const searchForm = document.getElementById("contractorSearchForm");
    const searchInput = document.getElementById("clientContractorSearch");
    if (searchForm && searchInput) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            searchQuery = searchInput.value.toLowerCase().trim();
            render();
        });
    }

    render();
}

// ==========================================================================
// SECTION 5: PROFILE VIEW HYDRATION ENGINE (profile.html)
// ==========================================================================
function initProfileEngine() {
    const profileBox = document.getElementById("profileContainer");
    const errorBox = document.getElementById("profileError");
    if (!profileBox || !errorBox) return;

    const urlParams = new URLSearchParams(window.location.search);
    const targetName = urlParams.get('name');

    const contractor = directoryDatabase.find(item => item.name.toLowerCase() === (targetName || "").toLowerCase());

    if (contractor) {
        document.getElementById("profHeroImg").src = contractor.img;
        document.getElementById("profHeroImg").alt = contractor.title;
        document.getElementById("profRating").textContent = `★ ${contractor.rating}`;
        document.getElementById("profTag").textContent = contractor.tag;
        document.getElementById("profName").textContent = contractor.title;
        document.getElementById("profLocation").textContent = contractor.location;
        document.getElementById("profPhone").textContent = contractor.phone;
        document.getElementById("profDesc").textContent = contractor.desc;
        document.getElementById("profCallBtn").href = `tel:${contractor.phone.replace(/\s+/g, '')}`;
        
        profileBox.style.display = "block";
        errorBox.style.display = "none";
    } else {
        profileBox.style.display = "none";
        errorBox.style.display = "block";
    }
}

// ==========================================================================
// SECTION 6: RENOPULSE MEDIA PLATFORM RATING FUNCTION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll(".platform-star");
    const ratingInput = document.getElementById("selectedPlatformRating");
    const form = document.getElementById("platformRatingForm");
    const successMsg = document.getElementById("ratingSuccessMessage");

    if (!stars.length || !form) return;

    // Handle hover and click logic for stars
    stars.forEach(star => {
        star.addEventListener("click", () => {
            const currentRating = parseInt(star.getAttribute("data-rating"));
            ratingInput.value = currentRating;

            // Highlight chosen stars and dim the rest
            stars.forEach(s => {
                const sRating = parseInt(s.getAttribute("data-rating"));
                if (sRating <= currentRating) {
                    s.classList.add("active");
                } else {
                    s.classList.remove("active");
                }
            });
        });
    });

    // Form Submission Action
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        if (ratingInput.value === "0") {
            alert("Please select a star rating before submitting!");
            return;
        }

        // Capture data for later database/analytics hooks
        const finalRating = ratingInput.value;
        const finalFeedback = document.getElementById("platformFeedbackText").value;
        
        console.log(`Platform Submission: ${finalRating}/5 Stars. Feedback: ${finalFeedback}`);

        // UI Feedback Transitions
        form.style.display = "none";
        document.getElementById("platformStarGroup").style.pointerEvents = "none"; // Lock stars
        successMsg.style.display = "block";
    });
});