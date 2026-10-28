let currentMethod = "airtel";

// Fonction globale d'interaction entre les cartes de mode de paiement
window.selectPaymentMethod = function(method, element) {
  currentMethod = method;
  
  document.querySelectorAll(".payment-card").forEach(card => {
    card.classList.remove("selected");
  });
  element.classList.add("selected");

  const mobileGroup = document.getElementById("mobile-money-group");
  const cardGroup = document.getElementById("credit-card-group");
  const phoneLabel = document.getElementById("phone-label");
  const phoneInput = document.getElementById("paymentPhone");
  const cardNumber = document.getElementById("card-number");
  const cardExp = document.getElementById("card-exp");
  const cardCvv = document.getElementById("card-cvv");
  const currentLang = localStorage.getItem("linkedu_lang") || "fr";

  if (method === "airtel" || method === "moov") {
    if (mobileGroup) mobileGroup.style.display = "block";
    if (cardGroup) cardGroup.style.display = "none";
    
    if (phoneLabel) {
      if (method === "airtel") {
        phoneLabel.textContent = window.translations[currentLang].pay_label_airtel || "Numéro Airtel Money *";
        if (phoneInput) phoneInput.placeholder = "ex: +241 77 XX XX XX";
      } else {
        phoneLabel.textContent = window.translations[currentLang].pay_label_moov || "Numéro Moov Money *";
        if (phoneInput) phoneInput.placeholder = "ex: +241 62 XX XX XX";
      }
    }

    if (phoneInput) phoneInput.required = true;
    if (cardNumber) cardNumber.required = false;
    if (cardExp) cardExp.required = false;
    if (cardCvv) cardCvv.required = false;
  } else if (method === "card") {
    if (mobileGroup) mobileGroup.style.display = "none";
    if (cardGroup) cardGroup.style.display = "block";
    
    if (phoneInput) phoneInput.required = false;
    if (cardNumber) cardNumber.required = true;
    if (cardExp) cardExp.required = true;
    if (cardCvv) cardCvv.required = true;
  }
};

window.fermerModale = function() {
  const modal = document.getElementById("payment-modal");
  if (modal) modal.classList.add("modal-hidden");
};

