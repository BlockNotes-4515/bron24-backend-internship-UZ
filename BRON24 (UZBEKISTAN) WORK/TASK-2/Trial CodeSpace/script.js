const screens = document.querySelectorAll(".screen");

function showScreen(id) {

    screens.forEach(screen => {

        screen.classList.remove("active");

    });

    document.getElementById(id).classList.add("active");

}

let selectedPrice = 150000;
let selectedVenue = "Football Arena";

const cards = document.querySelectorAll(".venue-card");

cards.forEach(card => {

    card.addEventListener("click", () => {

        cards.forEach(c => c.classList.remove("selected"));

        card.classList.add("selected");

        selectedPrice = parseInt(card.dataset.price);

        selectedVenue = card.querySelector("h3").innerText;

    });

});


document.getElementById("nextBtn")
    .addEventListener("click", () => {

        showScreen("screen2");

    });


const checkboxes = document.querySelectorAll("input[type='checkbox']");

checkboxes.forEach(box => {

    box.addEventListener("change", updateSplit);

});

function updateSplit() {

    let players = 1;

    checkboxes.forEach(box => {

        if (box.checked) {

            players++;

        }

    });

    document.getElementById("playerCount").innerText = players;

    document.getElementById("splitAmount").innerText =

        Math.floor(selectedPrice / players);

}


document.getElementById("paymentBtn")
    .addEventListener("click", () => {

        let players = document.getElementById("playerCount").innerText;

        let amount = document.getElementById("splitAmount").innerText;

        document.getElementById("venueName").innerText = selectedVenue;

        document.getElementById("finalPlayers").innerText = players;

        document.getElementById("finalAmount").innerText = amount;

        showScreen("screen3");

    });


document.getElementById("payNow")
    .addEventListener("click", () => {

        showScreen("screen4");

    });


/*document.getElementById("copyBtn")
    .addEventListener("click", () => {

        navigator.clipboard.writeText(
            "bron24.com/join/AB12"
        );

        alert("Link copied");

    });*/
document.getElementById("copyBtn")
    .addEventListener("click", () => {

        /* selected venue */

        const venue =
            document.getElementById("venueName").innerText;

        /* players count */

        const totalPlayers =
            document.getElementById("finalPlayers").innerText;


        /* selected player names */

        let players = ["Dhruv"];

        document
            .querySelectorAll("input[type='checkbox']:checked")
            .forEach(player => {

                players.push(player.value);

            });


        /* current date/time */

        const date =
            new Date().toLocaleDateString();

        const time =
            new Date().toLocaleTimeString();


        /* generate unique id */

        const uniqueId =
            Math.random()
            .toString(36)
            .substring(2, 10)
            .toUpperCase();


        /* object */

        const match = {

            venue: venue,
            players: players,
            totalPlayers: totalPlayers,
            date: date,
            time: time

        };


        /* save */

        localStorage.setItem(

            "match_" + uniqueId,

            JSON.stringify(match)

        );


        /* generate dynamic link */

        const generatedLink =
            window.location.origin +
            window.location.pathname +
            "?match=" + uniqueId;


        /* copy */

        navigator.clipboard.writeText(
            generatedLink
        );

        alert(
            "Match link copied!\n\n" +
            generatedLink
        );

    });
/* GENRATION OF RANDOM LINKS AUTO SHOWN IN THE LINK BAR BOX */
const linkBox = document.querySelector(".link-box");

