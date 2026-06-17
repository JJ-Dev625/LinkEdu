document.addEventListener("DOMContentLoaded", () => {
  
  const banner = document.querySelector(".restriction-banner");
  const lockedElements = document.querySelectorAll(".locked");
  const userRole = document.querySelector(".user-role");
  const bannerBtn = document.querySelector(".banner-btn");

  // 1. FONCTION QUI DÉBLOQUE TOUT L'ÉCRAN DYNAMIQUEMENT
  function debloquerDashboard() {
    // Masquer le bandeau de restriction
    if (banner) banner.style.display = "none";
    
    // Mettre à jour le badge de statut de l'élève en vert
    if (userRole) {
      userRole.textContent = "Élève • Trimestre 1";
      userRole.style.backgroundColor = "#E6F7F0";
      userRole.style.color = "#10B881";
    }

    // Retirer le flou et supprimer les overlays de cadenas
    lockedElements.forEach(el => {
      el.classList.remove("locked");
      const overlay = el.querySelector(".locked-overlay");
      if (overlay) overlay.remove();
    });

    console.log("🔓 LinkEdu : Situation régularisée. Dashboard débloqué !");
  }

  // 2. VÉRIFICATION DU STATUT EN MÉMOIRE (LOCALSTORAGE)
  const statut = localStorage.getItem("statutReinscription");
  
  if (statut === "valide") {
    // Si l'élève a payé, on applique directement le déblocage
    debloquerDashboard();
  }

  // 3. SÉCURITÉ : ALERTE VISUELLE SI ON CLIQUE SUR UN MODULE BLOQUÉ
  const lockedOverlays = document.querySelectorAll(".locked-overlay");
  lockedOverlays.forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      e.preventDefault();
      
      // Fait clignoter le bouton "Régler" pour guider l'utilisateur
      if (bannerBtn) {
        bannerBtn.style.transform = "scale(1.12)";
        bannerBtn.style.backgroundColor = "#EF4444";
        bannerBtn.style.transition = "all 0.2s ease";

        setTimeout(() => {
          bannerBtn.style.transform = "";
          bannerBtn.style.backgroundColor = "";
        }, 500);
      }
    });
  });

  // 4. MODE PHASE DE TEST : TOUCHES DU CLAVIER
  document.addEventListener("keydown", (e) => {
    // Touche 'P' pour forcer le déblocage manuel sans passer par le paiement
    if (e.key.toLowerCase() === "p") {
      localStorage.setItem("statutReinscription", "valide");
      debloquerDashboard();
    }
    
    // Touche 'R' pour RÉINITIALISER (Re-bloquer le système pour une nouvelle démo)
    if (e.key.toLowerCase() === "r") {
      localStorage.removeItem("statutReinscription");
      window.location.reload(); // Recharge la page pour tout re-verrouiller
      console.log("🔄 Mode Test : Statut réinitialisé, dashboard verrouillé.");
    }
  });

});


