document.addEventListener("DOMContentLoaded", () => {
  
  // =================================================================
  // 0. DICTIONNAIRE MULTILINGUE SPÉCIFIQUE À L'INSCRIPTION
  // =================================================================
  const localSignupTranslations = {
    fr: {
      signup_title_eleve: "Inscription Élève",
      signup_sub_eleve: "Crée ton compte pour accéder à ton suivi scolaire.",
      signup_title_parent: "Inscription Parent / Tuteur",
      signup_sub_parent: "Inscrivez votre enfant et créez automatiquement votre compte de suivi.",
      label_fullname_eleve: "Nom et Prénom",
      placeholder_fullname_eleve: "ex: Jean Mamboundou",
      label_email_eleve: "Adresse Email",
      placeholder_email: "ex: nom@email.com",
      label_parent_email: "Email du Parent / Tuteur Référent",
      placeholder_parent_email: "ex: parent@email.com",
      label_parent_name: "Nom et Prénom du Parent / Tuteur",
      placeholder_parent_name: "ex: M. Mamboundou",
      label_student_name: "Nom et Prénom de l'enfant (Élève)",
      placeholder_student_name: "ex: Junior Mamboundou",
      label_parent_pivot_email: "Adresse Email du Parent (Compte Pivot)",
      hint_parent_pivot: "Cet email servira de compte pivot pour lier les comptes de vos enfants.",
      label_password: "Mot de passe",
      label_confirm_password: "Confirmer le mot de passe",
      terms_accept: "J'accepte les conditions d'utilisation",
      btn_next_step: "Suivant (Orientation)",
      already_account: "Déjà un compte ?",
      link_login: "Se connecter"
    },
    en: {
      signup_title_eleve: "Student Registration",
      signup_sub_eleve: "Create your account to access your academic tracking.",
      signup_title_parent: "Parent / Guardian Registration",
      signup_sub_parent: "Register your child and automatically create your tracking account.",
      label_fullname_eleve: "Full Name",
      placeholder_fullname_eleve: "e.g. Jean Mamboundou",
      label_email_eleve: "Email Address",
      placeholder_email: "e.g. name@email.com",
      label_parent_email: "Parent / Guardian Email",
      placeholder_parent_email: "e.g. parent@email.com",
      label_parent_name: "Parent / Guardian Full Name",
      placeholder_parent_name: "e.g. Mr. Mamboundou",
      label_student_name: "Child's Full Name (Student)",
      placeholder_student_name: "e.g. Junior Mamboundou",
      label_parent_pivot_email: "Parent Email Address (Pivot Account)",
      hint_parent_pivot: "This email will serve as a pivot account to link your children's accounts.",
      label_password: "Password",
      label_confirm_password: "Confirm Password",
      terms_accept: "I accept the terms of use",
      btn_next_step: "Next (Orientation)",
      already_account: "Already have an account?",
      link_login: "Log in"
    }
  };

  // 1. Fusion immédiate avec le dictionnaire global
  if (typeof translations !== "undefined") {
    Object.assign(translations.fr, localSignupTranslations.fr);
    Object.assign(translations.en, localSignupTranslations.en);
  } else {
    window.translations = localSignupTranslations;
  }

  // =================================================================
  // 1. DÉTECTION DU RÔLE DEPUIS L'URL & CONFIGURATION DYNAMIQUE
  // =================================================================
  const urlParams = new URLSearchParams(window.location.search);
  const role = urlParams.get("role") || "eleve";

  const roleConfigs = {
    eleve: {
      titleKey: "signup_title_eleve",
      subKey: "signup_sub_eleve",
      titleDefault: "Inscription Élève",
      subDefault: "Crée ton compte pour accéder à ton suivi scolaire.",
      icon: "fa-user-graduate",
      color: "#1e3a8a",
      bgClass: "role-eleve-bg",
      isParent: false
    },
    parent: {
      titleKey: "signup_title_parent",
      subKey: "signup_sub_parent",
      titleDefault: "Inscription Parent / Tuteur",
      subDefault: "Inscrivez votre enfant et créez automatiquement votre compte de suivi.",
      icon: "fa-user-group",
      color: "#059669",
      bgClass: "role-parent-bg",
      isParent: true
    }
  };

  const cfg = roleConfigs[role] || roleConfigs.eleve;

  const titleElement = document.getElementById("signupTitle");
  const subtitleElement = document.getElementById("signupSubtitle");
  const iconElement = document.getElementById("signupIcon");
  const heroHeader = document.getElementById("signupHeroHeader");
  
  const eleveFieldsContainer = document.getElementById("eleveFieldsContainer");
  const parentFieldsContainer = document.getElementById("parentFieldsContainer");

  const fullNameInput = document.getElementById("fullNameInput");
  const emailInput = document.getElementById("emailInput");
  const parentNameInput = document.getElementById("parentNameInput");
  const studentNameInput = document.getElementById("studentNameInput");
  const parentEmailPivotInput = document.getElementById("parentEmailPivotInput");

  // Attribution des clés de traduction dynamiques
  if (titleElement) titleElement.setAttribute("data-i18n", cfg.titleKey);
  if (subtitleElement) subtitleElement.setAttribute("data-i18n", cfg.subKey);
  if (iconElement) iconElement.className = `fa-solid ${cfg.icon}`;

  if (heroHeader) heroHeader.classList.add(cfg.bgClass);

  // Masquage / Affichage conditionnel
  if (cfg.isParent) {
    if (eleveFieldsContainer) eleveFieldsContainer.style.display = "none";
    if (parentFieldsContainer) parentFieldsContainer.style.display = "block";

    if (fullNameInput) fullNameInput.removeAttribute("required");
    if (emailInput) emailInput.removeAttribute("required");
    
    if (parentNameInput) parentNameInput.setAttribute("required", "true");
    if (studentNameInput) studentNameInput.setAttribute("required", "true");
    if (parentEmailPivotInput) parentEmailPivotInput.setAttribute("required", "true");
  } else {
    if (eleveFieldsContainer) eleveFieldsContainer.style.display = "block";
    if (parentFieldsContainer) parentFieldsContainer.style.display = "none";

    if (fullNameInput) fullNameInput.setAttribute("required", "true");
    if (emailInput) emailInput.setAttribute("required", "true");
    
    if (parentNameInput) parentNameInput.removeAttribute("required");
    if (studentNameInput) studentNameInput.removeAttribute("required");
    if (parentEmailPivotInput) parentEmailPivotInput.removeAttribute("required");
  }
  
  document.documentElement.style.setProperty('--primary', cfg.color);

  // 2. FORCER LA MISE À JOUR DES TRADUCTIONS DE LA PAGE
  const currentLang = localStorage.getItem("linkedu_lang") || "fr";
  if (typeof applyLanguage === "function") {
    applyLanguage(currentLang);
  }


  // =================================================================
  // 3. GESTION DES YEUX (MOTS DE PASSE)
  // =================================================================
  const passwordInput = document.getElementById("signupPasswordInput");
  const togglePasswordBtn = document.getElementById("toggleSignupPasswordBtn");
  const eyeIcon = document.getElementById("signupEyeIcon");

  if (togglePasswordBtn && passwordInput && eyeIcon) {
    togglePasswordBtn.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      eyeIcon.className = isPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
    });
  }

  const confirmInput = document.getElementById("confirmPasswordInput");
  const toggleConfirmBtn = document.getElementById("toggleConfirmPasswordBtn");
  const confirmEyeIcon = document.getElementById("confirmEyeIcon");

  if (toggleConfirmBtn && confirmInput && confirmEyeIcon) {
    toggleConfirmBtn.addEventListener("click", () => {
      const isPassword = confirmInput.type === "password";
      confirmInput.type = isPassword ? "text" : "password";
      confirmEyeIcon.className = isPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
    });
  }

  // =================================================================
  // 4. SOUMISSION ET ENREGISTREMENT LOCAL DE LA CANDIDATURE
  // =================================================================
  const signupForm = document.getElementById("signupForm");

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const candidatureId = 'cand_' + Date.now();
      localStorage.setItem('currentCandidatureId', candidatureId);

      let nouvelleCandidature = { id: candidatureId, role: role };

      if (cfg.isParent) {
        nouvelleCandidature.parentName = parentNameInput ? parentNameInput.value : "";
        nouvelleCandidature.studentName = studentNameInput ? studentNameInput.value : "";
        nouvelleCandidature.email = parentEmailPivotInput ? parentEmailPivotInput.value : "";
        
        sessionStorage.setItem("signup_parent_name", nouvelleCandidature.parentName);
        sessionStorage.setItem("signup_student_name", nouvelleCandidature.studentName);
        sessionStorage.setItem("signup_email", nouvelleCandidature.email);
      } else {
        nouvelleCandidature.fullName = fullNameInput ? fullNameInput.value : "";
        nouvelleCandidature.email = emailInput ? emailInput.value : "";
        
        sessionStorage.setItem("signup_fullname", nouvelleCandidature.fullName);
        sessionStorage.setItem("signup_email", nouvelleCandidature.email);
      }

      let candidatures = JSON.parse(localStorage.getItem('candidatures')) || [];
      candidatures.push(nouvelleCandidature);
      localStorage.setItem('candidatures', JSON.stringify(candidatures));

      window.location.href = `orientation.html?role=${role}`;
    });
  }

});
