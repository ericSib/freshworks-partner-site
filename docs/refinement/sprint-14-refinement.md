# Refinement — Sprint 14 preparatoire

> **Date** : 12 avril 2026 · **Sprint vise** : Sprint 14 · **Duree** : 1 session
> **Declencheurs** : Retro Sprint 13 (4 Try), backlog E21 epuise, backlogs strategiques disponibles

---

## 1 · Decisions et arbitrages

### Application de T1 (retro Sprint 13) — Verification etat reel

| Story candidate | Etat reel verifie | Decision |
|---|---|---|
| US-21.9 (3 pts) — Tests useQuiz | **Deja done** : 12 tests, 100% lines, 92% branches | Ecartee |
| US-21.7 (3 pts) — Refacto QuizResultsPreview | **Deja done** : 5 sous-composants extraits | Ecartee |
| US-21.10 (3 pts) — Setup Stryker | **Travail reel** : rien installe | Candidat |
| T2 — Scopes commitlint | Partiel : `quiz`, `api`, `hubspot` manquants | Tache technique |
| T3 — Seuil coverage 75% | Actuel 70% → monter a 75% (on est a 87.57%) | Tache technique |

**Bilan T1** : 6 pts fantomes evites. Le process fonctionne.

---

## 2 · Strategie Sprint 14

### Sources de stories

Le backlog E21 (QA & stabilite) est epuise. Les sources pour Sprint 14 sont :

1. **Retro Try** : T2 (commitlint), T3 (coverage seuil), US-21.10 (Stryker)
2. **E22 — SEO/GEO** : stories restantes (FAQ rich snippets, tests SEO 33→50+)
3. **Audit Remediation** : US-17.1 (cleanup Button.tsx mort), US-17.3 (CSP + Calendly)
4. **E12 — Performance** : US-12.1 (optimisation images WebP)

### Sprint Goal propose

> **"Industrialiser la qualite et poser les fondations SEO"**
>
> Test du Goal : la CI inclut mutation testing (Stryker ≥ 60%), le seuil coverage est monte a 75%, et le site expose des schemas JSON-LD valides pour les FAQ et breadcrumbs.

---

## 3 · Stories raffinees

### T2+T3 — Taches techniques retro (regroupees en 1 story)

**Titre** : Aligner commitlint + monter seuil coverage 75%
**Estimation** : 1 pt
**Priorite** : Must (engagement retro)

#### PO — Clarifications et valeur
Engagement de la retro Sprint 13. La config commitlint doit refleter les scopes documentes. Le seuil coverage doit verrouiller les gains.

#### Dev — Plan technique
1. Ajouter `quiz`, `api`, `hubspot` dans `commitlint.config.mjs` scope-enum
2. Monter les seuils dans `vitest.config.ts` : statements 75%, lines 75%, functions 75%, branches 65%
3. Verifier que la CI passe toujours

#### QA — Plan de test
- `npm run test` doit passer avec les nouveaux seuils
- Un commit avec scope `quiz` ne doit plus produire de warning

**Fichiers** : `commitlint.config.mjs`, `vitest.config.ts`

---

### US-21.10 — Setup Stryker mutation testing + CI

**Estimation** : 3 pts
**Priorite** : Should (T4 retro)

#### PO — Clarifications et valeur
Le mutation testing est le garde-fou ultime contre les tests tautologiques. Seuil initial 60% sur 5 modules critiques.

#### Dev — Plan technique
1. `npm install --save-dev @stryker-mutator/core @stryker-mutator/vitest-runner`
2. Creer `stryker.config.mjs` avec scope limite aux modules critiques :
   - `src/lib/validation.ts`
   - `src/lib/rate-limit.ts`
   - `src/lib/analytics.ts`
   - `src/lib/quiz/hubspot.ts`
   - `src/hooks/useQuizSubmit.ts`
3. Script `npm run test:mutation` dans package.json
4. Optionnel : step CI dans e2e.yml ou workflow dedie

#### QA — Plan de test
- `npm run test:mutation` doit passer avec score ≥ 60%
- Les mutants survivants doivent etre documentes

**Fichiers** : `stryker.config.mjs`, `package.json`, `.github/workflows/` (optionnel)

---

### US-22.6 — FAQ schema JSON-LD + rich snippets

**Estimation** : 3 pts
**Priorite** : Should

#### PO — Clarifications et valeur
Les FAQ rich snippets augmentent le CTR organique de 20-30%. Le site a deja 9 schemas JSON-LD mais manque FAQ et BreadcrumbList enrichis. Prerequis pour le SEO GEO (reponses AI).

