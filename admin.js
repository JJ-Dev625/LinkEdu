
document.addEventListener("DOMContentLoaded", () => {
    // --- VÉRIFICATION DE LA SESSION ADMIN ---
    const estConnecte = localStorage.getItem('linkedu_admin_connecte');
    if (estConnecte !== 'true') {
        alert("Accès non autorisé. Veuillez vous connecter avec vos identifiants administrateur.");
        window.location.href = 'index.html';
        return;
    }

    const mainContent = document.querySelector('.content');
    const sidebar = document.getElementById('sidebar');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const burgerBtn = document.getElementById('burger-menu');

    // --- GESTION DU MENU BURGER MOBILE & NAVIGATION ---
    if (burgerBtn) {
        burgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
        });
    }

    // --- GESTION DE LA PHOTO DE PROFIL LOCALE ---
    const savedAvatar = localStorage.getItem('linkedu_admin_avatar');
    if (savedAvatar) {
        const avatarImg = document.getElementById('admin-avatar-img');
        if (avatarImg) avatarImg.src = savedAvatar;
    }

    window.chargerAvatarLocal = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const base64Image = e.target.result;
                localStorage.setItem('linkedu_admin_avatar', base64Image);
                const avatarImg = document.getElementById('admin-avatar-img');
                if (avatarImg) avatarImg.src = base64Image;
            };
            reader.readAsDataURL(file);
        }
    };

    // --- GESTION DU THÈME (DARK / LIGHT) ---
    const applyTheme = (theme) => {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
            if (themeToggleBtn) {
                themeToggleBtn.innerHTML = `<i class="fa-solid fa-sun"></i> <span>Mode Clair</span>`;
            }
        } else {
            document.body.classList.remove('light-mode');
            if (themeToggleBtn) {
                themeToggleBtn.innerHTML = `<i class="fa-solid fa-moon"></i> <span>Mode Sombre</span>`;
            }
        }
        localStorage.setItem('linkedu_admin_theme', theme);
    };

    const savedTheme = localStorage.getItem('linkedu_admin_theme') || 'dark';
    applyTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
            applyTheme(currentTheme);
        });
    }

    // --- INITIALISATION DES DONNÉES PAR DÉFAUT (TARIFS & MINISTÈRE) ---
    if (!localStorage.getItem('linkedu_tarifs')) {
        const tarifsInitiaux = [
            { classe: "6ème / 5ème", fraisInscription: "35 000 XAF", mensualite: "25 000 XAF" },
            { classe: "4ème / 3ème", fraisInscription: "40 000 XAF", mensualite: "30 000 XAF" },
            { classe: "Seconde / Première", fraisInscription: "50 000 XAF", mensualite: "35 000 XAF" },
            { classe: "Terminale", fraisInscription: "60 000 XAF", mensualite: "40 000 XAF" }
        ];
        localStorage.setItem('linkedu_tarifs', JSON.stringify(tarifsInitiaux));
    }

    if (!localStorage.getItem('linkedu_ministere')) {
        const veilleInitiale = [
            { id: 1, titre: "Calendrier des Examens Nationaux (Session 2026)", type: "Circulaire Officielle", date: "15/04/2026", source: "Ministère de l'Éducation Nationale" },
            { id: 2, titre: "Arrêté portant réaménagement des programmes du second cycle", type: "Programme Pédagogique", date: "02/03/2026", source: "Direction Générale des Enseignements" }
        ];
        localStorage.setItem('linkedu_ministere', JSON.stringify(veilleInitiale));
    }

    // --- MOTEUR DE VUES DU BACK-OFFICE ---
    const render = (view) => {
        const cands = JSON.parse(localStorage.getItem('candidatures')) || [];
        const ens = JSON.parse(localStorage.getItem('enseignants')) || [];
        const annonces = JSON.parse(localStorage.getItem('annonces')) || [];
        const tarifs = JSON.parse(localStorage.getItem('linkedu_tarifs')) || [];
        const ministereDocs = JSON.parse(localStorage.getItem('linkedu_ministere')) || [];
        
        mainContent.innerHTML = "";

        document.querySelectorAll('.nav-links li').forEach(li => {
            if (li.dataset.target === view) li.classList.add('active');
            else li.classList.remove('active');
        });

        if (view === 'dashboard') {
            mainContent.innerHTML = `
                <div class="glass-card">
                    <h3>Tableau de bord Back-Office LinkEdu</h3>
                    <div class="stats-grid">
                        <div class="stat-box"><h4>${cands.length}</h4><p>Total Candidatures</p></div>
                        <div class="stat-box"><h4>${cands.filter(c => c.statut === 'Validé').length}</h4><p>Inscrits Validés</p></div>
                        <div class="stat-box"><h4>${cands.filter(c => c.statut === 'En attente de validation' || !c.statut).length}</h4><p>En attente</p></div>
                        <div class="stat-box"><h4>${cands.filter(c => c.statut === 'Refusé').length}</h4><p>Dossiers Refusés</p></div>
                    </div>
                    <div class="stats-grid" style="margin-top:15px;">
                        <div class="stat-box"><h4>${ens.length}</h4><p>Enseignants Actifs (ID Fixe)</p></div>
                        <div class="stat-box"><h4>${ministereDocs.length}</h4><p>Directives Ministérielles</p></div>
                    </div>
                </div>`;
        } else if (['traitement', 'valides'].includes(view)) {
            const list = view === 'traitement' ? cands.filter(c => c.statut === 'En attente de validation' || !c.statut) : cands.filter(c => c.statut === 'Validé');
            let titleText = view === 'traitement' ? 'Candidatures en attente de validation' : 'Élèves Inscrits & Comptes Générés';

            mainContent.innerHTML = `
                <div class="glass-card">
                    <h3>${titleText}</h3>
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr><th>Élève</th><th>Classe</th><th>Paiement / Frais</th><th>Dossier & Identifiants</th><th>Actions Back-Office</th></tr>
                            </thead>
                            <tbody>
                                ${list.length > 0 ? list.map(c => {
                                    const nomComplet = c.nom || c.fullName || c.studentName || c.nomEnfant || 'Nom non renseigné';
                                    const prenomComplet = c.prenom || c.prénom || '';
                                    return `
                                    <tr>
                                        <td><strong>${nomComplet}</strong> ${prenomComplet}</td>
                                        <td>${c.classeDemandee || c.niveau || 'N/A'}</td>
                                        <td><span style="color: ${c.paye ? 'var(--success)' : 'var(--danger)'};">${c.paye ? 'Payé (' + (c.modePaiement || c.operateur || 'Mobile Money') + ')' : 'Non payé'}</span></td>
                                        <td>
                                            <button class="btn-action btn-primary" onclick="voirDocuments('${c.id}')"><i class="fa-solid fa-eye"></i> Voir infos</button>
                                            ${c.statut === 'Validé' && c.facture ? `<button class="btn-action" style="background:#8b5cf6; color:white; margin-top:4px;" onclick="telechargerFacturePDF('${c.identifiantEleve}')"><i class="fa-solid fa-file-invoice"></i> Facture</button>` : ''}
                                        </td>
                                        <td>
                                            ${view === 'traitement' ? `
                                                <button class="btn-action btn-valider" onclick="majStatut('${c.id}', 'Validé')"><i class="fa-solid fa-check"></i> Valider & Créer ID</button> 
                                                <button class="btn-action btn-refuser" onclick="refuserDossier('${c.id}')"><i class="fa-solid fa-xmark"></i> Refuser</button>
                                            ` : `<span style="color:var(--success); font-family:monospace;">ID: ${c.identifiantEleve || 'N/A'}</span>`}
                                        </td>
                                    </tr>`;
                                }).join('') : '<tr><td colspan="5" style="text-align:center; color: var(--text-muted);">Aucun dossier trouvé dans cette section.</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>`;
        } else if (view === 'refuses') {
            const refusesList = cands.filter(c => c.statut === 'Refusé');
            mainContent.innerHTML = `
                <div class="glass-card">
                    <h3>Dossiers Refusés & Suivi des Remboursements</h3>
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr><th>Élève</th><th>Classe</th><th>Motif du Refus</th><th>Statut Remboursement</th><th>Action</th></tr>
                            </thead>
                            <tbody>
                                ${refusesList.length > 0 ? refusesList.map(c => `
                                    <tr>
                                        <td><strong>${c.nom || c.fullName || ''}</strong></td>
                                        <td>${c.classeDemandee || c.niveau || 'N/A'}</td>
                                        <td><span style="color:var(--danger);">${c.motifRefus || 'Non spécifié'}</span></td>
                                        <td><span style="color:${c.rembourse ? 'var(--success)' : 'var(--warning)'};">${c.rembourse ? 'Remboursé (' + c.modeRemboursement + ')' : 'En attente de remboursement'}</span></td>
                                        <td>
                                            ${!c.rembourse ? `<button class="btn-action btn-valider" onclick="traiterRemboursement('${c.id}')"><i class="fa-solid fa-rotate-left"></i> Valider Remboursement</button>` : '<span style="color:var(--success);">Clôturé</span>'}
                                        </td>
                                    </tr>`).join('') : '<tr><td colspan="5" style="text-align:center; color: var(--text-muted);">Aucun dossier refusé.</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>`;
        } else if (view === 'tarifs') {
            mainContent.innerHTML = `
                <div class="glass-card">
                    <h3>Configuration des Frais de Scolarité (Barème LinkEdu)</h3>
                    <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:15px;">Ces montants alimentent dynamiquement le formulaire d'inscription des futurs apprenants et l'espace financier des parents.</p>
                    <button class="btn-action btn-primary" style="margin-bottom:12px;" onclick="modifierTarifs()"><i class="fa-solid fa-pen-to-square"></i> Mettre à jour les tarifs</button>
                    <div class="table-responsive">
                        <table>
                            <thead><tr><th>Niveau / Classe</th><th>Frais d'Inscription</th><th>Mensualité</th></tr></thead>
                            <tbody>
                                ${tarifs.map(t => `
                                    <tr>
                                        <td><strong>${t.classe}</strong></td>
                                        <td><span style="color:var(--primary); font-weight:bold;">${t.fraisInscription}</span></td>
                                        <td>${t.mensualite}</td>
                                    </tr>`).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>`;
        } else if (view === 'classes') {
            const elevesValides = cands.filter(c => c.statut === 'Validé');
            const classesSet = new Set();
            elevesValides.forEach(e => { if (e.classeDemandee) classesSet.add(e.classeDemandee); });
            ens.forEach(en => { if (en.classes) en.classes.forEach(c => classesSet.add(c)); });
            const listClasses = Array.from(classesSet);

            mainContent.innerHTML = `
                <div class="glass-card">
                    <h3>Gestion des Classes & Effectifs</h3>
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr><th>Classe</th><th>Effectif Inscrit</th><th>Action</th></tr>
                            </thead>
                            <tbody>
                                ${listClasses.length > 0 ? listClasses.map(classe => {
                                    const effectif = elevesValides.filter(e => e.classeDemandee === classe).length;
                                    return `
                                        <tr>
                                            <td><strong>${classe}</strong></td>
                                            <td><span style="color: var(--primary); font-weight:bold;">${effectif} élève(s)</span></td>
                                            <td><button class="btn-action btn-primary" onclick="voirElevesClasse('${classe}')"><i class="fa-solid fa-users"></i> Voir la liste</button></td>
                                        </tr>`;
                                }).join('') : '<tr><td colspan="3" style="text-align:center; color: var(--text-muted);">Aucune classe configurée ou aucun élève validé.</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>`;
        } else if (view === 'enseignants') {
            mainContent.innerHTML = `
                <div class="glass-card">
                    <h3>Gestion des Enseignants (Attribution ID Fixe & Classes)</h3>
                    <button class="btn-action btn-primary" style="margin-bottom:12px;" onclick="gererEnseignant()"><i class="fa-solid fa-plus"></i> Ajouter un enseignant</button>
                    <div class="table-responsive">
                        <table>
                            <thead><tr><th>Identifiant Fixe / Nom</th><th>Matière</th><th>Classes assignées</th><th>Planning</th><th>Action</th></tr></thead>
                            <tbody>
                                ${ens.length > 0 ? ens.map(e => `
                                    <tr>
                                        <td>
                                            <strong>${e.nom}</strong><br>
                                            <small style="color:var(--primary); font-family:monospace;">ID: ${e.identifiant}</small>
                                        </td>
                                        <td>${e.matiere}</td>
                                        <td>${Array.isArray(e.classes) ? e.classes.join(', ') : e.classes || 'Aucune'}</td>
                                        <td>${e.planning}</td>
                                        <td><button class="btn-action btn-refuser" onclick="supprimerEnseignant('${e.id}')"><i class="fa-solid fa-trash"></i></button></td>
                                    </tr>`).join('') : '<tr><td colspan="5" style="text-align:center; color: var(--text-muted);">Aucun enseignant enregistré.</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>`;
        } else if (view === 'ministere') {
            mainContent.innerHTML = `
                <div class="glass-card">
                    <h3>Veille Automatique & Directives Ministérielles</h3>
                    <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:15px;">Flux officiel alimentant automatiquement les chefs d'établissement et enseignants connectés sur LinkEdu.</p>
                    <button class="btn-action btn-primary" style="margin-bottom:12px;" onclick="ajouterDirectiveMinisterielle()"><i class="fa-solid fa-cloud-arrow-down"></i> Importer une directive / PDF</button>
                    <div class="table-responsive">
                        <table>
                            <thead><tr><th>Titre du Document</th><th>Type</th><th>Source</th><th>Date</th><th>Action</th></tr></thead>
                            <tbody>
                                ${ministereDocs.map(d => `
                                    <tr>
                                        <td><strong>${d.titre}</strong></td>
                                        <td><span class="btn-action" style="background:#10b881; color:white;">${d.type}</span></td>
                                        <td>${d.source}</td>
                                        <td>${d.date}</td>
                                        <td><button class="btn-action btn-primary" onclick="alerterDiffuseMinistere('${d.titre}')"><i class="fa-solid fa-paper-plane"></i> Diffuser</button></td>
                                    </tr>`).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>`;
        } else if (view === 'annonces') {
            mainContent.innerHTML = `
                <div class="glass-card">
                    <h3>Gestion des Annonces & Communications Globales</h3>
                    <button class="btn-action btn-primary" style="margin-bottom:12px;" onclick="creerAnnonce()"><i class="fa-solid fa-bullhorn"></i> Diffuser une annonce</button>
                    <div class="table-responsive">
                        <table>
                            <thead><tr><th>Cible</th><th>Message</th><th>Date</th><th>Action</th></tr></thead>
                            <tbody>
                                ${annonces.length > 0 ? annonces.map(a => `
                                    <tr>
                                        <td><span class="btn-action" style="background:var(--primary); color:white;">${a.cible}</span></td>
                                        <td><strong>${a.titre}</strong><br><small style="color:var(--text-muted);">${a.message}</small></td>
                                        <td>${a.date}</td>
                                        <td><button class="btn-action btn-refuser" onclick="supprimerAnnonce('${a.id}')"><i class="fa-solid fa-trash"></i></button></td>
                                    </tr>`).join('') : '<tr><td colspan="4" style="text-align:center; color: var(--text-muted);">Aucune annonce publiée.</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>`;
        }
        mainContent.insertAdjacentHTML('beforeend', `
            <footer class="admin-footer" style="margin-top: 30px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
                <p>LinkEdu Back-Office Admin &copy; 2026 | v2.0.0</p>
                <p>Porteur : Jean Junior DIRAMBA MAMBOUNDOU — Bikélé, Gabon</p>
            </footer>`);
    };

    // --- LOGIQUE MÉTIER : VALIDATION, ID FIXE & FACTURE ---
    window.majStatut = (id, status) => {
        let list = JSON.parse(localStorage.getItem('candidatures')) || [];
        const idx = list.findIndex(c => String(c.id) === String(id));
        if (idx !== -1) {
            list[idx].statut = status;
            
            if (status === 'Validé') {
                if (!list[idx].identifiantEleve) {
                    const randomNum = Math.floor(1000 + Math.random() * 9000);
                    list[idx].identifiantEleve = `LE-${new Date().getFullYear()}-${randomNum}`;
                }
                
                list[idx].facture = {
                    numero: `FAC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
                    date: new Date().toLocaleDateString('fr-FR'),
                    montant: "50 000 XAF",
                    motif: "Frais d'inscription et de scolarité - LinkEdu",
                    modePaiement: list[idx].modePaiement || list[idx].operateur || "Mobile Money"
                };
            }

            localStorage.setItem('candidatures', JSON.stringify(list));

            if (status === 'Validé') {
                alert(`Dossier validé avec succès !\nIdentifiant élève généré : ${list[idx].identifiantEleve}\nSMS/WhatsApp & Facture PDF prêts.`);
            }
            render('traitement');
        }
    };

    window.refuserDossier = (id) => {
        const motif = prompt("Indiquez le motif précis du refus :");
        if (motif) {
            let list = JSON.parse(localStorage.getItem('candidatures')) || [];
            const idx = list.findIndex(c => String(c.id) === String(id));
            if (idx !== -1) {
                list[idx].statut = 'Refusé';
                list[idx].motifRefus = motif;
                list[idx].rembourse = false;
                localStorage.setItem('candidatures', JSON.stringify(list));
                alert("Dossier refusé. Procédez au remboursement depuis l'onglet 'Dossiers & Remboursements'.");
                render('traitement');
            }
        }
    };

    window.traiterRemboursement = (id) => {
        const mode = prompt("Mode de remboursement choisi (Ex: Airtel Money, Moov Money, ou Guichet Physique) :");
        if (mode) {
            let list = JSON.parse(localStorage.getItem('candidatures')) || [];
            const idx = list.findIndex(c => String(c.id) === String(id));
            if (idx !== -1) {
                list[idx].rembourse = true;
                list[idx].modeRemboursement = mode;
                localStorage.setItem('candidatures', JSON.stringify(list));
                alert(`Remboursement de 50 000 XAF effectué avec succès via ${mode}.`);
                render('refuses');
            }
        }
    };

    // --- TÉLÉCHARGEMENT DE LA FACTURE PDF ---
    window.telechargerFacturePDF = (identifiantEleve) => {
        const cands = JSON.parse(localStorage.getItem('candidatures')) || [];
        const c = cands.find(x => x.identifiantEleve === identifiantEleve);
        if (!c || !c.facture) return;

        const fenetreFacture = window.open('', '_blank');
        fenetreFacture.document.write(`
            <!DOCTYPE html>
            <html lang="fr">
            <head>
                <meta charset="UTF-8">
                <title>Facture_${c.identifiantEleve}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
                    .header { text-align: center; border-bottom: 2px solid #10b881; padding-bottom: 20px; margin-bottom: 30px; }
                    .header h1 { color: #1f3962; margin: 0; }
                    .details { margin-bottom: 30px; }
                    .details table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    .details th, .details td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                    .details th { background-color: #f8fafc; }
                    .footer { text-align: center; margin-top: 50px; font-size: 0.85rem; color: #666; border-top: 1px solid #ddd; padding-top: 20px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>LinkEdu — Établissement Scolaire</h1>
                    <p>Back-Office Administratif Officiel</p>
                </div>
                <h2>FACTURE DE SCOLARITÉ & ADMISSION</h2>
                <div class="details">
                    <p><strong>Élève :</strong> ${c.nom || c.fullName || ''} ${c.prenom || ''}</p>
                    <p><strong>Identifiant Unique :</strong> ${c.identifiantEleve}</p>
                    <p><strong>Classe :</strong> ${c.classeDemandee || c.niveau}</p>
                    <p><strong>N° Facture :</strong> ${c.facture.numero}</p>
                    <p><strong>Date :</strong> ${c.facture.date}</p>
                    
                    <table>
                        <tr><th>Description</th><th>Mode de paiement</th><th>Montant</th></tr>
                        <tr><td>${c.facture.motif}</td><td>${c.facture.modePaiement}</td><td><strong>${c.facture.montant}</strong></td></tr>
                    </table>
                </div>
                <p style="text-align: right; margin-top: 30px;"><strong>Cachet et Signature de l'Administration</strong></p>
                <div class="footer">
                    <p>LinkEdu &copy; 2026 — Porteur : Jean Junior DIRAMBA MAMBOUNDOU — Bikélé, Gabon</p>
                </div>
                <script>window.onload = function() { window.print(); }</script>
            </body>
            </html>
        `);
        fenetreFacture.document.close();
    };

    // --- CONSULTATION & MODALES ---
    window.voirDocuments = (id) => {
        const cands = JSON.parse(localStorage.getItem('candidatures')) || [];
        const c = cands.find(x => String(x.id) === String(id));
        if (!c) return;

        document.getElementById("modal-content").innerHTML = `
            <h3>Détails complets du dossier</h3>
            <div class="dossier-details-grid" style="text-align:left; font-size:0.9rem; line-height:1.6;">
                <p><span>Nom & Prénom :</span> ${c.nom || c.fullName || 'Non renseigné'} ${c.prenom || ''}</p>
                <p><span>Classe demandée :</span> ${c.classeDemandee || c.niveau || 'N/A'}</p>
                <p><span>École d'origine :</span> ${c.ecoleOrigine || 'Non renseigné'}</p>
                <p><span>Contact :</span> ${c.email || c.telephone || 'Non renseigné'}</p>
                <p><span>Paiement :</span> ${c.paye ? 'Effectué (' + (c.modePaiement || c.operateur) + ')' : 'En attente'}</p>
                <p><span>Statut :</span> ${c.statut || 'En attente de validation'}</p>
                ${c.identifiantEleve ? `<p><span>ID Élève :</span> <strong style="color:var(--success);">${c.identifiantEleve}</strong></p>` : ''}
            </div>
            <button class="btn-action btn-primary" style="width:100%; justify-content:center; padding:10px; margin-top:15px;" onclick="fermerModale()">Fermer</button>
        `;
        document.getElementById("modal-visualisation").classList.remove("modal-hidden");
    };

    window.voirElevesClasse = (classeNom) => {
        const cands = JSON.parse(localStorage.getItem('candidatures')) || [];
        const elevesClasse = cands.filter(c => c.statut === 'Validé' && c.classeDemandee === classeNom);

        document.getElementById("modal-content").innerHTML = `
            <h3>Élèves de la classe : ${classeNom}</h3>
            <div style="max-height: 300px; overflow-y: auto; margin-top: 15px;">
                ${elevesClasse.length > 0 ? `
                    <table style="width:100%; font-size:0.9rem;">
                        <thead><tr><th>Nom & Prénom</th><th>ID Élève</th></tr></thead>
                        <tbody>
                            ${elevesClasse.map(e => `
                                <tr>
                                    <td>${e.nom || e.fullName || ''} ${e.prenom || ''}</td>
                                    <td><strong style="color:var(--success);">${e.identifiantEleve || 'N/A'}</strong></td>
                                </tr>`).join('')}
                        </tbody>
                    </table>
                ` : '<p style="text-align:center; color: var(--text-muted);">Aucun élève validé dans cette classe.</p>'}
            </div>
            <button class="btn-action btn-primary" style="width:100%; justify-content:center; padding:10px; margin-top:15px;" onclick="fermerModale()">Fermer</button>
        `;
        document.getElementById("modal-visualisation").classList.remove("modal-hidden");
    };

    window.fermerModale = () => {
        document.getElementById("modal-visualisation").classList.add("modal-hidden");
    };

    // --- GESTION ENSEIGNANTS, TARIFS & MINISTÈRE ---
    window.gererEnseignant = () => {
        const nom = prompt("Nom complet de l'enseignant (ex: M. Jean MABIKA) :");
        if (!nom) return;
        const matiere = prompt("Matière enseignée (ex: Mathématiques) :");
        if (!matiere) return;
        const classesInput = prompt("Classes assignées séparées par des virgules (ex: Terminale A1, Terminale A2) :");
        const classes = classesInput ? classesInput.split(',').map(c => c.trim()).filter(c => c !== "") : [];
        const planning = prompt("Planning (Ex: Lundi 08h-10h, Mercredi 10h-12h) :");
        
        let ens = JSON.parse(localStorage.getItem('enseignants')) || [];
        const identifiantProf = `PROF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

        ens.push({ id: Date.now(), identifiant: identifiantProf, nom, matiere, classes, planning: planning || "Non défini" });
        localStorage.setItem('enseignants', JSON.stringify(ens));
        alert(`Enseignant enregistré !\nID de connexion fixe : ${identifiantProf}`);
        render('enseignants');
    };

    window.supprimerEnseignant = (id) => {
        if (confirm("Retirer cet enseignant de la plateforme ?")) {
            let ens = JSON.parse(localStorage.getItem('enseignants')).filter(e => String(e.id) !== String(id));
            localStorage.setItem('enseignants', JSON.stringify(ens));
            render('enseignants');
        }
    };

    window.modifierTarifs = () => {
        const nouveauMontant = prompt("Entrez le nouveau montant des frais d'inscription pour la classe de Terminale :");
        if (nouveauMontant) {
            let tarifs = JSON.parse(localStorage.getItem('linkedu_tarifs')) || [];
            if (tarifs.length > 3) {
                tarifs[3].fraisInscription = nouveauMontant + " XAF";
                localStorage.setItem('linkedu_tarifs', JSON.stringify(tarifs));
                alert("Barème tarifaire mis à jour avec succès !");
                render('tarifs');
            }
        }
    };

    window.ajouterDirectiveMinisterielle = () => {
        const titre = prompt("Titre de la directive ou du programme officiel :");
        const type = prompt("Type de document (ex: Circulaire, Arrêté, Programme) :");
        if (titre && type) {
            let docs = JSON.parse(localStorage.getItem('linkedu_ministere')) || [];
            docs.unshift({ id: Date.now(), titre, type, date: new Date().toLocaleDateString('fr-FR'), source: "Ministère de l'Éducation Nationale" });
            localStorage.setItem('linkedu_ministere', JSON.stringify(docs));
            alert("Directive ministérielle synchronisée et diffusée !");
            render('ministere');
        }
    };

    window.alerterDiffuseMinistere = (titre) => {
        alert(`La directive "${titre}" a été diffusée avec succès auprès de tous les chefs d'établissement et enseignants.`);
    };

    window.creerAnnonce = () => {
        const cible = prompt("Cible de l'annonce (Ex: Tous, Parents, Enseignants) :");
        const titre = prompt("Titre de l'annonce :");
        const message = prompt("Contenu du message :");
        
        if (cible && titre && message) {
            let annonces = JSON.parse(localStorage.getItem('annonces')) || [];
            annonces.unshift({ id: Date.now(), cible, titre, message, date: new Date().toLocaleDateString('fr-FR') });
            localStorage.setItem('annonces', JSON.stringify(annonces));
            render('annonces');
        }
    };

    window.supprimerAnnonce = (id) => {
        if (confirm("Supprimer cette annonce ?")) {
            let annonces = JSON.parse(localStorage.getItem('annonces')).filter(a => String(a.id) !== String(id));
            localStorage.setItem('annonces', JSON.stringify(annonces));
            render('annonces');
        }
    };

    // --- ÉCOUTEUR GLOBAL DES CLICS ---
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && burgerBtn && !burgerBtn.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }

        const target = e.target.closest('li[data-target]');
        if (target) {
            render(target.dataset.target);
            if (window.innerWidth <= 768) { sidebar.classList.remove('active'); }
        }

        if (e.target.closest('.btn-logout')) {
            localStorage.removeItem('linkedu_admin_connecte');
            window.location.href = 'index.html';
        }
    });

    render('dashboard');
});

