// ✅ Consolidated JavaScript Code for Ankit Kaler's Website

// ✅ 3D Rotating Logo Effect
const logo = document.getElementById("rotating-logo");
if (logo) {
    logo.addEventListener("mouseenter", () => {
        logo.style.transform = "scale(1.2) rotateY(720deg)";
        logo.style.transition = "transform 1s ease-in-out";
    });
    
    logo.addEventListener("mouseleave", () => {
        logo.style.transform = "rotateY(0deg)";
        logo.style.transition = "transform 5s linear infinite";
    });
}

// ✅ Logo Hover Effect with Animation
const logoImg = document.querySelector(".logo-container img");
if (logoImg) {
    logoImg.addEventListener("mouseover", () => {
        logoImg.style.transform = "rotateY(360deg) scale(1.3)";
    });
    logoImg.addEventListener("mouseout", () => {
        logoImg.style.transform = "rotateY(0deg) scale(1)";
    });
}

// ✅ Typing Animation (Multi-Language)
const typingTexts = [
    "🌟 Welcome to My Digital World! 🌟",
    "🌟 आपका स्वागत है! 🌟",
    "🌟 Explore My Website! 🌟"
];
let typingIndex = 0;
let charIndex = 0;
const typingElement = document.querySelector(".typing-text");

if (typingElement) {
    function typeEffect() {
        if (charIndex < typingTexts[typingIndex].length) {
            typingElement.textContent += typingTexts[typingIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 100);
        } else {
            setTimeout(eraseEffect, 2000);
        }
    }
    
    function eraseEffect() {
        if (charIndex > 0) {
            typingElement.textContent = typingTexts[typingIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseEffect, 50);
        } else {
            typingIndex = (typingIndex + 1) % typingTexts.length;
            setTimeout(typeEffect, 500);
        }
    }
    
    document.addEventListener("DOMContentLoaded", typeEffect);
} else {
    console.error("Error: '.typing-text' element not found!");
}

// ✅ Responsive Hamburger Menu
function toggleMenu() {
    let sidebar = document.getElementById("sidebar");
    if (sidebar) {
        sidebar.classList.toggle("active");
    }
}

// ✅ Profile Photo Rotation
let profilePhotos = document.querySelectorAll(".profile-photo");
let index = 0;
setInterval(() => {
    profilePhotos.forEach((img, i) => {
        img.style.opacity = i === index ? "1" : "0";
    });
    index = (index + 1) % profilePhotos.length;
}, 2000);

// ✅ Profile Photo Zoom on Click
const profilePhoto = document.querySelector(".profile-photo");
if (profilePhoto) {
    profilePhoto.addEventListener("click", function () {
        const newWindow = window.open("", "_blank");
        newWindow.document.write(`<img src="${this.src}" style="width:100%;height:100%;">`);
    });
}

// ✅ Sidebar Toggle Functionality
function toggleMenu() {
    let sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");

    // ✅ Lock body scroll when sidebar is open
    if (sidebar.classList.contains("active")) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
}

// ✅ Close Sidebar on Click Outside
document.addEventListener("click", function(event) {
    let sidebar = document.getElementById("sidebar");
    let hamburger = document.querySelector(".hamburger-menu");

    if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
        sidebar.classList.remove("active");
        document.body.style.overflow = "auto"; // ✅ Re-enable body scroll
    }
});

// ✅ Touch Swipe to Open/Close Sidebar (Mobile Support)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", function(event) {
    touchStartX = event.touches[0].clientX;
});

document.addEventListener("touchend", function(event) {
    touchEndX = event.changedTouches[0].clientX;
    let sidebar = document.getElementById("sidebar");

    if (touchStartX < 50 && touchEndX > touchStartX + 50) {
        sidebar.classList.add("active"); // 👉 Left to Right Swipe (Open Menu)
        document.body.style.overflow = "hidden"; // ✅ Lock body scroll
    }
    if (touchStartX > 50 && touchEndX < touchStartX - 50) {
        sidebar.classList.remove("active"); // 👉 Right to Left Swipe (Close Menu)
        document.body.style.overflow = "auto"; // ✅ Re-enable body scroll
    }
});

// ✅ Live Time Update
function updateLiveTime() {
    let timeElement = document.getElementById("live-time");
    let now = new Date();
    let timeString = now.toLocaleTimeString();
    timeElement.innerText = `🕒 ${timeString}`;
}
setInterval(updateLiveTime, 1000);
updateLiveTime();

// ✅ Voice Assistant (Advanced Implementation)
let recognition;
let isListening = false;
let currentLanguage = 'english'; // Default language
let userName = "";

