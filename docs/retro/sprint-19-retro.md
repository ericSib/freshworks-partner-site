# Sprint Retrospective — Sprint 19 "SMI complet : ESM + ROI + offer mapping"

> **Date** : 25 avril 2026 (mise a jour 26/04 apres Phase 2 deploiement)
> **Format** : Keep / Drop / Try
> **Sprint Goal** : Livrer le SMI complet — **ATTEINT EN PRODUCTION** (13 / 13 pts dev livres + 1 hotfix a11y + 5 stories ops Phase 2)

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

### K12 · `/api/health?deep=1` a paye sa dette d'investissement (Phase 2)
- **Cause racine** : le check enrichi (D19, OPS-obs livre S18) a permis de detecter en 5 min le desalignement sender Resend qui aurait sinon ete decouvert au premier prospect reel completant le quiz.
- **Bilan** : 1 sprint plus tard, OPS-obs a evite un incident "le quiz marche mais aucun lead ne reçoit son email".
- **Action** : continuer a investir sur l'observabilite. Story candidate S20 : ajouter check deep sur Vercel (status build), Calendly (URL valide), GA4 (tag actif).

### K13 · Logger structure + correlation ID en prod (Phase 2)
- **Cause racine** : les logs runtime Vercel sont parsable au filtre par `requestId` grace au logger introduit en S18. POST /api/contact 21:54:33 retrouvable en 1 grep.
- **Action** : maintenir le pattern sur toute nouvelle route API.

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

### D8 · Phase 2 (Deploy) hors backlog — boucle universelle violee
- **Cause racine** : 5 stories ops (OPS-26.1 a OPS-26.5) ont ete executees en direct sans passage prealable par un refinement Three Amigos. L'engagement Phase 2 a emerge en cours de session (a la suite de la demande "publier le site"), pas a un Sprint Planning.
- **Cout** : tracabilite degradee — D26 et D27 ont ete actes "au fil de l'eau" et notes apres coup dans CLAUDE.md. Le sprint-current.md ne refletait pas le travail en cours.
- **Action** : tout travail ops > 30 min ouvre un mini-refinement avant la 1ere action terminal/dashboard. Voir Try T25.

### D9 · Desalignement sender Resend non capture par les tests
- **Cause racine** : le `from:` `noreply@whataservice.fr` etait hardcoded dans 4 call-sites. Aucun test (unit ou E2E) ne verifie la coherence entre le `from:` du code et la liste des domaines verifies cote Resend. Resultat : decouvert en prod par le health check.
- **Cout** : 30 min de diagnostic + 1 commit fix + 1 redeploy.
- **Action** : voir Try T23 — extraire le sender en variable d'env (`RESEND_FROM_EMAIL`) + ajouter une assertion au demarrage qui logue la valeur (sans envoyer en production).

### D10 · NEXT_PUBLIC_* + redeploy from cache = trompe-l'oeil
- **Cause racine** : Vercel a un bouton "Redeploy" qui par defaut reutilise le build cache. Pour les variables `NEXT_PUBLIC_*` (inlinees au build), le redeploy from cache ne re-bake pas le bundle → l'env var "ajoutee mais invisible".
- **Cout** : 5 min de confusion + 1 empty commit pour forcer un build frais.
- **Action** : voir Try T24 — runbook env vars Vercel + commande "force fresh build" documentee.

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

### T23 · Sender Resend en variable d'env + assertion de coherence
- **Quoi** : extraire `RESEND_FROM_EMAIL` (defaut `noreply@update.whataservice.fr`) + au demarrage de l'API, logger la valeur effective. Test unitaire qui assert que la valeur match `^noreply@[\w.-]+\.[a-z]+$`.
- **Pourquoi** : evite le hardcoding 4-call-sites + rend la migration future de domaine sender (plusieurs sites WaS) triviale.
- **Estimation** : 1 pt.
- **Sprint cible** : S20.

### T24 · Runbook env vars Vercel + force-fresh-build
- **Quoi** : ajouter dans `docs/PROCESS.md` ou un nouveau `docs/runbooks/vercel.md` la procedure : "Apres ajout/edit env var, NE PAS cliquer 'Redeploy' (cache). Utiliser `git commit --allow-empty -m 'chore(ci): force fresh build for env vars'` puis push pour declencher un build complet."
- **Pourquoi** : evite la confusion `NEXT_PUBLIC_*` invisible apres redeploy from cache.
- **Estimation** : 1 pt (doc).
- **Sprint cible** : S20.

### T25 · Mini-refinement obligatoire pour toute session ops > 30 min
- **Quoi** : completer la regle de la boucle universelle : tout travail ops (DNS, deploy, env vars, integrations tiers) dont l'execution depasse 30 min ouvre un fichier `docs/refinement/ops-YYYY-MM-DD-<slug>.md` AVANT la 1ere action terminal/dashboard. Stories OPS-x.x ouvertes Ready, decisions PO actees, scope chiffre.
- **Pourquoi** : Phase 2 S19 a viole cette regle (5 stories ops sans refinement) → tracabilite degradee, acquittement PO post-hoc.
- **Estimation** : 0 pt (process), formalise dans Try T22 ou dans la regle "boucle universelle" CLAUDE.md.
- **Sprint cible** : S20 (formalisation), applicable des maintenant.

### T26 · Improve `checkResend` pour Sending-only scope
- **Quoi** : remplacer `GET /domains` (Full access) par `GET /emails?limit=1` (Sending access compatible) dans `src/app/api/health/route.ts`. Le check `degraded` cosmetique disparaitra et le diagnostic sera fiable.
- **Pourquoi** : aujourd'hui `/api/health?deep=1` reporte "Resend degraded" alors que les emails partent — c'est trompeur en cas de vrai incident.
- **Estimation** : 1 pt.
- **Sprint cible** : S20.

---

## Bilan chiffre Sprint 19 (Phase 1 + Phase 2)

| Metrique | Phase 1 (Dev) | Phase 2 (Deploy) | Total S19 |
|---|---|---|---|
| Pts engages | 13 | 0 (hors backlog) | 13 |
| Pts livres | 13 (100 %) | 4 (ops) | 17 effectifs |
| Stories Done | 6 | 5 ops | 11 |
| Stories deferred | 0 | 0 | 0 |
| Commits feature | 6 | 1 (sender fix) | 7 |
| Commits refactor | 3 | 0 | 3 |
| Commits hotfix | 1 (a11y) | 0 | 1 |
| Commits ci/chore | 0 | 1 (force build) | 1 |
| Commits docs | 0 | 1 (process docs) | 1 |
| Tests ajoutes (unit) | +44 (913 vs 869) | 0 | +44 |
| Tests E2E ajoutes | +3 (55 vs 52) | 0 | +3 |
| Cles i18n ajoutees | +192 (96 FR + 96 EN) | 0 | +192 |
| Violations a11y detectees | 2 (corrigees) | 0 | 2 |
| Violations boucle universelle | 0 | 1 (D8 — ops sans refinement) | 1 |
| Decisions PO actees | 6 (D20-D25) | 2 (D26-D27) | 8 |
| Increment livre en prod | ❌ | ✅ | ✅ |

**Verdict** : Phase 1 exemplaire en livraison (100 %) et discipline process (0 violation). Phase 2 a violé la boucle universelle (D8) mais a livre la valeur reelle — le site Sprint 19 est servi sur `https://freshworks.whataservice.fr` avec emails operationnels. Les 6 drops cumules sont des amplificateurs de qualite — ils nourrissent 7 trys S20 (T20-T26). Apprentissage central : **Done = en prod**, pas en `main`.
