# Epic E22 — SEO/GEO Optimization

> **Objectif** : Rendre le site What A Service identifiable, citable et credible
> pour les moteurs de recherche classiques (Google, Bing) ET les moteurs AI
> (ChatGPT, Perplexity, Google AI Overviews).
>
> **Mis a jour** : 09/04/2026 — v2.0 (refinement Sprint 11 + retro Sprint 10)
> **Product Owner** : Claude Code (assist) | **Stakeholder** : Eric Sib

---

## Alignement Product Goal

L'Epic E22 renforce le Product Goal "machine de generation de leads" en :
- Rendant le site **visible dans les reponses AI** (canal qui convertit 4-5x mieux)
- Ameliorant le **ranking organique** via structured data et E-E-A-T
- Etablissant les **fondations techniques** requises AVANT le contenu (E11, E18+)

### KPIs cibles E22

| KPI | Baseline | Post Sprint 10 | Cible finale | Mesure |
|-----|----------|----------------|--------------|--------|
| Score SEO audit | 6.5/10 | **8/10** | 9.5/10 | Lighthouse + manual |
| Schemas JSON-LD valides | 0 | **9 types** | 11+ types (+FAQ, +Breadcrumb) | Google Rich Results Test |
| Rich snippets Google | 0 | 0 (pas encore indexe) | FAQ + Breadcrumbs | Google Search Console |
| AI crawler access | Non configure | **5 bots autorises** | ✅ DONE | robots.txt |
| Social preview complete | Non | **og:image + twitter:card** | ✅ DONE | Social debuggers |
| Tests SEO | 0 | **33** | 50+ | Vitest |

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

#### ~~US-22.4 — Schema JSON-LD FAQ + BreadcrumbList~~ — SUPPRIMEE (refinement v2)

> **Refinement** : Story eclatee apres analyse des dependances.
> - FAQPage JSON-LD → absorbe dans **US-22.10** (meme donnees, meme composant)
> - BreadcrumbList JSON-LD → absorbe dans **US-22.7** (meme composant, meme logique path)
>
> Justification : decouplage artificiel — les schemas sont generes par les composants
> qui affichent les donnees correspondantes. Les fusionner evite la duplication de
> logique et respecte le principe "vertical slicing".

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

#### US-22.7 — Breadcrumbs UI + BreadcrumbList JSON-LD — 3 pts — Should

> Absorbe le volet BreadcrumbList de l'ex-US-22.4

```
En tant que visiteur sur /quiz ou /mentions-legales,
je veux voir un fil d'Ariane visuel (Accueil > Page courante) avec schema markup,
afin de me reperer dans le site et obtenir des breadcrumbs dans les SERP Google.
```

**Criteres d'acceptation :**

```gherkin
Scenario : Breadcrumb visible sur les pages secondaires
  Etant donne un visiteur sur /fr/quiz
  Quand la page est rendue
  Alors un breadcrumb "Accueil > Quiz Maturite" est visible sous le header
  Et un JSON-LD BreadcrumbList est present dans le <head>

Scenario : Le breadcrumb est cliquable
  Etant donne le breadcrumb affiche
  Quand le visiteur clique sur "Accueil"
  Alors il est redirige vers /fr (ou /en selon la locale)

Scenario : Le breadcrumb est accessible
  Etant donne le composant breadcrumb
  Quand inspecte par axe-core
  Alors il utilise <nav aria-label="breadcrumb"> et <ol> semantique

Scenario : Pas de breadcrumb sur la homepage
  Etant donne un visiteur sur /fr (homepage)
  Quand la page est rendue
  Alors aucun breadcrumb n'est affiche ni en HTML ni en JSON-LD
```

**Implementation notes :**
- Creer `src/components/ui/Breadcrumb.tsx` — UI + JSON-LD co-locates
- Utilise JsonLd.tsx existant pour le schema BreadcrumbList
- Map des pages dans `src/config/navigation.ts` : { slug, labelKey }
- Integrer dans les pages /quiz et /mentions-legales (pas dans layout global)
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
- Cookie banner minimal (consent-based gtag loading, pas de lib externe)
- Variable env : NEXT_PUBLIC_GA_MEASUREMENT_ID = G-P37MDYJ5M8
- Helper `src/lib/analytics.ts` pour les events custom
- `src/components/ui/CookieBanner.tsx` — client component, localStorage consent
- gtag chargé conditionnellement via `next/script` strategy afterInteractive

