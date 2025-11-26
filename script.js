const glowBg = document.querySelector(".glow-bg");
const panels = document.querySelectorAll(".panel");
const scrollContainer = document.querySelector(".right-section");
const leftPanel = document.querySelector(".left-panel");

document.getElementById("menu-toggle").addEventListener("click", () => {
  document.querySelector(".left-panel").classList.toggle("hidden");
});




function updateGlow() {
  let activeColor = "#121212";
  let activeY = window.innerHeight / 2;

  panels.forEach(panel => {
    const rect = panel.getBoundingClientRect();
    if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
      activeColor = panel.getAttribute("data-bgcolor") || "#121212";
      activeY = rect.top + rect.height / 2;
    }
  });

  const yPercent = (activeY / window.innerHeight) * 100;
  glowBg.style.background = `radial-gradient(circle at 50% ${yPercent}%, ${activeColor}99 0%, transparent 70%)`;
}

scrollContainer.addEventListener("scroll", updateGlow);
updateGlow();





const leftButtons = document.querySelectorAll(".left-panel button[data-panel]");
const allPanels = document.querySelectorAll(".panel");
const showAllBtn = document.getElementById("show-all-btn");

let showingAll = true;

leftButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-panel");

    if (!showingAll && btn.classList.contains("active")) {
      showAllPanels();
      return;
    }

    leftButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    allPanels.forEach((panel, index) => {
      if (index + 1 === parseInt(target)) {
        panel.classList.add("preparing");
        panel.classList.remove("hidden", "showing");

        void panel.offsetWidth;

        setTimeout(() => {
          panel.classList.remove("preparing");
          panel.classList.add("showing");
        }, 30);
      } else {
        panel.classList.remove("showing", "preparing");
        void panel.offsetWidth;
        panel.classList.add("hidden");
      }
    });

    showingAll = false;
  });
});




showAllBtn.addEventListener("click", () => {
  showAllPanels();
});

function showAllPanels() {
  allPanels.forEach((panel, index) => {
    panel.classList.remove("hidden");

    panel.classList.remove("showing");
    void panel.offsetWidth;
    panel.classList.add("showing");

    panel.style.animationDelay = `${index * 0.15}s`;
  });

  leftButtons.forEach((b) => b.classList.remove("active"));
  showingAll = true;
}






document.addEventListener("DOMContentLoaded", () => {
  const btnAventura = document.getElementById("btn-aventura");

  if (btnAventura) {
    btnAventura.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = "aventura.html";
      }, 800);
    });
  }
});

document.body.classList.add("loaded");

document.addEventListener("DOMContentLoaded", () => {
  const btnTerror = document.getElementById("btn-terror");

  if (btnTerror) {
    btnTerror.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = "terror.html";
      }, 800); 
    });
  }
});

document.body.classList.add("loaded");

document.addEventListener("DOMContentLoaded", () => {
  const btnCozy = document.getElementById("btn-cozy");

  if (btnCozy) {
    btnCozy.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = "cozy.html";
      }, 800);
    });
  }
});

document.body.classList.add("loaded");




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
