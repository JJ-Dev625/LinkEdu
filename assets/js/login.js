document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("user-password");
  const togglePasswordBtn = document.getElementById("toggle-password");
  const eyeIcon = document.getElementById("eye-icon");
  const btnSubmit = document.getElementById("btn-submit-link");
  const errorBox = document.getElementById("error-message");

  // 1. GESTION DE L'ŒIL (Afficher / Masquer le mot de passe)
  if (togglePasswordBtn && passwordInput && eyeIcon) {
    togglePasswordBtn.addEventListener("click", (e) => {
      e.preventDefault(); // Empêche tout comportement bizarre

      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePasswordBtn.classList.add("active");
        eyeIcon.className = "fa-solid fa-eye-slash"; // Change l'icône en œil barré
      } else {
        passwordInput.type = "password";
        togglePasswordBtn.classList.remove("active");
        eyeIcon.className = "fa-solid fa-eye"; // Remet l'œil normal
      }
    });
  }

  // 2. SÉCURITÉ DE VÉRIFICATION AVANT LA REDIRECTION
  if (btnSubmit) {
    btnSubmit.addEventListener("click", (e) => {
      const matricule = document.getElementById("user-matricule").value.trim();
      const password = passwordInput.value.trim();

      // Si les champs sont vides, on bloque la redirection et on affiche l'erreur
      if (matricule === "" || password === "") {
        e.preventDefault(); // Bloque l'accès au dashboard
        if (errorBox) {
          errorBox.textContent =
            "⚠️ Veuillez remplir tous les champs obligatoires.";
          errorBox.style.display = "block";
        }
      } else {
        // Si c'est bon, on crée la session locale
        localStorage.setItem("username", "Jean Junior");
      }
    });
  }
});
