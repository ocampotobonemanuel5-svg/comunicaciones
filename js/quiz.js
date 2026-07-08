/**
 * Interactive Communication Styles Quiz for Software Developers
 */
document.addEventListener('DOMContentLoaded', () => {
  const quizQuestions = [
    {
      question: "Recibes feedback de que tu código tiene fallos de optimización importantes durante una revisión:",
      options: [
        { text: "Aceptas que está mal de inmediato y te disculpas repetidamente sin revisar si realmente hay un error, sintiéndote frustrado internamente.", style: "Pasivo" },
        { text: "Respondes molesto: 'Mi código está perfectamente bien. Si no entienden la lógica avanzada que utilicé, ese es su problema'.", style: "Agresivo" },
        { text: "No dices nada en la reunión, pero luego comentas sarcásticamente a otros compañeros: 'Bueno, supongo que algunos se creen arquitectos de software de la noche a la mañana'.", style: "Pasivo-Agresivo" },
        { text: "Agradeces el feedback, analizas las secciones indicadas junto con el revisor y realizas las mejoras de optimización necesarias.", style: "Asertivo" }
      ]
    },
    {
      question: "El líder del proyecto te pide terminar una funcionalidad compleja en un plazo inviable (ej. 2 horas):",
      options: [
        { text: "Dices que sí de inmediato para evitar fricciones, pero te sobrecargas de estrés y terminas entregando un módulo defectuoso.", style: "Pasivo" },
        { text: "Aceptas con desagrado y demoras la entrega intencionalmente, poniendo excusas técnicas poco claras para excusarte.", style: "Pasivo-Agresivo" },
        { text: "Explicas objetivamente que la complejidad del módulo requiere al menos 6 horas de desarrollo y propones priorizar el núcleo de la función para el primer entregable.", style: "Asertivo" },
        { text: "Reaccionas molesto: '¡Es ridículo pedir esto en dos horas! Se nota que en la dirección no tienen idea de lo que cuesta programar'.", style: "Agresivo" }
      ]
    },
    {
      question: "En un trabajo en grupo de ADSO, un compañero no entrega su parte asignada a tiempo:",
      options: [
        { text: "Te comunicas en privado con él para entender qué dificultad tuvo, recuerdas la urgencia del proyecto y acuerdan un plazo de entrega final.", style: "Asertivo" },
        { text: "Lo dejas pasar en silencio, haces su parte con enojo acumulado y evitas hablarle por el resto del trimestre.", style: "Pasivo" },
        { text: "Lo confrontas duramente en el grupo de chat común, exigiéndole que se salga del proyecto porque su irresponsabilidad afecta a todos.", style: "Agresivo" },
        { text: "Le envías un mensaje sarcástico al grupo: 'Muchas gracias por tu valiosa colaboración. Se nota tu gran compromiso con el equipo'.", style: "Pasivo-Agresivo" }
      ]
    },
    {
      question: "El cliente solicita un cambio de diseño de último minuto que altera la arquitectura técnica planificada:",
      options: [
        { text: "Dices que lo harás, pero luego te quejas en privado con tus compañeros diciendo que el cliente no sabe lo que quiere y que es imposible trabajar así.", style: "Pasivo-Agresivo" },
        { text: "Le dices al cliente que su propuesta no tiene sentido técnico y que a estas alturas del proyecto ya no se aceptan modificaciones.", style: "Agresivo" },
        { text: "Explicas con empatía el impacto que tiene este cambio en el cronograma y presupuesto, y propones alternativas técnicas viables.", style: "Asertivo" },
        { text: "Aceptas el cambio sin advertir sobre los riesgos en la estabilidad del sistema, asumiendo la culpa del retraso resultante.", style: "Pasivo" }
      ]
    }
  ];

  let currentQuestionIndex = 0;
  const styleScores = { Asertivo: 0, Pasivo: 0, Agresivo: 0, "Pasivo-Agresivo": 0 };

  const quizCard = document.getElementById('quiz-card');
  if (!quizCard) return; // Only run on pages that have the quiz element

  function loadQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
      showResults();
      return;
    }

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;
    
    quizCard.innerHTML = `
      <div class="quiz-header">
        <span class="badge-tech">Pregunta ${currentQuestionIndex + 1} de ${quizQuestions.length}</span>
        <h3 class="h4 text-white mt-2">${currentQuestion.question}</h3>
        <div class="quiz-progress-bar">
          <div class="quiz-progress" style="width: ${progressPercent || 5}%"></div>
        </div>
      </div>
      <div class="quiz-options-list">
        ${currentQuestion.options.map((option, idx) => `
          <button class="quiz-option-btn" data-style="${option.style}">
            <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
            <span class="option-text">${option.text}</span>
          </button>
        `).join('')}
      </div>
    `;

    // Add event listeners to the buttons
    const buttons = quizCard.querySelectorAll('.quiz-option-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const selectedStyle = btn.getAttribute('data-style');
        styleScores[selectedStyle]++;
        currentQuestionIndex++;
        
        // Add subtle animation before loading next question
        quizCard.style.opacity = '0';
        setTimeout(() => {
          loadQuestion();
          quizCard.style.opacity = '1';
        }, 200);
      });
    });
  }

  function showResults() {
    // Find the style with the highest score
    let dominantStyle = 'Asertivo';
    let maxScore = -1;
    
    for (const [style, score] of Object.entries(styleScores)) {
      if (score > maxScore) {
        maxScore = score;
        dominantStyle = style;
      }
    }

    const asertivoPercentage = Math.round((styleScores['Asertivo'] / quizQuestions.length) * 100);
    
    let feedbackTitle = "";
    let feedbackText = "";
    let feedbackColor = "var(--accent-emerald)";

    switch (dominantStyle) {
      case 'Asertivo':
        feedbackTitle = "¡Excelente! Estilo Predominante: Asertivo 🎯";
        feedbackText = "Expresas tus ideas, límites y necesidades de forma clara, honesta y respetuosa en el desarrollo de software. Sabes negociar plazos y dar feedback constructivo sin entrar en conflictos destructivos ni callarte tus opiniones. ¡Sigue así, eres un pilar de comunicación para cualquier equipo ADSO!";
        feedbackColor = "var(--accent-emerald)";
        break;
      case 'Pasivo':
        feedbackTitle = "Estilo Predominante: Pasivo 🤫";
        feedbackText = "Tiendes a guardar tus opiniones o aceptar plazos inviables para evitar confrontaciones. Esto puede acumular frustración y afectar la calidad del software al no reportar riesgos a tiempo. Recuerda que tu perspectiva técnica es muy valiosa; decir 'no' de forma justificada y proponer alternativas también es parte del desarrollo profesional.";
        feedbackColor = "var(--accent-cyan)";
        break;
      case 'Agresivo':
        feedbackTitle = "Estilo Predominante: Agresivo ⚡";
        feedbackText = "Buscas imponer tu punto de vista sin considerar a los demás o reaccionas con defensividad ante el feedback. Aunque esto parezca demostrar carácter, deteriora las relaciones del equipo y bloquea la colaboración. Trabaja en la escucha activa y en modular el tono al debatir decisiones técnicas.";
        feedbackColor = "var(--accent-rose)";
        break;
      case 'Pasivo-Agresivo':
        feedbackTitle = "Estilo Predominante: Pasivo-Agresivo 🎭";
        feedbackText = "Evitas expresar tu inconformidad de forma directa, pero la manifiestas mediante el sarcasmo, indirectas o desgana en el trabajo. Este estilo confunde al equipo y oculta los problemas reales del proyecto. Intenta canalizar tus frustraciones comunicándolas de frente con argumentos sólidos y constructivos.";
        feedbackColor = "var(--accent-amber)";
        break;
    }

    quizCard.innerHTML = `
      <div class="quiz-result-card">
        <span class="badge-tech" style="background: rgba(255,255,255,0.05); border-color: ${feedbackColor}; color: ${feedbackColor}">Resultado del Test</span>
        <h3 class="h3 text-white mt-3">${feedbackTitle}</h3>
        <div class="result-percentage">${asertivoPercentage}% Asertividad</div>
        <p class="text-secondary small mb-4">${feedbackText}</p>
        <div class="p-3 bg-dark bg-opacity-25 rounded border border-secondary border-opacity-10 text-start mb-4">
          <h4 class="h6 text-white mb-2">Desglose de tus respuestas:</h4>
          <ul class="list-unstyled small text-secondary d-flex flex-column gap-1">
            <li>🎯 Asertivo: ${styleScores['Asertivo']} respuestas</li>
            <li>🤫 Pasivo: ${styleScores['Pasivo']} respuestas</li>
            <li>🎭 Pasivo-Agresivo: ${styleScores['Pasivo-Agresivo']} respuestas</li>
            <li>⚡ Agresivo: ${styleScores['Agresivo']} respuestas</li>
          </ul>
        </div>
        <button id="restart-quiz-btn" class="btn-premium">
          <i class="bi bi-arrow-clockwise"></i> Realizar test de nuevo
        </button>
      </div>
    `;

    document.getElementById('restart-quiz-btn').addEventListener('click', () => {
      currentQuestionIndex = 0;
      for (const style in styleScores) styleScores[style] = 0;
      loadQuestion();
    });
  }

  // Initialize the quiz
  loadQuestion();
});
