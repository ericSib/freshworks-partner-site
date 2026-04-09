# Product Backlog v3 — What A Service

> Mise a jour : 08/04/2026
> Inputs : Charte Graphique, Framework GTM, Fondamentaux Marketing (Santens), Audit Premium Frontend

---

## Product Goal

**Transformer le site What A Service en machine de generation de leads bilingue pour les deux segments — ITSM (Freshservice) et CX (Freshdesk) — en deployant un positionnement "Expert Next Door" calibre sur les principes marketing fondamentaux (proposition de valeur centree client, differenciation par la methode, segmentation ITSM/CX), avec un objectif de +30% conversion contact et +40% engagement.**

---

## Etat d'avancement — Vue synthetique

| Epic | Statut | Stories livrees |
|------|--------|----------------|
| E0 — Design System Premium | DONE | Palette deep/accent/surface, Plus Jakarta Sans, shadows, grain |
| E1 — Animations | DONE | useScrollReveal, AnimateOnScroll, StaggerChildren, TextReveal |
| E2 — Hero Premium | DONE | Hero client-centric ITSM+CX, trust bar, dual CTA |
| E3 — Nouvelles sections GTM | DONE | Process, ClientLogos, FreshworksProducts, TechStack |
| E4 — Contact & Conversion | DONE | Form 4 champs + Resend API + Calendly CTA |
| E5 — Sections existantes | DONE | Problems, Metrics, Services (6 piliers), CaseStudies, About |
| E6 — Navigation Premium | DONE | Scroll spy, progress bar, smooth scroll, mobile menu |
| E7 — Copywriting GTM | DONE | FR/EN natifs, ITSM+CX equilibre, pain-points, power words |
| E8 — Infra & Securite | PARTIEL | Headers securite, error boundaries, Playwright setup |
| E9 — Legal & Conformite | DONE | Mentions legales, RGPD, cookies |
| **E10 — Qualite & Tests** | **BACKLOG** | **Playwright E2E, axe-core, Lighthouse** |
| **E11 — Conversion avancee** | **BACKLOG** | **Lead magnets, blog, SEO pillar-cluster** |
| **E12 — Optimisation perf** | **BACKLOG** | **Core Web Vitals, images, lazy loading** |

---

## EPIC 0-7 — LIVREES (Sprint 1-3 realises)

### Ce qui a ete livre

