# Epic E22 — SEO/GEO Optimization

> **Objectif** : Rendre le site What A Service identifiable, citable et credible
> pour les moteurs de recherche classiques (Google, Bing) ET les moteurs AI
> (ChatGPT, Perplexity, Google AI Overviews).
>
> **Mis a jour** : 09/04/2026 — v1.0 (atelier metier initial)
> **Product Owner** : Claude Code (assist) | **Stakeholder** : Eric Sib

---

## Alignement Product Goal

L'Epic E22 renforce le Product Goal "machine de generation de leads" en :
- Rendant le site **visible dans les reponses AI** (canal qui convertit 4-5x mieux)
- Ameliorant le **ranking organique** via structured data et E-E-A-T
- Etablissant les **fondations techniques** requises AVANT le contenu (E11, E18+)

### KPIs cibles E22

| KPI | Baseline | Cible | Mesure |
|-----|----------|-------|--------|
| Score SEO audit | 6.5/10 | 9/10 | Lighthouse + manual |
| Schemas JSON-LD valides | 0 | 6+ types | Google Rich Results Test |
| Rich snippets Google | 0 | FAQ + Breadcrumbs | Google Search Console |
| AI crawler access | Non configure | GPTBot + PerplexityBot allowed | robots.txt |
| Social preview complete | Non (pas d'image) | og:image + twitter:card | Social debuggers |
| Core Web Vitals | Non mesure | LCP < 2.5s, INP < 200ms, CLS < 0.1 | PageSpeed Insights |

---

## Dependencies

| Dependance | Direction | Impact |
|------------|-----------|--------|
| E18+ (Pages SEO maturite) | E22 -> E18+ | E22 fournit le framework schema/GEO que E18+ consomme |
| E11 (Blog/Ressources) | E22 -> E11 | E22 pose le schema Article + FAQ avant que E11 en ait besoin |
| US-12.2 (Core Web Vitals) | Absorbe | Integre dans E22 Feature F3 |
| US-18.7 (Pages SEO + Schema) | Absorbe volet schema | E22 implemente le framework, E18+ les pages |

---

## Features

| Feature | Nom | Sprint |
|---------|-----|--------|
| **F1** | Schema Markup Foundation (Organization, Person, Service, FAQ, BreadcrumbList) | 10 |
| **F2** | Social & Meta Enhancement (Twitter Cards, og:image, sitemap, robots AI) | 10 |
| **F3** | Technical SEO Hardening (breadcrumbs UI, analytics GA4) | 10-11 |
| **F4** | E-E-A-T Signals (About enrichi, credentials, NAP) | 11 |
| **F5** | GEO Content Optimization (FAQ sections, answer capsules, HTML semantique) | 11-12 |

---

## User Stories

### Feature F1 — Schema Markup Foundation

#### US-22.1 — Schema JSON-LD Organization (site-wide) — 3 pts — Must

```
En tant que moteur de recherche ou moteur AI,
je veux identifier What A Service comme entite structuree avec coordonnees, fondateur et liens sociaux,
afin de construire un Knowledge Graph precis et citer WaS dans les reponses AI.
```

**Criteres d'acceptation :**

```gherkin
Scenario : Le schema Organization est present sur toutes les pages
  Etant donne un crawler sur n'importe quelle page du site
  Quand la page est rendue
  Alors le <head> contient un script JSON-LD de type "Organization"
  Et il inclut name, url, logo, founder, contactPoint, sameAs (LinkedIn, etc.)

Scenario : Le schema est valide selon Google Rich Results Test
  Etant donne le JSON-LD Organization genere
  Quand on le valide avec schema.org/validate
  Alors 0 erreur et 0 warning critique

Scenario : Le schema est bilingue
  Etant donne un visiteur sur /fr ou /en
  Quand la page est rendue
  Alors le schema contient l'URL canonique de la locale courante
```

**Implementation notes :**
- Creer `src/components/seo/JsonLd.tsx` — composant serveur generique
- Creer `src/config/schema.ts` — donnees Organization centralisees
- Injecter dans `src/app/[locale]/layout.tsx` via `<script type="application/ld+json">`

---

#### US-22.2 — Schema JSON-LD Person (consultant principal) — 2 pts — Must

```
En tant que moteur AI evaluant l'expertise du site,
je veux trouver un schema Person lie a l'Organization avec credentials et affiliations,
afin de renforcer les signaux E-E-A-T et augmenter la probabilite de citation.
```

**Criteres d'acceptation :**

```gherkin
Scenario : Le schema Person est present sur la homepage
  Etant donne un crawler sur la homepage
  Quand la page est rendue
  Alors le <head> contient un JSON-LD Person avec name, jobTitle, worksFor->Organization, knowsAbout[], sameAs[]

Scenario : Les credentials sont listees
  Etant donne le JSON-LD Person
  Quand on inspecte le champ "hasCredential"
  Alors il contient les certifications de CERT_KEYS (ITIL, Prince2, DORA, Freshworks, etc.)

Scenario : La relation Person->Organization est etablie
  Etant donne les schemas Organization et Person
  Quand un moteur AI les parse
  Alors Person.worksFor pointe vers l'@id de Organization
```

**Implementation notes :**
- Enrichir `src/config/schema.ts` avec les donnees Person
- Reutiliser les certifications de `src/config/certifications.ts`

---

#### US-22.3 — Schema JSON-LD Service (par offre) — 3 pts — Should

```
En tant que prospect cherchant "Freshworks consulting" ou "ITSM implementation partner",
je veux que chaque service WaS soit decrit en structured data,
afin que Google/AI affiche WaS dans les resultats de service pertinents.
```

**Criteres d'acceptation :**

```gherkin
Scenario : Chaque service a un schema Service
  Etant donne les services definis dans la config
  Quand la homepage est rendue
  Alors chaque service genere un JSON-LD Service avec name, description, provider->Organization, areaServed

Scenario : Les schemas Service sont dynamiques et i18n
  Etant donne un visiteur sur /en
  Quand la page est rendue
  Alors les noms et descriptions de Service sont en anglais

Scenario : La validation schema passe
  Etant donne tous les schemas Service generes
  Quand valides avec schema.org
  Alors 0 erreur
```

**Implementation notes :**
- Generer dynamiquement depuis les traductions `services.*`
- Composant `ServiceSchema` injecte dans la page ou le layout

---

#### US-22.4 — Schema JSON-LD FAQ + BreadcrumbList — 5 pts — Should

```
En tant que moteur de recherche affichant des rich snippets,
je veux trouver un schema FAQ et un BreadcrumbList sur les pages appropriees,
afin d'obtenir des resultats enrichis dans les SERP.
```

**Criteres d'acceptation :**

```gherkin
Scenario : Le BreadcrumbList est sur toutes les pages
  Etant donne un crawler sur /fr, /fr/quiz, ou /fr/mentions-legales
  Quand la page est rendue
  Alors un JSON-LD BreadcrumbList est present avec : Accueil > [Page courante]

Scenario : Un FAQ schema est sur la homepage
  Etant donne la homepage
  Quand la page est rendue
  Alors un JSON-LD FAQPage est present avec minimum 3 questions/reponses

Scenario : Le FAQ schema est bilingue
  Etant donne un visiteur sur /en
  Quand la page est rendue
  Alors le FAQ schema contient les Q/R en anglais
```

**Implementation notes :**
- BreadcrumbList : genere dynamiquement depuis le pathname
- FAQ : donnees dans `src/messages/{fr,en}.json` namespace "faq"
- Composant `FaqSchema` + `BreadcrumbSchema`

---

### Feature F2 — Social & Meta Enhancement

#### US-22.5 — Twitter Cards + og:image par defaut — 3 pts — Must

```
En tant que prospect partageant une page WaS sur LinkedIn ou Twitter,
je veux voir une preview riche avec image, titre et description,
afin que le contenu partage genere de l'engagement et du trafic.
```

**Criteres d'acceptation :**

```gherkin
Scenario : Twitter Card summary_large_image sur toutes les pages
  Etant donne une page du site
  Quand les meta tags sont inspectes
  Alors twitter:card = "summary_large_image", twitter:title, twitter:description sont presents

Scenario : og:image par defaut est defini
  Etant donne une page sans image specifique
  Quand les meta OG sont inspectes
  Alors og:image pointe vers une image 1200x630
  Et og:image:width, og:image:height, og:image:alt sont presents

Scenario : L'image OG existe physiquement
  Etant donne le chemin og:image
  Quand on requete cette URL
  Alors status 200 avec Content-Type image/*
```

**Implementation notes :**
- Creer `/public/images/og-default.jpg` (1200x630, branding WaS)
- Enrichir `generateMetadata()` dans layout.tsx avec openGraph.images et twitter.*

---

#### US-22.6 — Sitemap complet + robots.txt AI crawlers — 2 pts — Must

```
En tant que crawler (Google, Bing, GPTBot, PerplexityBot),
je veux trouver toutes les pages dans le sitemap et des directives claires dans robots.txt,
afin d'indexer/citer le site de maniere exhaustive.
```

**Criteres d'acceptation :**

```gherkin
Scenario : Le sitemap inclut toutes les routes
  Etant donne le sitemap.xml genere
  Quand on l'inspecte
  Alors il contient /fr, /en, /fr/quiz, /en/quiz, /fr/mentions-legales, /en/mentions-legales
  Et chaque URL a lastModified, changeFrequency et priority

Scenario : robots.txt autorise explicitement les AI crawlers
  Etant donne le robots.txt
  Quand un AI crawler (GPTBot, PerplexityBot, ClaudeBot) le parse
  Alors il trouve une directive "Allow: /" pour son user-agent

Scenario : robots.txt bloque les chemins prives
  Etant donne le robots.txt
  Quand il est inspecte
  Alors /api/ et /_next/ sont en Disallow
```

**Implementation notes :**
- Modifier `src/app/sitemap.ts` — ajouter les routes manquantes
- Modifier `src/app/robots.ts` — ajouter rules par AI user-agent

---

### Feature F3 — Technical SEO Hardening

#### US-22.7 — Breadcrumbs UI (composant visuel) — 3 pts — Should

```
En tant que visiteur sur /quiz ou /mentions-legales,
je veux voir un fil d'Ariane visuel (Accueil > Page courante),
afin de me reperer dans le site et revenir facilement a la homepage.
```

**Criteres d'acceptation :**

```gherkin
Scenario : Breadcrumb visible sur les pages secondaires
  Etant donne un visiteur sur /fr/quiz
  Quand la page est rendue
  Alors un breadcrumb "Accueil > Quiz Maturite" est visible sous le header

Scenario : Le breadcrumb est cliquable
  Etant donne le breadcrumb affiche
  Quand le visiteur clique sur "Accueil"
  Alors il est redirige vers /fr (ou /en selon la locale)

Scenario : Le breadcrumb est accessible
  Etant donne le composant breadcrumb
  Quand inspecte par axe-core
  Alors il utilise <nav aria-label="breadcrumb"> et <ol> semantique
```

**Implementation notes :**
- Creer `src/components/ui/Breadcrumb.tsx`
- Integrer dans les layouts de /quiz et /mentions-legales
- Pas sur la homepage (single-page, pas de breadcrumb necessaire)

---

#### US-22.8 — Analytics GA4 (tag minimal) — 5 pts — Could

```
En tant que product owner mesurant les KPIs,
je veux un tracking GA4 (pageviews, events quiz, events contact),
afin de mesurer le CPL et le taux de conversion.
```

**Criteres d'acceptation :**

```gherkin
Scenario : GA4 est charge sur toutes les pages
  Etant donne un visiteur avec consentement cookies
  Quand la page est rendue
  Alors gtag.js est charge avec strategy afterInteractive
  Et le Measurement ID est en variable d'environnement

Scenario : Les evenements cles sont trackes
  Etant donne GA4 actif
  Quand le visiteur complete le quiz ou soumet le formulaire contact
  Alors un evenement custom est envoye (quiz_complete, contact_submit)

Scenario : GA4 respecte le RGPD
  Etant donne un visiteur sans consentement
  Quand la page est rendue
  Alors aucun cookie GA4 n'est pose
```

**Implementation notes :**
- Necessite un cookie banner (mini-scope ou lib externe)
- Variable env : NEXT_PUBLIC_GA_MEASUREMENT_ID
- Helper `src/lib/analytics.ts` pour les events custom

---

### Feature F4 — E-E-A-T Signals

#### US-22.9 — About page enrichie (E-E-A-T) — 3 pts — Should

```
En tant que prospect evaluant la credibilite de WaS,
je veux une section About avec histoire, expertise, certifications visuelles et lien LinkedIn,
afin de confirmer que WaS est un expert legitime avant de prendre contact.
```

**Criteres d'acceptation :**

```gherkin
Scenario : Les certifications sont affichees avec badges visuels
  Etant donne la section About
  Quand elle est rendue
  Alors chaque certification est affichee avec badge/icone
  Et un lien LinkedIn est present

Scenario : L'experience terrain est mise en avant
  Etant donne la section About
  Quand elle est rendue
  Alors elle contient au moins 2 statistiques concretes de projets

Scenario : Le NAP est coherent
  Etant donne la section About et le Footer
  Quand on compare les informations de contact
  Alors le nom, adresse et telephone sont identiques
```

**Implementation notes :**
- Enrichir les traductions about.* avec stats terrain
- Ajouter sameAs LinkedIn dans les donnees team member
- Verifier coherence NAP Footer vs About

---

### Feature F5 — GEO Content Optimization

#### US-22.10 — FAQ sections sur pages cles (GEO) — 5 pts — Should

```
En tant que moteur AI cherchant des reponses factuelles sur le consulting Freshworks,
je veux des blocs FAQ structures avec Q/R concises sur chaque page majeure,
afin de citer WaS dans les reponses a ces questions.
```

**Criteres d'acceptation :**

```gherkin
Scenario : La homepage contient une section FAQ
  Etant donne la homepage /fr ou /en
  Quand elle est rendue
  Alors une section FAQ est visible avec 5-8 Q/R pertinentes
  Et chaque reponse fait 40-80 mots (format "answer capsule")

Scenario : Le FAQ est structure pour extraction AI
  Etant donne la section FAQ
  Quand le HTML est inspecte
  Alors chaque Q/R utilise un markup semantique (details/summary ou h3/p)
  Et un JSON-LD FAQPage correspondant est present

Scenario : Le FAQ est bilingue
  Etant donne un visiteur sur /en
  Quand la FAQ est rendue
  Alors les Q/R sont en anglais natif
```

**Implementation notes :**
- Creer `src/components/sections/FAQ.tsx`
- Donnees FAQ dans `src/messages/{fr,en}.json` namespace "faq"
- Integrer entre CaseStudies et About sur la homepage
- Le JSON-LD FAQPage est couple (US-22.4)

---

#### US-22.11 — HTML semantique et answer capsules (GEO) — 5 pts — Could

```
En tant que moteur AI analysant le contenu du site,
je veux une hierarchie H1->H2->H3 propre, des paragraphes courts, et des statistiques integrees,
afin d'extraire des chunks de contenu citables.
```

**Criteres d'acceptation :**

```gherkin
Scenario : La hierarchie des headings est correcte
  Etant donne la homepage
  Quand on extrait tous les headings
  Alors il y a exactement 1 H1 et les H2/H3 sont imbriques sans saut

Scenario : Les sections commencent par un answer capsule
  Etant donne les sections Services, Process et About
  Quand le premier paragraphe est lu
  Alors il contient une reponse autonome de 40-60 mots

Scenario : Les statistiques sont integrees
  Etant donne le contenu de la homepage
  Quand on compte les donnees chiffrees
  Alors le ratio est >= 1 stat pour 100 mots de contenu
```

**Implementation notes :**
- Audit heading hierarchy existante
- Enrichir les traductions avec answer capsules en debut de section
- Ajouter des stats Freshworks/ITSM dans les traductions

---

## Backlog ordonne (WSJF)

| # | Story | Feature | Pts | MoSCoW | WSJF | Sprint |
|---|-------|---------|-----|--------|------|--------|
| 1 | US-22.6 Sitemap + robots AI | F2 | 2 | Must | 24 | 10 |
| 2 | US-22.1 Schema Organization | F1 | 3 | Must | 21 | 10 |
| 3 | US-22.5 Twitter Cards + og:image | F2 | 3 | Must | 20 | 10 |
| 4 | US-22.2 Schema Person | F1 | 2 | Must | 18 | 10 |
| 5 | US-22.3 Schema Service | F1 | 3 | Should | 15 | 10 |
| 6 | US-22.10 FAQ sections GEO | F5 | 5 | Should | 15 | 11 |
| 7 | US-22.4 Schema FAQ + BreadcrumbList | F1 | 5 | Should | 12 | 11 |
| 8 | US-22.9 About enrichi E-E-A-T | F4 | 3 | Should | 10 | 11 |
| 9 | US-22.11 HTML semantique + capsules | F5 | 5 | Could | 10 | 12 |
| 10 | US-22.7 Breadcrumbs UI | F3 | 3 | Should | 9 | 11 |
| 11 | US-22.8 Analytics GA4 | F3 | 5 | Could | 8 | 12 |

**Total : 44 story points — 3 sprints**

---

## Sprint Planning

### Sprint 10 — "Visible par les machines" (13 pts)

```
SPRINT GOAL : Rendre WaS identifiable et citable par Google et les moteurs AI
grace au structured data et aux meta-tags sociaux.
```

| Story | Pts |
|-------|-----|
| US-22.6 Sitemap + robots AI | 2 |
| US-22.1 Schema Organization | 3 |
| US-22.5 Twitter Cards + og:image | 3 |
| US-22.2 Schema Person | 2 |
| US-22.3 Schema Service | 3 |

### Sprint 11 — "Credible pour les humains et les AI" (16 pts)

```
SPRINT GOAL : Etablir les signaux de credibilite (E-E-A-T) et le contenu FAQ
structure pour la citation AI.
```

| Story | Pts |
|-------|-----|
| US-22.10 FAQ sections GEO | 5 |
| US-22.4 Schema FAQ + BreadcrumbList | 5 |
| US-22.9 About enrichi E-E-A-T | 3 |
| US-22.7 Breadcrumbs UI | 3 |

### Sprint 12 — "Optimise pour l'extraction" (15 pts)

```
SPRINT GOAL : Optimiser le contenu existant pour maximiser l'extraction AI
et mesurer l'impact via analytics.
```

| Story | Pts |
|-------|-----|
| US-22.11 HTML semantique + capsules | 5 |
| US-22.8 Analytics GA4 | 5 |
| + Stories E18+ si capacite | ~5 |

---

## Architecture technique cible

```
src/
  components/
    seo/
      JsonLd.tsx              # Composant generique JSON-LD (serveur)
      OrganizationSchema.tsx  # Schema Organization
      PersonSchema.tsx        # Schema Person (consultant)
      ServiceSchema.tsx       # Schema Service (dynamique, i18n)
      FaqSchema.tsx           # Schema FAQPage
      BreadcrumbSchema.tsx    # Schema BreadcrumbList
    sections/
      FAQ.tsx                 # Section FAQ visible (GEO)
    ui/
      Breadcrumb.tsx          # Fil d'Ariane visuel
  config/
    schema.ts                 # Donnees structurees (Organization, Person)
    site.ts                   # + social links, NAP
  lib/
    analytics.ts              # Helper GA4 events
  messages/
    fr.json                   # + namespace "faq", answer capsules
    en.json                   # + namespace "faq", answer capsules
  app/
    robots.ts                 # + AI crawler rules
    sitemap.ts                # + toutes les routes
    [locale]/
      layout.tsx              # + schemas JSON-LD, og:image, twitter
```

---

*E22-SEO-GEO-BACKLOG.md — v1.0 — Atelier metier 09/04/2026*
