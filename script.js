document.addEventListener("DOMContentLoaded", function () {
    // ✅ Get user's name from localStorage or prompt
    let userName = localStorage.getItem('userName') || prompt("Enter your name:");
    if (userName) {
    } else {
        userName = "Guest"; // Default name
    }

    // ✅ Time-based greeting logic
    const hour = new Date().getHours();
    let greeting;
    if (hour < 12) {
        greeting = "Good Morning";
    } else if (hour < 18) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    // ✅ Speak welcome message
    speak(`${greeting}, ${userName}. Welcome to my digital world!`);

    // ✅ Display welcome message on the screen
    const welcomeMessage = document.getElementById('welcome-message');
    if (welcomeMessage) {
        welcomeMessage.textContent = `${greeting}, ${userName}. Welcome to my digital world!`;
    }

    // ✅ Dark Mode / Light Mode Toggle
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark");
        document.body.classList.toggle("light");

        // Save the theme preference
        const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
        localStorage.setItem("theme", currentTheme);
    });

    // ✅ Load saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    } else {
        document.body.classList.add("light"); // Default theme
    }

    // ✅ Logo Hover Effect with Animation
    const logo = document.querySelector(".logo-container img");
    logo.addEventListener("mouseover", function () {
        logo.style.transform = "rotateY(360deg) scale(1.3)";
    });
    logo.addEventListener("mouseout", function () {
        logo.style.transform = "rotateY(0deg) scale(1)";
    });
});

// ✅ Speech Function
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US"; // भाषा सेट करें
    window.speechSynthesis.speak(speech);
}


/* ================== Qr Section - js ================== */
document.addEventListener("DOMContentLoaded", function () {
    const qrContainer = document.getElementById("qrcode");
    const qrCodeURL = "https://www.instagram.com/ankit_kaler_01"; // Instagram link

    if (!qrContainer) {
        console.error("QR Code container not found!");
        return;
    }

    // ✅ Remove existing QR code if already present (to prevent duplication)
    const existingQR = qrContainer.querySelector("canvas");
    if (existingQR) {
        existingQR.remove();
    }

    // ✅ Generate QR Code
    const qrCode = new QRCode(qrContainer, {
        text: qrCodeURL,
        width: 80,
        height: 80,
        colorDark: "#000",
        colorLight: "#fff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // ✅ Double Click to Open QR Code Link
    let qrClickCount = 0;
    qrContainer.addEventListener("click", function () {
        qrClickCount++;
        if (qrClickCount === 2) {
            window.open(qrCodeURL, "_blank");
            qrClickCount = 0; // Reset count
        }
        setTimeout(() => { qrClickCount = 0; }, 500); // Reset count after 0.5s
    });

    console.log("QR Code successfully generated!");
});




document.addEventListener("DOMContentLoaded", function () {
    const quoteElement = document.getElementById("quote-text");
    const authorElement = document.getElementById("quote-author");

    // ✅ यदि Quote Element नहीं मिला तो एरर दिखाएगा
    if (!quoteElement || !authorElement) {
        console.error("Quote elements not found!");
        return;
    }

    // ✅ Quote और Author Data
    const quoteText = `"खुद की पहचान खुद बनानी पड़ती है, हर मुश्किल से लड़कर नई राह बनानी पड़ती है।"`;
    const authorText = "- Ankit Kaler";

    // ✅ टाइपिंग इफेक्ट के लिए एक फंक्शन
    function typeEffect(element, text, speed, callback) {
        let index = 0;
        function type() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }
        type();
    }

    // ✅ Quote Text के लिए टाइपिंग इफेक्ट स्टार्ट करें
    quoteElement.innerHTML = "";
    typeEffect(quoteElement, quoteText, 50, function () {
        // ✅ जब Quote पूरा हो जाए, तब Author का नाम ऐड करें
        setTimeout(() => {
            authorElement.innerHTML = authorText;
        }, 500);
    });

    // ✅ Auto Color Changing Effect for Quote
    setInterval(() => {
        const colors = ["#ff6b6b", "#6bff6b", "#6b6bff", "#ff6bff"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        quoteElement.style.color = randomColor;
        authorElement.style.color = randomColor;
    }, 3000); // हर 3 सेकंड में कलर बदलेगा
});







/* ==================  Section - js ================== */
    // Logo Click Animation & Enlarged View
    let logo = document.querySelector(".logo-container img");
    if (logo) {
        logo.addEventListener("click", function () {
            let newWindow = window.open("", "_blank");
            newWindow.document.write(`
                <html>
                <head>
                    <title>Enlarged Logo</title>
                    <style>
                        body {
                            background: linear-gradient(to right, #000428, #004e92);
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                        }
                        img {
                            width: 400px;
                            height: 400px;
                            border-radius: 50%;
                            box-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
                            animation: popUp 0.8s ease-in-out;
                        }
                        @keyframes popUp {
                            from { transform: scale(0); opacity: 0; }
                            to { transform: scale(1); opacity: 1; }
                        }
                    </style>
                </head>
                <body>
                    <img src="${logo.src}" alt="Large Logo">
                </body>
                </html>
            `);
        });
    }

    // Profile Photo Zoom on Click
    let profilePhoto = document.querySelector(".profile-photo");
    if (profilePhoto) {
        profilePhoto.addEventListener("click", function () {
            profilePhoto.classList.toggle("zoom");
        });
    }

    // Dark/Light Mode Toggle
    function toggleTheme() {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
        speak("Theme changed to " + (document.body.classList.contains("dark-mode") ? "dark mode" : "light mode"));
    }

    // Load Saved Theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

   // Voice Control Functionality
let isAssistantActive = true;
let selectedLanguage = null;

function startVoiceAssistant() {
    speak("Voice assistant activated. How can I help you?", "en"); // Default language is English
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US"; // Default language is English
    recognition.start(); // Start listening

    recognition.onresult = function (event) {
        const command = event.results[0][0].transcript.toLowerCase(); // Get the spoken command
        const detectedLanguage = detectLanguage(command); // Detect language of the command
        handleVoiceCommand(command, detectedLanguage); // Handle the command in the detected language
    };

    recognition.onend = function () {
        speak("Voice assistant deactivated.", "en");
    };
}

// Function to detect language (Hindi or English)
function detectLanguage(text) {
    const hindiRegex = /[\u0900-\u097F]/; // Regex to detect Hindi characters
    return hindiRegex.test(text) ? "hi" : "en"; // Return 'hi' for Hindi, 'en' for English
}

function startVoiceCommandSystem() {
    speak("Hello! Please choose a language: Hindi or English.", "en");
    speak("नमस्ते! कृपया भाषा चुनें: हिंदी या अंग्रेज़ी।", "hi");

    // Listen for the user's language choice
    listenForLanguageChoice();
}

function listenForLanguageChoice() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US"; // Default language for initial choice
    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        if (command.includes("hindi") || command.includes("हिंदी")) {
            selectedLanguage = "hi";
            speak("हिंदी चुनी गई।", "hi");
            speak("राम राम! मेरी वेबसाइट में आपका स्वागत है। मैं आपकी कैसे मदद कर सकता हूँ?", "hi");
        } else if (command.includes("english") || command.includes("अंग्रेज़ी")) {
            selectedLanguage = "en";
            speak("English selected.", "en");
            speak("Hello! Welcome to my website. How can I assist you today?", "en");
        } else {
            speak("Sorry, I didn't understand. Please choose Hindi or English.", "en");
            speak("क्षमा करें, मैं समझ नहीं पाया। कृपया हिंदी या अंग्रेज़ी चुनें।", "hi");
            listenForLanguageChoice(); // Retry listening for language choice
        }
    };
    recognition.start();
}