---

#### US-22.12 — OG image v2 (marketing) — 2 pts — Should (NEW Sprint 12)

> Ajoutee suite a la Product Review stakeholder : "genere un meilleur visuel"

```
En tant que prospect voyant le lien WaS sur LinkedIn ou Twitter,
je veux voir une preview marketing professionnelle (pas juste un logo),
afin que le partage genere plus de clics et de credibilite.
```

**Criteres d'acceptation :**

```gherkin
Scenario : L'image OG est visuellement marketing
  Etant donne le fichier /public/images/og-default.png
  Quand il est affiche
  Alors il contient le logo, le nom, la tagline, et un element visuel differenciant
  Et il respecte les dimensions 1200x630

Scenario : L'image est referenceee dans les meta tags
  Etant donne la homepage
  Quand les meta OG et Twitter sont inspectes
  Alors ils pointent vers la nouvelle image
```

**Implementation notes :**
- Remplacer le placeholder Python par une image Next.js OG (opengraph-image.tsx)
  OU un visuel statique plus elabore (Pillow avance ou import Figma)
- Inclure : logo WaS, tagline "Freshworks Consulting, Done Right.",
  badges certifications (ITIL, Freshworks), couleurs deep+accent

---

#### US-18.7a — Infra pages maturite + 2 premieres pages — 6 pts — Should (NEW Sprint 12)

> Premiere tranche de E18+ : poser l'infrastructure (template, routing)
> + livrer 2 pages pilotes (ITSM Level 1 + CX Level 1)

```
En tant que prospect qui a obtenu un score de maturite Level 1 au quiz,
je veux trouver une page dediee a mon niveau avec des recommandations detaillees,
afin de comprendre concretement ce que WaS peut faire pour moi.
```

**Criteres d'acceptation :**

```gherkin
Scenario : La route /maturite/itsm/level-1 existe
  Etant donne un visiteur sur /fr/maturite/itsm/level-1
  Quand la page est rendue
  Alors il voit un titre, un diagnostic du niveau, et des recommandations concretes
  Et un JSON-LD Service est present

Scenario : La route /maturite/cx/level-1 existe
  Etant donne un visiteur sur /fr/maturite/cx/level-1
  Quand la page est rendue
  Alors il voit un titre, un diagnostic CX level 1, et des recommandations

Scenario : Les pages sont bilingues
  Etant donne les pages level-1 en /fr et /en
  Quand les deux versions sont comparees
  Alors le contenu est natif dans les deux langues

Scenario : Les pages sont dans le sitemap
  Etant donne le sitemap.xml
  Quand il est genere
  Alors il contient /maturite/itsm/level-1 et /maturite/cx/level-1

Scenario : Le template est reutilisable pour les niveaux 2-5
  Etant donne le composant template MaturityPage
  Quand on ajoute level-2
  Alors il suffit d'ajouter le contenu i18n, 0 changement de composant
```

**Implementation notes :**
- Route : `src/app/[locale]/maturite/[segment]/[level]/page.tsx`
- Template : `src/components/sections/MaturityPage.tsx`
- Donnees : `src/messages/{fr,en}.json` namespace "maturity.itsm.level1" et "maturity.cx.level1"
- generateStaticParams pour les 2 pages pilotes
- Metadata + hreflang + JSON-LD Service specifique au niveau
- Les 8 pages restantes (levels 2-5 × 2 segments) seront Sprint 13+

---

### Feature F4 — E-E-A-T Signals

#### US-22.9 — About page enrichie (E-E-A-T) — 2 pts — Should

> Re-estime de 3 → 2 pts apres analyse : About.tsx a deja la structure team[].credentials,
> il suffit d'enrichir les traductions + ajouter un lien LinkedIn + stats terrain.

```
En tant que prospect evaluant la credibilite de WaS,
je veux une section About avec stats terrain, lien LinkedIn visible, et chiffres concrets,
afin de confirmer que WaS est un expert legitime avant de prendre contact.
```

**Criteres d'acceptation :**