// ✅ Voice Command List
const commands = {
    home: ['home', 'ghar', 'main menu', 'mukhya menu', 'start', 'shuru'],
    about: ['about', 'about me', 'mera parichay', 'introduction'],
    gallery: ['gallery', 'photo gallery', 'image gallery'],
    videos: ['videos', 'watch videos', 'video library'],
    audio: ['audio', 'listen audio', 'audio library'],
    projects: ['projects', 'my projects', 'project list'],
    review: ['review', 'leave a review', 'feedback'],
    question: ['question', 'ask a question', 'sawal'],
    message: ['message', 'send message', 'contact message'],
    contact: ['contact', 'contact me', 'contact details'],
    dark_mode: ['dark mode', 'night mode', 'dark theme'],
    light_mode: ['light mode', 'day mode', 'light theme']
};

// ✅ Start Voice Assistant
function startVoiceAssistant() {
    if (!('webkitSpeechRecognition' in window)) {
        alert('⚠️ Your browser does not support voice assistant. Please use Chrome.');
        return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = currentLanguage === 'hindi' ? 'hi-IN' : 'en-US';

    recognition.onstart = () => {
        isListening = true;
        speak(currentLanguage === 'hindi' ? '🎤 सुन रहा हूँ...' : '🎤 Listening...');
    };

    recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
        handleVoiceCommand(transcript);
    };

    recognition.onerror = (event) => {
        console.error('⚠️ Voice Recognition Error:', event.error);
        speak(currentLanguage === 'hindi' ? 'त्रुटि हुई। कृपया पुनः प्रयास करें।' : 'An error occurred. Please try again.');
    };

    recognition.onend = () => {
        isListening = false;
        speak(currentLanguage === 'hindi' ? '🎤 सुनना बंद कर दिया।' : '🎤 Stopped listening.');
    };

    recognition.start();
}

// ✅ Handle Voice Commands
function handleVoiceCommand(transcript) {
    let commandFound = false;

    for (const [command, aliases] of Object.entries(commands)) {
        if (aliases.some(alias => transcript.includes(alias))) {
            commandFound = true;
            executeCommand(command);
            break;
        }
    }

    if (!commandFound) {
        speak(currentLanguage === 'hindi' ? '⚠️ मुझे समझ में नहीं आया। कृपया सही कमांड बोलें।' : '⚠️ I did not understand. Please try again.');
        setTimeout(suggestCommands, 2000); // Suggest commands after 2 seconds
    }
}

// ✅ Execute Voice Commands
function executeCommand(command) {
    switch (command) {
        case 'home':
            navigateToSection('#home', 'आप होम पेज पर जा रहे हैं।', 'Navigating to the home page');
            break;
        case 'about':
            navigateToSection('#about', 'आप मेरे बारे में जानकारी देख रहे हैं।', 'Navigating to the about page');
            break;
        case 'gallery':
            navigateToSection('#gallery', 'गैलरी खोली जा रही है।', 'Opening the gallery');
            break;
        case 'videos':
            navigateToSection('#videos', 'वीडियो खोले जा रहे हैं।', 'Opening the videos');
            break;
        case 'audio':
            navigateToSection('#audio', 'ऑडियो चलाया जा रहा है।', 'Playing audio');
            break;
        case 'projects':
            navigateToSection('#projects', 'प्रोजेक्ट्स दिखाए जा रहे हैं।', 'Displaying projects');
            break;
        case 'review':
            navigateToSection('#review', 'रिव्यु सेक्शन खोला जा रहा है।', 'Opening the review section');
            break;
        case 'question':
            navigateToSection('#ask-question', 'प्रश्न सेक्शन खोला जा रहा है।', 'Opening the question section');
            break;
        case 'message':
            navigateToSection('#message', 'संदेश सेक्शन खोला जा रहा है।', 'Opening the message section');
            break;
        case 'contact':
            navigateToSection('#contact', 'संपर्क सेक्शन खोला जा रहा है।', 'Opening the contact section');
            break;
        case 'dark_mode':
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
            speak(currentLanguage === 'hindi' ? '🌙 डार्क मोड चालू कर दिया गया।' : '🌙 Dark mode enabled.');
            break;
        case 'light_mode':
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
            speak(currentLanguage === 'hindi' ? '☀️ लाइट मोड चालू कर दिया गया।' : '☀️ Light mode enabled.');
            break;
        default:
            speak(currentLanguage === 'hindi' ? '⚠️ कमांड नहीं मिला।' : '⚠️ Command not found.');
    }
}

// ✅ Navigate to Section with Smooth Scroll
function navigateToSection(sectionId, hindiMessage, englishMessage) {
    speak(currentLanguage === 'hindi' ? hindiMessage : englishMessage);
    document.querySelector(sectionId).scrollIntoView({ behavior: "smooth" });
    history.pushState(null, null, sectionId);
}