document.getElementById("copyBtn")
    .addEventListener("click", () => {

        const venue =
            document.getElementById("venueName").innerText;

        const totalPlayers =
            document.getElementById("finalPlayers").innerText;


        /* selected player names */
        let players = ["Dhruv"];

        document
            .querySelectorAll(
                "input[type='checkbox']:checked"
            )
            .forEach(player => {
                players.push(player.value);
            });


        const date =
            new Date().toLocaleDateString();

        const time =
            new Date().toLocaleTimeString();


        /* random unique id */

        const uniqueId =
            Math.random()
            .toString(36)
            .substring(2, 10)
            .toUpperCase();

        const match = {
            venue: venue,
            players: players,
            totalPlayers: totalPlayers,
            date: date,
            time: time

        };


        /* save data */
        localStorage.setItem(
            "match_" + uniqueId,
            JSON.stringify(match)
        );


        /* generate dynamic link */
        const generatedLink =
            window.location.origin +
            window.location.pathname +
            "?match=" + uniqueId;

        /* SHOW LINK IN BOX */
        linkBox.innerHTML = `
<a href="${generatedLink}" target="_blank">${generatedLink}</a>
`;
        /* copy automatically */
        navigator.clipboard.writeText(
            generatedLink
        );
        alert(
            "Match link copied successfully"
        );
    });

/* OPEN SHARED MATCH LINK */

const params = new URLSearchParams(window.location.search);

const id = params.get("match");

if (id) {

    const data = JSON.parse(
        localStorage.getItem(
            "match_" + id
        )
    );


    if (data) {

        /* Venue images */

        const venueImages = {

            "Football Arena": "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1600",

            "Cricket Turf": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1600",

            "Tennis Court": "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=1600",

            "Basketball Arena": "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1600"

        };


        const image =
            venueImages[data.venue] ||
            "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1600";

        const qrLink =
            encodeURIComponent(window.location.href);

        const qrImage =
            `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${qrLink}`;

        document.body.innerHTML = `

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:Inter,sans-serif;
}

body{

background:#09111B;

display:flex;

justify-content:center;

align-items:center;

min-height:100vh;

padding:30px;

color:white;

}


.match-wrapper{

width:100%;
max-width:900px;

}


.match-card{

background:#121B26;

border-radius:30px;

overflow:hidden;

border:1px solid rgba(255,255,255,.05);

transition:.4s;

cursor:pointer;

}


.match-card:hover{

transform:translateY(-10px);

box-shadow:
0 0 30px rgba(34,197,94,.15);

border-color:#22C55E;

}


.match-image{

width:100%;

height:350px;

overflow:hidden;

}


.match-image img{

width:100%;

height:100%;

object-fit:cover;

transition:.6s;

}


.match-card:hover img{

transform:scale(1.08);

}


.content{

padding:30px;

}


.content h1{

font-size:42px;

margin-bottom:20px;

}


.grid{

display:grid;

grid-template-columns:
repeat(auto-fit,minmax(220px,1fr));

gap:20px;

margin-top:20px;

}


.tile{

background:#1B2634;

padding:20px;

border-radius:20px;

transition:.4s;

}


.tile:hover{

background:#22C55E;

transform:scale(1.03);

}


.tile h3{

margin-bottom:10px;

font-size:20px;

}


.tile p{

font-size:16px;

line-height:1.7;

}


.notice{

margin-top:25px;

padding:20px;

border-radius:16px;

background:#1B2634;

border-left:5px solid #22C55E;

font-size:17px;

}


@media(max-width:768px){

.content h1{

font-size:28px;

}

.match-image{

height:220px;

}

}

</style>


<div class="match-wrapper">
<div class="match-card">
<div class="match-image">
<img src="${image}">
</div>

<div class="content">
<h1 align="center">
🏟 ${data.venue}
</h1>

<div class="grid">
<div class="tile">
<h3>📅 Date</h3>
<p align="center">
${data.date}
</p>

</div>

<div class="tile">
<h3>
⏰ Time
</h3>
<p align="center">
<strong>${data.time}</strong>
</p>
</div>

<div class="tile">
<h3>
👥 Total Players
</h3>
<p align="center">
${data.totalPlayers}
</p>

</div>



<div class="tile">
<h3>
 Players
</h3>
<p align="center">
${data.players.join("<br>")}
</p>
</div>
</div>

<div class="notice">

🎉 Thanks for joining this match. Please arrive 15 minutes before the game starts.

</div>

</div>

</div>

</div>

`;

    }

}