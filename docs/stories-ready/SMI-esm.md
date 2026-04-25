# SMI-esm : Full ESM path (config + questions + dimensions + i18n)

> **Epic** : E-SMI — Refonte quiz Service Maturity Index™
> **Priorite** : Must
> **Estimation** : 6 pts
> **Sprint cible** : Sprint 19 (reaffectee apres Sprint Review S18)
> **Auteur** : Eric Sib (PO)
> **Date** : 16/04/2026 · **Mise a jour** : 25/04/2026 (D20 actee)
> **DoR** : ✅ **READY** — D20 tranchee le 25/04/2026

---

## User Story

```
En tant que Nadia (DRH responsable Employee Service Management),
je veux evaluer la maturite de mon dispositif ESM sur 5 dimensions cles
en repondant a 7-10 questions en moins de 7 minutes,
afin d'obtenir un diagnostic personnalise et comprendre ou investir en priorite.
```

---

## Contexte

Le quiz actuel propose deux parcours : ITSM (DSI) et CX (Dir. Service Client).
Le persona Nadia (D17, DRH/Lead ESM) n'a pas de parcours dedie et ne peut
pas etre qualifie comme lead ESM. La decision D16 a confirme le maintien
de 5 dimensions par parcours (pas de dimension IA), et le catalogue D18
inclut 3 offres ESM (CX/ESM Transfo, ESM Sprints, Audit). Sans parcours
ESM dans le SMI, le lead magnet ne sert pas 1/3 de la cible.

Lien avec Product Goal : augmenter les completions quiz > 20% des
visiteurs quiz (KPI CLAUDE.md), dont une part significative via le
segment ESM (estime a 30% du trafic qualifie).

---

## Criteres d'acceptation (Gherkin)

### Scenario 1 : Selection du parcours ESM

```gherkin
Etant donne qu'un visiteur arrive sur /quiz
Et qu'il voit le selecteur 3 cartes (ITSM, CX, ESM)
Quand il clique sur la carte "ESM"
Alors il entre dans le flow du questionnaire ESM
  ET la premiere question ESM s'affiche
  ET le progress bar indique 1/N (N = nombre de questions ESM)
```

### Scenario 2 : Completion complete du parcours

```gherkin
Etant donne qu'un visiteur a demarre le quiz ESM
Quand il repond a toutes les questions (7 a 10 selon D20)
Alors il atteint la page demographique
  ET apres soumission, il voit son score global ESM (1 a 5)
  ET le score detaille par dimension (5 dimensions)
  ET les benchmarks et angles commerciaux propres a l'ESM
```

### Scenario 3 : Parite i18n FR/EN

```gherkin
Etant donne que le test T16 (deep i18n parity) tourne en CI
Quand les fichiers `fr.json` et `en.json` sont compares sur le namespace `quiz.esm.*`
Alors ils ont exactement les memes cles
  ET le meme nombre d'entrees pour chaque tableau (options, dimensions, levels)
```

### Scenario 4 : Persistance HubSpot

```gherkin
Etant donne qu'un prospect soumet le quiz ESM
Quand la requete POST /api/quiz/submit aboutit
Alors un contact HubSpot est cree ou mis a jour
  ET la propriete custom `smi_segment` vaut "esm"
  ET les proprietes de score par dimension sont remplies
  ET un email de confirmation part via Resend
```

### Scenario 5 : A11y

```gherkin
Etant donne que le quiz ESM est affiche
Quand axe-core scanne la page (selector, 3 questions, resultats)
Alors 0 violation critique ou serieuse WCAG 2.1 AA est rapportee
  ET la navigation clavier est complete (tab, enter, espace)
```

---

## Fichiers impactes