document.addEventListener("DOMContentLoaded", () => {
  
  // =================================================================
  // 0. DICTIONNAIRE MULTILINGUE SPÉCIFIQUE AU PAIEMENT
  // =================================================================
  const localPaymentTranslations = {
    fr: {
      pay_title: "Règlement des Frais",
      pay_subtitle: "Finalisez l'inscription de votre dossier.",
      pay_summary_label: "Frais de Scolarité :",
      pay_method_label: "Mode de paiement *",
      pay_method_card: "Carte Bancaire",
      pay_label_airtel: "Numéro Airtel Money *",
      pay_label_moov: "Numéro Moov Money *",
      placeholder_phone: "ex: +241 77 XX XX XX",
      pay_card_number: "Numéro de carte *",
      pay_card_exp: "Expiration *",
      pay_card_cvv: "CVV *",
      btn_pay_now: "Payer maintenant",
      link_dashboard_later: "Plus tard, retourner au tableau de bord",
      sec_3d_secure: "Sécurisation 3D Secure...",
      sec_bank_val: "Validation bancaire...",
      sec_connecting: "Connexion à",
      sec_enter_pin: "Code PIN",
      sec_pin_desc: "Confirmez avec votre code secret :",
      sec_processing: "Traitement en cours...",
      pay_success_title: "Paiement Réussi !",
      pay_success_desc: "Votre dossier a bien été transmis à l'administration avec son règlement. Il sera examiné prochainement pour étude et validation de votre inscription.",
      btn_understand: "Compris, retour à l'accueil",
      btn_cancel: "Annuler",
      btn_confirm: "Confirmer"
    },
    en: {
      pay_title: "Payment of Fees",
      pay_subtitle: "Finalize your application registration.",
      pay_summary_label: "Tuition Fees:",
      pay_method_label: "Payment Method *",
      pay_method_card: "Credit Card",
      pay_label_airtel: "Airtel Money Number *",
      pay_label_moov: "Moov Money Number *",
      placeholder_phone: "e.g. +241 77 XX XX XX",
      pay_card_number: "Card Number *",
      pay_card_exp: "Expiration *",
      pay_card_cvv: "CVV *",
      btn_pay_now: "Pay Now",
      link_dashboard_later: "Later, return to dashboard",
      sec_3d_secure: "Securing 3D Secure...",
      sec_bank_val: "Bank validation...",
      sec_connecting: "Connecting to",
      sec_enter_pin: "PIN Code",
      sec_pin_desc: "Confirm with your secret PIN:",
      sec_processing: "Processing...",
      pay_success_title: "Payment Successful!",
      pay_success_desc: "Your file has been submitted to the administration along with its payment. It will be reviewed shortly for study and registration approval.",
      btn_understand: "Understood, back to home",
      btn_cancel: "Cancel",
      btn_confirm: "Confirm"
    }
  };

  // Fusion propre avec le dictionnaire global
  window.translations = window.translations || {};
  window.translations.fr = Object.assign(window.translations.fr || {}, localPaymentTranslations.fr);
  window.translations.en = Object.assign(window.translations.en || {}, localPaymentTranslations.en);

  // Appliquer la langue courante
  if (typeof window.applyLanguage === "function") {
    window.applyLanguage(localStorage.getItem("linkedu_lang") || "fr");
  }

  // =================================================================
  // 1. CONFIGURATION DU RÔLE ET IMAGE DE FOND DYNAMIQUE
  // =================================================================
  const urlParams = new URLSearchParams(window.location.search);
  const role = urlParams.get("role") || "eleve";

  const roleConfigs = {
    eleve: { color: "#1e3a8a", bgClass: "role-eleve-bg" },
    parent: { color: "#059669", bgClass: "role-parent-bg" }
  };

  const cfg = roleConfigs[role] || roleConfigs.eleve;
  const heroHeader = document.getElementById("paymentHeroHeader");

  if (heroHeader) heroHeader.classList.add(cfg.bgClass);
  document.documentElement.style.setProperty('--primary', cfg.color);

  // =================================================================
  // 2. RÉCUPÉRATION DYNAMIQUE DU MONTANT DU DOSSIER OU TARIF
  // =================================================================
  const tarifsFallback = {
    "CONE": 10000, "CP": 15000, "CE1": 15000, "CE2": 15000, "CM1": 15000, "CM2": 15000,
    "6ème": 25000, "5ème": 25000, "4ème": 25000, "3ème": 25000, "2nde": 25000, "1ère": 25000, "Terminale": 25000,
    "Licence 1": 50000, "Licence 2": 55000, "Licence 3": 60000, "Master 1": 80000, "Master 2": 85000
  };

  const currentId = localStorage.getItem('currentCandidatureId');
  const candidatures = JSON.parse(localStorage.getItem('candidatures')) || [];
  const candidatureCourante = candidatures.find(c => String(c.id) === String(currentId));

  const totalPriceEl = document.getElementById("total-price");
  const summaryLabelEl = document.getElementById("summary-label");
  const currentLang = localStorage.getItem("linkedu_lang") || "fr";

  let montantCalcule = 25000;

  if (candidatureCourante && candidatureCourante.montantScolarite) {
    montantCalcule = candidatureCourante.montantScolarite;
    if (summaryLabelEl && candidatureCourante.classeDemandee) {
      const labelText = window.translations[currentLang].pay_summary_label || "Frais de Scolarité :";
      summaryLabelEl.textContent = `${labelText} (${candidatureCourante.classeDemandee})`;
    }
  } else if (candidatureCourante && candidatureCourante.classeDemandee && tarifsFallback[candidatureCourante.classeDemandee]) {
    montantCalcule = tarifsFallback[candidatureCourante.classeDemandee];
  }

  if (totalPriceEl) {
    totalPriceEl.textContent = montantCalcule.toLocaleString('fr-FR') + " FCFA";
  }

  // =================================================================
  // 3. SOUMISSION ET SIMULATION DE PAIEMENT
  // =================================================================
  const paymentForm = document.getElementById("paymentForm");
  const modalContainer = document.getElementById("payment-modal");
  const modalStatus = document.getElementById("modal-status");
  const pinForm = document.getElementById("pin-form");
  const pinInput = document.getElementById("pin-input");

  if (paymentForm) {
    paymentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      modalContainer.classList.remove("modal-hidden");
      if (pinForm) pinForm.style.display = "none";

      const dict = window.translations[localStorage.getItem("linkedu_lang") || "fr"];

      if (currentMethod === "card") {
        modalStatus.innerHTML = `<div class="spinner"></div><h3 style="font-size: 0.9rem; color: var(--text-main);">${dict.sec_3d_secure}</h3>`;
        setTimeout(() => {
          modalStatus.innerHTML = `<div class="spinner"></div><h3 style="font-size: 0.9rem; color: var(--text-main);">${dict.sec_bank_val}</h3>`;
          setTimeout(() => {
            validerEtEnregistrerPaiement();
          }, 2000);
        }, 1800);
      } else {
        const providerName = currentMethod === 'airtel' ? 'Airtel Money' : 'Moov Money';
        modalStatus.innerHTML = `<div class="spinner"></div><h3 style="font-size: 0.9rem; color: var(--text-main);">${dict.sec_connecting} ${providerName}...</h3>`;
        setTimeout(() => {
          modalStatus.innerHTML = `<h3 style="font-size: 0.95rem; color: var(--text-main); margin-bottom: 4px;">${dict.sec_enter_pin}</h3><p style="font-size: 0.75rem; color: var(--text-muted);">${dict.sec_pin_desc}</p>`;
          if (pinForm) pinForm.style.display = "flex";
          if (pinInput) pinInput.value = "";
        }, 1500);
      }
    });
  }

  if (pinForm) {
    pinForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const dict = window.translations[localStorage.getItem("linkedu_lang") || "fr"];
      pinForm.style.display = "none";
      modalStatus.innerHTML = `<div class="spinner"></div><h3 style="font-size: 0.9rem; color: var(--text-main);">${dict.sec_processing}</h3>`;
      
      setTimeout(() => {
        validerEtEnregistrerPaiement();
      }, 2000);
    });
  }

  // Enregistrement de la validation du paiement dans le localStorage
  function validerEtEnregistrerPaiement() {
    const dict = window.translations[localStorage.getItem("linkedu_lang") || "fr"];

    if (currentId) {
      let list = JSON.parse(localStorage.getItem('candidatures')) || [];
      let index = list.findIndex(c => String(c.id) === String(currentId));
      if (index !== -1) {
        list[index].paye = true;
        list[index].modePaiement = currentMethod;
        list[index].statut = "En attente"; // Statut initial d'étude de dossier par l'administration
        list[index].datePaiement = new Date().toISOString();
        localStorage.setItem('candidatures', JSON.stringify(list));
      }
    }

    modalStatus.innerHTML = `
      <div style="font-size: 2.2rem; color: #10b981; margin-bottom: 8px;"><i class="fa-solid fa-circle-check"></i></div>
      <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">${dict.pay_success_title}</h3>
      <p style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px;">
        ${dict.pay_success_desc}
      </p>
      <button type="button" class="btn-primary-action" onclick="window.location.href='index.html'">${dict.btn_understand}</button>
    `;
  }

});