function handleVoiceCommand(command, language) {
    if (!isAssistantActive) {
        speak(language === "hi" ? "सहायक बंद है। कृपया 'शुरू' कहें।" : "Assistant is stopped. Please say 'start'.", language);
        return;
    }

    // Home Section
    if (
        command.includes("home") || command.includes("घर") || command.includes("मुख्य") ||
        command.includes("main") || command.includes("होम") || command.includes("प्रारंभ") ||
        command.includes("start") || command.includes("शुरू") || command.includes("मुख पृष्ठ") ||
        command.includes("मेनू") || command.includes("dashboard") || command.includes("डैशबोर्ड")
    ) {
        document.querySelector('a[href="#home"]').click();
        speak(language === "hi" ? "होम सेक्शन पर नेविगेट कर रहा हूँ" : "Navigating to home section", language);
    }
    // About Section
    else if (
        command.includes("about") || command.includes("के बारे में") || command.includes("जानकारी") ||
        command.includes("info") || command.includes("अबाउट") || command.includes("परिचय") ||
        command.includes("introduction") || command.includes("विवरण") || command.includes("details") ||
        command.includes("हमारे बारे में") || command.includes("about us") || command.includes("अबाउट अस")
    ) {
        document.querySelector('a[href="#about"]').click();
        speak(language === "hi" ? "अबाउट सेक्शन पर नेविगेट कर रहा हूँ" : "Navigating to about section", language);
    }
    // Open LinkedIn
    else if (
        command.includes("open linkedin") || command.includes("लिंक्डइन खोलो") || command.includes("लिंक्डइन") ||
        command.includes("linkedin") || command.includes("लिंक्डइन पर जाएं") || command.includes("linkedin open")
    ) {
        window.open("https://www.linkedin.com/in/ankit-kaler", "_blank");
        speak(language === "hi" ? "लिंक्डइन खोल रहा हूँ" : "Opening LinkedIn", language);
    }
    // Search Something
    else if (
        command.includes("search") || command.includes("खोजें") || command.includes("सर्च") ||
        command.includes("find") || command.includes("ढूंढो") || command.includes("खोजो")
    ) {
        const query = command.replace("search", "").replace("खोजें", "").trim();
        if (query) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
            speak(language === "hi" ? `खोज रहा हूँ: ${query}` : `Searching for: ${query}`, language);
        } else {
            speak(language === "hi" ? "कृपया खोजने के लिए कुछ कहें" : "Please say something to search.", language);
        }
    }
    // Confirmation Prompt for Sending Email
    else if (command.includes("send email") || command.includes("ईमेल भेजो")) {
        speak(language === "hi" ? "क्या आप ईमेल भेजना चाहते हैं?" : "Do you want to send an email?", language);
        const confirmation = listenForConfirmation();
        if (confirmation) {
            document.getElementById("contact-email").focus();
            speak(language === "hi" ? "कृपया ईमेल और संदेश दर्ज करें" : "Please enter your email and message.", language);
        } else {
            speak(language === "hi" ? "ईमेल भेजना रद्द किया गया" : "Email sending canceled.", language);
        }
    }
    // Error Handling
    else {
        speak(language === "hi" ? "क्षमा करें, मैं समझ नहीं पाया। कृपया दोबारा कहें।" : "Sorry, I didn't understand. Please try again.", language);
    }
}

