const devBannerImg = document.getElementById('dev-banner-img');
const devLogoImg = document.getElementById('dev-logo-img');
const bannerFileInput = document.getElementById('banner-file');
const logoFileInput = document.getElementById('logo-file');
const bannerResetBtn = document.getElementById('banner-reset');
const logoResetBtn = document.getElementById('logo-reset');

const tagSelect1 = document.getElementById('tag-select-1');
const tagSelect2 = document.getElementById('tag-select-2');
const tagSelect3 = document.getElementById('tag-select-3');
const tagsSaveBtn = document.getElementById('tags-save');
const tagsContainer = document.getElementById('tags-container');

const LS_BANNER = 'dev_banner';
const LS_LOGO = 'dev_logo';
const LS_TAGS = 'dev_tags';

const AVAILABLE_TAGS = [
  'Acción','Aventura','RPG','Cooperativo','Multijugador','Un jugador',
  'Indie','Puzzle','Terror','Cozy','Simulación','Estrategia'
];

function populateTagSelect(selectEl) {
  selectEl.innerHTML = '';
  const emptyOpt = document.createElement('option');
  emptyOpt.value = '';
  emptyOpt.textContent = '— Ninguno —';
  selectEl.appendChild(emptyOpt);

  AVAILABLE_TAGS.forEach(tag => {
    const opt = document.createElement('option');
    opt.value = tag;
    opt.textContent = tag;
    selectEl.appendChild(opt);
  });
}

function renderTags(tagsArray) {
  tagsContainer.innerHTML = '';
  if (!tagsArray || tagsArray.length === 0) {
    tagsContainer.innerHTML = '<span class="tag">Sin etiquetas</span>';
    return;
  }
  tagsArray.forEach(t => {
    if (t && t.trim()) {
      const s = document.createElement('span');
      s.className = 'tag';
      s.textContent = t;
      tagsContainer.appendChild(s);
    }
  });
}

function loadFromStorage() {
  const bannerData = localStorage.getItem(LS_BANNER);
  const logoData = localStorage.getItem(LS_LOGO);
  const tagsData = localStorage.getItem(LS_TAGS);

  if (bannerData) devBannerImg.src = bannerData;
  if (logoData) devLogoImg.src = logoData;

  let tags = [];
  if (tagsData) {
    try {
      tags = JSON.parse(tagsData);
    } catch (e) {
      tags = [];
    }
  }

  renderTags(tags);

  populateTagSelect(tagSelect1);
  populateTagSelect(tagSelect2);
  populateTagSelect(tagSelect3);

  if (tags[0]) tagSelect1.value = tags[0];
  if (tags[1]) tagSelect2.value = tags[1];
  if (tags[2]) tagSelect3.value = tags[2];
}

function saveTagsFromSelects() {
  const chosen = [
    tagSelect1.value || '',
    tagSelect2.value || '',
    tagSelect3.value || ''
  ].filter(Boolean); 
  localStorage.setItem(LS_TAGS, JSON.stringify(chosen));
  renderTags(chosen);
}

function handleFileUpload(fileInput, targetImgEl, storageKey) {
  const file = fileInput.files && fileInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    targetImgEl.src = dataUrl;
    try {
      localStorage.setItem(storageKey, dataUrl);
    } catch (err) {
      console.warn('No se pudo guardar en localStorage:', err);
    }
  };
  reader.readAsDataURL(file);
}

function resetBannerToDefault() {
  devBannerImg.src = 'images/RDR_Banner.jpg';
  localStorage.removeItem(LS_BANNER);
}

function resetLogoToDefault() {
  devLogoImg.src = 'images/RDR_Logo.png';
  localStorage.removeItem(LS_LOGO);
}

bannerFileInput.addEventListener('change', () => {
  handleFileUpload(bannerFileInput, devBannerImg, LS_BANNER);
});

logoFileInput.addEventListener('change', () => {
  handleFileUpload(logoFileInput, devLogoImg, LS_LOGO);
});