```gherkin
Scenario : Un lien LinkedIn est visible sur le profil consultant
  Etant donne la section About
  Quand elle est rendue
  Alors un lien cliquable vers LinkedIn est present sur le profil Eric Sibomana
  Et il pointe vers linkedin.com/in/ericsibomana

Scenario : L'experience terrain est mise en avant avec des chiffres
  Etant donne la section About
  Quand elle est rendue
  Alors elle contient au moins 3 statistiques concretes
  (ex: "40+ projets", "15 ans", "39 sites Bonduelle")

Scenario : Le contenu About est bilingue et coherent
  Etant donne la section About sur /fr et /en
  Quand les deux versions sont comparees
  Alors les memes stats et credentials sont presentes dans les deux langues
```

**Implementation notes :**
- Enrichir `about.team[0]` dans fr.json et en.json : ajouter champ `linkedin`, enrichir `bio` avec stats
- Modifier About.tsx : ajouter lien LinkedIn sur le nom ou en dessous
- TeamMember interface : ajouter champ optionnel `linkedin?: string`
- Pas de restructuration du composant — enrichissement uniquement

---

### Feature F5 — GEO Content Optimization

#### US-22.10 — FAQ section + FAQPage JSON-LD (GEO) — 5 pts — Should

> Absorbe le volet FAQPage schema de l'ex-US-22.4

```
En tant que moteur AI cherchant des reponses factuelles sur le consulting Freshworks,
je veux des blocs FAQ structures avec Q/R concises et un schema FAQPage associe,
afin de citer WaS dans les reponses AI et obtenir des FAQ rich snippets Google.
```

**Criteres d'acceptation :**

```gherkin
Scenario : La homepage contient une section FAQ visible
  Etant donne la homepage /fr ou /en
  Quand elle est rendue
  Alors une section FAQ est visible avec 6 Q/R pertinentes
  Et chaque reponse fait 40-80 mots (format "answer capsule")

Scenario : Un JSON-LD FAQPage est genere depuis les memes donnees
  Etant donne la homepage
  Quand le <head> est inspecte
  Alors un JSON-LD FAQPage est present avec les memes 6 questions/reponses
  Et chaque Q est un mainEntity de type "Question" avec acceptedAnswer "Answer"

Scenario : Le FAQ utilise un markup semantique accessible
  Etant donne la section FAQ
  Quand le HTML est inspecte
  Alors chaque Q/R utilise <details><summary> (expandable)
  Et la section a un H2 et les questions sont en <summary>

Scenario : Le FAQ est bilingue et les Q/R sont natives
  Etant donne un visiteur sur /en
  Quand la FAQ est rendue
  Alors les Q/R sont en anglais natif (pas de traduction automatique)
  Et le JSON-LD FAQPage contient les Q/R en anglais
```

**Implementation notes :**
- Creer `src/components/sections/FAQ.tsx` — section visible + JsonLd FAQPage co-locates
- Donnees dans `src/messages/{fr,en}.json` namespace "faq" : { items: [{ q, a }] }
- Integrer dans page.tsx entre `<About />` et `<Contact />`
- Questions ciblees (persona-driven) :
  1. "Qu'est-ce qu'un consultant Freshworks ?" (Sophie/Marc discovery)
  2. "Combien coute une implementation Freshservice ?" (Sophie pricing)
  3. "Comment migrer de ServiceNow vers Freshservice ?" (Karim migration)
  4. "Quelle est la duree d'un deploiement Freshdesk ?" (Marc timeline)
  5. "Freshservice vs ServiceNow : quelles differences ?" (Karim comparaison)
  6. "Comment ameliorer l'adoption de mon outil ITSM ?" (Sophie optimisation)

---

#### US-22.11 — Answer capsules GEO dans les sections existantes — 3 pts — Should

> Re-estime de 5 → 3 pts apres audit : heading hierarchy est deja correcte
> (1 H1 dans Hero, H2 dans chaque section via SectionHeader). Le travail
> est uniquement dans les traductions (answer capsules + stats).

```
En tant que moteur AI analysant le contenu du site,
je veux que chaque section majeure commence par un "answer capsule" (40-60 mots)
repondant a une question implicite, avec des statistiques integrees,
afin d'extraire des chunks de contenu citables dans les reponses AI.
```

**Criteres d'acceptation :**

