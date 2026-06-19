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
  // 2. SÉLECTEURS DES ÉLÉMENTS DU DOM
  // ==========================================
  const studyLevelSelect = document.getElementById("study-level");
  const prevClassSelect = document.getElementById("prev-class");
  const targetClassSelect = document.getElementById("target-class");
  const uploadForm = document.getElementById("upload-form");

  // ==========================================
  // 3. DICTIONNAIRE DES CLASSES (SYSTÈME GABONAIS)
  // ==========================================
  const classesData = {
    creche: ["Petite Section", "Moyenne Section", "Grande Section"],
    primaire: ["CONE", "CP", "CE1", "CE2", "CM1", "CM2"],
    secondaire: ["6ème", "5ème", "4ème", "3ème", "2nde", "1ère", "Terminale"],
    superieur: [
      "Licence 1",
      "Licence 2",
      "Licence 3",
      "Master 1",
      "Master 2",
      "Doctorat",
    ],
  };

  // ==========================================
  // 4. LOGIQUE DYNAMIQUE DES OPTIONS DE CLASSE
  // ==========================================
  if (studyLevelSelect && prevClassSelect && targetClassSelect) {
    studyLevelSelect.addEventListener("change", () => {
      const selectedLevel = studyLevelSelect.value;
      const classesList = classesData[selectedLevel] || [];

      // Déverrouillage des sélecteurs de classe
      prevClassSelect.disabled = false;
      targetClassSelect.disabled = false;

      // Reset complet des options précédentes
      prevClassSelect.innerHTML =
        '<option value="" disabled selected>Classe</option>';
      targetClassSelect.innerHTML =
        '<option value="" disabled selected>Visée</option>';

      // Injection dynamique des nouvelles options adaptées
      classesList.forEach((className) => {
        const optionPrev = document.createElement("option");
        optionPrev.value = className;
        optionPrev.textContent = className;
        prevClassSelect.appendChild(optionPrev);

        const optionTarget = document.createElement("option");
        optionTarget.value = className;
        optionTarget.textContent = className;
        targetClassSelect.appendChild(optionTarget);
      });
    });
  }

  // ==========================================
  // 5. SOUMISSION DU DOSSIER & SÉCURISATION DU PRIX
  // ==========================================
  if (uploadForm) {
    uploadForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Stockage local du niveau choisi pour modifier le prix sur la page suivante
      if (studyLevelSelect) {
        localStorage.setItem("selectedStudyLevel", studyLevelSelect.value);
      }

      window.location.href = "./paiement.html";
    });
  }
});
