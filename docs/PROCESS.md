# PROCESS.md — Process et workflows Freshworks Partner Site

> **Ce document est le manuel operationnel du projet.** Il repond a la question : « Dans la situation X, quoi faire, dans quel ordre, dans quels fichiers ? ». Il est reference par `CLAUDE.md` et doit etre consulte systematiquement en debut de chaque session.

**Version** : 1.0 · **Derniere mise a jour** : 12 avril 2026

---

## Ancrage — Manifeste Agile

Ce document derive directement des **4 valeurs** et **12 principes du Manifeste Agile**. Chaque workflow, chaque rituel, chaque regle repond explicitement a un ou plusieurs d'entre eux. Quand une tension apparait entre un process decrit ici et le Manifeste, **c'est le Manifeste qui prime** — le conflit remonte au PO et se resout via la boucle universelle.

### Cartographie Manifeste → Process WaS

| Valeur / Principe Manifeste | Materialisation dans ce document |
|---|---|
| **V1** · Individus et echanges > processus et outils | §4.5 Refinement Three Amigos, §9 Skills, §2 boucle universelle |
| **V2** · Produit fonctionnel > documentation plethorique | §4.3 Sprint Review avec demo live, §5 TDD, §7 Quality gates |
| **V3** · Collaboration du client > negociation du contrat | §4.1 Sprint Planning avec PO co-constructeur |
| **V4** · Reactivite au changement > suivi d'un plan | §4.1 « Sprint Goal engage, forecast adapte », §6.1 decisions PO |
| **P1** · Livraison precoce et continue | §4.3 Sprint Review obligatoire tous les 7 jours |
| **P3** · Livraison frequente (1 semaine) | Cadence sprint 1 semaine stricte (§4) |
| **P4** · Collaboration quotidienne | §4.2 auto-daily en debut de session |
| **P8** · Rythme soutenable | §4.1 capacite ≤ 20 SP |
| **P9** · Excellence technique | §5 TDD strict, §7 Quality gates (coverage ≥ 70 %, axe-core, Lighthouse ≥ 90) |
| **P10** · Simplicite | §6.4 vigilance scope (site vitrine, pas SaaS) |
| **P12** · Reflexion et ajustement | §4.4 Sprint Retrospective + §6.7 insights dans la boucle |

### Regles de souverainete

1. **Valeur avant principe** — quand une valeur et un principe semblent contradictoires, la valeur prime
2. **Manifeste avant PROCESS.md** — quand une regle de ce document contredit le Manifeste, c'est ce document qui est faux
3. **Le produit avant la documentation** — si ecrire un process prend plus de temps que le faire, on le fait d'abord
4. **Le dialogue avant le formalisme** — si la clarte vient d'un echange plutot que d'un document, on echange d'abord

---

## Principe directeur — Un seul process universel

**Toute situation passe par la meme boucle.** Il n'y a pas de workflow specifique pour une decision, un bug, un red flag ou une idee.

```
EVENEMENT  →  REFINEMENT THREE AMIGOS  →  UPDATE BACKLOG
```

Et **chaque sprint suit strictement 4 rituels dans l'ordre** :

```
1. Sprint Planning (Jour 1)
2. Developpement + Auto-daily (Jours 1-6)
3. Sprint Review (Jour 7 matin)
4. Sprint Retrospective (Jour 7 apres-midi)
```

---

## Table des matieres