```gherkin
Scenario : Les sections cles ont un answer capsule en sous-titre
  Etant donne les sections Services, Process et About
  Quand la page est rendue
  Alors chaque section a un sous-titre/paragraphe de 40-60 mots
  Et ce texte repond a une question implicite de maniere autonome

Scenario : Les statistiques sont integrees dans le contenu
  Etant donne les traductions de la homepage
  Quand on compte les donnees chiffrees (%, nombres, comparaisons)
  Alors le ratio est >= 1 stat pour 100 mots

Scenario : Le contenu GEO est bilingue
  Etant donne les answer capsules en FR
  Quand on compare avec la version EN
  Alors les memes statistiques et faits sont presents (pas de contenu traduit mot-a-mot)
```

**Implementation notes :**
- Enrichir `subheadline` dans services, process, problems avec answer capsules GEO
- Ajouter stats factuelles : "En moyenne, les entreprises sous-utilisent 70% des fonctionnalites Freshservice"
- Travail 100% i18n (fr.json + en.json), 0 changement de composant
- Valider heading hierarchy avec un test automatise (scrape H1/H2/H3)

---

## Backlog ordonne (WSJF) — v2 post-refinement

### DONE — Sprint 10

| # | Story | Feature | Pts | Statut |
|---|-------|---------|-----|--------|
| 1 | US-22.6 Sitemap + robots AI | F2 | 2 | ✅ DONE |
| 2 | US-22.1 Schema Organization | F1 | 3 | ✅ DONE |
| 3 | US-22.5 Twitter Cards + og:image | F2 | 3 | ✅ DONE |
| 4 | US-22.2 Schema Person | F1 | 2 | ✅ DONE |
| 5 | US-22.3 Schema Service | F1 | 3 | ✅ DONE |

### DONE — Sprint 11

| # | Story | Feature | Pts | Statut |
|---|-------|---------|-----|--------|
| 6 | US-22.10 FAQ section + FAQPage JSON-LD (GEO) | F5+F1 | 5 | ✅ DONE |
| 7 | US-22.7 Breadcrumbs UI + BreadcrumbList JSON-LD | F3+F1 | 3 | ✅ DONE |
| 8 | US-22.9 About enrichi E-E-A-T | F4 | 2 | ✅ DONE |
| 9 | US-22.11 Answer capsules GEO | F5 | 3 | ✅ DONE |

### Sprint 12 — A faire

| # | Story | Feature | Pts | MoSCoW | WSJF |
|---|-------|---------|-----|--------|------|
| 10 | US-22.8 Analytics GA4 (RGPD) | F3 | 5 | Should | 12 |
| 11 | US-22.12 OG image v2 (marketing) | F2 | 2 | Should | 10 |
| 12 | US-18.7a Infra pages maturite + 2 pages pilotes | E18+ | 6 | Should | 15 |

### Changements refinement v2

| Decision | Justification |
|----------|---------------|
| **US-22.4 SUPPRIMEE** | Eclatee : FAQ schema → US-22.10, BreadcrumbList → US-22.7 (vertical slicing) |
| **US-22.9 re-estimee 3→2 pts** | About.tsx a deja la structure, seuls les contenus i18n + lien LinkedIn changent |
| **US-22.11 re-estimee 5→3 pts** | Apres audit : heading hierarchy deja correcte (1 H1, H2 par section), ne reste que les answer capsules dans les traductions |
| **US-22.11 avancee Sprint 12→11** | Capacite disponible apres re-estimation — complete le volet GEO content |
| **US-22.8 reste Sprint 12** | Necessite cookie banner (scope RGPD) — decouplage volontaire |

**Epic E22 : 33 pts — Sprint 10 DONE (13), Sprint 11 DONE (13), Sprint 12 (7 = US-22.8 + US-22.12)**
**Epic E18+ : 6 pts Sprint 12 (US-18.7a) — debut de l'Epic pages maturite**
**Sprint 12 total : 13 pts**

---

## Sprint Planning

### Sprint 10 — "Visible par les machines" (13 pts) — ✅ DONE

```
SPRINT GOAL : Rendre WaS identifiable et citable par Google et les moteurs AI
grace au structured data et aux meta-tags sociaux.
```

| Story | Pts | Statut |
|-------|-----|--------|
| US-22.6 Sitemap + robots AI | 2 | ✅ |
| US-22.1 Schema Organization | 3 | ✅ |
| US-22.5 Twitter Cards + og:image | 3 | ✅ |
| US-22.2 Schema Person | 2 | ✅ |
| US-22.3 Schema Service | 3 | ✅ |

