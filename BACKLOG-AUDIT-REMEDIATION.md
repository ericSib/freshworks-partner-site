# Product Backlog v4 — Remediation Audit Dev + QA

> **Date** : 09/04/2026
> **Methode** : 3 Amigos (PO + Dev + QA)
> **Inputs** : Audit complet Dev + QA du 09/04/2026 (score global B — 70/100)
> **Objectif** : Passer de B (70/100) a A- (85/100)

---

## Product Goal (inchange)

**Transformer le site What A Service en machine de generation de leads bilingue ITSM + CX, avec un objectif de +30% conversion contact et +40% engagement.**

### Sous-objectif Qualite (nouveau)

```
QUALITY GOAL : Securiser, tester et industrialiser le site WaS
pour atteindre un niveau production-grade (score audit >= 85/100),
avec 0 vulnerabilite critique, >70% couverture tests, et un pipeline CI operationnel,
d'ici 2 sprints (2 semaines).
```

---

## Voix des 3 Amigos

| Role | Perspective | Priorite |
|------|-------------|----------|
| **PO** | Proteger les leads : un formulaire spamme = leads pollues dans HubSpot. Un site casse = 0 conversion. La qualite EST le business value. | Securite API > Tests > CI |
| **Dev** | Les fondations sont saines. Les corrections sont chirurgicales, pas de refonte. Vitest s'integre en <1h. Le rate limiting est le plus urgent techniquement. | Rate limit > Zod > Vitest > GH Actions |
| **QA** | 0 test unitaire = aucun filet de securite. Les tests E2E existent mais ne tournent jamais en CI. Les data-testid manquants cassent la suite E2E. | data-testid > Vitest > CI pipeline > a11y fixes |

### Consensus 3 Amigos — Ordre d'attaque

1. **Sprint 5** : Securiser + Tester (fondations qualite)
2. **Sprint 6** : Industrialiser + Nettoyer (CI/CD + dette technique)

---

## Epics de remediation

| Epic | Theme | Issues audit couvertes | Stories |
|------|-------|----------------------|---------|
| **E13** | Securite API | S1, S5, S6 | 3 US |
| **E14** | Testabilite & Couverture | T1, T2, T7, C4 | 5 US |
| **E15** | Pipeline CI/CD | D1, D2, D5 | 3 US |
| **E16** | Performance & Assets | P1, P2 | 2 US |
| **E17** | Nettoyage dette technique | A1, A2, C1, C7, S4 | 3 US |

---

## Priorisation WSJF

| # | Story | Epic | Pts | Business Value | Time Criticality | Risk/Opportunity | CoD | Job Size | **WSJF** | MoSCoW |
|---|-------|------|-----|----------------|------------------|------------------|-----|----------|----------|--------|
| 1 | US-13.1 Rate limiting API | E13 | 2 | 9 | 9 | 9 | 27 | 2 | **13.5** | Must |
| 2 | US-13.2 Validation Zod | E13 | 3 | 8 | 8 | 9 | 25 | 3 | **8.3** | Must |
| 3 | US-14.1 data-testid + a11y form | E14 | 2 | 7 | 8 | 7 | 22 | 2 | **11.0** | Must |
| 4 | US-14.2 Setup Vitest | E14 | 2 | 8 | 7 | 8 | 23 | 2 | **11.5** | Must |
| 5 | US-14.3 Tests unitaires hooks | E14 | 5 | 8 | 6 | 8 | 22 | 5 | **4.4** | Must |
| 6 | US-14.4 Tests integration API | E14 | 3 | 8 | 7 | 8 | 23 | 3 | **7.7** | Must |
| 7 | US-13.3 Honeypot anti-spam | E13 | 2 | 6 | 5 | 7 | 18 | 2 | **9.0** | Should |
| 8 | US-15.1 GitHub Actions CI | E15 | 3 | 9 | 7 | 8 | 24 | 3 | **8.0** | Must |
| 9 | US-15.2 Branch protection | E15 | 1 | 7 | 5 | 7 | 19 | 1 | **19.0** | Must |
| 10 | US-14.5 Tests a11y contrast | E14 | 2 | 6 | 4 | 6 | 16 | 2 | **8.0** | Should |
| 11 | US-16.1 Migration images locales | E16 | 3 | 7 | 5 | 6 | 18 | 3 | **6.0** | Should |
| 12 | US-15.3 lint-staged pre-commit | E15 | 1 | 4 | 3 | 3 | 10 | 1 | **10.0** | Should |
| 13 | US-16.2 Grain texture perf | E16 | 1 | 3 | 2 | 3 | 8 | 1 | **8.0** | Could |
| 14 | US-17.1 Cleanup Button.tsx mort | E17 | 1 | 2 | 1 | 2 | 5 | 1 | **5.0** | Could |
| 15 | US-17.2 Fix useReducedMotion | E17 | 2 | 3 | 2 | 4 | 9 | 2 | **4.5** | Could |
| 16 | US-17.3 CSP + Calendly CSS | E17 | 2 | 5 | 3 | 5 | 13 | 2 | **6.5** | Should |

---

## Definition of Ready (DoR) — Cycle Remediation

- [x] Issue audit referencee (code S1, T1, D1, etc.)
- [x] User Story au format standard (role + action + benefice)
- [x] 3-5 criteres d'acceptation Given/When/Then
- [x] Estimee en story points (Fibonacci)
- [x] Fichiers impactes identifies
- [x] Pas de dependance bloquante non resolue
- [x] Perspective QA : criteres de test automatisable identifies

---

## Definition of Done (DoD) — Cycle Remediation

### Code Quality
- [ ] `npm run build` passe sans erreur
- [ ] `npm run lint` passe sans warning
- [ ] TypeScript strict — 0 erreur de type
- [ ] Patterns architecturaux existants respectes (config centralisee, hooks custom)

### Testing (RENFORCE)
- [ ] Tests unitaires ecrits ET passants pour le nouveau code
- [ ] Couverture >= 80% sur les fichiers modifies
- [ ] Tests E2E existants toujours passants (non-regression)
- [ ] Criteres d'acceptation Gherkin verifiables par les tests

### Securite
- [ ] 0 secret hardcode
- [ ] Input validation sur toute donnee externe
- [ ] Headers de securite maintenus (CSP, HSTS, X-Frame-Options)

### Deploiement
- [ ] Preview deployment Vercel fonctionnel
- [ ] 0 erreur console en production
- [ ] Commit conventionnel : `type(scope): description`

---

# EPIC 13 — Securite API

> **Objectif** : Proteger le formulaire de contact contre les abus (spam, injection, payloads malveillants).
> **Issues audit** : S1 (pas de validation schema), S5 (pas de rate limiting), S6 (pas de CSRF/honeypot)

---

## US-13.1 : Rate limiting sur l'API contact

**Ref audit** : S5 (Critique)

```
En tant qu'operateur du site WaS,
je veux que l'API /api/contact soit protegee par un rate limiter,
afin d'empecher les bots de spammer le formulaire
et de polluer mon CRM HubSpot avec des leads fictifs.
```

