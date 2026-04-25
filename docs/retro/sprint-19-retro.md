# Sprint Retrospective — Sprint 19 "SMI complet : ESM + ROI + offer mapping"

> **Date** : 25 avril 2026
> **Format** : Keep / Drop / Try
> **Sprint Goal** : Livrer le SMI complet — **ATTEINT** (13 / 13 pts livres + 1 hotfix a11y)

---

## KEEP

### K7 · DoR Ready non negociable au Sprint Planning
- **Cause racine** : 6 / 6 stories engagees etaient a DoR coche avant le 1er commit (correctif applique du Drop S18 D2). Aucune session n'a ete ralentie par une spec ambigue.
- **Bilan** : 100 % de livraison vs 31 % au S18.
- **Action** : la grille DoR (7 items) reste un go/no-go binaire au Sprint Planning S20.

### K8 · TDD strict sur les fonctions pures
- **Cause racine** : `recommendOffer` (matrice D22) et `estimateROI` (modele Forrester) ont ete ecrites apres leurs tests. Les 15 cellules + 4 invariants ROI (monotonicity, level 5 zero-flag, segment differentiation) ont guide la signature.
- **Bilan** : couverture 100 % sur ces deux modules, 0 regression detectee.
- **Action** : pattern a appliquer systematiquement aux futures fonctions pures (transformation maturity → offre, calculs SEO, etc.).

### K9 · 1 commit = 1 intention, conventional commits respectes
- **Cause racine** : 9 features/refactors + 1 hotfix, chaque commit avec un scope chirurgical et un body explicatif quand le diff > 5 fichiers.
- **Bilan** : `git log --oneline` lisible comme un diff narratif du sprint. Reverter une story unitaire reste possible.
- **Action** : maintenir la regle commitlint + husky.

### K10 · Boucle universelle respectee — refinement avant code
- **Cause racine** : D20/D21/D22 ont ete actes au refinement S19 le 25/04, AVANT le 1er commit feat. Aucun ajout backlog mi-sprint sans refinement (correctif applique du Drop S18 D3).
- **Bilan** : tracabilite parfaite — chaque commit reference une decision documentee.
- **Action** : la boucle universelle reste la seule porte d'entree au backlog.

### K11 · Buffer Refactoring Radar = reduction de friction du sprint N+1
- **Cause racine** : US-23.5 (MaturityPage parameter object) a ete livre comme quick win, en preparation a une eventuelle extension SMI-roi vers les pages /maturite. La structure refactoree etait prete avant que le besoin n'arrive.
- **Action** : continuer a injecter ~20 % du sprint en quick wins du Radar (D25, Manifeste P9).

---

## DROP

### D5 · Confiance excessive aux unit tests pour l'a11y
- **Cause racine** : 2 violations critiques contrast (`text-slate-500` 3.92 : 1 sur `bg-deep`) ont passe 913 unit tests + le build sans alerter. Detectees uniquement au full Playwright run (axe-core sur 5 etats du quiz). Hotfix `aebf9e7` necessaire avant de marquer la story Done.
- **Cout** : 1 commit hotfix + 1 cycle E2E supplementaire.
- **Action** : voir Try T20 — axe-core dans la boucle de feedback rapide.

### D6 · 84 cles i18n ecrites en 1 commit, sans relecture editoriale du PO
- **Cause racine** : le namespace `quiz.esm.*` (5 dim + 5 commercial + 5 benchmark + 9 questions × 6 + 5 levels × 3 = 84 cles × 2 langues) a ete authore par Claude en 1 passe, valide par les tests d'existence i18n-keys et T16 mais pas par une relecture editoriale.
- **Cout** : risque que le ton/jargon RH d'une dimension ESM ne corresponde pas exactement au positionnement WaS perçu par Nadia.
- **Action** : voir Try T21 — relecture editoriale i18n forfaitaire au Sprint Planning quand un commit prevu ajoute > 50 cles.

### D7 · Retrospective S18 conduite avec 7 jours de retard
- **Cause racine** : la retro S18 etait notee dans `sprint-current.md` comme "a conduire J1 du S19" mais a ete sautee au profit du Sprint Planning S19 + le travail technique a demarre directement.
- **Cout** : 7 jours sans capitalisation sur les drops S18, qui auraient pu informer le Planning S19 differemment (notamment sur le cout de l'engagement sans DoR).
- **Action** : la retro precedente est un prerequis du Sprint Planning suivant. Voir Try T22.

---

## TRY — entrees Sprint 20

### T20 · Lancer axe-core dans la boucle rapide (Vitest + jsdom + axe-core/react)
- **Quoi** : ajouter `vitest-axe` (ou `jest-axe` adapte vitest) sur les composants critiques du quiz (QuizROI, QuizRecommendedOffer, QuizSelector). Les violations contrast/heading/label seraient detectees au `npm run test`, pas a l'E2E.
- **Pourquoi** : analogue T16 (parite i18n) — une regle qui doit etre testee a la frequence du commit, pas du run E2E.
- **Estimation** : 2 pts (setup + 3 specs initiales).
- **Sprint cible** : S20.

### T21 · Relecture editoriale PO bloc i18n > 50 cles
- **Quoi** : process — quand un commit feat(i18n) prevu ajoute plus de 50 cles, planifier 30 min de relecture PO sur le namespace concerne avant le merge. Diff genere par `git diff` cote PO, valide explicitement.
- **Pourquoi** : eviter qu'un namespace entier (ESM, futurs Phase 2) ne devie du ton WaS sans correction PO.
- **Estimation** : 0 pt (process), recurrent.
- **Sprint cible** : S20 et au-dela.

### T22 · Retrospective N est un gate du Sprint Planning N+1
- **Quoi** : ajouter au PROCESS.md §4 : "Le Sprint Planning N+1 ne demarre pas tant que la retro N n'est pas conduite et committee dans `docs/retro/`."
- **Pourquoi** : retro = livraison process, doit etre done-done avant le sprint suivant.
- **Estimation** : 1 pt (mise a jour PROCESS.md + checklist Sprint Planning).
- **Sprint cible** : S20.

---

## Bilan chiffre Sprint 19

| Metrique | Valeur |
|---|---|
| Pts engages | 13 |
| Pts livres | 13 (100 %) |
| Stories Done | 6 |
| Stories deferred | 0 |
| Commits feature | 6 |
| Commits refactor | 3 |
| Commits hotfix | 1 |
| Tests ajoutes (unit) | +44 (913 vs 869) |
| Tests E2E ajoutes | +3 (55 vs 52) |
| Cles i18n ajoutees | +192 (96 FR + 96 EN) |
| Violations a11y detectees | 2 (corrigees avant fin de sprint) |
| Violation boucle universelle | 0 ✅ |

**Verdict** : sprint exemplaire en livraison (100 %) et discipline process (0 violation boucle universelle, DoR respecte). Les 3 drops sont des amplificateurs de qualite, pas des echecs — ils preparent le S20.
