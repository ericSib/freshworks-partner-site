# Stories Ready — Definition of Ready (DoR)

> **But** : stocker les User Stories detaillees et pretes a etre prises par un developpeur.
> Une story n'entre ici **qu'apres validation de la Definition of Ready**.
> Source de verite planning : `../PRODUCT-PLANNING.md`.

---

## Pourquoi ce dossier

Le `PRODUCT-PLANNING.md` maintient la roadmap strategique Sprint N a N+5.
Ce dossier sert de tampon entre la roadmap et le Sprint : chaque story
Ready est un fichier Markdown independant (`US-XX.Y.md` ou `<slug>.md`).

---

## Definition of Ready (DoR)

Une story est Ready quand toutes les cases sont cochees :

- [ ] **Format standard** : role + action + benefice ("En tant que... je veux... afin de...")
- [ ] **3 a 5 criteres d'acceptation** en Given/When/Then (Gherkin)
- [ ] **Estimee** en story points (Fibonacci : 1, 2, 3, 5, 8, 13)
- [ ] **Pas de dependance bloquante** non resolue (decisions, specs, APIs externes)
- [ ] **Fichiers impactes** identifies (chemins relatifs depuis la racine)
- [ ] **Donnees de test** definies (fixtures, mocks, comptes de demo)
- [ ] **Perspective QA** : criteres de test automatisable identifies
- [ ] **DoD applicable** verifiee (voir section 7 du PRODUCT-BACKLOG equivalent)

---

## Template de story

Utiliser `_TEMPLATE.md` comme point de depart pour chaque nouvelle story.

---

## Workflow

```
Roadmap (one-liner) --> [Refinement Three Amigos] --> docs/stories-ready/<slug>.md --> Sprint --> Implementation --> Done
```

1. **Refinement** : le PO (avec les chapeaux Dev + QA) redige la story complete depuis un one-liner du planning.
2. **Review DoR** : checklist ci-dessus validee.
3. **Sprint Planning** : stories tirees depuis ce dossier vers le sprint actif.
4. **Apres implementation** : la story reste dans ce dossier pour tracabilite jusqu'a la cloture du sprint, puis peut etre archivee.

---

## Etat actuel au 16/04/2026

### Sprints anterieurs — **LIVRES**

| Sprint | Periode | Resultat | Stories (lien) |
|---|---|---|---|
| S13 "Fiabiliser et couvrir" | 11/04 | ✅ 6/6 stories DONE | US-15.4, US-18.9, US-21.1-3-5, US-15.4 |
| S14 "Consolider qualite interne" | 11-12/04 | ✅ 5/5 stories DONE | US-21.6, US-21.8, US-21.9, US-21.7, US-21.11 |
| S15 "Qualite avancee" | 12/04 | ✅ Stryker + ratchet 80% | US-21.10 |
| S16 "Core Web Vitals" | 12/04 | ✅ Lighthouse CI, grain perf, useReducedMotion | — |
| S17 "Refonte homepage" | 12/04 | ✅ 8 offres complexity-first, narratif PAS, sticky CTA | — |

Les fichiers `US-15.4.md`, `US-18.9.md`, `US-21.*.md` sont conserves en
reference historique. Ils ne sont plus candidats au tirage Sprint.

### Sprint 18 "Refonte quiz → Service Maturity Index™" — **EN COURS (J5/7)**

| Ordre | Story | Pts | Statut DoR | Etat | Fichier |
|---|---|---|---|---|---|
| 1 | T16 — Test i18n deep parity | 1 | ✅ Ready | ✅ Done `ba410c1` | — (retro S17) |
| 2 | SMI-rename — Renommage SMI™ | 2 | ✅ Ready | ✅ Done `efd55ee` | — (retro S17) |
| 3 | OPS-obs — Observabilite API (D19, mi-sprint) | 1 | ⚠️ Spec tardive | ✅ Done `97913b8` | — |
| 4 | SMI-esm — Full ESM path | 6 | ❌ **NOT READY** | 🔴 Non demarre | [SMI-esm.md](./SMI-esm.md) |
| 5 | SMI-roi — ROI estime | 2 | ❌ **NOT READY** | 🔴 Non demarre | [SMI-roi.md](./SMI-roi.md) |
| 6 | SMI-offers — Mapping maturite → offre | 2 | ❌ **NOT READY** | 🔴 Non demarre | [SMI-offers.md](./SMI-offers.md) |

**Total engage** : 14 pts / 20 pts capacite
**Livre a J5** : 4 pts (T16 + SMI-rename + OPS-obs)
**Restant** : 10 pts non demarres, 3 stories NOT READY

### Decisions bloquantes ouvertes (cf. [sprint-18-refinement.md](../refinement/sprint-18-refinement.md))

| ID | Decision | Bloque |
|---|---|---|
| D20 | Choix des 5 dimensions ESM | SMI-esm |
| D21 | Source benchmarks ROI + inputs moteur (score seul ou + taille ?) | SMI-roi |
| D22 | Regle mapping maturite → offre (matrice 5×3 ou regle generique ?) | SMI-offers |

**Recommandation PO** : ces 3 decisions doivent etre tranchees en Sprint Review
Sprint 18 (17/04) avant de lancer Sprint 19 sur la finition SMI.

---

## Decisions historiques tranchees (reference)

| Decision | Statut | Impact |
|----------|--------|--------|
| **D3** : Archi API quiz | ✅ Option A — endpoint dedie `/api/quiz/submit` | US-18.9 livre S13 |
| **D4** : Priorite Playwright CI | ✅ Must (ex-Could) | US-15.4 livre S13 |
| **D6** : Scope US-10.1 "E2E complementaires" | ✅ Backlog lointain (archive) | — |
| **D8** : Structured logging Sprint 14 vs lointain | ✅ Backlog lointain (devenu D19 Sprint 18) | OPS-obs livre S18 |
| **D13** : Seuil coverage vitest 60% → 70% → 80% | ✅ 80% atteint fin S15 | — |
| **D16** : Quiz → Service Maturity Index™ (5 dim, pas de dim IA) | ✅ Tranche 12/04 | Cadrage S18 |
| **D19** : Observabilite API (logger JSON + correlation ID + deep health) | ✅ Tranche 14/04 mi-sprint 18 | OPS-obs livre |

---

## Stories en attente de redaction

Aucune — mais les 3 stories SMI engagees Sprint 18 sont NOT READY
(bloquees par D20/D21/D22). Le Sprint Planning a ete mene sans
refinement prealable — trace regularisee dans `sprint-18-refinement.md`.

---

*docs/stories-ready/README.md — dernier update : 16/04/2026 (mise au propre post-Sprint 17, backfill refinement S18)*
