const cursor = document.getElementById("sportsCursor");
const sports = ["⚽", "🏐", "🏀", "🏏", "🏓", "🎯", "🥋"];
let index = 0;
document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

setInterval(() => {
    index = (index + 1) % sports.length;
    cursor.innerHTML = sports[index];
}, 2500);

const screens = document.querySelectorAll(".screen");

function showScreen(id) {
    window.location.hash = id;
}

function handleRouting() {
    const id = window.location.hash.replace("#", "") || "screen1";
    const target = document.getElementById(id);
    if (target && screens.length > 0) {
        screens.forEach(screen => {
            screen.classList.remove("active");
        });
        target.classList.add("active");
    }
}

window.addEventListener("hashchange", handleRouting);
window.addEventListener("load", () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.get("t")) {
        if (!window.location.hash) {
            window.location.hash = "screen1";
        } else {
            handleRouting();
        }
    }
});

let selectedPrice = 150000;
let selectedVenue = "Football Arena";

const cards = document.querySelectorAll(".venue-card");

cards.forEach(card => {
    card.addEventListener("click", () => {
        cards.forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        selectedPrice = parseInt(card.dataset.price);
        selectedVenue = card.querySelector("h3").innerText;
        updateSplit();
    });
});

document.getElementById("nextBtn").addEventListener("click", () => {
    showScreen("screen1-time");
});


// Default to today
const dateInput = document.getElementById("matchDate");
const timeInput = document.getElementById("matchTime");

const now = new Date();
const localDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
dateInput.value = localDate;
timeInput.value = "18:00";

let selectedDate = dateInput.value;
let selectedTime = timeInput.value;

document.getElementById("nextBtnTime").addEventListener("click", () => {
    if (!dateInput.value || !timeInput.value) {
        alert("Please select a date and time");
        return;
    }
    selectedDate = dateInput.value;
    selectedTime = timeInput.value;
    showScreen("screen2");
});
// DOM Targets for Modals
const calendarModal = document.getElementById("calendarModal");
const timeModal = document.getElementById("timeModal");
const calendarDaysGrid = document.getElementById("calendarDays");
const calendarMonthYearLabel = document.getElementById("calendarMonthYear");

let currentCalendarDate = new Date();

// Convert dynamic string dates into clean (DD-MM-YYYY) presentation values
function formatDisplayDate(dateStr) {
    if (!dateStr) return "Select Date";
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
}

/* --- CALENDAR GENERATION LOGIC --- */
function renderCustomCalendar() {
    calendarDaysGrid.innerHTML = "";
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();

    const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    calendarMonthYearLabel.innerText = `${monthsArray[month]} ${year}`;

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    // Empty spacer blocks
    for (let i = 0; i < firstDayIndex; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("calendar-day", "empty");
        calendarDaysGrid.appendChild(emptyCell);
    }

    // Fill days
    for (let day = 1; day <= totalDaysInMonth; day++) {
        const dayCell = document.createElement("div");
        dayCell.classList.add("calendar-day");
        dayCell.innerText = day;

        const formatMonth = String(month + 1).padStart(2, '0');
        const formatDay = String(day).padStart(2, '0');
        const combinedIsoDate = `${year}-${formatMonth}-${formatDay}`;

        if (combinedIsoDate === selectedDate) {
            dayCell.classList.add("active-day");
        }

        dayCell.addEventListener("click", () => {
            selectedDate = combinedIsoDate;
            dateInput.value = combinedIsoDate;
            calendarModal.classList.remove("open");
        });

        calendarDaysGrid.appendChild(dayCell);
    }
}

// Calendar Month Browsing Controllers
document.getElementById("prevMonth").addEventListener("click", () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    renderCustomCalendar();
});
document.getElementById("nextMonth").addEventListener("click", () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    renderCustomCalendar();
});

/* --- TIME PICKER MODAL CYCLES --- */
let tempHour = 18,
    tempMin = 0;
const hourDisplay = document.getElementById("hourDisplay");
const minDisplay = document.getElementById("minDisplay");

function updateTimePickerDisplays() {
    hourDisplay.innerText = String(tempHour).padStart(2, '0');
    minDisplay.innerText = String(tempMin).padStart(2, '0');
}

