document.getElementById("ageForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Evita que el formulario se envíe

  const ageInput = document.getElementById("age");
  const resultDiv = document.getElementById("result");
  const age = parseInt(ageInput.value);

  if (isNaN(age)) {
    resultDiv.textContent = "Por favor, ingresa una edad válida.";
  } else if (age >= 18) {
    resultDiv.textContent = "Eres mayor de edad. ¡Bienvenido!";
    document.getElementById("ageCheck").style.display = "none";
    document.getElementById("contenido").style.display = "block";
  } else {
    resultDiv.textContent = "Eres menor de edad. Lo siento, no puedes acceder.";
  }
});
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

const carrito = [];

const botonesAgregar = document.querySelectorAll(".agregar-carrito");

botonesAgregar.forEach((boton) => {
  boton.addEventListener("click", agregarProductoAlCarrito);
});

function agregarProductoAlCarrito(event) {
  const boton = event.target;
  const producto = boton.parentElement;
  const productoNombre = producto.querySelector("h5").textContent;
  const productoPrecioTexto = producto.querySelector(".precioProducto");
  const productoPrecio = parseFloat(productoPrecioTexto.textContent) || 0;

  const nuevoProducto = {
    nombre: productoNombre,
    precio: productoPrecio,
  };

  carrito.push(nuevoProducto);

  actualizarCarrito();
}

function quitarProductoDelCarrito(nombreProducto) {
  const indice = carrito.findIndex(
    (producto) => producto.nombre === nombreProducto
  );

  if (indice !== -1) {
    carrito.splice(indice, 1);
    actualizarCarrito();
  }
}

function vaciarCarrito() {
  carrito.length = 0;
  actualizarCarrito();
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;
  carrito.forEach((producto) => {
    const item = document.createElement("li");
    const nombreProducto = producto.nombre;
    const precioProducto = producto.precio.toFixed(2);
    item.innerHTML = `${nombreProducto} - $${precioProducto} <button class="quitar-carrito" data-nombre="${nombreProducto}">Quitar</button>`;
    listaCarrito.appendChild(item);
    total += producto.precio;
  });
  totalCarrito.textContent = total.toFixed(2);

  // Escuchar eventos de clic en los botones "Quitar" del carrito
  const botonesQuitar = document.querySelectorAll(".quitar-carrito");
  botonesQuitar.forEach((boton) => {
    boton.addEventListener("click", (event) => {
      const nombreProducto = event.target.getAttribute("data-nombre");
      quitarProductoDelCarrito(nombreProducto);
    });
  });

  // Guardar el carrito actualizado en localStorage
  guardarCarritoEnLocalStorage();
}

// Escuchar evento de clic en el botón "Vaciar carrito"
vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

// Función para guardar el carrito en localStorage
function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para cargar el carrito desde localStorage al cargar la página
function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    const carritoParseado = JSON.parse(carritoGuardado);
    carrito.length = 0; // Vaciamos el carrito existente
    carrito.push(...carritoParseado); // Agregamos los elementos parseados
    actualizarCarrito();
  }
}

// Agregar un event listener para cargar el carrito desde localStorage al cargar la página
window.addEventListener("load", cargarCarritoDesdeLocalStorage);

// Agregar un event listener para guardar el carrito en localStorage cada vez que se actualice
// Agregamos o eliminamos un producto del carrito
window.addEventListener("storage", function (event) {
  if (event.key === "carrito") {
    const carritoParseado = JSON.parse(event.newValue);
    carrito.length = 0; // Vaciamos el carrito existente
    carrito.push(...carritoParseado); // Agregamos los elementos parseados
    actualizarCarrito();
  }
});
