document.addEventListener("DOMContentLoaded", () => {
    const headerHTML = `
    <div class="banner">
        <div class="navigation">
            <button id="back-to-page" class="back-button"> Back </button>
            <span id="dynamic-title"></span>
        </div>
        <div class="header">
            <img id="logo" src="./static/Logo.png" alt="Logo">
        <!--   <p id="title"> G! Tara Na! </p>
            <p id="subtitle"> Harmony Unleashed: Your Ultimate Guide to Guitar Chords! </p> -->
        </div>    
    </div>
    `;

    // Insert the header into the DOM
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // Set the dynamic title
    const pageTitle = document.title;
    const dynamicTitleElement = document.getElementById("dynamic-title");
    if (dynamicTitleElement) {
        dynamicTitleElement.textContent = pageTitle;
    } else {
        console.error("Dynamic title element not found");
    }

    // Add click event to redirect to index.html
    const backButton = document.getElementById("back-to-page");
    backButton.addEventListener("click", () => {
        console.log("Button clicked!");
        window.location.href = "../../"; // Adjusted file path
    });
});
