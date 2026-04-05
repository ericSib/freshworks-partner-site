# Cadrage Product Owner — Site Vitrine Conseil Freshworks

> **Date** : 2026-04-05
> **Product Owner** : Claude Code (assist)
> **Stakeholder** : Consultant Freshworks

---

## Product Goal

```
Générer des leads qualifiés (demandes de devis et prises de RDV)
auprès des DSI et responsables IT/support de PME-ETI, en publiant
un site vitrine professionnel présentant l'expertise conseil
Freshservice/Freshdesk, d'ici 2 semaines.
```

### KPIs cibles

| KPI | Cible | Mesure |
|-----|-------|--------|
| Taux de conversion visiteur → lead | > 3% | Google Analytics / Vercel Analytics |
| Prises de RDV Calendly | > 5/mois | Dashboard Calendly |
| Demandes de devis (formulaire) | > 10/mois | CRM (HubSpot) |
| Lighthouse Performance Score | > 90 | Lighthouse CI |
| Temps de chargement (LCP) | < 2s | Web Vitals |

### Stack technique

| Composant | Choix | Justification |
|-----------|-------|---------------|
| Framework | Next.js 15 (App Router) | SSR/SSG, excellent SEO, écosystème riche |
| Styling | Tailwind CSS 4 | Utility-first, rapide à prototyper, responsive natif |
| Déploiement | Vercel | Intégration native Next.js, CDN global, analytics |
| Formulaire | React Hook Form + action serveur | Validation côté client + serveur |
| RDV | Calendly (embed) | Widget intégré, zéro backend à gérer |
| CRM | HubSpot (API gratuite) | Envoi automatique des leads formulaire |
| Chat | Freshchat widget | Cohérence avec l'écosystème Freshworks conseillé |
| Analytics | Vercel Analytics + GA4 | Performance + comportement utilisateur |

### Contraintes