function endInteraction(language) {
    if (language === "hi") {
        speak("धन्यवाद! आपका दिन शुभ हो।", "hi");
    } else {
        speak("Thank you! Have a great day.", "en");
    }
}

function readSectionContent(sectionId, language) {
    const section = document.getElementById(sectionId);
    if (section) {
        const text = section.innerText || section.textContent;
        speak(text, language);
    } else {
        speak(language === "hi" ? "यह सेक्शन उपलब्ध नहीं है" : "This section is not available.", language);
    }
}

function toggleAssistant(command, language) {
    if (command.includes("start") || command.includes("शुरू") || command.includes("begin")) {
        isAssistantActive = true;
        speak(language === "hi" ? "सहायक सक्रिय है" : "Assistant is active.", language);
    } else if (command.includes("stop") || command.includes("रुकें") || command.includes("बंद करो")) {
        isAssistantActive = false;
        speak(language === "hi" ? "सहायक बंद किया गया" : "Assistant is stopped.", language);
    }
}

// Function to make the assistant speak in the selected language
function speak(text, language) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "hi" ? "hi-IN" : "en-US";
    window.speechSynthesis.speak(utterance);
}

// Event Listener for VoiceAssistantButton
document.addEventListener("DOMContentLoaded", function () {
    let voiceButton = document.getElementById("voice-command");
    if (voiceButton) {
        voiceButton.addEventListener("click", startVoiceAssistant);
    } else {
        console.log("Error: 'voice-command' ID वाला एलिमेंट नहीं मिला!");
    }
});

// Language Translation Functionality
function switchLanguage(lang) {
    const elements = document.querySelectorAll("[data-en], [data-hi]");
    elements.forEach(element => {
        if (lang === "en") {
            // Set text to English
            if (element.hasAttribute("data-en")) {
                element.textContent = element.getAttribute("data-en");
            }
            if (element.hasAttribute("placeholder-en")) {
                element.setAttribute("placeholder", element.getAttribute("placeholder-en"));
            }
        } else if (lang === "hi") {
            // Set text to Hindi
            if (element.hasAttribute("data-hi")) {
                element.textContent = element.getAttribute("data-hi");
            }
            if (element.hasAttribute("placeholder-hi")) {
                element.setAttribute("placeholder", element.getAttribute("placeholder-hi"));
            }
        }
    });
}

// Event Listener for Language Toggle Buttons
document.getElementById("language-toggle-en")?.addEventListener("click", () => switchLanguage("en"));
document.getElementById("language-toggle-hi")?.addEventListener("click", () => switchLanguage("hi"));


// Language Translation Functionality
function switchLanguage(lang) {
    const elements = document.querySelectorAll("[data-en], [data-hi]");
    elements.forEach(element => {
        if (lang === "en") {
            // Set text to English
            if (element.hasAttribute("data-en")) {
                element.textContent = element.getAttribute("data-en");
            }
            if (element.hasAttribute("placeholder-en")) {
                element.setAttribute("placeholder", element.getAttribute("placeholder-en"));
            }
        } else if (lang === "hi") {
            // Set text to Hindi
            if (element.hasAttribute("data-hi")) {
                element.textContent = element.getAttribute("data-hi");
            }
            if (element.hasAttribute("placeholder-hi")) {
                element.setAttribute("placeholder", element.getAttribute("placeholder-hi"));
            }
        }
    });
}

// Event Listener for Language Toggle Buttons
document.getElementById("language-toggle-en")?.addEventListener("click", () => switchLanguage("en"));
document.getElementById("language-toggle-hi")?.addEventListener("click", () => switchLanguage("hi"));    // Save the selected language in localStorage
    localStorage.setItem("language", lang);

    // Notify the user
    speak(`Language switched to ${lang === "en" ? "English" : "Hindi"}`);


// Function to initialize language based on user preference
function initializeLanguage() {
    const savedLanguage = localStorage.getItem("language") || "en"; // Default to English
    switchLanguage(savedLanguage);
}

// Function to make the assistant speak
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