### Criteres d'acceptation

```gherkin
Scenario : Requetes normales acceptees
  Etant donne un visiteur legitime
  Quand il soumet le formulaire 1 fois
  Alors la requete est acceptee (200 OK)
    ET l'email est envoye
    ET le contact HubSpot est cree

Scenario : Rate limit atteint
  Etant donne une meme IP qui a deja soumis 5 requetes en 15 minutes
  Quand elle soumet une 6eme requete
  Alors la reponse est 429 Too Many Requests
    ET le body contient { "error": "Too many requests" }
    ET aucun email n'est envoye

Scenario : Message utilisateur convivial
  Etant donne un visiteur qui recoit un 429
  Quand le formulaire affiche l'erreur
  Alors le message est "Trop de tentatives. Reessayez dans quelques minutes."
    ET le formulaire reste rempli (pas de perte de donnees)
```

**Story Points** : 2
**MoSCoW** : Must
**WSJF** : 13.5

### Perspective Dev
- Approche : rate limiter in-memory (Map<IP, timestamps>) pour MVP, migration Upstash Redis si besoin de persistence
- Fichiers : `src/app/api/contact/route.ts`, nouveau `src/lib/rate-limit.ts`
- Risque : Vercel serverless = stateless, le Map se reset a chaque cold start. Acceptable pour MVP (limite les rafales), Upstash pour robustesse

### Perspective QA
- Test unitaire : `rate-limit.test.ts` — simuler N requetes, verifier le seuil
- Test integration : `POST /api/contact` x6 en boucle rapide, verifier 429 a la 6eme
- Edge case : IP undefined (proxy), requetes simultanees

### Tasks
- [ ] T1: Creer `src/lib/rate-limit.ts` (sliding window, 5 req/15 min par IP)
- [ ] T2: Integrer dans `route.ts` — extraire IP depuis headers
- [ ] T3: Gerer le 429 cote client dans `useContactForm.ts`
- [ ] T4: Ecrire tests unitaires (`rate-limit.test.ts`)
- [ ] T5: Ecrire test integration API

---

## US-13.2 : Validation de schema Zod sur l'API contact

**Ref audit** : S1 (Critique)

```
En tant que developpeur maintenant l'API,
je veux valider les payloads entrants avec un schema Zod,
afin de rejeter les donnees malformees, trop longues ou potentiellement malveillantes
avant tout traitement (email, CRM).
```

### Criteres d'acceptation

```gherkin
Scenario : Payload valide accepte
  Etant donne un payload { name: "Jean Dupont", email: "jean@acme.fr", company: "Acme", challenge: "adoption" }
  Quand il est soumis a POST /api/contact
  Alors la requete est acceptee (200 OK)

Scenario : Champ manquant rejete
  Etant donne un payload sans le champ "company"
  Quand il est soumis
  Alors la reponse est 400 Bad Request
    ET le body contient { "error": "Validation failed", "details": [...] }

Scenario : Email malformed rejete
  Etant donne un payload avec email: "pas-un-email"
  Quand il est soumis
  Alors la reponse est 400
    ET le detail mentionne "Invalid email format"

Scenario : Champ trop long rejete
  Etant donne un payload avec name: "A".repeat(1000)
  Quand il est soumis
  Alors la reponse est 400
    ET le detail mentionne la limite de caracteres

Scenario : Challenge hors enum rejete
  Etant donne un payload avec challenge: "sql_injection_attempt"
  Quand il est soumis
  Alors la reponse est 400
    ET le detail mentionne les valeurs autorisees
```

**Story Points** : 3
**MoSCoW** : Must
**WSJF** : 8.3

### Perspective Dev
- Ajouter `zod` comme dependance (tree-shakeable, 0 impact bundle client)
- Schema partage : definir dans `src/lib/validation.ts`, reutiliser cote client (optionnel)
- Limites : name 100 chars, email 254 chars (RFC), company 200 chars, challenge enum des CHALLENGE_KEYS
- Fichiers : `src/lib/validation.ts`, `src/app/api/contact/route.ts`

### Perspective QA
- Tests unitaires pour le schema Zod (valid, invalid, edge cases)
- Tests integration : chaque scenario Gherkin = 1 test
- Mutation testing : verifier que les contraintes ne sont pas bypassables

### Tasks
- [ ] T1: `npm install zod`
- [ ] T2: Definir le schema `contactFormSchema` dans `src/lib/validation.ts`
- [ ] T3: Integrer la validation dans `route.ts` (remplacer les checks manuels)
- [ ] T4: Retourner les erreurs Zod formatees (400 + details)
- [ ] T5: Ecrire tests unitaires schema (`validation.test.ts`)
- [ ] T6: Ecrire tests integration API

---

## US-13.3 : Honeypot anti-spam sur le formulaire

**Ref audit** : S6 (Haute)

```
En tant qu'operateur du site,
je veux un champ honeypot invisible dans le formulaire,
afin de filtrer les soumissions de bots simples
sans degrader l'experience utilisateur.
```

### Criteres d'acceptation

```gherkin
Scenario : Visiteur humain — honeypot vide
  Etant donne un visiteur qui remplit le formulaire normalement
  Quand il soumet
  Alors le champ honeypot est vide
    ET la soumission est traitee normalement

Scenario : Bot — honeypot rempli
  Etant donne un bot qui remplit tous les champs y compris le honeypot
  Quand il soumet
  Alors la reponse est 200 OK (pas d'indice au bot)
    MAIS aucun email n'est envoye
    ET aucun contact HubSpot n'est cree

Scenario : Accessibilite du honeypot
  Etant donne un lecteur d'ecran
  Quand il parcourt le formulaire
  Alors le champ honeypot est invisible (aria-hidden, tabindex=-1)
    ET il n'est pas annonce par le lecteur d'ecran
```

**Story Points** : 2
**MoSCoW** : Should
**WSJF** : 9.0

### Perspective Dev
- Champ `<input name="website" tabindex="-1" aria-hidden="true" autocomplete="off">` cache en CSS (`position: absolute; left: -9999px`)
- Verification cote serveur dans `route.ts` : si `body.website` non vide → silently reject
- Fichiers : `src/components/sections/Contact.tsx`, `src/app/api/contact/route.ts`

### Perspective QA
- Test E2E : verifier que le champ est invisible visuellement et pour les lecteurs d'ecran
- Test integration : soumettre avec honeypot rempli → verifier 200 mais pas d'email
- Test a11y : axe-core ne doit pas reporter le champ cache comme erreur

