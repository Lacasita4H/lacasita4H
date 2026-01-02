document.addEventListener("DOMContentLoaded", function () {

  // ===== GALERÍA =====
  // ===== Lazy-loading (imágenes y video) =====
  var lazyImages = document.querySelectorAll('img.lazy[data-src]');
  var lazyVideos = document.querySelectorAll('video.lazy-video[data-src]');

  // Debug: indicar que el script se ejecutó
  try { console.log('script.js: lazy loader init'); } catch(e) {}

  if (typeof window.IntersectionObserver !== 'undefined') {
    var imgObserver = new IntersectionObserver(function(entries, obs) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.remove('lazy');
          img.classList.add('lazyloaded');
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '200px 0px', threshold: 0.01 });

    Array.prototype.forEach.call(lazyImages, function(img){ imgObserver.observe(img); });

    var vidObserver = new IntersectionObserver(function(entries, obs) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var v = entry.target;
          v.src = v.dataset.src;
          try { v.load(); } catch(e) {}
          v.classList.remove('lazy-video');
          obs.unobserve(v);
        }
      });
    }, { rootMargin: '300px 0px', threshold: 0.01 });

    Array.prototype.forEach.call(lazyVideos, function(v){ vidObserver.observe(v); });
  } else {
    // Fallback si IntersectionObserver no está disponible
    Array.prototype.forEach.call(lazyImages, function(img){ if (img.dataset && img.dataset.src) { img.src = img.dataset.src; img.removeAttribute('data-src'); img.classList.remove('lazy'); } });
    Array.prototype.forEach.call(lazyVideos, function(v){ if (v.dataset && v.dataset.src) { v.src = v.dataset.src; try { v.load(); } catch(e){}; v.classList.remove('lazy-video'); } });
  }

  // Al cargar la página recopilamos las URLs de las imágenes (reales si existen en data-src)
  var imagenes = [];
  // Índice de la imagen actualmente mostrada en el modal
  var index = 0;

  // Función auxiliar usada por el atributo onclick="zoom(this)"
  window.zoom = function(imgEl) {
    var imgs = document.querySelectorAll('.galeria img');
    var idx = -1;
    for (var k = 0; k < imgs.length; k++) if (imgs[k] === imgEl) { idx = k; break; }
    if (idx !== -1) abrirModal(idx);
  };

  // Recorremos todas las imágenes dentro de `.galeria`:
  // - guardamos su `data-src` (si existe) o su `src` en `imagenes`
  // - añadimos un listener para abrir el modal al hacer click
  var galImgs = document.querySelectorAll('.galeria img');
  Array.prototype.forEach.call(galImgs, function(img, i){
    var realSrc = (img.dataset && img.dataset.src) ? img.dataset.src : img.src;
    imagenes.push(realSrc);
    img.addEventListener('click', function(){ abrirModal(i); });
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
  document.getElementById('consultaForm').addEventListener('submit', function (e) {
    e.preventDefault();

    var nombre = document.getElementById('nombre').value;
    var fechas = document.getElementById('fechas').value;
    var personas = document.getElementById('personas').value;

    // Validación básica: todos los campos deben tener valor
    if (!nombre || !fechas || !personas) {
      alert('Completá todos los campos');
      return;
    }

    // Mensaje preparado para enviar por WhatsApp. `encodeURIComponent` asegura que
    // los caracteres especiales y espacios sean codificados correctamente en la URL.
    var mensaje = 'Hola! Soy ' + nombre + '. Quisiera consultar disponibilidad del ' + fechas + ' para ' + personas + ' personas.';

    // Abrimos WhatsApp Web con el mensaje ya cargado en una nueva pestaña
    window.open('https://wa.me/5493546436791?text=' + encodeURIComponent(mensaje), '_blank');
  });
});
