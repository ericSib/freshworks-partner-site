# Cadrage Product Owner — What A Service (whataservice.fr)

> **Date** : 2026-04-05 (v2 — intégration Charte Graphique + GTM)
> **Product Owner** : Claude Code (assist)
> **Stakeholder** : Eric Sib — Fondateur, What A Service
> **Sources** : Charte_Graphique_WaS.pdf + GTM Framework (compass artifact)

---

## Product Goal

```
PRODUCT GOAL : Générer des leads qualifiés (RDV Calendly + formulaire + quiz ITSM)
auprès des DSI et responsables IT/support d'ETI francophones (200–2 000 collab.),
en publiant un site vitrine bilingue FR/EN, positionné "Freshworks Consulting, Done Right",
respectant la charte graphique WaS, d'ici 2 semaines.
```

### KPIs cibles

| KPI | Cible | Mesure |
|-----|-------|--------|
| Taux de conversion visiteur → lead | > 3% | Vercel Analytics |
| Prises de RDV Calendly | > 5/mois | Dashboard Calendly |
| Soumissions formulaire contact | > 10/mois | HubSpot CRM |
| Complétion quiz ITSM maturity | > 20% des visiteurs quiz | GA4 events |
| Lighthouse Performance Score | > 90 (4 catégories) | Lighthouse CI |
| Temps de chargement (LCP) | < 2s | Web Vitals |
| Positionnement SEO FR "consultant Freshservice" | Top 10 à 6 mois | Google Search Console |

---

## Charte Graphique — Référence Design

> Source : `Charte_Graphique_WaS.pdf` (InDesign CC 14.0, 2018)

### Couleurs

| Rôle | Couleur | Hex | RGB | CMYK | Pantone |
|------|---------|-----|-----|------|---------|
| **Primaire** | Orange WaS | **#f49962** | 244, 153, 98 | 0/49/64/0 | P 34-5 U |
| **Secondaire** | Bleu marine | **#132338** | 19, 35, 56 | 100/83/47/57 | — |

### Typographies

| Usage | Police | Style |
|-------|--------|-------|
| Titres, mises en avant | **Futura STD Bold Condensed** | Bold 700, Condensed |
| Texte courant | **Futura STD Book** | Regular 400 |
| Logo "What a Service" | Futura STD Bold Condensed | — |
| Logo "WaS" | Futura STD Book | — |

**Web fallbacks** : Josefin Sans (Google Fonts) pour les titres, DM Sans pour le body.

### Logo