document.getElementById("hourUp").addEventListener("click", () => {
    tempHour = (tempHour + 1) % 24;
    updateTimePickerDisplays();
});
document.getElementById("hourDown").addEventListener("click", () => {
    tempHour = (tempHour - 1 + 24) % 24;
    updateTimePickerDisplays();
});
document.getElementById("minUp").addEventListener("click", () => {
    tempMin = (tempMin + 5) % 60;
    updateTimePickerDisplays();
}); // Steps by 5m
document.getElementById("minDown").addEventListener("click", () => {
    tempMin = (tempMin - 5 + 60) % 60;
    updateTimePickerDisplays();
});
// AM & PM toggles click binds
amBtn.addEventListener("click", () => {
    tempAmPm = "AM";
    updateTimePickerDisplays();
});
pmBtn.addEventListener("click", () => {
    tempAmPm = "PM";
    updateTimePickerDisplays();
});

// Confirm Entry Time Action
document.getElementById("confirmTimeBtn").addEventListener("click", () => {
    let hour24 = tempHour12;
    if (tempAmPm === "PM" && hour24 !== 12) hour24 += 12;
    if (tempAmPm === "AM" && hour24 === 12) hour24 = 0;

    selectedTime24 = `${String(hour24).padStart(2, '0')}:${String(tempMin).padStart(2, '0')}`;
    timeInput.value = formatDisplayTime(selectedTime24); // Renders nicely with AM/PM text indicator on right side
    timeModal.classList.remove("open");
});

// Close popup click binders
document.getElementById("closeTime").addEventListener("click", () => timeModal.classList.remove("open"));
window.addEventListener("click", (e) => {
    if (e.target === timeModal) timeModal.classList.remove("open");
});
document.getElementById("confirmTimeBtn").addEventListener("click", () => {
    selectedTime = `${String(tempHour).padStart(2, '0')}:${String(tempMin).padStart(2, '0')}`;
    timeInput.value = selectedTime;
    timeModal.classList.remove("open");
});

/* --- INTERCEPT CLICKS ON THE MAIN DETETIME PICKER FIELDS --- */
dateInput.addEventListener("click", (e) => {
    e.preventDefault(); // Stop native calendar picker popups
    currentCalendarDate = selectedDate ? new Date(selectedDate) : new Date();
    renderCustomCalendar();
    calendarModal.classList.add("open");
});

timeInput.addEventListener("click", (e) => {
    e.preventDefault(); // Stop native picker popups
    const parts = selectedTime.split(":");
    tempHour = parseInt(parts[0]) || 18;
    tempMin = parseInt(parts[1]) || 0;
    updateTimePickerDisplays();
    timeModal.classList.add("open");
});

// Close buttons listeners
document.getElementById("closeCalendar").addEventListener("click", () => calendarModal.classList.remove("open"));
document.getElementById("closeTime").addEventListener("click", () => timeModal.classList.remove("open"));

// Close modals when clicking the ambient overlay background area
window.addEventListener("click", (e) => {
    if (e.target === calendarModal) calendarModal.classList.remove("open");
    if (e.target === timeModal) timeModal.classList.remove("open");
});

/* --- CONTINUE TO ROUTING TRIGGER --- */
document.getElementById("nextBtnTime").addEventListener("click", () => {
    if (!dateInput.value || !timeInput.value) {
        alert("Please select a date and time");
        return;
    }
    selectedDate = dateInput.value;
    selectedTime = timeInput.value;
    showScreen("screen2");
});
/*=====================================================*/
// A. Use "Event Delegation" to handle ALL checkboxes (even the new ones)
const addFriendModal = document.getElementById("addFriendModal");
const addFriendBtn = document.getElementById("addFriendBtn");
const closeAddFriendBtn = document.getElementById("closeAddFriend");
const confirmAddFriendBtn = document.getElementById("confirmAddFriendBtn");
const friendNameInput = document.getElementById("friendNameInput");
const friendNameError = document.getElementById("friendNameError");
const friendList = document.querySelector(".friend-list");

// Show Add Friend Modal
addFriendBtn.addEventListener("click", () => {
    friendNameInput.value = "";
    friendNameError.style.display = "none";
    addFriendModal.classList.add("open");
    friendNameInput.focus();
});

// Close Add Friend Modal
closeAddFriendBtn.addEventListener("click", () => {
    addFriendModal.classList.remove("open");
});

// Helper function to add a friend item
function addPlayerToDOM(name) {
    // Remove placeholder if present
    const placeholder = friendList.querySelector(".empty-friends-placeholder");
    if (placeholder) {
        placeholder.remove();
    }

    const friendItem = document.createElement("div");
    friendItem.className = "friend-item";
    friendItem.innerHTML = `
        <label class="friend-label">
            <input type="checkbox" value="${name}" checked>
            <span>${name}</span>
        </label>
        <button class="remove-friend-btn" title="Remove Player">×</button>
    `;

    // Add remove button listener
    friendItem.querySelector(".remove-friend-btn").addEventListener("click", () => {
        friendItem.remove();
        checkEmptyFriendsState();
        updateSplit();
    });

    friendList.appendChild(friendItem);
    updateSplit();
}