- `src/config/quiz/esm.ts` — nouveau fichier, 5 dimensions + 7-10 questions + benchmarks
- `src/config/quiz/index.ts` — export ESM_CONFIG
- `src/config/quiz/types.ts` — etendre `QuizSegment = "itsm" | "cx" | "esm"`
- `src/components/quiz/QuizSelector.tsx` — ajouter 3eme carte ESM
- `src/hooks/useQuiz.ts` — verifier compatibilite nouveau segment
- `src/app/api/quiz/submit/route.ts` — valider segment "esm"
- `src/lib/quiz/hubspot.ts` — mapping proprietes custom ESM
- `src/messages/fr.json` — namespace `quiz.esm.*` complet
- `src/messages/en.json` — namespace `quiz.esm.*` complet
- `src/config/quiz/__tests__/esm.test.ts` — nouveau : valide somme poids = 1.0, ids uniques
- `tests/playwright/quiz-esm.spec.ts` — nouveau : e2e completion complete
- `src/components/quiz/__tests__/QuizSelector.test.tsx` — ajouter assertion 3eme carte

---

## Donnees de test

- Fixture : `src/config/quiz/__tests__/fixtures/esm-full-answers.ts` (reponses deterministes score 1/2/3/4/5)
- Mock : `global.fetch` sur `/api/quiz/submit`
- HubSpot : proprietes custom ESM a creer (cf. notes techniques)

---

## Dependances

- [x] **D20 (actee 25/04/2026)** : 5 dimensions ESM @ 20% chacune.
  1. Employee Experience & Service Design (20%)
  2. Incident & Request Management ESM (20%)
  3. Automatisation multi-departement (RH + Facility + IT) (20%)
  4. Gouvernance & conformite (RGPD, accords sociaux) (20%)
  5. Analytics & satisfaction employe (20%)
- [ ] **Ops** : creation des proprietes HubSpot custom `smi_esm_*` (5 proprietes dimension + 1 propriete segment)
- [ ] **Story prerequise** : SMI-rename (✅ Done, commit `efd55ee`)

---

## Definition of Ready — Checklist

- [x] Format standard (role + action + benefice)
- [x] 5 criteres d'acceptation Gherkin
- [x] Estimation Fibonacci (6 pts — reprise pattern itsm.ts)
- [x] **Pas de dependance bloquante** — D20 actee 25/04/2026
- [x] Fichiers impactes identifies
- [x] Donnees de test definies
- [x] Criteres de test automatisable (QA)

**Statut** : ✅ **READY** — engageable Sprint 19.

### Suggestion de decoupage SPIDR (si D20 reste ouverte)

Pour debloquer l'avancement partiel meme sans D20 tranchee, la story
peut etre decoupee en 4 sous-stories verticales :

| Sous-story | Pts | Bloquee par D20 ? |
|---|---|---|
| SMI-esm-A : `QuizSegment` etendu + 3eme carte selector stub "Bientot disponible" | 1 | Non |
| SMI-esm-B : config `esm.ts` avec 5 dimensions + poids | 2 | **Oui** |
| SMI-esm-C : 7-10 questions + options i18n FR/EN | 2 | Partiellement |
| SMI-esm-D : benchmarks + 5 niveaux de maturite ESM + integration HubSpot | 1 | Partiellement |

---

## Definition of Done — Rappel universel

- [ ] `npm run build` passe
- [ ] `npm run lint` — 0 erreur
- [ ] `npm run test` — tous les tests passent, coverage ≥ 80% sur le nouveau code
- [ ] Test i18n deep parity (T16) passe sur `quiz.esm.*`
- [ ] Contenu bilingue FR + EN
- [ ] Responsive mobile 375px + desktop 1440px
- [ ] axe-core : 0 violation critique / serieuse
- [ ] Commit conventionnel : `feat(quiz): ...`
- [ ] Aucun secret hardcode

---

## Notes techniques / decisions

- Pattern directement calque sur `src/config/quiz/itsm.ts` (data-driven, aucune logique UI a ajouter).
- Les proprietes HubSpot custom a creer (via Private App) : `smi_esm_score_dim1`, `smi_esm_score_dim2`, `smi_esm_score_dim3`, `smi_esm_score_dim4`, `smi_esm_score_dim5`, et `smi_segment` (deja existant ou a creer en singleSelect `itsm | cx | esm`).
- Benchmarks ESM : a sourcer (cf. D21 moteur ROI sera aussi lie).
- Niveaux de maturite ESM : reprendre la nomenclature ITSM (Firefighting / Reactive / Managed / Strategic / Optimized) — confirme PO si OK.
