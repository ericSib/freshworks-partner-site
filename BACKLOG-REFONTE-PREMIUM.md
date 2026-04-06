# Product Backlog v2 — Refonte Premium What A Service

> Integre : Charte Graphique WaS (2018), Framework Go-to-Market, Audit Premium Frontend

---

## Product Goal

**Transformer le site What A Service en une machine de generation de leads premium bilingue, alignee sur la strategie GTM (positionnement "Expert Next Door", 5 piliers de services, parcours client en 7 etapes), en renforçant la credibilite d'expert Freshworks (+30% conversion contact, +40% engagement) et en respectant l'identite visuelle de la charte graphique — sans rupture de stack technique (Next.js / Tailwind / next-intl).**

---

## Documents de reference

| Document | Cle d'impact |
|----------|-------------|
| Charte Graphique WaS 2018 | Couleurs officielles (Orange #F49962, Navy #132338), typo Futura STD, regles logo |
| Framework GTM | Homepage 10 sections, 5 piliers services, CTA 4 champs + Calendly, trust signals 3 niveaux, voix "Expert Next Door" |
| Audit code existant | 6 sections actuelles, pas d'animations, pas de contact dedie, typo non conforme a la charte |

---

## Diagnostic : ecarts identifies

| Dimension | Etat actuel | Cible (GTM + Charte + Premium) |
|-----------|-------------|-------------------------------|
| **Typographie** | Josefin Sans / DM Sans | **Futura STD** (charte) ou equivalent web le plus proche |
| **Couleurs** | Orange #F49962 / Navy #132338 | Conformes — a conserver (valides par la charte) |
| **Sections homepage** | 6 sections | **10 sections** (GTM : +Process, +Logos clients, +Produits FW, +Blog preview) |
| **Positionnement** | Generique consultant FW | **"Expert Next Door"** : methodo + bilingue + mid-market |
| **Services** | 6 cards plates, meme niveau | **5 piliers avec tiers** (QuickStart/Professional/Enterprise) |
| **Contact** | Footer email uniquement | **Section dediee** : form 4 champs + Calendly + trust badges |
| **Trust signals** | Badges certif en liste | **3 niveaux** : above-the-fold, near CTA, supporting sections |
| **Animations** | Aucune | Reveals, compteurs, stagger, parallax |
| **Navigation** | Scroll ancre basique | Scroll spy, progress bar, smooth easing, **5 items max** |
| **Lead magnets** | Aucun | ITSM Maturity Quiz, ROI Calculator (phase 2 multi-pages) |

---

## Story Map — Vue d'ensemble alignee GTM

```
BACKBONE (parcours visiteur GTM - 10 sections) :
  Hero → Problem Agitation → Solution Overview (3 piliers)
  → Social Proof (logos + metrics) → Process (Discover→Implement→Optimize)
  → Featured Case Study → Freshworks Products → Testimonials
  → Blog Preview → Final CTA + Contact Form → Footer

WALKING SKELETON (MVP Premium — Sprint 1-3) :
  Brand alignment (typo) → Animation system → Hero refonte GTM
  → Nouvelles sections (Process, Logos, Contact) → Smooth scroll

VARIATIONS (Sprint 4-6) :
  Spotlight cards → Carousel temoignages → Blog preview
  → Freshworks products → Lead magnets interactifs
```

---

## Epics & Features

### EPIC 0 — Alignement marque & fondations design system
> Mettre le code en conformite avec la charte graphique et preparer les tokens premium

- **F0.1** Audit et correction typographique (Futura STD / equivalent web)
- **F0.2** Validation des couleurs charte (Orange #F49962, Navy #132338)
- **F0.3** Integration logo SVG officiel WaS avec variantes (orange/fond navy, blanc/fond sombre)
- **F0.4** Systeme de shadows premium (4 niveaux d'elevation)
- **F0.5** Texture grain/noise overlay subtil

### EPIC 1 — Systeme d'animations et de motion design
> Fondation technique pour toutes les animations du site

- **F1.1** Hook useScrollReveal (Intersection Observer)
- **F1.2** Composant AnimateOnScroll reutilisable
- **F1.3** Animations staggered pour les grilles de cards
- **F1.4** Support prefers-reduced-motion

### EPIC 2 — Hero Section Premium (aligne GTM Section 1)
> Premier ecran = premiere impression = conversion

- **F2.1** Background anime (gradient mesh en mouvement)
- **F2.2** Text reveal anime avec nouveau headline GTM
- **F2.3** Trust bar above-the-fold (logos clients grayscale + badges Freshworks/ITIL)
- **F2.4** CTA buttons premium avec glow (Book a Consultation + See Case Studies)

### EPIC 3 — Nouvelles sections GTM (Sections 3, 5, 7, 9)
> Passer de 6 a 10 sections — alignement complet avec le framework GTM

- **F3.1** Section "Solution Overview" — 3 piliers de services avec icones (GTM Section 3)
- **F3.2** Section "Process" — 3 etapes Discover → Implement → Optimize (GTM Section 5)
- **F3.3** Section "Freshworks Products" — cards produits Freshservice/Freshdesk/Freddy AI (GTM Section 7)
- **F3.4** Section "Blog Preview" — 3 articles recents (GTM Section 9)
- **F3.5** Section "Client Logos" — trust bar logos grayscale (GTM Section 4 enrichie)

### EPIC 4 — Section Contact + CTA Premium (GTM Section 10)
> Convertir les visiteurs en leads qualifies — machine a conversion

- **F4.1** Section contact full-width avec formulaire 4 champs GTM (nom, email pro, entreprise, challenge dropdown)
- **F4.2** Integration Calendly embed post-soumission
- **F4.3** Trust badges pres du formulaire (+42% conversion)
- **F4.4** Micro-copy bilingue sous le bouton submit

### EPIC 5 — Sections existantes upgradeees (premium + GTM)
> Chaque section existante monte en qualite et s'aligne sur le positionnement

- **F5.1** Problems — Langage GTM pain-points (4 categories) + icones animees
- **F5.2** Metrics/Social Proof — Compteurs animes + metriques GTM (98% SLA, +20% FCR, -30% manual)
- **F5.3** Services — Reorganisation en 5 piliers avec tiers (QuickStart/Pro/Enterprise)
- **F5.4** Case Studies — Layout editorial + resultats chiffres
- **F5.5** Temoignages — Carousel avec nom, titre, entreprise, photo
- **F5.6** About — Badges credentials visuels + positionnement Expert Next Door

### EPIC 6 — Navigation & UX Premium
> Fluidite et guidage du parcours visiteur

- **F6.1** Smooth scroll avec easing personnalise
- **F6.2** Scroll spy — indicateur section active dans le header
- **F6.3** Navigation 5 items max (Services, Case Studies, Resources, About, Contact) + CTA persistant
- **F6.4** Progress bar de lecture
- **F6.5** Menu mobile anime (slide + stagger links)
- **F6.6** Language toggle "Français" / "English" (pas de drapeaux — directive GTM)

### EPIC 7 — Contenu & messaging GTM
> Aligner tout le copywriting sur la strategie go-to-market

- **F7.1** Headline hero → positionnement outcome-focused GTM
- **F7.2** Pain-point language (4 categories : chaos operationnel, frustration outil, douleur croissance, anxiete migration)
- **F7.3** Power words par categorie (trust, speed, results, partnership)
- **F7.4** Voix "Expert Next Door" — 60% formel / 40% accessible
- **F7.5** Messages FR natifs (pas de traduction — "ETI" pas "mid-market", "integrateur" pas "implementer")

### EPIC 8 — Performance & Accessibilite
> Un site premium doit etre rapide et accessible

- **F8.1** Lazy loading avec skeleton states
- **F8.2** Images WebP avec blur placeholder
- **F8.3** ARIA labels et navigation clavier complete
- **F8.4** Core Web Vitals < seuils "Good"

---

## User Stories detaillees

---

### EPIC 0 — Alignement marque

#### US-0.1 : Correction typographique — alignement charte graphique
```
En tant que responsable de la marque What A Service,
je veux que le site utilise la typographie officielle de la charte (Futura STD ou son equivalent web le plus fidele),
afin d'assurer la coherence de l'identite visuelle entre tous les supports de communication.
```

**Criteres d'acceptation :**

```
Scenario : Equivalent web de Futura STD
  Etant donne que Futura STD est une police commerciale non disponible en Google Fonts
  Quand le design system est configure
  Alors la police heading utilise "Josefin Sans" (equivalent geometrique le plus proche)
    OU "Jost" (clone open-source de Futura) en remplacement
    ET la decision est documentee dans le design system

Scenario : Poids typographiques conformes a la charte
  Etant donne la charte graphique WaS 2018
  Quand les titres sont affiches
  Alors ils utilisent Bold Condensed (700) pour les titres et mises en avant
    ET Book/Regular (400) pour le texte standard

Scenario : Hierarchie typographique coherente
  Etant donne l'ensemble des pages du site
  Quand un visiteur parcourt le contenu
  Alors la hierarchie h1→h6 suit une echelle de tailles progressive,
    le font-heading est utilise pour tous les titres,
    et le font-body pour tout le texte courant
```

**Estimation :** 2 points
**Fichiers impactes :** `globals.css`, `layout.tsx` (font imports), `tailwind config`
**Note :** La charte specifie Futura STD. Le site utilise deja Josefin Sans (geometric sans-serif) qui est visuellement proche. Evaluer si Jost (clone OSS de Futura) serait plus fidele.

---

#### US-0.2 : Logo SVG officiel et variantes
```
En tant que visiteur du site,
je veux voir le logo officiel WaS dans sa forme correcte selon la charte,
afin de percevoir une marque professionnelle et coherente.
```

**Criteres d'acceptation :**

```
Scenario : Logo dans le header
  Etant donne le header du site
  Quand la page est affichee
  Alors le logo WaS est affiche en SVG (pas PNG) pour une nettete parfaite
    avec le logo circulaire orange sur fond transparent (header scrolle)
    ou blanc sur fond transparent (header transparent sur hero)

Scenario : Logo dans le footer
  Etant donne le footer navy
  Quand il est affiche
  Alors le logo utilise la variante orange sur fond navy (conforme charte)

Scenario : Regles d'usage respectees
  Etant donne le logo sur n'importe quel fond
  Quand il est affiche
  Alors il n'est jamais incline, inverse, deforme, entoure de contours,
    ni utilise avec des couleurs hors charte (interdits charte p.6)
```

**Estimation :** 2 points
**Fichiers impactes :** `public/images/` (nouveaux SVGs), `Header.tsx`, `Footer.tsx`

---

#### US-0.3 : Design system shadows + texture
```
En tant que developpeur implementant la refonte,
je veux un systeme de shadows premium a 4 niveaux et une texture grain globale,
afin d'assurer une coherence visuelle de profondeur sur tout le site.
```

**Criteres d'acceptation :**

```
Scenario : 4 niveaux d'elevation
  Etant donne le design system
  Quand un composant a besoin d'elevation
  Alors il utilise l'un des 4 niveaux :
    sm (cards repos), md (cards hover), lg (modals), xl (hero CTA)
    et les shadows reprennent une teinte orange ou navy (pas de gris generique)

Scenario : Grain overlay global
  Etant donne n'importe quelle section
  Quand la page est affichee
  Alors un grain SVG semi-transparent (3-5% opacity) est visible en overlay
    via un pseudo-element sur le body, sans impacter le LCP
```

**Estimation :** 2 points
**Fichiers impactes :** `globals.css`

---

### EPIC 1 — Systeme d'animations

#### US-1.1 : Hook useScrollReveal + AnimateOnScroll
```
En tant que visiteur du site,
je veux que les elements apparaissent avec une animation fluide au scroll,
afin de percevoir un site moderne et soigne qui retient mon attention.
```

**Criteres d'acceptation :**

```
Scenario : Element entre dans le viewport
  Etant donne un composant enveloppe dans AnimateOnScroll
  Quand l'element entre dans le viewport (threshold 0.15)
  Alors il s'anime avec un fade-in + translateY(20px→0) en 600ms ease-out

Scenario : Animation unique (pas de replay)
  Etant donne un element deja revele
  Quand le visiteur scrolle vers le haut puis revient
  Alors l'element reste visible sans rejouer l'animation

Scenario : Respect prefers-reduced-motion
  Etant donne un OS avec prefers-reduced-motion: reduce
  Quand la page charge
  Alors tous les elements sont visibles immediatement sans animation

Scenario : Performance
  Etant donne 20+ elements observes
  Quand le visiteur scrolle
  Alors le FPS reste > 55 fps (pas de jank)
```

**Estimation :** 3 points
**Fichiers impactes :** `src/hooks/useScrollReveal.ts` (nouveau), `src/components/ui/AnimateOnScroll.tsx` (nouveau)

---

#### US-1.2 : Animations staggered sur les grilles
```
En tant que visiteur du site,
je veux que les cards d'une grille apparaissent en cascade,
afin de creer un effet visuel dynamique et guider mon regard.
```

**Criteres d'acceptation :**

```
Scenario : Stagger grille 4 cards (Problems)
  Etant donne la section Problems visible
  Quand les cards entrent dans le viewport
  Alors chaque card apparait avec 100ms de delai entre elles

Scenario : Stagger grille 6 cards (Services)
  Etant donne la section Services visible
  Quand les cards entrent dans le viewport
  Alors elles apparaissent par rangee (3+3) avec 80ms de delai

Scenario : Mobile (1 colonne)
  Etant donne un ecran < 640px
  Quand les cards entrent dans le viewport
  Alors le delai est de 120ms pour une lecture naturelle
```

**Estimation :** 2 points
**Fichiers impactes :** `AnimateOnScroll.tsx`, toutes les sections avec grilles

---

### EPIC 2 — Hero Premium (GTM Section 1)

#### US-2.1 : Hero refonte complete — alignement GTM
```
En tant que prospect mid-market arrivant sur le site,
je veux voir immediatement un hero impactant avec headline outcome-focused,
trust bar above-the-fold, et CTAs clairs,
afin de comprendre en 5 secondes ce que WaS fait et pourquoi leur faire confiance.
```

**Criteres d'acceptation :**

```
Scenario : Headline outcome-focused (GTM)
  Etant donne le hero affiche
  Quand le visiteur lit le h1
  Alors le headline est centre sur le resultat, pas le produit
    Ex FR : "Freshservice & Freshdesk, configures correctement des la premiere fois"
    Ex EN : "Freshservice & Freshdesk, Configured Right the First Time"

Scenario : Subheadline avec credibility signal
  Etant donne le headline lu
  Quand le visiteur lit le sous-titre
  Alors il contient : methodologie (ITIL 4, PRINCE2, Scrum) + bilingue + mid-market

Scenario : Trust bar above-the-fold (GTM Tier 1)
  Etant donne le hero
  Quand il est affiche
  Alors une barre de trust est visible avec :
    - Badge Freshworks Partner
    - Badge ITIL 4
    - 3-5 logos clients en grayscale (si disponibles, sinon certifications)
    Les badges sont affiches pres des CTAs

Scenario : Dual CTA (GTM)
  Etant donne le hero
  Quand il est affiche
  Alors 2 CTAs sont visibles :
    Primaire (orange) : "Reservez une consultation" (lien #contact)
    Secondaire (outline) : "Voir nos cas clients" (lien #case-studies)

Scenario : Background anime
  Etant donne le hero charge
  Quand la page s'affiche
  Alors 3-4 blobs (orange/navy) se deplacent lentement (cycle 15-20s)
    en utilisant uniquement transform/opacity (GPU), CLS = 0

Scenario : Text reveal
  Etant donne le hero
  Quand la page charge (apres 300ms)
  Alors chaque mot du h1 apparait sequentiellement (fade-in + translateY, 60ms/mot)
    puis subheadline (200ms apres), puis CTAs (400ms apres)
    Le texte SSR est complet pour le SEO
```

**Estimation :** 8 points
**Fichiers impactes :** `Hero.tsx` (refonte), `src/components/ui/TextReveal.tsx` (nouveau), `messages/*.json` (nouveau copywriting), `globals.css` (keyframes)

---

### EPIC 3 — Nouvelles sections GTM

#### US-3.1 : Section Process — Discover → Implement → Optimize
```
En tant que prospect evaluant WaS,
je veux comprendre visuellement le processus d'engagement en 3 etapes claires,
afin de me rassurer sur la methodologie et me projeter dans la collaboration.
```

**Criteres d'acceptation :**

```
Scenario : 3 etapes visuelles
  Etant donne la section Process
  Quand elle est affichee
  Alors 3 colonnes (ou 3 cards) montrent le processus :
    1. Discover (icone loupe/audit) : decouverte, mini-audit gratuit, cadrage
    2. Implement (icone fusee/config) : configuration, formation, go-live
    3. Optimize (icone graphique/croissance) : amelioration continue, KPIs
    Avec une fleche/connecteur visuel entre chaque etape

Scenario : Animations d'entree
  Etant donne la section Process entrant dans le viewport
  Quand elle devient visible
  Alors les 3 etapes apparaissent en stagger (gauche → droite, 150ms)
    avec un effet de "progression" visuelle

Scenario : CTA vers contact
  Etant donne la section Process
  Quand elle est lue
  Alors un CTA "Commencer par un audit gratuit" lie a #contact est visible
```

**Estimation :** 5 points
**Fichiers impactes :** `src/components/sections/Process.tsx` (nouveau), `page.tsx`, `messages/*.json`

---

#### US-3.2 : Section Client Logos — trust bar enrichie
```
En tant que prospect non convaincu,
je veux voir des logos d'entreprises clientes reconnaissables,
afin d'etre rassure par la preuve sociale de clients similaires a moi.
```

**Criteres d'acceptation :**

```
Scenario : Affichage logos
  Etant donne la section logos
  Quand elle est affichee
  Alors 5-8 logos clients sont affiches en grayscale (opacity 50%)
    dans une rangee horizontale centree avec espacement egal
    Au hover, chaque logo passe en couleur (opacity 100%, transition 300ms)

Scenario : Logo placeholder si pas encore de vrais logos
  Etant donne l'absence de logos clients reels
  Quand la section est affichee
  Alors des badges certifications stylises (ITIL 4, PRINCE2, PSM, PSPO, Freshworks)
    sont affiches en remplacement avec le meme traitement visuel

Scenario : Scrolling infini sur mobile
  Etant donne un ecran < 768px
  Quand les logos sont affiches
  Alors ils defilent en boucle horizontale automatique (marquee CSS)
```

**Estimation :** 3 points
**Fichiers impactes :** `src/components/sections/ClientLogos.tsx` (nouveau), `page.tsx`, `public/images/logos/`

---

#### US-3.3 : Section Freshworks Products
```
En tant que prospect cherchant a comprendre l'ecosysteme Freshworks,
je veux voir les produits couverts par WaS presentes de façon claire,
afin de savoir si WaS peut m'aider sur mon produit specifique.
```

**Criteres d'acceptation :**

```
Scenario : 3 cards produits
  Etant donne la section Freshworks Products
  Quand elle est affichee
  Alors 3 cards presentent :
    1. Freshservice (ITSM) — gestion des services IT
    2. Freshdesk (CX) — support client omnicanal
    3. Freddy AI — automatisation intelligente
    Chaque card a : icone/logo, titre, description 2 lignes, lien vers #services

Scenario : Design premium
  Etant donne les cards produits
  Quand le visiteur survole une card
  Alors un gradient border subtil et un shadow eleve apparaissent (transition 300ms)
```

**Estimation :** 3 points
**Fichiers impactes :** `src/components/sections/FreshworksProducts.tsx` (nouveau), `page.tsx`, `messages/*.json`

---

#### US-3.4 : Section Blog Preview
```
En tant que prospect en phase de consideration,
je veux voir les 3 derniers articles de blog pertinents,
afin de valider l'expertise de WaS et approfondir ma recherche.
```

**Criteres d'acceptation :**

```
Scenario : 3 articles recents
  Etant donne la section Blog Preview
  Quand elle est affichee
  Alors 3 cards d'articles sont visibles avec :
    titre, date, categorie (tag colore), extrait 2 lignes, lien "Lire →"

Scenario : Contenu placeholder initial
  Etant donne qu'il n'y a pas encore de blog
  Quand la section est affichee
  Alors 3 articles "coming soon" stylises sont affiches
    OU la section est masquee jusqu'a ce que le blog existe

Scenario : Lien vers tous les articles
  Etant donne la section Blog
  Quand elle est lue
  Alors un lien "Voir tous les articles →" est visible en bas
```

**Estimation :** 3 points
**Note :** Cette section peut etre differee (COULD) si le blog n'est pas encore lance.
**Fichiers impactes :** `src/components/sections/BlogPreview.tsx` (nouveau), `page.tsx`, `messages/*.json`

---

### EPIC 4 — Section Contact GTM (Section 10)

#### US-4.1 : Section Contact — machine a conversion GTM
```
En tant que prospect convaincu et pret a agir,
je veux une section de contact dediee avec formulaire optimise et Calendly,
afin de pouvoir facilement initier un echange avec What A Service.
```

**Criteres d'acceptation :**

```
Scenario : Layout 2 colonnes
  Etant donne la section contact
  Quand elle est affichee
  Alors le layout est :
    Gauche : formulaire de contact
    Droite : infos (email, localisation, badges trust, Calendly CTA)

Scenario : Formulaire 4 champs (GTM)
  Etant donne le formulaire
  Quand il est affiche
  Alors il contient exactement 4 champs :
    1. Nom complet (text)
    2. Email professionnel (email, validation @domaine)
    3. Entreprise (text)
    4. Plus grand defi IT (dropdown : chaos operationnel, outil inadapte,
       croissance non supportee, migration prevue, autre)
  PAS de champ telephone (directive GTM — deprime la conversion)

Scenario : Soumission et feedback
  Etant donne le formulaire rempli correctement
  Quand le visiteur clique "Envoyer"
  Alors un message de succes anime s'affiche
    avec micro-copy : "Nous vous repondrons sous 24 heures"
    ET un lien Calendly s'affiche : "Ou reservez directement un creneau →"

Scenario : Validation inline
  Etant donne un champ email invalide
  Quand le visiteur tente de soumettre
  Alors un message d'erreur inline s'affiche sous le champ
    sans recharger la page

Scenario : Trust badges pres du formulaire (GTM Tier 2)
  Etant donne le formulaire
  Quand il est affiche
  Alors des badges Freshworks Partner + ITIL 4 sont visibles
    a proximite du bouton de soumission

Scenario : Design premium — floating labels
  Etant donne les champs du formulaire
  Quand un champ est selectionne (focus)
  Alors la bordure passe a orange avec glow subtil
    et le label s'anime vers le haut (floating label)

Scenario : Bilingue natif (GTM)
  Etant donne la version FR du formulaire
  Quand il est affiche
  Alors les labels, placeholders et messages d'erreur sont en français natif
    (pas de traduction litterale)
  Et inversement en EN
```

**Estimation :** 8 points
**Fichiers impactes :** `src/components/sections/Contact.tsx` (nouveau), `page.tsx`, `messages/*.json`

---

### EPIC 5 — Sections existantes upgradeees

#### US-5.1 : Compteurs animes (Metrics/Social Proof)
```
En tant que visiteur decouvrant les chiffres cles,
je veux voir les metriques s'incrementer dynamiquement,
afin de percevoir l'impact concret et memorable des resultats.
```

**Criteres d'acceptation :**

```
Scenario : Animation de comptage
  Etant donne la section Metrics entrant dans le viewport
  Quand les compteurs deviennent visibles
  Alors chaque chiffre s'incremente de 0 a sa valeur en 2s (ease-out)

Scenario : Metriques alignees GTM
  Etant donne les metriques affichees
  Quand elles sont visibles
  Alors elles montrent les KPIs GTM :
    95% satisfaction, <4 semaines deploiement, +60% adoption, 10+ projets

Scenario : Format et prefixes preserves
  Etant donne les metriques avec prefixes/suffixes (+, %, <)
  Quand l'animation se termine
  Alors les prefixes/suffixes encadrent correctement le nombre anime

Scenario : Animation unique
  Etant donne les compteurs deja animes
  Quand le visiteur revient sur la section
  Alors les valeurs restent affichees sans replay
```

**Estimation :** 3 points
**Fichiers impactes :** `Metrics.tsx`, `src/hooks/useCountUp.ts` (nouveau)

---

#### US-5.2 : Services reorganises en 5 piliers GTM
```
En tant que prospect cherchant un service precis,
je veux voir les services organises par type d'engagement avec niveaux de complexite,
afin de trouver rapidement le service adapte a mon besoin et mon budget.
```

**Criteres d'acceptation :**

```
Scenario : 5 piliers de services (GTM)
  Etant donne la section Services
  Quand elle est affichee
  Alors les 5 piliers GTM sont presentes :
    1. Implementation & Launch
    2. Migration
    3. Optimization
    4. ESM Expansion
    5. AI & Automation (Freddy AI)

Scenario : Tiers visibles (GTM)
  Etant donne chaque pilier
  Quand il est affiche
  Alors 2-3 tiers sont visibles (QuickStart / Professional / Enterprise)
    avec le tier du milieu marque "Recommande"
    et des prix "A partir de" (directive GTM)

Scenario : Cards premium avec spotlight
  Etant donne le curseur sur une card service
  Quand il se deplace
  Alors un halo radial (150px) suit le curseur (lueur orange/5)
    et un gradient border subtil apparait

Scenario : CTA par pilier
  Etant donne chaque pilier de service
  Quand le visiteur le consulte
  Alors un CTA "Decouvrir ce service →" lie a #contact est visible
```

**Estimation :** 8 points
**Fichiers impactes :** `Services.tsx` (refonte), `messages/*.json` (nouveau contenu 5 piliers)

---

#### US-5.3 : Case Studies layout editorial
```
En tant que prospect evaluant WaS,
je veux lire les etudes de cas dans un format editorial immersif,
afin de me projeter et valider la credibilite.
```

**Criteres d'acceptation :**

```
Scenario : Layout editorial enrichi
  Etant donne la section Case Studies
  Quand elle est affichee
  Alors chaque case study a un badge client colore,
    separation visuelle Challenge/Solution/Resultats,
    et metriques dans des cards individuelles avec compteurs animes

Scenario : Temoignages carousel
  Etant donne 2+ temoignages
  Quand la section est affichee
  Alors les temoignages s'affichent en carousel auto-defilant (5s)
    avec dots de navigation, nom, titre, entreprise, photo
    Pause au hover/touch

Scenario : CTA vers contact
  Etant donne la case study lue
  Quand le visiteur a vu les resultats
  Alors un CTA "Obtenez des resultats similaires →" lie a #contact
```

**Estimation :** 8 points
**Fichiers impactes :** `CaseStudies.tsx` (refonte), `src/components/ui/Carousel.tsx` (nouveau)

---

#### US-5.4 : About — Expert Next Door
```
En tant que prospect cherchant a evaluer l'expertise du fondateur,
je veux voir un profil impactant positionne comme l'"Expert Next Door" (GTM),
afin de me rassurer sur la competence et l'accessibilite.
```

**Criteres d'acceptation :**

```
Scenario : Badges credentials visuels
  Etant donne les certifications (ITIL 4, PRINCE2, PSM I, PSPO I, Freshworks)
  Quand la section About est affichee
  Alors chaque certification est un badge visuel stylise (icone + nom + couleur)

Scenario : Ton "Expert Next Door"
  Etant donne le texte de bio
  Quand il est lu
  Alors le ton est 60% formel / 40% accessible (directive GTM)
    avec des formulations du type "Voici comment nous structurons..."
    pas "En tant qu'expert de premier plan..."

Scenario : Animation d'entree
  Etant donne la section entrant dans le viewport
  Quand elle devient visible
  Alors la photo slide depuis la gauche et le texte depuis la droite (600ms)
```

**Estimation :** 5 points
**Fichiers impactes :** `About.tsx`, `messages/*.json`

---

### EPIC 6 — Navigation Premium

#### US-6.1 : Navigation complete + smooth scroll + scroll spy
```
En tant que visiteur naviguant sur un one-pager de 10 sections,
je veux une navigation fluide, un repere de position, et des liens clairs,
afin de me deplacer efficacement et percevoir une UX premium.
```

**Criteres d'acceptation :**

```
Scenario : Navigation 5 items (GTM)
  Etant donne le header
  Quand il est affiche
  Alors la navigation contient exactement :
    Services | Cas clients | Ressources | A propos | Contact
    + bouton CTA orange "Reservez une consultation"
    + toggle langue "Français" / "English" (pas de drapeaux — directive GTM)

Scenario : Smooth scroll
  Etant donne un clic sur un lien nav
  Quand le navigateur scrolle
  Alors le defilement est anime (cubic-bezier, ~800ms, offset 80px pour header)

Scenario : Scroll spy
  Etant donne un scroll naturel
  Quand une section occupe > 50% du viewport
  Alors le lien correspondant dans le header a un indicateur actif (underline orange)

Scenario : Progress bar
  Etant donne le site en cours de scroll
  Quand le visiteur scrolle
  Alors une barre orange (2-3px) en haut se remplit proportionnellement
    (transform: scaleX, pas de reflow)

Scenario : Menu mobile anime
  Etant donne le menu mobile ferme
  Quand le hamburger est clique
  Alors le menu slide avec backdrop blur, liens en stagger (50ms),
    body scroll lock active, et reverse animation a la fermeture
```

**Estimation :** 8 points
**Fichiers impactes :** `Header.tsx` (refonte), `src/hooks/useScrollSpy.ts` (nouveau), `src/components/ui/ScrollProgress.tsx` (nouveau), `navigation.ts`

---

### EPIC 7 — Contenu & messaging GTM

#### US-7.1 : Copywriting complet FR/EN aligne GTM
```
En tant que responsable marketing WaS,
je veux que tout le contenu du site soit aligne sur la strategie go-to-market,
afin de convertir plus efficacement les visiteurs en leads qualifies.
```

**Criteres d'acceptation :**

```
Scenario : Headline hero outcome-focused
  Etant donne le hero
  Quand il est affiche
  Alors le h1 est centre sur le resultat (ex: "Freshservice & Freshdesk, configures correctement")
    pas sur le process ni le produit

Scenario : Pain-points en 4 categories (GTM)
  Etant donne la section Problems
  Quand elle est affichee
  Alors les 4 cards correspondent aux 4 categories GTM :
    1. Chaos operationnel ("Votre equipe IT eteint des incendies au lieu d'innover")
    2. Frustration outil ("Votre outil ITSM est trop complexe et trop cher")
    3. Douleur de croissance ("Vos processus ne suivent plus la croissance")
    4. Anxiete migration ("Peur de perturber les operations en migrant")

Scenario : Vocabulaire FR natif (GTM bilingual confidence)
  Etant donne la version française
  Quand le contenu est lu
  Alors les termes sont natifs : "ETI" (pas "mid-market"),
    "integrateur" (pas "implementer"), "forfait" (pas "fixed-fee")

Scenario : Vocabulaire EN natif
  Etant donne la version anglaise
  Quand le contenu est lu
  Alors les termes sont anglais idiomatiques, pas des traductions du français

Scenario : Power words distribues
  Etant donne l'ensemble du site
  Quand le contenu est revise
  Alors des power words GTM sont utilises strategiquement :
    Trust : certifie, eprouve, ITIL-aligned
    Speed : en semaines, rapide, automatise
    Results : mesurable, concret, quantifiable
    Partnership : sur-mesure, cote-a-cote, dedie
```

**Estimation :** 5 points
**Fichiers impactes :** `messages/fr.json` (refonte majeure), `messages/en.json` (refonte majeure)

---

## Priorisation MoSCoW

### MUST HAVE (Sprint 1-3) — Fondations + structure GTM

| # | User Story | Epic | Pts | Justification |
|---|-----------|------|-----|---------------|
| 1 | US-0.1 Correction typo charte | E0 | 2 | Conformite marque — prerequis |
| 2 | US-0.2 Logo SVG officiel | E0 | 2 | Conformite marque |
| 3 | US-0.3 Shadows + texture | E0 | 2 | Fondation design system |
| 4 | US-1.1 Scroll reveal system | E1 | 3 | Fondation animation |
| 5 | US-1.2 Stagger animations | E1 | 2 | Impact visuel immediat |
| 6 | US-2.1 Hero refonte GTM | E2 | 8 | Premiere impression + conversion |
| 7 | US-7.1 Copywriting GTM FR/EN | E7 | 5 | Positionnement marche |
| 8 | US-4.1 Section Contact GTM | E4 | 8 | Machine a conversion |
| 9 | US-6.1 Navigation + scroll + spy | E6 | 8 | UX fondamentale 10 sections |

**Total MUST : 40 points (~3 sprints)**

### SHOULD HAVE (Sprint 4-5) — Sections GTM + upgrades

| # | User Story | Epic | Pts | Justification |
|---|-----------|------|-----|---------------|
| 10 | US-3.1 Section Process | E3 | 5 | Methodologie = confiance |
| 11 | US-3.2 Client Logos | E3 | 3 | Social proof above-fold |
| 12 | US-5.1 Compteurs animes | E5 | 3 | Impact perceptuel |
| 13 | US-5.2 Services 5 piliers GTM | E5 | 8 | Catalogue GTM |
| 14 | US-5.4 About Expert Next Door | E5 | 5 | Credibilite fondateur |
| 15 | US-3.3 Freshworks Products | E3 | 3 | Ecosysteme clarifie |

**Total SHOULD : 27 points (~2 sprints)**

### COULD HAVE (Sprint 6+) — Excellence

| # | User Story | Epic | Pts | Justification |
|---|-----------|------|-----|---------------|
| 16 | US-5.3 Case Studies editorial + carousel | E5 | 8 | Preuve sociale avancee |
| 17 | US-3.4 Blog Preview | E3 | 3 | Content marketing (quand blog existe) |
| 18 | Parallax multi-couches | E0 | 3 | Profondeur visuelle |
| 19 | Skeleton loading states | E8 | 3 | Performance percue |
| 20 | ITSM Maturity Quiz (lead magnet) | — | 13 | Conversion 20-40% (GTM) — phase multi-pages |
| 21 | ROI Calculator (lead magnet) | — | 8 | Conversion 8.3% (GTM) — phase multi-pages |
| 22 | Dark mode | E0 | 8 | Tendance premium |

**Total COULD : 46 points**

### WON'T HAVE (hors scope cette refonte)

- Multi-pages (blog, services individuels, pricing page) → phase 2
- CMS headless / WordPress migration
- Chatbot / widget IA
- E-commerce / paiement
- SEO pillar-cluster architecture (5 piliers × 8-12 articles) → phase 2 content marketing
- Paid discovery / mini-audit workflow

---

## Sprint Planning propose

### Sprint 1 — "Fondations premium + alignement marque"
**Sprint Goal :** Le design system est aligne sur la charte, les animations fonctionnent, et le copywriting GTM est pret.

| Story | Points |
|-------|--------|
| US-0.1 Correction typo charte | 2 |
| US-0.2 Logo SVG officiel | 2 |
| US-0.3 Shadows + texture | 2 |
| US-1.1 Scroll reveal system | 3 |
| US-1.2 Stagger animations | 2 |
| **Total** | **11** |

### Sprint 2 — "Hero qui convertit"
**Sprint Goal :** Le hero fait une premiere impression premium et le messaging GTM est deploye.

| Story | Points |
|-------|--------|
| US-2.1 Hero refonte GTM complete | 8 |
| US-7.1 Copywriting GTM FR/EN | 5 |
| **Total** | **13** |

### Sprint 3 — "Contact + navigation"
**Sprint Goal :** Les visiteurs ont un parcours fluide et un point de conversion clair.

| Story | Points |
|-------|--------|
| US-4.1 Section Contact GTM | 8 |
| US-6.1 Navigation + scroll + spy | 8 |
| **Total** | **16** |

### Sprint 4 — "Structure GTM"
**Sprint Goal :** Le site a les 10 sections recommandees par le framework GTM.

| Story | Points |
|-------|--------|
| US-3.1 Section Process | 5 |
| US-3.2 Client Logos | 3 |
| US-3.3 Freshworks Products | 3 |
| US-5.1 Compteurs animes | 3 |
| **Total** | **14** |

### Sprint 5 — "Differenciation & credibilite"
**Sprint Goal :** Les services sont presentes selon le catalogue GTM et la credibilite est renforcee.

| Story | Points |
|-------|--------|
| US-5.2 Services 5 piliers GTM | 8 |
| US-5.4 About Expert Next Door | 5 |
| **Total** | **13** |

### Sprint 6+ — "Excellence"
Stories COULD HAVE (case studies, blog, lead magnets, dark mode), a affiner selon feedback.

---

## Nouveaux fichiers a creer

```
src/
├── hooks/
│   ├── useScrollReveal.ts           (US-1.1)
│   ├── useCountUp.ts                (US-5.1)
│   └── useScrollSpy.ts              (US-6.1)
├── components/
│   ├── ui/
│   │   ├── AnimateOnScroll.tsx       (US-1.1)
│   │   ├── TextReveal.tsx            (US-2.1)
│   │   ├── MagneticButton.tsx        (US-2.1)
│   │   ├── SpotlightCard.tsx         (US-5.2)
│   │   ├── Carousel.tsx              (US-5.3)
│   │   ├── ScrollProgress.tsx        (US-6.1)
│   │   └── Skeleton.tsx              (US-8.1)
│   └── sections/
│       ├── Contact.tsx               (US-4.1)
│       ├── Process.tsx               (US-3.1)
│       ├── ClientLogos.tsx           (US-3.2)
│       ├── FreshworksProducts.tsx    (US-3.3)
│       └── BlogPreview.tsx           (US-3.4)
└── public/
    └── images/
        ├── logo-was.svg              (US-0.2 — variantes SVG)
        ├── logo-was-white.svg        (US-0.2)
        └── logos/                    (US-3.2 — logos clients)
```

## Fichiers existants a modifier

```
src/
├── app/
│   ├── globals.css                   (US-0.1, US-0.3, keyframes animations)
│   └── [locale]/
│       ├── layout.tsx                (US-0.1 fonts, US-6.1 ScrollProgress)
│       └── page.tsx                  (US-3.*, US-4.1 — ajout 4 nouvelles sections)
├── components/
│   ├── layout/
│   │   ├── Header.tsx                (US-6.1 refonte nav, scroll spy, mobile)
│   │   └── Footer.tsx                (US-0.2 logo SVG)
│   └── sections/
│       ├── Hero.tsx                  (US-2.1 refonte complete)
│       ├── Problems.tsx              (US-1.2, US-7.1 pain-point GTM)
│       ├── Metrics.tsx               (US-5.1 compteurs animes)
│       ├── Services.tsx              (US-5.2 refonte 5 piliers)
│       ├── CaseStudies.tsx           (US-5.3 editorial + carousel)
│       └── About.tsx                 (US-5.4 Expert Next Door)
├── config/
│   └── navigation.ts                (US-6.1 — 5 items GTM)
├── messages/
│   ├── fr.json                       (US-7.1 refonte copywriting)
│   └── en.json                       (US-7.1 refonte copywriting)
```

---

## Homepage finale — ordre des 10 sections

```
1.  Hero                    (US-2.1) — headline outcome + trust bar + dual CTA
2.  Problems                (US-7.1) — 4 pain-points GTM
3.  Solution Overview       → integre dans Services (US-5.2) — 5 piliers
4.  Client Logos            (US-3.2) — logos grayscale
5.  Metrics                 (US-5.1) — compteurs animes
6.  Process                 (US-3.1) — Discover → Implement → Optimize
7.  Case Studies            (US-5.3) — editorial + temoignages carousel
8.  Freshworks Products     (US-3.3) — 3 cards produits
9.  About                   (US-5.4) — Expert Next Door
10. Contact                 (US-4.1) — form 4 champs + Calendly
--- Footer ---
(Blog Preview optionnel entre 8 et 9 quand le blog existe)
```

---

*Backlog v2 genere le 06/04/2026 — What A Service Premium Redesign*
*Inputs : Charte Graphique WaS 2018 + Framework GTM + Audit Premium Frontend*
*Framework PO : Specification-first, Vertical slicing, INVEST validated*
*Total backlog : ~113 story points (40 MUST + 27 SHOULD + 46 COULD)*
