

document.addEventListener("DOMContentLoaded", () => {
  
  // 1. ÉLÉMENTS DE CONTRÔLE
  const banner = document.getElementById("restriction-banner");
  const bannerTitle = document.getElementById("banner-title");
  const bannerSubtitle = document.getElementById("banner-subtitle");
  const bannerBtn = document.getElementById("banner-action-btn");
  const statusBadge = document.getElementById("user-status-badge");
  
  // Les sections à cibler pour le blocage temporel
  const sectionStats = document.getElementById("section-stats");
  const sectionSchedule = document.getElementById("section-schedule");

  // 2. DATE TARGET DE LA RENTRÉE AU GABON (28 Septembre 2026 à 08h00)
  const dateRentree = new Date("September 28, 2026 08:00:00").getTime();

  // 3. LOGIQUE : APPLIQUER LE VERROUILLAGE STRICT
  function appliquerVerrouillageStrict() {
    // Modifier le bandeau en mode urgent (Rouge)
    if (banner) {
      banner.style.display = "flex";
      banner.classList.add("banner-urgent");
      if (bannerTitle) bannerTitle.textContent = "Accès Restreint !";
      if (bannerSubtitle) bannerSubtitle.textContent = "Date limite dépassée. Régularisez votre scolarité.";
    }

    // Muter le badge de profil
    if (statusBadge) {
      statusBadge.textContent = "Situation : Non réinscrit";
      statusBadge.className = "user-role status-bloque";
    }

    // Appliquer le flou et insérer l'overlay sur les stats
    if (sectionStats && !sectionStats.classList.contains("locked")) {
      sectionStats.classList.add("locked");
      const overlay = document.createElement("div");
      overlay.className = "locked-overlay";
      overlay.innerHTML = "<span>🔒 Contenu Verrouillé</span>";
      sectionStats.appendChild(overlay);
    }

    // Appliquer le flou et insérer l'overlay sur l'emploi du temps
    if (sectionSchedule && !sectionSchedule.classList.contains("locked")) {
      sectionSchedule.classList.add("locked");
      const overlay = document.createElement("div");
      overlay.className = "locked-overlay";
      overlay.innerHTML = "<span>🔒 Emploi du temps indisponible</span>";
      sectionSchedule.appendChild(overlay);
    }
  }

  // 4. LOGIQUE : ACCÈS LIBRE (AVANT LA RENTRÉE)
  function gererPeriodeGrace(tempsRestantTexte) {
    const aDejaPaye = localStorage.getItem("statutReinscription") === "valide";

    if (aDejaPaye) {
      // Si l'élève est à jour, pas besoin de l'embêter avec le compte à rebours
      if (banner) banner.style.display = "none";
      if (statusBadge) {
        statusBadge.textContent = "Élève • Statut : À jour";
        statusBadge.className = "user-role status-valide";
      }
    } else {
      // Toujours accessible mais affichage du compte à rebours ambré d'avertissement
      if (banner) {
        banner.style.display = "flex";
        banner.classList.remove("banner-urgent");
        if (bannerTitle) bannerTitle.textContent = "Réinscription 2026-2027 en cours";
        if (bannerSubtitle) bannerSubtitle.innerHTML = ⏳ Prochaine rentrée dans : <strong>${tempsRestantTexte}</strong>.;
      }
      if (statusBadge) {
        statusBadge.textContent = "Élève • Statut : En attente";
        statusBadge.className = "user-role"; // Style neutre d'origine
      }
    }
  }

  // 5. BOUTON DU COMPTE À REBOURS TEMPS RÉEL
  const timer = setInterval(() => {
    const maintenant = new Date().getTime();
    const distance = dateRentree - maintenant;

    // Calcul mathématique des jours, heures et minutes
    const jours = Math.floor(distance / (1000 * 60 * 60 * 24));
    const heures = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
    const texteTemps = ${jours}j ${heures}h ${minutes}m;

    const aDejaPaye = localStorage.getItem("statutReinscription") === "valide";

    // Si le paiement est détecté en cours de route
    if (aDejaPaye) {
      clearInterval(timer);
      if (banner) banner.style.display = "none";
      if (statusBadge) {
        statusBadge.textContent = "Élève • Statut : À jour";
        statusBadge.className = "user-role status-valide";
      }
      return;
    }

    // Aiguillage selon la date
    if (distance < 0) {
      clearInterval(timer);
      appliquerVerrouillageStrict();
    } else {
      gererPeriodeGrace(texteTemps);
    }
  }, 1000);

});