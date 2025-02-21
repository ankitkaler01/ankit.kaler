document.addEventListener("DOMContentLoaded", function () {
    // ✅ Get user's name from localStorage or prompt
    let userName = localStorage.getItem('userName') || prompt("Enter your name:");
    if (!userName) userName = "Guest"; // Default name

    // ✅ Time-based greeting logic
    const hour = new Date().getHours();
    let greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

    // ✅ Speak welcome message
    speak(`${greeting}, ${userName}. Welcome to my digital world!`);

    // ✅ Display welcome message on the screen
    const welcomeMessage = document.getElementById('welcome-message');
    if (welcomeMessage) welcomeMessage.textContent = `${greeting}, ${userName}. Welcome to my digital world!`;

    // ✅ Dark Mode / Light Mode Toggle
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle?.addEventListener("click", function () {
        document.body.classList.toggle("dark");
        document.body.classList.toggle("light");
        localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    });

    // ✅ Load saved theme preference
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.add(savedTheme);

    // ✅ Logo Hover Effect with Animation
    const logo = document.querySelector(".logo-container img");
    if (logo) {
        logo.addEventListener("mouseover", () => logo.style.transform = "rotateY(360deg) scale(1.3)");
        logo.addEventListener("mouseout", () => logo.style.transform = "rotateY(0deg) scale(1)");
    }

    // ✅ Profile Photo Zoom on Click
    const profilePhoto = document.querySelector(".profile-photo");
    if (profilePhoto) {
        profilePhoto.addEventListener("click", function () {
            const newWindow = window.open("", "_blank");
            newWindow.document.write(`
                <html>
                <head>
                    <title>Enlarged Profile Photo</title>
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
    
                    <img src="${profilePhoto.src}" alt="Large Profile Photo">
        
            `);
        });
    }

    // ✅ QR Code Generation
    const qrContainer = document.getElementById("qrcode");
    if (qrContainer) {
        const qrCodeURL = "https://www.instagram.com/ankit_kaler_01";
        const qrCode = new QRCode(qrContainer, {
            text: qrCodeURL,
            width: 80,
            height: 80,
            colorDark: "#000",
            colorLight: "#fff",
            correctLevel: QRCode.CorrectLevel.H
        });

        // Double Click to Open QR Code Link
        let qrClickCount = 0;
        qrContainer.addEventListener("click", function () {
            qrClickCount++;
            if (qrClickCount === 2) {
                window.open(qrCodeURL, "_blank");
                qrClickCount = 0;
            }
            setTimeout(() => qrClickCount = 0, 500);
        });
    }

    // ✅ Typing Animation
    const typingElement = document.querySelector(".typing-text");
    if (typingElement) {
        const textArray = [
            "🚀 आपका स्वागत है मेरे पोर्टफोलियो में!",
            "🌟 Welcome to My Digital World 🌟",
            "Ankit Kaler",
            "Explore My Work"
        ];
        let textIndex = 0, charIndex = 0, isDeleting = false;

        function typeText() {
            const currentText = textArray[textIndex];
            if (!isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentText.length) {
                    isDeleting = true;
                    setTimeout(typeText, 1200);
                } else setTimeout(typeText, 80);
            } else {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % textArray.length;
                }
                setTimeout(typeText, 50);
            }
        }
        typeText();
    }

    // ✅ Live Digital Clock
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        const liveTime = document.getElementById("live-time");
        if (liveTime) liveTime.textContent = `🕒 ${timeString}`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // ✅ Voice Assistant
    let isAssistantActive = true;
    const voiceButton = document.getElementById("voice-command");
    if (voiceButton) {
        voiceButton.addEventListener("click", startVoiceAssistant);
    }

    function startVoiceAssistant() {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.start();

        recognition.onresult = function (event) {
            const command = event.results[0][0].transcript.toLowerCase();
            handleVoiceCommand(command);
        };

        recognition.onend = function () {
            speak("Voice assistant deactivated.");
        };
    }

    function handleVoiceCommand(command) {
        if (command.includes("home")) document.querySelector('a[href="#home"]').click();
        else if (command.includes("about")) document.querySelector('a[href="#about"]').click();
        else if (command.includes("linkedin")) window.open("https://www.linkedin.com/in/ankit-kaler", "_blank");
        else if (command.includes("search")) {
            const query = command.replace("search", "").trim();
            if (query) window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
        }
    }

    // ✅ Toggle Sidebar Menu
    function toggleMenu() {
        const sidebar = document.getElementById("sidebar");
        sidebar.classList.toggle("active");
    }

    // ✅ Close Sidebar on Outside Click
    document.addEventListener("click", function (event) {
        const sidebar = document.getElementById("sidebar");
        const hamburger = document.querySelector(".hamburger-menu");
        if (sidebar.classList.contains("active") && !sidebar.contains(event.target) && !hamburger.contains(event.target)) {
            sidebar.classList.remove("active");
        }
    });

    // ✅ Auto-Switch Profile Photos
    const profileImages = [
        "image/Ankit.jpg",
        "image/ak1.jpg"
    ];
    let currentIndex = 0;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % profileImages.length;
        if (profilePhoto) {
            profilePhoto.classList.add("jump-animation");
            setTimeout(() => {
                profilePhoto.src = profileImages[currentIndex];
                profilePhoto.classList.remove("jump-animation");
            }, 500);
        }
    }, 5000);

    // ✅ Speak Function
    function speak(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    }
});