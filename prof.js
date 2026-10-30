document.addEventListener("DOMContentLoaded", () => {
    loadProfProfile();
    updateDashboardStats();
    populateClassSelectors();
    renderCahierHistory();
    renderEmploiDuTemps();
    analyserPerformancesClasse();
    chargerJustificatifsAbsencesProf();
    
    const profData = JSON.parse(localStorage.getItem("activeProfSession")) || { etablissement: "École 241" };
    chargerCarrouselMediaParEcole(profData.etablissement || "École 241");
});

// =================================================================
// DICTIONNAIRE MULTILINGUE (FR / EN)
// =================================================================
const profTranslations = {
    fr: {
        prof_space_badge: "Enseignant",
        nav_dashboard: "Tableau de bord",
        nav_grades: "Saisie des notes",
        nav_notebook: "Cahier de texte",
        nav_courses: "Supports & Vidéos",
        nav_homework: "Planifier Devoirs",
        nav_schedule: "Emploi du temps",
        nav_attendance: "Appel & Justificatifs",
        nav_messages: "Annonces & Messages",
        nav_settings: "Sécurité & Mot de passe",
        welcome_sub: "Espace Pédagogique LinkEdu",
        welcome_desc: "Pilotez vos classes et suivez la progression des apprenants.",
        campus_gallery: "Établissements & Vie Campus",
        stat_classes: "Classes attribuées",
        stat_students: "Étudiants encadrés",
        stat_sessions: "Séances consignées",
        perf_title: "Analyse & Alertes de Performance des Classes",
        perf_loading: "Calcul en cours des moyennes de classes...",
        label_class: "Classe concernée",
        label_eval_title: "Intitulé de l'évaluation",
        students_list: "Liste des étudiants / notes sur 20",
        th_student: "Nom & Prénom",
        th_grade: "Note (/20)",
        th_feedback: "Appréciation & Raccourcis",
        btn_save_notes: "Enregistrer et transmettre",
        label_date: "Date de la séance",
        label_summary: "Résumé du cours magistral",
        btn_save_session: "Enregistrer la séance",
        history_sessions: "Historique des séances",
        label_course_title: "Titre du support ou chapitre",
        label_subject_class: "Matière & Classe",
        label_video_link: "Lien Vidéo Tutoriel (YouTube / Drive)",
        label_attach_doc: "Joindre le document PDF depuis l'appareil",
        btn_publish: "Publier pour les Élèves",
        label_hw_title: "Matière & Intitulé du devoir",
        label_hw_date: "Date limite / Échéance",
        btn_add_hw: "Ajouter au Programme de l'Élève",
        justif_title: "Justificatifs d'absence soumis",
        no_justif: "Aucun justificatif en attente.",
        th_status: "Statut",
        th_action: "Action Rapide",
        btn_validate_attendance: "Valider l'appel",
        label_target_class: "Classe destinataire",
        label_msg_title: "Objet de l'annonce",
        label_msg_content: "Message détaillé",
        btn_broadcast: "Diffuser l'annonce",
        history_announcements: "Annonces récemment envoyées",
        footer_text: "LinkEdu © 2026 | Système d'Information Académique & Pédagogique"
    },
    en: {
        prof_space_badge: "Teacher",
        nav_dashboard: "Dashboard",
        nav_grades: "Grades Entry",
        nav_notebook: "Digital Notebook",
        nav_courses: "Materials & Videos",
        nav_homework: "Plan Homework",
        nav_schedule: "Schedule",
        nav_attendance: "Attendance & Justifications",
        nav_messages: "Announcements & Messages",
        nav_settings: "Security & Password",
        welcome_sub: "LinkEdu Teaching Space",
        welcome_desc: "Manage your classes and track learner progress.",
        campus_gallery: "Campuses & School Life",
        stat_classes: "Assigned Classes",
        stat_students: "Supervised Students",
        stat_sessions: "Recorded Sessions",
        perf_title: "Class Performance Analysis & Alerts",
        perf_loading: "Calculating class averages...",
        label_class: "Target Class",
        label_eval_title: "Assessment Title",
        students_list: "Student List / Grades out of 20",
        th_student: "Full Name",
        th_grade: "Grade (/20)",
        th_feedback: "Feedback & Shortcuts",
        btn_save_notes: "Save and Submit",
        label_date: "Session Date",
        label_summary: "Lecture Summary",
        btn_save_session: "Save Session",
        history_sessions: "Session History",
        label_course_title: "Material Title or Chapter",
        label_subject_class: "Subject & Class",
        label_video_link: "Tutorial Video Link (YouTube / Drive)",
        label_attach_doc: "Attach PDF document from device",
        btn_publish: "Publish for Students",
        label_hw_title: "Subject & Homework Title",
        label_hw_date: "Deadline / Due Date",
        btn_add_hw: "Add to Student Schedule",
        justif_title: "Submitted Absence Justifications",
        no_justif: "No pending justifications.",
        th_status: "Status",
        th_action: "Quick Action",
        btn_validate_attendance: "Validate Attendance",
        label_target_class: "Target Class",
        label_msg_title: "Announcement Subject",
        label_msg_content: "Detailed Message",
        btn_broadcast: "Broadcast Announcement",
        history_announcements: "Recently Sent Announcements",
        footer_text: "LinkEdu © 2026 | Academic & Pedagogical Information System"
    }
};

