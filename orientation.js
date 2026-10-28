// Stockage temporaire des fichiers avant conversion Base64
const tempFiles = {};

document.addEventListener("DOMContentLoaded", () => {
  
  // =================================================================
  // 0. DICTIONNAIRE MULTILINGUE SPÉCIFIQUE À L'ORIENTATION
  // =================================================================
  const localOrientationTranslations = {
    fr: {
      orient_title: "Compléter mon Dossier",
      orient_subtitle: "Informations académiques et pièces justificatives.",
      label_study_level: "Niveau d'études *",
      option_choose: "Choisir...",
      level_prescolaire: "Préscolaire",
      level_primaire: "Primaire",
      level_secondaire: "Secondaire",
      level_superieur: "Supérieur",
      label_school_origin: "École de provenance *",
      placeholder_school_origin: "ex: École 241 / Lycée...",
      label_prev_class: "Classe précédente *",
      label_target_class: "Classe demandée *",
      option_select: "Sélectionner...",
      label_filiere: "Filière / Série souhaitée *",
      option_choose_filiere: "Choisir la filière",
      section_docs_title: "Pièces justificatives requises",
      doc_id_label: "Acte / ID *",
      doc_bulletin_label: "Bulletin *",
      doc_medical_label: "Certificat *",
      doc_photo_label: "Photo *",
      doc_action_add: "Ajouter",
      doc_action_take: "Prendre",
      doc_action_loaded: "Chargé !",
      btn_validate_folder: "Valider mon dossier",
      link_dashboard_later: "Plus tard, retourner au tableau de bord",
      alert_file_error: "Erreur lors de la lecture du fichier. Veuillez réessayer."
    },
    en: {
      orient_title: "Complete My Application",
      orient_subtitle: "Academic information and required supporting documents.",
      label_study_level: "Study Level *",
      option_choose: "Choose...",
      level_prescolaire: "Preschool",
      level_primaire: "Primary",
      level_secondaire: "Secondary",
      level_superieur: "Higher Education",
      label_school_origin: "Previous School *",
      placeholder_school_origin: "e.g. Ecole 241 / High School...",
      label_prev_class: "Previous Class *",
      label_target_class: "Target Class *",
      option_select: "Select...",
      label_filiere: "Desired Track / Series *",
      option_choose_filiere: "Choose track",
      section_docs_title: "Required Supporting Documents",
      doc_id_label: "Birth Certificate / ID *",
      doc_bulletin_label: "Report Card *",
      doc_medical_label: "Medical Certificate *",
      doc_photo_label: "Photo *",
      doc_action_add: "Upload",
      doc_action_take: "Capture",
      doc_action_loaded: "Uploaded!",
      btn_validate_folder: "Submit Application",
      link_dashboard_later: "Later, return to dashboard",
      alert_file_error: "Error reading file. Please try again."
    }
  };

  // Fusion sécurisée avec le dictionnaire global window.translations
  window.translations = window.translations || {};
  window.translations.fr = Object.assign(window.translations.fr || {}, localOrientationTranslations.fr);
  window.translations.en = Object.assign(window.translations.en || {}, localOrientationTranslations.en);

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
  const heroHeader = document.getElementById("orientationHeroHeader");

  if (heroHeader) heroHeader.classList.add(cfg.bgClass);
  document.documentElement.style.setProperty('--primary', cfg.color);

  // =================================================================
  // 2. GESTION ROBUSTE DES FICHIERS & FILEREADER (AVEC PROMISE)
  // =================================================================
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Écouteur sur chaque input de fichier pour feedback visuel immédiat
  document.querySelectorAll(".file-input").forEach(input => {
    input.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        tempFiles[e.target.id] = file;
        const parent = e.target.closest(".upload-card-compact");
        const infoZone = parent.querySelector(".file-info-mini");
        
        if (infoZone) {
          infoZone.style.display = "flex";
          const fileNameEl = infoZone.querySelector(".file-name");
          if (fileNameEl) fileNameEl.textContent = file.name;
        }

        const dropText = parent.querySelector(".drop-text");
        if (dropText) {
          const currentLang = localStorage.getItem("linkedu_lang") || "fr";
          dropText.textContent = window.translations[currentLang].doc_action_loaded || "Chargé !";
        }
      }
    });
  });

  // =================================================================
  // 3. SÉLECTEURS DYNAMIQUES DE CLASSES ET FILIÈRES
  // =================================================================
  const studyLevelSelect = document.getElementById("study-level");
  const prevClassSelect = document.getElementById("prev-class");
  const targetClassSelect = document.getElementById("target-class");
  const filiereContainer = document.getElementById("filiereContainer");
  const filiereSelect = document.getElementById("filiereSelect");

  const classesData = {
    prescolaire: ["Maison", "Petite Section", "Moyenne Section", "Grande Section"],
    primaire: ["Grande Section", "1re Année", "2e Année", "3e Année", "4e Année", "5e Année"],
    secondaire: ["5e Année", "6ème", "5ème", "4ème", "3ème", "2nde", "1ère", "Terminale"],
    superieur: ["Terminale", "Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2", "Doctorat"]
  };

  const filieresData = {
    secondaire: [
      "Scientifique (Séries C / D)",
      "Littéraire (Séries A1 / A2)",
      "Technique & Industrielle",
      "Tertiaire & Gestion"
    ],
    superieur: [
      "Génie Informatique & Développement Web",
      "Réseaux & Télécommunications",
      "Transit & Douane",
      "Gestion d'Entreprise & Management",
      "Droit & Sciences Politiques",
      "Sciences Biomédicales",
      "Autres"
    ]
  };

  const tarifsScolarite = {
    prescolaire: 10000,
    primaire: 15000,
    secondaire: { default: 70000, lycee: 80000 },
    superieur: 120000
  };

  studyLevelSelect?.addEventListener("change", () => {
    const level = studyLevelSelect.value;
    const list = classesData[level] || [];
    const currentLang = localStorage.getItem("linkedu_lang") || "fr";
    const defaultOptionText = window.translations[currentLang].option_select || "Choisir...";
    
    [prevClassSelect, targetClassSelect].forEach(select => {
      if (select) {
        select.disabled = false;
        select.innerHTML = `<option value="" disabled selected>${defaultOptionText}</option>`;
        list.forEach(c => select.innerHTML += `<option value="${c}">${c}</option>`);
      }
    });

    if (filiereContainer) filiereContainer.style.display = "none";
    if (filiereSelect) {
      filiereSelect.required = false;
      filiereSelect.value = "";
    }
  });

  targetClassSelect?.addEventListener("change", () => {
    const level = studyLevelSelect.value;
    const targetClass = targetClassSelect.value;
    const classesLyceeSpecialise = ["2nde", "1ère", "Terminale"];
    const currentLang = localStorage.getItem("linkedu_lang") || "fr";

    if (level === "superieur" || (level === "secondaire" && classesLyceeSpecialise.includes(targetClass))) {
      if (filiereContainer) filiereContainer.style.display = "block";
      if (filiereSelect) {
        filiereSelect.required = true;
        const defaultFiliereText = window.translations[currentLang].option_choose_filiere || "Choisir la filière";
        filiereSelect.innerHTML = `<option value="" disabled selected>${defaultFiliereText}</option>`;
        
        const targetFiliereKey = level === "superieur" ? "superieur" : "secondaire";
        (filieresData[targetFiliereKey] || []).forEach(f => {
          filiereSelect.innerHTML += `<option value="${f}">${f}</option>`;
        });
      }
    } else {
      if (filiereContainer) filiereContainer.style.display = "none";
      if (filiereSelect) {
        filiereSelect.required = false;
        filiereSelect.value = "";
      }
    }
  });

  // =================================================================
  // 4. SOUMISSION ET ENREGISTREMENT COMPLET DES DONNÉES & PIÈCES
  // =================================================================
  const uploadForm = document.getElementById("upload-form");
  if (uploadForm) {
    uploadForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      let currentId = localStorage.getItem('currentCandidatureId');
      let candidatures = JSON.parse(localStorage.getItem('candidatures')) || [];
      let index = candidatures.findIndex(c => String(c.id) === String(currentId));

      // Sécurité si l'ID n'existe pas encore dans le localStorage
      if (index === -1) {
        currentId = 'cand_' + Date.now();
        localStorage.setItem('currentCandidatureId', currentId);
        const nouvelleCandidature = { id: currentId, role: role };
        candidatures.push(nouvelleCandidature);
        index = candidatures.length - 1;
      }

      // Calcul dynamique du montant de scolarité
      const level = studyLevelSelect ? studyLevelSelect.value : "";
      const targetClass = targetClassSelect ? targetClassSelect.value : "";
      let montantScolarite = 0;

      if (level === "prescolaire") {
        montantScolarite = tarifsScolarite.prescolaire;
      } else if (level === "primaire") {
        montantScolarite = tarifsScolarite.primaire;
      } else if (level === "secondaire") {
        montantScolarite = ["2nde", "1ère", "Terminale"].includes(targetClass) 
          ? tarifsScolarite.secondaire.lycee 
          : tarifsScolarite.secondaire.default;
      } else if (level === "superieur") {
        montantScolarite = tarifsScolarite.superieur;
      }

      try {
        // Récupération sécurisée des fichiers (via input direct ou stockage temporaire)
        const fileIdInput = document.getElementById("file-id")?.files[0] || tempFiles["file-id"];
        const fileBulletinInput = document.getElementById("file-bulletin")?.files[0] || tempFiles["file-bulletin"];
        const fileMedicalInput = document.getElementById("file-medical")?.files[0] || tempFiles["file-medical"];
        const filePhotoInput = document.getElementById("file-photo")?.files[0] || tempFiles["file-photo"];

        // Conversion asynchrone rigoureuse en Base64 pour l'administration
        const [base64Id, base64Bulletin, base64Medical, base64Photo] = await Promise.all([
          getBase64(fileIdInput),
          getBase64(fileBulletinInput),
          getBase64(fileMedicalInput),
          getBase64(filePhotoInput)
        ]);

        // Injection des pièces jointes Base64 dans l'objet de candidature
        if (base64Id) candidatures[index].fileId = base64Id;
        if (base64Bulletin) candidatures[index].fileBulletin = base64Bulletin;
        if (base64Medical) candidatures[index].fileMedical = base64Medical;
        if (base64Photo) candidatures[index].filePhoto = base64Photo;

        // Injection des métadonnées académiques
        candidatures[index].niveau = level;
        candidatures[index].ecoleOrigine = document.getElementById("school-origin")?.value || "";
        candidatures[index].classePrecedente = prevClassSelect ? prevClassSelect.value : "";
        candidatures[index].classeDemandee = targetClass;
        candidatures[index].filiere = filiereSelect && filiereSelect.value ? filiereSelect.value : "Non spécifiée";
        candidatures[index].montantScolarite = montantScolarite;
        candidatures[index].dossierComplet = true;
        candidatures[index].statut = "En attente"; // Statut initial pour l'administration
        
        // Persistance globale dans le localStorage
        localStorage.setItem('candidatures', JSON.stringify(candidatures));

        // Redirection vers l'étape de paiement
        window.location.href = `paiement.html?role=${role}`;

      } catch (error) {
        console.error("Erreur critique lors de l'encodage des pièces justificatives :", error);
        const currentLang = localStorage.getItem("linkedu_lang") || "fr";
        alert(window.translations[currentLang].alert_file_error || "Erreur lors de la lecture des fichiers.");
      }
    });
  }

  // Gestion du retour arrière mobile pour la modale
  window.addEventListener('popstate', () => {
    if (document.getElementById("modal-visualisation")?.style.display === "flex") {
      window.fermerVisualisation();
    }
  });
});

