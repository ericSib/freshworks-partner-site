# Refinement — Refactoring Radar 2026-04-25

> **Date** : 25 avril 2026
> **Sprint vise** : Sprint 19 (buffer) + inbox Sprint 20+
> **Duree** : 1 session (continuation du Sprint 19 refinement)
> **Declencheurs** : sortie de la tache planifiee `refactoring-radar` du 25/04/2026
> **Skills mobilises** : `agile-product-owner` + `dev-architecture` + `qa-strategy` + `qa-e2e`

---

## 1 · Decisions et arbitrages

### Source du refinement

Sortie de la tache planifiee `refactoring-radar` (skill projet) qui a scanne le codebase pour detecter :
- Code smells de taille (Long Method, Large Class, Long Parameter List)
- Code smells de couplage (Feature Envy, Message Chains)
- Code smells AI-generated (Copy-Paste Drift, Dead Code, Inconsistent Patterns)
- Zones chaudes (churn x complexite sur 14 jours)
- Tendance dette technique (quadrant Fowler)

### Findings synthetiques

| Smell | Fichier | Effort | Decision PO |
|---|---|---|---|
| Large Class (275L) | `src/lib/quiz/generate-pdf.ts` | S | Story → US-23.1 — Sprint 20 |
| Large Class (242L, 26 cond.) | `src/components/layout/Header.tsx` | M | Story → US-23.2 — Sprint 20 |
| Copy-Paste Drift (3x) | `src/components/sections/Contact.tsx:62-102` | S | Story → US-23.3 — **S19 buffer** |
| Dead Code (3 exports) | `config/quiz/types.ts`, `config/schema.ts`, `config/navigation.ts` | S | Story → US-23.4 — **S19 buffer** |
| Long Param List (11 props) | `src/components/sections/MaturityPage.tsx` | S | Story → US-23.5 — **S19 buffer** |

### Arbitrage budget refactoring

**Probleme** : 5 stories detectees = 8 pts au total. Le sprint 19 a 4 pts de buffer.

**Options analysees** :
- A · Tout charger en S19 (8 pts) → depasse buffer + risque de derailler le Sprint Goal SMI.
- B · Tout reporter en S20 → buffer S19 inutilise, valeur perdue.
- C · **Quick wins en S19 buffer (3 pts) + structurels en S20 (5 pts)** → equilibre.

**Decision PO** : option C retenue. Quick wins (US-23.3, 23.4, 23.5) executables en mode "20% du sprint a la dette" (Manifeste P9 + WSJF effort/impact).

### Arbitrage Epic

Decision : creer **E23 — Refactoring Radar (hygiene continue)** comme epic distinct, alimentee par chaque execution mensuelle de la tache planifiee. Permet de mesurer la dette en flux entrant/sortant sprint apres sprint.

---

## 2 · Strategie de test et risques qualite

### Skill `qa-strategy` — analyse de risque qualite

Tous les refactorings ci-dessous sont **iso-comportement** : aucune modification fonctionnelle, uniquement structurelle. Le risque qualite principal est la **regression silencieuse**.

| Story | Risque qualite | Mitigation |
|---|---|---|
| US-23.1 (PDF) | Sortie binaire PDF non-deterministe → tests difficiles | Snapshot du DTO interne avant rendu jsPDF + test contractuel des helpers extraits |
| US-23.2 (Header) | Focus trap mobile menu + a11y regression | Test E2E `tests/e2e/keyboard-nav.spec.ts` deja present + axe-core + nouveau test de useFocusTrap en isolation |
| US-23.3 (FormInput) | Regression visuelle Contact | Snapshot Contact.tsx + Lighthouse a11y unchanged |
| US-23.4 (Dead Code) | Faux positif → suppression d'un export utilise indirectement | Verification triple : grep import + grep require + build TS strict |
| US-23.5 (MaturityPage) | Regression d'affichage page maturite | Snapshot test deja existant sur MaturityPage |

### Modele de test applique (skill `qa-strategy`)

Pyramide standard appliquee :
- **Unit (Vitest)** : helpers extraits + hooks (useFocusTrap), composants extraits (FormInput, MobileMenu)
- **Integration** : QuizResults integre roi+pdf, Header integre MobileMenu
- **E2E (Playwright)** : aucun nouveau test E2E — la couverture existante (`keyboard-nav`, `accessibility`) suffit a detecter les regressions structurelles

### Verification non-regression cross-sprint

Avant chaque merge story E23 :
- `npm run test` — coverage globale ≥ 80% maintenue
- `npx playwright test` — 95 tests E2E, 0 flaky
- `npm run build` + `npm run lint` — 0 erreur