// ✅ Speak Text with Advanced Settings
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLanguage === 'hindi' ? 'hi-IN' : 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1.2;
    utterance.volume = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
}

// ✅ Suggest Commands on Incorrect Input
function suggestCommands() {
    const suggestions = [
        "Try saying: 'Go to Home', 'Open Gallery', 'Enable Dark Mode'",
        "Try: 'Navigate to About', 'Play Videos', 'Switch to Light Mode'",
        "Example Commands: 'Show Projects', 'Contact Me', 'Leave a Review'"
    ];
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    speak(randomSuggestion);
}

// ✅ Voice Assistant Button Event Listener
document.getElementById('voice-command').addEventListener('click', () => {
    if (!isListening) {
        startVoiceAssistant();
    } else {
        recognition.stop();
        speak(currentLanguage === 'hindi' ? '🎤 सुनना बंद कर दिया गया।' : '🎤 Stopped listening.');
    }
});

// ✅ Dynamic Quotes System
const quotes = [
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Ankit Kaler" },
    { text: "Dream big, work hard, stay focused, and surround yourself with good people.", author: "Ankit Kaler" },
    { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Ankit Kaler" }
];
function setRandomQuote() {
    let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById("quote-text").textContent = `"${randomQuote.text}"`;
    document.getElementById("quote-author").textContent = `- ${randomQuote.author}`;
}
setRandomQuote();

// ✅ Double Click Opens a New Page, Triple Click Returns to Main Page
let clickCount = 0;
document.getElementById("home").addEventListener("click", function() {
    clickCount++;
    setTimeout(() => { clickCount = 0; }, 800);

    if (clickCount === 2) {
        window.open("newpage.html", "_blank");
    } else if (clickCount === 3) {
        window.location.href = "index.html";
    }
});

// ✅ Particle Animation
const particles = document.getElementById("particles");
const ctx = particles.getContext("2d");
particles.width = window.innerWidth;
particles.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 100; i++) {
    stars.push({
        x: Math.random() * particles.width,
        y: Math.random() * particles.height,
        radius: Math.random() * 2,
        speedX: Math.random() * 0.5,
        speedY: Math.random() * 0.5
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, particles.width, particles.height);
    ctx.fillStyle = "white";
    for (let i = 0; i < stars.length; i++) {
        ctx.beginPath();
        ctx.arc(stars[i].x, stars[i].y, stars[i].radius, 0, Math.PI * 2);
        ctx.fill();
        stars[i].x += stars[i].speedX;
        stars[i].y += stars[i].speedY;
        if (stars[i].x > particles.width || stars[i].y > particles.height) {
            stars[i].x = Math.random() * particles.width;
            stars[i].y = Math.random() * particles.height;
        }
    }
    requestAnimationFrame(drawParticles);
}
drawParticles();

// ✅ Like Button Functionality
document.querySelectorAll(".like-btn").forEach(button => {
    button.addEventListener("click", function () {
        button.classList.toggle("liked");
        let likeCount = button.previousElementSibling;
        let count = parseInt(likeCount.textContent.replace("k", "000"));

        count = button.classList.contains("liked") ? count + 1 : count - 1;
        likeCount.textContent = count >= 1000 ? (count / 1000).toFixed(1) + "k" : count;
    });
});

// ✅ Fullscreen Image Viewer
let fullScreenViewer = document.getElementById("fullScreenViewer");
let fullScreenImage = document.getElementById("fullScreenImage");
let closeBtn = document.getElementById("closeViewer");
let prevBtn = document.querySelector(".prev-btn");
let nextBtn = document.querySelector(".next-btn");
let images = Array.from(document.querySelectorAll(".gallery-item img"));
let currentIndex = 0;
let clickTimer = null;

// ✅ Open Image in Fullscreen (Single Click) + Open in New Tab (Double Click)
document.querySelectorAll(".gallery-item img").forEach((image, index) => {
    image.addEventListener("click", function () {
        if (clickTimer === null) {
            clickTimer = setTimeout(() => {
                clickTimer = null;
                openImageInFullScreen(index);
            }, 300); // Delay to detect double-click
        } else {
            clearTimeout(clickTimer);
            clickTimer = null;
            window.open(image.src, "_blank"); // Double Click for New Tab
        }
    });
});

function openImageInFullScreen(index) {
    currentIndex = index;
    fullScreenImage.src = images[currentIndex].src;
    fullScreenViewer.style.display = "flex";
    fullScreenImage.classList.add("zoom-effect");
    document.body.style.overflow = "hidden"; // Disable scrolling
}

// ✅ Close Fullscreen Viewer
closeBtn.addEventListener("click", function () {
    fullScreenViewer.style.display = "none";
    document.body.style.overflow = "auto"; // Enable scrolling
    window.location.href = "#gallery"; // Redirect to main page
});

// ✅ Keyboard Navigation
document.addEventListener("keydown", function (event) {
    if (fullScreenViewer.style.display === "flex") {
        if (event.key === "Escape") {
            fullScreenViewer.style.display = "none";
            document.body.style.overflow = "auto";
        } else if (event.key === "ArrowRight") {
            currentIndex = (currentIndex + 1) % images.length;
            fullScreenImage.src = images[currentIndex].src;
        } else if (event.key === "ArrowLeft") {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            fullScreenImage.src = images[currentIndex].src;
        }
    }
});

// ✅ Navigation Buttons
prevBtn.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    fullScreenImage.src = images[currentIndex].src;
});

