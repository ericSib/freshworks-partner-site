# Sprint 18 — "Refonte quiz → Service Maturity Index™"

> **Sprint Goal** : Transformer le quiz en Service Maturity Index™ avec 3 parcours (ITSM/CX/ESM), ROI estime et mapping maturite → offres.
> **Debut** : 12 avril 2026
> **Fin** : 18 avril 2026
> **Capacite** : 20 pts (engage 14 pts apres ajout OPS-obs mi-sprint)
> **Sprint Review** : 17/04 (avancee d'un jour pour traiter les 3 decisions D20-D22)

---

## Stories engagees

| ID | Titre | Pts | Priorite | Statut | Commit |
|---|---|---|---|---|---|
| T16 | Test coherence i18n FR/EN (recursive deep compare) | 1 | Must | ✅ Done | `ba410c1` |
| SMI-rename | Renommage quiz → Service Maturity Index™ | 2 | Must | ✅ Done | `efd55ee` |
| OPS-obs | Observabilite API (logger JSON + correlation ID + deep health) | 1 | Should | ✅ Done | `97913b8` |
| SMI-esm | Full ESM path (config + questions + dimensions + i18n) | 6 | Must | 🔴 Non demarre | — |
| SMI-roi | ROI estime dans resultats | 2 | Should | 🔴 Non demarre | — |
| SMI-offers | Mapping maturite → offre WaS recommandee | 2 | Should | 🔴 Non demarre | — |

**Total engage** : 14 pts / 20 pts capacite
**Livre a J5 (16/04)** : **4 pts** (T16 + SMI-rename + OPS-obs)
**Restant** : 10 pts non demarres, 3 stories NOT READY (bloquees par D20/D21/D22)

---

## Etat refinement des stories

| Story | DoR | Fichier | Bloque par |
|---|---|---|---|
| T16 | ✅ Ready (retro S17) | — | — |
| SMI-rename | ✅ Ready (retro S17) | — | — |
| OPS-obs | ⚠️ Spec tardive (ajout mi-sprint) | — | — |
| SMI-esm | ❌ NOT READY | [stories-ready/SMI-esm.md](../stories-ready/SMI-esm.md) | D20 |
| SMI-roi | ❌ NOT READY | [stories-ready/SMI-roi.md](../stories-ready/SMI-roi.md) | D21 |
| SMI-offers | ❌ NOT READY | [stories-ready/SMI-offers.md](../stories-ready/SMI-offers.md) | D22 |

Refinement retroactif : [refinement/sprint-18-refinement.md](../refinement/sprint-18-refinement.md).

---

## Decisions bloquantes

| ID | Decision | Urgence |
|---|---|---|
| D20 | Choix des 5 dimensions ESM pour le parcours SMI | Sprint Review S18 (17/04) |
| D21 | Source benchmarks ROI + inputs moteur | Sprint Review S18 (17/04) |
| D22 | Regle mapping maturite → offre (matrice 5×3 ou generique) | Sprint Review S18 (17/04) |

---

## Scenario de fin de sprint (J6-J7)

**Option A recommandee (descope)** — aligne sur le principe Manifeste #8 (rythme soutenable) :
- Arreter toute ambition de demarrer SMI-esm/roi/offers sans DoR
- Preparer la Sprint Review du 17/04 avec :
  - Demo des 4 pts livres (T16, SMI-rename, OPS-obs)
  - Presentation des 3 stories Ready-apres-blocage (attendent D20/D21/D22)
  - Arbitrage PO sur D20/D21/D22 pour debloquer Sprint 19
- Reaffecter les 10 pts restants sur Sprint 19 (8 pts SMI + 2 pts autres)

**Option B (pas recommandee)** : tenter l'implementation monolithique → quality
gates en echec garantis, violation principe #9 (excellence technique).

---

*Derniere mise a jour : 16/04/2026 — mise au propre + backfill refinement.*
