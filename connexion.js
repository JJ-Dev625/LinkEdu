document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 1. DICTIONNAIRE MULTILINGUE (FR / EN)
  // ==========================================
  const translations = {
    fr: {
      navBack: "Accueil",
      inputLabel: "Identifiant ou Email",
      passwordLabel: "Mot de passe",
      rememberMe: "Se souvenir de moi",
      forgotPass: "Mot de passe oublié ?",
      submitBtn: "Se connecter",
      emptyAlert: "Veuillez remplir tous les champs.",
      invalidAdminUser: "Identifiant administrateur incorrect.",
      invalidAdminPass: "Mot de passe administrateur incorrect.",
      footer: "© 2026 LinkEdu — Développé par Jean Junior DIRAMBA MAMBOUNDOU | École 241 (Bikélé, Gabon)",
      roles: {
        eleve: {
          title: "Espace Élève",
          subtitle: "Connecte-toi pour suivre ton parcours scolaire.",
          placeholder: "ex: LE-2026-045"
        },
        enseignant: {
          title: "Espace Enseignant",
          subtitle: "Accède à tes classes et gère tes notes.",
          placeholder: "ex: PROF-2026-012"
        },
        parent: {
          title: "Espace Parent",
          subtitle: "Suivi de la scolarité et des bulletins de vos enfants.",
          placeholder: "Email ou ID Parent"
        },
        admin: {
          title: "Espace Administrateur",
          subtitle: "Gestion globale de la plateforme LinkEdu.",
          placeholder: "admin ou admin_linkedu"
        }
      }
    },
    en: {
      navBack: "Home",
      inputLabel: "Username or Email",
      passwordLabel: "Password",
      rememberMe: "Remember me",
      forgotPass: "Forgot password?",
      submitBtn: "Sign In",
      emptyAlert: "Please fill in all fields.",
      invalidAdminUser: "Incorrect administrator username.",
      invalidAdminPass: "Incorrect administrator password.",
      footer: "© 2026 LinkEdu — Developed by Jean Junior DIRAMBA MAMBOUNDOU | Ecole 241 (Bikele, Gabon)",
      roles: {
        eleve: {
          title: "Student Portal",
          subtitle: "Log in to track your academic progress.",
          placeholder: "e.g., LE-2026-045"
        },
        enseignant: {
          title: "Teacher Portal",
          subtitle: "Access your classes and manage grades.",
          placeholder: "e.g., PROF-2026-012"
        },
        parent: {
          title: "Parent Portal",
          subtitle: "Monitor your children's schooling and report cards.",
          placeholder: "Email or Parent ID"
        },
        admin: {
          title: "Administrator Portal",
          subtitle: "Global management of the LinkEdu platform.",
          placeholder: "admin or admin_linkedu"
        }
      }
    }
  };

  // Langue par défaut
  let currentLang = localStorage.getItem("linkedu_lang") || "fr";

  // ==========================================
  // 2. IMAGES & CONFIGURATIONS DES RÔLES
  // ==========================================
  const urlParams = new URLSearchParams(window.location.search);
  const role = urlParams.get("role") || "eleve";

  const roleConfigs = {
    eleve: {
      icon: "fa-user-graduate",
      redirectPage: "apprenant.html",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600"
    },
    enseignant: {
      icon: "fa-chalkboard-user",
      redirectPage: "prof.html",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=600"
    },
    parent: {
      icon: "fa-user-group",
      redirectPage: "parent.html",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=600"
    },
    admin: {
      icon: "fa-screwdriver-wrench",
      redirectPage: "admin.html",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600"
    }
  };

  const currentRoleConfig = roleConfigs[role] || roleConfigs.eleve;

  // ==========================================
  // 3. FONCTIONS D'AFFICHAGE & TRADUCTION
  // ==========================================
  const applyTranslations = () => {
    const langData = translations[currentLang];
    const roleText = langData.roles[role] || langData.roles.eleve;

    document.getElementById("loginTitle").textContent = roleText.title;
    document.getElementById("loginSubtitle").textContent = roleText.subtitle;
    document.getElementById("userInput").placeholder = roleText.placeholder;
    document.getElementById("inputLabelText").textContent = langData.inputLabel;
    document.getElementById("passwordLabelText").textContent = langData.passwordLabel;
    document.getElementById("submitBtn").textContent = langData.submitBtn;
    document.getElementById("forgotPasswordLink").textContent = langData.forgotPass;
    document.getElementById("footerText").textContent = langData.footer;

    // Se souvenir de moi (conserve la checkbox)
    const rememberCheckbox = document.getElementById("rememberCheckbox");
    const rememberLabel = document.getElementById("rememberLabel");
    if (rememberLabel) {
      rememberLabel.innerHTML = `<input type="checkbox" id="rememberCheckbox" ${rememberCheckbox && rememberCheckbox.checked ? 'checked' : ''}> ${langData.rememberMe}`;
    }

    // Toggle du libellé du bouton de langue
    document.getElementById("langLabel").textContent = currentLang === "fr" ? "EN" : "FR";
  };

  // Initialisation de l'icône et de l'image de profil
  const iconElement = document.getElementById("loginIcon");
  const heroImgElement = document.getElementById("roleHeroImg");
  if (iconElement) iconElement.className = `fa-solid ${currentRoleConfig.icon}`;
  if (heroImgElement) heroImgElement.src = currentRoleConfig.image;

  applyTranslations();

  // BASCULE DE LANGUE (FR <-> EN)
  const langToggleBtn = document.getElementById("langToggleBtn");
  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      currentLang = currentLang === "fr" ? "en" : "fr";
      localStorage.setItem("linkedu_lang", currentLang);
      applyTranslations();
    });
  }

  // ==========================================
  // 4. GESTION DU THÈME (CLAIR / SOMBRE)
  // ==========================================
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeIcon = document.getElementById("themeIcon");

  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
      if (themeIcon) {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
      }
    } else {
      document.body.classList.remove("dark-mode");
      if (themeIcon) {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
      }
    }
    localStorage.setItem("linkedu_theme", theme);
  };

  const savedTheme = localStorage.getItem("linkedu_theme") || "dark";
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark-mode");
      applyTheme(isDark ? "light" : "dark");
    });
  }

  // ==========================================
  // 5. VISIBILITÉ DU MOT DE PASSE
  // ==========================================
  const togglePasswordBtn = document.getElementById("togglePasswordBtn");
  const passwordInput = document.getElementById("passwordInput");
  const eyeIcon = document.getElementById("eyeIcon");

  if (togglePasswordBtn && passwordInput && eyeIcon) {
    togglePasswordBtn.addEventListener("click", () => {
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      
      eyeIcon.classList.toggle("fa-eye", type === "password");
      eyeIcon.classList.toggle("fa-eye-slash", type === "text");
    });
  }

  // ==========================================
  // 6. SOUMISSION & REDIRECTION SECURISEE
  // ==========================================
  const loginForm = document.getElementById("loginForm");
  const userInput = document.getElementById("userInput");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const langData = translations[currentLang];

      const userVal = userInput ? userInput.value.trim() : "";
      const passVal = passwordInput ? passwordInput.value.trim() : "";

      if (!userVal || !passVal) {
        alert(langData.emptyAlert);
        return;
      }

      // Traitement Admin
      if (role === "admin") {
        if (userVal !== "admin" && userVal !== "admin_linkedu") {
          alert(langData.invalidAdminUser);
          return;
        }

        localStorage.setItem('linkedu_admin_connecte', 'true');
        localStorage.setItem("username", userVal);
        localStorage.setItem("userRole", "admin");
        window.location.href = currentRoleConfig.redirectPage;
        return;
      }

      // Autres Rôles
      localStorage.setItem("username", userVal);
      localStorage.setItem("userRole", role);
      window.location.href = currentRoleConfig.redirectPage;
    });
  }
});


