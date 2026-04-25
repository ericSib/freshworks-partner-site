# Sprint Retrospective — Sprint 18 "Refonte quiz → SMI™"

> **Date** : 25 avril 2026 (retro condensee, conduite avec un retard de 7 jours)
> **Format** : Keep / Drop / Try
> **Sprint Goal** : Refonte quiz en SMI™ — **PARTIELLEMENT ATTEINT** (4 / 13 pts livres, 10 pts reaffectes S19)

---

## KEEP

### K4 · T1-v2 — verification etat reel des stories au Sprint Planning
- **Cause racine** : ajoute en Sprint 17, applique systematiquement au Sprint Planning S18 (et reapplique au S19). Detecte les "stories fantomes" qui consomment des points pour du travail deja fait.
- **Bilan S18** : 0 pt fantome detecte (les 6 stories candidates etaient bien du travail reel).
- **Action** : maintenir au Sprint Planning S20.

### K5 · TDD strict sur T16 (test i18n parity)
- **Cause racine** : T16 a ete ecrit en TDD pur — test recursif d'abord, puis l'observation que fr.json/en.json devaient avoir le meme nombre de cles. La methode a force a clarifier la regle (parite des paths, parite des longueurs de tableaux) avant le code.
- **Action** : etendre le pattern aux autres tests transverses (ex: parite des slugs offers ↔ matrice D22).

### K6 · Logger structure + correlation ID
- **Cause racine** : OPS-obs (D19) a livre un logger qui formate chaque ligne en JSON avec un `requestId`. Permet de filtrer un submit quiz dans Vercel Logs en 1 grep.
- **Action** : utiliser le pattern dans toute nouvelle route API.

---

## DROP

### D2 · Engager des stories sans DoR Ready au Sprint Planning
- **Cause racine** : SMI-esm, SMI-roi, SMI-offers ont ete engagees alors que leur spec etait incomplete ("5 dimensions a trancher", "source benchmarks a preciser", "matrice a valider"). Resultat : 10 / 13 pts non livres.
- **Cout** : 1 sprint perdu sur la livraison du Sprint Goal SMI complet, et un re-Sprint Planning S19 de 30 min pour acter D20/D21/D22.
- **Action** : la regle DoR est non negociable au Sprint Planning. Une story sans DoR coche n'entre pas dans le forecast.

### D3 · Modifier le backlog sans refinement (D19 mi-sprint)
- **Cause racine** : la decision D19 (observabilite API) a ete actee mi-sprint et la story OPS-obs ajoutee directement au backlog en cours, sans passer par un refinement Three Amigos. Violation explicite de la boucle universelle (CLAUDE.md).
- **Cout** : pas de cout direct — la story etait simple — mais creation d'un precedent dangereux.
- **Action** : la boucle universelle est non negociable. Tout ajout/modif backlog passe par `docs/refinement/*.md`, meme une session de 5 minutes.

### D4 · Backfill de refinement = symptome de derive
- **Cause racine** : `sprint-18-refinement.md` ecrit a posteriori le 16/04 pour documenter des decisions deja partiellement implementees.
- **Cout** : effort de retro-documentation (1 h) + risque de mauvaise reconstitution des arbitrages reels.
- **Action** : interdire les backfills. Si une session de refinement n'a pas eu lieu avant, on s'arrete et on la conduit en temps reel.

---

## TRY — entrees Sprint 19 (acquittees)

| ID Try | Source | Statut S19 |
|---|---|---|
| T17a | Trancher D20 (5 dimensions ESM) au Sprint Planning S19 | ✅ acte le 25/04 (5 × 20 %, 5 dimensions definies) |
| T17b | Trancher D21 (source benchmarks ROI + inputs) au Sprint Planning S19 | ✅ acte le 25/04 (Forrester TEI + modele interne, 3 brackets size) |
| T17c | Trancher D22 (matrice offers 5×3) au Sprint Planning S19 | ✅ acte le 25/04 (15 cellules explicites) |
| T18 | Reaffirmer la regle "boucle universelle obligatoire" en haut du PROCESS.md | ⏳ a injecter dans la prochaine maj `docs/PROCESS.md` |
| T19 | DoR check au Sprint Planning : grille 7 items, story rejetee si une case manque | ⏳ a injecter dans `docs/PROCESS.md` §4.1 |

---

## Bilan chiffre Sprint 18

| Metrique | Valeur |
|---|---|
| Pts engages (incl. mi-sprint) | 14 |
| Pts livres | 4 (29 %) |
| Pts reportes S19 | 10 |
| Stories Done | 3 |
| Stories deferred | 3 |
| Commits feature | 4 |
| Commits process | 1 |
| Violation boucle universelle | 1 (D19) |
| Backfill refinement | 1 (acceptable une fois) |

**Verdict** : sprint-apprentissage. Le Sprint Goal SMI complet n'a pas ete livre, mais les fondations (renommage, observabilite, test i18n) etaient des prerequis necessaires. Les drops D2/D3/D4 sont les vrais livrables process — ils ont rendu le Sprint 19 fluide.