---

## 3 · Stories raffinees

### US-23.1 — Decomposition `generate-pdf.ts` en helpers

#### PO — Clarifications et valeur

**Pourquoi** : fichier de 275 lignes avec une fonction monolithique. Bloque la testabilite (impossible de tester un sous-bloc isolement) et augmente le cout de toute evolution PDF (modifier le footer = relire 275 lignes).

**Valeur business** : faible directe, **forte indirecte** — chaque story SMI future qui touche au PDF (ex: branding, ajout d'une page roadmap, internationalisation du PDF) sera 2-3x plus rapide.

**Reportage en S20** : pas un quick win (effort S mais surface de tests a ecrire), pas urgent (zone non chaude — generate-pdf.ts modifie 0 fois ces 14 derniers jours).

#### Dev — Plan technique (skill `dev-architecture`)

Pattern : **Extract Method** (refactoring Fowler de base). Decomposition en 4 helpers :

```typescript
// AVANT : src/lib/quiz/generate-pdf.ts (275 lignes, 1 fonction)
export function generatePDF(data: QuizData): jsPDF { /* 275L */ }

// APRES : decomposition
export function generatePDF(data: QuizData): jsPDF {
  const doc = createDocument();
  renderHeader(doc, data);
  renderScores(doc, data);
  renderQuickWins(doc, data);
  renderFooter(doc, data);
  return doc;
}

function renderHeader(doc: jsPDF, data: QuizData): void { /* ~50L */ }
function renderScores(doc: jsPDF, data: QuizData): void { /* ~80L */ }
function renderQuickWins(doc: jsPDF, data: QuizData): void { /* ~80L */ }
function renderFooter(doc: jsPDF, data: QuizData): void { /* ~30L */ }
```

**Architecture** : pas de changement de pattern, layered architecture preservee. Pas de port/adapter (le module reste un utilitaire pur).

**Risque technique** : jsPDF mute son etat interne (curseur Y). Chaque helper doit explicitement gerer ou retourner sa position. **Approche** : passer `doc` par reference, chaque helper consomme et avance le curseur.

#### QA — Plan de test (skill `qa-unit-integration`)

- **Test contractuel** : pour chaque helper, snapshot du `doc.internal.pages` apres execution (capture les commandes jsPDF emises)
- **Test d'integration** : `generatePDF(fixture)` produit un PDF dont la taille en bytes est dans une fourchette stable +/- 5%
- **Coverage cible** : ≥ 80% sur le module
- **Regression test** : un test de bytes-equivalence avec un PDF de reference genere avant le refactor (commit la baseline binaire dans `tests/fixtures/quiz/baseline-pdf.json` = hash)

---

### US-23.2 — Extract `MobileMenu` + `useFocusTrap` depuis Header

#### PO — Clarifications et valeur

**Pourquoi** : Header.tsx contient 26 conditionnels et 8 fonctions dans 242 lignes. Trois preoccupations distinctes y sont melees : navigation desktop, mobile menu (toggle + animation + focus trap), scroll detection.

**Valeur business** : **moyenne directe** — bug surface : la complexite cyclomatique 26 est correlee a 3 bugs a11y connus dans le passe (focus mal restitue, escape key non geree, scroll lock manquant). Reduction du risque.

**Effort M** : justifie le report en S20 (impossible a tenir dans le buffer S19 de 4 pts).

#### Dev — Plan technique (skill `dev-architecture`)

Pattern : **Extract Component** + **Extract Custom Hook**.

```
src/components/layout/
├── Header.tsx              # Reduction ciblee : 242L → ~120L
├── MobileMenu.tsx          # Nouveau : composant ~80L (state machine + animation)
└── hooks/
    └── useFocusTrap.ts     # Nouveau : hook ~40L (focus trap reutilisable)
```

**Direction des dependances** (skill `dev-architecture`) :
- `Header.tsx` → `MobileMenu.tsx` (composition descendante)
- `MobileMenu.tsx` → `useFocusTrap.ts` (composition utilitaire)
- `useFocusTrap.ts` → 0 dependance projet (hook generique reutilisable Footer/Modale futurs)

**Boundaries respectees** :
- Pas de Context global ajoute (YAGNI — un seul consommateur)
- Pas de prop drilling >2 niveaux
- Pas de logique metier dans `useFocusTrap` (purement DOM/keyboard)

#### QA — Plan de test

- **Unit (Vitest)** : `useFocusTrap.test.ts` — Tab cycle, Shift+Tab cycle, Escape, restoration au unmount
- **Unit composant** : `MobileMenu.test.tsx` — etat ouvert/ferme, click backdrop, click link ferme menu
- **E2E existant** (skill `qa-e2e`) : `tests/e2e/keyboard-nav.spec.ts` doit passer **sans modification** — c'est le contrat de non-regression
- **A11y** : `tests/e2e/accessibility.spec.ts` axe-core mobile menu open → 0 violation
- **Snapshot** : Header avec et sans menu ouvert

---

### US-23.3 — Extract `FormInput` composant (Contact)

#### PO — Clarifications et valeur

**Pourquoi** : 3 inputs (name, email, company) avec une className identique de 159 caracteres dans Contact.tsx. Toute evolution du style input (focus ring, padding, border) doit etre repetee 3 fois.

**Valeur business** : **faible directe**, mais zero risque + 1 pt = quick win parfait pour S19 buffer.

**Engagement S19** : OUI — DoR Ready, scope chirurgical.

#### Dev — Plan technique

```typescript
// AVANT (Contact.tsx:62-102) : 3 occurrences identiques
<input className="w-full bg-white/[0.03] border border-white/8 rounded-lg px-4 py-3.5 text-surface placeholder:text-slate-600 focus:outline-none focus:border-accent/40 focus:shadow-[0_0_0_3px_rgba(184,146,106,0.08)] transition-all" ... />

// APRES : src/components/ui/FormInput.tsx
type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};
export function FormInput({ label, error, id, ...props }: FormInputProps) { /* ... */ }
```

**Pattern** : composant UI reutilisable. Vit dans `src/components/ui/` (deja existant pour SectionTag, etc.).

#### QA — Plan de test

- **Unit** : FormInput.test.tsx — render avec/sans error, htmlFor=id, aria-describedby si error
- **Snapshot** : Contact.tsx avant/apres → identique en sortie HTML
- **A11y** : labels associes correctement (deja teste par axe-core)

---

### US-23.4 — Suppression exports morts

#### PO — Clarifications et valeur

**Pourquoi** : 3 exports detectes comme jamais importes — bundle bloat + confusion future ("est-ce utilise quelque part ?").

**Valeur business** : **tres faible directe**, mais 1 pt et reduit la surface cognitive du code config.

**Engagement S19** : OUI — quick win parfait.

#### Dev — Plan technique

Suppressions :
- `DEMOGRAPHIC_FIELDS` dans `src/config/quiz/types.ts` + re-export dans `src/config/quiz/index.ts`
- `ServiceDefinition` type dans `src/config/schema.ts`
- `BreadcrumbPage` type dans `src/config/navigation.ts`

**Verification triple** avant suppression (eviter faux positifs) :
1. `grep -r "DEMOGRAPHIC_FIELDS" src/ tests/`
2. `grep -r "ServiceDefinition\|BreadcrumbPage" src/ tests/`
3. `npm run build` apres suppression — TS strict detecte tout import casse

#### QA — Plan de test

- **Build** : `npm run build` reste vert
- **Tests** : `npm run test` reste vert (aucun test ne reference ces exports)
- **Coverage** : ne baisse pas (les fichiers concernes ne perdent pas de tests)

---

### US-23.5 — `MaturityPage` parameter object

#### PO — Clarifications et valeur

**Pourquoi** : 11 parametres en spread sur le composant `MaturityPage`. Long Parameter List = signe de couplage non structure entre l'appelant et le callee. Refactoring vers un objet de configuration.

**Valeur business** : **faible directe**, mais facilite la prochaine story qui ajoutera un parametre (ex: ROI dans MaturityPage qui depend des decisions D21).

**Engagement S19** : OUI — quick win + alignement avec la roadmap SMI (US-23.5 prepare le terrain pour les stories `quiz.maturityPage.roi` futures).

#### Dev — Plan technique (skill `dev-architecture`)

Pattern : **Introduce Parameter Object** (Fowler).

```typescript
// AVANT
type MaturityPageProps = {
  sectionTag: string;
  headline: string;
  intro: string;
  problemsTitle: string;
  problems: Problem[];
  recommendationsTitle: string;
  recommendations: Recommendation[];
  cta: CTA;
  timeframe: string;
  segment: QuizSegment;
  locale: string;
};

// APRES : extraire en types domain
type MaturityPageContent = {
  sectionTag: string;
  headline: string;
  intro: string;
};
type MaturityPageDiagnosis = {
  problemsTitle: string;
  problems: Problem[];
  recommendationsTitle: string;
  recommendations: Recommendation[];
};
type MaturityPageContext = {
  cta: CTA;
  timeframe: string;
  segment: QuizSegment;
  locale: string;
};
type MaturityPageProps = {
  content: MaturityPageContent;
  diagnosis: MaturityPageDiagnosis;
  context: MaturityPageContext;
};
```

**Direction des dependances** (skill `dev-architecture`) : les types vivent dans `src/config/quiz/types.ts` — cote domaine, importes par le composant cote infrastructure UI.

#### QA — Plan de test

- **Unit** : MaturityPage.test.tsx — modifier les call sites pour utiliser la nouvelle signature
- **Snapshot** : sortie HTML identique avant/apres
- **TypeScript** : `tsc --noEmit` strict — aucun call site oublie

---

## 4 · Setup transverse

### Convention de nommage Epic E23

- ID epic : **E23 — Refactoring Radar (hygiene continue)**
- Ids stories : `US-23.1` a `US-23.5` (suite logique apres E22-SEO-GEO)
- Scope commit : `refactor(<scope-impacte>)` — ex: `refactor(layout): extract MobileMenu`

### Cadence radar

- Tache planifiee `refactoring-radar` deja en place — prochaine execution selon la planification existante
- Chaque execution → un nouveau refinement dans `docs/refinement/refactoring-radar-YYYY-MM-DD.md`
- Decision PO d'embarquer ou non les findings selon le buffer du sprint en cours

---

## 5 · Quality gates

Pour chaque story de l'epic E23 :

- [ ] `npm run build` reste vert
- [ ] `npm run lint` 0 erreur
- [ ] `npm run test` 100% pass
- [ ] Coverage globale ≥ 80% **maintenue** (le refactoring ne doit PAS baisser la coverage)
- [ ] `npx playwright test` 95/95 pass
- [ ] axe-core 0 violation critique/serieuse
- [ ] Tests TDD : chaque helper/composant/hook extrait a son test ecrit AVANT le code refactore
- [ ] 1 commit par story (scope chirurgical)

---

## 6 · Red flags detectes

### R1 · Risque de bundle increase (US-23.2)

- **Cause** : extract MobileMenu en composant separe pourrait rajouter du code de "boundary" (props serialization, etc.)
- **Mitigation** : verifier avec `npm run build` que `_next/static/chunks/main.js` ne grossit pas de plus de 1 KB
- **Impact** : faible

### R2 · Risque de regression PDF binaire (US-23.1)

- **Cause** : jsPDF est sensible a l'ordre des appels — mauvaise extraction = PDF different
- **Mitigation** : test de regression sur le hash MD5 du PDF avec une fixture deterministe (skill `qa-unit-integration`)
- **Impact** : moyen

### R3 · Faux positif "dead code" (US-23.4)

- **Cause** : un export peut etre importe via re-export en chaine ou par un test
- **Mitigation** : verification triple grep + build TS strict (decrit dans la story)
- **Impact** : faible

---

## 7 · Sortie de la session — Stories Ready

| Story | DoR | Sprint cible | Ordre |
|---|---|---|---|
| US-23.1 — Decompose generate-pdf.ts | ✅ Ready | S20 | 2 (apres SMI complet) |
| US-23.2 — Extract MobileMenu + useFocusTrap | ✅ Ready | S20 | 1 (a11y impact + valeur) |
| US-23.3 — Extract FormInput | ✅ Ready | **S19 buffer** | 3 |
| US-23.4 — Remove dead exports | ✅ Ready | **S19 buffer** | 1 (quick win pure) |
| US-23.5 — MaturityPage parameter object | ✅ Ready | **S19 buffer** | 2 |

**Total S19 buffer** : 3 pts (US-23.4 + US-23.3 + US-23.5)
**Total inbox S20** : 5 pts (US-23.1 + US-23.2)

---

## 8 · Decisions arbitrees par le PO

| ID | Decision | Date |
|---|---|---|
| D23 | Cadence Refactoring Radar institutionnalisee — chaque sortie de la tache planifiee genere un refinement et alimente l'epic E23 | 25/04/2026 |
| D24 | E23 ouverte — "Refactoring Radar (hygiene continue)" — accumule les findings de chaque scan | 25/04/2026 |
| D25 | Budget refactoring : ~20% du sprint (Manifeste P9) — quick wins prioritaires en buffer, structurels en stories dediees | 25/04/2026 |

---

*Refinement produit le 25/04/2026 — issu de l'execution scheduled task `refactoring-radar`. Skills mobilises : agile-product-owner, dev-architecture, qa-strategy, qa-e2e.*