nextBtn.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % images.length;
    fullScreenImage.src = images[currentIndex].src;
});

// ✅ Fast Reload Functionality
function fastReload() {
    window.location.reload(true);
}

// Optional: Add a button for fast reload
let reloadButton = document.createElement("button");
reloadButton.textContent = "🔄 Fast Reload";
reloadButton.style.position = "fixed";
reloadButton.style.bottom = "20px";
reloadButton.style.right = "20px";
reloadButton.style.padding = "10px 20px";
reloadButton.style.backgroundColor = "#007BFF";
reloadButton.style.color = "#fff";
reloadButton.style.border = "none";
reloadButton.style.borderRadius = "5px";
reloadButton.style.cursor = "pointer";
reloadButton.addEventListener("click", fastReload);
document.body.appendChild(reloadButton);

// ✅ Star Rating System with Hover Effect
let selectedRating = 0;

document.querySelectorAll(".star").forEach(star => {
    star.addEventListener("mouseover", function () {
        let value = this.getAttribute("data-value");
        highlightStars(value);
    });

    star.addEventListener("mouseout", function () {
        highlightStars(selectedRating);
    });

    star.addEventListener("click", function () {
        selectedRating = this.getAttribute("data-value");
        document.getElementById("rating-value").textContent = `(${selectedRating}/5)`;
    });
});

function highlightStars(value) {
    document.querySelectorAll(".star").forEach(s => {
        s.style.color = s.getAttribute("data-value") <= value ? "gold" : "gray";
    });
}

// ✅ Show Selected Photo Name and Preview
document.getElementById("review-photo").addEventListener("change", function () {
    let file = this.files[0];
    if (file) {
        document.getElementById("photo-name").textContent = file.name;
        let img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.style.width = "80px";
        img.style.borderRadius = "5px";
        img.style.marginTop = "5px";
        document.getElementById("photo-preview").innerHTML = "";
        document.getElementById("photo-preview").appendChild(img);
    }
});

// ✅ Submit Review Function
function submitReview() {
    let reviewText = document.getElementById("review-text").value.trim();
    let fileInput = document.getElementById("review-photo");
    let reviewList = document.getElementById("review-list");

    if (reviewText === "") {
        alert("Please write a review before submitting.");
        return;
    }

    // 📝 Create Review Item
    let li = document.createElement("li");
    li.classList.add("review-item");
    li.innerHTML = `<strong>⭐ (${selectedRating}/5) User:</strong> ${reviewText}`;

    // 📷 If Photo is Uploaded
    if (fileInput.files.length > 0) {
        let img = document.createElement("img");
        img.src = URL.createObjectURL(fileInput.files[0]);
        img.style.width = "80px";
        img.style.borderRadius = "5px";
        img.style.marginLeft = "10px";
        li.appendChild(img);
    }

    // 🆕 Add Review to List
    reviewList.appendChild(li);

    // ✅ Clear Inputs
    document.getElementById("review-text").value = "";
    fileInput.value = "";
    document.getElementById("photo-name").textContent = "No file chosen";
    document.getElementById("photo-preview").innerHTML = "";
    selectedRating = 0;
    highlightStars(0);
    document.getElementById("rating-value").textContent = "(0/5)";
}

// ✅ Typing Effect Function
const typingText = document.querySelector(".typing-text");
const words = ["Designed by Ankit Kaler", "Developed with ❤️", "Creative & Innovative"];
let wordIndex = 0;
let charIndex = 0;

function typeEffect() {
    if (charIndex < words[wordIndex].length) {
        typingText.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 100);
    } else {
        setTimeout(() => {
            typingText.textContent = "";
            charIndex = 0;
            wordIndex = (wordIndex + 1) % words.length;
            typeEffect();
        }, 2000);
    }
}

// ✅ Initialize Typing Effect
window.onload = function () {
    typeEffect();

    // 🚀 Remove Unused Scripts After 3 Seconds
    setTimeout(() => {
        let unusedScripts = document.querySelectorAll('script[unused]');
        unusedScripts.forEach(script => script.remove());
    }, 3000);
};