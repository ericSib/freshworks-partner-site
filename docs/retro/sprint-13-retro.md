# Sprint Retrospective — Sprint 13 "Fiabiliser et couvrir"

> **Date** : 12 avril 2026
> **Format** : Keep / Drop / Try
> **Sprint Goal** : Fiabiliser le quiz lead magnet en production et securiser main par la CI — **ATTEINT**

---

## KEEP

### K1 · Health check 3 Amigos en debut de sprint
- **Cause racine** : les 3 chapeaux (PO/Dev/QA) ont chacun verifie leur domaine en parallele avant de coder
- **Action** : maintenir ce rituel a chaque Sprint Planning
- **Metrique** : 0 faux depart, Sprint Goal formule des le Jour 1

### K2 · Fix cause racine plutot que symptomes
- **Cause racine** : l'attribut `inert` sur le menu mobile a resolu la violation `aria-hidden-focus` partagee par toutes les pages
- **Action** : toujours chercher le composant partage avant de traiter page par page
- **Metrique** : 1 ligne de code → 3 stories resolues

### K3 · Conventional commits + commitlint enforced
- **Cause racine** : le pre-commit hook empeche les commits hors format
- **Action** : conserver tel quel
- **Metrique** : 3 commits propres, 0 revert

### K4 · TDD workflow (quand applicable)
- **Cause racine** : ecrire les tests d'abord a force une verification methodique du code existant
- **Action** : maintenir le reflexe "lire les tests existants d'abord"
- **Metrique** : 7 tests ajoutes, 0 test tautologique

---

## DROP

### D1 · Planifier des stories deja implementees
- **Cause racine** : backlog construit a partir de findings sans verifier l'etat reel du code
- **Action** : arreter de planifier sans verification prealable (git log + lecture + tests)
- **Impact** : 17 pts sur 20 etaient deja Done avant le sprint

### D2 · Rapporter un "bug critique" sans reproduction
- **Cause racine** : bug quiz qualifie sans execution de `npm run test` ni lecture du code source
- **Action** : tout bug doit etre reproduit avec un test qui echoue avant d'entrer au backlog
- **Impact** : 0 bug reel vs 1 bug rapporte comme critique

### D3 · Scopes commitlint desalignes avec CLAUDE.md
- **Cause racine** : CLAUDE.md listait `quiz`, `api`, `hubspot` mais commitlint ne les acceptait pas
- **Action** : aligner la config commitlint avec les scopes documentes

---

## TRY — entrees pour le refinement Sprint 14

### T1 · Verification systematique de l'etat reel avant de planifier
- **Quoi** : avant d'inscrire une story, executer ses tests et verifier si le code existe
- **Pourquoi** : eviter de planifier du travail fantome
- **Owner** : PO
- **Metrique** : < 20% du sprint est "deja Done" au Sprint Planning

### T2 · Ajouter les scopes manquants a commitlint
- **Quoi** : `quiz`, `api`, `hubspot` dans la config commitlint
- **Pourquoi** : eliminer les warnings (D3)
- **Owner** : Dev
- **Metrique** : 0 warning commitlint sur Sprint 14

### T3 · Monter le seuil de coverage a 75%
- **Quoi** : passer le seuil CI de 70% a 75% (actuel : 87.57%)
- **Pourquoi** : verrouiller le gain Sprint 13
- **Owner** : Dev
- **Metrique** : CI echoue si coverage < 75%

### T4 · Couvrir le hook useQuiz (US-21.9, 3 pts)
- **Quoi** : state machine du quiz (3 phases, 5 actions) — dernier gros module non couvert
- **Pourquoi** : lead magnet central, regression silencieuse sur la state machine
- **Owner** : QA
- **Metrique** : useQuiz.ts coverage >= 85%

---

*Chaque Try entre dans le refinement preparatoire Sprint 14 via la boucle universelle (PROCESS.md §2).*
