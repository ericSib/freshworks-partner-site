# SMI-offers : Mapping maturite → offre WaS recommandee

> **Epic** : E-SMI — Refonte quiz Service Maturity Index™
> **Priorite** : Should
> **Estimation** : 2 pts
> **Sprint cible** : Sprint 18 (engagee, non demarree) → a reaffecter Sprint 19
> **Auteur** : Eric Sib (PO)
> **Date** : 16/04/2026
> **DoR** : ❌ **BLOQUEE par D22** (regle de mapping non tranchee)

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

- [ ] **D22 (bloquante)** : Regle de mapping
  Options proposees :
  - **A (matrice complete 5×3)** : PO definit explicitement l'offre pour chaque cellule. 15 decisions manuelles. Plus precis, plus de travail PO.
  - **B (regle par niveau global)** : niveau 1-2 → Transfo, 3 → Implementation, 4-5 → Audit/Managed. Simple, generique, perd la nuance segment.
  - **C (hybride)** : matrice 5×3 pour les niveaux 1-3, regle unique (Managed Services) pour 4-5. Equilibre.
  - Recommandation PO : option C ou A, eviter B (perd le segment differentiator).
- [ ] **Asset** : proposition de matrice initiale a valider par le PO (tableau 5×3 a produire en amont du refinement)
- [ ] **Ops** : propriete HubSpot custom `smi_recommended_offer` a creer (singleSelect avec les 8 slugs D18)

---

## Definition of Ready — Checklist

- [x] Format standard
- [x] 4 criteres d'acceptation Gherkin
- [x] Estimation Fibonacci (2 pts)
- [ ] **Pas de dependance bloquante** — D22 ouverte + matrice a produire
- [x] Fichiers impactes identifies
- [x] Donnees de test definies (structure, contenu pending D22)
- [x] Criteres de test automatisable

**Statut** : **NOT READY** — bloquee par D22.

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