// Initialize language when the page loads
document.addEventListener("DOMContentLoaded", initializeLanguage);


    // Interactive Header Effects
    let header = document.querySelector("header");
    if (header) {
        document.addEventListener("mousemove", function (e) {
            let x = (e.clientX / window.innerWidth) * 2 - 1;
            let y = (e.clientY / window.innerHeight) * 2 - 1;
            header.style.transform = `rotateY(${x * 10}deg) rotateX(${y * -10}deg)`;
        });
    }

    // Activity Tracker
    let userActivities = [];
    document.addEventListener("click", (e) => {
        let activity = {
            type: "Click",
            target: e.target.tagName,
            time: new Date().toLocaleTimeString()
        };
        userActivities.push(activity);
        console.log("Activity Logged:", activity);
    });

    document.addEventListener("keydown", (e) => {
        let activity = {
            type: "Key Press",
            key: e.key,
            time: new Date().toLocaleTimeString()
        };
        userActivities.push(activity);
        console.log("Activity Logged:", activity);
    });

    // Live Digital Clock
    function updateClock() {
        let date = new Date();
        let liveTime = document.getElementById("live-time");
        if (liveTime) {
            liveTime.textContent = date.toLocaleTimeString();
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Auto-Switch Profile Photos
    const profileImages = [
        "C:\\Users\\Admin\\Desktop\\image\\Ankit.jpg",
        "C:\\Users\\Admin\\Desktop\\image\\ak1.jpg"
    ];
    let currentIndex = 0;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % profileImages.length;
        let profilePhoto = document.getElementById("profile-photo");
        if (profilePhoto) {
            profilePhoto.classList.add("jump-animation");
            setTimeout(() => {
                profilePhoto.src = profileImages[currentIndex];
                profilePhoto.classList.remove("jump-animation");
            }, 500);
        }
    }, 5000);

    // Speak Function
    function speak(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    }

// Toggle Sidebar Menu
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
}

// Live Digital Clock Function
function updateClock() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // Add leading zero if value is less than 10
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Format Time (12-hour format with AM/PM)
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 24-hour to 12-hour format

    // Update time in HTML
    document.getElementById("live-time").textContent = `🕒 ${hours}:${minutes}:${seconds} ${ampm}`;
}

// Update Clock Every Second
setInterval(updateClock, 1000);

// Initialize Clock When Page Loads
updateClock();

/* ================== Home Section - High-Level CSS ================== */

document.addEventListener("DOMContentLoaded", function () {
    // ✅ Typing Animation Setup
    const typingElement = document.querySelector(".typing-text");
    const cursorElement = document.createElement("span");
    cursorElement.classList.add("typing-cursor");
    cursorElement.textContent = "|";
    typingElement.appendChild(cursorElement);

    const textArray = [
        "🚀 आपका स्वागत है मेरे पोर्टफोलियो में!",
       "🌟 Welcome to My Digital World 🌟",
       "Ankit Kaler",
       "Explore My Work",
       "🌟 Welcome to My Digital World 🌟"

        
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout;

    // ✅ Customizable settings
    const typingSpeed = 80;
    const deletingSpeed = 50;
    const delayBetweenTexts = 1200;
    const randomizeTextOrder = true;
    const cursorBlinkSpeed = 500;

    // ✅ Header से 0.5cm नीचे सेट करने के लिए CSS
    typingElement.style.marginTop = "3.5cm";
    typingElement.style.fontSize = "1.8rem";
    typingElement.style.fontWeight = "bold";
    typingElement.style.textShadow = "2px 2px 10px rgba(0,0,0,0.2)";
    typingElement.style.display = "inline-block";

    // ✅ टेक्स्ट को रैंडमाइज़ करना
    if (randomizeTextOrder) {
        textArray.sort(() => Math.random() - 0.5);
    }

    // ✅ टाइपिंग एनिमेशन फंक्शन
    function typeText() {
        const currentText = textArray[textIndex];

        if (!isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentText.length) {
                isDeleting = true;
                timeout = setTimeout(typeText, delayBetweenTexts);
            } else {
                timeout = setTimeout(typeText, typingSpeed);
            }
        } else {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
                timeout = setTimeout(typeText, typingSpeed);
            } else {
                timeout = setTimeout(typeText, deletingSpeed);
            }
        }

        typingElement.appendChild(cursorElement);
    }

    // ✅ होवर पर एनिमेशन रोकें
    typingElement.addEventListener("mouseenter", () => {
        clearTimeout(timeout);
    });

    typingElement.addEventListener("mouseleave", () => {
        typeText();
    });

    // ✅ Start Typing Animation
    typeText();

    // ✅ Cursor Blinking Animation
    setInterval(() => {
        cursorElement.style.opacity = cursorElement.style.opacity === "0" ? "1" : "0";
    }, cursorBlinkSpeed);

    // ✅ Theme Toggle Functionality
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("light");
            localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
            updateTextColors();
        });
    }

    // ✅ Load saved theme
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light");
    }

    // ✅ Dynamic Text Updates for Theme Changes
    function updateTextColors() {
        const isLightTheme = document.body.classList.contains("light");
        const textElements = document.querySelectorAll("#home p, #home h2, .typing-text");

        textElements.forEach(element => {
            element.style.color = isLightTheme ? "#333" : "#fff";
        });
    }

    // ✅ Observe theme changes and update text colors
    const observer = new MutationObserver(updateTextColors);
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"]
    });

    // ✅ Initial text color update
    updateTextColors();
});

/* ================== About Me Section - High-Level CSS ================== */

