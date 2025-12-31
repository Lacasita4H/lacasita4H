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

  const telefono = "5493546436791"; // correcto para Argentina

  const mensaje = 
    `Hola! Mi nombre es ${nombre}. ` +
    `Quisiera consultar disponibilidad desde el ${desde} hasta el ${hasta} ` +
    `para ${personas} personas.`;

  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");
});