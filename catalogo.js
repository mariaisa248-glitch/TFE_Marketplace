const menuToggle = document.getElementById("menu-toggle");
const leftPanel = document.querySelector(".left-panel");
const searchInput = document.getElementById("search-input");
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".game-card");

menuToggle.addEventListener("click", () => {
  leftPanel.classList.toggle("show");
});

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const genre = btn.getAttribute("data-genre");

    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    cards.forEach(card => {
      const cardGenre = card.getAttribute("data-genre");
      card.style.display =
        genre === "all" || cardGenre === genre ? "block" : "none";
    });
  });
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  cards.forEach(card => {
    const name = card.getAttribute("data-name").toLowerCase();
    card.style.display = name.includes(query) ? "block" : "none";
  });
});

const loginBtn = document.getElementById("login-btn");
const loginModal = document.getElementById("login-modal");
const loginSubmit = document.getElementById("login-submit");
const loginCancel = document.getElementById("login-cancel");
const leftPanelContainer = document.querySelector(".left-panel");

let loggedIn = false;

loginBtn.addEventListener("click", () => {
  if (!loggedIn) {
    loginModal.classList.add("active");
  } else {
    loggedIn = false;
    loginBtn.textContent = "Iniciar sesión";
    const devButton = document.getElementById("dev-btn");
    if (devButton) devButton.remove();
  }
});

loginCancel.addEventListener("click", () => {
  loginModal.classList.remove("active");
});

loginSubmit.addEventListener("click", () => {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (user && pass) {
  loginModal.classList.remove("active");
  loggedIn = true;
  loginBtn.textContent = "Cerrar sesión";

  const devButton = document.createElement("button");
  devButton.id = "dev-btn";
  devButton.className = "left-panel-button";
  devButton.textContent = "Soy desarrollador";

  const loginContainer = document.querySelector(".login-container");
  leftPanelContainer.insertBefore(devButton, loginContainer);

    devButton.addEventListener("click", () => {
      window.location.href = "desarrollador.html";
    });
  }
});