**Refonte graphique complete :**
- Palette : deep charcoal (#0C1220), accent ambre (#B8926A), surface (#FAFAF8)
- Typographie : Plus Jakarta Sans (headings), DM Sans (body)
- Dark-mode dominant, whitespace luxueux, spring easing, grain 2.2%
- Separateurs fins (1px border-white/5) au lieu de cards bouncy
- 15 composants redesignes

**Reequilibrage narratif ITSM + CX (marketing-driven) :**
- Hero centree client : "Vos services IT et votre support client meritent mieux"
- 4 pain points : 2 ITSM + 2 CX (segmentation par persona)
- 6 services dont Implementation Freshdesk dediee (omnicanal, CSAT, SLA)
- Cas client CX : PME e-commerce B2C (CSAT 62->91%, <2h reponse, -55% L1)
- Produits : "Deux plateformes, un seul partenaire"

**Enrichissements fonctionnels :**
- Section TechStack : EntraID, Intune, AD, M365, GWS, Azure, Jira, GitHub, SAP, Sage, Salesforce, Device42
- ITAM/CMDB/Device42 essaimes dans services, process, case studies
- Certifications DORA & BPM
- Logos uniformises (conteneurs fixes)

**Infrastructure :**
- API `/api/contact` (Resend : notification + confirmation email)
- Page `/mentions-legales` (RGPD, cookies, PI) — FR + EN
- Security headers (CSP, HSTS, X-Frame-Options, Permissions-Policy)
- Error boundaries (error.tsx, global-error.tsx)
- CSP Calendly-ready
- Playwright + axe-core installes
- .env.example documente

**Commits :**
```
285d97e fix: sync main with worktree — apply premium redesign
ffce225 feat: contact form backend (Resend), mentions legales, Calendly CTA
3f7540a chore: restore security headers, error boundaries, Playwright setup
51ddb31 feat(redesign): refonte premium complete — dark theme, ITSM+CX
```

---

## BACKLOG PRIORISE — Prochaines stories

### Priorisation WSJF (Cost of Delay / Job Size)

| # | Story | Epic | Pts | CoD | WSJF | Statut |
|---|-------|------|-----|-----|------|--------|
| 1 | US-10.1 Tests E2E Playwright | E10 | 3 | 8 | 2.7 | READY |
| 2 | US-10.2 Audit accessibilite axe-core | E10 | 3 | 7 | 2.3 | READY |
| 3 | US-12.1 Optimisation images (WebP, blur placeholders) | E12 | 3 | 6 | 2.0 | READY |
| 4 | US-8.1 Configurer Resend en production | E8 | 1 | 9 | 9.0 | BLOCKED (needs domain) |
| 5 | US-11.1 ITSM Maturity Quiz (lead magnet) | E11 | 13 | 8 | 0.6 | BACKLOG |
| 6 | US-11.2 Blog / Ressources (pillar-cluster SEO) | E11 | 13 | 7 | 0.5 | BACKLOG |
| 7 | US-11.3 ROI Calculator (lead magnet) | E11 | 8 | 6 | 0.75 | BACKLOG |
| 8 | US-12.2 Core Web Vitals < seuils "Good" | E12 | 5 | 5 | 1.0 | BACKLOG |

---

## User Stories detaillees — Prochain Sprint

---

### US-10.1 : Tests E2E Playwright — parcours critique

```
En tant que developpeur maintenant le site,
je veux des tests E2E couvrant le parcours visiteur critique,
afin de detecter les regressions avant chaque deploiement.
```

**Criteres d'acceptation :**

```
Scenario : Navigation complete
  Etant donne le site charge sur /fr
  Quand le visiteur clique sur chaque lien de navigation
  Alors la section correspondante est visible dans le viewport

Scenario : Formulaire contact — happy path
  Etant donne le formulaire de contact
  Quand le visiteur remplit les 4 champs et soumet
  Alors le message de succes s'affiche
    ET le bouton Calendly est visible

Scenario : Formulaire contact — validation
  Etant donne le formulaire vide
  Quand le visiteur clique "Envoyer"
  Alors les messages d'erreur inline s'affichent sous chaque champ

Scenario : Responsive mobile
  Etant donne un viewport 375x812
  Quand le site est charge
  Alors le menu hamburger est visible
    ET toutes les sections sont lisibles sans scroll horizontal

Scenario : Changement de langue
  Etant donne le site en /fr
  Quand le visiteur clique "EN"
  Alors le site passe en /en avec le contenu traduit
```

**Estimation :** 3 points
**DoR :** Tests skeleton deja presents dans `/tests/e2e/`
**Fichiers :** `tests/e2e/homepage.spec.ts`, `tests/e2e/contact-form.spec.ts`, `tests/e2e/navigation.spec.ts`, `tests/e2e/responsive.spec.ts`, `tests/e2e/language-switch.spec.ts`

---

### US-10.2 : Audit accessibilite axe-core

```
En tant que visiteur en situation de handicap,
je veux que le site soit conforme WCAG 2.1 AA,
afin de naviguer et interagir avec le contenu sans barriere.
```

**Criteres d'acceptation :**

```
Scenario : Zero violation critique
  Etant donne un scan axe-core de la homepage
  Quand l'audit est execute
  Alors il n'y a aucune violation de niveau "critical" ou "serious"

Scenario : Navigation clavier
  Etant donne le site charge
  Quand le visiteur navigue uniquement au clavier (Tab, Enter, Escape)
  Alors tous les liens, boutons et champs sont atteignables
    ET le focus est visible (outline contrastee)

Scenario : Contrastes texte
  Etant donne le design dark theme
  Quand les textes sont analyses
  Alors le ratio de contraste est >= 4.5:1 pour le body text
    ET >= 3:1 pour les textes larges (headings)
```

**Estimation :** 3 points
**Fichiers :** `tests/e2e/accessibility.spec.ts`, `tests/e2e/keyboard-nav.spec.ts`

---

### US-12.1 : Optimisation images — WebP + blur placeholders

```
En tant que visiteur sur connexion lente,
je veux que les images chargent rapidement avec un apercu flou,
afin de ne pas percevoir de latence visuelle.
```

**Criteres d'acceptation :**

```
Scenario : Logos clients en format optimise
  Etant donne les 7 logos clients
  Quand ils sont charges
  Alors ils sont au format WebP (< 10Ko chacun)
    ET ont des dimensions uniformes

Scenario : Photo Eric Sib avec blur placeholder
  Etant donne la section About
  Quand l'image se charge
  Alors un placeholder blur (blurDataURL) s'affiche immediatement
    ET l'image finale se substitue avec un fade (300ms)

Scenario : LCP impact
  Etant donne la homepage
  Quand Lighthouse est execute
  Alors le LCP est < 2.5s sur une connexion 4G
```

**Estimation :** 3 points
**Fichiers :** `public/images/`, composants utilisant `<Image>`

---

### US-8.1 : Configuration Resend production

```
En tant qu'operateur du site,
je veux que le formulaire de contact envoie de vrais emails en production,
afin de recevoir les leads et confirmer automatiquement aux prospects.
```

**Criteres d'acceptation :**

```
Scenario : Email de notification
  Etant donne un prospect qui soumet le formulaire
  Quand le serveur traite la requete
  Alors un email est envoye a contact@whataservice.fr
    avec nom, email, entreprise, challenge du prospect

Scenario : Email de confirmation
  Etant donne un prospect qui soumet le formulaire
  Quand le serveur traite la requete
  Alors un email de confirmation est envoye au prospect
    avec un lien Calendly pour reserver un creneau

Scenario : Domaine verifie
  Etant donne Resend configure
  Quand un email est envoye
  Alors il part de noreply@whataservice.fr (domaine verifie, pas de spam)
```

**Estimation :** 1 point
**Statut :** BLOCKED — necessite verification du domaine whataservice.fr dans Resend
**Pre-requis :** Acces DNS du domaine, compte Resend cree

---

## Sprint propose — Sprint 4 : "Qualite & Production-readiness"

**Sprint Goal :** Le site est testable automatiquement, accessible, et le formulaire fonctionne en production.

| Story | Points | Statut |
|-------|--------|--------|
| US-10.1 Tests E2E Playwright | 3 | READY |
| US-10.2 Audit accessibilite axe-core | 3 | READY |
| US-12.1 Optimisation images | 3 | READY |
| US-8.1 Config Resend production | 1 | BLOCKED |
| **Total** | **10** | |

---

## Backlog lointain (COULD / WON'T this cycle)

### COULD HAVE — Phase 2

| Story | Points | Description |
|-------|--------|-------------|
| US-11.1 ITSM Maturity Quiz | 13 | Lead magnet interactif (conversion 20-40%) — page dediee |
| US-11.2 Blog / Ressources | 13 | Architecture pillar-cluster SEO bilingue — 5 piliers |
| US-11.3 ROI Calculator | 8 | Calculateur interactif (conversion 8.3%) — page dediee |
| US-12.2 Core Web Vitals | 5 | Audit Lighthouse complet, seuils "Good" |
| Services page dediee | 8 | Page individuelle par service avec tiers (QuickStart/Pro/Enterprise) |
| Pricing page | 5 | Grille tarifaire 3 tiers avec ancrage prix |

### WON'T HAVE (hors scope)

- CMS headless / WordPress migration
- Chatbot / widget IA embarque
- E-commerce / paiement en ligne
- Application mobile
- Managed services portal (espace client)

---

## Definition of Done — Rappel

Chaque story livree DOIT satisfaire :

- [ ] Code compile sans erreur (`npm run build` passe)
- [ ] Linting passe (`npm run lint`)
- [ ] Tests E2E passants (quand US-10.1 livree)
- [ ] Contenu bilingue FR + EN
- [ ] Responsive verifie (mobile 375px + desktop 1440px)
- [ ] Commit conventionnel : `type(scope): description`
- [ ] Aucun secret hardcode

---

*Backlog v3 — 08/04/2026*
*Product Goal : machine de leads bilingue ITSM + CX*
*Livres : 40+ story points (Epics 0-7, 9)*
*Prochain sprint : 10 points (qualite, accessibilite, images, production)*
*Total backlog restant : ~70 points (dont 39 COULD phase 2)*
