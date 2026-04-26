# Refinement OPS — Resync `package-lock.json` apres bump transitive `@swc/helpers`

> **Date** : 26 avril 2026 (J0 du Sprint 20, avant J1 = 27/04)
> **Type** : Ops incident (bloquant CI) — boucle universelle CLAUDE.md §6.9 + T25
> **Duree estimee execution** : ~15 min (sous le seuil 30 min, mais l'impact est bloquant et recurrent → refinement quand meme, conformement a la regle "doute → refinement")
> **Skills mobilises** : `agile-product-owner` + `dev-git-workflow` + `dev-devops`
> **Three Amigos** : PO (Eric Sib) / Dev (Claude Code) / QA (Claude Code)

---

## 1 · Evenement declencheur

### 1.1 · Symptome observe

Depuis le commit `ca850b5` (US-S20-1, 26/04 11:01 UTC), **5 runs consecutifs du workflow GitHub Actions `e2e.yml` echouent en 7-10s**, exit code 1, sans produire ni `playwright-report/` ni `test-results/`.

| Run ID | Commit | Date UTC | Durée | Status |
|---|---|---|---|---|
| 24955016974 | `ca850b5` US-S20-1 | 26/04 11:01 | 8s | ❌ failure |
| 24956129621 | `2996f18` US-S20-4 follow-up | 26/04 12:02 | 9s | ❌ failure |
| 24956558298 | `c7508c7` US-S20-3 OG | 26/04 12:24 | 9s | ❌ failure |
| 24966352267 | `3bf92f9` US-S20-7 ROI | 26/04 20:30 | 10s | ❌ failure |
| 24966974569 | `9437c59` cookie banner hotfix | 26/04 21:02 | en cours | ❌ probable |

### 1.2 · Cause racine (RCA)

Logs CI step "Install dependencies" :

```
npm error code EUSAGE
npm error `npm ci` can only install packages when your package.json
and package-lock.json or npm-shrinkwrap.json are in sync.
npm error Missing: @swc/helpers@0.5.21 from lock file
```

**Diagnostic** :

1. Le `package-lock.json` committe epingle `@swc/helpers@0.5.15` (version pinned par Next.js 16.2.2).
2. Une peerDependency transitive (introduite recemment dans une mise a jour de l'arbre Next/SWC) demande desormais `@swc/helpers >=0.5.17`.
3. CI tourne sur **Node 20 / npm 10** (cf `.github/workflows/e2e.yml:34`). Cette version de npm fait une resolution stricte au demarrage de `npm ci` et detecte que `@swc/helpers@0.5.21` est requis pour satisfaire la peerDep — version absente du lockfile → refus.
4. Localement on tourne sur **Node 25 / npm 11.12** (verifie `node --version && npm --version`). npm 11 resout differemment et reste muet, donc `git status` est clean : le lockfile committe ne paraissait pas obsolete.

**Pourquoi maintenant ?** Pas un commit fautif cote code applicatif. C'est un publish silencieux d'un transitive Next/SWC entre le dernier `npm install` local (avant US-S20-1) et le premier push S20. Sans regeneration du lockfile, le drift va persister et tous les pushes S20 vont continuer a echouer.

### 1.3 · Impact business

- **CI rouge sur main** depuis 11:01 UTC → 0 confiance dans les artefacts E2E uploades.
- **Aucun test E2E n'a tourne** depuis le debut S20 — donc aucune des 4 stories deja livrees S20 (US-S20-1, US-S20-3, US-S20-4, US-S20-7 + cookie hotfix) n'a passe la suite Playwright en CI. Verification manuelle de la prod = oui, mais pas de gate automatise.
- **Prod stable** : le deploiement Vercel utilise son propre cache npm et n'a pas le meme blocage strict — `freshworks.whataservice.fr` continue de servir les commits poussés.
- **Risque masque** : si un test E2E commence a flaker maintenant, on ne le verra qu'apres le fix CI. La fenetre d'aveuglement est de ~10h au moment de ce refinement.

---

## 2 · Decisions PO actees

### D34 (S20) — Resync lockfile en hotfix immediat (avant J1 S20)

**Decision** : appliquer `rm -rf node_modules package-lock.json && npm install`, committer le nouveau lockfile, pusher, verifier que le run E2E passe avant de demarrer J1 S20.

**Rationale** :
- Sans CI verte, le quality gate "build + lint + tests doivent passer avant tout merge sur main" (CLAUDE.md regle 9) est viole en continu.
- 5 echecs consecutifs sans fix = cas d'ecole "retro insight ignore" → drop a inscrire d'office au S20 Keep/Drop/Try.
- Le scope de la regeneration touche **uniquement le lockfile** (package.json reste intact). Diff revue avant push.

**Risques pris en compte** :
- Le `npm install` peut bumper d'autres transitives. Mitigation : revue du diff lockfile (top-level deps non touchees, seules les transitives bougent).
- Pas de test fonctionnel rejoue avant push : si une transitive incompatible passe au lock, on s'en rendra compte au build CI. Mitigation : verification post-push immediate du run E2E.

### D35 (S20) — Aligner Node CI ↔ Node local via `.nvmrc` (story OPS-S20.1)

**Decision** : story de buffer S20, **OPS-S20.1** (1 pt). Ajouter `.nvmrc` a la racine + faire pointer `e2e.yml` (`node-version-file: .nvmrc`) + idem pour `ci.yml`. Choix de version : **Node 22 LTS** (actif jusqu'a 04/2027, supporte par Next.js 16, evite Node 25 = unstable et Node 20 = soon-deprecated).

**Rationale** :
- La cause racine du drift = mismatch resolveur npm 10 (CI) vs npm 11 (local). Aligner Node aligne npm.
- Le warning visible dans les annotations CI ("Node.js 20 actions are deprecated, will be forced to Node 24 by June 2026") rend l'upgrade ineluctable — autant le faire en S20 plutot que d'attendre une rupture.
- Le ratchet vers Node 22 LTS (pas Node 24, pas Node 25) reduit le risque d'introduire une autre incompatibilite.

### D36 (S20) — Renforcer la regle commit lockfile (CLAUDE.md regle 13bis a verifier)

**Decision** : ajouter un check pre-push (ou note process dans PROCESS.md §6.X) : "tout `npm install` dont le diff `package-lock.json` est non vide doit etre committe dans le meme push que la modification deps qui l'a declenche, scope `chore(deps)`."

**Rationale** : evite la recurrence du drift silencieux. Pas de hook automatise immediat (cout 0.5 pt qu'on n'engage pas en S20), mais regle ecrite + check manuel au commit. Story candidate **T27** = report S21 si pas le temps en S20.

---

## 3 · Story technique — `OPS-S20.1` Resync lockfile + alignement Node CI

### 3.1 · User Story

> **En tant que** mainteneur du projet freshworks-partner-site,
> **je veux** que CI tourne sur la meme version de Node que mon poste local,
> **afin que** les drifts de resolution npm n'echouent plus le workflow E2E sans avertissement et que les artefacts CI redeviennent fiables.

### 3.2 · Acceptance Criteria (Given / When / Then)

**Scenario 1 : lockfile resynchronise**
- **Given** un poste local sur Node 25/npm 11 et un CI sur Node 20/npm 10
- **When** je supprime `node_modules` + `package-lock.json` et lance `npm install`
- **Then** le nouveau `package-lock.json` contient `@swc/helpers@0.5.21` (ou la version requise par les peerDeps actuelles), `package.json` est inchange, `npm ci` reussit en CI

**Scenario 2 : Node aligne via .nvmrc**
- **Given** un fichier `.nvmrc` a la racine contenant `22`
- **When** le workflow `e2e.yml` reference `node-version-file: .nvmrc`
- **Then** CI utilise Node 22 LTS, identique a la version cible locale (apres `nvm use`)

**Scenario 3 : CI verte sur push de la story**
- **Given** le commit `chore(deps): resync lockfile + align Node CI to .nvmrc` pousse sur main
- **When** le workflow E2E se declenche
- **Then** le step "Install dependencies" reussit, les tests Playwright tournent, le run finit en `success`

**Scenario 4 : pas de regression deps**
- **Given** le diff du lockfile post-`npm install`
- **When** on examine les top-level dependencies (clé `dependencies` du root)
- **Then** aucune dependance directe (Next, React, Tailwind, etc.) n'a change de version majeure ou mineure non intentionnelle

### 3.3 · Estimation et placement

- **Pts** : 1 (quick win ops, < 30 min hands-on)
- **Sprint** : injectee en buffer S20 Phase 3 — la marge etait 3 pts, devient 2 pts post-OPS-S20.1.
- **Priorite** : Must (CI rouge bloque le quality gate Manifeste P9).
- **Sequence** : J1 S20 matin, **avant** la 1ere story planifiee (T25 + T22 + US-S20-1 + US-S20-4) — sinon les tests de US-S20-1 ne passeront pas en CI.

### 3.4 · DoR — Validation

- [x] Format US complet (role + action + benefice)
- [x] AC en Given/When/Then (4 scenarios)
- [x] Pas de dep bloquante
- [x] Estime (1 pt)
- [x] Pas de maquette UI (story ops)
- [x] Donnees de test : logs CI run 24966352267 + diff lockfile attendu

→ **Ready** ✅

---

## 4 · Insights pour la rétrospective S20 (Keep/Drop/Try)

### Drop · D1-S20 (candidat) — `npm ci` strict + drift silencieux non monitore

- **Cause racine** : aucun monitoring local du divergent entre `package.json` resolu localement (npm 11) et `package.json` resolu en CI (npm 10). Le drift s'est installe entre la fin S19 et le debut S20, invisible jusqu'au 1er push S20.
- **Cout** : 5 runs CI rouges sur 24h, 0 test E2E execute sur 4 stories deja livrees, fenetre d'aveuglement de ~10h sur la qualite reelle des commits S20.
- **Action** : voir Try T1-S20.

### Try · T1-S20 (candidat) — Aligner Node CI ↔ local via .nvmrc + pre-push hygiene

- **Hypothese** : si CI et local utilisent Node 22 LTS (meme npm), les resolutions de transitives convergent et le drift devient improbable.
- **Mesure de succes** : 0 echec `npm ci` sur l'ensemble du sprint S20 post-OPS-S20.1.
- **Story** : OPS-S20.1 (1 pt) couvre la mise en place. T27 (story candidate, 0.5 pt) ajoutera le check pre-push si capacite restante en J6-J7.

### Try · T2-S20 (candidat) — Health check CI dans la tache planifiee `e2e-suite-health-check`

- **Hypothese** : la tache planifiee qui audite la suite E2E doit AUSSI verifier que les derniers runs CI sont verts. Sinon l'audit raconte un univers parallele ou la suite est saine, alors que CI ne la fait jamais tourner.
- **Mesure de succes** : prochain rapport `e2e-suite-health-check` ouvre sur "✅ X derniers runs CI verts" ou "🔴 Y runs rouges depuis Z, cause = ..." avant tout audit interne.
- **Story** : pas de story formelle, modification du SKILL.md de la tache planifiee a faire en T22 (Retro N en gate Sprint Planning N+1) ou story technique courte S21.

---

## 5 · Plan d'execution (J0 — 26/04 soir)

| Etape | Commande | Verification |
|---|---|---|
| 1. Sauvegarde lockfile actuel | (deja en git) | `git log -1 --oneline package-lock.json` |
| 2. Suppression artefacts | `rm -rf node_modules package-lock.json` | `ls package-lock.json` → "No such file" |
| 3. Resolution fraiche | `npm install` | exit 0, nouveau lockfile genere |
| 4. Verification scope | `git diff package.json` | output vide |
| 5. Verification top-level deps | `git diff package-lock.json \| head -200` | aucune top-level dependency bumpee non intentionnellement |
| 6. Verification @swc/helpers | `grep '"@swc/helpers"' package-lock.json` | au moins une entree avec version >= 0.5.17 |
| 7. Build local de fumee | `npm run build` (optionnel) | exit 0 |
| 8. Commit | `git add package-lock.json && git commit -m "chore(deps): resync lockfile to fix npm ci on Node 20 (CI)"` | commitlint passe |
| 9. Push | `git push origin main` | accepte (main protected mais admin push autorise pour hotfix CI) |
| 10. Verification CI | `gh run watch` ou `gh run list --workflow=e2e.yml --limit 1` | run en cours puis ✅ success |

**Story OPS-S20.1 (Node alignment + .nvmrc)** : commit separe (J1 matin), pas dans le hotfix.

---

## 6 · Tracabilite

- **Lien CI run echec representatif** : https://github.com/ericSib/freshworks-partner-site/actions/runs/24966352267
- **Workflow concerne** : `.github/workflows/e2e.yml` (et probablement `ci.yml` aussi, a verifier)
- **CLAUDE.md regle reference** : §"Boucle universelle" + §6.9 PROCESS.md (ops > 30 min) — applique ici par excès de zèle sur ops < 30 min mais bloquant + recurrent
- **Decisions PO** : D34 (resync immediat), D35 (Node alignment story), D36 (regle commit lockfile)
- **Stories generees** : OPS-S20.1 (1 pt, S20 buffer), T27 (0.5 pt, S21 candidate)
- **Insights retro** : D1-S20 / T1-S20 / T2-S20 (a actualiser au Sprint Review J7)

---

*Refinement ops cree le 26/04/2026 a J0 du Sprint 20. Decisions D34-D36 actees, story OPS-S20.1 Ready et engagee. Plan d'execution sequence avant J1.*

---

## 7 · Suites — decouvertes post-fix lockfile (26/04 soir)

### 7.1 · Constat

Une fois le step `Install dependencies` debloque par le commit `c2b555e`, **2 nouveaux blocages CI ont surface** sur le workflow `e2e.yml` (run 24967397305) et `ci.yml` (run 17). Ces erreurs etaient masquees pendant ~10h par l'echec precoce de `npm ci`.

**Diagnostic** :

| # | Workflow | Step | Erreur | Categorie |
|---|---|---|---|---|
| 1 | e2e.yml | Run Playwright tests | `homepage.spec.ts:23/30` `toHaveTitle(/What A Service/)` ne match pas le nouveau titre SEO US-S20-1 | Regression test (bug coverage US-S20-1) |
| 2 | ci.yml | Type-check | `useQuizSubmit.test.ts` (7 erreurs) — `vi` non importe + mocks `MaturityLevel` / `QuizDimension` / `QuizResults` desalignes du schema S19 | Drift type tests (cumulatif depuis S19 SMI) |
| 3 | ci.yml | Type-check | `quiz-submit.test.ts:228/233` (4 erreurs) — narrowing TS 5.x sur `mock.calls[0]` (tuple `[]`) | Drift TypeScript (bump deps) |
| 4 | ci.yml | Type-check | `keyboard-nav.spec.ts` (10 erreurs) — `Parameters<Parameters<typeof test>[1]>[0]['page']` resout a `never` | Drift Playwright (bump deps) |
| 5 | ci.yml | Lint | 4 warnings unused-vars (`_`, `capturedCallback`, `RECURRING_OFFERS`) | Bruit pre-existant, non bloquant strict |

**Tous etaient pre-existants** mais invisibles tant que `npm ci` echouait en 1s avant tout step.

### 7.2 · Decisions PO complementaires

#### D37 — Test regression US-S20-1 = bug de la story livree, pas Drop S20

**Decision** : la mise a jour des assertions E2E sur le titre relevait de la DoD de US-S20-1. Le test n'a pas ete ajuste lorsque le `<title>` a ete change dans `src/messages/{fr,en}.json` via la story. **Bug coverage** a inscrire au compte US-S20-1, pas un Drop S20 process distinct.

**Rationale** : tagger ca comme Drop S20 dilue le signal de l'incident vrai (= drift CI). Tagger ca comme bug coverage de US-S20-1 force un Try precis sur la DoD : "toute story qui modifie un texte SEO/meta DOIT lister les tests E2E qui asserent dessus dans la PR description".

**Action** : enrichir la DoD dans `docs/PROCESS.md` (story candidate **T28**, S21+, 0.5 pt) — ajouter checklist "tests E2E couvrant les meta/SEO touches sont mis a jour".

#### D38 — TypeScript drift sur tests = trigger pour pre-commit `tsc --noEmit`

**Decision** : la situation actuelle (3 fichiers tests avec erreurs TS post-bump dependances) est invisible localement tant qu'on ne lance pas `npx tsc --noEmit` explicitement (pas dans le pre-commit hook actuel, qui ne fait que `eslint --quiet`). **Ajouter `npx tsc --noEmit` au pre-commit hook (husky)** pour bloquer le drift au commit, pas en CI.

**Rationale** :
- Cout : 5-15s ajoute au commit (acceptable, c'est le projet `freshworks-partner-site` dont on parle, pas un monorepo).
- Benefice : evite le pattern "je dev sur Node 25, je commit, CI Node 22 detecte 11 erreurs TS, je rouvre une PR".
- Story candidate **T29** (S21+, 1 pt) — modifier `.husky/pre-commit` + tester sur un drift artificiel.

**Risque** : le pre-commit pourrait devenir lent. Mitigation : `tsc --noEmit --incremental` (deja active via `incremental: true` dans `tsconfig.json`).

#### Note sur D35 (alignement Node) — partiellement deja fait

`bc7f8b5` (commit parallele session ops) a deja switche `e2e.yml` vers `node-version-file: '.nvmrc'`. OPS-S20.1 cote infra = ✅ Done. Reste juste le check des erreurs TS qui en decoule (cf D38 ci-dessus).

### 7.3 · Insights complementaires pour la rétrospective S20

**Drop · D2-S20 — Le drift TypeScript sur fichiers tests etait masque par 2 effets cumules**

- **Effet 1** : pre-commit hook actuel = `eslint --quiet` uniquement, sans `tsc --noEmit`. Donc 0 detection au commit.
- **Effet 2** : 5 echecs CI consecutifs sur `npm ci` (lockfile drift) ont empeche le step Type-check de tourner pendant ~10h. Donc 0 detection en CI.
- **Cout reel** : 11 erreurs TS s'etaient accumulees, decouvertes en cascade au moment du fix lockfile.
- **Action** : voir Try T1-S20 + Try T3-S20 (nouveau).

**Try · T3-S20 — `tsc --noEmit` au pre-commit hook**

- **Hypothese** : si le pre-commit fait `tsc --noEmit`, le drift type est bloque a la source (commit refuse) et CI ne se prend plus jamais une cascade de 11 erreurs.
- **Mesure de succes** : 0 erreur TS en step Type-check de `ci.yml` sur l'ensemble du Sprint S21.
- **Story** : T29 (1 pt), candidate S21.

**Try · T4-S20 — DoD enrichie sur stories SEO/meta**

- **Hypothese** : si la DoD impose explicitement de lister les tests E2E qui asserent sur les meta touchees, la regression D37 ne se reproduira pas.
- **Mesure de succes** : 0 fail E2E sur des assertions meta/title sur les 3 prochaines stories US-S2x-* qui touchent au SEO.
- **Story** : T28 (0.5 pt), candidate S21.

### 7.4 · Bilan final hotfix lockfile + cascade

| Indicateur | Avant fix lockfile | Apres fix lockfile + 3 commits cascade |
|---|---|---|
| `e2e.yml` | ❌ 5 runs rouges, 0 test execute | 🟢 (en attente verif post-push) |
| `ci.yml` | ❌ 5 runs rouges sur `npm ci` | 🟢 (en attente verif post-push) |
| Erreurs TS detectees | 0 (masquees) | 11 (toutes fixees) |
| Warnings lint | 0 (masques) | 4 (tous fixes) |
| Pre-commit hook | `eslint --quiet` | inchange (D38 = candidate S21) |
| Decisions PO ajoutees | D34-D36 | + D37, D38 |
| Stories S21 candidates ouvertes | OPS-S20.1 (1 pt) | + T28 (0.5 pt) + T29 (1 pt) |
| Insights retro | D1-S20 / T1-S20 / T2-S20 | + D2-S20 / T3-S20 / T4-S20 |

---

*Section 7 ajoutee le 26/04/2026 soir, post-execution du fix lockfile. Documente les 4 cascades de drift detectees une fois le blocage `npm ci` leve. 3 commits chirurgicaux livres : `ca9bb0b` (test fixtures), `b41ab07` (E2E titles), `794683e` (lint cleanup). Decisions D37-D38 actees. Stories S21 candidates : T28 (DoD SEO), T29 (pre-commit tsc).*