**Velocite mesuree : 13 pts / sprint**

### Sprint 11 — "Credible et citable" (13 pts)

```
SPRINT GOAL : Donner au site le contenu structure (FAQ, breadcrumbs, E-E-A-T)
qui permet aux moteurs AI de citer WaS et aux prospects de valider sa credibilite.
```

| # | Story | Pts | Commit scope |
|---|-------|-----|--------------|
| 1 | US-22.10 FAQ section + FAQPage JSON-LD | 5 | feat(seo) |
| 2 | US-22.7 Breadcrumbs UI + BreadcrumbList JSON-LD | 3 | feat(seo) |
| 3 | US-22.9 About enrichi E-E-A-T | 2 | feat(about) |
| 4 | US-22.11 HTML semantique + answer capsules | 3 | refactor(i18n) |

**Capacite : 13 pts = velocite Sprint 10. Taux engagement : 100%.**

**Ordre d'implementation :**
1. US-22.10 (FAQ) d'abord — plus gros morceau, independant
2. US-22.7 (Breadcrumbs) — independant, pages secondaires
3. US-22.9 (About) — enrichissement i18n, peu de code
4. US-22.11 (Answer capsules) — purement i18n, zero composant nouveau

**Strategie de commit :** 1 commit par story (retro Sprint 10 action item)

### Sprint 12 — "Mesurer et convertir" (13 pts)

```
SPRINT GOAL : Instrumenter le site pour mesurer l'impact SEO/GEO,
professionnaliser le partage social, et poser les fondations des pages
de contenu SEO par niveau de maturite.
```

| # | Story | Epic | Pts | Commit scope |
|---|-------|------|-----|--------------|
| 1 | US-22.8 Analytics GA4 (RGPD) | E22 | 5 | feat(seo) |
| 2 | US-22.12 OG image v2 (marketing) | E22 | 2 | feat(seo) |
| 3 | US-18.7a Infra pages maturite + 2 premieres pages | E18+ | 6 | feat(seo) |

**Capacite : 13 pts = velocite mesuree. Taux engagement : 100%.**
**GA4 Measurement ID : G-P37MDYJ5M8 (fourni par stakeholder)**

**Strategie de commit :** 1 commit par story

---

## Architecture technique

### Sprint 10 — LIVRE ✅

```
src/
  components/seo/
    JsonLd.tsx                    # ✅ Composant generique JSON-LD (serveur)
    StructuredData.tsx            # ✅ Agregateur Org + Person + Services
    __tests__/schema.test.ts     # ✅ 25 tests schema compliance
    __tests__/sitemap-robots.test.ts  # ✅ 8 tests sitemap/robots
  config/
    schema.ts                    # ✅ Donnees Organization, Person, Service slugs
  app/
    robots.ts                    # ✅ 6 rules (wildcard + 5 AI crawlers)
    sitemap.ts                   # ✅ 3 routes bilingues + x-default
    [locale]/layout.tsx          # ✅ og:image, twitter:card, StructuredData
  public/images/og-default.png   # ✅ 1200x630 branded
```

### Sprint 11 — A CREER

```
src/
  components/
    sections/
      FAQ.tsx                    # Section FAQ visible + FAQPage JSON-LD
    ui/
      Breadcrumb.tsx             # Fil d'Ariane + BreadcrumbList JSON-LD
    sections/
      About.tsx                  # Enrichi : lien LinkedIn, stats
  config/
    navigation.ts                # + breadcrumb page map
  messages/
    fr.json                      # + namespace "faq", answer capsules enrichis
    en.json                      # + namespace "faq", answer capsules enrichis
  app/[locale]/
    page.tsx                     # + <FAQ /> insere entre About et Contact
    quiz/page.tsx                # + <Breadcrumb />
    mentions-legales/page.tsx    # + <Breadcrumb />
```

### Sprint 12 — PLANIFIE

```
src/
  lib/analytics.ts               # Helper GA4 events
  components/ui/CookieBanner.tsx  # Consentement RGPD
```

---

*E22-SEO-GEO-BACKLOG.md — v2.0 — Refinement Sprint 11 — 09/04/2026*
