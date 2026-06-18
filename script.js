document.addEventListener("DOMContentLoaded", () => {
  // === 1. VISIBILITÉ DU MOT DE PASSE ===
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.getElementById("eye-icon");

  if (eyeIcon && passwordInput) {
    eyeIcon.addEventListener("click", () => {
      passwordInput.type =
        passwordInput.type === "password" ? "text" : "password";
      eyeIcon.classList.toggle("fa-eye");
      eyeIcon.classList.toggle("fa-eye-slash");
    });
  }

  // === 2. GESTION DU SOUUMIT FORMULAIRE ===
  const loginForm = document.querySelector(".login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const identifierValue = document
        .getElementById("identifier")
        .value.trim();
      if (!identifierValue) {
        alert("Veuillez entrer votre matricule ou adresse e-mail.");
        return;
      }
      localStorage.setItem("username", identifierValue);
      window.location.href = "./assets/pages/dashboard1.html";
    });
  }

  // === 3. DIAPORAMA ROBUSTE PAR INJECTION D'ÉLÉMENTS ===
  const slideshowContainer = document.getElementById("app-slideshow");
  const imagesList = [
    "./assets/images/etu1.jpg",
    "./assets/images/etu2.jpg",
    "./assets/images/el1.jpg",
    "./assets/images/el2.jpg",
    "./assets/images/ens.jpg",
    "./assets/images/pri1.jpg",
  ];

  if (!slideshowContainer) return;

  let currentImageIndex = 0;

  // Injection forcée de chaque image dans le DOM pour parer les bugs de caches mobiles
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
    img.style.transition = "opacity 1.5s ease-in-out";
    img.style.zIndex = "-2";
    img.style.display = "block";
    slideshowContainer.appendChild(img);
  });

  // Activation sécurisée une fois le premier visuel chargé
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

      // Masquage progressif de l'image courante
      imgs[currentImageIndex].style.opacity = "0";

      // Passage à l'index suivant
      currentImageIndex = (currentImageIndex + 1) % imagesList.length;

      // Affichage de la nouvelle image
      imgs[currentImageIndex].style.opacity = "1";
    }, 5000); // Rotation toutes les 5 secondes
  }
});
