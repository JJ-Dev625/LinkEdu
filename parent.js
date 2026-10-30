document.addEventListener("DOMContentLoaded", () => {
    
    // =================================================================
    // 0. DICTIONNAIRE I18N COMPLET (FR / EN)
    // =================================================================
    const localParentTranslations = {
        fr: {
            parent_space_badge: "Espace Parent",
            parent_tracking_label: "Suivi de :",
            parent_nav_overview: "Vue d'ensemble",
            parent_nav_grades: "Bulletins & Notes",
            parent_nav_life: "Vie Scolaire",
            parent_nav_exams: "Examens",
            parent_nav_docs: "Coffre-fort Docs",
            parent_nav_messages: "Messagerie",
            parent_nav_finances: "Scolarité",
            parent_welcome_sub: "Bienvenue sur votre espace de suivi",
            parent_school_open: "Établissement Ouvert",
            parent_stat_avg: "Moyenne Générale",
            parent_stat_abs: "Absences (Mois)",
            parent_stat_late: "Retards",
            parent_announcements_title: "Annonces & Communications",
            parent_empty_announcements: "Aucune annonce récente pour le moment.",
            parent_timeline_title: "Fil d'actualité de l'élève",
            widget_exam_title: "Portail des Examens Nationaux (CEP, BEPC, BAC)",
            widget_exam_desc: "Consultez les résultats officiels de fin d'année à l'aide de votre numéro de composition.",
            widget_exam_btn: "Vérifier un résultat",
            th_date: "Date",
            th_evaluation: "Évaluation",
            th_subject: "Matière / Classe",
            th_grade: "Note",
            th_appreciation: "Appréciation Professeur",
            th_class: "Classe",
            th_status: "Statut Enregistré",
            th_justification: "Justificatif",
            finance_box_title: "Statut du Dossier & Frais de Scolarité",
            finance_box_desc: "État du règlement pour l'année académique en cours.",
            finance_history_title: "Historique des Transactions & Reçus Officiels",
            mob_home: "Accueil",
            mob_grades: "Notes",
            mob_life: "Suivi",
            mob_docs: "Docs",
            mob_finances: "Scolarité",
            empty_notes: "Aucune note enregistrée pour le moment.",
            empty_presence: "Aucun incident de présence enregistré ce mois.",
            teacher_label: "Professeur : ",
            btn_justify_absence: "Justifier une absence",
            modal_justify_title: "Soumettre un justificatif d'absence",
            modal_justify_subtitle: "Transmettez le motif et la pièce jointe à la Vie Scolaire.",
            label_absence_date: "Date de l'absence *",
            label_absence_reason: "Motif / Explication *",
            label_absence_file: "Pièce justificative (PDF ou Image) *",
            btn_cancel: "Annuler",
            btn_send: "Envoyer",
            timeline_checkin: "Pointage Entrée : Arrivé à l'établissement à l'heure.",
            timeline_homework: "Devoir rendu : Travaux pratiques transmis.",
            status_paid: "Dossier Validé & Payé",
            status_pending: "En attente de règlement des frais",
            exam_search_desc: "Consultez les résultats officiels (CEP, BEPC, BAC) en renseignant votre numéro de composition et votre date de naissance.",
            exam_label_num: "N° de composition",
            exam_label_dob: "Date de naissance",
            btn_search_exam: "Rechercher",
            exam_empty_state: "Entrez vos identifiants pour afficher le relevé officiel.",
            doc_vault_desc: "Certificats de scolarité, bulletins trimestriels, tableaux d'honneur et carte scolaire émis par l'administration.",
            campus_gallery_title: "Établissements & Vie Campus",
            footer_copyright: "LinkEdu © 2026 — Plateforme Éducative Numérique Unifiée. Tous droits réservés.",
            footer_legal: "Mentions Légales",
            footer_support: "Support Technique"
        },
        en: {
            parent_space_badge: "Parent Portal",
            parent_tracking_label: "Tracking:",
            parent_nav_overview: "Overview",
            parent_nav_grades: "Report Cards & Grades",
            parent_nav_life: "School Life",
            parent_nav_exams: "Exams",
            parent_nav_docs: "Doc Vault",
            parent_nav_messages: "Messaging",
            parent_nav_finances: "Tuition",
            parent_welcome_sub: "Welcome to your tracking portal",
            parent_school_open: "School Open",
            parent_stat_avg: "Overall Average",
            parent_stat_abs: "Absences (Month)",
            parent_stat_late: "Late Arrivals",
            parent_announcements_title: "Announcements & Communications",
            parent_empty_announcements: "No recent announcements at the moment.",
            parent_timeline_title: "Student Feed",
            widget_exam_title: "National Exams Portal (CEP, BEPC, BAC)",
            widget_exam_desc: "Check official end-of-year results using your composition number.",
            widget_exam_btn: "Check a Result",
            th_date: "Date",
            th_evaluation: "Assessment",
            th_subject: "Subject / Class",
            th_grade: "Grade",
            th_appreciation: "Teacher's Feedback",
            th_class: "Class",
            th_status: "Registered Status",
            th_justification: "Justification",
            finance_box_title: "Application Status & Tuition Fees",
            finance_box_desc: "Payment status for the current academic year.",
            finance_history_title: "Transaction History & Official Receipts",
            mob_home: "Home",
            mob_grades: "Grades",
            mob_life: "Tracking",
            mob_docs: "Docs",
            mob_finances: "Tuition",
            empty_notes: "No grades recorded at the moment.",
            empty_presence: "No attendance incidents recorded this month.",
            teacher_label: "Teacher: ",
            btn_justify_absence: "Justify an Absence",
            modal_justify_title: "Submit an Absence Justification",
            modal_justify_subtitle: "Send the reason and attachment to the School Life Office.",
            label_absence_date: "Absence Date *",
            label_absence_reason: "Reason / Explanation *",
            label_absence_file: "Supporting Document (PDF or Image) *",
            btn_cancel: "Cancel",
            btn_send: "Send",
            timeline_checkin: "Check-in Entry: Arrived at school on time.",
            timeline_homework: "Homework Submitted: Practical assignment turned in.",
            status_paid: "File Validated & Paid",
            status_pending: "Pending Fee Payment",
            exam_search_desc: "Check official results (CEP, BEPC, BAC) by entering your composition number and date of birth.",
            exam_label_num: "Composition Number",
            exam_label_dob: "Date of Birth",
            btn_search_exam: "Search",
            exam_empty_state: "Enter your credentials to view the official transcript.",
            doc_vault_desc: "Certificates, report cards, honor rolls, and student ID cards issued by the administration.",
            campus_gallery_title: "Campuses & School Life",
            footer_copyright: "LinkEdu © 2026 — Unified Digital Educational Platform. All rights reserved.",
            footer_legal: "Legal Notices",
            footer_support: "Technical Support"
        }
    };
    function applyParentLanguage(lang) {
        localStorage.setItem("linkedu_lang", lang);
        const dict = localParentTranslations[lang] || localParentTranslations.fr;
        
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
    applyParentLanguage(savedLang);

    const langToggleDesktop = document.getElementById("langToggleDesktop");
    if (langToggleDesktop) {
        langToggleDesktop.addEventListener("click", () => {
            const currentLang = localStorage.getItem("linkedu_lang") || "fr";
            const newLang = currentLang === "fr" ? "en" : "fr";
            applyParentLanguage(newLang);
            chargerDonneesParent();
        });
    }

    // Identité du Parent
    let parentNom = "M. / Mme Parent";
    const candidatures = JSON.parse(localStorage.getItem("candidatures")) || [];
    const sessionUser = JSON.parse(sessionStorage.getItem("linkedu_user") || localStorage.getItem("linkedu_user") || "null");
    
    if (sessionUser && sessionUser.nomParent) {
        parentNom = sessionUser.nomParent;
    } else if (candidatures.length > 0) {
        const derniereCand = candidatures[candidatures.length - 1];
        if (derniereCand.nomTuteur) parentNom = derniereCand.nomTuteur;
        else if (derniereCand.nomParent) parentNom = derniereCand.nomParent;
        else if (derniereCand.nom) parentNom = `M. ${derniereCand.nom}`;
    }

    const parentAccountNameEl = document.getElementById("parent-account-name");
    if (parentAccountNameEl) parentAccountNameEl.textContent = parentNom;

    // Gestion du Thème
    const savedTheme = localStorage.getItem("linkedu_theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        updateThemeIcon(true);
    } else {
        document.body.classList.remove("dark-mode");
        updateThemeIcon(false);
    }

    const themeToggleBtn = document.getElementById("themeToggleBtn");
    if (themeToggleBtn) {
        themeToggleBtn.onclick = () => {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            localStorage.setItem("linkedu_theme", isDark ? "dark" : "light");
            updateThemeIcon(isDark);
        };
    }

    initialiserSelecteurEnfants();
    chargerDonneesParent();
    chargerDocumentsAdministratifs();
    chargerHistoriqueFinancier();
});

function updateThemeIcon(isDark) {
    const icon = document.getElementById("themeIcon");
    if (icon) icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

window.deconnecterUtilisateur = function() {
    if (confirm("Voulez-vous vraiment vous déconnecter de LinkEdu ?")) {
        localStorage.removeItem("linkedu_user");
        sessionStorage.removeItem("linkedu_user");
        window.location.href = "index.html";
    }
};
// =================================================================
// CARROUSEL D'IMAGES DYNAMIQUE EN FONCTION DE L'ÉTABLISSEMENT DE L'ENFANT
// =================================================================
function chargerCarrouselMediaParEcole(nomEcole) {
    const container = document.getElementById("media-carousel-container");
    if (!container) return;

    let galeriesMediaDB = [];

    // Adapte les images et le contenu en fonction de l'établissement actif de l'enfant
    if (nomEcole.toLowerCase().includes("bikélé") || nomEcole.toLowerCase().includes("ces")) {
        galeriesMediaDB = [
            { titre: "CES de Bikélé", categorie: "Établissement Principal", url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=500&q=80" },
            { titre: "Cour Centrale & Salles de classe", categorie: "Infrastructures", url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=500&q=80" },
            { titre: "Activités Sportives Collège", categorie: "Vie Scolaire", url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=500&q=80" }
        ];
    } else {
        // Par défaut / Lycée National Léon Mba
        galeriesMediaDB = [
            { titre: "Lycée National Léon Mba", categorie: "Établissement", url: "./images/log1.png" },
            { titre: "Laboratoire Numérique & Informatique", categorie: "Infrastructures", url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80" },
            { titre: "Amphithéâtre & Conférences", categorie: "Vie Campus", url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=500&q=80" }
        ];
    }

    container.innerHTML = galeriesMediaDB.map((m) => `
        <div class="media-item-card" onclick="alert('${m.titre} - ${m.categorie}')">
            <img src="${m.url}" alt="${m.titre}" onerror="this.src='https://via.placeholder.com/260x130?text=LinkEdu+Campus'">
            <div class="media-overlay-info">
                <span>${m.titre}</span>
                <i class="fa-solid fa-expand" style="font-size: 0.7rem; opacity: 0.8;"></i>
            </div>
        </div>
    `).join('');
}

function initialiserSelecteurEnfants() {
    const selectEnfant = document.getElementById("select-enfant-actif");
    const mobileTabsContainer = document.getElementById("mobile-child-tabs-container");
    const candidatures = JSON.parse(localStorage.getItem("candidatures")) || [];
    
    let enfantsList = [];
    if (candidatures.length > 0) {
        enfantsList = candidatures.map(c => ({
            nomComplet: `${c.prenom || ''} ${c.nom || 'Élève'}`.trim(),
            classe: c.classeDemandee || 'Terminale',
            ecole: c.etablissement || 'Lycée National Léon Mba',
            photo: c.photoEleve || null
        }));
    } else {
        enfantsList = [
            { nomComplet: "Marc Mboundou", ecole: "Lycée National Léon Mba", classe: "Terminale A1", photo: null },
            { nomComplet: "Sarah Mboundou", ecole: "CES de Bikélé", classe: "4ème B", photo: null }
        ];
    }

    if (selectEnfant) {
        selectEnfant.innerHTML = enfantsList.map(e => `
            <option value="${e.nomComplet}" data-ecole="${e.ecole}" data-classe="${e.classe}">${e.nomComplet} — ${e.ecole} (${e.classe})</option>
        `).join('');
    }

    const savedEnfant = localStorage.getItem("parentEnfantActif") || enfantsList[0].nomComplet;
    if (selectEnfant) selectEnfant.value = savedEnfant;

    if (mobileTabsContainer) {
        mobileTabsContainer.innerHTML = enfantsList.map(e => {
            const isActive = e.nomComplet === savedEnfant;
            const initiales = obtenirInitiales(e.nomComplet);
            const avatarHtml = e.photo ? `<img src="${e.photo}" alt="${e.nomComplet}">` : initiales;

            return `
                <div class="child-tab-pill ${isActive ? 'active' : ''}" onclick="selectionnerEnfantMobile('${e.nomComplet}')">
                    <div class="child-tab-avatar">${avatarHtml}</div>
                    <div class="child-tab-info">
                        <span class="child-tab-title">${e.nomComplet}</span>
                        <span class="child-tab-subtitle">${e.classe}</span>
                    </div>
                </div>
            `;
        }).join('');
    }
}
window.selectionnerEnfantMobile = function(nomComplet) {
    const selectEnfant = document.getElementById("select-enfant-actif");
    if (selectEnfant) {
        selectEnfant.value = nomComplet;
        changerEnfantActif();
        initialiserSelecteurEnfants();
    }
};

function obtenirInitiales(nomComplet) {
    if (!nomComplet) return "LE";
    const partes = nomComplet.trim().split(" ");
    if (partes.length >= 2) return (partes[0][0] + partes[1][0]).toUpperCase();
    return partes[0].substring(0, 2).toUpperCase();
}

function mettreAJourAvatars(nomEnfant, photoUrl) {
    const heroAvatar = document.getElementById("hero-child-avatar");
    const initiales = obtenirInitiales(nomEnfant);
    const avatarHtml = photoUrl ? `<img src="${photoUrl}" alt="${nomEnfant}">` : initiales;
    if (heroAvatar) heroAvatar.innerHTML = avatarHtml;
}

window.switchParentTab = function(sectionId, element) {
    document.querySelectorAll('.parent-section').forEach(sec => sec.style.display = 'none');
    
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
// MISE À JOUR GLOBAL DE TOUTES LES DONNÉES DE L'ENFANT SÉLECTIONNÉ
// =================================================================
function chargerDonneesParent() {
    const selectEnfant = document.getElementById("select-enfant-actif");
    const nomEnfantActif = selectEnfant ? selectEnfant.value : "Marc Mboundou";
    const selectedOption = selectEnfant ? selectEnfant.options[selectEnfant.selectedIndex] : null;
    const currentLang = localStorage.getItem("linkedu_lang") || "fr";

    localStorage.setItem("parentEnfantActif", nomEnfantActif);

    const candidatures = JSON.parse(localStorage.getItem("candidatures")) || [];
    const dossierEnfant = candidatures.find(c => {
        const nomComplet = `${c.prenom || ''} ${c.nom || ''}`.toLowerCase();
        return nomComplet.includes(nomEnfantActif.toLowerCase().split(' ')[0]);
    });

    const ecoleEnfant = dossierEnfant?.etablissement || selectedOption?.getAttribute("data-ecole") || "Lycée National Léon Mba";
    const classeEnfant = dossierEnfant?.classeDemandee || selectedOption?.getAttribute("data-classe") || "Terminale A1";
    const photoEnfant = dossierEnfant?.photoEleve || null;

    // Mise à jour dynamique du carrousel d'images selon l'établissement
    chargerCarrouselMediaParEcole(ecoleEnfant);

    mettreAJourAvatars(nomEnfantActif, photoEnfant);

    const welcomeTitle = document.getElementById("welcome-child-name");
    const schoolNameEl = document.getElementById("welcome-school-name");
    const classeBadge = document.getElementById("classe-active-badge");

    if (welcomeTitle) welcomeTitle.textContent = nomEnfantActif;
    if (schoolNameEl) schoolNameEl.textContent = ecoleEnfant;
    if (classeBadge) classeBadge.textContent = classeEnfant;

    const translationsDict = {
        fr: {
            empty_notes: "Aucune note enregistrée pour le moment.",
            empty_presence: "Aucun incident de présence enregistré ce mois.",
            teacher_label: "Professeur : ",
            default_announcement: "Aucune annonce récente pour le moment.",
            status_paid: "Dossier Validé & Payé",
            status_pending: "En attente de règlement des frais",
            timeline_checkin: "Pointage Entrée : Arrivé à l'établissement à l'heure.",
            timeline_homework: "Devoir rendu : Travaux pratiques transmis."
        },
        en: {
            empty_notes: "No grades recorded at the moment.",
            empty_presence: "No attendance incidents recorded this month.",
            teacher_label: "Teacher: ",
            default_announcement: "No recent announcements at the moment.",
            status_paid: "File Validated & Paid",
            status_pending: "Pending Fee Payment",
            timeline_checkin: "Check-in Entry: Arrived at school on time.",
            timeline_homework: "Homework Submitted: Practical assignment turned in."
        }
    };
    const dict = translationsDict[currentLang] || translationsDict.fr;

    const financeBadge = document.getElementById("finance-status-badge");
    if (financeBadge) {
        if (dossierEnfant && dossierEnfant.paye) {
            financeBadge.className = "finance-badge success";
            financeBadge.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${dict.status_paid} (${dossierEnfant.montantScolarite ? dossierEnfant.montantScolarite.toLocaleString() : '25 000'} FCFA)`;
        } else {
            financeBadge.className = "finance-badge warning";
            financeBadge.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${dict.status_pending}`;
        }
    }

    const toutesLesNotes = JSON.parse(localStorage.getItem("notesEleves")) || [];
    const notesEnfant = toutesLesNotes.filter(n => n.eleve && n.eleve.toLowerCase().includes(nomEnfantActif.toLowerCase().split(' ')[0]));
    
    const notesTbody = document.getElementById("parent-notes-tbody");
    let sommeNotes = 0; let nombreNotes = 0;

    if (notesTbody) {
        if (notesEnfant.length > 0) {
            notesTbody.innerHTML = notesEnfant.map(n => {
                const valNote = parseFloat(n.note);
                if (!isNaN(valNote)) { sommeNotes += valNote; nombreNotes++; }
                return `
                    <tr>
                        <td style="color: var(--text-muted); font-size: 0.85rem;">${n.date || '-'}</td>
                        <td style="font-weight: 600; color: var(--success);">${n.evaluation || 'Évaluation'}</td>
                        <td>${n.classe || '-'}</td>
                        <td style="font-weight: bold; color: var(--success);">${n.note} / 20</td>
                        <td style="font-style: italic; color: var(--text-muted);">${n.appreciation || '-'}</td>
                    </tr>
                `;
            }).join('');
        } else {
            notesTbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); font-style: italic; padding: 20px;">${dict.empty_notes}</td></tr>`;
        }
    }

    const statMoyenne = document.getElementById("stat-moyenne");
    if (statMoyenne) {
        statMoyenne.textContent = nombreNotes > 0 ? `${(sommeNotes / nombreNotes).toFixed(2)} / 20` : "14.5 / 20";
    }

    const toutLeSuivi = JSON.parse(localStorage.getItem("suiviPresence")) || [];
    const suiviEnfant = toutLeSuivi.filter(s => s.eleve && s.eleve.toLowerCase().includes(nomEnfantActif.toLowerCase().split(' ')[0]));

    let nbAbsences = 0; let nbRetards = 0;
    const presenceTbody = document.getElementById("parent-presence-tbody");
    if (presenceTbody) {
        if (suiviEnfant.length > 0) {
            presenceTbody.innerHTML = suiviEnfant.map(s => {
                if (s.statut === "Absent") nbAbsences++;
                if (s.statut === "Retard") nbRetards++;

                let badgeBg = "rgba(5, 150, 105, 0.1)"; let badgeColor = "var(--success)";
                if (s.statut === "Absent") { badgeBg = "rgba(239, 68, 68, 0.1)"; badgeColor = "#ef4444"; }
                if (s.statut === "Retard") { badgeBg = "rgba(245, 158, 11, 0.1)"; badgeColor = "#f59e0b"; }

                return `
                    <tr>
                        <td style="color: var(--text-muted); font-size: 0.85rem;">${s.date || '-'}</td>
                        <td>${s.classe || '-'}</td>
                        <td><span style="background: ${badgeBg}; color: ${badgeColor}; padding: 4px 10px; border-radius: 12px; font-weight: 600; font-size: 0.8rem;">${s.statut}</span></td>
                        <td><span style="font-size: 0.8rem; color: var(--text-muted);">${s.justification || 'Non justifié'}</span></td>
                    </tr>
                `;
            }).join('');
        } else {
            presenceTbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); font-style: italic; padding: 20px;">${dict.empty_presence}</td></tr>`;
        }
    }
    const statAbs = document.getElementById("stat-absences");
    const statRet = document.getElementById("stat-retards");
    if (statAbs) statAbs.textContent = nbAbsences;
    if (statRet) statRet.textContent = nbRetards;

    const timelineEl = document.getElementById("parent-student-timeline");
    if (timelineEl) {
        timelineEl.innerHTML = `
            <div class="timeline-item">
                <span class="timeline-time">${currentLang === 'fr' ? "Aujourd'hui" : "Today"}, 07:45</span>
                <p>${dict.timeline_checkin}</p>
            </div>
            <div class="timeline-item">
                <span class="timeline-time">${currentLang === 'fr' ? "Hier" : "Yesterday"}, 16:30</span>
                <p>${dict.timeline_homework}</p>
            </div>
        `;
    }

    const notifications = JSON.parse(localStorage.getItem("eleveNotifications")) || [];
    const notifContainer = document.getElementById("parent-notifications-list");
    const alertesContainer = document.getElementById("parent-dernieres-alertes");
    const badgeNotif = document.getElementById("badge-notif");
    const badgeNotifDesktop = document.getElementById("badge-notif-desktop");
    const topBellBadge = document.getElementById("top-bell-badge");

    if (notifications.length > 0) {
        if (badgeNotif) { badgeNotif.style.display = "inline-block"; badgeNotif.textContent = notifications.length; }
        if (badgeNotifDesktop) { badgeNotifDesktop.style.display = "inline-block"; badgeNotifDesktop.textContent = notifications.length; }
        if (topBellBadge) { topBellBadge.style.display = "inline-block"; topBellBadge.textContent = notifications.length; }
    } else {
        if (badgeNotif) badgeNotif.style.display = "none";
        if (badgeNotifDesktop) badgeNotifDesktop.style.display = "none";
        if (topBellBadge) topBellBadge.style.display = "none";
    }

    const htmlNotifications = notifications.length > 0 ? notifications.map(notif => `
        <div style="background: var(--bg-body); padding: 14px; border-radius: 12px; margin-bottom: 12px; border-left: 4px solid var(--success); border: 1px solid var(--border-color);">
            <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--text-main); margin-bottom: 4px; font-size: 0.9rem;">
                <span><i class="fa-solid fa-bullhorn" style="color: var(--success);"></i> ${notif.titre}</span>
                <span style="font-size: 0.75rem; color: var(--text-muted);">${notif.date || 'Récemment'}</span>
            </div>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 6px; line-height: 1.4;">${notif.contenu}</p>
            <p style="font-size: 0.72rem; color: var(--text-muted); text-align: right; margin: 0; font-style: italic;">${dict.teacher_label} ${notif.expediteur || 'Administration'}</p>
        </div>
    `).join('') : `<p class="empty-text">${dict.default_announcement}</p>`;

    if (notifContainer) notifContainer.innerHTML = htmlNotifications;
    if (alertesContainer) alertesContainer.innerHTML = htmlNotifications;
}

window.changerEnfantActif = function() {
    chargerDonneesParent();
    chargerDocumentsAdministratifs();
    chargerHistoriqueFinancier();
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
        { type: "BAC", numero: "26-BAC-1048", dob: "2008-05-14", nom: "Marc Mboundou", centre: "Lycée National Léon Mba", mention: "Bien", statut: "Admis", notes: { "Mathématiques": 15, "Français": 14, "Philosophie": 13, "Anglais": 16 } },
        { type: "BEPC", numero: "26-BEPC-5092", dob: "2008-05-14", nom: "Marc Mboundou", centre: "CES Avorbam", mention: "Assez-Bien", statut: "Admis", notes: { "Mathématiques": 12, "Français": 13, "Histoire-Géo": 14, "Sciences": 11 } }
    ];

    const resultatTrouve = examensDB.find(e => e.type === typeExam && e.numero.toLowerCase() === numComp.toLowerCase() && e.dob === dob);

    if (resultatTrouve) {
        const isAdmis = resultatTrouve.statut === "Admis";
        const badgeClass = isAdmis ? "admis" : "refuse";

        let notesHtml = Object.entries(resultatTrouve.notes).map(([mat, note]) => `
            <tr><td>${mat}</td><td style="font-weight: bold; color: var(--success);">${note} / 20</td></tr>
        `).join('');

        container.innerHTML = `
            <div class="exam-card-result">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <div>
                        <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-main);">${resultatTrouve.nom}</h4>
                        <p style="font-size: 0.8rem; color: var(--text-muted);">Centre : ${resultatTrouve.centre} | N° : ${resultatTrouve.numero}</p>
                    </div>
                    <span class="exam-status-badge ${badgeClass}">${resultatTrouve.statut} (${resultatTrouve.mention})</span>
                </div>
                <div class="table-responsive" style="margin-top: 10px;">
                    <table>
                        <thead><tr><th>Matière</th><th>Note Obtenue</th></tr></thead>
                        <tbody>${notesHtml}</tbody>
                    </table>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="exam-card-result" style="text-align: center; color: #ef4444; font-weight: 600;">
                <i class="fa-solid fa-triangle-exclamation" style="font-size: 1.5rem; margin-bottom: 8px;"></i>
                <p>${currentLang === 'fr' ? "Aucun résultat trouvé avec ces identifiants." : "No results found with these credentials."}</p>
            </div>
        `;
    }
};
function chargerDocumentsAdministratifs() {
    const docsContainer = document.getElementById("parent-documents-list");
    if (!docsContainer) return;

    const documentsAdmin = JSON.parse(localStorage.getItem("linkedu_documents_administratifs")) || [
        { titre: "Certificat de Scolarité 2026", categorie: "Scolarité", date: "15/02/2026", type: "PDF", taille: "1.2 Mo" },
        { titre: "Bulletin Trimestriel - 1er Trimestre", categorie: "Bulletins", date: "20/01/2026", type: "PDF", taille: "2.4 Mo" },
        { titre: "Tableau d'Honneur (1er Trimestre)", categorie: "Distinctions", date: "22/01/2026", type: "Image", taille: "950 Ko" },
        { titre: "Carte Scolaire Numérique 2026", categorie: "Identité", date: "05/01/2026", type: "Badge", taille: "500 Ko" }
    ];

    docsContainer.innerHTML = documentsAdmin.map(doc => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border-bottom: 1px solid var(--border-color); gap: 10px;">
            <div style="display: flex; align-items: center; gap: 14px;">
                <i class="fa-solid fa-file-shield" style="font-size: 1.6rem; color: var(--success);"></i>
                <div>
                    <h4 style="font-size: 0.92rem; font-weight: 700; color: var(--text-main);">${doc.titre}</h4>
                    <p style="font-size: 0.75rem; color: var(--text-muted);">${doc.categorie} • Émis le ${doc.date} • ${doc.taille}</p>
                </div>
            </div>
            <div style="display: flex; gap: 8px;">
                <button onclick="ouvrirDocumentAdministratif('${doc.titre}')" class="btn-secondary" style="padding: 6px 12px; font-size: 0.78rem;" title="Voir In-App"><i class="fa-solid fa-eye"></i></button>
                <button onclick="telechargerDocumentAdministratif('${doc.titre}')" class="btn-action-primary" style="padding: 6px 12px; font-size: 0.78rem; background: var(--success);" title="Télécharger"><i class="fa-solid fa-download"></i></button>
            </div>
        </div>
    `).join('');
}

window.ouvrirDocumentAdministratif = function(titre) {
    alert(`Ouverture officielle sécurisée in-app : ${titre}`);
};

window.telechargerDocumentAdministratif = function(titre) {
    alert(`Téléchargement en cours du document officiel : ${titre}`);
};

function chargerHistoriqueFinancier() {
    const tbody = document.getElementById("parent-transactions-tbody");
    if (!tbody) return;

    const transactions = JSON.parse(localStorage.getItem("linkedu_transactions_mobile_money")) || [
        { date: "22/02/2026", ref: "TXN-AM-948201", operateur: "Airtel Money", montant: "25 000 FCFA", statut: "Validé" },
        { date: "15/01/2026", ref: "TXN-MM-382910", operateur: "Moov Money", montant: "15 000 FCFA", statut: "Validé" }
    ];

    tbody.innerHTML = transactions.map(t => `
        <tr>
            <td style="color: var(--text-muted); font-size: 0.85rem;">${t.date}</td>
            <td style="font-weight: 600; color: var(--text-main);">${t.ref}</td>
            <td><span style="font-weight: 600; color: var(--success);">${t.operateur}</span></td>
            <td style="font-weight: bold; color: var(--success);">${t.montant}</td>
            <td><span style="background: rgba(5, 150, 105, 0.1); color: var(--success); padding: 4px 10px; border-radius: 12px; font-weight: 600; font-size: 0.8rem;">${t.statut}</span></td>
            <td>
                <button onclick="telechargerRecuMobileMoney('${t.ref}')" class="btn-secondary" style="padding: 4px 10px; font-size: 0.75rem;" title="Reçu PDF"><i class="fa-solid fa-file-pdf"></i> Reçu</button>
            </td>
        </tr>
    `).join('');
}

window.initierPaiementMobileMoney = function() {
    const operateur = prompt("Choisissez votre opérateur Mobile Money :\n1. Airtel Money\n2. Moov Money", "1");
    if (operateur) {
        const montant = prompt("Entrez le montant à verser (FCFA) :", "10000");
        if (montant) {
            const numero = prompt("Entrez le numéro de téléphone débiteur (ex: 074XXXXXX) :", "");
            if (numero) {
                alert(`Demande de paiement de ${montant} FCFA envoyée à votre opérateur. Veuillez valider la transaction sur votre téléphone.`);
                
                let transactions = JSON.parse(localStorage.getItem("linkedu_transactions_mobile_money")) || [];
                transactions.unshift({
                    date: new Date().toLocaleDateString('fr-FR'),
                    ref: `TXN-SIM-${Math.floor(100000 + Math.random() * 900000)}`,
                    operateur: operateur === "1" ? "Airtel Money" : "Moov Money",
                    montant: `${parseInt(montant).toLocaleString()} FCFA`,
                    statut: "Validé"
                });
                localStorage.setItem("linkedu_transactions_mobile_money", JSON.stringify(transactions));
                chargerHistoriqueFinancier();
            }
        }
    }
};

window.telechargerRecuMobileMoney = function(ref) {
    alert(`Téléchargement du reçu officiel de la transaction : ${ref}`);
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
    document.getElementById("modal-justification").classList.remove("modal-hidden");
};

window.fermerModalJustification = function() {
    document.getElementById("modal-justification").classList.add("modal-hidden");
    document.getElementById("form-justification").reset();
    document.getElementById("btn-apercu-file").style.display = "none";
    fichierJustificatifBase64Temp = null;
};

window.soumettreJustification = function(e) {
    e.preventDefault();
    const dateAbsence = document.getElementById("justif-date").value;
    const motifAbsence = document.getElementById("justif-motif").value;
    const selectEnfant = document.getElementById("select-enfant-actif");
    const nomEnfant = selectEnfant ? selectEnfant.value : "Marc Mboundou";
    const currentLang = localStorage.getItem("linkedu_lang") || "fr";

    let toutLeSuivi = JSON.parse(localStorage.getItem("suiviPresence")) || [];
    toutLeSuivi.push({
        eleve: nomEnfant,
        date: dateAbsence,
        classe: "Terminale A1",
        statut: "Absent",
        justification: motifAbsence,
        justificatifFichier: fichierJustificatifBase64Temp,
        statutJustificatif: "En attente"
    });

    localStorage.setItem("suiviPresence", JSON.stringify(toutLeSuivi));
    fermerModalJustification();
    alert(currentLang === 'fr' ? "Justificatif transmis avec succès à la Vie Scolaire." : "Justification successfully submitted to School Life.");
    chargerDonneesParent();
};