document.addEventListener("DOMContentLoaded", function () {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("light");
            localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
            updateAboutSectionStyles(); // Update styles when theme changes
        });
    }

    // Load saved theme
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light");
    }

    // Function to update About Section styles based on theme
    function updateAboutSectionStyles() {
        const isLightTheme = document.body.classList.contains("light");
        const aboutSection = document.getElementById("about");

        if (aboutSection) {
            // Update text colors
            const textElements = aboutSection.querySelectorAll("h2, p, .about-card h3, .about-card p");
            textElements.forEach(element => {
                element.style.color = isLightTheme ? "#333" : "#fff";
            });

            // Update card backgrounds and borders
            const cards = aboutSection.querySelectorAll(".about-card");
            cards.forEach(card => {
                card.style.background = isLightTheme ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.15)";
                card.style.border = isLightTheme ? "1px solid rgba(0, 0, 0, 0.25)" : "1px solid rgba(255, 255, 255, 0.25)";
            });

            // Update divider color
            const divider = aboutSection.querySelector(".about-divider");
            if (divider) {
                divider.style.background = isLightTheme ? "linear-gradient(90deg, #333, #666)" : "linear-gradient(90deg, #ff7676, #7676ff)";
            }
        }
    }

    // Initial style update
    updateAboutSectionStyles();

    // Observe theme changes and update styles
    const observer = new MutationObserver(updateAboutSectionStyles);
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"]
    });

    // Interactive Card Animations
    const cards = document.querySelectorAll(".about-card");
    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-10px) rotateY(10deg)";
            card.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.4)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0) rotateY(0)";
            card.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.3)";
        });
    });
});

/* ================== Gallery Section - High-Level CSS ================== */

// Function to open an image in a new tab
function openImage(imageUrl) {
    window.open(imageUrl, '_blank');
}

// Function to download an image
function downloadImage(imageUrl, fileName) {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = fileName; // Set the download filename
    document.body.appendChild(link);
    link.click(); // Trigger the download
    document.body.removeChild(link); // Clean up
}

// Function to initialize the gallery
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-container figure');

    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const caption = item.querySelector('figcaption');

        // Add click event to open image in new tab
        img.addEventListener('click', () => {
            openImage(img.src);
        });

        // Add right-click event to download image
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault(); // Prevent the default context menu
            const fileName = `Image_${index + 1}.jpg`; // Custom filename
            downloadImage(img.src, fileName);
        });

        // Add hover effects
        item.addEventListener('mouseenter', () => {
            if (caption) caption.style.opacity = '1';
        });

        item.addEventListener('mouseleave', () => {
            if (caption) caption.style.opacity = '0';
        });
    });
}

// Initialize the gallery when the page loads
window.onload = initializeGallery;

/* ================== video Section - High-Level CSS ================== */

// Function to initialize the video gallery
function initializeVideoGallery() {
    const videoContainer = document.querySelector('.video-container');
    const videos = videoContainer.querySelectorAll('video');

    videos.forEach(video => {
        // Add hover effects
        video.addEventListener('mouseenter', () => {
            video.play(); // Autoplay on hover
            video.controls = true; // Show controls on hover
        });

        video.addEventListener('mouseleave', () => {
            video.pause(); // Pause on mouse leave
            video.controls = false; // Hide controls on mouse leave
        });

        // Add click event to toggle play/pause
        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    });
}

// Initialize the video gallery when the page loads
window.onload = initializeVideoGallery;

/* ================== Audio Section - High-Level CSS ================== */

// Function to initialize the audio section
function initializeAudioSection() {
    const audioPlayers = document.querySelectorAll('#audio audio');

    audioPlayers.forEach(audio => {
        // Add hover effects
        audio.addEventListener('mouseenter', () => {
            audio.style.transform = 'scale(1.1) rotateY(10deg)';
            audio.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.4)';
        });

        audio.addEventListener('mouseleave', () => {
            audio.style.transform = 'scale(1) rotateY(0)';
            audio.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
        });

        // Add click event to play/pause
        audio.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        });
    });
}

// Function to toggle dark/light theme
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark');

    // Save theme preference in localStorage
    if (body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// Function to load theme preference
function loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark');
    }
}

// Initialize the audio section and theme when the page loads
window.onload = () => {
    initializeAudioSection();
    loadTheme();
};

// Add event listener for theme toggle button (if you have one)
const themeToggleButton = document.getElementById('theme-toggle');
if (themeToggleButton) {
    themeToggleButton.addEventListener('click', toggleTheme);
}

/* ================== Projects Section - High-Level CSS ================== */

// Function to initialize project cards
function initializeProjects() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0px 8px 20px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.1)';
        });

        // Add click event to buttons
        const button = card.querySelector('.project-button');
        button.addEventListener('click', () => {
            alert(`You clicked on: ${card.querySelector('h3').innerText}`);
        });
    });
}

// Initialize projects when the page loads
window.onload = initializeProjects;

/* ================== Review Section -js ================== */
// Initialize variables
let selectedRating = 0;
let uploadedPhoto = null;

