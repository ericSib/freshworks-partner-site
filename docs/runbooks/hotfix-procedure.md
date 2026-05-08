# Runbook — Procedure hotfix

> **Owner** : Claude Code + Eric Sib (PO)
> **Cadence** : ponctuel (declenche par incident ou vuln)
> **Lié à** : T47 (Try retro S21, livre S22) · pattern US-26.1 (S21, vuln Next.js HIGH) + HOTFIX-S22.0a (S22, desindexation Google)

---

## 1 · Quand declencher un hotfix ?

Un hotfix est legitime quand l'attente du prochain Sprint Planning N+1 produit un cout reel. Les 4 categories acceptees :

| Categorie | Exemple | Decision PO |
|---|---|---|
| **Vuln securite HIGH/CRITICAL** | CVE Next.js DoS (US-26.1) | hors-sprint immediat (pattern D39) |
| **Incident production observable client** | Cookie banner ne se ferme pas (US-S20-BUG.1) | intra-sprint si sprint en cours, sinon hors-sprint |
| **KPI business effondre par regression** | Desindexation Google totale (HOTFIX-S22.0a) | au choix : hors-sprint OU integre Sprint Planning N+1 selon urgence |
| **Bloqueur livraison sprint en cours** | CI rouge depuis 5 runs (D34 lockfile drift) | hors-sprint immediat |

**Cas non-hotfix** (= passe par la boucle universelle classique refinement → backlog) :
- Bug edge-case decouvert mais non bloquant
- Tech debt visible mais pas urgent
- Suggestions d'amelioration UX

**Regle 8h** : si le fix tient en < 8 heures de session intensive Claude Code (= ~3-5 SP per T42 calibration), c'est un hotfix candidat. Au-dela → story normale du sprint suivant.

---

## 2 · Procedure (5 etapes)

### Etape 1 — Refinement light (15-30 min, obligatoire meme en hotfix)

Meme reduit, le refinement est non negociable (CLAUDE.md regle "boucle universelle"). Format minimal :

- Creer `docs/refinement/hotfix-YYYY-MM-DD-<slug>.md` (pour hotfix hors-sprint) OU integrer dans `docs/refinement/sprint-N+1-refinement.md` (pour hotfix intra-sprint)
- Sections requises :
  - Diagnostic (preuves : curl, screenshots, logs, GSC export, etc.)
  - Cause racine (hypothese principale)
  - Stories candidate (ID, AC, estimation)
  - Risque collateral (autres systemes affectes)
  - Test plan minimum (TDD : test rouge AVANT fix)

**Pourquoi obligatoire** : sans refinement, le hotfix risque de rater une regression non-evidente (cas typique : modification headers HTTP qui casse un autre flow).

### Etape 2 — Branche dediee + TDD strict

- Creer une branche `claude/hotfix-<slug>` ou utiliser une worktree existante
- TDD strict : test rouge AVANT le fix (CLAUDE.md regle 4)
- Le test doit pinner le contrat qui a echoue (ex. test E2E header HTTP, test unit logique metier, test integration API)
- Si le test ne peut pas etre ecrit avant (cas rare : bug visuel non automatisable) — documenter pourquoi dans le commit body

### Etape 3 — Verification Vercel Preview AVANT merge main (lecon retro S21)

**Etape obligatoire ajoutee S22** suite a leçon S21 (US-26.1 a livre directement sur main sans verification preview, a fonctionne par chance).

Procedure :
1. Push la branche → declenche Vercel Preview deploy automatique
2. Recuperer l'URL preview (lien dans la PR ou Vercel dashboard)
3. Smoke test selon le type de hotfix :

| Type hotfix | Verification Vercel Preview |
|---|---|
| Headers HTTP (cache-control, security) | `curl -I {preview-url}/...` sur 3-5 routes critiques |
| UI/visuel | Browser navigation manuelle 5 min sur 2-3 user flows critiques |
| API/backend | `curl` ou Postman sur endpoints touches |
| Build/deps (lockfile, vuln) | `npm ci && npm run build` prouve par le succes du preview deploy lui-meme |
| Securite (CSP, HSTS) | DevTools Network tab + verifier headers |