bannerResetBtn.addEventListener('click', resetBannerToDefault);
logoResetBtn.addEventListener('click', resetLogoToDefault);

tagsSaveBtn.addEventListener('click', saveTagsFromSelects);

document.addEventListener('DOMContentLoaded', () => {
  populateTagSelect(tagSelect1);
  populateTagSelect(tagSelect2);
  populateTagSelect(tagSelect3);
  loadFromStorage();

  document.getElementById('volverBtn').addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  const precio = document.getElementById('precio');
  const edicion = document.getElementById('edicion');

  edicion.addEventListener('change', () => {
    const nuevoPrecio = edicion.value;
    precio.classList.add('cambiando');
    setTimeout(() => {
      precio.textContent = `$${nuevoPrecio}`;
      precio.classList.remove('cambiando');
    }, 200);
  });

  document.querySelector('.add-cart').addEventListener('click', () => {
    alert('¡Juego añadido al carrito!');
  });

  document.querySelector('.buy-now').addEventListener('click', () => {
    alert('Redirigiendo a la compra...');
  });
});

const gradStart = document.getElementById('grad-color-start');
const gradEnd = document.getElementById('grad-color-end');
const gradSave = document.getElementById('grad-save');
const gradReset = document.getElementById('grad-reset');
const addCartBtn = document.querySelector('.add-cart');
const buyNowBtn = document.querySelector('.buy-now');

const LS_GRADIENT = 'dev_button_gradient';

function applyGradient(start, end) {
  const gradient = `linear-gradient(90deg, ${start} 0%, ${end} 100%)`;
  addCartBtn.style.background = gradient;
  buyNowBtn.style.background = gradient;
  buyNowBtn.style.boxShadow = `0 0 25px ${end}`;
}

gradSave.addEventListener('click', () => {
  const start = gradStart.value;
  const end = gradEnd.value;
  applyGradient(start, end);
  localStorage.setItem(LS_GRADIENT, JSON.stringify({ start, end }));
});

gradReset.addEventListener('click', () => {
  gradStart.value = '#493636';
  gradEnd.value = '#6e1212';
  applyGradient('#493636', '#6e1212');
  localStorage.removeItem(LS_GRADIENT);
});

const savedGrad = localStorage.getItem(LS_GRADIENT);
if (savedGrad) {
  try {
    const { start, end } = JSON.parse(savedGrad);
    gradStart.value = start;
    gradEnd.value = end;
    applyGradient(start, end);
  } catch {}
}

const priceInputs = {
  standard: document.getElementById("price-standard"),
  deluxe: document.getElementById("price-deluxe"),
  collector: document.getElementById("price-collector"),
};

const savedPrices = JSON.parse(localStorage.getItem("devPrices")) || {
  standard: 71.46,
  deluxe: 89.99,
  collector: 109.99
};

Object.entries(priceInputs).forEach(([key, input]) => {
  input.value = savedPrices[key];
});

edicion.addEventListener("change", () => {
  const tipo = edicion.value;
  const nuevoPrecio = priceInputs[tipo].value;
  precio.classList.add("cambiando");
  setTimeout(() => {
    precio.textContent = `$${parseFloat(nuevoPrecio).toFixed(2)}`;
    precio.classList.remove("cambiando");
  }, 200);
});

Object.entries(priceInputs).forEach(([key, input]) => {
  input.addEventListener("input", () => {
    savedPrices[key] = input.value;
    localStorage.setItem("devPrices", JSON.stringify(savedPrices));

    if (edicion.value === key) {
      precio.textContent = `$${parseFloat(input.value).toFixed(2)}`;
    }
  });
});

const descripcion = document.getElementById("editable-descripcion");

const savedDesc = localStorage.getItem("devDescripcion");
if (savedDesc) descripcion.value = savedDesc;

descripcion.addEventListener("input", () => {
  localStorage.setItem("devDescripcion", descripcion.value);
});