function applyProfLanguage(lang) {
    localStorage.setItem("linkedu_lang", lang);
    const dict = profTranslations[lang] || profTranslations.fr;
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) el.textContent = dict[key];
    });
    const langTextDesktop = document.getElementById("langTextDesktop");
    if (langTextDesktop) langTextDesktop.textContent = lang === "fr" ? "English" : "Français";
}

const savedLang = localStorage.getItem("linkedu_lang") || "fr";
applyProfLanguage(savedLang);

const langToggleDesktop = document.getElementById("langToggleDesktop");
if (langToggleDesktop) {
    langToggleDesktop.onclick = () => {
        const cur = localStorage.getItem("linkedu_lang") || "fr";
        applyProfLanguage(cur === "fr" ? "en" : "fr");
    };
}

// =================================================================
// GESTION DU THÈME
// =================================================================
const themeToggleBtn = document.getElementById("themeToggleBtn");
if (themeToggleBtn) {
    const savedTheme = localStorage.getItem("prof_theme") || "dark";
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        document.documentElement.setAttribute("data-theme", "light");
        themeToggleBtn.innerHTML = `<i class="fa-solid fa-moon" id="themeIcon"></i>`;
    } else {
        document.body.classList.remove("light-mode");
        document.documentElement.setAttribute("data-theme", "dark");
        themeToggleBtn.innerHTML = `<i class="fa-solid fa-sun" id="themeIcon"></i>`;
    }

    themeToggleBtn.onclick = () => {
        document.body.classList.toggle("light-mode");
        const isLight = document.body.classList.contains("light-mode");
        document.documentElement.setAttribute("data-theme", isLight ? "light" : "dark");
        localStorage.setItem("prof_theme", isLight ? "light" : "dark");
        themeToggleBtn.innerHTML = `<i class="fa-solid fa-${isLight ? 'moon' : 'sun'}" id="themeIcon"></i>`;
    };
}

// =================================================================
// MENU BURGER
// =================================================================
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.toggle('open');
}

