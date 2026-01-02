document.addEventListener("DOMContentLoaded", function () {

  // ===== GALERÍA =====
  // Al cargar la página recopilamos las URLs de las imágenes
  let imagenes = [];
  // Índice de la imagen actualmente mostrada en el modal
  let index = 0;

  // Recorremos todas las imágenes dentro de `.galeria`:
  // - guardamos su `src` en `imagenes`
  // - añadimos un listener para abrir el modal al hacer click
  document.querySelectorAll(".galeria img").forEach((img, i) => {
    imagenes.push(img.src);
    img.addEventListener("click", () => abrirModal(i));
  });

  /**
   * abrirModal(i)
   * - Establece el índice activo
   * - Muestra el modal (cambiando display a flex)
   * - Carga la imagen correspondiente en el elemento #modal-img
   * @param {number} i - índice de la imagen a mostrar
   */
  function abrirModal(i) {
    index = i;
    document.getElementById("modal").style.display = "flex";
    document.getElementById("modal-img").src = imagenes[index];
  }

  /**
   * cambiarFoto(dir)
   * - Función expuesta en `window` para que botones (prev/next) la llamen desde HTML
   * - Actualiza `index` sumando `dir` (puede ser -1 o +1) y hace wrap-around con modulo
   * @param {number} dir - dirección (-1 para anterior, +1 para siguiente)
   */
  window.cambiarFoto = function (dir) {
    index = (index + dir + imagenes.length) % imagenes.length;
    document.getElementById("modal-img").src = imagenes[index];
  };

  /**
   * cerrarModal(e)
   * - Función expuesta en `window` usada para cerrar el modal al hacer click fuera de la imagen
   * - Cierra el modal solo si el target es el propio contenedor `#modal`
   * @param {Event} e - evento de click
   */
  window.cerrarModal = function (e) {
    if (e.target.id === "modal") {
      document.getElementById("modal").style.display = "none";
    }
  };

  // ===== FLATPICKR =====
  // Configura el selector de fechas `#fechas`:
  // - locale: español
  // - mode: range (rango de días)
  // - dateFormat: formato día/mes/año
  // - minDate: hoy (no se pueden seleccionar fechas pasadas)
  flatpickr("#fechas", {
    locale: flatpickr.l10ns.es,
    mode: "range",
    dateFormat: "d/m/Y",
    minDate: "today"
  });

  // ===== FORMULARIO =====
  // Al enviar el formulario `#consultaForm`:
  // - prevenimos el envío por defecto (page reload)
  // - obtenemos los valores de los campos nombre, fechas y personas
  // - validamos que estén completos
  // - construimos un mensaje y abrimos WhatsApp en una nueva pestaña con ese texto
  document.getElementById("consultaForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const fechas = document.getElementById("fechas").value;
    const personas = document.getElementById("personas").value;

    // Validación básica: todos los campos deben tener valor
    if (!nombre || !fechas || !personas) {
      alert("Completá todos los campos");
      return;
    }

    // Mensaje preparado para enviar por WhatsApp. `encodeURIComponent` asegura que
    // los caracteres especiales y espacios sean codificados correctamente en la URL.
    const mensaje = `Hola! Soy ${nombre}. Quisiera consultar disponibilidad del ${fechas} para ${personas} personas.`;

    // Abrimos WhatsApp Web con el mensaje ya cargado en una nueva pestaña
    window.open(`https://wa.me/5493546436791?text=${encodeURIComponent(mensaje)}`, "_blank");
  });
});
