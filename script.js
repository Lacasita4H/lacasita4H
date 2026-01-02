document.addEventListener("DOMContentLoaded", function () {

  // GALERÍA
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

  window.cambiarFoto = function (dir) {
    index = (index + dir + imagenes.length) % imagenes.length;
    document.getElementById("modal-img").src = imagenes[index];
  };

  window.cerrarModal = function (e) {
    if (e.target.id === "modal") {
      document.getElementById("modal").style.display = "none";
    }
  };

  // FLATPICKR
  flatpickr("#fechas", {
    locale: flatpickr.l10ns.es,
    mode: "range",
    dateFormat: "d/m/Y",
    minDate: "today"
  });

  // FORMULARIO
  document.getElementById("consultaForm").addEventListener("submit", function (e) {
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
