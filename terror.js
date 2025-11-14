document.getElementById("volverBtn").addEventListener("click", () => {
  window.location.href = "index.html"; 
});



const precio = document.getElementById("precio");
const edicion = document.getElementById("edicion");

edicion.addEventListener("change", () => {
  const nuevoPrecio = edicion.value;
  
  precio.classList.add("cambiando");
  setTimeout(() => {
    precio.textContent = `$${nuevoPrecio}`;
    precio.classList.remove("cambiando");
  }, 200);
});



document.querySelector(".add-cart").addEventListener("click", () => {
  alert("¡Juego añadido al carrito!");
});

document.querySelector(".buy-now").addEventListener("click", () => {
  alert("Redirigiendo a la compra...");
});
