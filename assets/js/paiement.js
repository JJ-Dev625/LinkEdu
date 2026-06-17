document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================================================
  // 1. SÉLECTION DES ÉLÉMENTS HTML
  // ==========================================================================
  const providerCards = document.querySelectorAll(".provider-card");
  const phoneInput = document.getElementById("phone-input");
  const paymentForm = document.getElementById("payment-form");
  
  // Éléments de la boîte de dialogue (Modal)
  const modalContainer = document.getElementById("payment-modal");
  const modalStatus = document.getElementById("modal-status");
  const pinForm = document.getElementById("pin-form");
  const pinInput = document.getElementById("pin-input");
  const cancelBtn = document.getElementById("cancel-btn");

  let selectedProvider = "airtel"; // Par défaut

  // ==========================================================================
  // 2. GESTION DU CHOIX DE L'OPÉRATEUR (AIRTEL / MOOV)
  // ==========================================================================
  providerCards.forEach(card => {
    card.addEventListener("click", () => {
      // Retirer la classe active de toutes les cartes
      providerCards.forEach(c => c.classList.remove("active"));
      
      // Ajouter la classe active sur la carte cliquée
      card.classList.add("active");
      
      // Mettre à jour l'opérateur sélectionné
      selectedProvider = card.dataset.provider;

      // Optionnel : Tu peux changer le préfixe ou le placeholder selon l'opérateur
      if (selectedProvider === "moov") {
        phoneInput.placeholder = "065 xx xx xx";
      } else {
        phoneInput.placeholder = "077 xx xx xx";
      }
    });
  });

  // ==========================================================================
  // 3. SOUMISSION DU FORMULAIRE PRINCIPAL (TÉLÉPHONE)
  // ==========================================================================
  if (paymentForm) {
    paymentForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Empêche le rechargement de la page

      const phoneNumber = phoneInput.value.trim();

      // Validation basique du numéro (ex: minimum 9 caractères)
      if (phoneNumber.length < 9) {
        alert("Veuillez entrer un numéro de téléphone valide au Gabon.");
        return;
      }

      // Configuration de la Modal pour la saisie du PIN
      modalStatus.innerHTML = `
        <h3 style="color: #1F3962; font-weight: 800; font-size: 18px; margin-bottom: 6px;">Autorisation Requise</h3>
        <p style="color: #6B7280; font-size: 13px; margin-bottom: 20px;">
          Un message de confirmation a été envoyé au <strong>${phoneNumber}</strong>. Veuillez saisir votre code PIN secret à 4 chiffres pour valider le prélèvement.
        </p>
      `;

      // Afficher la Modal
      modalContainer.classList.add("show-modal");
      if (pinInput) pinInput.focus();
    });
  }

  // ==========================================================================
  // 4. SOUMISSION DU CODE PIN & SIMULATION DU REUT-TIME PAYMENT
  // ==========================================================================
  if (pinForm) {
    pinForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const pin = pinInput.value.trim();

      if (pin.length !== 4 || isNaN(pin)) {
        alert("Le code PIN doit être composé de 4 chiffres.");
        return;
      }

      // Phase 1 : Masquer le formulaire de saisie pour montrer le chargement
      pinForm.style.display = "none";

      // Phase 2 : Afficher le Spinner de traitement (Simulation de 3 secondes)
      modalStatus.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px 0;">
          <div class="payment-spinner" style="width: 50px; height: 50px; border: 4px solid #F3F4F6; border-top: 4px solid #1F3962; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px;"></div>
          <h3 style="color: #1F3962; font-weight: 700; font-size: 16px; margin-bottom: 4px;">Traitement en cours...</h3>
          <p style="color: #6B7280; font-size: 12px;">Communication sécurisée avec les serveurs de télécom.</p>
        </div>
      `;

      // Phase 3 : Après 3 secondes, affichage du Badge Vert Succès et écriture mémoire
      setTimeout(() => {
        modalStatus.innerHTML = `
          <div style="display: flex; justify-content: center; margin-bottom: 20px; animation: fadeInPage 0.4s ease;">
            <div style="width: 64px; height: 64px; background-color: #E6F7F0; border-radius: 50%; display: flex; justify-content: center; align-items: center; border: 2px solid #10B881;">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B881" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
          <h3 style="color: #1F3962; font-weight: 800; font-size: 20px; margin-bottom: 8px;">Paiement Réussi !</h3>
          <p style="color: #4B5563; font-size: 13px; line-height: 1.5; padding: 0 10px;">
            Frais de réinscription validés. Votre profil <strong>LinkEdu</strong> est désormais entièrement actif pour l'année 2026-2027.
          </p>
        `;

        // 🌟 L'ACTION CRUCIALE : On active le jeton de réussite dans le navigateur
        localStorage.setItem("statutReinscription", "valide");

        // Phase 4 : Redirection automatique vers le Dashboard au bout de 3.2 secondes
        setTimeout(() => {
          window.location.href = "./dashboard1.html";
        }, 3200);

      }, 3000);
    });
  }

  // ==========================================================================
  // 5. FERMETURE DE LA MODAL (ANNULATION)
  // ==========================================================================
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      modalContainer.classList.remove("show-modal");
      // Réinitialise le formulaire PIN au cas où il aurait été caché
      if (pinForm) {
        pinForm.style.display = "block";
        pinForm.reset();
      }
    });
  }
});

// Animation CSS du spinner injectée dynamiquement au cas où
const style = document.createElement('style');
style.innerHTML = `
  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
`;
document.head.appendChild(style);
