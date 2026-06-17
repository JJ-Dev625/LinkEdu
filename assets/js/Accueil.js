document.addEventListener("DOMContentLoaded", () => {
  
  // 1. EFFET DE DACTYLOGRAPHIE SUR LE SOUS-TITRE
  const tagline = document.querySelector(".brand-tagline");
  if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = ""; // On vide le texte initial
    let index = 0;

    function typeWriter() {
      if (index < text.length) {
        tagline.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 50); // Vitesse de frappe (50ms par lettre)
      }
    }
    // On lance l'effet après un mini délai
    setTimeout(typeWriter, 400);
  }

  // 2. EFFET INTERACTIF AU SURVOL DES BOUTONS
  const cards = document.querySelectorAll(".action-card");

  cards.forEach(card => {
    const btn = card.querySelector(".btn");

    if (btn) {
      // Si on survole le bouton, la carte réagit aussi
      btn.addEventListener("mouseenter", () => {
        card.style.borderColor = card.classList.contains("card-old") ? "#1F3962" : "#10B881";
        card.style.transform = "translateY(-12px)";
        card.style.boxShadow = "0 15px 35px rgba(31, 57, 98, 0.2)";
      });

      // Quand on quitte le bouton, on remet le style d'origine du CSS
      btn.addEventListener("mouseleave", () => {
        card.style.borderColor = "";
        card.style.transform = "";
        card.style.boxShadow = "";
      });
    }
  });
});
