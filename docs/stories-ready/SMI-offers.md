# SMI-offers : Mapping maturite → offre WaS recommandee

> **Epic** : E-SMI — Refonte quiz Service Maturity Index™
> **Priorite** : Should
> **Estimation** : 2 pts
> **Sprint cible** : Sprint 19 (reaffectee apres Sprint Review S18)
> **Auteur** : Eric Sib (PO)
> **Date** : 16/04/2026 · **Mise a jour** : 25/04/2026 (D22 actee — matrice complete validee)
> **DoR** : ✅ **READY** — D22 tranchee le 25/04/2026

---

## User Story

```
En tant que prospect ayant complete le SMI,
je veux voir explicitement quelle offre WaS correspond le mieux a mon niveau de maturite,
afin de demarrer un dialogue commercial pertinent des la page de resultats.
```

---

## Contexte

Le catalogue D18 compte 8 offres, ordonnees complexity-first (3 premium
strategiques + 4 offres d'implementation + 1 offre recurrente). Un
prospect qui sort du quiz sans recommandation personnalisee doit
relire les 8 cartes pour identifier l'offre pertinente. Friction
directe sur le KPI "prises de RDV Calendly" (cible > 5/mois).

L'objectif de cette story est de transformer le score SMI (1-5) + le
segment (ITSM/CX/ESM) en **une offre recommandee principale**, avec
optionnellement une offre secondaire.

---

## Criteres d'acceptation (Gherkin)

### Scenario 1 : Affichage de l'offre principale

```gherkin
Etant donne qu'un prospect a complete un parcours SMI (ITSM, CX ou ESM)
Et qu'il obtient un score global maturite de niveau 2 (Reactive)
Quand la page de resultats s'affiche
Alors une section "Votre offre recommandee" apparait apres le ROI
  ET elle affiche 1 offre principale avec son titre, son tagline, son pricing "a partir de"
  ET un CTA "Reserver un appel" ouvre la popup Calendly pre-remplie
```

### Scenario 2 : Cas niveau 5 (mature / optimized)

```gherkin
Etant donne qu'un prospect obtient un score 4.5-5.0
Quand la page de resultats s'affiche
Alors l'offre recommandee est "Managed Services" (recurrente) ou "Audit strategique"
  ET le libelle mentionne "maintenir et optimiser" plutot que "transformer"
```

### Scenario 3 : Differenciation par segment

```gherkin
Etant donne deux prospects avec le meme score global mais des segments differents
Quand la page de resultats s'affiche pour chacun
Alors les offres recommandees sont potentiellement differentes selon le segment
  Exemple : score 3 + ITSM → "Freshservice Implementation"
  Exemple : score 3 + CX → "Freshdesk Implementation"
  Exemple : score 3 + ESM → "ESM Sprints"
```

### Scenario 4 : Persistance HubSpot

```gherkin
Etant donne qu'un prospect voit une offre recommandee
Quand son lead HubSpot est cree ou mis a jour
Alors la propriete custom `smi_recommended_offer` est remplie avec le slug de l'offre
  ET cette propriete est visible dans le CRM pour l'equipe sales
```

---

## Fichiers impactes

- `src/lib/quiz/offer-mapping.ts` — nouveau : fonction `recommendOffer(score, segment) → OfferSlug`
- `src/lib/quiz/__tests__/offer-mapping.test.ts` — nouveau : tests sur matrice complete (5 niveaux × 3 segments = 15 combinaisons)
- `src/components/quiz/QuizResults.tsx` — integrer le block offer recommandee
- `src/components/quiz/__tests__/QuizResults.test.tsx` — assertions par segment
- `src/lib/quiz/hubspot.ts` — ajouter proprietes `smi_recommended_offer` au payload upsert
- `src/messages/fr.json` + `en.json` — cles `quiz.recommendation.*` (heading, libelle contextuel par niveau)

---

## Donnees de test

- Fixture : `src/lib/quiz/__tests__/fixtures/offer-mapping-matrix.ts` — matrice 5×3 de verites de reference
- Mock : HubSpot API (deja present, etendre payload)
- Snapshot test : chaque combinaison score × segment produit le bon slug

---

## Dependances

- [x] **D22 (actee 25/04/2026)** : Matrice complete 5×3 retenue (option A).
  Niveaux : Firefighting / Reactive / Managed / Strategic / Optimized.

  **Matrice validee par le PO le 25/04/2026** :

  | Niveau | ITSM (Thomas) | CX (Mathieu) | ESM (Nadia) |
  |---|---|---|---|
  | 1 Firefighting (1.0-1.9) | `freshservice` | `freshdesk` | `esm-sprints` |
  | 2 Reactive (2.0-2.4) | `audit-optimisation` | `audit-optimisation` | `esm-sprints` |
  | 3 Managed (2.5-3.4) | `migration` | `freddy-ai` | `cx-esm-transformation` |
  | 4 Strategic (3.5-4.4) | `freddy-ai` | `cx-esm-transformation` | `cx-esm-transformation` |
  | 5 Optimized (4.5-5.0) | `managed-excellence` | `managed-excellence` | `managed-excellence` |

  Cette matrice doit etre encodee dans `src/lib/quiz/offer-mapping-matrix.ts`.
- [ ] **Ops** : propriete HubSpot custom `smi_recommended_offer` a creer (singleSelect avec les 8 slugs D18)

---

## Definition of Ready — Checklist

- [x] Format standard
- [x] 4 criteres d'acceptation Gherkin
- [x] Estimation Fibonacci (2 pts)
- [x] **Pas de dependance bloquante** — D22 actee 25/04/2026, matrice 5×3 validee
- [x] Fichiers impactes identifies
- [x] Donnees de test definies (15 cellules de la matrice)
- [x] Criteres de test automatisable

**Statut** : ✅ **READY** — engageable Sprint 19.

---

## Definition of Done — Rappel universel

- [ ] `npm run build` passe
- [ ] `npm run lint` — 0 erreur
- [ ] `npm run test` — coverage 100% sur `offer-mapping.ts` (pure function, facile)
- [ ] Bilingue FR + EN
- [ ] A11y : section rec offer avec heading, landmark, lien Calendly accessible clavier
- [ ] Commit conventionnel : `feat(quiz): ...`
- [ ] HubSpot proprietes custom documentees dans le README backend

---

## Notes techniques / decisions

- Le mapping est une **data table**, pas un arbre de conditions if/else. Placer la
  table dans `offer-mapping-matrix.ts` et lire-la dans `recommendOffer()`.
- Option de fallback : si aucune offre ne matche (ex: segment futur non pris en
  charge), retourner `"audit-strategique"` comme defaut safe.
- Piste future (hors scope) : inclure la dimension la plus faible pour
  sophistiquer la recommandation (score global 3 + incident tres faible →
  Freshservice Incident Management Sprint). Non retenu Sprint 18.