- Format : cercle orange (#f49962) avec monogramme "WAS" blanc + "What a Service" vertical
- **Variantes autorisées** : blanc sur noir (print N&B), orange sur bleu marine uniquement
- **Interdits** : inclinaison, miroir, déformation, couleurs hors charte, contours seuls, logo couleur sur fond autre que bleu marine

### Règles d'application web

- Fond de page : blanc (#FFFFFF) ou gris clair (#F9FAFB)
- Sections sombres : bleu marine #132338
- CTA et accents : orange #f49962
- Texte principal : bleu marine #132338 ou gris foncé (#374151)
- Liens et hover : orange #f49962

---

## Positionnement & Brand Voice (GTM)

### Tagline

> **"Freshworks Consulting, Done Right."**

### Positioning statement

> *What A Service helps mid-market companies (200–2,000 employees) implement, optimize, and migrate to Freshservice and Freshdesk — the right way. With ITIL 4, PRINCE2, and Scrum certifications, and deep Freshworks expertise, we deliver ITSM solutions your teams actually adopt. Bilingual (FR/EN). No bloat. Results in weeks.*

### Voice architecture

- **60% formel / 40% casual** — expert authority, approachable for mid-market
- **"The Expert Next Door"** — knowledgeable sans condescendance
- **"Clarity Over Cleverness"** — direct, jargon ITIL naturel mais ancré business outcomes
- **"Bilingual Confidence"** — FR natif (ETI, intégrateur), EN natif (mid-market, implementer)

### Messaging hierarchy

1. Spécialisation Freshworks (profondeur)
2. Méthodologie (ITIL 4, PRINCE2, Agile)
3. Bilingue FR/EN (unique sur le marché)
4. Certifications + résultats prouvés

### Certifications à afficher

ITIL 4 · PRINCE2 · PSM I · PSPO I · Freshworks Partner

---

## Stack technique

| Composant | Choix | Justification |
|-----------|-------|---------------|
| Framework | **Next.js 15 (App Router)** | SSR/SSG, excellent SEO, i18n natif |
| Styling | **Tailwind CSS 4** | Utility-first, charte graphique en config |
| i18n | **next-intl** | Routing /fr/ /en/, hreflang auto, slug translation |
| Déploiement | **Vercel** | CDN global, analytics, preview branches |
| Formulaire | **React Hook Form + Server Action** | Validation client + serveur |
| RDV | **Calendly (embed inline)** | Widget intégré, lazy-loaded |
| CRM | **HubSpot (API v3 gratuite)** | Sync leads automatique |
| Chat | **Freshchat widget** | Cohérence écosystème Freshworks |
| Analytics | **Vercel Analytics + GA4** | Performance + comportement |
| Fonts | **Josefin Sans + DM Sans** (Google Fonts) | Fallback web pour Futura STD |

### Contraintes

- **Deadline** : 2 semaines (2 sprints d'1 semaine)
- **Contenu** : tout à créer (textes FR, visuels, cas clients anonymisés)
- **Budget** : gratuit (Vercel free, HubSpot free, Calendly free)
- **Bilingue** : architecture i18n dès le Sprint 1, contenu EN en Sprint 2+
- **Domaine** : whataservice.fr (sous-répertoires /fr/ et /en/)
- **SEO FR** : basse compétition — cibler "intégrateur Freshservice", "consultant Freshservice France"

---

## Personas

### Sophie — DSI d'ETI (persona principal)

| Attribut | Détail |
|----------|--------|
| Entreprise | ETI, 500 personnes, secteur services |
| Contexte | Freshservice déployé depuis 2 ans, sous-utilisé (adoption ~30%) |
| Besoin | Optimiser la configuration, former les équipes, mesurer le ROI |
| Frustration | "On paie cher pour un outil qu'on utilise à 30%" |
| Déclencheur | Audit interne révélant un ROI licensing insuffisant |
| Canal | Google FR : "consultant Freshservice optimisation" |
| Pain category | **Tool frustration** — low adoption, painful to use |

### Marc — Responsable Support Client

| Attribut | Détail |
|----------|--------|
| Entreprise | PME, 120 personnes, e-commerce en croissance |
| Contexte | Freshdesk basique, pas de workflows automatisés, tickets x3 en 1 an |
| Besoin | Automatisations, SLA, portail client self-service |
| Frustration | "Je n'ai pas l'expertise en interne pour aller plus loin" |
| Déclencheur | Croissance des tickets, SLA breaches |
| Canal | LinkedIn / recommandation |
| Pain category | **Growth pain** — processes don't scale |

### Karim — Responsable IT en migration

| Attribut | Détail |
|----------|--------|
| Entreprise | ETI, 350 personnes, industrie |
| Contexte | Sur ServiceNow mais trop cher/complexe, migration vers Freshservice envisagée |
| Besoin | Accompagnement migration + déploiement sans disruption |
| Frustration | "La migration précédente a échoué, on a peur de recommencer" |
| Déclencheur | Renouvellement licence ServiceNow, arbitrage budget |
| Canal | Google FR : "migration ServiceNow Freshservice" |
| Pain category | **Migration anxiety** — afraid of disrupting operations |

### Nadia — DRH explorant l'ESM

| Attribut | Détail |
|----------|--------|
| Entreprise | ETI, 800 personnes, multi-sites |
| Contexte | IT sur Freshservice, les RH veulent le même outil pour onboarding/offboarding |
| Besoin | Déploiement ESM — Freshservice for Business Teams (module RH) |
| Frustration | "On gère encore l'onboarding par email et tableur Excel" |
| Déclencheur | Recommandation interne du DSI déjà client |
| Canal | Référencement interne + site web |
| Pain category | **Operational chaos** — manual, repetitive tasks |

---

## Story Map (mise à jour GTM — 10 sections homepage)

```
BACKBONE (parcours visiteur — scroll homepage GTM) :

  Arriver       Ressentir      Comprendre     Évaluer         S'auto-évaluer   Contacter
  sur le site   le problème    l'offre        la crédibilité  sa maturité      le consultant
     │              │              │               │               │               │
     ▼              ▼              ▼               ▼               ▼               ▼
┌─────────┐  ┌──────────┐  ┌───────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐
│ 1.Hero  │  │ 2.Problem│  │ 3.Services│  │ 4.Social   │  │ 8.Quiz     │  │ 10.Contact │
│ +Trust  │  │ agitation│  │ 5 piliers │  │   proof    │  │   ITSM     │  │  Form +    │
│  bar    │  │          │  │ 5.Process │  │ 6.Case st. │  │   maturity │  │  Calendly  │
│ +Lang   │  │          │  │ 7.Products│  │ 8.Testim.  │  │            │  │            │
│  toggle │  │          │  │           │  │            │  │            │  │            │
└─────────┘  └──────────┘  └───────────┘  └────────────┘  └────────────┘  └────────────┘
                                                          │ 9.Blog     │
                                                          │   preview  │
                                                          └────────────┘

─── Release 1 (MVP - Sprint 1) ─── Walking Skeleton FR ────────────────────────
  Hero+Nav+Trust   Problem       5 piliers       2 cas clients    Formulaire
  +lang toggle     agitation     +process        +témoignages     +Calendly
  Charte graphique               +"Starting at"                   SEO FR base
  i18n scaffold                                                   Sitemap

─── Release 2 (Sprint 2) ─── Conversion & Engagement ─────────────────────────
  Quiz ITSM        Blog preview  Pricing page    HubSpot sync     Contenu EN
  maturity         3 articles    3 tiers         Freshchat        hreflang
  ROI calculator   placeholder                   Mentions légales complet

─── Release 3 (Backlog) ─── Growth Engine ─────────────────────────────────────
  Pillar pages     Full blog     ROI calculator  Case studies     Analytics
  SEO clusters     engine        interactif      détaillés        dashboard
  EN content                     Gated content   Webinar page
```

---

## Epics et User Stories

---

### EPIC 1 : Design System & Charte Graphique

> Appliquer la charte graphique WaS à l'ensemble du site pour une identité visuelle cohérente.

#### US-1.1 : Configuration design system Tailwind

```
En tant que développeur,
je veux configurer Tailwind CSS avec les couleurs et typographies de la charte WaS,
afin que chaque composant respecte automatiquement l'identité visuelle.
```

**Critères d'acceptation :**

```gherkin
Scénario : Couleurs charte
  Étant donné le fichier tailwind.config.ts
  Quand il est chargé
  Alors les couleurs brand (#f49962 orange) et navy (#132338 bleu marine)
    sont disponibles comme classes utilitaires (bg-brand-400, text-navy-800, etc.)

Scénario : Typographies
  Étant donné une page du site
  Quand elle est rendue
  Alors les titres utilisent Josefin Sans (fallback Futura STD)
  Et le texte courant utilise DM Sans
  Et les deux sont chargées via Google Fonts avec font-display: swap

Scénario : Composants de base
  Étant donné le design system
  Quand il est utilisé
  Alors les boutons CTA sont en dégradé orange (#f49962 → #e8823f)
  Et les sections sombres utilisent le bleu marine #132338
  Et les cartes ont des coins arrondis (rounded-2xl) avec ombre subtile
```

**Story Points : 2** | **MoSCoW : Must**

---

### EPIC 2 : Navigation et Structure Bilingue

> Permettre la navigation et poser l'architecture bilingue FR/EN.

#### US-2.1 : Header avec navigation + toggle langue

```
En tant que visiteur arrivant sur le site,
je veux voir un header clair avec le logo WaS, un menu de navigation,
un toggle de langue FR/EN et un CTA "Prendre RDV",
afin de naviguer facilement et choisir ma langue.
```

**Critères d'acceptation :**

```gherkin
Scénario : Navigation desktop
  Étant donné un visiteur en résolution desktop (≥1024px)
  Quand la page se charge
  Alors le header affiche : logo cercle orange "WaS" à gauche,
    liens (Services, Cas clients, Tarifs, A propos) au centre,
    toggle "Français | English" (noms natifs, PAS de drapeaux),
    et CTA orange "Prendre RDV" à droite

Scénario : Navigation mobile
  Étant donné un visiteur sur mobile (<1024px)
  Quand il appuie sur l'icône hamburger
  Alors un menu plein écran s'ouvre avec tous les liens,
    le toggle langue, et le CTA "Prendre RDV" en premier

Scénario : Scroll sticky
  Étant donné un visiteur qui scrolle au-delà de 100px
  Quand le seuil est dépassé
  Alors le header devient fixe avec fond blanc opaque et ombre subtile
  Et le logo texte passe de blanc à bleu marine #132338

Scénario : Toggle langue
  Étant donné un visiteur sur la version française (/fr/)
  Quand il clique sur "English"
  Alors il est redirigé vers la page équivalente en /en/
  Et le slug est traduit nativement (/fr/services/ → /en/services/)
```

**Story Points : 5** | **MoSCoW : Must**

---

#### US-2.2 : Architecture i18n Next.js

```
En tant que développeur,
je veux mettre en place le routing bilingue /fr/ et /en/ avec next-intl,
afin que chaque page existe dans les deux langues avec des URLs natives.
```

**Critères d'acceptation :**

```gherkin
Scénario : Routing bilingue
  Étant donné un visiteur accédant à whataservice.fr
  Quand la page se charge
  Alors il est redirigé vers /fr/ (défaut) ou /en/ selon la langue navigateur
  Et chaque page /fr/xxx/ a son équivalent /en/xxx/

Scénario : hreflang tags
  Étant donné une page en /fr/services/
  Quand le HTML est rendu
  Alors les balises <link rel="alternate" hreflang="fr"> et hreflang="en"
    pointent vers les URLs respectives
  Et un x-default pointe vers la version /en/

Scénario : Slugs natifs
  Étant donné la page /fr/implementation-freshservice/
  Quand son équivalent EN existe
  Alors l'URL EN est /en/freshservice-implementation/
  Et les deux sont liées par hreflang
```

**Story Points : 5** | **MoSCoW : Must**

---

#### US-2.3 : Footer avec coordonnées et langue

```
En tant que visiteur en bas de page,
je veux voir un footer avec les coordonnées, la navigation,
les certifications et un toggle langue,
afin de contacter le consultant ou changer de langue.
```

**Critères d'acceptation :**

```gherkin
Scénario : Contenu du footer
  Étant donné un visiteur qui scrolle en bas de page
  Quand le footer est visible
  Alors il affiche : logo WaS, tagline "Freshworks Consulting, Done Right",
    email contact@whataservice.fr, lien LinkedIn,
    liens navigation, toggle FR/EN, mentions légales,
    et badges certifications (ITIL 4, PRINCE2, Freshworks Partner)

Scénario : Lien email cliquable
  Étant donné un visiteur qui clique sur l'email
  Quand le clic est effectué
  Alors le client email par défaut s'ouvre avec contact@whataservice.fr
```

**Story Points : 2** | **MoSCoW : Must**

---

#### US-2.4 : Page mentions légales

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
    hébergeur (Vercel), politique de cookies, contact RGPD
```

**Story Points : 1** | **MoSCoW : Should**

---

### EPIC 3 : Homepage — Scroll Sequence GTM (10 sections)

> Convertir le visiteur via un scroll narratif en 10 sections aligné sur la stratégie GTM.

#### US-3.1 : Section 1 — Hero + Trust Bar

```
En tant que visiteur arrivant sur la page d'accueil,
je veux comprendre en 5 secondes la proposition de valeur de WaS
et voir des preuves de crédibilité immédiates,
afin de décider si l'offre correspond à mon besoin.
```

**Critères d'acceptation :**

```gherkin
Scénario : Hero headline outcome-focused
  Étant donné un visiteur qui charge la page d'accueil
  Quand le hero s'affiche (au-dessus de la ligne de flottaison)
  Alors il voit : titre "Freshservice & Freshdesk, Done Right.",
    sous-titre mentionnant ETI 200-2000 collab + bilingue FR/EN,
    CTA primaire orange "Réserver un appel gratuit" (→ Calendly),
    CTA secondaire "Évaluez votre maturité ITSM" (→ Quiz)
  Et un badge "Partenaire Expert Freshworks · ITIL 4 · PRINCE2 · Scrum"

Scénario : Trust bar sous le hero
  Étant donné le hero chargé
  Quand le visiteur voit la trust bar
  Alors elle affiche les badges : Freshworks Partner, ITIL 4, PRINCE2,
    PSM I, PSPO I sur fond bleu marine avec opacité réduite

Scénario : Responsive mobile
  Étant donné un visiteur sur mobile
  Quand le hero s'affiche
  Alors les CTA sont empilés verticalement (min 44px hauteur)
  Et le dashboard mockup est masqué (hidden lg:flex)
```

**Story Points : 3** | **MoSCoW : Must**

---

#### US-3.2 : Section 2 — Problem Agitation

```
En tant que visiteur DSI ou responsable IT,
je veux me reconnaître dans des problèmes concrets liés à mon outil ITSM,
afin de ressentir que WaS comprend ma situation.
```

**Critères d'acceptation :**

```gherkin
Scénario : Pain points identifiables
  Étant donné un visiteur qui scrolle sous le hero
  Quand la section problem agitation apparaît
  Alors il voit 4 cartes pain-point illustrées :
    "Équipe IT en mode pompier", "Adoption < 40%",
    "Tâches manuelles répétitives", "ROI licensing introuvable"
  Et chaque carte utilise une couleur distincte (red, amber, orange, purple)
```

**Story Points : 2** | **MoSCoW : Must**

---

#### US-3.3 : Section 3/4 — Chiffres clés + Social Proof

```
En tant que visiteur évaluant la crédibilité,
je veux voir des métriques concrètes de performance,
afin de quantifier l'impact potentiel d'un accompagnement WaS.
```

**Critères d'acceptation :**

```gherkin
Scénario : Métriques sur fond bleu marine
  Étant donné un visiteur qui scrolle
  Quand la section social proof apparaît
  Alors il voit 4 indicateurs en orange sur fond #132338 :
    "50+ projets livrés", "98% respect SLA",
    "+20% résolution 1er contact", "-30% tâches manuelles"
  Et chaque chiffre a un label explicite dessous
```

**Story Points : 1** | **MoSCoW : Must**

---

#### US-3.4 : Section 5 — Les 5 piliers de services

```
En tant que DSI cherchant un accompagnement précis,
je veux voir les 5 piliers de services de WaS avec tarifs indicatifs,
afin d'identifier le service qui correspond à mon besoin et mon budget.
```

**Critères d'acceptation :**

```gherkin
Scénario : 6 cartes service (5 piliers + managed)
  Étant donné un visiteur qui consulte la section services
  Quand la section se charge
  Alors il voit 6 cartes en grille :
    (1) Implementation & Launch — à partir de 5 000€
    (2) Migration — à partir de 10 000€
    (3) Audit & Optimisation — à partir de 5 000€ (badge "Populaire", bordure orange)
    (4) ESM Expansion — à partir de 5 000€/dept
    (5) IA & Freddy AI — à partir de 8 000€
    (6) Services Managés — à partir de 2 000€/mois (carte fond bleu marine)
  Et chaque carte a : icône, titre, description, 3 points clés, prix "À partir de"

Scénario : Process visuel
  Étant donné la section services
  Quand elle se charge
  Alors un bandeau "Discover → Implement → Optimize" est visible
    au-dessus des cartes, montrant le parcours d'engagement

Scénario : CTA par carte
  Étant donné un visiteur qui veut en savoir plus sur un service
  Quand il clique sur le lien de la carte
  Alors il est redirigé vers la section contact avec le dropdown pré-sélectionné
```

**Story Points : 5** | **MoSCoW : Must**

---

#### US-3.5 : Section 6/7 — Cas clients + Témoignages

```
En tant que décideur évaluant WaS,
je veux voir des études de cas concrètes et des témoignages clients,
afin de valider que WaS a traité des problématiques similaires à la mienne.
```

**Critères d'acceptation :**

```gherkin
Scénario : 2 cas clients avec résultats chiffrés
  Étant donné un visiteur qui accède à la section cas clients
  Quand la section se charge
  Alors il voit 2 cartes : LogiServices (Freshservice, ETI, adoption 30→95%)
    et TechCommerce (Freshdesk, PME, volume x3)
  Et chaque carte a : contexte, défi, résultats en 3 métriques

Scénario : 2 témoignages sur fond bleu marine
  Étant donné un visiteur qui scrolle sous les cas clients
  Quand les témoignages apparaissent
  Alors il voit 2 citations avec guillemets visuels, nom, poste, entreprise,
    avatar initiales, sur fond #132338
```

**Story Points : 3** | **MoSCoW : Must**

---

#### US-3.6 : Section 8 — Quiz ITSM Maturity (lead magnet)

```
En tant que visiteur curieux de son niveau de maturité ITSM,
je veux répondre à un quiz interactif de 10 questions,
afin d'obtenir un score personnalisé et des recommandations.
```

**Critères d'acceptation :**

```gherkin
Scénario : Affichage quiz
  Étant donné un visiteur qui accède à la section quiz
  Quand la section se charge
  Alors il voit un formulaire interactif avec : question courante,
    4 réponses à choix unique, barre de progression, bouton "Suivante"
  Et un message "Gratuit. Aucune carte bancaire. Résultats immédiats."

Scénario : Complétion et capture lead
  Étant donné un visiteur qui termine les 10 questions
  Quand il clique sur "Voir mes résultats"
  Alors un formulaire email s'affiche (nom + email pro)
  Et après soumission, il reçoit son score sur 5 dimensions
    (Processus, Technologies, Personnes, Automatisation, Gouvernance)
  Et un CTA "Réserver un appel pour en discuter"

Scénario : Score personnalisé
  Étant donné un visiteur qui a complété le quiz
  Quand ses résultats s'affichent
  Alors il voit un radar chart avec son score par dimension,
    un niveau de maturité global (Ad Hoc → Optimized),
    et le top 3 des recommandations
```

**Story Points : 8** | **MoSCoW : Should**

---

#### US-3.7 : Section 9 — Blog preview

```
En tant que visiteur intéressé par le contenu expert,
je veux voir un aperçu des derniers articles de blog,
afin de juger de la profondeur d'expertise de WaS.
```

**Critères d'acceptation :**

```gherkin
Scénario : 3 articles en preview
  Étant donné un visiteur qui scrolle vers le bas de la homepage
  Quand la section blog apparaît
  Alors il voit 3 cartes article avec : titre, extrait (2 lignes),
    date, catégorie (tag couleur), et un lien "Lire l'article"
  Et un CTA "Voir tous les articles" vers /fr/blog/
```

**Story Points : 3** | **MoSCoW : Could**

---

#### US-3.8 : Section 10 — À propos + Confiance

```
En tant que visiteur qui envisage de travailler avec WaS,
je veux connaître le fondateur, son parcours et ses certifications,
afin de m'assurer de l'expertise Freshworks et de la crédibilité.
```

**Critères d'acceptation :**

```gherkin
Scénario : Profil fondateur
  Étant donné un visiteur qui accède à la section À propos
  Quand la section se charge
  Alors il voit : photo/avatar "ES" sur fond dégradé orange,
    nom "Eric Sib", titre "Fondateur — What A Service",
    résumé du parcours (8 ans Freshworks, 50+ projets),
    4 valeurs (Pragmatisme, Bilingue FR/EN, Transfert compétences, Forfait fixe)
  Et un badge flottant "ITIL 4 · PRINCE2 · Scrum — Certifié Freshworks Partner"

Scénario : Voice "Expert Next Door"
  Étant donné le texte de la section
  Quand il est lu
  Alors le ton est expert mais accessible (pas de jargon marketing),
    avec des formulations directes : "Pas de superflu. Des résultats en semaines."
```

**Story Points : 2** | **MoSCoW : Must**

---

### EPIC 4 : Prise de Contact et Conversion

> Convertir le visiteur intéressé en lead qualifié.

#### US-4.1 : Formulaire de contact optimisé (GTM)

```
En tant que visiteur convaincu par l'offre,
je veux remplir un formulaire court et qualifiant,
afin de recevoir une réponse sous 24 heures.
```

**Critères d'acceptation :**

```gherkin
Scénario : 4 champs + dropdown
  Étant donné un visiteur sur la section contact
  Quand le formulaire se charge
  Alors il affiche 4 champs : Nom complet, Email professionnel, Entreprise,
    et un dropdown "Votre plus grand défi IT ?" avec options :
    Déployer / Migrer / Optimiser / ESM / IA Freddy / Autre
  Et PAS de champ téléphone (réduit la friction)
  Et un micro-copy "Nous répondrons sous 24 heures"

Scénario : Soumission valide
  Étant donné un visiteur qui remplit tous les champs correctement
  Quand il clique sur "Envoyer ma demande"
  Alors un message de confirmation s'affiche
  Et le visiteur voit un lien Calendly pour réserver immédiatement
  Et le consultant reçoit une notification email

Scénario : Validation des champs
  Étant donné un visiteur qui soumet avec des champs invalides
  Quand le formulaire est validé
  Alors les erreurs sont affichées en rouge sous chaque champ
  Et le formulaire n'est pas soumis

Scénario : Anti-spam
  Étant donné un bot qui tente de soumettre
  Quand le honeypot est rempli ou le rate limit dépassé
  Alors la soumission est rejetée silencieusement
```

**Story Points : 5** | **MoSCoW : Must**

---

#### US-4.2 : Intégration Calendly

```
En tant que visiteur qui préfère réserver directement un créneau,
je veux voir un widget Calendly intégré en inline,
afin de planifier un appel découverte 30 min sans échanges d'emails.
```

**Critères d'acceptation :**

```gherkin
Scénario : Widget Calendly inline
  Étant donné un visiteur sur la section contact
  Quand la section se charge
  Alors un widget Calendly inline s'affiche avec les créneaux disponibles
  Et le widget est lazy-loaded (skeleton loader pendant le chargement)
  Et le visiteur peut réserver sans quitter le site

Scénario : Confirmation
  Étant donné un visiteur qui confirme un créneau
  Quand la réservation est faite
  Alors un email de confirmation est envoyé aux deux parties
```

**Story Points : 2** | **MoSCoW : Must**

---

#### US-4.3 : CTA intermédiaire (bandeau de conversion)

```
En tant que visiteur qui a scrollé la moitié de la page,
je veux voir un appel à l'action fort qui me rappelle l'offre,
afin de passer à l'action si je suis convaincu.
```

**Critères d'acceptation :**

```gherkin
Scénario : CTA sur fond bleu marine
  Étant donné un visiteur qui scrolle entre les cas clients et le contact
  Quand le bandeau CTA apparaît
  Alors il voit : titre "Prêt à exploiter 100% de vos outils Freshworks ?",
    sous-titre mentionnant appel gratuit 30 min,
    CTA orange "Réserver mon appel gratuit"
    et lien secondaire email contact@whataservice.fr
  Et un micro-copy "Nous répondrons sous 24 heures"
```

**Story Points : 1** | **MoSCoW : Must**

---

#### US-4.4 : Intégration CRM HubSpot

```
En tant que consultant recevant des leads,
je veux que chaque soumission formulaire crée un contact dans HubSpot,
afin de suivre mes prospects sans double saisie.
```

**Critères d'acceptation :**

```gherkin
Scénario : Création contact HubSpot
  Étant donné un visiteur qui soumet le formulaire
  Quand la soumission est traitée côté serveur
  Alors un contact est créé dans HubSpot (nom, email, entreprise, défi IT)
  Et le contact est tagué "Lead site web" + source page

Scénario : Contact existant
  Étant donné un email déjà dans HubSpot
  Quand le formulaire est soumis
  Alors le contact existant est mis à jour (pas de doublon)
  Et une note est ajoutée avec le nouveau message
```

**Story Points : 3** | **MoSCoW : Could**

---

#### US-4.5 : Widget chat Freshchat

```
En tant que visiteur avec une question rapide,
je veux pouvoir discuter via un chat en direct,
afin d'obtenir une réponse immédiate.
```

**Critères d'acceptation :**

```gherkin
Scénario : Widget Freshchat
  Étant donné un visiteur sur n'importe quelle page
  Quand la page est chargée depuis 5 secondes
  Alors un widget de chat apparaît en bas à droite
  Et un message d'accueil personnalisé s'affiche à l'ouverture
```

**Story Points : 2** | **MoSCoW : Could**

---

### EPIC 5 : SEO et Performance

> Assurer la visibilité organique sur les requêtes FR liées au conseil Freshworks.

#### US-5.1 : SEO on-page + hreflang bilingue

```
En tant que consultant,
je veux que chaque page soit optimisée SEO avec les balises hreflang bilingues,
afin d'apparaître dans les résultats FR et EN sur les requêtes cibles.
```

**Critères d'acceptation :**

```gherkin
Scénario : Balises meta par page et par langue
  Étant donné chaque page du site
  Quand le HTML est rendu
  Alors chaque page a : title unique (<60 car.), meta description unique (<160 car.),
    balises Open Graph (og:title, og:description, og:image),
    et balises hreflang FR + EN + x-default → EN

Scénario : Structure sémantique
  Étant donné le HTML
  Quand il est analysé
  Alors chaque page a un seul H1, une hiérarchie H2/H3 cohérente,
    et des balises alt sur toutes les images

Scénario : Lighthouse ≥ 90
  Étant donné le site déployé
  Quand un audit Lighthouse est exécuté
  Alors Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90
```

**Story Points : 3** | **MoSCoW : Must**

---

#### US-5.2 : Sitemap bilingue + robots.txt

```
En tant que moteur de recherche,
je veux un sitemap XML bilingue et un robots.txt,
afin d'indexer toutes les pages FR et EN efficacement.
```

**Critères d'acceptation :**

```gherkin
Scénario : Sitemap bilingue
  Étant donné un crawler accédant à /sitemap.xml
  Quand le fichier est servi
  Alors il contient toutes les pages publiques /fr/ et /en/
    avec xhtml:link hreflang pour chaque paire linguistique

Scénario : Robots.txt
  Étant donné un crawler accédant à /robots.txt
  Quand le fichier est servi
  Alors il autorise le crawl de toutes les pages publiques
  Et il référence le sitemap.xml
```

**Story Points : 1** | **MoSCoW : Must**

---

## Backlog ordonné — Priorisation MoSCoW (v2)

> Timebox : 2 semaines. Scope élargi → MoSCoW plus agressif sur les Must.

| # | ID | User Story | Pts | MoSCoW | Sprint |
|---|----|-----------|-----|--------|--------|
| 1 | US-1.1 | Design system Tailwind (charte graphique) | 2 | **Must** | Sprint 1 |
| 2 | US-2.1 | Header + navigation + toggle langue | 5 | **Must** | Sprint 1 |
| 3 | US-2.2 | Architecture i18n Next.js (scaffold FR) | 5 | **Must** | Sprint 1 |
| 4 | US-3.1 | Hero + trust bar certifications | 3 | **Must** | Sprint 1 |
| 5 | US-3.2 | Problem agitation (4 pain points) | 2 | **Must** | Sprint 1 |
| 6 | US-3.3 | Chiffres clés / social proof | 1 | **Must** | Sprint 1 |
| 7 | US-3.4 | 5 piliers de services + "Starting at" | 5 | **Must** | Sprint 1 |
| 8 | US-3.5 | Cas clients + témoignages | 3 | **Must** | Sprint 1 |
| 9 | US-3.8 | Section À propos + confiance | 2 | **Must** | Sprint 1 |
| 10 | US-2.3 | Footer (coordonnées, nav, certifications, langue) | 2 | **Must** | Sprint 1 |
| 11 | US-5.1 | SEO on-page + hreflang | 3 | **Must** | Sprint 1 |
| 12 | US-5.2 | Sitemap bilingue + robots.txt | 1 | **Must** | Sprint 1 |
| — | — | **Total Sprint 1** | **34** | — | — |
| 13 | US-4.1 | Formulaire contact optimisé (4 champs + dropdown) | 5 | **Must** | Sprint 2 |
| 14 | US-4.2 | Intégration Calendly inline | 2 | **Must** | Sprint 2 |
| 15 | US-4.3 | CTA intermédiaire (bandeau conversion) | 1 | **Must** | Sprint 2 |
| 16 | US-3.6 | Quiz ITSM Maturity (lead magnet) | 8 | **Should** | Sprint 2 |
| 17 | US-2.4 | Mentions légales | 1 | **Should** | Sprint 2 |
| 18 | US-4.4 | Intégration HubSpot CRM | 3 | **Could** | Sprint 2 |
| 19 | US-4.5 | Widget Freshchat | 2 | **Could** | Sprint 2 |
| 20 | US-3.7 | Blog preview (3 articles) | 3 | **Could** | Sprint 2 |
| — | — | **Total Sprint 2** | **25** | — | — |
| — | — | **TOTAL PROJET (2 sprints)** | **59** | — | — |

### Backlog post-MVP (Release 3+)

| ID | User Story | Pts | Priorité |
|----|-----------|-----|----------|
| US-B.1 | Contenu EN complet (traduction native) | 8 | Haute |
| US-B.2 | Pages services dédiées (1 par pilier) | 5 | Haute |
| US-B.3 | ROI Calculator interactif (lead magnet #2) | 8 | Haute |
| US-B.4 | Blog engine (MDX ou CMS headless) | 5 | Moyenne |
| US-B.5 | Pillar pages SEO (5 x 2000-5000 mots) | 13 | Moyenne |
| US-B.6 | Page pricing dédiée (3 tiers + FAQ) | 5 | Moyenne |
| US-B.7 | Pages cas clients détaillées | 3 | Moyenne |
| US-B.8 | Animations scroll (Framer Motion) | 3 | Basse |
| US-B.9 | Analytics dashboard (GA4 + Vercel) | 2 | Basse |

---

## Sprint Planning (v2)

### Sprint 1 — "Charte & Vitrine FR" (Semaine 1)

```
SPRINT GOAL : Publier un site vitrine FR respectant la charte graphique WaS,
avec la homepage 10 sections complète (hero → services → cas clients → à propos),
l'architecture i18n scaffoldée, et un SEO de base en place.
```

**Forecast : 34 points**

| Jour | Stories | Focus |
|------|---------|-------|
| J1 | US-1.1 (Design system) + US-2.2 (i18n scaffold) + US-2.1 (Header) | Fondations : charte + structure + nav |
| J2 | US-3.1 (Hero + trust bar) + US-3.2 (Problem agitation) + US-3.3 (Social proof) | Homepage haut de page |
| J3 | US-3.4 (5 piliers services + "Starting at") | Services complets |
| J4 | US-3.5 (Cas clients + témoignages) + US-3.8 (À propos) | Crédibilité + confiance |
| J5 | US-2.3 (Footer) + US-5.1 (SEO) + US-5.2 (Sitemap) + Deploy Vercel | Finitions + mise en ligne |

**Livrable fin Sprint 1** : site en ligne sur Vercel, homepage FR complète 10 sections, charte WaS appliquée, Lighthouse > 90, architecture /fr/ en place.

---

### Sprint 2 — "Conversion & Lead Gen" (Semaine 2)

```
SPRINT GOAL : Activer le pipeline de conversion (formulaire + Calendly)
et mettre en place le quiz ITSM comme premier lead magnet,
pour commencer à générer des leads qualifiés.
```

**Forecast : 25 points**

| Jour | Stories | Focus |
|------|---------|-------|
| J1 | US-4.1 (Formulaire contact optimisé) + US-4.3 (CTA bandeau) | Formulaire + CTA |
| J2 | US-4.2 (Calendly inline) + US-2.4 (Mentions légales) | RDV + conformité |
| J3-J4 | US-3.6 (Quiz ITSM maturity — 8 pts) | Lead magnet principal |
| J5 | US-4.4 (HubSpot) ou US-4.5 (Freshchat) ou US-3.7 (Blog preview) + Tests E2E | Intégrations + stabilisation |

**Livrable fin Sprint 2** : formulaire fonctionnel + Calendly + quiz ITSM live + site prêt pour la promotion LinkedIn.

---

## Definition of Ready (DoR) — v2

- [ ] Format User Story complet (rôle + action + bénéfice)
- [ ] 3-5 critères d'acceptation en Given/When/Then
- [ ] Pas de dépendance bloquante non résolue
- [ ] Estimée en story points
- [ ] Contenu texte FR rédigé ou brief fourni (voice "Expert Next Door")
- [ ] Maquette de référence identifiée (mockup/index.html)
- [ ] Couleurs/typo de la charte graphique identifiées pour les composants

---

## Definition of Done (DoD) — v2

### Code Quality
- [ ] `npm run build` passe sans erreur
- [ ] Linting passé (ESLint + Prettier)
- [ ] Composants React typés (TypeScript strict)
- [ ] Responsive vérifié (mobile 375px + desktop 1280px)
- [ ] **Charte graphique respectée** : orange #f49962, bleu marine #132338, typo Josefin Sans/DM Sans

### Testing
- [ ] Critères d'acceptation vérifiables manuellement
- [ ] Lighthouse ≥ 90 sur les 4 catégories
- [ ] Navigation testée sur Chrome + Safari

### SEO & i18n
- [ ] Title et meta description uniques par page **et par langue**
- [ ] Balises hreflang FR + EN + x-default
- [ ] Balises alt sur toutes les images
- [ ] Hiérarchie H1/H2/H3 cohérente

### Brand
- [ ] Ton "Expert Next Door" respecté (pas de jargon marketing vide)
- [ ] Logo WaS conforme à la charte (pas d'inclinaison, pas de couleurs hors charte)
- [ ] Certifications affichées correctement (ITIL 4, PRINCE2, PSM I, PSPO I)

### Déploiement
- [ ] Preview deployment Vercel fonctionnel
- [ ] Aucune erreur console en production
- [ ] LCP < 2s

---

## Risques identifiés (v2)

| Risque | Impact | Probabilité | Mitigation |
|--------|--------|-------------|------------|
| Scope élargi (59 pts vs 42 initiaux) → risque de débordement | Élevé | Haute | MoSCoW strict : quiz en Should, blog en Could, EN en backlog |
| Futura STD non disponible en web → fallback | Faible | Certaine | Josefin Sans (Google Fonts) approuvé comme fallback |
| Architecture i18n complexe dès Sprint 1 | Moyen | Moyenne | Scaffold FR first, EN structure vide, contenu EN en backlog |
| Quiz ITSM = 8 points en Sprint 2 | Moyen | Moyenne | Découper : quiz statique d'abord (sans radar chart), scoring avancé en v2 |
| Contenu FR "Expert Next Door" tone = rédaction soignée | Moyen | Moyenne | Claude rédige, stakeholder valide le ton sur 2-3 sections clés |
| HubSpot API v3 — complexité d'intégration | Moyen | Moyenne | Classé Could, fallback = email notification (SendGrid / Resend) |

---

## Changements vs. v1 — Résumé

| Élément | v1 | v2 (charte + GTM) |
|---------|----|--------------------|
| Couleur primaire | Vert #12b899 | **Orange #f49962** |
| Couleur secondaire | Bleu #0a2540 | **Bleu marine #132338** |
| Typographie | Inter | **Josefin Sans + DM Sans** (fallback Futura STD) |
| Services | 3 (Freshservice, Freshdesk, Audit) | **5 piliers + Services Managés** |
| Positionnement | Consultant FR | **Bilingue FR/EN, "Done Right"** |
| Certifications | Non mentionnées | **ITIL 4, PRINCE2, PSM I, PSPO I** |
| Lead magnet | Absent | **Quiz ITSM Maturity** |
| Pricing | Absent | **"Starting at" par service** |
| Homepage | ~7 sections | **10 sections GTM scroll** |
| Architecture | Monolangue | **i18n /fr/ /en/ (next-intl)** |
| Personas | 3 | **4** (ajout Nadia — DRH ESM) |
| Brand voice | Non définie | **"Expert Next Door"** |
| Total story points | 42 | **59** (+backlog 52 pts) |
| Epics | 7 | **5** (restructurés, plus cohérents) |
| User Stories | 16 | **20** (sprint) + 9 (backlog) |

---

## Prochaine étape

> **Action immédiate** : Valider ce cadrage v2 avec le stakeholder, puis lancer le Sprint 1 en commençant par le setup technique (Next.js + Tailwind + next-intl + charte graphique).