// Function to handle star rating
function initializeStarRating() {
    const stars = document.querySelectorAll('.star');

    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = star.getAttribute('data-value');
            updateStars(selectedRating);
        });

        star.addEventListener('mouseenter', () => {
            const hoverValue = star.getAttribute('data-value');
            updateStars(hoverValue);
        });

        star.addEventListener('mouseleave', () => {
            updateStars(selectedRating);
        });
    });
}

// Function to update star colors
function updateStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        if (star.getAttribute('data-value') <= rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Function to handle photo upload
function initializePhotoUpload() {
    const photoInput = document.getElementById('review-photo');
    const photoName = document.getElementById('photo-name');

    photoInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            uploadedPhoto = file;
            photoName.textContent = file.name;
        } else {
            uploadedPhoto = null;
            photoName.textContent = '';
        }
    });
}

// Function to submit review
function submitReview() {
    const reviewText = document.getElementById('review-text').value.trim();
    const reviewList = document.getElementById('review-list');

    if (!selectedRating || !reviewText) {
        alert('Please provide a rating and write a review.');
        return;
    }

    // Create a new review element
    const reviewItem = document.createElement('li');
    reviewItem.innerHTML = `
        <div class="review-content">
            <p>${reviewText}</p>
        </div>
        <div class="review-rating">
            ${'★'.repeat(selectedRating)}${'☆'.repeat(5 - selectedRating)}
        </div>
    `;

    // Add photo if uploaded
    if (uploadedPhoto) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = document.createElement('img');
            img.src = event.target.result;
            img.style.width = '50px';
            img.style.height = '50px';
            img.style.borderRadius = '8px';
            reviewItem.prepend(img);
        };
        reader.readAsDataURL(uploadedPhoto);
    }

    // Add the review to the list
    reviewList.prepend(reviewItem);

    // Reset form
    document.getElementById('review-text').value = '';
    document.getElementById('review-photo').value = '';
    document.getElementById('photo-name').textContent = '';
    selectedRating = 0;
    uploadedPhoto = null;
    updateStars(0);
}

// Initialize the review section
function initializeReviewSection() {
    initializeStarRating();
    initializePhotoUpload();
}

// Run when the page loads
window.onload = initializeReviewSection;

/* ================== Ask Question Section - js ================== */

// Function to handle form submission
function handleFormSubmission(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get form inputs
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const question = document.getElementById('question').value.trim();
    const responseMessage = document.getElementById('response-message');
    const errorMessage = document.getElementById('error-message');
    const submitButton = document.querySelector('#question-form button[type="submit"]');

    // Clear previous messages
    responseMessage.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';

    // Validate inputs
    if (!name || !email || !question) {
        showErrorMessage('Please fill out all fields.');
        return;
    }

    if (!validateEmail(email)) {
        showErrorMessage('Please enter a valid email address.');
        return;
    }

    // Show loading spinner
    submitButton.innerHTML = 'Submitting... <span class="loading-spinner"></span>';
    submitButton.disabled = true;

    // Simulate form submission (replace this with an actual API call)
    setTimeout(() => {
        // Hide loading spinner
        submitButton.innerHTML = 'Submit';
        submitButton.disabled = false;

        // Show success message
        responseMessage.style.display = 'block';
        responseMessage.textContent = 'Thank you for your question! We will get back to you soon.';

        // Reset the form
        document.getElementById('question-form').reset();
    }, 2000); // Simulate a 2-second delay for API call
}

// Function to validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to show error message
function showErrorMessage(message) {
    let errorMessage = document.getElementById('error-message');

    // Create error message element if it doesn't exist
    if (!errorMessage) {
        errorMessage = document.createElement('p');
        errorMessage.id = 'error-message';
        errorMessage.style.textAlign = 'center';
        errorMessage.style.fontSize = '1.1rem';
        errorMessage.style.color = '#e74c3c';
        errorMessage.style.fontWeight = 'bold';
        errorMessage.style.marginTop = '15px';
        errorMessage.style.fontFamily = 'Poppins, sans-serif';
        errorMessage.style.animation = 'fadeIn 0.5s ease-in-out';
        document.getElementById('ask-question').appendChild(errorMessage);
    }

    // Display the error message
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Function to add loading spinner CSS
function addLoadingSpinnerStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        .loading-spinner {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #3498db;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
            display: inline-block;
            vertical-align: middle;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize the form
function initializeForm() {
    const form = document.getElementById('question-form');
    form.addEventListener('submit', handleFormSubmission);
}

// Run when the page loads
window.onload = () => {
    initializeForm();
    addLoadingSpinnerStyles(); // Add loading spinner CSS
};

/* ================== Chat With Me Section - js ================== */
// Function to initialize the chat button
function initializeChatButton() {
    const chatButton = document.querySelector('.chat-button');

    // Add click event to open WhatsApp chat
    chatButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior

        // Get phone number from the href attribute
        const phoneNumber = chatButton.getAttribute('href').replace('https://wa.me/', '');

        // Ask user for a custom message
        const message = prompt('Enter your message:', 'Hello! I have a question.');
        const encodedMessage = encodeURIComponent(message || 'Hello! I have a question.');

        // Open WhatsApp chat with the custom message
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank'); // Open WhatsApp in a new tab

        // Track the event in analytics (if analytics is enabled)
        trackAnalytics('WhatsApp Chat Button Clicked', { phoneNumber, message });
    });

    // Add hover effects
    chatButton.addEventListener('mouseenter', () => {
        chatButton.style.transform = 'scale(1.1)';
        chatButton.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.3)';
    });

    chatButton.addEventListener('mouseleave', () => {
        chatButton.style.transform = 'scale(1)';
        chatButton.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
    });

    // Add focus effect for accessibility
    chatButton.addEventListener('focus', () => {
        chatButton.style.outline = '2px solid #25D366';
        chatButton.style.outlineOffset = '2px';
    });

    chatButton.addEventListener('blur', () => {
        chatButton.style.outline = 'none';
    });

    // Localize the button text based on user's language
    localizeChatButton();
}

