document.addEventListener("DOMContentLoaded", () => {
    
    // =================================================================
    // 0. DICTIONNAIRE I18N (FR / EN)
    // =================================================================
    const apprenantTranslations = {
        fr: {
            apprenant_space_badge: "Espace Apprenant",
            nav_overview: "Accueil",
            nav_courses: "Cours & Supports",
            nav_grades: "Notes & Bulletins",
            nav_life: "Vie Scolaire",
            nav_docs: "Documents",
            welcome_sub: "Heureux de vous revoir",
            stat_avg: "Moyenne Générale",
            stat_tuition: "Statut Scolarité",
            schedule_title: "Emploi du temps de la classe",
            ticker_title: "Flash Info :",
            widget_exam_title: "Portail des Examens Nationaux (CEP, BEPC, BAC)",
            widget_exam_desc: "Consultez les résultats officiels de fin d'année à l'aide de votre numéro de composition.",
            widget_exam_btn: "Vérifier un résultat",
            exam_label_num: "N° de composition",
            exam_label_dob: "Date de naissance",
            btn_search_exam: "Rechercher",
            th_date: "Date",
            th_eval: "Évaluation",
            th_subject: "Matière",
            th_grade: "Note",
            th_feedback: "Appréciation",
            th_status: "Statut",
            th_justif: "Motif / Justification",
            mob_home: "Accueil",
            mob_courses: "Cours",
            mob_grades: "Notes",
            mob_life: "Suivi",
            mob_docs: "Docs",
            status_paid: "À jour (Validé)",
            status_pending: "En attente de règlement",
            empty_schedule: "Aucun emploi du temps configuré pour cette classe.",
            empty_notes: "Aucune note enregistrée pour le moment.",
            empty_presence: "Aucun incident de présence enregistré.",
            notif_modal_title: "Centre de Notifications & Messages",
            btn_justify_absence: "Justifier une absence",
            modal_justify_title: "Soumettre un justificatif d'absence",
            modal_justify_subtitle: "Transmettez le motif et la pièce jointe à l'administration dans les délais.",
            label_absence_date: "Date de l'absence *",
            label_absence_reason: "Motif / Explication *",
            label_absence_file: "Pièce justificative (PDF ou Image) *",
            btn_cancel: "Annuler",
            btn_send: "Envoyer"
        },
        en: {
            apprenant_space_badge: "Student Portal",
            nav_overview: "Home",
            nav_courses: "Courses & Materials",
            nav_grades: "Grades & Reports",
            nav_life: "School Life",
            nav_docs: "Documents",
            welcome_sub: "Welcome back",
            stat_avg: "Overall Average",
            stat_tuition: "Tuition Status",
            schedule_title: "Class Schedule",
            ticker_title: "Flash Info:",
            widget_exam_title: "National Exams Portal (CEP, BEPC, BAC)",
            widget_exam_desc: "Check official end-of-year results using your composition number.",
            widget_exam_btn: "Check a Result",
            exam_label_num: "Composition Number",
            exam_label_dob: "Date of Birth",
            btn_search_exam: "Search",
            th_date: "Date",
            th_eval: "Assessment",
            th_subject: "Subject",
            th_grade: "Grade",
            th_feedback: "Feedback",
            th_status: "Status",
            th_justif: "Reason / Justification",
            mob_home: "Home",
            mob_courses: "Courses",
            mob_grades: "Grades",
            mob_life: "Tracking",
            mob_docs: "Docs",
            status_paid: "Up to date (Validated)",
            status_pending: "Pending Payment",
            empty_schedule: "No schedule configured for this class.",
            empty_notes: "No grades recorded yet.",
            empty_presence: "No attendance incidents recorded.",
            notif_modal_title: "Notifications & Messages Center",
            btn_justify_absence: "Justify an Absence",
            modal_justify_title: "Submit an Absence Justification",
            modal_justify_subtitle: "Send the reason and attachment to the administration within deadlines.",
            label_absence_date: "Absence Date *",
            label_absence_reason: "Reason / Explanation *",
            label_absence_file: "Supporting Document (PDF or Image) *",
            btn_cancel: "Cancel",
            btn_send: "Send"
        }
    };

    function applyApprenantLanguage(lang) {
        localStorage.setItem("linkedu_lang", lang);
        const dict = apprenantTranslations[lang] || apprenantTranslations.fr;
        
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (dict[key]) el.textContent = dict[key];
        });

        const langTextDesktop = document.getElementById("langTextDesktop");
        if (langTextDesktop) {
            langTextDesktop.textContent = lang === "fr" ? "English" : "Français";
        }
    }

    const savedLang = localStorage.getItem("linkedu_lang") || "fr";
    applyApprenantLanguage(savedLang);

    const langToggleDesktop = document.getElementById("langToggleDesktop");
    if (langToggleDesktop) {
        langToggleDesktop.addEventListener("click", () => {
            const currentLang = localStorage.getItem("linkedu_lang") || "fr";
            const newLang = currentLang === "fr" ? "en" : "fr";
            applyApprenantLanguage(newLang);
        });
    }

    // =================================================================
    // 1. GESTION DU THÈME (LIGHT / DARK)
    // =================================================================
    const savedTheme = localStorage.getItem("linkedu_theme") || "light";
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        document.documentElement.setAttribute("data-theme", "dark");
        updateThemeIcon(true);
    } else {
        document.body.classList.remove("dark-mode");
        document.documentElement.setAttribute("data-theme", "light");
        updateThemeIcon(false);
    }

    const themeToggleBtn = document.getElementById("themeToggleBtn");
    if (themeToggleBtn) {
        themeToggleBtn.onclick = () => {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
            localStorage.setItem("linkedu_theme", isDark ? "dark" : "light");
            updateThemeIcon(isDark);
        };
    }

    function updateThemeIcon(isDark) {
        const icon = document.getElementById("themeIcon");
        if (icon) icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }

    // =================================================================
    // 2. NAVIGATION SPA
    // =================================================================
    window.switchApprenantTab = function(sectionId, element) {
        document.querySelectorAll('.app-section').forEach(sec => sec.style.display = 'none');
        
        const activeSec = document.getElementById(sectionId);
        if (activeSec) activeSec.style.display = 'block';

        document.querySelectorAll('.bottom-nav-item, .desktop-nav-item').forEach(item => item.classList.remove('active'));

        if (element) {
            const iconElement = element.querySelector('i');
            if (iconElement) {
                const iconClass = iconElement.className;
                document.querySelectorAll('.bottom-nav-item, .desktop-nav-item').forEach(navItem => {
                    const navIcon = navItem.querySelector('i');
                    if (navIcon && navIcon.className === iconClass) navItem.classList.add('active');
                });
            } else {
                element.classList.add('active');
            }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // =================================================================
    // 3. CHARGEMENT PROFIL
    // =================================================================
    const candidatures = JSON.parse(localStorage.getItem("candidatures")) || [];
    const sessionUser = JSON.parse(localStorage.getItem("linkedu_user") || sessionStorage.getItem("linkedu_user") || "null");
    
    let apprenantActif = sessionUser || candidatures[0] || {
        prenom: "Jean Junior",
        nom: "Diramba Mamboundou",
        etablissement: "École 241",
        classeDemandee: "Terminale Web & Mobile",
        matricule: "LE-2026-0941",
        paye: true
    };

    const nomComplet = `${apprenantActif.prenom || apprenantActif.nom || 'Apprenant'}`.trim();
    const classeActive = apprenantActif.classeDemandee || apprenantActif.classe || "Terminale Web & Mobile";

    document.getElementById("apprenant-nom").textContent = nomComplet;
    document.getElementById("apprenant-ecole").textContent = apprenantActif.etablissement || "École 241";
    document.getElementById("apprenant-classe").textContent = classeActive;
    document.getElementById("apprenant-matricule").textContent = apprenantActif.matricule || "LE-2026-0941";

    const avatarBox = document.getElementById("apprenant-avatar");
    if (apprenantActif.photoEleve) {
        avatarBox.innerHTML = `<img src="${apprenantActif.photoEleve}" alt="${nomComplet}">`;
    } else {
        const partes = nomComplet.split(" ");
        const initiales = partes.length >= 2 ? (partes[0][0] + partes[1][0]).toUpperCase() : "JJ";
        avatarBox.textContent = initiales;
    }

    const statScolarite = document.getElementById("stat-scolarite");
    if (apprenantActif.paye) {
        statScolarite.innerHTML = 'À jour <i class="fa-solid fa-circle-check" style="color: var(--success);"></i>';
        statScolarite.style.color = "var(--success)";
    } else {
        statScolarite.innerHTML = 'En attente <i class="fa-solid fa-triangle-exclamation" style="color: #f59e0b;"></i>';
        statScolarite.style.color = "#f59e0b";
    }

    // =================================================================
    // 4. CHARGEMENT MODULES
    // =================================================================
    chargerNotesEtCalculMoyennes(nomComplet);
    chargerPresenceApprenant(nomComplet);
    chargerCoursEtSupports();
    chargerEmploiDuTempsClasse(classeActive);
    chargerDocumentsApprenant();
    chargerMarqueeEtNotifications();
});

