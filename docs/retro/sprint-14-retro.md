# Sprint Retrospective — Sprint 14 "Industrialiser la qualite et poser les fondations SEO"

> **Date** : 12 avril 2026
> **Format** : Keep / Drop / Try
> **Sprint Goal** : Industrialiser la qualite et poser les fondations SEO — **ATTEINT**

---

## KEEP

### K1 · Forecast conservateur post-retro
- **Cause racine** : le forecast de 10 pts (vs 20 pts capacite) a evite de planifier 20 pts avec 16 pts fantomes
- **Action** : maintenir un forecast < 50% capacite tant que le backlog n'est pas fiabilise
- **Metrique** : ratio travail reel / pts planifies > 50%

### K2 · Stryker sur les modules critiques
- **Cause racine** : le mutation testing a revele que `hubspot.ts` a 26% de score — une dette invisible aux tests classiques
- **Action** : conserver Stryker dans la toolchain, ratchet +5% par sprint
- **Metrique** : mutation score global ≥ 55% (baseline)

### K3 · Ratchet incremental des seuils
- **Cause racine** : le seuil coverage passe de 70% a 75% sans friction (marge de 12%)
- **Action** : continuer le ratchet +5% par sprint jusqu'a 85%
- **Metrique** : seuil CI = 80% au Sprint 16

---

## DROP

### D1 · Planifier des stories sans verification au Sprint Planning
- **Cause racine** : T1 (verification au refinement) a ecarte US-21.9 et US-21.7, mais US-22.SEO, US-22.6 et US-17.1 ont passe sans verification et se sont revelees deja done
- **Action** : **deplacer T1 au Sprint Planning** — chaque story est verifiee (test + code) AVANT d'etre engagee, pas seulement au refinement
- **Impact** : 6 pts fantomes sur 10 = 60% de gaspillage de planification

### D2 · Stories dans le backlog sans date de derniere verification
- **Cause racine** : les backlogs (BACKLOG-REFONTE-PREMIUM.md, BACKLOG-AUDIT-REMEDIATION.md, E22-SEO-GEO) ne portent pas de date de derniere verification. Impossible de savoir si une story est encore d'actualite
- **Action** : ajouter un champ "Dernier check" a chaque story du backlog

---

## TRY — entrees pour le refinement Sprint 15

### T1-v2 · Verification au Sprint Planning (pas au refinement)
- **Quoi** : au Sprint Planning, chaque story est verifiee en direct : `git log`, lecture du code, execution des tests. Si le code existe deja → story ecartee immediatement
- **Pourquoi** : T1-v1 (verification au refinement) ne suffit pas — les stories non-verifiees passent quand meme
- **Owner** : PO + Dev
- **Metrique** : 0 story fantome engagee au Sprint 15

### T5 · Couvrir hubspot.ts wrappers en mutation testing
- **Quoi** : ajouter des tests unitaires pour `findContactByEmail`, `createContact`, `updateContact` (mock fetch)
- **Pourquoi** : hubspot.ts a 26% mutation score, tire le global vers le bas
- **Owner** : Dev/QA
- **Metrique** : hubspot.ts mutation score ≥ 50%

### T6 · Ratchet mutation score a 60%
- **Quoi** : monter le seuil Stryker `break` de 55% a 60% apres amelioration hubspot.ts
- **Pourquoi** : l'objectif initial (CLAUDE.md regle 16 dans Diabolo) est ≥ 60%
- **Owner** : Dev
- **Metrique** : `npm run test:mutation` passe avec break: 60

### T7 · Auditer et archiver les backlogs obsoletes
- **Quoi** : passer en revue BACKLOG-REFONTE-PREMIUM.md, BACKLOG-AUDIT-REMEDIATION.md, E22-SEO-GEO — marquer les stories done, archiver les obsoletes
- **Pourquoi** : les backlogs contiennent des stories deja livrees qui polluent la planification
- **Owner** : PO
- **Metrique** : chaque story backlog porte un statut verifie (Done/Active/Obsolete)

---

*Chaque Try entre dans le refinement preparatoire Sprint 15 via la boucle universelle (PROCESS.md §2).*