// Function to track analytics
function trackAnalytics(eventName, eventData) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            event_category: 'WhatsApp Chat',
            event_label: JSON.stringify(eventData),
        });
    } else {
        console.log(`Analytics Event: ${eventName}`, eventData);
    }
}

// Function to localize the chat button text
function localizeChatButton() {
    const chatButton = document.querySelector('.chat-button');
    const language = navigator.language || 'en';

    const localizedTexts = {
        en: '💬 Chat with Me',
        hi: '💬 मुझसे चैट करें',
        es: '💬 Chatear conmigo',
        fr: '💬 Discuter avec moi',
        de: '💬 Chatte mit mir',
    };

    // Get the localized text based on the user's language
    const localizedText = localizedTexts[language.split('-')[0]] || localizedTexts.en;
    chatButton.textContent = localizedText;
}

// Run when the page loads
window.onload = initializeChatButton;

/* ================== Subscribe Section - js ================== */
// Function to handle subscription
function subscribe() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
    const messageElement = document.getElementById('subscribe-message');

    // Validate email
    if (!validateEmail(email)) {
        showMessage(messageElement, 'Please enter a valid email address.', 'error');
        shakeElement(emailInput); // Shake animation for invalid input
        return;
    }

    // Simulate subscription (replace with actual API call)
    showMessage(messageElement, 'Subscribing...', 'loading');
    setTimeout(() => {
        showMessage(messageElement, 'Thank you for subscribing!', 'success');
        emailInput.value = ''; // Clear input
    }, 2000); // Simulate a 2-second delay for API call
}

// Function to handle contact form submission
function sendEmail(event) {
    event.preventDefault(); // Prevent form submission

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    const messageElement = document.getElementById('contact-message');

    // Validate inputs
    if (!name || !email || !message) {
        showMessage(messageElement, 'Please fill out all fields.', 'error');
        shakeElement(document.getElementById('contact-form')); // Shake animation for invalid form
        return;
    }

    if (!validateEmail(email)) {
        showMessage(messageElement, 'Please enter a valid email address.', 'error');
        shakeElement(document.getElementById('contact-email')); // Shake animation for invalid email
        return;
    }

    // Simulate sending email (replace with actual API call)
    showMessage(messageElement, 'Sending your message...', 'loading');
    setTimeout(() => {
        showMessage(messageElement, 'Your message has been sent!', 'success');
        document.getElementById('contact-form').reset(); // Reset form
    }, 2000); // Simulate a 2-second delay for API call
}

// Function to validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to show messages
function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `message ${type}-message`;
    element.style.display = 'block';

    // Hide message after 5 seconds
    if (type !== 'loading') {
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
}

// Function to add shake animation
function shakeElement(element) {
    element.classList.add('shake');
    setTimeout(() => {
        element.classList.remove('shake');
    }, 500); // Shake animation duration
}

// Function to add loading spinner
function addLoadingSpinnerStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        .loading-spinner {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #3498db;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
            display: inline-block;
            vertical-align: middle;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .shake {
            animation: shake 0.5s;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);
}

// 🌟 Run when the page loads
window.onload = () => {
    addLoadingSpinnerStyles(); // ✅ Add loading spinner CSS
};

// ✅ Define email before using it
const email = "kankitkaler77021@gmail.com"; // 🔹 Replace with a valid email if needed

// ✅ Correct API request (Replace with actual API URL)
fetch('https://example.com/api/send-email', { // 🔹 Replace with a real API endpoint
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email }), // 🔹 Send email correctly
})
.then(response => {
    if (!response.ok) {
        throw new Error('Failed to fetch API');
    }
    return response.json();
})
.then(data => {
    console.log('API Response:', data); // ✅ Handle API response properly
})
.catch(error => {
    console.error('Error:', error);
});

// ✅ Store and Retrieve email correctly
if (email) {
    localStorage.setItem('email', email);
}

const savedEmail = localStorage.getItem('email');
console.log('Saved Email:', savedEmail); // ✅ Log saved email

/* ================== live date and time Section - js ================== */

