document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. DIAPORAMA D'ARRIÈRE-PLAN (10s)
  // ==========================================
  const slideshowContainer = document.getElementById("app-slideshow");
  const imagesList = [
    "../images/etu1.jpg",
    "../images/etu2.jpg",
    "../images/el1.jpg",
    "../images/el2.jpg",
    "../images/ens.jpg",
    "../images/pri1.jpg",
  ];

  if (slideshowContainer) {
    let currentImageIndex = 0;

    imagesList.forEach((src, index) => {
      const img = document.createElement("img");
      img.src = src;
      img.style.position = "absolute";
      img.style.top = "0";
      img.style.left = "0";
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      img.style.objectPosition = "center";
      img.style.opacity = index === 0 ? "1" : "0";
      img.style.transition = "opacity 3.5s ease-in-out";
      img.style.zIndex = "-2";
      img.style.display = "block";
      slideshowContainer.appendChild(img);
    });

    const firstImg = slideshowContainer.querySelector("img");
    if (firstImg) {
      if (firstImg.complete) {
        startSlideshow();
      } else {
        firstImg.addEventListener("load", startSlideshow);
      }
    }

    function startSlideshow() {
      setInterval(() => {
        const imgs = slideshowContainer.querySelectorAll("img");
        if (imgs.length === 0) return;

        imgs[currentImageIndex].style.opacity = "0";
        currentImageIndex = (currentImageIndex + 1) % imagesList.length;
        imgs[currentImageIndex].style.opacity = "1";
      }, 10000);
    }
  }

  // ==========================================
  // 2. ADAPTATION DYNAMIQUE DES TARIFS FICTIFS
  // ==========================================
  const scolariteLabel = document.getElementById("scolarite-label");
  const scolaritePrice = document.getElementById("scolarite-price");
  const totalPrice = document.getElementById("total-price");

  const pricingPlan = {
    creche: { label: "Frais de scolarité (Crèche)", amount: "10 000 FCFA" },
    primaire: { label: "Frais de scolarité (Primaire)", amount: "15 000 FCFA" },
    secondaire: {
      label: "Frais de scolarité (Collège / Lycée)",
      amount: "25 000 FCFA",
    },
    superieur: {
      label: "Frais de scolarité (Supérieur)",
      amount: "50 000 FCFA",
    },
  };

  const savedLevel = localStorage.getItem("selectedStudyLevel") || "secondaire";

  if (pricingPlan[savedLevel]) {
    if (scolariteLabel)
      scolariteLabel.textContent = pricingPlan[savedLevel].label;
    if (scolaritePrice)
      scolaritePrice.textContent = pricingPlan[savedLevel].amount;
    if (totalPrice) totalPrice.textContent = pricingPlan[savedLevel].amount;
  }

  // ==========================================
  // 3. GESTION DES REINSCRIPTIONS
  // ==========================================
  const checkboxReinscription = document.getElementById("is-reinscription");
  const matriculeContainer = document.getElementById("matricule-container");

  if (checkboxReinscription && matriculeContainer) {
    checkboxReinscription.addEventListener("change", () => {
      if (checkboxReinscription.checked) {
        matriculeContainer.style.display = "flex";
      } else {
        matriculeContainer.style.display = "none";
      }
    });
  }

  // ==========================================
  // 4. CHOIX DE L'OPÉRATEUR (AIRTEL / MOOV)
  // ==========================================
  const providerCards = document.querySelectorAll(".provider-card");
  const phoneInput = document.getElementById("phone-input");
  let selectedProvider = "airtel";

  providerCards.forEach((card) => {
    card.addEventListener("click", () => {
      providerCards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");

      selectedProvider = card.dataset.provider;
      phoneInput.placeholder =
        selectedProvider === "moov" ? "Ex: 065 00 00 00" : "Ex: 077 00 00 00";
    });
  });

  // ==========================================
  // 5. DEMANDE DE PRÉLÈVEMENT AVEC CHARGEMENT RÉALISTE
  // ==========================================
  const paymentForm = document.getElementById("payment-form");
  const modalContainer = document.getElementById("payment-modal");
  const modalStatus = document.getElementById("modal-status");
  const pinForm = document.getElementById("pin-form");
  const pinInput = document.getElementById("pin-input");
  const cancelBtn = document.getElementById("cancel-btn");

  if (paymentForm) {
    paymentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const phoneNumber = phoneInput.value.trim();

      if (phoneNumber.length < 9) {
        alert("Veuillez entrer un numéro de téléphone gabonais valide.");
        return;
      }

      const operatorName =
        selectedProvider === "airtel" ? "Airtel Money" : "Moov Money";
      const currentAmount = pricingPlan[savedLevel]
        ? pricingPlan[savedLevel].amount
        : "25 000 FCFA";

      // ÉTAPE A : Afficher d'abord la modale avec un écran de chargement réaliste
      if (pinForm) pinForm.style.display = "none"; // On cache le formulaire de code PIN pour l'instant
      modalContainer.classList.remove("hidden");

      modalStatus.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px 0;">
          <div class="spinner"></div>
          <h3 style="color: #1F3962; font-weight: 700; font-size: 14px; margin-bottom: 4px;">Initialisation de la transaction</h3>
          <p style="color: #6B7280; font-size: 11px;">Création de la demande vers le réseau mobile...</p>
        </div>
      `;

      // ÉTAPE B : Après une attente de 2.5 secondes, on affiche la demande de PIN
      setTimeout(() => {
        modalStatus.innerHTML = `
          <h3 style="color: #1F3962; font-weight: 800; font-size: 16px; margin-bottom: 6px;">Autorisation Requise</h3>
          <p style="color: #6B7280; font-size: 12px; margin-bottom: 8px;">
            Demande de prélèvement de <strong>${currentAmount}</strong> via <strong>${operatorName}</strong> vers le <strong>${phoneNumber}</strong>.
          </p>
          <p style="color: #4B5563; font-size: 11px; font-weight: 600; margin-bottom: 12px;">
            Entrez votre code PIN secret à 4 chiffres :
          </p>
        `;

        if (pinForm) {
          pinForm.style.display = "flex"; // Faire réapparaître la saisie du PIN
          pinInput.value = "";
          pinInput.focus();
        }
      }, 2500); // 2.5 secondes d'attente réseau simulée
    });
  }

  // ==========================================
  // 6. SIMULATION DE VALIDATION RÉSEAU PIN (SUCCÈS)
  // ==========================================
  if (pinForm) {
    pinForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const pin = pinInput.value.trim();

      if (pin.length !== 4 || isNaN(pin)) {
        alert("Le code PIN doit comporter précisément 4 chiffres.");
        return;
      }

      pinForm.style.display = "none";

      modalStatus.innerHTML = `
        <div class="spinner"></div>
        <h3 style="color: #1F3962; font-weight: 700; font-size: 14px; margin-bottom: 4px;">Traitement en cours...</h3>
        <p style="color: #6B7280; font-size: 11px;">Validation réseau de la transaction...</p>
      `;

      setTimeout(() => {
        modalStatus.innerHTML = `
          <div class="success-icon">✓</div>
          <h3 style="color: #1F3962; font-weight: 800; font-size: 18px; margin-bottom: 6px;">Paiement Réussi !</h3>
          <p style="color: #4B5563; font-size: 12px; line-height: 1.4;">
            Scolarité enregistrée avec succès. Votre accès **LinkEdu** est désormais activé.
          </p>
        `;

        localStorage.setItem("statutInscription", "paye");

        setTimeout(() => {
          window.location.href = "./dashboard1.html";
        }, 2500);
      }, 3000);
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      modalContainer.classList.add("hidden");
    });
  }
});