#### Dev — Plan technique
1. Creer un composant `FaqSchema.tsx` qui genere le JSON-LD FAQ
2. Ajouter des FAQ sur les pages cles (homepage, quiz) basees sur les questions des personas
3. Tester avec Google Rich Results Test
4. Ajouter des tests Vitest pour la generation du schema

#### QA — Plan de test
- Schema JSON-LD valide (0 erreur Google Rich Results Test)
- Tests unitaires sur la generation du schema
- Tests E2E verifiant la presence du script JSON-LD dans le DOM

**Fichiers** : `src/components/seo/FaqSchema.tsx`, `src/messages/{fr,en}.json`, tests

---

### US-17.1 — Cleanup Button.tsx mort

**Estimation** : 1 pt
**Priorite** : Could

#### PO — Clarifications et valeur
`src/components/ui/Button.tsx` est un fichier non-importe, present dans le git status comme untracked. Nettoyage de dette.

#### Dev — Plan technique
1. Verifier que Button.tsx n'est importe nulle part
2. Supprimer le fichier
3. Verifier build + tests

#### QA — Plan de test
- `npm run build` passe apres suppression
- `grep -r "Button" src/` ne retourne aucun import du fichier supprime

**Fichiers** : `src/components/ui/Button.tsx` (suppression)

---

### US-22.SEO-TESTS — Atteindre 50+ tests SEO (actuellement 33)

**Estimation** : 2 pts
**Priorite** : Should

#### PO — Clarifications et valeur
L'objectif E22 est 50+ tests SEO. On est a 33. Couvrir les schemas JSON-LD restants et les meta tags.

#### Dev — Plan technique
1. Ajouter des tests pour les schemas JSON-LD existants (Organization, Service, Person, etc.)
2. Tester les meta tags hreflang, canonical, og:image par page
3. Tester les breadcrumbs JSON-LD

#### QA — Plan de test
- 50+ tests SEO passent
- Couverture des 9+ schemas JSON-LD existants

**Fichiers** : `src/lib/__tests__/seo-*.test.ts`, `src/components/seo/__tests__/`

---

## 4 · Forecast Sprint 14

| # | Story | Pts | Priorite | Contribue au Goal |
|---|---|---|---|---|
| 1 | T2+T3 — commitlint + coverage 75% | 1 | Must | Oui — industrialiser |
| 2 | US-21.10 — Stryker mutation testing | 3 | Should | Oui — industrialiser |
| 3 | US-22.6 — FAQ schema JSON-LD | 3 | Should | Oui — fondations SEO |
| 4 | US-22.SEO-TESTS — 50+ tests SEO | 2 | Should | Oui — fondations SEO |
| 5 | US-17.1 — Cleanup Button.tsx | 1 | Could | Non (dette) |

**Total propose** : 10 pts / 20 pts capacite

**Note** : forecast volontairement conservateur (10 pts) car :
- US-21.10 (Stryker) est une nouveaute technique avec risque de decouverte
- US-22.6 et US-22.SEO-TESTS necessitent un travail de contenu (FAQ) en plus du code
- T1 (retro) : mieux vaut livrer 10 pts reels que 20 pts fantomes

Des stories supplementaires pourront etre tirees en cours de sprint si la capacite le permet (meme pattern que Sprint 13).

---

## 5 · Quality gates Sprint 14

| Gate | Seuil | Outil |
|---|---|---|
| Build | 0 erreur | `npm run build` |
| Lint | 0 erreur | `npm run lint` |
| Tests unitaires | 100% pass | `npm run test` |
| Coverage global | **≥ 75%** (nouveau) | Vitest |
| Coverage nouveau code | ≥ 80% | Vitest |
| Mutation score (nouveau) | **≥ 60%** sur 5 modules | Stryker |
| axe-core | 0 violation critique/serieuse | Playwright + axe-core |
| E2E | 100% pass | Playwright |
| Commitlint | 0 warning, 0 error | commitlint |

---

## 6 · Red flags detectes

| ID | Severite | Description | Statut |
|---|---|---|---|
| RF-S14-1 | Moyen | Stryker peut etre lent sur les composants React (mutants dans JSX) — limiter le scope initial | A surveiller |
| RF-S14-2 | Faible | Les FAQ necessitent du contenu metier (questions des personas) — valider avec le PO | A rediger |

---

## 7 · Sortie de la session

**Stories Ready pour Sprint 14** : T2+T3, US-21.10, US-22.6, US-22.SEO-TESTS, US-17.1
**Forecast propose** : 10 pts (conservateur post-retro T1)
**Sprint Goal propose** : "Industrialiser la qualite et poser les fondations SEO"

En attente de validation PO pour le Sprint Planning.

---

*Session de refinement cloturee le 12/04/2026.*