### Tasks
- [ ] T1: Ajouter le champ honeypot dans `Contact.tsx` (cache, aria-hidden)
- [ ] T2: Verifier cote serveur dans `route.ts`
- [ ] T3: Ecrire test integration (honeypot filled → silent reject)
- [ ] T4: Ecrire test a11y (champ invisible pour lecteurs d'ecran)

---

# EPIC 14 — Testabilite & Couverture

> **Objectif** : Passer de 0% a >70% couverture tests unitaires, corriger les tests E2E casses, et renforcer l'accessibilite du formulaire.
> **Issues audit** : T1 (0 test unitaire), T2 (0 test integration), T7 (data-testid manquants), C4 (labels non associes)

---

## US-14.1 : Corriger l'accessibilite du formulaire + data-testid

**Ref audit** : C4 (Critique), T7 (Haute)

```
En tant que visiteur utilisant un lecteur d'ecran,
je veux que chaque champ du formulaire soit correctement associe a son label,
afin de comprendre quel champ je remplis sans voir l'ecran.
```

```
En tant que testeur E2E automatise,
je veux que les composants aient des data-testid stables,
afin que ma suite Playwright puisse localiser les elements de maniere fiable.
```

### Criteres d'acceptation

```gherkin
Scenario : Labels associes aux inputs
  Etant donne le formulaire de contact
  Quand un lecteur d'ecran le parcourt
  Alors chaque input a un attribut id unique
    ET chaque label a un attribut for pointant vers l'id correspondant
    ET les erreurs sont liees via aria-describedby

Scenario : aria-invalid sur erreur
  Etant donne un champ en erreur apres soumission
  Quand le formulaire est re-rendu
  Alors le champ a aria-invalid="true"
    ET le message d'erreur a role="alert"

Scenario : data-testid presents
  Etant donne les composants Header, sections, et formulaire
  Quand le DOM est inspecte
  Alors les elements suivants ont un data-testid :
    - header: "desktop-nav", "mobile-nav", "mobile-menu"
    - sections: "problems", "client-logos", "metrics", "process", "freshworks-products"
    - form: "contact-name", "contact-email", "contact-company", "contact-challenge"

Scenario : Tests E2E passants
  Etant donne la suite Playwright existante
  Quand elle est executee
  Alors tous les selecteurs du Page Object Model trouvent leurs elements
    ET les tests homepage.spec.ts passent sans modification
```

**Story Points** : 2
**MoSCoW** : Must
**WSJF** : 11.0

### Perspective Dev
- Ajouter `id` + `htmlFor` dans `Contact.tsx` (4 champs)
- Ajouter `aria-invalid`, `aria-describedby`, `role="alert"` sur les erreurs
- Ajouter `data-testid` dans : `Header.tsx` (nav desktop, nav mobile, menu mobile), `Problems.tsx`, `ClientLogos.tsx`, `Metrics.tsx`, `Process.tsx`, `FreshworksProducts.tsx`

### Perspective QA
- Verifier avec axe-core que les violations "label" disparaissent
- Relancer toute la suite E2E — 0 failure attendu
- Test keyboard-nav : Tab traverse tous les champs dans l'ordre logique

### Tasks
- [ ] T1: Ajouter `id` + `htmlFor` + `aria-describedby` dans `Contact.tsx`
- [ ] T2: Ajouter `aria-invalid` + `role="alert"` sur les erreurs
- [ ] T3: Ajouter `data-testid` dans `Header.tsx`
- [ ] T4: Ajouter `data-testid` dans les 5 sections manquantes
- [ ] T5: Relancer la suite E2E complete — verifier 0 failure

---

## US-14.2 : Setup Vitest + premier test unitaire

**Ref audit** : T1 (Critique)

```
En tant que developpeur,
je veux configurer Vitest comme framework de tests unitaires,
afin d'avoir un filet de securite rapide pour valider la logique metier
sans lancer un navigateur.
```

### Criteres d'acceptation

```gherkin
Scenario : Vitest installe et configure
  Etant donne le projet
  Quand `npm run test` est execute
  Alors Vitest demarre et cherche les fichiers *.test.ts
    ET la configuration inclut le path alias @/ vers src/

Scenario : Premier test passant
  Etant donne le fichier src/lib/validation.ts
  Quand le test validation.test.ts est execute
  Alors EMAIL_REGEX accepte "user@example.com"
    ET EMAIL_REGEX rejette "not-an-email"
    ET EMAIL_REGEX rejette "" (vide)
    ET EMAIL_REGEX rejette "user@" (incomplet)

Scenario : Script npm disponible
  Etant donne package.json
  Quand on lit les scripts
  Alors "test" lance vitest
    ET "test:coverage" lance vitest avec couverture
```

**Story Points** : 2
**MoSCoW** : Must
**WSJF** : 11.5

### Perspective Dev
- `npm install -D vitest @vitejs/plugin-react` (minimal)
- Config : `vitest.config.ts` avec alias `@/` → `./src/`
- Fichier test : `src/lib/__tests__/validation.test.ts`

### Perspective QA
- Verifier que le coverage reporter fonctionne (text + lcov pour CI)
- Le test de validation.ts est le smoke test du framework

### Tasks
- [ ] T1: `npm install -D vitest`
- [ ] T2: Creer `vitest.config.ts` avec alias
- [ ] T3: Ajouter scripts "test" et "test:coverage" dans package.json
- [ ] T4: Ecrire `src/lib/__tests__/validation.test.ts`
- [ ] T5: Verifier que `npm run test` passe

---

## US-14.3 : Tests unitaires des hooks et utilitaires

**Ref audit** : T1 (Critique)

```
En tant que developpeur refactorant un hook,
je veux des tests unitaires couvrant la logique metier des hooks et utilitaires,
afin de detecter les regressions sans lancer l'application complete.
```

### Criteres d'acceptation

```gherkin
Scenario : useContactForm — validation
  Etant donne le hook useContactForm
  Quand le formulaire est soumis avec un email invalide
  Alors errors.email contient le message d'erreur
    ET formState reste "idle"

Scenario : useContactForm — soumission reussie
  Etant donne le hook useContactForm avec un fetch mocke (200)
  Quand le formulaire est soumis avec des donnees valides
  Alors formState passe de "idle" a "sending" puis "success"
    ET submittedData contient le nom et l'email

Scenario : useContactForm — erreur serveur
  Etant donne le hook useContactForm avec un fetch mocke (500)
  Quand le formulaire est soumis
  Alors formState passe a "error"

Scenario : hubspot.ts — splitName
  Etant donne "Jean Dupont"
  Quand splitName est appele
  Alors firstname = "Jean" ET lastname = "Dupont"

Scenario : hubspot.ts — splitName prenom seul
  Etant donne "Jean"
  Quand splitName est appele
  Alors firstname = "Jean" ET lastname = ""

Scenario : hubspot.ts — buildProperties
  Etant donne un payload contact complet
  Quand buildProperties est appele
  Alors les proprietes HubSpot sont correctement mappees
    ET hs_lead_status = "NEW"
    ET lifecyclestage = "lead"

Scenario : Couverture
  Etant donne les fichiers testes
  Quand vitest --coverage est execute
  Alors la couverture sur hooks/ et lib/ est >= 80%
```

**Story Points** : 5
**MoSCoW** : Must
**WSJF** : 4.4

### Perspective Dev
- Hooks React : utiliser `@testing-library/react` + `renderHook`
- HubSpot : exporter `splitName` et `buildProperties` pour test direct (actuellement fonctions privees → les rendre exportables ou tester via `upsertHubSpotContact` mocke)
- Mock fetch global pour les tests de soumission

### Perspective QA
- Couvrir les edge cases : nom vide, email avec caracteres speciaux, challenge non-enum
- Mutation testing sur la validation : chaque regex/condition doit etre tuee

### Tasks
- [ ] T1: `npm install -D @testing-library/react @testing-library/dom jsdom`
- [ ] T2: Configurer vitest avec environment jsdom pour les hooks
- [ ] T3: Ecrire `src/hooks/__tests__/useContactForm.test.ts`
- [ ] T4: Exporter `splitName`/`buildProperties` de hubspot.ts + ecrire `src/lib/__tests__/hubspot.test.ts`
- [ ] T5: Ecrire `src/hooks/__tests__/useScrollReveal.test.ts` (mock IntersectionObserver)
- [ ] T6: Verifier couverture >= 80% sur hooks/ et lib/

---

## US-14.4 : Tests d'integration API

**Ref audit** : T2 (Haute)

```
En tant que developpeur deplorant une modification de l'API,
je veux des tests d'integration pour les routes /api/contact et /api/health,
afin de verifier le comportement end-to-end de l'API sans navigateur.
```

### Criteres d'acceptation

```gherkin
Scenario : GET /api/health retourne 200
  Etant donne le serveur demarre
  Quand GET /api/health est appele
  Alors status = 200
    ET body contient { status: "ok", timestamp: string, version: string }

Scenario : POST /api/contact — payload valide (mode dev)
  Etant donne RESEND_API_KEY non defini
  Quand POST /api/contact est appele avec un payload valide
  Alors status = 200
    ET body contient { success: true }

Scenario : POST /api/contact — champs manquants
  Etant donne un payload sans "email"
  Quand POST /api/contact est appele
  Alors status = 400
    ET body contient { error: "..." }

Scenario : POST /api/contact — email invalide
  Etant donne un payload avec email = "invalid"
  Quand POST /api/contact est appele
  Alors status = 400
```

**Story Points** : 3
**MoSCoW** : Must
**WSJF** : 7.7

### Perspective Dev
- Tester les route handlers Next.js en les important directement
- Mock : `process.env` pour controler RESEND_API_KEY et HUBSPOT_ACCESS_TOKEN
- Fichiers : `src/app/api/__tests__/contact.test.ts`, `src/app/api/__tests__/health.test.ts`

### Perspective QA
- Chaque scenario Gherkin = 1 test
- Verifier les codes HTTP exacts (200, 400, 429, 500)
- Verifier la structure du JSON de reponse

### Tasks
- [ ] T1: Ecrire `src/app/api/__tests__/health.test.ts`
- [ ] T2: Ecrire `src/app/api/__tests__/contact.test.ts` (4 scenarios)
- [ ] T3: Mock Resend + HubSpot dans les tests
- [ ] T4: Verifier que `npm run test` inclut les tests API

---

## US-14.5 : Corriger les contrastes a11y desactives dans les tests

**Ref audit** : T5 (Basse)

```
En tant que visiteur malvoyant,
je veux que tous les textes du site respectent les ratios de contraste WCAG 2.1 AA,
afin de lire le contenu confortablement.
```

### Criteres d'acceptation

```gherkin
Scenario : Contrastes sur fond sombre (deep)
  Etant donne les sections sur fond #0C1220
  Quand les textes sont analyses
  Alors text-slate-400 (#94A3B8) sur bg-deep = ratio >= 4.5:1
    ET text-red-400 (erreurs) sur bg-deep = ratio >= 4.5:1

Scenario : Contrastes menu mobile
  Etant donne le menu mobile ouvert
  Quand les liens sont analyses
  Alors text-surface/80 sur bg-deep = ratio >= 4.5:1

Scenario : Tests axe-core sans exclusion
  Etant donne les tests accessibility.spec.ts
  Quand ils sont executes
  Alors color-contrast n'est plus desactive (.disableRules supprime)
    ET 0 violation critical ou serious
```

**Story Points** : 2
**MoSCoW** : Should
**WSJF** : 8.0

### Tasks
- [ ] T1: Auditer les ratios de contraste actuels (outil DevTools)
- [ ] T2: Ajuster les couleurs (slate-400 → slate-300 si besoin, red-400 → red-300)
- [ ] T3: Supprimer `disableRules(["color-contrast"])` des tests
- [ ] T4: Relancer axe-core — 0 violation

---

# EPIC 15 — Pipeline CI/CD

> **Objectif** : Automatiser l'execution des tests et proteger la branche main.
> **Issues audit** : D1 (pas de CI), D2 (pas de branch protection), D5 (pre-commit lent)

---

## US-15.1 : Pipeline GitHub Actions

**Ref audit** : D1 (Critique)

```
En tant que developpeur poussant du code,
je veux qu'un pipeline CI execute automatiquement les lints, type-checks et tests,
afin de ne jamais merger du code casse sur main.
```

### Criteres d'acceptation

```gherkin
Scenario : CI declenchee sur push et PR
  Etant donne un push sur n'importe quelle branche ou une PR vers main
  Quand le pipeline CI demarre
  Alors les etapes suivantes sont executees dans l'ordre :
    1. Install (npm ci)
    2. Lint (npm run lint)
    3. Type-check (npx tsc --noEmit)
    4. Tests unitaires (npm run test)
    5. Build (npm run build)

Scenario : CI verte — PR mergeable
  Etant donne tous les checks CI passants
  Quand le developpeur consulte la PR
  Alors le badge CI est vert
    ET le bouton Merge est actif

Scenario : CI rouge — merge bloque
  Etant donne un test qui echoue
  Quand le developpeur consulte la PR
  Alors le badge CI est rouge
    ET le bouton Merge est desactive (branch protection)

Scenario : Cache npm
  Etant donne les node_modules caches
  Quand la CI s'execute une 2eme fois sans changement de dependencies
  Alors l'install est quasi-instantanee (<10s)
```

**Story Points** : 3
**MoSCoW** : Must
**WSJF** : 8.0

### Perspective Dev
- Fichier : `.github/workflows/ci.yml`
- Matrix : Node 20, OS ubuntu-latest
- Cache : `actions/cache` sur `~/.npm`
- Pas de Playwright en CI pour l'instant (trop lent, ajouter plus tard)

### Tasks
- [ ] T1: Creer `.github/workflows/ci.yml`
- [ ] T2: Steps : checkout, setup-node, cache, install, lint, typecheck, test, build
- [ ] T3: Tester le workflow sur une branche de test
- [ ] T4: Verifier que le badge CI s'affiche sur les PR

---

## US-15.2 : Branch protection sur main

**Ref audit** : D2 (Haute)

```
En tant que mainteneur du repo,
je veux que la branche main soit protegee,
afin d'empecher les push directs et forcer les PR avec CI verte.
```

### Criteres d'acceptation

```gherkin
Scenario : Push direct bloque
  Etant donne un developpeur qui tente git push origin main
  Quand le push est effectue
  Alors GitHub le rejette avec "Branch protection rule"

Scenario : PR requise
  Etant donne un developpeur qui veut merger du code
  Quand il cree une PR vers main
  Alors la CI doit passer (status check required)
    ET au moins 0 review est requise (solo dev, pas de review obligatoire)
```

**Story Points** : 1
**MoSCoW** : Must
**WSJF** : 19.0

### Tasks
- [ ] T1: Configurer branch protection via GitHub CLI ou UI
- [ ] T2: Requrir status check "CI" avant merge
- [ ] T3: Tester avec un push direct (doit echouer)

---

## US-15.3 : Migrer pre-commit vers lint-staged

**Ref audit** : D5 (Basse)

```
En tant que developpeur commitant frequemment,
je veux que le pre-commit hook ne linte que les fichiers modifies,
afin de reduire le temps du hook de ~10s a <2s.
```

### Criteres d'acceptation

```gherkin
Scenario : Lint rapide
  Etant donne un commit touchant 2 fichiers
  Quand le pre-commit hook s'execute
  Alors seuls les 2 fichiers modifies sont lintes
    ET le hook termine en < 3 secondes

Scenario : Erreur detectee
  Etant donne un fichier avec une erreur ESLint
  Quand le commit est tente
  Alors le hook echoue et affiche l'erreur
    ET le commit est bloque
```

**Story Points** : 1
**MoSCoW** : Should
**WSJF** : 10.0

### Tasks
- [ ] T1: `npm install -D lint-staged`
- [ ] T2: Configurer lint-staged dans `package.json`
- [ ] T3: Mettre a jour `.husky/pre-commit` pour appeler lint-staged

---

# EPIC 16 — Performance & Assets

> **Objectif** : Optimiser le chargement des images et eliminer les bottlenecks de rendu.
> **Issues audit** : P1 (images Unsplash en prod), P2 (grain texture GPU-intensive)

---

## US-16.1 : Migration des images vers /public

**Ref audit** : P1 (Haute)

```
En tant que visiteur sur connexion lente,
je veux que les images de section soient servies localement,
afin de reduire la latence reseau (pas de requetes Unsplash) et ameliorer le LCP.
```

### Criteres d'acceptation

```gherkin
Scenario : Images locales
  Etant donne les 8 images de section (hero, process x3, case studies x2, products, services)
  Quand le site est charge
  Alors les images sont servies depuis /public/images/sections/
    ET aucune requete n'est faite vers images.unsplash.com

Scenario : Configuration mise a jour
  Etant donne src/config/images.ts
  Quand il est lu
  Alors toutes les URLs pointent vers /images/sections/*.webp
    ET les dimensions (width, height) sont correctes

Scenario : Qualite visuelle maintenue
  Etant donne les images converties en WebP
  Quand elles sont affichees
  Alors la qualite est >= 85%
    ET le poids total est < 500Ko
```

**Story Points** : 3
**MoSCoW** : Should
**WSJF** : 6.0

### Tasks
- [ ] T1: Telecharger les 8 images Unsplash en haute resolution
- [ ] T2: Convertir en WebP (qualite 85%, resize aux dimensions cibles)
- [ ] T3: Placer dans `/public/images/sections/`
- [ ] T4: Mettre a jour `src/config/images.ts`
- [ ] T5: Supprimer `images.unsplash.com` des `remotePatterns` dans `next.config.ts`
- [ ] T6: Verifier le rendu sur desktop et mobile

---

## US-16.2 : Optimiser la texture grain

**Ref audit** : P2 (Moyenne)

```
En tant que visiteur sur mobile,
je veux que l'overlay de texture grain ne penalise pas le rendu,
afin d'avoir un scroll fluide meme sur un appareil peu puissant.
```

### Criteres d'acceptation

```gherkin
Scenario : Performance GPU
  Etant donne la page chargee
  Quand le scroll est effectue sur mobile
  Alors le FPS reste >= 55 fps
    ET le GPU memory ne depasse pas les limites

Scenario : Alternative statique
  Etant donne la texture grain actuelle (SVG filter)
  Quand elle est remplacee par une image PNG tile
  Alors l'effet visuel est similaire
    ET le paint time est reduit
```

**Story Points** : 1
**MoSCoW** : Could
**WSJF** : 8.0

### Tasks
- [ ] T1: Mesurer le paint time actuel (Chrome DevTools Performance)
- [ ] T2: Si > 5ms/frame : generer un PNG grain 256x256 et remplacer le SVG filter
- [ ] T3: Comparer les performances avant/apres

---

# EPIC 17 — Nettoyage dette technique

> **Objectif** : Eliminer le code mort, corriger les bugs mineurs, et durcir la CSP.
> **Issues audit** : A1/A2 (Button.tsx mort), C1 (useReducedMotion), C7 (Calendly CSS), S4 (CSP unsafe-eval)

---

## US-17.1 : Supprimer le composant Button.tsx mort

**Ref audit** : A1, A2 (Basse)

```
En tant que developpeur lisant le code,
je veux que les fichiers morts soient supprimes,
afin de ne pas etre confus par du code qui n'est utilise nulle part.
```

### Criteres d'acceptation

```gherkin
Scenario : Button.tsx supprime
  Etant donne le fichier src/components/ui/Button.tsx
  Quand une recherche "Button" est effectuee dans le codebase
  Alors aucun import ne reference ce composant
    ET le fichier est supprime

Scenario : Build toujours passant
  Etant donne la suppression
  Quand npm run build est execute
  Alors le build passe sans erreur
```

**Story Points** : 1
**MoSCoW** : Could
**WSJF** : 5.0

### Tasks
- [ ] T1: Verifier qu'aucun import ne reference Button.tsx
- [ ] T2: Supprimer le fichier
- [ ] T3: `npm run build` — verifier 0 erreur

---

## US-17.2 : Fix useReducedMotion reactif

**Ref audit** : C1 (Moyenne)

```
En tant que visiteur qui active "prefers-reduced-motion" en cours de session,
je veux que les animations s'arretent immediatement,
afin que ma preference systeme soit respectee en temps reel.
```

### Criteres d'acceptation

```gherkin
Scenario : Changement detecte
  Etant donne un visiteur sans prefers-reduced-motion
  Quand il active la preference dans les reglages systeme
  Alors les animations du site s'arretent immediatement
    ET les compteurs affichent leur valeur finale sans animation

Scenario : Hook partage
  Etant donne useScrollReveal.ts et useCountUp.ts
  Quand ils sont inspectes
  Alors les deux utilisent un hook partage useReducedMotion()
    ET la duplication de getPrefersReducedMotion est eliminee
```

**Story Points** : 2
**MoSCoW** : Could
**WSJF** : 4.5

### Tasks
- [ ] T1: Creer `src/hooks/useReducedMotion.ts` avec `useSyncExternalStore` + `addEventListener('change')`
- [ ] T2: Remplacer les implementations dupliquees dans `useScrollReveal.ts` et `useCountUp.ts`
- [ ] T3: Ecrire test unitaire (mock `matchMedia`)

---

## US-17.3 : Durcir CSP + corriger Calendly CSS

**Ref audit** : S4 (Moyenne), C7 (Moyenne)

```
En tant qu'equipe securite,
je veux que la CSP soit la plus restrictive possible en production,
afin de reduire la surface d'attaque XSS.
```

### Criteres d'acceptation

```gherkin
Scenario : CSP sans unsafe-eval
  Etant donne le site en production
  Quand les headers sont inspectes
  Alors la CSP script-src ne contient plus 'unsafe-eval'
    ET le site fonctionne correctement (Calendly inclus)

Scenario : Calendly CSS dans le head
  Etant donne le composant CalendlyPopup
  Quand il est rendu
  Alors le CSS Calendly est charge via next/head ou un import CSS
    ET il n'y a pas de <link> dans le body

Scenario : Build passant
  Etant donne la CSP modifiee
  Quand le site est deploye sur Vercel
  Alors aucune erreur CSP n'apparait dans la console
```

**Story Points** : 2
**MoSCoW** : Should
**WSJF** : 6.5

### Tasks
- [ ] T1: Tester le site sans 'unsafe-eval' dans la CSP (Next.js peut le necessiter pour le dev HMR uniquement)
- [ ] T2: Conditionner 'unsafe-eval' a NODE_ENV === 'development'
- [ ] T3: Remplacer `<link>` par `next/script` strategy pour le CSS Calendly
- [ ] T4: Verifier sur Vercel Preview — 0 erreur CSP console

---

# Sprint Planning

---

## Sprint 5 — "Securiser & Tester" — DONE

> **Livre le 09/04/2026** — 20/20 points, 73 tests, 0 vuln critique

| Story | Points | Statut |
|-------|--------|--------|
| US-14.2 Setup Vitest | 2 | DONE |
| US-14.1 data-testid + a11y form | 2 | DONE |
| US-13.1 Rate limiting | 2 | DONE |
| US-13.2 Validation Zod | 3 | DONE |
| US-14.3 Tests unitaires hooks + lib | 5 | DONE |
| US-14.4 Tests integration API | 3 | DONE |
| US-13.3 Honeypot | 2 | DONE |
| US-17.1 Cleanup Button.tsx | 1 | DONE |
| **Total** | **20** | **100% forecast** |

### Sprint 5 — Retrospective (resume)

**Continue** : Parallelisation agents, TDD-first, corrections chirurgicales
**Stop** : Sous-estimer les API differences entre versions de dependances (Zod v4)
**Improve** : Committer apres chaque US, ajuster le seuil coverage, tester `useContactForm`

### Sprint 5 — Metriques finales

| Metrique | Resultat |
|----------|----------|
| Tests crees | 73 |
| Couverture globale | 51.9% |
| Couverture API routes | 77-100% |
| Couverture hooks | 41.6% (hooks visuels = IntersectionObserver hard to mock) |
| Vulns critiques | 0 (etait 2) |
| Build | Vert |
| Lint | 0 erreur |

---

## Sprint 6 — "Industrialiser & Consolider" (REFINE post-retro)

### Refinement 3 Amigos — Changements vs. plan initial

| Decision | Qui | Pourquoi |
|----------|-----|----------|
| **Ajout US-14.6** : Tests useContactForm (mock fetch) | QA + PO | Retro A3 — hook critique pour la conversion, 0% couvert |
| **Re-estimation US-14.5** : 2 pts → 1 pt | QA | Les contrastes passent deja WCAG AA (mesure reelle). Juste retirer `disableRules` |
| **Ajuster seuil coverage** : 70% → 60% | SM + QA | Retro A2 — hooks visuels (IntersectionObserver) difficiles a tester en isolation. Montee progressive |
| **Retirer US-16.2** (grain texture) du sprint | PO | WSJF trop bas (8.0 Could), mesure perf requise d'abord. Spike backlog |
| **Ajouter action retro A1** : 1 commit par US | SM | Process improvement, pas de story |
| **US-16.1** (images Unsplash) : deplacee en Could | PO | Les images Unsplash fonctionnent, le risque est la latence, pas un bug. CI est plus critique. |

### Sprint Goal (revise)

```
SPRINT GOAL : Le code est protege par un pipeline CI qui bloque les regressions,
la couverture des tests atteint 60% sur la logique metier (incluant useContactForm),
et la dette technique critique (CSP, a11y, hooks) est eliminee.
```

**Capacite** : ~16 story points (1 semaine)
**Allocation** : 40% CI/CD, 30% tests+a11y, 30% dette technique
**Regle retro** : 1 commit conventionnel par US livree

---

### Nouvelle story : US-14.6 — Tests useContactForm

**Ref retro** : A3 (couverture hooks critique)

```
En tant que developpeur modifiant le formulaire de contact,
je veux des tests unitaires couvrant la validation et la soumission du hook useContactForm,
afin de detecter les regressions sur le pipeline de conversion sans lancer le navigateur.
```

**Criteres d'acceptation :**

```gherkin
Scenario : Validation — tous champs vides
  Etant donne le hook useContactForm
  Quand le formulaire est soumis sans remplir aucun champ
  Alors errors contient 4 erreurs (name, email, company, challenge)
    ET formState reste "idle"

Scenario : Validation — email invalide
  Etant donne le hook useContactForm
  Quand le formulaire est soumis avec email = "not-valid"
  Alors errors.email contient le message d'erreur "invalidEmail"
    ET les autres champs valides n'ont pas d'erreur

Scenario : Soumission reussie (fetch 200)
  Etant donne le hook useContactForm avec fetch mocke retournant 200
  Quand le formulaire est soumis avec des donnees valides
  Alors formState passe de "idle" a "sending" puis "success"
    ET submittedData contient { name, email }

Scenario : Erreur serveur (fetch 500)
  Etant donne le hook useContactForm avec fetch mocke retournant 500
  Quand le formulaire est soumis avec des donnees valides
  Alors formState passe a "error"

Scenario : Le champ honeypot est inclus dans le payload
  Etant donne le hook useContactForm
  Quand le formulaire est soumis avec un champ website rempli
  Alors le payload JSON envoye contient la cle "website"
```

**Story Points** : 3
**MoSCoW** : Must (retro-identified)
**WSJF** : 7.7

**Perspective Dev** :
- Tester la fonction `validate` directement (extraire si besoin) ou via `renderHook` + mock `FormData`
- Mock `global.fetch` pour les scenarios soumission
- Fichier : `src/hooks/__tests__/useContactForm.test.ts`

**Perspective QA** :
- 5 scenarios = 5 tests minimum
- Verifier que le payload envoye a `fetch` contient exactement les bons champs
- Edge case : double soumission rapide (formState = "sending" devrait bloquer)

**Tasks** :
- [ ] T1: Ecrire `src/hooks/__tests__/useContactForm.test.ts`
- [ ] T2: Mock `fetch` + `FormData` + `preventDefault`
- [ ] T3: Tester validation (4 cas)
- [ ] T4: Tester soumission success/error
- [ ] T5: Verifier couverture useContactForm >= 80%

---

### Re-priorisation WSJF Sprint 6

| # | Story | Epic | Pts | CoD | Job Size | **WSJF** | MoSCoW |
|---|-------|------|-----|-----|----------|----------|--------|
| 1 | US-15.2 Branch protection | E15 | 1 | 19 | 1 | **19.0** | Must |
| 2 | US-15.3 lint-staged | E15 | 1 | 10 | 1 | **10.0** | Should |
| 3 | US-15.1 GitHub Actions CI | E15 | 3 | 24 | 3 | **8.0** | Must |
| 4 | US-14.5 Contrastes a11y (re-estime) | E14 | **1** | 8 | 1 | **8.0** | Should |
| 5 | US-14.6 Tests useContactForm (NOUVEAU) | E14 | **3** | 23 | 3 | **7.7** | Must |
| 6 | US-17.3 CSP + Calendly CSS | E17 | 2 | 13 | 2 | **6.5** | Should |
| 7 | US-17.2 Fix useReducedMotion | E17 | 2 | 9 | 2 | **4.5** | Could |
| 8 | US-16.1 Migration images locales | E16 | 3 | 18 | 3 | **6.0** | Could |
| | **Total selectionne** | | **16** | | | | |

---

### Sprint Planning — Jour par jour

| Jour | Stories | Pts | Focus | Commit attendu |
|------|---------|-----|-------|----------------|
| **J1** | US-15.1 (GitHub Actions CI) + US-15.2 (Branch protection) | 4 | Pipeline CI + protection main | `ci(ci): add GitHub Actions pipeline` + `chore(ci): enable branch protection` |
| **J2** | US-15.3 (lint-staged) + US-14.5 (Contrastes a11y) | 2 | DX + a11y | `chore(deps): migrate pre-commit to lint-staged` + `fix(a11y): enable color-contrast in axe tests` |
| **J3** | US-14.6 (Tests useContactForm) | 3 | Couverture hook critique | `test(contact): add useContactForm unit tests` |
| **J4** | US-17.3 (CSP + Calendly CSS) + US-17.2 (useReducedMotion) | 4 | Securite + dette technique | `fix(config): remove unsafe-eval from prod CSP` + `refactor(hooks): extract shared useReducedMotion` |
| **J5** | US-16.1 (Migration images) OU Buffer stabilisation | 3 | Performance OU non-regression | `perf(config): migrate section images to local WebP` |

### Forecast Sprint 6

| Scenario | Points | Stories |
|----------|--------|---------|
| **Must only** (pessimiste) | 7 | US-15.1, US-15.2, US-14.6 |
| **Must + Should** (realiste) | 11 | + US-15.3, US-14.5, US-17.3 |
| **Tout** (optimiste) | 16 | + US-17.2, US-16.1 |

> **PO** : Le scenario realiste (11 pts) suffit a atteindre le Sprint Goal. Les 2 Could (useReducedMotion + images) sont un bonus si la velocite le permet.

---

### Sprint 6 — Definition of Done specifique

**CI/CD :**
- [ ] `.github/workflows/ci.yml` present et fonctionnel
- [ ] CI verte sur une PR de test
- [ ] Push direct sur main → rejete par branch protection
- [ ] Pre-commit hook < 3s (lint-staged)

**Tests :**
- [ ] `npm run test` — tous les tests passent
- [ ] `npm run test:coverage` — >= 60% global (seuil ajuste retro A2)
- [ ] `useContactForm` couvert >= 80%

**Securite :**
- [ ] CSP sans `unsafe-eval` en production
- [ ] 0 erreur CSP dans la console Vercel Preview

**A11y :**
- [ ] `disableRules(["color-contrast"])` retire des tests axe-core
- [ ] axe-core passe sans violation critical/serious

**General :**
- [ ] `npm run build` — passe sans erreur
- [ ] 1 commit conventionnel par US livree (action retro A1)
- [ ] Backlog mis a jour avec le statut de chaque story

---

# Synthese (mise a jour post-retro Sprint 5)

| Metrique | Avant audit | Apres Sprint 5 (reel) | Cible Sprint 6 |
|----------|-------------|----------------------|-----------------|
| Tests unitaires | 0 | **73** | ~85+ |
| Tests integration | 0 | **10** (7 API + 3 health) | ~10 |
| Couverture code | 0% | **51.9%** | >= **60%** (ajuste retro) |
| Couverture API routes | 0% | **77-100%** | >= 80% |
| Couverture useContactForm | 0% | **0%** | >= **80%** (US-14.6) |
| Vulns critiques | 2 (S1, S5) | **0** | 0 |
| Pipeline CI | Aucun | Aucun | **GitHub Actions** |
| Branch protection | Non | Non | **Oui** |
| CSP unsafe-eval | Oui | Oui | **Non (prod only)** |
| lint-staged | Non | Non | **Oui** |
| Images Unsplash | 8 | 8 | **0** (si Could atteint) |
| Score audit estime | B (70/100) | **B+ (78/100)** | **A- (85/100)** |
| Story points livres | — | 20 | 11-16 |
| **Total remediation** | — | 20 | **31-36 points** |

---

# Backlog produit ordonne — v5.1 Post Blueprint Specs (09/04/2026)

> Inputs : Note de valeur business v2, Architecture auth Compass, Blueprint quiz complet, Sprint 5+6 remediation
> US-11.1 REQUALIFIEE : eclatee en Epic E18 (Score Maturite ITSM+CX) — 8 stories
> Blueprint : 8 dimensions/parcours (etait 6), 10 questions scorees + 3 demo, descriptive choice, hybrid gating
> Epics E19 (Auth Supabase) et E20 (Scanner) en backlog Phase 2
>
> REGLE D'INTEGRATION : zero modification des composants existants. Quiz = sous-arbre isole.
> GATE DE NON-REGRESSION : les 79 tests existants doivent passer a chaque commit.

## PRIORITE 1 — Lead Generation Engine Phase 1 (Sprint 7-11)

| # | Story | Epic | Pts | WSJF | MoSCoW |
|---|-------|------|-----|------|--------|
| 1 | **US-18.0** Config quiz — types + donnees ITSM + CX (8 dim. × 2) | E18 | 3 | 18.0 | Must |
| 2 | **US-18.1** Moteur de scoring (formule blueprint, TDD, edge cases) | E18 | 5 | 16.0 | Must |
| 3 | **US-18.2** Parcours ITSM (8 dim., 10 questions, i18n FR+EN) | E18 | 5 | 13.0 | Must |
| 4 | **US-18.3** Parcours CX (8 dim., 10 questions, i18n FR+EN) | E18 | 5 | 13.0 | Must |
| 5 | **US-18.4** UX Quiz — descriptive choice, auto-advance, mobile-first, demographics | E18 | 5 | 10.0 | Must |
| 6 | **US-18.5** Resultats — hybrid gating, radar chart, free+gated, HubSpot segment | E18 | 8 | 9.5 | Must |
| 7 | **US-18.6** Rapport PDF genere (bilingue, brande WaS, envoye par email) | E18 | 5 | 7.0 | Should |
| 8 | **US-18.7** Pages SEO par niveau de maturite (5 ITSM + 5 CX, Schema markup) | E18 | 3 | 6.0 | Could |
| | **Sous-total Phase 1** | | **39** | | |

## PRIORITE 2 — Qualite & Performance (residuel remediation)

| # | Story | Epic | Pts | WSJF | MoSCoW |
|---|-------|------|-----|------|--------|
| 7 | US-16.1 Migration images Unsplash → local WebP | E16 | 3 | 6.0 | Should |
| 8 | US-10.1 Tests E2E complementaires (parcours critique) | E10 | 3 | 5.0 | Should |
| 9 | US-10.2 Audit accessibilite complet axe-core | E10 | 3 | 5.0 | Should |
| 10 | US-12.1 Optimisation images (blur placeholders) | E12 | 3 | 4.0 | Could |
| 11 | US-12.2 Core Web Vitals < seuils "Good" | E12 | 5 | 3.0 | Could |
| 12 | Tests E2E en CI (Playwright dans GitHub Actions) | E15 | 5 | 3.0 | Could |

## PRIORITE 3 — Lead Generation Engine Phase 2 (Sprint 11+)

| # | Story | Epic | Pts | WSJF | MoSCoW |
|---|-------|------|-----|------|--------|
| 13 | US-19.1 Spike Supabase (auth + schema + middleware) | E19 | 5 | 4.8 | Should |
| 14 | US-19.2 Magic link + OAuth Microsoft + Google | E19 | 5 | 4.5 | Should |
| 15 | US-19.3 Middleware auth + route groups (public/authenticated) | E19 | 3 | 4.0 | Should |
| 16 | US-20.1 Scanner Freshservice API v2 (8 dimensions) | E20 | 8 | 3.3 | Should |
| 17 | US-20.2 Scanner Freshdesk API v2 (8 dimensions) | E20 | 8 | 3.3 | Should |
| 18 | US-20.3 Health Score + rapport differencies | E20 | 5 | 3.0 | Should |
| 19 | US-20.4 Cles API ephemeres + UX securite | E20 | 3 | 3.0 | Must |
| | **Sous-total Phase 2** | | **37** | | |

## PRIORITE 4 — Backlog lointain

| # | Story | Pts | Priorite |
|---|-------|-----|----------|
| US-16.2 Grain texture perf (spike) | 1 | Basse |
| Structured logging (pino/winston) | 3 | Basse |
| Analytics GA4/GTM implementation | 2 | Basse |
| Score cards virales LinkedIn (Phase 4 note business) | 5 | Basse |
| Cross-tool nurture ITSM+CX | 5 | Basse |
| Benchmark DB agregee | 8 | Basse |

---

## Sprint Planning suggere — Phase 1 (Score Maturite) — v5.1

### Sprint 7 — "Fondations : Config + Moteur + Parcours ITSM" (Semaine 1-2)

```
SPRINT GOAL : La configuration quiz est complete (8 dim. × 2 parcours), le moteur
de scoring est fonctionnel et teste a >95% de couverture, et le parcours ITSM complet
(10 questions, 8 dimensions) est jouable en FR avec descriptive choice.
```

| Story | Points | MoSCoW |
|-------|--------|--------|
| US-18.0 Config quiz (types + donnees ITSM+CX) | 3 | Must |
| US-18.1 Moteur de scoring (TDD, formule blueprint) | 5 | Must |
| US-18.2 Parcours ITSM (8 dim., 10 questions, i18n) | 5 | Must |
| **Total** | **13** | |

**Gate de non-regression** : `npm run test` (79 tests existants) passe a chaque commit.

### Sprint 8 — "UX Quiz + Parcours CX" (Semaine 3-4)

```
SPRINT GOAL : L'UX quiz est mobile-first avec auto-advance et descriptive choice,
le parcours CX est complet, et l'aiguillage ITSM/CX est fonctionnel.
```

| Story | Points | MoSCoW |
|-------|--------|--------|
| US-18.4 UX Quiz (auto-advance, descriptive choice, demographics) | 5 | Must |
| US-18.3 Parcours CX (8 dim., 10 questions, i18n) | 5 | Must |
| **Total** | **10** | |

### Sprint 9 — "Resultats + Radar + Gating" (Semaine 5-6)

```
SPRINT GOAL : Les resultats hybrid (free + gated) sont fonctionnels avec radar chart,
gating email, sync HubSpot segment, et les recommandations par dimension.
```

| Story | Points | MoSCoW |
|-------|--------|--------|
| US-18.5 Resultats + hybrid gating + radar chart + HubSpot | 8 | Must |
| **Total** | **8** | |

### Sprint 10 — "PDF + SEO + Launch" (Semaine 7-8)

```
SPRINT GOAL : Le quiz est deployable en production avec rapport PDF,
pages SEO par niveau, tests E2E, et contenu EN verifie.
```

| Story | Points | MoSCoW |
|-------|--------|--------|
| US-18.6 Rapport PDF (bilingue, brande WaS) | 5 | Should |
| US-18.7 Pages SEO par niveau de maturite | 3 | Could |
| Tests E2E parcours quiz complet (ITSM + CX) | 3 | Must |
| **Total** | **8-11** | |

**Total Phase 1 : 39 points sur 8 semaines (4 sprints de 2 semaines)**

---

## Matrice de protection de l'existant (Integration Non-Regression)

| Composant existant | Fichiers touches ? | Protection |
|--------------------|--------------------|-----------|
| 11 sections homepage | NON | 79 tests unitaires + build |
| Route /api/contact | NON | Tests API existants |
| i18n (211 cles) | AJOUT namespace `quiz` | Cles existantes intactes |
| Design system (globals.css) | NON | Tokens reutilises, pas modifies |
| HubSpot (hubspot.ts) | EXTENSION (nouvelle fonction) | Tests existants + nouveau test |
| Pipeline CI | NON | Gate automatique chaque PR |
| CSP headers | PEUT-ETRE (si CDN chart) | Build + preview verification |

**Regle** : Si `npm run test` echoue → le commit ne passe pas. C'est le Sprint 5-6 qui protege le Sprint 7+.

---

*Backlog v5.1 — Post-blueprint quiz specs — 09/04/2026*
*3 Amigos : PO (valeur business) + Dev (faisabilite) + QA (testabilite + non-regression)*
*Phase 1 : Score Maturite ITSM+CX (39 pts, 8 semaines, 4 sprints)*
*Phase 2 : Scanner + Auth Supabase (37 pts, TBD apres spike)*
*Total pipeline : 76 points sur ~5 mois*
*Protection existant : 79 tests + CI pipeline + zero modification composants*