// =================================================================
// BASCULE DU VOLET EXAMENS (STYLE PARENT)
// =================================================================
window.basculerVoletExamens = function() {
    const volet = document.getElementById("volet-examens-deroulant");
    if (volet) {
        if (volet.style.display === "none" || volet.style.display === "") {
            volet.style.display = "block";
        } else {
            volet.style.display = "none";
        }
    }
};

function chargerNotesEtCalculMoyennes(nomApprenant) {
    const tbody = document.getElementById("apprenant-notes-tbody");
    const statMoyenne = document.getElementById("stat-moyenne");
    if (!tbody) return;

    const toutesLesNotes = JSON.parse(localStorage.getItem("notesEleves")) || [];
    const notesFiltrees = toutesLesNotes.filter(n => n.eleve && n.eleve.toLowerCase().includes(nomApprenant.toLowerCase().split(' ')[0]));

    let sommeTotale = 0;
    let nombreNotes = 0;

    if (notesFiltrees.length > 0) {
        tbody.innerHTML = notesFiltrees.map(n => {
            const val = parseFloat(n.note);
            if (!isNaN(val)) { sommeTotale += val; nombreNotes++; }
            return `
                <tr>
                    <td style="color: var(--text-muted); font-size: 0.85rem;">${n.date || '-'}</td>
                    <td style="font-weight: 600; color: var(--primary);">${n.evaluation || 'Évaluation'}</td>
                    <td>${n.classe || '-'}</td>
                    <td style="font-weight: bold; color: var(--success);">${n.note} / 20</td>
                    <td style="font-style: italic; color: var(--text-muted);">${n.appreciation || '-'}</td>
                </tr>
            `;
        }).join('');

        if (statMoyenne && nombreNotes > 0) {
            statMoyenne.textContent = `${(sommeTotale / nombreNotes).toFixed(2)} / 20`;
        }
    } else {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); font-style: italic; padding: 20px;">Aucune note enregistrée pour le moment.</td></tr>`;
        if (statMoyenne) statMoyenne.textContent = "14.5 / 20";
    }
}

