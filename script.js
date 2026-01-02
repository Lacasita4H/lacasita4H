let imagenes = [];
let index = 0;

document.querySelectorAll(".galeria img").forEach((img, i) => {
    imagenes.push(img.src);
    img.addEventListener("click", () => abrirModal(i));
});

function abrirModal(i) {
    index = i;
    document.getElementById("modal").style.display = "flex";
    document.getElementById("modal-img").src = imagenes[index];
}

function cerrarModal(e) {
    if (e.target.id === "modal") {
        document.getElementById("modal").style.display = "none";
    }
}

function cambiarFoto(dir) {
    index = (index + dir + imagenes.length) % imagenes.length;
    document.getElementById("modal-img").src = imagenes[index];
}

document.getElementById("consultaForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const desde = document.getElementById("fechaDesde").value;
  const hasta = document.getElementById("fechaHasta").value;
  const personas = document.getElementById("personas").value;

  if (!nombre || !desde || !hasta || !personas) {
    alert("Completá todos los campos");
    return;
  }

  const telefono = "5493546436791";

  const mensaje = 
    `Hola! Mi nombre es ${nombre}. ` +
    `Quisiera consultar disponibilidad desde el ${desde} hasta el ${hasta} ` +
    `para ${personas} personas.`;

  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");
});

src="https://cdn.jsdelivr.net/npm/flatpickr"
src="https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/es.js"

document.addEventListener("DOMContentLoaded", function () {

  flatpickr("#fechas", {
    locale: flatpickr.l10ns.es,
    mode: "range",
    dateFormat: "d/m/Y",
    minDate: "today",
  });

  document.getElementById("consultaForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const fechas = document.getElementById("fechas").value;
    const personas = document.getElementById("personas").value;

    if (!nombre || !fechas || !personas) {
      alert("Completá todos los campos");
      return;
    }

    const mensaje = `Hola! Soy ${nombre}. Quisiera consultar disponibilidad del ${fechas} para ${personas} personas.`;
    window.open(`https://wa.me/5493546436791?text=${encodeURIComponent(mensaje)}`, "_blank");
  });

});

function cambiarCantidad(valor) {
  const input = document.getElementById("personas");
  let cantidad = parseInt(input.value);

  let nuevaCantidad = cantidad + valor;

  if (nuevaCantidad < 1) return;
  if (nuevaCantidad > 2) return;

  input.value = nuevaCantidad;
}

let startX = 0;
let endX = 0;

const modal = document.getElementById("modal");

modal.addEventListener("touchstart", function (e) {
  startX = e.touches[0].clientX;
}, { passive: true });

modal.addEventListener("touchend", function (e) {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const threshold = 50; // sensibilidad del swipe

  if (startX - endX > threshold) {
    // swipe izquierda → siguiente
    cambiarFoto(1);
  } else if (endX - startX > threshold) {
    // swipe derecha → anterior
    cambiarFoto(-1);
  }
}