window.switchProfTab = function(sectionId, element) {
    document.querySelectorAll('.app-section').forEach(sec => sec.style.display = 'none');
    const target = document.getElementById(sectionId);
    if (target) target.style.display = 'block';

    document.querySelectorAll('.sidebar-nav-item').forEach(item => item.classList.remove('active'));
    if (element) element.classList.add('active');

    if (sectionId === 'notes') renderNotesInterface();
    if (sectionId === 'presence') { renderPresenceInterface(); chargerJustificatifsAbsencesProf(); }
    if (sectionId === 'emploi') renderEmploiDuTemps();
    if (sectionId === 'messages') renderMessagesHistory();
    if (sectionId === 'dashboard') analyserPerformancesClasse();

    const sidebar = document.getElementById('sidebar');
    if (sidebar && window.innerWidth <= 900) sidebar.classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.deconnecterEnseignant = function() {
    if (confirm("Voulez-vous vraiment vous déconnecter de LinkEdu ?")) {
        localStorage.removeItem("activeProfSession");
        window.location.href = "index.html";
    }
};

// =================================================================
// PROFIL DYNAMIQUE & GESTION ADMIN (ID FIXE, CLASSES & EMPLOI DU TEMPS)
// =================================================================
function loadProfProfile() {
    // Session générée dynamiquement par l'Admin
    const profData = JSON.parse(localStorage.getItem("activeProfSession")) || {
        id: "PROF-001",
        name: "Mme. Iris AVOMO",
        role: "Prof. de Philosophie",
        classes: ["Terminale A1", "Terminale A2"],
        emploiDuTemps: [
            { jour: "Lundi", heure: "08:00 - 10:00", classe: "Terminale A1", matiere: "Philosophie" },
            { jour: "Mercredi", heure: "10:00 - 12:00", classe: "Terminale A2", matiere: "Philosophie" }
        ]
    };
    
    document.getElementById("prof-name").textContent = profData.name;
    document.getElementById("prof-role").textContent = profData.role || "Enseignant LinkEdu";
    document.getElementById("prof-id-display").textContent = profData.id || "PROF-001";
    document.getElementById("setting-prof-id").value = profData.id || "PROF-001";

    const welcomeTitle = document.getElementById("dashboard-welcome-title");
    if (welcomeTitle) welcomeTitle.textContent = `Bienvenue, ${profData.name}`;

    const savedAvatar = localStorage.getItem('prof_avatar');
    if (savedAvatar) {
        const img = document.getElementById('prof-img');
        if (img) img.src = savedAvatar;
    }
}

function getAssignedClasses() {
    const profData = JSON.parse(localStorage.getItem("activeProfSession")) || { classes: ["Terminale A1", "Terminale A2"] };
    return profData.classes || ["Terminale A1", "Terminale A2"];
}

function updateDashboardStats() {
    const classes = getAssignedClasses();
    document.getElementById("count-classes").textContent = classes.length;
    const candidatures = JSON.parse(localStorage.getItem('candidatures')) || [];
    const valides = candidatures.filter(c => c.statut === 'Validé');
    document.getElementById("count-students").textContent = valides.length > 0 ? valides.length : 45;
    const entries = JSON.parse(localStorage.getItem("cahierEntries")) || [];
    document.getElementById("count-notes").textContent = entries.length;
}

function populateClassSelectors() {
    const classes = getAssignedClasses();
    ["cahierClasse", "select-classe-notes", "select-classe-appel", "msgClasse"].forEach(id => {
        const sel = document.getElementById(id);
        if (sel) {
            const hasAll = sel.innerHTML.includes("Toutes");
            sel.innerHTML = `<option value="">-- Choisir une classe --</option>` + (hasAll ? `<option value="Toutes">Toutes mes classes</option>` : "") + classes.map(c => `<option value="${c}">${c}</option>`).join('');
        }
    });
}

// =================================================================
// CHANGEMENT DE MOT DE PASSE (ID INCHANGE)
// =================================================================
window.changerMotDePasseEnseignant = function(e) {
    e.preventDefault();
    const nouveauMdp = document.getElementById("setting-new-password").value;
    let profData = JSON.parse(localStorage.getItem("activeProfSession")) || { id: "PROF-001" };
    profData.password = nouveauMdp;
    localStorage.setItem("activeProfSession", JSON.stringify(profData));
    alert("Mot de passe mis à jour avec succès ! Votre ID reste inchangé.");
    document.getElementById("setting-new-password").value = "";
};

// =================================================================
// CARROUSEL CAMPUS
// =================================================================
function chargerCarrouselMediaParEcole(nomEcole) {
    const container = document.getElementById("media-carousel-container");
    if (!container) return;
    const medias = [
        { titre: "École 241 & Campus", url: "./images/log1.png" },
        { titre: "Laboratoire Numérique & Code", url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80" },
        { titre: "Soutenance & Projets PWS", url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=500&q=80" }
    ];
    container.innerHTML = medias.map(m => `
        <div class="media-item-card">
            <img src="${m.url}" alt="${m.titre}" onerror="this.src='https://via.placeholder.com/260x130?text=LinkEdu+Campus'">
            <div>${m.titre}</div>
        </div>
    `).join('');
}

// =================================================================
// UPLOAD FICHIER SUPPORT DE COURS
// =================================================================
let fichierSupportBase64Temp = "";
let nomFichierSupportTemp = "";

window.chargerFichierSupportLocal = function(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        nomFichierSupportTemp = file.name;
        document.getElementById("nom-fichier-joint").textContent = `Fichier sélectionné : ${file.name}`;
        const reader = new FileReader();
        reader.onload = function(e) { fichierSupportBase64Temp = e.target.result; };
        reader.readAsDataURL(file);
    }
};

window.publierSupportCours = function(e) {
    e.preventDefault();
    const nouveauCours = {
        matiere: document.getElementById("coursMatiere").value,
        prof: JSON.parse(localStorage.getItem("activeProfSession"))?.name || "Mme. Iris AVOMO",
        description: document.getElementById("coursTitre").value,
        lienYoutube: document.getElementById("coursVideo").value,
        fichierPdf: nomFichierSupportTemp || "Support_Cours.pdf",
        fichierBase64: fichierSupportBase64Temp
    };

    let coursDB = JSON.parse(localStorage.getItem("linkedu_cours")) || [];
    coursDB.unshift(nouveauCours);
    localStorage.setItem("linkedu_cours", JSON.stringify(coursDB));

    alert("Support de cours et fichier joints publiés avec succès !");
    document.getElementById("coursForm").reset();
    document.getElementById("nom-fichier-joint").textContent = "";
    fichierSupportBase64Temp = "";
    nomFichierSupportTemp = "";
};

// =================================================================
// SAISIE DES NOTES AVEC RACCOURCIS D'APPRÉCIATION
// =================================================================
function renderNotesInterface() {
    const tbody = document.getElementById("tbody-saisie-notes");
    if (!tbody) return;
    const candidatures = JSON.parse(localStorage.getItem('candidatures')) || [];
    const valides = candidatures.filter(c => c.statut === 'Validé');
    
    const listeEleves = valides.length > 0 ? valides : [
        { nom: "Mboundou", prenom: "Marc" },
        { nom: "Nze Ekome", prenom: "Sarah" }
    ];

    tbody.innerHTML = listeEleves.map((el, i) => `
        <tr>
            <td style="font-weight:600;">${el.nom || ''} ${el.prenom || ''}</td>
            <td><input type="number" min="0" max="20" step="0.25" placeholder="00" style="width:70px; padding:6px; border-radius:6px; border:1px solid var(--border-color); background:var(--bg-body); color:var(--text-main);"></td>
            <td>
                <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
                    <input type="text" id="appr_${i}" placeholder="Appréciation..." style="flex: 1; min-width: 140px; padding: 6px; border-radius: 6px; border: 1px solid var(--border-color); background: var(--bg-body); color: var(--text-main);">
                    <select onchange="document.getElementById('appr_${i}').value = this.value" style="padding: 6px; border-radius: 6px; border: 1px solid var(--border-color); background: var(--bg-body); color: var(--text-muted); font-size: 0.75rem;">
                        <option value="">Raccourcis...</option>
                        <option value="Très bon travail, poursuivez ainsi.">Très Bon</option>
                        <option value="Travail satisfaisant.">Satisfaisant</option>
                        <option value="Insuffisant, révision urgente requise.">Insuffisant</option>
                        <option value="Excellent trimestre.">Excellent</option>
                    </select>
                </div>
            </td>
        </tr>
    `).join('');
}

window.sauvegarderNotes = () => {
    const titre = document.getElementById("input-eval-titre").value;
    const classe = document.getElementById("select-classe-notes")?.value;
    if (!titre || !classe) { alert("Veuillez indiquer la classe et l'intitulé de l'évaluation !"); return; }
    
    let notes = JSON.parse(localStorage.getItem("notesEleves")) || [];
    document.querySelectorAll("#tbody-saisie-notes tr").forEach(tr => {
        const nom = tr.cells[0].textContent;
        const note = tr.querySelector("input[type='number']").value;
        const appr = tr.querySelector("input[type='text']").value;
        if (note !== "") notes.push({ id: Date.now() + Math.random(), eleve: nom, classe: classe, evaluation: titre, note, appreciation: appr, date: new Date().toLocaleDateString() });
    });
    localStorage.setItem("notesEleves", JSON.stringify(notes));
    alert("Notes enregistrées et transmises avec succès !");
};

// =================================================================
// EMPLOI DU TEMPS ATTRIBUÉ PAR L'ADMIN
// =================================================================
function renderEmploiDuTemps() {
    const container = document.getElementById("emploi-container");
    if (!container) return;
    const profData = JSON.parse(localStorage.getItem("activeProfSession")) || {};
    const emploi = profData.emploiDuTemps || [
        { jour: "Lundi", heure: "08:00 - 10:00", classe: "Terminale A1", matiere: "Philosophie" },
        { jour: "Jeudi", heure: "10:00 - 12:00", classe: "Terminale A2", matiere: "Philosophie" }
    ];

    container.innerHTML = `
        <h3 class="card-subtitle">Planning Hebdomadaire (Attribué par l'Administration)</h3>
        <div class="table-responsive">
            <table>
                <thead>
                    <tr><th>Jour</th><th>Horaire</th><th>Classe</th><th>Matière</th></tr>
                </thead>
                <tbody>
                    ${emploi.map(e => `<tr><td><strong>${e.jour}</strong></td><td>${e.heure}</td><td>${e.classe}</td><td>${e.matiere}</td></tr>`).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// --- ANALYSE DE CLASSE, APPEL & CAHIER ---
function analyserPerformancesClasse() {
    const container = document.getElementById("dashboard-analytics-container");
    if (!container) return;
    const notes = JSON.parse(localStorage.getItem("notesEleves")) || [];
    if (notes.length === 0) {
        container.innerHTML = `<p style="font-size: 0.85rem; color: var(--text-muted); font-style: italic;">Aucune note enregistrée pour le moment.</p>`;
        return;
    }
    const sousSeuil = notes.filter(n => parseFloat(n.note) < 10);
    const pct = Math.round((sousSeuil.length / notes.length) * 100);
    container.innerHTML = `<p style="font-size: 0.85rem; color: var(--text-main);">Taux d'élèves sous la moyenne : <strong>${pct}%</strong></p>`;
}

window.publierDevoirAdministratif = function(e) {
    e.preventDefault();
    let devoirs = JSON.parse(localStorage.getItem("adminProgrammeDevoirs")) || [];
    devoirs.unshift({
        matiere: "Philosophie",
        titre: document.getElementById("devoirTitre").value,
        date: document.getElementById("devoirDate").value,
        type: "Devoir Surveillé"
    });
    localStorage.setItem("adminProgrammeDevoirs", JSON.stringify(devoirs));
    alert("Devoir planifié avec succès !");
    document.getElementById("devoirForm").reset();
};

function chargerJustificatifsAbsencesProf() {
    const container = document.getElementById("liste-justificatifs-eleves");
    if (!container) return;
    let suivi = JSON.parse(localStorage.getItem("suiviPresence")) || [];
    let enAttente = suivi.filter(s => s.justification && s.statutJustificatif === "En attente");
    if (enAttente.length === 0) {
        container.innerHTML = `<p style="font-size: 0.85rem; color: var(--text-muted); font-style: italic;">Aucun justificatif en attente.</p>`;
        return;
    }
    container.innerHTML = enAttente.map(j => `
        <div style="background: var(--bg-body); padding: 10px; border-radius: 8px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
            <span><strong>${j.eleve}</strong> — ${j.date} : ${j.justification}</span>
            <button onclick="validerJustificatif(${j.id}, 'Validé')" class="success-bg" style="color:#fff; border:none; padding:6px 12px; border-radius:6px; cursor:pointer; font-weight:600;">Valider</button>
        </div>
    `).join('');
}

window.validerJustificatif = (id, statut) => {
    let suivi = JSON.parse(localStorage.getItem("suiviPresence")) || [];
    suivi = suivi.map(s => { if (s.id === id) s.statutJustificatif = statut; return s; });
    localStorage.setItem("suiviPresence", JSON.stringify(suivi));
    alert("Justificatif mis à jour !");
    chargerJustificatifsAbsencesProf();
};

let listeElevesAppelLocal = [];
function renderPresenceInterface() {
    const tbody = document.getElementById("tbody-appel");
    if (!tbody) return;
    const candidatures = JSON.parse(localStorage.getItem('candidatures')) || [];
    const valides = candidatures.filter(c => c.statut === 'Validé');
    listeElevesAppelLocal = valides.length > 0 ? valides.map(e => ({ nom: `${e.nom} ${e.prenom}`, statut: "Présent" })) : [{ nom: "Mboundou Marc", statut: "Présent" }];
    tbody.innerHTML = listeElevesAppelLocal.map((item, idx) => `
        <tr>
            <td style="font-weight:600;">${item.nom}</td>
            <td style="text-align:center;"><span id="badge_statut_${idx}" style="color:var(--success); font-weight:700;">Présent</span></td>
            <td style="text-align:center;">
                <button type="button" onclick="changerStatutAppel(${idx}, 'Présent')" style="background:var(--bg-body); color:var(--text-main); border:1px solid var(--border-color); padding:4px 8px; border-radius:6px; cursor:pointer;">P</button>
                <button type="button" onclick="changerStatutAppel(${idx}, 'Absent')" style="background:#ef4444; color:#fff; border:none; padding:4px 8px; border-radius:6px; cursor:pointer;">A</button>
            </td>
        </tr>
    `).join('');
}

window.changerStatutAppel = (idx, statut) => {
    listeElevesAppelLocal[idx].statut = statut;
    const badge = document.getElementById(`badge_statut_${idx}`);
    if (badge) { badge.textContent = statut; badge.style.color = statut === "Présent" ? "var(--success)" : "var(--danger)"; }
};

window.validerAppel = () => {
    let registres = JSON.parse(localStorage.getItem("suiviPresence")) || [];
    listeElevesAppelLocal.forEach((item, index) => {
        registres.push({ id: Date.now() + index, eleve: item.nom, classe: "Terminale", statut: item.statut, date: new Date().toLocaleDateString() });
    });
    localStorage.setItem("suiviPresence", JSON.stringify(registres));
    alert("Appel validé !");
};

window.soumettreCahierTexte = (e) => {
    e.preventDefault();
    let entries = JSON.parse(localStorage.getItem("cahierEntries")) || [];
    entries.unshift({ id: Date.now(), date: document.getElementById("cahierDate").value, classe: document.getElementById("cahierClasse").value, contenu: document.getElementById("cahierContenu").value });
    localStorage.setItem("cahierEntries", JSON.stringify(entries));
    alert("Séance enregistrée !");
    document.getElementById("cahierForm").reset();
    renderCahierHistory();
};

function renderCahierHistory() {
    const list = document.getElementById("cahierList");
    if (!list) return;
    let entries = JSON.parse(localStorage.getItem("cahierEntries")) || [];
    list.innerHTML = entries.map(item => `<div style="background:var(--bg-body); padding:8px; border-radius:6px; font-size:0.85rem;"><strong>${item.date}</strong> : ${item.contenu}</div>`).join('') || '<p style="color:var(--text-muted); font-size:0.85rem;">Aucune séance.</p>';
}

window.envoyerAnnonceClasse = (e) => {
    e.preventDefault();
    const annonce = { id: Date.now(), classe: document.getElementById("msgClasse").value, titre: document.getElementById("msgTitre").value, contenu: document.getElementById("msgContenu").value, date: new Date().toLocaleDateString() };
    let notifs = JSON.parse(localStorage.getItem("eleveNotifications")) || [];
    notifs.unshift(annonce);
    localStorage.setItem("eleveNotifications", JSON.stringify(notifs));
    alert("Annonce diffusée !");
    document.getElementById("messageForm").reset();
};

window.changerAvatarProf = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            localStorage.setItem('prof_avatar', e.target.result);
            document.getElementById('prof-img').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};