function chargerEmploiDuTempsClasse(classeActive) {
    const container = document.getElementById("apprenant-planning-du-jour");
    if (!container) return;

    const adminSchedule = JSON.parse(localStorage.getItem("adminSchedule")) || [];
    const planningClasse = adminSchedule.filter(s => !s.classe || s.classe.toLowerCase() === classeActive.toLowerCase());

    const planningsAffiches = planningClasse.length > 0 ? planningClasse : [
        { time: "08:30 - 11:30", matiere: "Algorithmique & JavaScript Avancé", prof: "M. Paul Yurick", salle: "Labo 1" },
        { time: "13:00 - 16:00", matiere: "UI/UX Design & Maquettage Figma", prof: "Équipe Pédagogique", salle: "Salle Mac" }
    ];

    container.innerHTML = planningsAffiches.map(c => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 14px; background: var(--bg-body); border-radius: 10px; margin-bottom: 8px; border-left: 4px solid var(--primary);">
            <div>
                <h4 style="font-size: 0.92rem; font-weight: 700; color: var(--text-main);">${c.matiere}</h4>
                <p style="font-size: 0.78rem; color: var(--text-muted);"><i class="fa-solid fa-chalkboard-user"></i> ${c.prof || 'Professeur'} • <i class="fa-solid fa-location-dot"></i> ${c.salle || 'Salle principale'}</p>
            </div>
            <span style="font-size: 0.75rem; font-weight: 700; background: rgba(30, 58, 138, 0.1); color: var(--primary); padding: 4px 10px; border-radius: 8px;">${c.time || c.horaire}</span>
        </div>
    `).join('');
}

function chargerCoursEtSupports() {
    const container = document.getElementById("apprenant-cours-list");
    if (!container) return;

    const coursDB = JSON.parse(localStorage.getItem("linkedu_cours")) || [
        { matiere: "Algorithmique & JavaScript", prof: "M. Paul Yurick", description: "Support de cours complet sur les structures itératives et promesses JS.", lienYoutube: "https://youtube.com/watch?v=exemple", fichierPdf: "Cours_JS_Avance.pdf" },
        { matiere: "UI/UX Design Mobile-First", prof: "Équipe Pédagogique", description: "Guide de maquettage Figma et zoning responsive.", lienYoutube: "https://youtube.com/watch?v=exemple2", fichierPdf: "Guide_Figma.pdf" }
    ];

    container.innerHTML = coursDB.map(c => `
        <div style="padding: 16px; border-bottom: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                    <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-main);">${c.matiere}</h4>
                    <p style="font-size: 0.78rem; color: var(--text-muted);">Enseignant : ${c.prof}</p>
                </div>
                <span style="font-size: 0.72rem; background: rgba(5, 150, 105, 0.1); color: var(--success); padding: 4px 10px; border-radius: 20px; font-weight: 600;">Disponible</span>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.4;">${c.description}</p>
            <div style="display: flex; gap: 10px; margin-top: 6px;">
                ${c.lienYoutube ? `<a href="${c.lienYoutube}" target="_blank" class="btn-secondary" style="padding: 6px 12px; font-size: 0.78rem; text-decoration: none; border-radius: 6px; border: 1px solid var(--border-color); background: var(--bg-body); color: var(--text-main); display: inline-flex; align-items: center; gap: 6px;"><i class="fa-brands fa-youtube" style="color: #ef4444;"></i> Vidéo Tutoriel</a>` : ''}
                ${c.fichierPdf ? `<button onclick="alert('Téléchargement du support : ${c.fichierPdf}')" class="btn-action-primary" style="padding: 6px 12px; font-size: 0.78rem; border-radius: 6px; background: var(--primary); color: #fff; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;"><i class="fa-solid fa-file-pdf"></i> Support PDF</button>` : ''}
            </div>
        </div>
    `).join('');
}

function chargerPresenceApprenant(nomApprenant) {
    const tbody = document.getElementById("apprenant-presence-tbody");
    if (!tbody) return;

    const toutLeSuivi = JSON.parse(localStorage.getItem("suiviPresence")) || [];
    const suiviFiltre = toutLeSuivi.filter(s => s.eleve && s.eleve.toLowerCase().includes(nomApprenant.toLowerCase().split(' ')[0]));

    if (suiviFiltre.length > 0) {
        tbody.innerHTML = suiviFiltre.map(s => {
            let badgeBg = "rgba(5, 150, 105, 0.1)"; let badgeColor = "var(--success)";
            if (s.statut === "Absent") { badgeBg = "rgba(239, 68, 68, 0.1)"; badgeColor = "#ef4444"; }
            if (s.statut === "Retard") { badgeBg = "rgba(245, 158, 11, 0.1)"; badgeColor = "#f59e0b"; }

            return `
                <tr>
                    <td style="color: var(--text-muted); font-size: 0.85rem;">${s.date || '-'}</td>
                    <td><span style="background: ${badgeBg}; color: ${badgeColor}; padding: 4px 10px; border-radius: 12px; font-weight: 600; font-size: 0.8rem;">${s.statut}</span></td>
                    <td><span style="font-size: 0.85rem; color: var(--text-muted);">${s.justification || 'Aucun motif particulier'}</span></td>
                </tr>
            `;
        }).join('');
    } else {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: var(--text-muted); font-style: italic; padding: 20px;">Aucun incident de présence enregistré ce mois.</td></tr>`;
    }
}