// =================================================================
// 5. FONCTIONS GLOBALES DE PRÉVISUALISATION DES PIÈCES (MODALE)
// =================================================================
window.visualiser = (inputId) => {
  const file = tempFiles[inputId] || document.getElementById(inputId)?.files[0];
  
  if (!file) {
    alert("Aucun fichier trouvé pour cet aperçu. Veuillez le sélectionner à nouveau.");
    return;
  }

  const url = URL.createObjectURL(file);
  const modal = document.getElementById("modal-visualisation");
  const content = document.getElementById("modal-content");
  
  if (content) content.innerHTML = "";

  if (file.type === "application/pdf") {
    const container = document.createElement("div");
    container.style.cssText = "text-align:center; color:white; padding:20px; width: 100%;";
    
    const btn = document.createElement("a");
    btn.textContent = "Ouvrir le document PDF";
    btn.href = url;
    btn.target = "_blank";
    btn.style.cssText = "background:var(--primary); color:white; padding:12px 20px; border-radius:6px; text-decoration:none; font-size:0.85rem; display:inline-block;";
    
    container.appendChild(btn);
    if (content) content.appendChild(container);
  } else {
    if (content) content.innerHTML = `<img src="${url}" style="max-width:100%; max-height:85vh; object-fit:contain; border-radius:6px;"/>`;
  }
  
  if (modal) {
    modal.style.display = "flex";
    history.pushState({ modal: 'open' }, '');
  }
};

window.fermerVisualisation = () => {
  const modal = document.getElementById("modal-visualisation");
  const content = document.getElementById("modal-content");
  if (modal) {
    modal.style.display = "none";
    if (content) content.innerHTML = "";
    if (history.state && history.state.modal === 'open') {
      history.back();
    }
  }
};
