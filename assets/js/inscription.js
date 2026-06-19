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

  // === 2. REDIRECTION FORMULAIRE VERS TELE.HTML ===
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Ajoute ici tes logiques d'inscription si nécessaire
      window.location.href = "Televersement.html";
    });
  }

  // === 3. DIAPORAMA APPLICATION (TIMINGS ATTÉNUÉS : 10s) ===
  const slideshowContainer = document.getElementById("app-slideshow");
  const imagesList = [
    "../images/etu1.jpg",
    "../images/etu2.jpg",
    "../images/el1.jpg",
    "../images/el2.jpg",
    "../images/ens.jpg",
    "../images/pri1.jpg",
  ];

  if (!slideshowContainer) return;

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
});