function chargerDocumentsApprenant() {
    const container = document.getElementById("apprenant-docs-list");
    if (!container) return;

    const docs = JSON.parse(localStorage.getItem("linkedu_documents_administratifs")) || [
        { titre: "Certificat de Scolarité 2026", categorie: "Scolarité", date: "15/02/2026", taille: "1.2 Mo" },
        { titre: "Reçu de Paiement Mobile Money", categorie: "Finances", date: "22/02/2026", taille: "850 Ko" }
    ];

    container.innerHTML = docs.map(d => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 14px; border-bottom: 1px solid var(--border-color); gap: 10px;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <i class="fa-solid fa-file-pdf" style="font-size: 1.5rem; color: #ef4444;"></i>
                <div>
                    <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--text-main);">${d.titre}</h4>
                    <p style="font-size: 0.75rem; color: var(--text-muted);">${d.categorie} • ${d.date} • ${d.taille}</p>
                </div>
            </div>
            <button onclick="alert('Téléchargement du document : ${d.titre}')" class="btn-secondary" style="padding: 6px 12px; font-size: 0.78rem; border-radius: 6px; border: 1px solid var(--border-color); background: var(--bg-body); color: var(--text-main); cursor:pointer;"><i class="fa-solid fa-download"></i></button>
        </div>
    `).join('');
}

function chargerMarqueeEtNotifications() {
    const marqueeEl = document.getElementById("marquee-annonces");
    const notificationsList = document.getElementById("modal-notifications-list");
    const topBellBadge = document.getElementById("top-bell-badge");

    const annonces = JSON.parse(localStorage.getItem("eleveNotifications")) || [
        { titre: "Rentrée Pédagogique", contenu: "Bienvenue sur la plateforme LinkEdu. Retrouvez vos emplois du temps et supports de cours en ligne.", date: "Aujourd'hui" }
    ];

    if (marqueeEl && annonces.length > 0) {
        marqueeEl.textContent = annonces.map(a => `${a.titre} : ${a.contenu}`).join("  •  ");
    }

    if (topBellBadge && annonces.length > 0) {
        topBellBadge.style.display = "inline-block";
        topBellBadge.textContent = annonces.length;
    }

    if (notificationsList) {
        notificationsList.innerHTML = annonces.map(n => `
            <div style="background: var(--bg-body); padding: 12px; border-radius: 10px; margin-bottom: 10px; border-left: 4px solid var(--primary);">
                <div style="display:flex; justify-content:space-between; font-weight:700; font-size:0.88rem; margin-bottom:4px;">
                    <span>${n.titre}</span>
                    <span style="font-size:0.75rem; color:var(--text-muted);">${n.date || ''}</span>
                </div>
                <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.4; margin:0;">${n.contenu}</p>
            </div>
        `).join('');
    }
}

window.ouvrirModalNotifications = function() {
    document.getElementById("modal-notifications").style.display = "flex";
};

window.fermerModalNotifications = function() {
    document.getElementById("modal-notifications").style.display = "none";
};

window.rechercherResultatExamen = function() {
    const typeExam = document.getElementById("exam-type-select").value;
    const numComp = document.getElementById("exam-table-number").value.trim();
    const dob = document.getElementById("exam-dob").value;
    const container = document.getElementById("exam-result-container");
    const currentLang = localStorage.getItem("linkedu_lang") || "fr";

    if (!numComp || !dob) {
        alert(currentLang === 'fr' ? "Veuillez renseigner le numéro de composition et la date de naissance." : "Please enter both composition number and date of birth.");
        return;
    }

    const examensDB = JSON.parse(localStorage.getItem("resultatsExamens")) || [
        { type: "BAC", numero: "26-BAC-1048", dob: "2008-05-14", nom: "Jean Junior", centre: "Lycée National Léon Mba", mention: "Bien", statut: "Admis", notes: { "Mathématiques": 15, "Français": 14, "Philosophie": 13, "Anglais": 16 } }
    ];

    const resultatTrouve = examensDB.find(e => e.type === typeExam && e.numero.toLowerCase() === numComp.toLowerCase() && e.dob === dob);

    if (resultatTrouve) {
        const isAdmis = resultatTrouve.statut === "Admis";
        const badgeClass = isAdmis ? "admis" : "refuse";

        let notesHtml = Object.entries(resultatTrouve.notes).map(([mat, note]) => `
            <tr><td>${mat}</td><td style="font-weight: bold; color: var(--primary);">${note} / 20</td></tr>
        `).join('');

        container.innerHTML = `
            <div class="exam-card-result">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <div>
                        <h4 style="font-size: 1rem; font-weight: 800; color: var(--text-main);">${resultatTrouve.nom}</h4>
                        <p style="font-size: 0.78rem; color: var(--text-muted);">Centre : ${resultatTrouve.centre} | N° : ${resultatTrouve.numero}</p>
                    </div>
                    <span class="exam-status-badge ${badgeClass}">${resultatTrouve.statut} (${resultatTrouve.mention})</span>
                </div>
                <div class="table-responsive">
                    <table>
                        <thead><tr><th>Matière</th><th>Note Obtenue</th></tr></thead>
                        <tbody>${notesHtml}</tbody>
                    </table>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div style="text-align: center; color: #ef4444; font-weight: 600; padding: 12px; font-size: 0.85rem;">
                <i class="fa-solid fa-triangle-exclamation"></i> Aucun résultat trouvé avec ces identifiants.
            </div>
        `;
    }
};

let fichierJustificatifBase64Temp = null;

window.previsualiserFichierSelectionne = function(input) {
    const btnApercu = document.getElementById("btn-apercu-file");
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            fichierJustificatifBase64Temp = e.target.result;
            if (btnApercu) btnApercu.style.display = "block";
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        fichierJustificatifBase64Temp = null;
        if (btnApercu) btnApercu.style.display = "none";
    }
};

window.ouvrirApercuFichier = function() {
    if (!fichierJustificatifBase64Temp) return;
    const win = window.open();
    win.document.write(`
        <!DOCTYPE html>
        <html>
        <head><title>Aperçu de la Pièce Justificative</title></head>
        <body style="margin:0; background:#0f172a; display:flex; justify-content:center; align-items:center; height:100vh;">
            <iframe src="${fichierJustificatifBase64Temp}" style="width:90%; height:90%; border:none; border-radius:8px;"></iframe>
        </body>
        </html>
    `);
};

window.ouvrirModalJustification = function() {
    document.getElementById("modal-justification").style.display = "flex";
};

window.fermerModalJustification = function() {
    document.getElementById("modal-justification").style.display = "none";
    document.getElementById("form-justification").reset();
    document.getElementById("btn-apercu-file").style.display = "none";
    fichierJustificatifBase64Temp = null;
};

window.soumettreJustification = function(e) {
    e.preventDefault();
    const dateAbsence = document.getElementById("justif-date").value;
    const motifAbsence = document.getElementById("justif-motif").value;
    const candidatures = JSON.parse(localStorage.getItem("candidatures")) || [];
    const nomEnfant = candidatures[0] ? `${candidatures[0].prenom} ${candidatures[0].nom}` : "Jean Junior";

    let toutLeSuivi = JSON.parse(localStorage.getItem("suiviPresence")) || [];
    toutLeSuivi.push({
        eleve: nomEnfant,
        date: dateAbsence,
        classe: "Terminale Web & Mobile",
        statut: "Absent",
        justification: motifAbsence,
        justificatifFichier: fichierJustificatifBase64Temp,
        statutJustificatif: "En attente"
    });

    localStorage.setItem("suiviPresence", JSON.stringify(toutLeSuivi));
    fermerModalJustification();
    alert("Justificatif transmis avec succès à l'administration.");
    chargerPresenceApprenant(nomEnfant);
};