// Check if friend list is empty and render placeholder
function checkEmptyFriendsState() {
    const activeFriends = friendList.querySelectorAll(".friend-item");
    if (activeFriends.length === 0) {
        friendList.innerHTML = `
            <div class="empty-friends-placeholder">
                <div style="font-size: 40px; margin-bottom: 12px;">👥</div>
                <p style="font-size: 14px; font-weight: 500;">No players added yet.</p>
                <p style="font-size: 12px; color: #64748b; margin-top: 4px;">Click "Add New +" above to build your lineup.</p>
            </div>
        `;
    }
}

// Handle Add Friend Confirmation
function submitAddFriend() {
    const name = friendNameInput.value.trim();
    if (!name) {
        friendNameError.innerText = "Please enter a player name.";
        friendNameError.style.display = "block";
        return;
    }

    // Check if name is already added
    const existingNames = Array.from(friendList.querySelectorAll(".friend-label span")).map(span => span.innerText.toLowerCase());
    if (existingNames.includes(name.toLowerCase())) {
        friendNameError.innerText = "This player is already in your lineup.";
        friendNameError.style.display = "block";
        return;
    }

    addPlayerToDOM(name);
    addFriendModal.classList.remove("open");
}

confirmAddFriendBtn.addEventListener("click", submitAddFriend);

friendNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        submitAddFriend();
    }
});

function updateSplit() {
    let players = 1;
    const checkboxes = friendList.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(box => {
        if (box.checked) {
            players++;
        }
    });
    document.getElementById("playerCount").innerText = players;
    document.getElementById("splitAmount").innerText = Math.floor(selectedPrice / players);
}

// Event Delegation on friendList for checkbox changes
friendList.addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
        updateSplit();
    }
});

// Close on clicking overlay
window.addEventListener("click", (e) => {
    if (e.target === addFriendModal) {
        addFriendModal.classList.remove("open");
    }
});

// Initial placeholder state check
checkEmptyFriendsState();

document.getElementById("paymentBtn").addEventListener("click", () => {
    let players = document.getElementById("playerCount").innerText;
    let amount = document.getElementById("splitAmount").innerText;
    document.getElementById("venueName").innerText = selectedVenue;
    document.getElementById("finalPlayers").innerText = players;
    document.getElementById("finalAmount").innerText = amount;
    showScreen("screen3");
});
/*=====================================================*/
let generatedLink = "";
const linkBox = document.querySelector(".link-box");

/* --- Helper Utilities for Ultra-Short URLs --- */
async function compressToToken(obj) {
    const stream = new Blob([JSON.stringify(obj)], { type: 'text/plain' }).stream();
    const compressedStream = stream.pipeThrough(new CompressionStream('deflate'));
    const response = new Response(compressedStream);
    const buffer = await response.arrayBuffer();
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, ''); // URL Safe Base64
}

async function decompressFromToken(token) {
    // Restore base64 padding and characters
    let base64 = token.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

    const stream = new Blob([bytes]).stream();
    const decompressedStream = stream.pipeThrough(new DecompressionStream('deflate'));
    const response = new Response(decompressedStream);
    return JSON.parse(await response.text());
}

/* --- OPTIMIZED: HOST GENERATES A COMPRESSED COOL LINK --- */
document.getElementById("payNow").addEventListener("click", async() => {
    const venue = document.getElementById("venueName").innerText;
    const totalPlayers = document.getElementById("finalPlayers").innerText;

    let players = ["Host (You)"];
    document.querySelectorAll("input[type='checkbox']:checked").forEach(player => {
        players.push(player.value);
    });

    const uniqueId = "MATCH-" + Math.random().toString(36).substring(2, 7).toUpperCase();

    // Map keys to tiny 1-letter attributes to reduce string size even further
    const matchData = {
        i: uniqueId,
        v: venue,
        p: players,
        t: totalPlayers,
        d: selectedDate,
        m: selectedTime
    };

    // Compress the match payload into a tiny crypt-like token string
    const shortToken = await compressToToken(matchData);

    // Creates a professional, clean short link look (e.g., website.com?t=X7_aR2)
    generatedLink = window.location.origin + window.location.pathname + "?t=" + shortToken;

    linkBox.innerHTML = `<a href="${generatedLink}" target="_blank">${generatedLink}</a>`;
    
    // Clear any previous QR code
    const checkoutQrEl = document.getElementById("checkoutQr");
    checkoutQrEl.innerHTML = "";

    // Generate dynamic QR code using qrcode.js library
    new QRCode(checkoutQrEl, {
        text: generatedLink,
        width: 180,
        height: 180,
        colorDark : "#09111B",
        colorLight : "#FFFFFF",
        correctLevel : QRCode.CorrectLevel.H
    });

    showScreen("screen4");
});