- **Deadline** : 2 semaines (2 sprints d'1 semaine)
- **Contenu** : tout à créer (textes, visuels, cas clients fictifs/anonymisés)
- **Budget** : gratuit (Vercel free tier, HubSpot free, Calendly free)
- **SEO** : optimisation on-page indispensable (cible B2B niche)

---

## Personas

### Sophie — DSI d'ETI

| Attribut | Détail |
|----------|--------|
| Entreprise | ETI, 500 personnes, secteur services |
| Contexte | Freshservice déployé depuis 2 ans, sous-utilisé |
| Besoin | Optimiser la configuration, former les équipes |
| Frustration | "On paie cher pour un outil qu'on utilise à 30%" |
| Déclencheur | Audit interne révélant un ROI insuffisant |
| Canal d'arrivée | Recherche Google "consultant Freshservice optimisation" |

### Marc — Responsable Support Client

| Attribut | Détail |
|----------|--------|
| Entreprise | PME, 80 personnes, e-commerce |
| Contexte | Freshdesk basique, pas de workflows automatisés |
| Besoin | Configurer les automatisations, SLA, portail client |
| Frustration | "Je n'ai pas l'expertise en interne pour aller plus loin" |
| Déclencheur | Croissance des tickets, besoin de scaler |
| Canal d'arrivée | LinkedIn / recommandation |

### Karim — Responsable IT

| Attribut | Détail |
|----------|--------|
| Entreprise | PME, 200 personnes, industrie |
| Contexte | Migration ITSM en cours, hésite entre outils |
| Besoin | Accompagnement au déploiement Freshservice |
| Frustration | "Les process sont encore manuels, on perd du temps" |
| Déclencheur | Décision de digitaliser l'IT service management |
| Canal d'arrivée | Recherche Google "déploiement Freshservice consultant" |

---

## Story Map

```
BACKBONE (parcours visiteur chronologique) :

  Arriver        Comprendre       Évaluer          Décider          Contacter
  sur le site    l'offre          la crédibilité   de s'engager     le consultant
     │              │                 │                │                │
     ▼              ▼                 ▼                ▼                ▼
┌─────────┐  ┌────────────┐   ┌─────────────┐  ┌────────────┐  ┌────────────┐
│  Hero   │  │  Services  │   │ Cas clients │  │   CTA      │  │ Formulaire │
│  banner │  │  détaillés │   │ Témoignages │  │  clairs    │  │  contact   │
│  Nav    │  │            │   │             │  │            │  │ Calendly   │
└─────────┘  └────────────┘   └─────────────┘  └────────────┘  └────────────┘
                                                                │  Chat      │
                                                                │  CRM sync  │
                                                                └────────────┘

─── Release 1 (MVP - Sprint 1) ─── Walking Skeleton ───────────────────────
  Hero + Nav      3 services       2 cas clients     CTA hero      Formulaire
  SEO de base     page unique      section page      + footer      + Calendly

─── Release 2 (Sprint 2) ─── Enrichissement ───────────────────────────────
  Animations      Pages dédiées    Témoignages       Blog/         Chat
  Mobile perf     par service      chiffrés          Ressources    CRM sync
                                                                   Analytics
```

---

## Epics et User Stories

---

### EPIC 1 : Navigation et structure du site

> Permettre au visiteur de naviguer facilement sur le site et trouver l'information recherchée.

#### US-1.1 : Header avec navigation

```
En tant que visiteur arrivant sur le site,
je veux voir un header clair avec le logo et un menu de navigation,
afin de comprendre immédiatement la structure du site et accéder aux sections.
```

**Critères d'acceptation :**

```gherkin
Scénario : Navigation desktop
  Étant donné un visiteur sur n'importe quelle page en résolution desktop (≥1024px)
  Quand la page se charge
  Alors le header affiche le logo à gauche et les liens de navigation
    (Accueil, Services, Cas clients, Contact) à droite
  Et un bouton CTA "Prendre RDV" est visible en surbrillance

Scénario : Navigation mobile
  Étant donné un visiteur sur mobile (<1024px)
  Quand il appuie sur l'icône hamburger
  Alors un menu mobile s'ouvre avec tous les liens de navigation
  Et le bouton "Prendre RDV" est visible en premier

Scénario : Scroll sticky
  Étant donné un visiteur qui scrolle vers le bas
  Quand il dépasse 100px de scroll
  Alors le header reste fixe en haut de page avec un fond opaque
```

**Story Points : 3** | **MoSCoW : Must**

---

#### US-1.2 : Footer avec informations de contact

```
En tant que visiteur en bas de page,
je veux voir un footer avec les coordonnées et liens utiles,
afin de pouvoir contacter le consultant ou naviguer rapidement.
```

**Critères d'acceptation :**

```gherkin
Scénario : Contenu du footer
  Étant donné un visiteur qui scrolle en bas de n'importe quelle page
  Quand le footer est visible
  Alors il affiche : email de contact, liens réseaux sociaux (LinkedIn),
    liens de navigation, et mentions légales

Scénario : Lien email
  Étant donné un visiteur qui clique sur l'email dans le footer
  Quand le clic est effectué
  Alors le client email par défaut s'ouvre avec l'adresse pré-remplie
```

**Story Points : 2** | **MoSCoW : Must**

---

#### US-1.3 : Page mentions légales

```
En tant que visiteur soucieux de conformité,
je veux accéder aux mentions légales du site,
afin de vérifier l'identité du prestataire et la conformité RGPD.
```

**Critères d'acceptation :**

```gherkin
Scénario : Accès mentions légales
  Étant donné un visiteur sur le site
  Quand il clique sur "Mentions légales" dans le footer
  Alors une page s'affiche avec : raison sociale, adresse, SIRET,
    hébergeur, politique de cookies, contact DPO
```

**Story Points : 1** | **MoSCoW : Should**

---

### EPIC 2 : Page d'accueil — Proposition de valeur

> Capter l'attention du visiteur en moins de 5 secondes et l'orienter vers l'action.

#### US-2.1 : Hero section avec proposition de valeur

```
En tant que visiteur arrivant sur la page d'accueil,
je veux comprendre en 5 secondes ce que propose le consultant,
afin de décider si son offre correspond à mon besoin.
```

**Critères d'acceptation :**

```gherkin
Scénario : Compréhension immédiate
  Étant donné un visiteur qui charge la page d'accueil
  Quand le hero section s'affiche (au-dessus de la ligne de flottaison)
  Alors il voit : un titre principal clair mentionnant Freshservice/Freshdesk,
    un sous-titre expliquant la valeur (optimisation, ROI),
    et deux CTA ("Prendre RDV" + "Découvrir nos services")

Scénario : CTA principal
  Étant donné un visiteur qui clique sur "Prendre RDV"
  Quand le clic est effectué
  Alors il est scrollé/redirigé vers la section de prise de rendez-vous Calendly

Scénario : CTA secondaire
  Étant donné un visiteur qui clique sur "Découvrir nos services"
  Quand le clic est effectué
  Alors la page scrolle vers la section Services

Scénario : Responsive
  Étant donné un visiteur sur mobile
  Quand le hero s'affiche
  Alors les CTA sont empilés verticalement et restent facilement cliquables (min 44px)
```

**Story Points : 3** | **MoSCoW : Must**

---

#### US-2.2 : Section chiffres clés / preuves sociales

```
En tant que visiteur qui découvre le site,
je veux voir des chiffres concrets sur l'expertise du consultant,
afin d'évaluer rapidement sa crédibilité.
```

**Critères d'acceptation :**

```gherkin
Scénario : Affichage des chiffres
  Étant donné un visiteur qui scrolle sous le hero
  Quand la section chiffres clés apparaît
  Alors il voit 3 à 4 indicateurs clés (ex: "X projets livrés",
    "X% de satisfaction", "X entreprises accompagnées", "X années d'expérience")
  Et chaque chiffre est accompagné d'un label explicite

Scénario : Animation
  Étant donné un visiteur qui scrolle jusqu'à la section chiffres
  Quand la section entre dans le viewport
  Alors les chiffres s'animent avec un compteur progressif
```

**Story Points : 2** | **MoSCoW : Should**

---

#### US-2.3 : Section aperçu des services (homepage)

```
En tant que visiteur sur la page d'accueil,
je veux voir un résumé des principaux services proposés,
afin de comprendre l'étendue de l'offre sans quitter la homepage.
```

**Critères d'acceptation :**

```gherkin
Scénario : Affichage des services
  Étant donné un visiteur qui scrolle sur la page d'accueil
  Quand la section services apparaît
  Alors il voit 3 cartes service (Freshservice, Freshdesk, Audit/Optimisation)
  Et chaque carte a : une icône, un titre, une description courte (2 lignes max),
    et un lien "En savoir plus"

Scénario : Lien vers détail
  Étant donné un visiteur qui clique sur "En savoir plus" d'un service
  Quand le clic est effectué
  Alors il est redirigé vers la section ou page dédiée au service
```

**Story Points : 3** | **MoSCoW : Must**

---

### EPIC 3 : Présentation des services

> Détailler l'offre de conseil pour que le visiteur identifie la prestation qui lui correspond.

#### US-3.1 : Section services détaillés

```
En tant que DSI ou responsable IT,
je veux voir le détail de chaque service proposé (périmètre, livrables, approche),
afin de comprendre comment le consultant peut m'aider concrètement.
```

**Critères d'acceptation :**

```gherkin
Scénario : Détail service Freshservice
  Étant donné un visiteur qui consulte la section Freshservice
  Quand la section se charge
  Alors il voit : la description de l'offre, les cas d'usage types
    (déploiement, optimisation, formation), la méthodologie,
    et un CTA "Demander un audit"

Scénario : Détail service Freshdesk
  Étant donné un visiteur qui consulte la section Freshdesk
  Quand la section se charge
  Alors il voit : la description de l'offre, les cas d'usage types
    (configuration, automatisations, portail client), la méthodologie,
    et un CTA "Demander un audit"

Scénario : Détail service Audit
  Étant donné un visiteur qui consulte la section Audit/Optimisation
  Quand la section se charge
  Alors il voit : le déroulé de l'audit (diagnostic, recommandations,
    plan d'action), les livrables, le ROI attendu, et un CTA "Prendre RDV"
```

**Story Points : 5** | **MoSCoW : Must**

---

### EPIC 4 : Cas clients et témoignages

> Prouver la crédibilité du consultant par des résultats concrets.

#### US-4.1 : Section cas clients

```
En tant que décideur évaluant le consultant,
je veux voir des exemples concrets de missions réalisées,
afin d'évaluer si le consultant a traité des problématiques similaires à la mienne.
```

**Critères d'acceptation :**

```gherkin
Scénario : Affichage cas clients
  Étant donné un visiteur qui accède à la section cas clients
  Quand la section se charge
  Alors il voit au minimum 2 cas clients, chacun présentant :
    le contexte (secteur, taille, outil), le défi, la solution apportée,
    et les résultats chiffrés

Scénario : Carte cas client
  Étant donné un visiteur qui voit la liste des cas clients
  Quand il consulte une carte
  Alors il voit : un titre accrocheur, le logo ou secteur du client,
    un résumé en 2-3 lignes, et les résultats clés en gras
```

**Story Points : 3** | **MoSCoW : Must**

---

#### US-4.2 : Témoignages clients

```
En tant que visiteur hésitant,
je veux lire des témoignages de clients satisfaits,
afin d'être rassuré sur la qualité de l'accompagnement.
```

**Critères d'acceptation :**

```gherkin
Scénario : Affichage témoignages
  Étant donné un visiteur qui scrolle dans la section cas clients
  Quand la sous-section témoignages apparaît
  Alors il voit 2 à 3 citations de clients avec : le texte du témoignage,
    le nom, le poste, et l'entreprise (ou secteur si anonymisé)

Scénario : Crédibilité
  Étant donné un visiteur qui lit un témoignage
  Quand il le consulte
  Alors chaque témoignage est présenté avec des guillemets visuels
    et un avatar/initiales pour renforcer l'authenticité
```

**Story Points : 2** | **MoSCoW : Should**

---

### EPIC 5 : Prise de contact et conversion

> Convertir le visiteur intéressé en lead qualifié.

#### US-5.1 : Formulaire de contact

```
En tant que visiteur convaincu par l'offre,
je veux remplir un formulaire de contact simple,
afin de demander un devis ou poser une question au consultant.
```

**Critères d'acceptation :**

```gherkin
Scénario : Formulaire valide
  Étant donné un visiteur sur la page/section contact
  Quand il remplit les champs (nom, email, entreprise, message) et soumet
  Alors un message de confirmation s'affiche
  Et le consultant reçoit une notification par email

Scénario : Validation des champs
  Étant donné un visiteur qui soumet le formulaire avec des champs invalides
  Quand il clique sur "Envoyer"
  Alors les erreurs sont affichées en rouge sous chaque champ concerné
  Et le formulaire n'est pas soumis

Scénario : Protection anti-spam
  Étant donné un bot qui tente de soumettre le formulaire
  Quand la soumission est détectée comme suspecte (honeypot ou rate limit)
  Alors la soumission est rejetée silencieusement
```

**Story Points : 5** | **MoSCoW : Must**

---

#### US-5.2 : Intégration Calendly

```
En tant que visiteur qui préfère réserver directement un créneau,
je veux voir un widget de prise de rendez-vous intégré,
afin de planifier un appel découverte sans échange d'emails.
```

**Critères d'acceptation :**

```gherkin
Scénario : Widget Calendly
  Étant donné un visiteur qui accède à la section prise de RDV
  Quand la section se charge
  Alors un widget Calendly inline s'affiche avec les créneaux disponibles
  Et le visiteur peut réserver sans quitter le site

Scénario : Confirmation
  Étant donné un visiteur qui sélectionne un créneau et remplit ses infos
  Quand il confirme le rendez-vous
  Alors il voit un message de confirmation
  Et un email de confirmation est envoyé aux deux parties
```

**Story Points : 2** | **MoSCoW : Must**

---

#### US-5.3 : Intégration CRM HubSpot

```
En tant que consultant recevant des leads,
je veux que chaque soumission de formulaire crée automatiquement un contact dans HubSpot,
afin de suivre et relancer mes prospects sans saisie manuelle.
```

**Critères d'acceptation :**

```gherkin
Scénario : Création contact HubSpot
  Étant donné un visiteur qui soumet le formulaire de contact
  Quand la soumission est traitée
  Alors un contact est créé dans HubSpot avec : nom, email, entreprise, message
  Et le contact est tagué "Lead site web"

Scénario : Contact existant
  Étant donné un visiteur dont l'email existe déjà dans HubSpot
  Quand il soumet le formulaire
  Alors le contact existant est mis à jour (pas de doublon)
  Et une note est ajoutée avec le nouveau message
```

**Story Points : 3** | **MoSCoW : Could**

---

#### US-5.4 : Widget chat Freshchat

```
En tant que visiteur avec une question rapide,
je veux pouvoir discuter en direct via un chat,
afin d'obtenir une réponse immédiate sans remplir de formulaire.
```

**Critères d'acceptation :**

```gherkin
Scénario : Affichage widget
  Étant donné un visiteur sur n'importe quelle page
  Quand la page est chargée depuis plus de 5 secondes
  Alors un widget de chat apparaît en bas à droite (icône bulle)

Scénario : Ouverture du chat
  Étant donné un visiteur qui clique sur l'icône chat
  Quand le widget s'ouvre
  Alors un message d'accueil personnalisé s'affiche
  Et le visiteur peut taper son message
```

**Story Points : 2** | **MoSCoW : Could**

---

### EPIC 6 : SEO et performance

> Assurer la visibilité du site sur les recherches liées au conseil Freshworks.

#### US-6.1 : SEO on-page

```
En tant que consultant,
je veux que mon site soit optimisé pour les moteurs de recherche,
afin d'apparaître dans les premiers résultats sur les requêtes liées à Freshservice/Freshdesk.
```

**Critères d'acceptation :**

```gherkin
Scénario : Balises meta
  Étant donné un moteur de recherche qui crawle le site
  Quand il indexe chaque page
  Alors chaque page a : un title unique (<60 car.), une meta description
    unique (<160 car.), et des balises Open Graph pour le partage social

Scénario : Structure sémantique
  Étant donné le code HTML du site
  Quand il est analysé
  Alors chaque page a une seule balise H1, une hiérarchie H2/H3 cohérente,
    et des balises alt sur toutes les images

Scénario : Performance Lighthouse
  Étant donné le site déployé
  Quand un audit Lighthouse est exécuté
  Alors le score Performance est ≥ 90, Accessibility ≥ 90,
    Best Practices ≥ 90, SEO ≥ 90
```

**Story Points : 3** | **MoSCoW : Must**

---

#### US-6.2 : Sitemap et robots.txt

```
En tant que moteur de recherche,
je veux accéder à un sitemap XML et un robots.txt,
afin d'indexer efficacement toutes les pages du site.
```

**Critères d'acceptation :**

```gherkin
Scénario : Sitemap
  Étant donné un crawler qui accède à /sitemap.xml
  Quand le fichier est servi
  Alors il contient la liste de toutes les pages publiques avec lastmod

Scénario : Robots.txt
  Étant donné un crawler qui accède à /robots.txt
  Quand le fichier est servi
  Alors il autorise le crawl de toutes les pages publiques
  Et il référence le sitemap.xml
```

**Story Points : 1** | **MoSCoW : Must**

---

### EPIC 7 : À propos et confiance

> Humaniser le consultant et renforcer la confiance.

#### US-7.1 : Section À propos

```
En tant que visiteur qui envisage de travailler avec le consultant,
je veux connaître son parcours et ses certifications,
afin de m'assurer de son expertise Freshworks.
```

**Critères d'acceptation :**

```gherkin
Scénario : Profil consultant
  Étant donné un visiteur qui accède à la section À propos
  Quand la section se charge
  Alors il voit : une photo professionnelle, un résumé du parcours,
    les certifications Freshworks, et les valeurs/approche du consultant

Scénario : Preuve d'expertise
  Étant donné un visiteur qui lit la section À propos
  Quand il cherche des preuves de compétence
  Alors il voit des badges de certification et/ou logos partenaires Freshworks
```

**Story Points : 2** | **MoSCoW : Must**

---

## Backlog ordonné — Priorisation MoSCoW

> Timebox : 2 semaines. Règle 60/20/20 : ~60% Must, ~20% Should, ~20% Could.

| # | ID | User Story | Points | MoSCoW | Sprint |
|---|----|-----------|--------|--------|--------|
| 1 | US-1.1 | Header et navigation | 3 | **Must** | Sprint 1 |
| 2 | US-2.1 | Hero section + proposition de valeur | 3 | **Must** | Sprint 1 |
| 3 | US-2.3 | Aperçu services (homepage) | 3 | **Must** | Sprint 1 |
| 4 | US-3.1 | Services détaillés | 5 | **Must** | Sprint 1 |
| 5 | US-4.1 | Cas clients | 3 | **Must** | Sprint 1 |
| 6 | US-7.1 | Section À propos | 2 | **Must** | Sprint 1 |
| 7 | US-1.2 | Footer | 2 | **Must** | Sprint 1 |
| 8 | US-6.1 | SEO on-page | 3 | **Must** | Sprint 1 |
| 9 | US-6.2 | Sitemap + robots.txt | 1 | **Must** | Sprint 1 |
| — | — | **Total Sprint 1** | **25** | — | — |
| 10 | US-5.1 | Formulaire de contact | 5 | **Must** | Sprint 2 |
| 11 | US-5.2 | Intégration Calendly | 2 | **Must** | Sprint 2 |
| 12 | US-2.2 | Chiffres clés / preuves sociales | 2 | **Should** | Sprint 2 |
| 13 | US-4.2 | Témoignages clients | 2 | **Should** | Sprint 2 |
| 14 | US-1.3 | Mentions légales | 1 | **Should** | Sprint 2 |
| 15 | US-5.3 | Intégration CRM HubSpot | 3 | **Could** | Sprint 2 |
| 16 | US-5.4 | Widget chat Freshchat | 2 | **Could** | Sprint 2 |
| — | — | **Total Sprint 2** | **17** | — | — |
| — | — | **TOTAL PROJET** | **42** | — | — |

---

## Sprint Planning

### Sprint 1 — "Walking Skeleton" (Semaine 1)

```
SPRINT GOAL : Publier un site vitrine navigable qui présente clairement
l'offre de conseil Freshservice/Freshdesk avec un contenu professionnel
et un SEO de base en place.
```

**Forecast : 25 points**

| Jour | Stories | Focus |
|------|---------|-------|
| J1 | Setup projet (Next.js, Tailwind, structure) + US-1.1 (Header) | Fondations + navigation |
| J2 | US-2.1 (Hero) + US-2.3 (Aperçu services) | Page d'accueil |
| J3 | US-3.1 (Services détaillés) | Contenu services |
| J4 | US-4.1 (Cas clients) + US-7.1 (À propos) | Crédibilité |
| J5 | US-1.2 (Footer) + US-6.1 (SEO) + US-6.2 (Sitemap) + Déploiement | Finitions + mise en ligne |

**Objectif de fin de Sprint 1** : site en ligne sur Vercel, toutes les pages navigables avec du contenu réel, Lighthouse > 90.

---

### Sprint 2 — "Conversion Machine" (Semaine 2)

```
SPRINT GOAL : Transformer le site vitrine en machine à leads avec
formulaire de contact fonctionnel, prise de RDV Calendly intégrée,
et enrichissement du contenu (témoignages, chiffres clés).
```

**Forecast : 17 points**

| Jour | Stories | Focus |
|------|---------|-------|
| J1 | US-5.1 (Formulaire contact) | Conversion — formulaire |
| J2 | US-5.2 (Calendly) + US-2.2 (Chiffres clés) | Conversion — RDV + crédibilité |
| J3 | US-4.2 (Témoignages) + US-1.3 (Mentions légales) | Contenu enrichi + conformité |
| J4 | US-5.3 (HubSpot) + US-5.4 (Freshchat) | Intégrations externes |
| J5 | Tests E2E + fixes + optimisations finales | Stabilisation + polish |

**Objectif de fin de Sprint 2** : pipeline de conversion complet (formulaire → CRM, Calendly, chat), contenu enrichi, site prêt pour la promotion.

---

## Definition of Ready (DoR)

Checklist avant qu'une story entre en développement :

- [ ] Format User Story complet (rôle + action + bénéfice)
- [ ] 3-5 critères d'acceptation en Given/When/Then
- [ ] Pas de dépendance bloquante non résolue
- [ ] Estimée en story points
- [ ] Contenu texte rédigé ou brief fourni
- [ ] Maquette mentale claire (layout décrit)

---

## Definition of Done (DoD)

Checklist pour qu'une story soit considérée "Done" :

### Code Quality
- [ ] Le code compile sans erreur (`npm run build` passe)
- [ ] Linting passé (`eslint` + `prettier`)
- [ ] Composants React typés (TypeScript)
- [ ] Responsive vérifié (mobile + desktop)
- [ ] Pas de code dupliqué évitable

### Testing
- [ ] Critères d'acceptation vérifiables manuellement
- [ ] Lighthouse ≥ 90 sur les 4 catégories
- [ ] Navigation testée sur Chrome + Safari

### SEO
- [ ] Title et meta description uniques par page
- [ ] Balises alt sur toutes les images
- [ ] Hiérarchie H1/H2/H3 cohérente

### Déploiement
- [ ] Preview deployment Vercel fonctionnel
- [ ] Aucune erreur console en production
- [ ] Temps de chargement < 2s (LCP)

---

## Risques identifiés

| Risque | Impact | Probabilité | Mitigation |
|--------|--------|-------------|------------|
| Contenu à créer = temps rédaction | Élevé | Haute | Claude génère les textes, le consultant valide |
| Intégration HubSpot API complexe | Moyen | Moyenne | Prévoir en Could, fallback = notification email |
| Visuels manquants (photos, logos) | Moyen | Haute | Utiliser des illustrations SVG/icônes + placeholder photos |
| Calendly embed lent au chargement | Faible | Moyenne | Lazy load du widget, skeleton loader |

---

## Prochaine étape

> **Action immédiate** : Valider ce cadrage avec le stakeholder, puis lancer le setup technique du projet (Next.js + Tailwind + structure de fichiers) et commencer le Sprint 1.
