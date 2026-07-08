/**
 * Interactive Esquema de Jakobson & Proxemia slider logic
 */
document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. ESQUEMA DE JAKOBSON INTERACTIVO
     ========================================================================== */
  const jakobsonBoxes = document.querySelectorAll('.jakobson-box');
  const explainPanel = document.getElementById('jakobson-explain');
  
  const functionDetails = {
    contexto: {
      title: "Función Referencial (o Representativa) 🌐",
      concept: "Se enfoca en el **contexto** o referente del mensaje.",
      desc: "Su propósito es transmitir información de manera objetiva, lógica y verificable, libre de opiniones personales o adornos líricos.",
      example: "**En desarrollo de software:** 'El servidor se encuentra actualmente respondiendo en el puerto 8080 con una latencia de 12ms'.",
      color: "var(--accent-amber)"
    },
    emisor: {
      title: "Función Emotiva (o Expresiva) 😊",
      concept: "Se centra en el **emisor** y sus estados internos.",
      desc: "Permite expresar de forma directa los sentimientos, emociones, dudas, miedos o estados físicos de quien emite el mensaje.",
      example: "**En desarrollo de software:** 'Me siento muy frustrado porque he estado depurando este bug en la base de datos por tres horas y aún no logro resolverlo'.",
      color: "var(--accent-violet)"
    },
    mensaje: {
      title: "Función Poética (o Estética) ✍️",
      concept: "Se centra en la forma y estética del propio **mensaje**.",
      desc: "Busca embellecer la expresión o llamar la atención sobre la estructura de las palabras, comúnmente utilizada en literatura o publicidad.",
      example: "**En desarrollo de software:** 'Un buen código es poesía en movimiento; limpio, conciso y autoexplicativo'.",
      color: "var(--accent-cyan)"
    },
    receptor: {
      title: "Función Apelativa (o Conativa) 📢",
      concept: "Se orienta directamente hacia el **receptor**.",
      desc: "Su finalidad es influir en la conducta, opiniones o acciones del receptor, mediante órdenes, sugerencias, ruegos o preguntas directas.",
      example: "**En desarrollo de software:** 'Por favor, haz un commit de tus cambios locales y sube la rama antes del daily standup de mañana'.",
      color: "var(--accent-rose)"
    },
    canal: {
      title: "Función Fática (o de Contacto) 🔌",
      concept: "Se enfoca en validar y mantener abierto el **canal** físico o de comunicación.",
      desc: "Se usa para iniciar, interrumpir, prolongar o confirmar que el canal de comunicación sigue funcionando correctamente.",
      example: "**En desarrollo de software:** '¿Me escuchas bien en la videollamada de Teams? ¿Se ve mi pantalla compartida?'.",
      color: "var(--accent-emerald)"
    },
    codigo: {
      title: "Función Metalingüística 💬",
      concept: "Se enfoca en el **código** (el idioma o lenguaje utilizado).",
      desc: "Ocurre cuando usamos el propio lenguaje para hablar sobre el lenguaje mismo, explicando reglas gramaticales, traducciones o significados.",
      example: "**En desarrollo de software:** 'En JavaScript, una función de flecha (arrow function) no vincula su propio valor de *this*, a diferencia de las funciones tradicionales'.",
      color: "#ec4899"
    }
  };

  if (jakobsonBoxes.length > 0 && explainPanel) {
    function selectBox(boxElement) {
      const type = boxElement.getAttribute('data-type');
      const details = functionDetails[type];
      
      if (!details) return;

      // Remove active class from all boxes
      jakobsonBoxes.forEach(b => {
        b.classList.remove('active', 'active-emisor', 'active-receptor', 'active-contexto', 'active-mensaje', 'active-canal', 'active-codigo');
      });

      // Add appropriate active class
      boxElement.classList.add(`active-${type}`, 'active');

      // Update panel
      explainPanel.style.opacity = '0';
      setTimeout(() => {
        explainPanel.innerHTML = `
          <h4 class="jakobson-explain-title h5" style="color: ${details.color}">
            <i class="bi bi-info-circle-fill"></i> ${details.title}
          </h4>
          <p class="text-white mb-2"><strong>Enfoque:</strong> ${details.concept}</p>
          <p class="text-secondary small mb-3">${details.desc}</p>
          <div class="p-3 bg-dark bg-opacity-50 rounded border border-secondary border-opacity-10">
            <span class="text-white-50 small d-block mb-1">Caso de uso real:</span>
            <p class="text-white font-monospace small mb-0">${details.example}</p>
          </div>
        `;
        explainPanel.style.opacity = '1';
      }, 150);
    }

    // Add click events to boxes
    jakobsonBoxes.forEach(box => {
      box.addEventListener('click', () => selectBox(box));
    });

    // Select the first box by default (contexto)
    const defaultBox = document.querySelector('.jakobson-box[data-type="contexto"]');
    if (defaultBox) selectBox(defaultBox);
  }

  /* ==========================================================================
     2. PROXEMIA SLIDER DINÁMICO
     ========================================================================== */
  const proxemiaSlider = document.getElementById('proxemia-slider');
  const proxTitle = document.getElementById('proxemia-title');
  const proxDesc = document.getElementById('proxemia-desc');
  const proxDist = document.getElementById('proxemia-dist');
  const indicatorDot = document.getElementById('indicator-dot');

  const proxemiaData = [
    {
      title: "Espacio Íntimo (0 a 45 cm) 🤫",
      dist: "0.15m - 0.45m",
      desc: "Reservado únicamente para relaciones de máxima confianza, afecto estrecho y contacto físico (familia muy cercana, pareja). En un ambiente profesional, invadir este espacio sin consentimiento genera incomodidad inmediata y alerta defensiva.",
      position: "54%", // left position for the indicator dot
      color: "var(--accent-rose)"
    },
    {
      title: "Espacio Personal (45 cm a 1.20 m) 👥",
      dist: "0.45m - 1.20m",
      desc: "La distancia habitual en conversaciones casuales con amigos, compañeros de trabajo cercanos y discusiones técnicas informales en la oficina. Permite hablar en un tono de voz suave y mantener contacto visual amigable.",
      position: "65%",
      color: "var(--accent-amber)"
    },
    {
      title: "Espacio Social (1.20 m a 3.60 m) 👔",
      dist: "1.20m - 3.60m",
      desc: "La distancia óptima para interacciones puramente laborales, reuniones de negocios con clientes, entrevistas de trabajo formales y standups grupales en la oficina. Garantiza el respeto profesional sin distanciamiento excesivo.",
      position: "78%",
      color: "var(--accent-cyan)"
    },
    {
      title: "Espacio Público (más de 3.60 m) 🎤",
      dist: "3.60m - 10m+",
      desc: "Usada en discursos, conferencias generales, exposiciones académicas o charlas a grandes audiencias. Requiere un volumen de voz elevado (o micrófono) y gestos amplios para mantener el engagement de los receptores.",
      position: "92%",
      color: "var(--accent-violet)"
    }
  ];

  if (proxemiaSlider && proxTitle && proxDesc && proxDist && indicatorDot) {
    function updateProxemia(index) {
      const data = proxemiaData[index];
      
      proxTitle.style.color = data.color;
      proxTitle.textContent = data.title;
      proxDist.textContent = `Rango de Distancia: ${data.dist}`;
      proxDesc.textContent = data.desc;
      
      // Animate the red avatar dot position horizontally
      indicatorDot.style.left = data.position;
    }

    proxemiaSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      updateProxemia(val);
    });

    // Initialize with first value (Social space as default - index 2)
    proxemiaSlider.value = 2;
    updateProxemia(2);
  }
});