// Success Sharing Dashboard Actions
document.getElementById("shareBtn").addEventListener("click", async () => {
    if (!generatedLink) return;
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Bron24 PlayTogether Match Pass',
                text: 'Join our lineup for this match on Bron24!',
                url: generatedLink
            });
        } catch (err) {
            console.log('Error sharing:', err);
        }
    } else {
        navigator.clipboard.writeText(generatedLink);
        alert("Match pass link copied to clipboard!");
    }
});

document.getElementById("shareTelegramBtn").addEventListener("click", () => {
    if (!generatedLink) return;
    const text = encodeURIComponent("Hey! Join our lineup and split the venue booking cost on Bron24! ⚽️🏐");
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(generatedLink)}&text=${text}`;
    window.open(shareUrl, "_blank");
});

document.getElementById("shareWhatsappBtn").addEventListener("click", () => {
    if (!generatedLink) return;
    const text = encodeURIComponent("Hey! Join our lineup and split the venue booking cost on Bron24! ⚽️🏐 " + generatedLink);
    const shareUrl = `https://api.whatsapp.com/send?text=${text}`;
    window.open(shareUrl, "_blank");
});

document.getElementById("copyBtn").addEventListener("click", () => {
    if (generatedLink) {
        navigator.clipboard.writeText(generatedLink);
        alert("Match link copied successfully");
    }
});


/* --- OPTIMIZED: DECODE & OPEN THE SHORT LINK TICKET --- */
const params = new URLSearchParams(window.location.search);
const ticketToken = params.get("t"); // Short URL query key 't'

if (ticketToken) {
    initTicketView();
}

async function initTicketView() {
    let data = null;
    try {
        // Decompress the URL token back into our original data map object
        const raw = await decompressFromToken(ticketToken);
        data = {
            id: raw.i,
            venue: raw.v,
            players: raw.p,
            totalPlayers: raw.t,
            date: raw.d,
            time: raw.m
        };
    } catch (e) {
        console.error("Invalid or expired match ticket link", e);
        return;
    }

    if (data) {
        const venueImages = {
            "Football Arena": "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1600",
            "Cricket Turf": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1600",
            "Tennis Court": "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=1600",
            "Basketball Arena": "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1600"
        };

        const image = venueImages[data.venue] || "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1600";

        const qrLink = encodeURIComponent(window.location.href);
        const qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${qrLink}`;

        document.body.innerHTML = `
<style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Inter', sans-serif;
}

body{
    background:#09111B;
    display:flex;
    justify-content:center;
    align-items:center;
    min-height:100vh;
    padding:20px;
    color:white;
}

.match-wrapper{
    width:100%;
    max-width:650px;
}

.ticket-card {
    background:#121B26;
    border-radius:24px;
    overflow:hidden;
    border:1px solid rgba(255,255,255,.08);
    box-shadow: 0 20px 50px rgba(0,0,0,0.6);
    position: relative;
}

.ticket-card::before, .ticket-card::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    background: #09111B;
    border-radius: 50%;
    top: 240px;
    z-index: 10;
}
.ticket-card::before { left: -15px; }
.ticket-card::after { right: -15px; }

.match-image{
    width:100%;
    height:200px;
    overflow:hidden;
    position: relative;
}

.match-image img{
    width:100%;
    height:100%;
    object-fit:cover;
}

.ticket-type-badge {
    position: absolute;
    top: 20px;
    right: 20px;
    background: #22C55E;
    color: white;
    padding: 6px 16px;
    border-radius: 50px;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.ticket-content{
    padding: 30px;
    position: relative;
}

.qr-holder {
    text-align: center;
    margin-top: -100px;
    margin-bottom: 20px;
    position: relative;
    z-index: 5;
}

.qr-box {
    background: white;
    display: inline-block;
    padding: 12px;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.4);
}

.qr-box img {
    display: block;
}

.ticket-id {
    text-align: center;
    font-size: 13px;
    color: #22C55E;
    font-family: monospace;
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 10px;
}

.content h1{
    font-size: 32px;
    text-align: center;
    margin-bottom: 25px;
    font-weight: 800;
}

