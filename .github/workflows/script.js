// ===============================
// CLIENT COUNT (UPGRADED)
// ===============================
function animateCounter(target) {
  const el = document.getElementById("clientCount");
  if (!el) return;

  let start = 0;
  const increment = Math.ceil(target / 50);

  const timer = setInterval(() => {
    start += increment;

    if (start >= target) {
      el.innerText = target + "+";
      clearInterval(timer);
    } else {
      el.innerText = start + "+";
    }
  }, 20);
}

function loadClientCount(){
  let count = localStorage.getItem("clientCount");

  if (!count) {
    count = 1200;
    localStorage.setItem("clientCount", count);
  }

  animateCounter(parseInt(count));
}

function increaseClientCount(){
  let count = parseInt(localStorage.getItem("clientCount")) || 1200;

  count++;
  localStorage.setItem("clientCount", count);

  animateCounter(count);
}

// ===============================
// HEADER SCROLL EFFECT
// ===============================
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");

  if (header) {
    if (window.scrollY > 80) {
      header.style.background = "rgba(0,0,0,0.8)";
      header.style.backdropFilter = "blur(10px)";
    } else {
      header.style.background = "rgba(0,0,0,0.4)";
    }
  }

  revealOnScroll();
});


// ===============================
// SMOOTH SCROLL
// ===============================
function scrollToSection(id) {
  const section = document.getElementById(id);

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}


// ===============================
// CARD FLIP
// ===============================
function toggleFlip(card) {
  card.classList.toggle("flipped");
}


// ===============================
// CONTACT FORM → WHATSAPP (UPDATED)
// ===============================
const form = document.getElementById("contact-form");

if (form) {

form.addEventListener("submit", function (e) {

  e.preventDefault();

  const name = this.querySelector('[name="name"]').value.trim();
  const phone = this.querySelector('[name="phone"]').value.trim();
  const service = this.querySelector('[name="service"]').value;
  const message = this.querySelector('[name="message"]').value.trim();

  if (!name || !phone || !service || !message) {
    alert("Please fill all fields");
    return;
  }

  if(!/^[0-9]{10}$/.test(phone)){
    alert("Enter valid 10-digit phone number");
    return;
  }

  const text = `New Lead 🚀
Name: ${name}
Phone: ${phone}
Service: ${service}
Message: ${message}`;

  const url = "https://wa.me/919885636627?text=" + encodeURIComponent(text);

  window.open(url, "_blank");

  // ✅ CLIENT COUNT INCREMENT ADDED
  increaseClientCount();

  this.reset();

  const msg = document.getElementById("form-message");

  if (msg) {
msg.innerHTML = "✨ Connecting you to Kavya on WhatsApp...";
msg.style.color = "#ffd700";
msg.style.opacity = "0";
msg.style.transition = "all 0.5s ease";

setTimeout(() => {
  msg.style.opacity = "1";
  msg.style.transform = "translateY(-5px)";
}, 100);  }

});

}


// ===============================
// FLOATING PARTICLES
// ===============================
function createParticles() {

  const container = document.createElement("div");
  container.classList.add("particles");

  document.body.appendChild(container);

  for (let i = 0; i < 60; i++) {

    const particle = document.createElement("div");
    particle.classList.add("particle");

    particle.style.left = Math.random() * 100 + "vw";
    particle.style.top = Math.random() * 100 + "vh";
    particle.style.animationDuration = Math.random() * 20 + 10 + "s";
    particle.style.opacity = Math.random();

    container.appendChild(particle);
  }

}

createParticles();


// ===============================
// SCROLL REVEAL
// ===============================
const revealElements = document.querySelectorAll(
  ".section, .card-flip, .about-text, .about-image-box"
);

function revealOnScroll() {

  const windowHeight = window.innerHeight;

  revealElements.forEach((el) => {

    const top = el.getBoundingClientRect().top;

    if (top < windowHeight - 80) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }

  });

}

window.addEventListener("load", () => {

  revealElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "all 1s ease";
  });

  revealOnScroll();

});


// ===============================
// HERO SCROLL CLICK
// ===============================
const scrollIndicator = document.querySelector(".scroll-down");

if (scrollIndicator) {

  scrollIndicator.addEventListener("click", () => {
    scrollToSection("about");
  });

}


// ===============================
// BUTTON HOVER EFFECT
// ===============================
const buttons = document.querySelectorAll(".btn");

buttons.forEach((btn) => {

  btn.addEventListener("mouseenter", () => {
    btn.style.boxShadow = "0 0 20px rgba(255,215,0,0.8)";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.boxShadow = "none";
  });

});


// ===============================
// CARD HOVER LIFT
// ===============================
const cards = document.querySelectorAll(".card-flip");

cards.forEach((card) => {

  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-8px)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });

});


// ===============================
// NAV AUTO CLOSE
// ===============================
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {

  link.addEventListener("click", () => {
    document.querySelector("nav").classList.remove("open");
  });

});


// ===============================
// NUMEROLOGY
// ===============================
function calculateNumerology(){

  const dob = document.getElementById("dob").value;

  if(!dob){
    alert("Please select your date of birth");
    return;
  }

  let numbers = dob.replaceAll("-","").split("");
  let sum = numbers.reduce((a,b)=> Number(a)+Number(b));

  while(sum > 9){
    sum = sum.toString().split("").reduce((a,b)=> Number(a)+Number(b));
  }

  document.getElementById("lifePathNumber").innerText =
  "Your Life Path Number: " + sum;

  const meanings = {
    1:"Leader",
    2:"Emotional",
    3:"Creative",
    4:"Hardworking",
    5:"Adventurous",
    6:"Caring",
    7:"Spiritual",
    8:"Powerful",
    9:"Humanitarian"
  };

  document.getElementById("lifePathMeaning").innerText = meanings[sum];
}


let tarotTimer;

async function pickTarot(){

  const card = document.querySelector(".tarot-card");
  const msgBox = document.getElementById("tarotMessage");

  // Flip animation
  card.classList.add("flipped");

  // Show loading below card
  msgBox.innerText = "🔮 Connecting to universe...";
  msgBox.style.opacity = "1";

  try{

    const res = await fetch("https://tarotapi.dev/api/v1/cards/random?n=1");
    const data = await res.json();

    const tarot = data.cards[0];

    // ✅ SHOW BELOW CARD (CLEAN UI)
    msgBox.innerText =
      "🃏 " + tarot.name + "\n✨ " + tarot.meaning_up;

  } catch(err){

    msgBox.innerText = "🌙 Energy unclear... try again";

  }

  // Clear previous timer
  clearTimeout(tarotTimer);

  // Auto reset after 40 sec
  tarotTimer = setTimeout(() => {

    // Flip back card
    card.classList.remove("flipped");

    // Fade message
    msgBox.style.opacity = "0";

    setTimeout(() => {
      msgBox.innerText = "";
    }, 500);

  }, 15000);

}
// ===============================
// LOAD CLIENT COUNT
// ===============================
document.addEventListener("DOMContentLoaded", loadClientCount);