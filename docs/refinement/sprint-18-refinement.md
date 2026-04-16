# Refinement — Sprint 18 preparatoire (backfill)

> **Date de backfill** : 16 avril 2026
> **Sprint vise** : Sprint 18 "Refonte quiz → Service Maturity Index™"
> **Periode couverte** : 12 avril (Sprint Planning) → 16 avril (mise au propre)
> **Nature** : document rétroactif produit lors du nettoyage du 16/04, pour
> combler l'absence de trace refinement au démarrage du sprint.

---

## 0 · Preambule — pourquoi un backfill

Sprint 18 a demarre le 12/04 directement sur le Sprint Planning, sans trace
ecrite de refinement Three Amigos. La boucle universelle (CLAUDE.md §
"Boucle universelle") exige que tout evenement passe par un refinement
avant de modifier le backlog. Ce document corrige l'oubli en documentant
a posteriori :

- Les Try de la retro Sprint 17 (T15 quiz → SMI, T16 test i18n parity)
- L'arbitrage des stories SMI engagees dans le sprint
- La decision D19 (observabilite API) arrivee mi-sprint

Ce backfill n'invente rien : il acte des decisions deja prises et deja
partiellement livrees.

---

## 1 · Sources de stories

### Retro Sprint 17 — Try

| ID | Origine | Traduction Sprint 18 |
|---|---|---|
| T15 | Try retro S17 | SMI-rename + SMI-esm + SMI-roi + SMI-offers |
| T16 | Try retro S17 | T16 test i18n deep parity |

### Decision PO mi-sprint

| ID | Declencheur | Action |
|---|---|---|
| D19 | Alerte ops : `/api/health` 200 meme quand HubSpot/Resend KO + logs non correles | Story OPS-obs ajoutee mi-sprint |

**Violation constatee** : D19 a ete integre sans passage par refinement.
Regularise ici. A retenir comme point retro Sprint 18.

---

## 2 · Verification etat reel (application de T1-v2 PROCESS.md §4.1)

| Story candidate | Etat reel verifie le 12/04 | Decision |
|---|---|---|
| T16 (1 pt) — Test i18n deep parity | Non implemente | Engage |
| SMI-rename (2 pts) — Renommage SMI™ | Non implemente | Engage |
| SMI-esm (6 pts) — Full ESM path | Non implemente, aucun fichier `esm.ts` | Engage |
| SMI-roi (2 pts) — ROI estime | Non implemente | Engage |
| SMI-offers (2 pts) — Mapping maturite → offre | Non implemente | Engage |
| OPS-obs (1 pt) — Observabilite API | Non implemente | Ajout mi-sprint (14/04) |

**Bilan T1-v2** : 0 pt fantome. Les 6 stories sont bien du travail reel.

---

## 3 · Sprint Goal

> **"Transformer le quiz en Service Maturity Index™ avec 3 parcours (ITSM/CX/ESM), ROI estime et mapping maturite → offres"**
>
> Test du Goal : un visiteur choisit ITSM, CX ou ESM sur `/quiz`, complete
> le questionnaire, voit son score de maturite, une estimation de ROI
> indicative et l'offre WaS recommandee en sortie.

---

## 4 · Stories engagees

| Ordre | ID | Pts | Priorite | Statut refinement |
|---|---|---|---|---|
| 1 | T16 | 1 | Must | Spec claire (test recursif FR/EN identique) |
| 2 | SMI-rename | 2 | Must | Spec claire (i18n + composants uniquement) |
| 3 | SMI-esm | 6 | Must | **Spec insuffisante** — 5 dimensions a trancher, 7-10 questions a ecrire |
| 4 | SMI-roi | 2 | Should | **Spec insuffisante** — source benchmarks + inputs a preciser |
| 5 | SMI-offers | 2 | Should | **Spec insuffisante** — regle de mapping a trancher |
| 6 | OPS-obs | 1 | Should | Spec claire (ajoutee mi-sprint) |

**Total engage** : 14 pts / 20 pts capacite

**Constat au 16/04** : T16, SMI-rename, OPS-obs livres (4 pts). SMI-esm,
SMI-roi, SMI-offers non demarres. Les 3 stories restantes (10 pts) ont
des specs insuffisantes — elles ne satisfaisaient pas la DoR au Sprint
Planning, faute de refinement prealable.

---

## 5 · Red flags / risques identifies

### R1 · Stories SMI non "Ready" au Sprint Planning
- **Cause racine** : absence de refinement prealable ce qui s'est traduit
  par un manque d'AC Gherkin, une absence de matrice mapping maturite,
  et un manque de source benchmarks ROI.
- **Consequence J5** : 10 pts non demarres a 2 jours de la fin.
- **Action** : ecrire les User Stories DoR-compliant dans
  `docs/stories-ready/` avant reprise (fait le 16/04, voir
  `SMI-esm.md`, `SMI-roi.md`, `SMI-offers.md`).

### R2 · Ajout OPS-obs hors boucle universelle
- **Cause racine** : urgence ops percue superieure au respect du rituel.
- **Consequence** : decision D19 non tracee, story non "Ready" au sens
  formel, mais heureusement livrable en 1 pt.
- **Action** : ce backfill + point retro Sprint 18 dedie.

### R3 · Docs PRODUCT-PLANNING.md et stories-ready/README.md stale
- **Cause racine** : pas de ritual de mise a jour de ces docs
  en fin de sprint.
- **Action** : update manuel 16/04 + entree retro Sprint 18.

---

## 6 · Decisions (arbitrages ouverts)

Les 3 decisions suivantes restent **ouvertes** et bloquent la reprise
des 10 pts non demarres. Elles doivent etre tranchees avant qu'une
story SMI-esm/roi/offers puisse passer en implementation :

| ID propose | Decision | Impact |
|---|---|---|
| D20 | ESM — choix des 5 dimensions (Service Design, Employee Experience, Incident/Request ESM, Automatisation RH/Facility, Gouvernance multi-departement ? autre ?) | SMI-esm config |
| D21 | ROI — source des benchmarks : Forrester TEI Freshworks public / cas clients WaS / estimation interne ? Inputs moteur : score seul ou score + taille entreprise ? | SMI-roi moteur |
| D22 | Mapping maturite → offre : regle par niveau global, par dimension la plus faible, ou matrice 5 × 8 complete ? | SMI-offers matrice |

**Arbitrage recommande** : remonter ces trois decisions au PO en Sprint
Review Sprint 18, puis refinement Sprint 19 pour affiner et livrer
ces stories dans un sprint avec DoR intacte.

---

*Backfill produit le 16/04/2026 dans le cadre de la mise au propre
Sprint 18. Violation boucle universelle regularisee ex post.*