**Si le preview KO** : ne pas merger. Ouvrir le diagnostic, fixer, re-push (Vercel re-build automatiquement le preview).

### Etape 4 — PR + merge main + smoke prod

- Ouvrir PR avec body structure : Summary + Test plan + Action PO post-merge si applicable
- Le PO valide le diagnostic + smoke preview (si applicable)
- Merge declenche auto-deploy production (5-10 min)
- Smoke test production avec memes commandes que Vercel Preview (etape 3) — sur le domaine prod (`https://freshworks.whataservice.fr`)

**Si le smoke prod KO** :
- Revert immediat (`git revert {commit-hash}` sur main, push, attendre redeploy)
- Investiguer cause hors-prod (le preview ayant marche, c'est probablement un drift env vars Vercel ou un cache CDN)

### Etape 5 — Update journal arbitrages CLAUDE.md (si decision structurelle)

Si le hotfix decoule d'une decision PO structurelle (= une regle nouvelle qui doit s'appliquer aux futurs sprints), ajouter une entree dans CLAUDE.md "Journal des arbitrages majeurs" : `D-{N+1} | description | impact`.

Exemples livres :
- D34 (S20) hotfix lockfile = nouvelle regle commit lockfile (D36)
- D39 (S21) US-26.1 hotfix Next.js HIGH = nouveau pattern hors-sprint pour vuln HIGH
- D40 (S21) drop S20 sur regression test = nouvelle DoD enrichie SEO/meta (T28)

**Si le hotfix est juste une correction sans regle nouvelle** : pas de D-{N+1}, juste les commits + le refinement light.

---

## 3 · Post-mortem (post-resolution, optionnel mais recommande)

Pour les hotfix de categorie 2-4 (incident prod, KPI effondre, bloqueur), conduire un mini post-mortem dans le sprint suivant :

- Ajouter une section "Post-mortem hotfix-{slug}" dans le refinement du sprint suivant
- 5 questions (modele 5 Whys ou variant) :
  1. Quel etait le symptome observable ?
  2. Quelle etait la cause racine ?
  3. Pourquoi le test n'a pas attrape le bug avant le deploy ? (= test gap a combler)
  4. Quel signal aurait pu detecter le bug plus tot ? (= monitoring gap a combler)
  5. Quelle regle structurelle prevent la recurrence ? (= candidate pour journal arbitrages)
- Outputs attendus : story candidate du sprint suivant pour combler les gaps test/monitoring

---

## 4 · Annexes — Hotfix livres en exemple

| ID | Date | Categorie | Pattern applique |
|---|---|---|---|
| US-26.1 | 27/04/2026 | Vuln HIGH (cat 1) | Hors-sprint immediat (D39). PR + merge main direct (sans verif preview — leçon retro S21). Update CLAUDE.md D39. |
| US-S20-BUG.1 | 26/04/2026 | Incident prod (cat 2) | Intra-sprint S20 (sprint en cours, integre comme bonus). |
| HOTFIX-S22.0a | 08/05/2026 | KPI effondre (cat 3) | Integre Sprint Planning S22 (Three Amigos refinement). PR + verif Vercel preview AVANT merge main. |
| OPS-S20.1 | 26/04/2026 | Bloqueur CI (cat 4) | Hors-sprint immediat (D34). Update CLAUDE.md D35-D36. |

---

## 5 · Ressources

- CLAUDE.md "Journal des arbitrages majeurs" — entree D{N} pour chaque hotfix structurel
- `docs/PROCESS.md` §6 — typologie evenements declencheurs (la categorie 4 hotfix entre dans 6.2 "red flag detecte")
- Runbook indexation : `seo-indexation-checklist.md` (cas SEO specifique)
- Runbook env vars : `vercel-env-vars.md` (cas env vars, S20 T24)

---

*Derniere mise a jour : 8 mai 2026 · Version 1.0 (T47 acquis S22) · Origine : leçon retro S21 (US-26.1 livre sans verif preview, a marche par chance) + HOTFIX-S22.0a (premier hotfix avec Three Amigos formel)*
