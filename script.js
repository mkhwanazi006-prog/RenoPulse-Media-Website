document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // MODULE 1: HOME PAGE REGISTER FORM & GEOLOCATION (index.html)
    // ==========================================================================
    const locationInput = document.getElementById("globalLocationInput");
    const suggestionsBox = document.getElementById("locationSuggestionsBox");
    const contractorForm = document.querySelector(".premium-contractor-form");

    // Only runs if the home page location input elements exist
    if (locationInput && suggestionsBox) {
        // [Your existing code for fetching Nominatim addresses goes here]
    }

   // ==========================================================================
// REGISTRATION SUCCESS ALERT POPUP
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // Select the form by its class name
    const contractorForm = document.querySelector(".premium-contractor-form");

    if (contractorForm) {
        contractorForm.addEventListener("submit", () => {
            // This triggers right as the browser processes the email submission
            alert("🎉 Registration Submitted Successfully!\n\nThank you for partnering with RenoPulse Media. Our verification team will review your details and reach out to you shortly.");
        });
    }
});

    // ==========================================================================
    // MODULE 2: CONTRACTORS EXCLUSIVE SEARCH ENGINE (contractors.html)
    // ==========================================================================
    const contractorGrid = document.getElementById("contractorsContainer") || document.getElementById("contractorGrid");
    const clientSearchInput = document.getElementById("clientContractorSearch");
    const searchForm = document.getElementById("contractorSearchForm");
    const directoryTitle = document.getElementById("directoryTitle");

    // The engine boots up ONLY if the container grid exists on your contractors page
    if (contractorGrid) {
        
        // 1. Centralized Platform Contractor Database
        
        const contractorsDatabase = [
            { 
                id: 1, 
                name: "Tshepo", 
                category: "bathroom", 
                location: "sandton", 
                rating: "7", 
                summary: "Tshepo Holdings Solutions", 
                initials: "T" 
            },
            // 💡 Paste any new test companies right here inside this array!
        ];

        // 2. Parse the category from the URL web string (passed from your home page)
        const urlParams = new URLSearchParams(window.location.search);
        let activeCategory = urlParams.get('category') || "all"; 
        let searchQuery = "";

        // Update the page title banner dynamically based on the category chosen
        if (directoryTitle) {
            directoryTitle.textContent = activeCategory !== "all" 
                ? `Top ${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Contractors` 
                : "All Top Contractors";
        }

        // 3. Dynamic Rendering Loop
        function renderFilteredContractors() {
            // Clear out any old elements inside the grid container
            contractorGrid.innerHTML = "";

            // Evaluate data metrics against chosen filters
            const filteredData = contractorsDatabase.filter(contractor => {
                // Strict lowercase matching to make sure "Kitchen" locks with "kitchen"
                const matchesCategory = activeCategory === "all" || 
                                        contractor.category.toLowerCase().trim() === activeCategory.toLowerCase().trim();
                
                const searchString = `${contractor.name} ${contractor.location}`.toLowerCase();
                const matchesSearch = searchString.includes(searchQuery);

                return matchesCategory && matchesSearch;
            });

            // If no match found, show an elegant feedback layout rule
            if (filteredData.length === 0) {
                contractorGrid.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 40px 20px; color: #a39e93;">
                        <p style="font-size: 16px; font-weight: 600; text-transform: capitalize;">No verified ${activeCategory} providers found.</p>
                        <p style="font-size: 14px; margin-top: 5px;">Try pressing back and selecting a different service.</p>
                    </div>`;
                return;
            }

            // Map matching array contents into your contractors.css card view components
            filteredData.forEach(contractor => {
                const card = document.createElement("div");
                card.className = "contractor-card"; // Linked safely to your compact contractors.css file sizing!
                card.innerHTML = `
                    <div class="card-hero-img-box">
                        <img src="https://images.unsplash.com/photo-1581094288338-2314dddb7eed?auto=format&fit=crop&w=500&q=80" alt="Worksite">
                        <div class="card-rating-badge">★ ${contractor.rating || 'N/A'}</div>
                    </div>
                    <div class="card-business-details">
                        <div class="business-logo-circle" style="background-color: #d4af37; color: #fff; font-weight: 700; width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 12px;">${contractor.initials || 'RP'}</div>
                        <h3 class="business-title">${contractor.name}</h3>
                        <div class="business-category" style="color: #d4af37; font-size: 14px; font-weight: 600; margin-bottom: 8px; text-transform: capitalize;">${contractor.category}</div>
                        <p class="business-summary" style="font-size: 14px; color: #666; line-height: 1.5; margin-bottom: 15px;">${contractor.summary}</p>
                        <div class="business-contact-info" style="font-size: 13px; color: #333; font-weight: 500;">📍 ${contractor.location}</div>
                        <a href="#" class="link-view-profile" style="display: inline-block; margin-top: 15px; color: #d4af37; text-decoration: none; font-weight: 600; font-size: 14px;">View Profile →</a>
                    </div>
                `;
                contractorGrid.appendChild(card);
            });
        }

        // 4. TRIGGER SYSTEM: Listens for Laptop Enter key or Search bar click
        if (searchForm && clientSearchInput) {
            searchForm.addEventListener("submit", (e) => {
                e.preventDefault(); // Stop page from flashing/refreshing
                searchQuery = clientSearchInput.value.toLowerCase().trim();
                renderFilteredContractors(); // Execute search filter recalculation
            });
        }

        // Run instantly when page first boots up to populate default categories chosen
        renderFilteredContractors();
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
    // ==========================================================================
// FRESH INTERACTIVE HAMBURGER DRAWER ACTION CONTEXT ENGINE
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const triggerMenu = document.getElementById("hamburgerMenu");
    const navigationDrawer = document.getElementById("servicesDrawer");
    const exitDrawerBtn = document.getElementById("closeDrawer");

    // Open Drawer Action
    if (triggerMenu && navigationDrawer) {
        triggerMenu.addEventListener("click", () => {
            navigationDrawer.classList.add("active");
        });
    }

    // Close Drawer Action via 'X' Button
    if (exitDrawerBtn && navigationDrawer) {
        exitDrawerBtn.addEventListener("click", () => {
            navigationDrawer.classList.remove("active");
        });
    }

    // Close Drawer implicitly if clicking anywhere outside the open panel
    document.addEventListener("click", (event) => {
        if (navigationDrawer && navigationDrawer.classList.contains("active")) {
            if (!navigationDrawer.contains(event.target) && !triggerMenu.contains(event.target)) {
                navigationDrawer.classList.remove("active");
            }
        }
    });
});
});
  