- [1 · Routine de demarrage de session](#1--routine-de-demarrage-de-session)
- [2 · Boucle universelle — Event → Refinement → Backlog](#2--boucle-universelle--event--refinement--backlog)
- [3 · Cycle de vie d'une User Story](#3--cycle-de-vie-dune-user-story)
- [4 · Les 4 rituels de sprint](#4--les-4-rituels-de-sprint)
- [5 · Workflow code — TDD, commits, PRs](#5--workflow-code--tdd-commits-prs)
- [6 · Typologie des evenements declencheurs](#6--typologie-des-evenements-declencheurs)
- [7 · Quality gates et Definition of Done](#7--quality-gates-et-definition-of-done)
- [8 · Matrice « Quel fichier toucher quand »](#8--matrice--quel-fichier-toucher-quand-)
- [9 · Skills a invoquer selon la situation](#9--skills-a-invoquer-selon-la-situation)
- [10 · Escalation et pause PO](#10--escalation-et-pause-po)
- [11 · Mise a jour de ce document](#11--mise-a-jour-de-ce-document)

---

## 1 · Routine de demarrage de session

**A executer systematiquement a l'ouverture d'une session Claude Code, avant toute action productive.**

### Sequence stricte

```
1. Lire CLAUDE.md                                     (constitution, regles immuables)
2. Lire docs/PROCESS.md                               (ce document — workflows)
3. Lire docs/PO-CADRAGE.md                            (vision, KPIs, personas, stack)
4. Lire docs/backlog/sprint-current.md                (sprint en cours + Sprint Goal)
5. Lire le dernier fichier docs/refinement/*.md       (decisions recentes)
6. Verifier la liste des Todos en attente             (progression trackee)
7. Verifier l'etat Git (branche, commits WIP)         (reprise de contexte)
```

### Questions a repondre avant d'agir

- [ ] Quel est le **Sprint Goal en cours** ?
- [ ] Quelle **story en cours** (ou a demarrer) — ID, estimation, priorite ?
- [ ] Quels sont les **arbitrages recents** qui pourraient impacter ce que je vais faire ?
- [ ] Y a-t-il des **red flags ouverts** ?
- [ ] Quels **quality gates** doivent etre satisfaits pour cette story ?
- [ ] Quels **tests prealables** dois-je ecrire avant l'implementation (TDD) ?
- [ ] Quelles **dependances** (stories, libs, decisions) sont necessaires ?

Si une question reste sans reponse → pauser et demander au PO.

---

## 2 · Boucle universelle — Event → Refinement → Backlog

**C'est le seul process autorise pour modifier le backlog.**

### Schema global

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│   ① EVENEMENT DETECTE                                            │
│     (voir §6 — Typologie des evenements)                         │
│                              ↓                                   │
│                                                                  │
│   ② REFINEMENT THREE AMIGOS                                      │
│     Chapeaux : PO (valeur) + Dev (technique) + QA (qualite)     │
│     Format : analyse + AC + plan de test                         │
│     Output : docs/refinement/<session>.md                        │
│                              ↓                                   │
│                                                                  │
│   ③ UPDATE BACKLOG                                               │
│     Fichiers potentiellement impactes :                          │
│       • docs/backlog/sprint-current.md                           │
│       • docs/stories-ready/US-XX.Y.md                            │
│       • CLAUDE.md (si structurel)                                │
│       • docs/PO-CADRAGE.md (si nouvelle decision strategique)    │
│                              ↓                                   │
│                                                                  │
│   ④ STORIES READY POUR LE SPRINT EN COURS OU A VENIR             │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Procedure en 5 etapes

#### Etape 1 — Ouvrir (ou continuer) une session de refinement

Fichier : `docs/refinement/<session-en-cours>.md`

**Regle** : on ne cree pas un nouveau fichier refinement pour chaque evenement. On ajoute a la session en cours. Nouvelle session uniquement :
- Au prealable d'un nouveau sprint (`sprint-N-refinement.md`)
- Quand une session devient trop volumineuse (> 1 000 lignes)
- Sur demande explicite du PO

**Structure obligatoire d'une session de refinement** :

```markdown
# Refinement — <titre court>

> **Date** · **Sprint vise** · **Duree**
> **Declencheurs** : evenement(s) qui ont ouvert cette session

## 1 · Decisions et arbitrages
## 2 · Strategie de test et risques qualite
## 3 · Stories raffinees (une section par story)
    ### US-X.Y — titre
    #### PO — Clarifications et valeur
    #### Dev — Plan technique
    #### QA — Plan de test
## 4 · Setup transverse (tasks preparatoires)
## 5 · Quality gates
## 6 · Red flags detectes
## 7 · Sortie de la session (stories Ready)
## 8 · Decisions arbitrees par le PO
```

#### Etape 2 — Passer l'evenement aux 3 chapeaux

**Chapeau PO** — Pourquoi ? Quelle valeur business ? Quelles questions ouvertes ?
**Chapeau Dev** — Comment implementer ? Dans quels fichiers ? Quels risques techniques ?
**Chapeau QA** — Quelle technique de test ? Quels tests AVANT l'implementation ?

**Regle** : une story n'est pas Ready tant que les 3 chapeaux n'ont pas donne leur accord.

#### Etape 3 — Consigner la decision ou le changement

Dans la section appropriee du refinement.

#### Etape 4 — Propager au backlog

Commit : `chore(backlog): propagate <refinement-session> changes`

#### Etape 5 — Confirmer au PO

Liste exhaustive des fichiers modifies + stories passees Ready.

### Ce qu'on ne fait JAMAIS

- Modifier le backlog **sans** passer par un refinement
- Laisser une decision PO uniquement dans le chat sans la consigner
- Ouvrir un workflow parallele « pour aller plus vite »
- Modifier `PO-CADRAGE.md` ou `CLAUDE.md` pour un changement non structurel

---

## 3 · Cycle de vie d'une User Story

```
Inbox → Redigee → Raffinee → Ready → Committed → In Progress → In Review → Done
```

| Etat | Description | Fichier |
|---|---|---|
| **Inbox** | Idee brute dans un refinement | `docs/refinement/*.md` |
| **Redigee** | Format User Story + ID + Epic | `docs/stories-ready/US-XX.Y.md` (brouillon) |
| **Raffinee** | 3-5 AC Gherkin + estimation + tags | `docs/stories-ready/US-XX.Y.md` |
| **Ready** | DoR cochee integralement | `docs/stories-ready/US-XX.Y.md` |
| **Committed** | Inscrite dans sprint-current.md | `docs/backlog/sprint-current.md` |
| **In Progress** | Dev demarre, branche Git creee | Branche `feature/US-XX.Y-short-name` |
| **In Review** | Code pousse, quality gates tournent | PR ou merge direct |
| **Done** | DoD cochee, merge sur main | `docs/backlog/sprint-current.md` (statut Done) |

---

## 4 · Les 4 rituels de sprint

**Cadence : 1 semaine stricte.** Les rituels s'enchainent en boucle.

```
┌──── Sprint N ────┐             ┌──── Sprint N+1 ────┐
│  1 · PLANNING    │             │  1 · PLANNING      │
│      (Jour 1)    │             │       ↑            │
│       ↓          │             │  Refinement        │
│  2 · DEV         │             │  preparatoire      │
│    + Auto-daily  │             │       ↑            │
│    (Jours 1-6)   │             │       │            │
│       ↓          │             │       │            │
│  3 · REVIEW      │             │       │            │
│    (Jour 7 am)   │             │       │            │
│       ↓          │             │       │            │
│  4 · RETRO  ─────┼─── issues ──┘       │            │
│    (Jour 7 pm)   │             │                    │
└──────────────────┘             └────────────────────┘
```

### 4.1 · Sprint Planning (Jour 1 — matin)

**Inputs** : refinement preparatoire, stories Ready, capacite (~20 SP), feedback retro
**Sequence** :
1. Formuler le Sprint Goal (outcome-focused, pas une liste de PBIs)
2. Selectionner les stories qui contribuent au Sprint Goal
3. **Verifier l'etat reel de chaque story (T1-v2)** — pour chaque candidate, executer les tests existants et lire le code source. Si le code est deja ecrit → story ecartee immediatement. Ne jamais engager une story sans cette verification.
4. Verifier que chaque story retenue est Ready (DoR)
5. Decomposer en tasks techniques
**Output** : `docs/backlog/sprint-current.md` mis a jour

**Regle cardinale** : le Sprint Goal engage, la liste de stories est un forecast.

### 4.2 · Developpement + Auto-daily (Jours 1-6)

**Au demarrage de CHAQUE session Claude Code** — auto-daily :
1. Lire CLAUDE.md + PROCESS.md + PO-CADRAGE.md + sprint-current + refinement (cf. §1)
2. Repondre aux 3 questions : Qu'ai-je livre ? Que vais-je livrer ? Blocage ?
3. Mettre a jour les Todos
4. **Demarrer par ecrire les tests** (TDD strict)

**Discipline** :
- Branches < 1 jour, merge vers `main` quotidien
- Commits conventional
- Quality gates a chaque merge
- Aucun `// TODO` laisse en place

### 4.3 · Sprint Review (Jour 7 — matin)

**Sequence** :
1. Presenter l'increment livre — demo live sur le site reel (Vercel)
2. Comparer au Sprint Goal — atteint oui / partiellement / non ?
3. Lister les stories livrees (Done) vs engagees (forecast)
4. Identifier les apprentissages
5. Recueillir le feedback du PO

**Quality gate** : la demo doit fonctionner **sans bricolage**.

### 4.4 · Sprint Retrospective (Jour 7 — apres-midi)

**Format** : Keep / Drop / Try
Pour chaque entree : cause racine + action concrete + metrique de succes
**Regle** : chaque insight entre dans la boucle universelle.

### 4.5 · Refinement preparatoire (entre Retro N et Planning N+1)

**Format** : Three Amigos complet (PO + Dev + QA)
**Inputs** : stories pre-allouees au sprint N+1, insights retro, red flags ouverts
**Regle** : sans refinement preparatoire, le Sprint Planning N+1 ne peut pas avoir lieu.

---

## 5 · Workflow code — TDD, commits, PRs

### 5.1 · Avant d'ecrire du code

1. Verifier que la story est **Ready** (DoR cochee)
2. Lire les **criteres d'acceptation** Gherkin
3. Creer une branche `feature/US-XX.Y-short-description`
4. **Ecrire les tests D'ABORD** (TDD strict)

### 5.2 · TDD strict — sequence Red/Green/Refactor

```
1. ROUGE — Ecrire un test qui echoue
   - Le test exprime le COMPORTEMENT attendu (derive des AC)
   - Verifier qu'il echoue pour la bonne raison
   - NE PAS ecrire l'implementation a cette etape

2. VERT — Ecrire le code MINIMUM pour faire passer le test
   - Pas de code en avance sur les tests
   - Resister a la tentation de generaliser prematurement

3. REFACTOR — Ameliorer le code sans changer le comportement
   - Les tests doivent toujours passer apres refactoring
   - Eliminer la duplication, ameliorer le nommage, simplifier

4. COMMIT et passer au prochain test
```

### 5.3 · Convention de commits

Format : `type(scope): description` — enforced par commitlint + husky.

**Types** : feat, fix, refactor, test, docs, style, perf, chore, ci

**Scopes** : hero, services, products, process, about, contact, metrics, cases, problems, clients, layout, header, footer, i18n, config, ui, seo, a11y, e2e, ci, deps, redesign, quiz, api, hubspot

Regles :
- **1 commit = 1 intention**
- Scope obligatoire pour feat, fix, refactor, test
- Body requis si 5+ fichiers touches — expliquer WHY
- Reference tickets : `Closes #XX` ou `Refs US-XXX`
- Separer refactoring et feature en commits distincts

### 5.4 · Quality gates avant merge

Ces gates doivent **tous etre verts** :

- `npm run build` → 0 erreur
- `npm run lint` → 0 erreur
- `npm run test` → 100 % pass
- Coverage global ≥ 70 %, nouveau code ≥ 80 %
- axe-core → 0 violation critique/serieuse
- Contenu bilingue FR + EN (si UI)
- Responsive 375px + 1440px (si UI)
- Aucun secret hardcode

---

## 6 · Typologie des evenements declencheurs

**Tous suivent la meme boucle universelle §2.**

### 6.1 · Decision PO arbitree

Propagation : refinement §8 + sprint-current.md + stories + CLAUDE.md (si structurelle)

### 6.2 · Red flag detecte

| Niveau | Action |
|---|---|
| Critique (bloque le Sprint Goal) | Pauser, arbitrage PO, refinement §6 |
| Eleve (impacte une story majeure) | Documenter, proposer mitigation |
| Moyen (contournable) | Documenter, decider en autonomie si trivial |
| Faible (opportunite) | Noter avec tag « Opportunite » |

### 6.3 · Bug reproductible

1. Reproduire avec un test qui echoue
2. Ouvrir une story dans `docs/stories-ready/`
3. Corriger en TDD (le test echoue = le Red du cycle)
4. Commit : `fix(scope): description — Refs US-XXX`

### 6.4 · Nouveau besoin produit

1. Noter dans le refinement comme nouvelle story
2. Passer aux 3 chapeaux (PO / Dev / QA)
3. Si hors scope site vitrine → backlog Phase 2

### 6.5 · Changement i18n/contenu

1. Modifier `src/messages/{fr,en}.json`
2. Verifier coherence FR/EN
3. Commit : `feat(i18n): description`

### 6.6 · Changement API/integration (HubSpot, Resend, GA4)

1. Evaluer l'impact sur les routes API et le schema Zod
2. Verifier les variables d'environnement
3. Mettre a jour les tests d'integration
4. Commit : `feat(api): description` ou `fix(hubspot): description`

### 6.7 · Sortie de Sprint Retrospective

Chaque insight Keep/Drop/Try → entree dans le refinement preparatoire du sprint N+1.

### 6.8 · Arbitrage necessaire (2+ options viables)

```markdown
### Arbitrage demande — [titre]

**Contexte** : [2-3 lignes]
**Option A** : [description] → [consequence]
**Option B** : [description] → [consequence]
**Recommandation Three Amigos** : Option X parce que [...]
Attente decision PO.
```

---

## 7 · Quality gates et Definition of Done

### 7.1 · Definition of Ready (DoR)

- [ ] Format standard (role + action + benefice)
- [ ] 3-5 criteres d'acceptation Gherkin
- [ ] Estimation Fibonacci (1-8 SP max pour sprint 1 semaine)
- [ ] Pas de dependance bloquante non resolue
- [ ] Fichiers impactes identifies
- [ ] Donnees de test definies
- [ ] Criteres de test automatisable (QA)

### 7.2 · Definition of Done (DoD)

- [ ] Tests ecrits AVANT l'implementation (TDD)
- [ ] `npm run build` passe
- [ ] `npm run lint` — 0 erreur
- [ ] `npm run test` — tous les tests passent
- [ ] Coverage ≥ 80 % sur le nouveau code
- [ ] axe-core — 0 violation critique/serieuse (si UI)
- [ ] Contenu bilingue FR + EN (si UI)
- [ ] Responsive mobile 375px + desktop 1440px (si UI)
- [ ] Commit conventionnel : `type(scope): description`
- [ ] Aucun secret hardcode
- [ ] Story fermee dans sprint-current.md

### 7.3 · CI stages

```
Stage 1 · Pre-commit (local, < 10s)
  → commitlint + next lint (quiet)

Stage 2 · PR / Merge Gate (CI, < 5min)
  → build + lint + tests + coverage ≥ 70%

Stage 3 · Playwright E2E (CI, a venir — US-15.4)
  → 104 tests Playwright + axe-core
```

---

## 8 · Matrice « Quel fichier toucher quand »

| Situation | Fichier(s) a modifier | Fichier(s) a lire d'abord |
|---|---|---|
| Nouvelle idee de story | `docs/refinement/*.md` (section Inbox) | `docs/PO-CADRAGE.md` (scope) |
| Story entre en refinement | `docs/refinement/sprint-N-refinement.md` | `docs/stories-ready/US-XX.Y.md` |
| Decision PO prise | `docs/refinement/*.md` + `sprint-current.md` + story + `CLAUDE.md` (si structurelle) | Refinement en cours |
| Story deplacee entre sprints | `sprint-current.md` | Refinement + capacite |
| Red flag detecte | `docs/refinement/*.md` (section Red flags) | Story impactee |
| Bug reproduit | `docs/stories-ready/US-XX.Y.md` (nouvelle story) | Story originale |
| Contenu i18n change | `src/messages/{fr,en}.json` | Composant concerne |
| API/integration change | `src/app/api/**` + `src/lib/**` | Schema Zod + tests |
| Sprint se termine | Sprint Review notes + Retro notes | Sprint Goal |
| Nouveau sprint demarre | `sprint-current.md` + `docs/refinement/sprint-N-refinement.md` | Retro precedente |
| Quality gate ajoute | `CLAUDE.md` + `docs/PROCESS.md` (§7) + CI config | Stage concerne |

---

## 9 · Skills a invoquer selon la situation

| Situation | Skills a invoquer |
|---|---|
| Cadrage produit / rediger une story | `agile-product-owner` |
| Refinement Three Amigos complet | `agile-product-owner` + `dev-clean-code` + `dev-git-workflow` + `qa-strategy` + `qa-test-design` + `qa-acceptance` + `qa-unit-integration` + `qa-e2e` + `qa-cicd` |
| Refinement courant (sprint N ≥ 2) | `agile-product-owner` + `qa-acceptance` + `qa-test-design` |
| Nommage, SOLID, refactoring | `dev-clean-code` |
| Refactoring profond | `dev-refactoring` |
| Strategie de test | `qa-strategy` |
| Deriver des cas de test | `qa-test-design` |
| Ecrire tests unitaires/integration TDD | `qa-unit-integration` |
| Ecrire tests E2E Playwright | `qa-e2e` |
| Tests performance / securite / a11y | `qa-nonfunctional` |
| Configurer CI/CD pipeline | `qa-cicd` |
| Commit, branche, PR, conflit Git | `dev-git-workflow` |
| Interface web premium | `premium-frontend` |

---

## 10 · Escalation et pause PO

### Situations qui declenchent une pause obligatoire

1. **Ambiguite scope** — la demande sort du site vitrine
2. **Regle immuable violee** — contredit une regle du CLAUDE.md
3. **Story > 8 SP** — trop grosse pour un sprint d'1 semaine
4. **Red flag critique** — ne peut pas etre resolu en autonomie
5. **Quality gate echoue 3 fois** — sur la meme story
6. **Test flaky 3 fois** — sans changement de code
7. **Dependance externe bloquante** — API tierce change
8. **Securite ou RGPD en jeu**
9. **Nouvelle dependance npm** — ajout/suppression/upgrade majeur
10. **Secret a manipuler** — hors variables d'environnement

### Format de question au PO

```markdown
**Pause demandee — [titre court]**

**Contexte** : [3 lignes max]
**Blocage** : [ce qui empeche d'avancer]
**Options** :
  A · [option] → [consequence]
  B · [option] → [consequence]
**Recommandation** : [A ou B, pourquoi]

Attente decision PO avant reprise.
```

---

## 11 · Mise a jour de ce document

Ce fichier est **vivant**. Il evolue quand :
- Un nouveau workflow recurrent est identifie
- Une regle de qualite change
- Une decision structurelle est prise
- Un skill est ajoute au projet
- Une retrospective revele un process manquant

**Qui peut le modifier** : uniquement sur arbitrage PO explicite.

---

*Version 1.0 · 12 avril 2026*