.ticket-divider {
    border-top: 2px dashed rgba(255, 255, 255, 0.15);
    margin: 15px 0 25px 0;
}

.grid{
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin-top:20px;
}

.tile{
    background:#1B2634;
    padding:16px 20px;
    border-radius:16px;
    border: 1px solid rgba(255,255,255,0.02);
}

.tile h3{
    color: #94A3B8;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
}

.tile p{
    font-size:16px;
    font-weight: 600;
}

.full-width-tile {
    grid-column: span 2;
}

.notice{
    margin-top: 25px;
    padding: 15px;
    border-radius: 12px;
    background: rgba(34, 197, 94, 0.08);
    border-left: 4px solid #22C55E;
    font-size: 14px;
    color: #CBD5E1;
    line-height: 1.5;
    text-align: center;
}

.download-area {
    text-align: center;
    margin-top: 30px;
}

.green-download-btn {
    background: #22C55E;
    color: white;
    border: none;
    padding: 16px 32px;
    font-size: 16px;
    font-weight: 700;
    border-radius: 50px;
    cursor: pointer;
    box-shadow: 0 6px 20px rgba(34, 197, 94, 0.3);
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    justify-content: center;
}

.green-download-btn:hover {
    background: #16a34a;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(34, 197, 94, 0.45);
}

@media print {
    body {
        background: white !important;
        color: black !important;
        padding: 0;
    }
    .ticket-card {
        background: white !important;
        border: none !important;
        box-shadow: none !important;
    }
    .ticket-card::before, .ticket-card::after {
        display: none !important;
    }
    .qr-holder {
        margin-top: 20px !important;
    }
    .qr-box {
        border: 2px solid #22C55E !important;
        box-shadow: none !important;
    }
    .tile {
        background: #F1F5F9 !important;
        border: 1px solid #CBD5E1 !important;
    }
    .tile h3 {
        color: #64748B !important;
    }
    .tile p {
        color: black !important;
    }
    .ticket-divider {
        border-top: 2px dashed #CBD5E1 !important;
    }
    .notice {
        background: #F1F5F9 !important;
        color: black !important;
        border: 1px solid #CBD5E1 !important;
        border-left: 4px solid #22C55E !important;
    }
    .download-area, .ticket-type-badge {
        display: none !important;
    }
}

@media(max-width:500px){
    .grid { grid-template-columns: 1fr; }
    .full-width-tile { grid-column: span 1; }
    .content h1 { font-size:24px; }
}
</style>

<div class="match-wrapper">
    <div class="ticket-card">
        <div class="match-image">
            <img src="${image}">
            <div class="ticket-type-badge">Match Pass</div>
        </div>

        <div class="ticket-content">
            <div class="qr-holder">
                <div class="qr-box">
                    <img src="${qrImage}" alt="Match Access QR">
                </div>
            </div>

            <div class="ticket-id">${data.id}</div>
            <h1>🏟 ${data.venue}</h1>
            
            <div class="ticket-divider"></div>

            <div class="grid">
                <div class="tile">
                    <h3>📅 Match Date</h3>
                    <p>${data.date}</p>
                </div>

                <div class="tile">
                    <h3>⏰ Kickoff Time</h3>
                    <p>${data.time}</p>
                </div>

                <div class="tile">
                    <h3>👥 Lineup Count</h3>
                    <p>${data.totalPlayers} Players Required</p>
                </div>

                <div class="tile full-width-tile">
                    <h3>👥 Roster Ranks</h3>
                    <p>${data.players.join(", ")}</p>
                </div>
            </div>

            <div class="notice">
                Official Entry Pass. Scan QR code or press download to keep a copy on your mobile device. Arrive 15 mins early.
            </div>

            <div class="download-area">
                <button id="downloadTicketBtn" class="green-download-btn">
                    📥 Download PDF Ticket
                </button>
                <button id="shareTicketBtn" class="share-pass-btn">
                    🔗 Share Match Pass
                </button>
            </div>
        </div>
    </div>
</div>
`;

        document.getElementById("downloadTicketBtn").addEventListener("click", () => {
            window.print();
        });

        document.getElementById("shareTicketBtn").addEventListener("click", async () => {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: `Match Pass - ${data.venue}`,
                        text: `Hey! Check out our Bron24 match pass for ${data.venue} on ${data.date} at ${data.time}!`,
                        url: window.location.href
                    });
                } catch (err) {
                    console.log('Error sharing:', err);
                }
            } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Pass link copied to clipboard!");
            }
        });
    }
}