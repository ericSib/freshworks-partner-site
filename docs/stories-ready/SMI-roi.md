# SMI-roi : ROI estime dans les resultats du quiz

> **Epic** : E-SMI — Refonte quiz Service Maturity Index™
> **Priorite** : Should
> **Estimation** : 2 pts
> **Sprint cible** : Sprint 19 (reaffectee apres Sprint Review S18)
> **Auteur** : Eric Sib (PO)
> **Date** : 16/04/2026 · **Mise a jour** : 25/04/2026 (D21 actee)
> **DoR** : ✅ **READY** — D21 tranchee le 25/04/2026

---

## User Story

```
En tant que prospect qualifie (Thomas DSI, Mathieu Lead Transfo ou Nadia DRH ESM),
je veux voir une estimation chiffree du ROI potentiel apres completion du SMI,
afin de justifier une prise de contact avec What A Service aupres de ma direction.
```

---

## Contexte

La decision D11 du 12/04 a ferme un ROI Calculator standalone (trop
lourd, trop d'assomptions, risque de desengagement). Le SMI offre une
alternative : une **estimation indicative** en sortie du quiz, calibree
sur les reponses reelles du prospect plutot que sur un calculateur
independant.

Le KPI "taux de conversion visiteur → lead" (cible > 3% CLAUDE.md)
depend fortement de la pertinence percue du resultat. Un score sans
chiffre d'impact est interprete comme "interessant mais abstrait".
Un score + fourchette de gains = motivation directe a reserver un
rendez-vous Calendly.

---

## Criteres d'acceptation (Gherkin)

### Scenario 1 : Affichage de l'estimation dans les resultats

```gherkin
Etant donne qu'un prospect termine le SMI avec un score global (1 a 5)
Et qu'il a rempli le champ demographique "taille d'entreprise" (< 100 / 100-1000 / > 1000)
Quand la page de resultats s'affiche
Alors une section "Votre gain potentiel" apparait entre le score et le CTA
  ET elle affiche une fourchette annualisee en EUR
  ET elle precise que c'est une estimation indicative non contractuelle
```

### Scenario 2 : Pas de taille d'entreprise renseignee

```gherkin
Etant donne qu'un prospect termine le SMI mais n'a pas indique la taille d'entreprise
Quand la page de resultats s'affiche
Alors la section "Votre gain potentiel" utilise la taille par defaut "100-1000"
  ET un libelle signale "Affine ton estimation en parlant a un expert"
```

### Scenario 3 : Score eleve (deja mature)

```gherkin
Etant donne qu'un prospect obtient un score global 4.5-5.0
Quand la page de resultats s'affiche
Alors la section affiche un message oriente "optimisation continue" plutot qu'un gain absolu
  ET la fourchette reste visible mais attenuee (opacity ou variant subtil)
```

### Scenario 4 : Cohérence avec le parcours

```gherkin
Etant donne qu'un prospect complete le parcours ITSM
Quand l'estimation ROI s'affiche
Alors le libelle mentionne des benefices typiques ITSM (temps de resolution, MTTR)
  ET ces libelles sont differents de ceux du parcours CX ou ESM
```

---

## Fichiers impactes

- `src/lib/quiz/roi.ts` — nouveau : fonction `estimateROI(score, segment, companySize) → { min, max, currency, horizon }`
- `src/lib/quiz/__tests__/roi.test.ts` — nouveau : tests deterministes sur matrice score × size
- `src/components/quiz/QuizResults.tsx` (ou sous-composant) — integrer le block ROI
- `src/components/quiz/__tests__/QuizResults.test.tsx` — assertion affichage ROI
- `src/messages/fr.json` + `en.json` — cles `quiz.roi.*` (title, disclaimer, libelles par segment, call-to-action)
- `src/config/quiz/types.ts` — ajouter type `CompanySize = "small" | "medium" | "large"` si pas deja present

---

## Donnees de test

- Fixture : matrice de benchmarks a charger depuis `src/lib/quiz/roi-benchmarks.ts` (dependante de D21)
- Fixture prospect : `{ score: 2.5, segment: "itsm", companySize: "medium" }` → attendu `{ min: XXXK, max: YYYK }` (cible a calibrer avec PO)
- Snapshot : page resultats avec block ROI affiche

---

## Dependances

- [x] **D21-A (actee 25/04/2026)** : Source des benchmarks
  - **Option d retenue** : Forrester TEI Freshworks (rapport public) + modele interne
    (score × coefficient segment × coefficient taille).
  - Cas clients WaS reportes a iteration future (PO ne les a pas disponibles
    actuellement, upgrade vers option e quand 3 cas anonymises seront prets).
  - Mention obligatoire affichee : "Estimation indicative basee sur les benchmarks
    publics Forrester TEI Freshworks. Non contractuelle."
- [x] **D21-B (actee 25/04/2026)** : Inputs du moteur
  - Score global (1-5) — obligatoire
  - Taille d'entreprise (3 brackets : <100 / 100-1000 / >1000) — obligatoire
  - Segment (ITSM / CX / ESM) — deja collecte par le quiz
  - **Pas de secteur** : evite friction UI, suffisamment differencie via segment
- [x] **Story prerequise** : aucune (roi peut tourner sur ITSM/CX deja en prod, avant meme SMI-esm)

---

## Definition of Ready — Checklist

- [x] Format standard
- [x] 4 criteres d'acceptation Gherkin
- [x] Estimation Fibonacci (2 pts)
- [x] **Pas de dependance bloquante** — D21 actee 25/04/2026 (option d)
- [x] Fichiers impactes identifies
- [x] Donnees de test definies (calibration coefficients internes en sprint)
- [x] Criteres de test automatisable

**Statut** : ✅ **READY** — engageable Sprint 19.

---

## Definition of Done — Rappel universel

- [ ] `npm run build` passe
- [ ] `npm run lint` — 0 erreur
- [ ] `npm run test` — coverage ≥ 80% sur `roi.ts`
- [ ] Bilingue FR + EN
- [ ] Responsive mobile + desktop
- [ ] Disclaimer "estimation indicative non contractuelle" visible et accessible
- [ ] Commit conventionnel : `feat(quiz): ...`
- [ ] RGPD : aucune donnee stockee au dela de la session pour le calcul ROI

---

## Notes techniques / decisions

- Le moteur doit etre **pur** (fonction sans effet de bord) pour etre testable sans mock.
- Les benchmarks vivent dans `roi-benchmarks.ts` (data-driven, comme itsm.ts).
- Ne JAMAIS afficher un chiffre unique : toujours une fourchette (min / max) pour
  eviter toute interpretation de promesse commerciale.
- A11y : la section ROI doit etre un `<section aria-labelledby="roi-heading">` avec un heading explicite.
