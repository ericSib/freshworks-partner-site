# Refinement — Sprint 13 "Fiabiliser et couvrir"

> **Date** : 12 avril 2026 · **Sprint vise** : Sprint 13 · **Duree** : 1 session
> **Declencheurs** : Lancement Sprint 13, adoption framework agile, health check 3 Amigos

---

## 1 · Decisions et arbitrages

| ID | Decision | Rationale |
|---|---|---|
| D8 | Adoption framework agile complet (CLAUDE.md + PROCESS.md) | Reproduire les guidelines Diabolo_AI pour gouvernance coherente |
| D-S13-1 | US-21.1 marquee Done sans travail | Les 3 waitForTimeout etaient deja elimines avant le sprint |
| D-S13-2 | 2 fails E2E a11y (mobile) ne bloquent pas le sprint | Seront adressees par US-21.2 et US-21.3 |
| D-S13-3 | data-testid requis comme prerequis pour US-21.2 et US-21.3 | 0 testid actuellement sur mentions-legales et quiz |

---

## 2 · Strategie de test et risques qualite

### Risques identifies

| Risque | Severite | Mitigation |
|---|---|---|
| `useQuizSubmit.ts` a 0% coverage | Moyen | Couvrir lors de US-18.9 (refactor client quiz) |
| 2 fails axe-core mobile mentions-legales | Moyen | US-21.2 instrumentera la page + corrigera les violations |
| 0 data-testid sur 13 composants quiz | Moyen | US-21.3 ajoutera les testid necessaires avant le scan axe-core |
| CI sans Playwright | Eleve | US-15.4 resoudra ce gap (5 pts) |

### Strategie test sprint 13

- **US-21.2** : smoke test E2E + scan axe-core → Playwright + axe-core
- **US-21.3** : scan axe-core quiz 5 etats → Playwright + axe-core
- **US-15.4** : CI Playwright → GitHub Actions workflow
- **US-18.9** : API endpoint → Vitest integration tests + Zod validation

---

## 3 · Stories raffinees

### US-21.1 — Eliminer waitForTimeout dans les tests E2E

#### PO — Clarifications et valeur
Story fermee. Les 3 occurrences etaient deja eliminees. 1 pt recupere en velocite.

#### Dev — Plan technique
Aucun travail necessaire.

#### QA — Plan de test
Confirme : 0 occurrence `waitForTimeout` dans toute la suite E2E.

**Statut : Done**

---

### US-21.2 — Test E2E smoke + a11y /mentions-legales FR+EN

#### PO — Clarifications et valeur
Page mentions-legales est obligatoire (conformite). Les violations a11y mobile detectees doivent etre corrigees.

#### Dev — Plan technique
1. Ajouter `data-testid` sur `LegalContent.tsx` et la page mentions-legales
2. Ecrire tests E2E Playwright : navigation FR + EN, contenu visible, structure semantique
3. Integrer scan axe-core dans les tests

#### QA — Plan de test
- Smoke test : page charge, titre visible, navigation FR↔EN fonctionne
- axe-core : 0 violation critique/serieuse sur desktop + mobile
- Prerequis : data-testid a instrumenter

**Statut : Ready**

---

### US-21.3 — Scan axe-core quiz (5 etats cles)

#### PO — Clarifications et valeur
Le quiz est le lead magnet principal. L'accessibilite garantit que tous les visiteurs peuvent le completer.

#### Dev — Plan technique
1. Ajouter `data-testid` sur les 13 composants quiz
2. Ecrire tests E2E avec scan axe-core sur 5 etats : initial, question, demographics, email gate, results

#### QA — Plan de test
- 5 etats × scan axe-core = 5 assertions minimum
- Prerequis : data-testid sur tous les composants quiz

**Statut : Ready**

---

### US-15.4 — Playwright dans GitHub Actions CI

#### PO — Clarifications et valeur
Sans CI E2E, les regressions passent inapercues. Story la plus lourde (5 pts) mais la plus critique pour la stabilite.

#### Dev — Plan technique
1. Creer `.github/workflows/e2e.yml` (ou enrichir le workflow existant)
2. Installer Playwright browsers dans le CI
3. Configurer le reporting (HTML report, artifacts)
4. S'assurer que les 104 tests passent en CI

#### QA — Plan de test
- CI doit passer vert avec les 104 tests existants
- Verifier que les artifacts (screenshots, traces) sont recuperables

**Statut : Ready**

---

### US-18.9 — API dediee /api/quiz/submit

#### PO — Clarifications et valeur
Dedie le endpoint quiz a une route separee de /api/contact. Corrige le couplage et prepare le terrain pour les 11 proprietes HubSpot quiz.

#### Dev — Plan technique
1. Creer `src/app/api/quiz/submit/route.ts` (si pas deja existant — a verifier)
2. Schema Zod dedie `quizSubmitSchema` dans `src/lib/validation.ts`
3. Mapping HubSpot via `buildQuizProperties()` dans `src/lib/quiz/hubspot.ts`
4. Refactorer `useQuizSubmit.ts` pour pointer vers `/api/quiz/submit`
5. Couvrir `useQuizSubmit.ts` (actuellement 0%)

#### QA — Plan de test
- Tests unitaires Zod (valeurs valides/invalides pour segment, score, level, etc.)
- Test integration route API (mock HubSpot + Resend)
- Test hook useQuizSubmit (mock fetch)
- Coverage cible : ≥ 80% sur le nouveau code

**Statut : Ready**

---

## 4 · Setup transverse

- Adoption CLAUDE.md v2.0 + PROCESS.md v1.0 (framework agile)
- Creation `docs/backlog/sprint-current.md`
- Creation `docs/refinement/sprint-13-refinement.md`

---

## 5 · Quality gates

| Gate | Seuil | Outil |
|---|---|---|
| Build | 0 erreur | `npm run build` |
| Lint | 0 erreur | `npm run lint` |
| Tests unitaires | 100% pass | `npm run test` |
| Coverage global | ≥ 70% | Vitest |
| Coverage nouveau code | ≥ 80% | Vitest |
| axe-core | 0 violation critique/serieuse | Playwright + axe-core |
| E2E | 100% pass | Playwright |

---

## 6 · Red flags detectes

| ID | Severite | Description | Statut |
|---|---|---|---|
| RF-1 | Moyen | `useQuizSubmit.ts` a 0% coverage — 58 lignes non testees | A traiter avec US-18.9 |
| RF-2 | Moyen | 0 data-testid sur mentions-legales et quiz | Prerequis US-21.2 et US-21.3 |
| RF-3 | Info | Bug quiz (segment Zod) initialement rapporte comme critique : **non confirme** | Ferme |

---

## 7 · Sortie de la session

**Stories Ready** : US-21.2, US-21.3, US-15.4, US-18.9
**Stories Done** : US-21.1

**Ordre de travail recommande** :
1. US-21.2 (2 pts) — debloquer les tests a11y mentions-legales
2. US-21.3 (3 pts) — debloquer les tests a11y quiz
3. US-18.9 (4 pts) — API quiz + couvrir useQuizSubmit
4. US-15.4 (5 pts) — CI E2E (peut etre parallelisee)

---

## 8 · Decisions arbitrees par le PO

Voir section 1 ci-dessus.

---

*Session de refinement cloturee le 12/04/2026.*