// Function to handle subscription with API integration
function subscribe() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
    const messageElement = document.getElementById('subscribe-message');

    // Validate email
    if (!validateEmail(email)) {
        showMessage(messageElement, 'Please enter a valid email address.', 'error');
        shakeElement(emailInput); // Shake animation for invalid input
        return;
    }

    // Simulate subscription with API call
    showMessage(messageElement, 'Subscribing...', 'loading');
    fetch('https://your-api-endpoint.com/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showMessage(messageElement, 'Thank you for subscribing!', 'success');
            saveEmailToLocalStorage(email); // Save email to local storage
        } else {
            showMessage(messageElement, 'Subscription failed. Please try again.', 'error');
        }
    })
    .catch(error => {
        showMessage(messageElement, 'An error occurred. Please try again.', 'error');
        console.error('Error:', error);
    })
    .finally(() => {
        emailInput.value = ''; // Clear input
    });
}

// Function to handle contact form submission with API integration
function sendEmail(event) {
    event.preventDefault(); // Prevent form submission

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    const messageElement = document.getElementById('contact-message');

    // Validate inputs
    if (!name || !email || !message) {
        showMessage(messageElement, 'Please fill out all fields.', 'error');
        shakeElement(document.getElementById('contact-form')); // Shake animation for invalid form
        return;
    }

    if (!validateEmail(email)) {
        showMessage(messageElement, 'Please enter a valid email address.', 'error');
        shakeElement(document.getElementById('contact-email')); // Shake animation for invalid email
        return;
    }

    // Simulate sending email with API call
    showMessage(messageElement, 'Sending your message...', 'loading');
    fetch('https://your-api-endpoint.com/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showMessage(messageElement, 'Your message has been sent!', 'success');
        } else {
            showMessage(messageElement, 'Failed to send message. Please try again.', 'error');
        }
    })
    .catch(error => {
        showMessage(messageElement, 'An error occurred. Please try again.', 'error');
        console.error('Error:', error);
    })
    .finally(() => {
        document.getElementById('contact-form').reset(); // Reset form
    });
}

// Function to save email to local storage
function saveEmailToLocalStorage(email) {
    localStorage.setItem('subscribedEmail', email);
}

// Function to load email from local storage
function loadEmailFromLocalStorage() {
    const email = localStorage.getItem('subscribedEmail');
    if (email) {
        document.getElementById('email').value = email;
    }
}

// Function to add more animations
function addMoreAnimations() {
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        .bounce {
            animation: bounce 1s infinite;
        }
    `;
    document.head.appendChild(style);
}

// Run when the page loads
window.onload = () => {
    addLoadingSpinnerStyles(); // Add loading spinner CSS
    addMoreAnimations(); // Add more animations
    loadEmailFromLocalStorage(); // Load email from local storage
};
gtag('event', 'click', { 'event_category': 'Subscription', 'event_label': 'Subscribe Button' });
localStorage.setItem('userName', name);
const savedName = localStorage.getItem('userName');

/* ==================  Footer Section - js ================== */
// 🌟 Live Time Update
function updateLiveTime() {
    const liveTimeElement = document.getElementById('liveTime');
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true 
    };
    const formattedTime = now.toLocaleString('en-IN', options);
    liveTimeElement.textContent = formattedTime;
}

// Update time every second
setInterval(updateLiveTime, 1000);
updateLiveTime(); // Initial call

// 🌍 Weather API Integration
function fetchWeather() {
    const apiKey = 'abc123xyz'; // 🔹 Replace with your actual OpenWeatherMap API key
    const city = 'Jhunjhunu';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not available.');
            }
            return response.json();
        })
        .then(data => {
            const weatherElement = document.getElementById('weather');
            if (data.weather && data.main) {
                const weatherDescription = data.weather[0].description;
                const temperature = data.main.temp;
                const humidity = data.main.humidity;
                weatherElement.innerHTML = `
                    <p>🌤️ Weather: ${weatherDescription}</p>
                    <p>🌡️ Temperature: ${temperature}°C</p>
                    <p>💧 Humidity: ${humidity}%</p>
                `;
            } else {
                weatherElement.textContent = 'Weather data not available.';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather').textContent = 'Failed to load weather.';
        });
}

// ✅ Call function to load weather data when the page loads
document.addEventListener('DOMContentLoaded', fetchWeather);

// Fetch weather on page load
fetchWeather();

// 📱 QR Code Interaction
document.querySelectorAll('.scanner').forEach(scanner => {
    scanner.addEventListener('click', () => {
        const link = scanner.getAttribute('data-link');
        if (link) {
            window.open(link, '_blank');
        }
    });
});

// 🖋️ Typing Animation for Footer Text
function typeText(element, text, speed) {
    let i = 0;
    const typingInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
        }
    }, speed);
}

const typingTextElement = document.querySelector('.typing-text');
const textToType = "Made with ❤️ by Ankit Kaler";
typeText(typingTextElement, textToType, 100);

// 🎯 Smooth Scroll to Sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 🔗 Social Media Link Hover Effects
document.querySelectorAll('.social-icons a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'scale(1.2)';
        link.style.backgroundColor = '#ffcc00';
    });
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'scale(1)';
        link.style.backgroundColor = '#ff4757';
    });
});

// 📱 Responsive Design Adjustments
window.addEventListener('resize', () => {
    const footerSections = document.querySelectorAll('.footer-section');
    if (window.innerWidth <= 768) {
        footerSections.forEach(section => {
            section.style.minWidth = '100%';
        });
    } else {
        footerSections.forEach(section => {
            section.style.minWidth = '300px';
        });
    }
});
