document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. SÉLECTION DES ÉLÉMENTS HTML (Synchronisés)
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

  // Case à cocher "Réinscription"
  const checkboxReinscription = document.getElementById("is-reinscription");
  const matriculeContainer = document.getElementById("matricule-container");

  let selectedProvider = "airtel"; // Par défaut

  // ==========================================================================
  // 1B. AFFICHAGE DYNAMIQUE DU CHAMP MATRICULE
  // ==========================================================================
  if (checkboxReinscription && matriculeContainer) {
    checkboxReinscription.addEventListener("change", () => {
      if (checkboxReinscription.checked) {
        matriculeContainer.style.display = "block";
      } else {
        matriculeContainer.style.display = "none";
      }
    });
  }

  // ==========================================================================
  // 2. GESTION DU CHOIX DE L'OPÉRATEUR (AIRTEL / MOOV)
  // ==========================================================================
  providerCards.forEach((card) => {
    card.addEventListener("click", () => {
      providerCards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");

      selectedProvider = card.dataset.provider;

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
      e.preventDefault(); // Bloque la soumission HTML brute

      const phoneNumber = phoneInput.value.trim();

      if (phoneNumber.length < 9) {
        alert("Veuillez entrer un numéro de téléphone valide au Gabon.");
        return;
      }

      // Formatage du texte de l'opérateur pour l'affichage
      const operatorName =
        selectedProvider === "airtel" ? "Airtel Money" : "Moov Money";

      // Configuration initiale de la modale pour le PIN
      modalStatus.innerHTML = `
        <h3 style="color: #1F3962; font-weight: 800; font-size: 18px; margin-bottom: 6px;">Autorisation Requise</h3>
        <p style="color: #6B7280; font-size: 13px; margin-bottom: 10px;">
          Une demande de prélèvement via <strong>${operatorName}</strong> a été initiée vers le <strong>${phoneNumber}</strong>.
        </p>
        <p style="color: #4B5563; font-size: 12px; font-weight: 600; margin-bottom: 15px;">
          Entrez votre code PIN secret à 4 chiffres :
        </p>
      `;

      // Rendre visible le formulaire de PIN interne
      if (pinForm) pinForm.style.display = "block";

      // Ouvrir la boîte de dialogue en retirant ".hidden"
      modalContainer.classList.remove("hidden");
      if (pinInput) {
        pinInput.value = "";
        pinInput.focus();
      }
    });
  }

  // ==========================================================================
  // 4. VALIDATION DU CODE PIN & SIMULATION DU LIEN BANCAIRE
  // ==========================================================================
  if (pinForm) {
    pinForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const pin = pinInput.value.trim();

      if (pin.length !== 4 || isNaN(pin)) {
        alert("Le code PIN doit comporter précisément 4 chiffres.");
        return;
      }

      // Cacher les boutons et la saisie pour mettre le chargement
      pinForm.style.display = "none";

      // Injecter le Spinner de chargement
      modalStatus.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px 0;">
          <div class="spinner"></div>
          <h3 style="color: #1F3962; font-weight: 700; font-size: 16px; margin-bottom: 4px;">Traitement en cours...</h3>
          <p style="color: #6B7280; font-size: 12px;">Validation de la transaction avec l'opérateur...</p>
        </div>
      `;

      // Simuler 3 secondes d'attente réseau
      setTimeout(() => {
        modalStatus.innerHTML = `
          <div class="success-icon" style="animation: popCheck 0.4s ease;">✓</div>
          <h3 style="color: #1F3962; font-weight: 800; font-size: 20px; margin-bottom: 8px;">Paiement Réussi !</h3>
          <p style="color: #4B5563; font-size: 13px; line-height: 1.5;">
            Frais de scolarité enregistrés. Votre espace *LinkEdu* est désormais activé pour la nouvelle année.
          </p>
        `;

        // Écriture de la validation en mémoire de session
        localStorage.setItem("statutReinscription", "valide");

        // Redirection finale vers l'accueil du Dashboard
        setTimeout(() => {
          window.location.href = "./dashboard1.html";
        }, 3000);
      }, 3000);
    });
  }

  // ==========================================================================
  // 5. BOUTON ANNULER
  // ==========================================================================
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      modalContainer.classList.add("hidden");
    });
  }
});
