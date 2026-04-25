# Refinement — Sprint 19 preparatoire

> **Date** : 25 avril 2026
> **Sprint vise** : Sprint 19 "SMI complet — ESM + ROI + offer mapping"
> **Duree** : 1 session (Sprint Review S18 + refinement combines)
> **Declencheurs** : 3 stories non livrees Sprint 18 + arbitrage PO D20/D21/D22

---

## 1 · Decisions actees ce jour

### D20 — 5 dimensions ESM (option a)

5 dimensions × 20% chacune :
1. Employee Experience & Service Design
2. Incident & Request Management ESM
3. Automatisation multi-departement (RH + Facility + IT)
4. Gouvernance & conformite (RGPD, accords sociaux)
5. Analytics & satisfaction employe

**Niveaux de maturite ESM** : reprise de la nomenclature ITSM standard
(Firefighting / Reactive / Managed / Strategic / Optimized) pour
coherence cross-segment.

### D21 — Moteur ROI (option d, repli sur option e plus tard)

**D21-A — Source des benchmarks** :
- Forrester TEI Freshworks (rapport public) — benchmark macro
- Modele interne (score × coefficient segment × coefficient taille)
- **Cas clients WaS reportes** : PO ne dispose pas de 3 cas anonymises
  pretes a integrer aujourd'hui. Upgrade vers option e (Forrester +
  cas clients) prevu en iteration future quand les cas seront prets.

**D21-B — Inputs du moteur** :
- Score global (1-5) — collecte par le quiz
- Taille entreprise (3 brackets : <100 / 100-1000 / >1000) — champ
  demographique deja present
- Segment (ITSM / CX / ESM) — collecte par le quiz
- **Pas de secteur** : evite la friction UI, suffisamment differencie
  via le segment

### D22 — Matrice complete 5×3 (option a)

Le PO a choisi l'option la plus precise (15 cellules definies
explicitement) plutot que les options regle generique (b) ou hybride (c).

**Matrice validee** :

| Niveau | ITSM (Thomas) | CX (Mathieu) | ESM (Nadia) |
|---|---|---|---|
| 1 Firefighting | `freshservice` | `freshdesk` | `esm-sprints` |
| 2 Reactive | `audit-optimisation` | `audit-optimisation` | `esm-sprints` |
| 3 Managed | `migration` | `freddy-ai` | `cx-esm-transformation` |
| 4 Strategic | `freddy-ai` | `cx-esm-transformation` | `cx-esm-transformation` |
| 5 Optimized | `managed-excellence` | `managed-excellence` | `managed-excellence` |

**Verification** : utilise les 8 offres D18 ✅. Differenciation segment
claire aux niveaux 3-4 ✅. Narrative coherente ✅.

---

## 2 · Application T1-v2 — Verification etat reel

| Story candidate | Etat reel verifie le 25/04 | Decision |
|---|---|---|
| SMI-esm (6 pts) | Aucun fichier `esm.ts`, pas de 3eme carte selector | Engage |
| SMI-roi (2 pts) | Aucun fichier `roi.ts`, pas de section ROI dans QuizResults | Engage |
| SMI-offers (2 pts) | Aucun fichier `offer-mapping.ts`, pas de section reco | Engage |

**Bilan T1-v2** : 0 pt fantome. Les 3 stories representent du travail reel.

---

## 3 · Sprint Goal propose

> **"Livrer le Service Maturity Index™ complet : 3 parcours (ITSM/CX/ESM),
> ROI estime, offre recommandee"**
>
> Test du Goal : un visiteur Nadia (DRH ESM) peut completer le SMI sur
> /quiz, voir son score de maturite par dimension, une estimation ROI
> indicative, et l'offre WaS recommandee correspondant a sa cellule
> dans la matrice 5×3.

---

## 4 · Stories engagees

| Ordre | ID | Pts | Priorite | Statut DoR |
|---|---|---|---|---|
| 1 | SMI-esm | 6 | Must | ✅ Ready (D20 actee) |
| 2 | SMI-offers | 2 | Must | ✅ Ready (D22 actee) |
| 3 | SMI-roi | 2 | Should | ✅ Ready (D21 actee) |
| 4 | (buffer) Tech debt / S18 retro Try | 2-4 | Should | A definir avec retro S18 |

**Total core engage** : 10 pts (3 stories Must/Should SMI)
**Capacite** : 20 pts
**Marge** : 10 pts pour buffer tech debt + retro S18 + imprevus

**Ordre recommande** :
1. SMI-esm en premier (le plus gros, debloque les 2 autres en termes
   de coverage segment "esm")
2. SMI-offers en deuxieme (matrice complete, pure data, facile a tester)
3. SMI-roi en dernier (depend de la presence de 3 segments stables
   pour calibrer les coefficients)

---

## 5 · Red flags / risques identifies

### R1 · Cas clients WaS pour ROI manquants
- **Cause** : PO n'a pas 3 cas anonymises disponibles aujourd'hui.
- **Mitigation** : option d (Forrester + modele interne) couvre la
  livraison Sprint 19. Upgrade option e prevu en iteration future
  quand cas disponibles → noter en Try retro S19.

### R2 · Risque de retard si SMI-esm depasse 6 pts
- **Cause** : pattern itsm.ts existant doit suffire, mais si HubSpot
  Private App ne supporte pas la creation auto des proprietes custom
  ESM, +1-2 pts ops.
- **Mitigation** : decoupage SPIDR documente dans SMI-esm.md (4 sous-stories).

### R3 · Retro S18 pas encore conduite
- **Cause** : Sprint Review S18 differe de 7 jours, retro non faite.
- **Mitigation** : conduire la retro S18 J1 du Sprint 19 avant le
  Sprint Planning. Insights Try integres au Sprint 19 si applicables.

---

## 6 · Decisions ouvertes pour iterations futures

| ID propose | Decision | Quand trancher |
|---|---|---|
| D23 (futur) | Upgrade ROI option d → option e (ajout cas clients WaS) | Quand 3 cas anonymises prets |
| D24 (futur) | Page dediee `/maturite` avec deep-link sur niveau de maturite | Apres mesure de l'usage SMI Sprint 19+ |

---

*Refinement produit le 25/04/2026 — Sprint Review S18 + arbitrage PO D20/D21/D22.*
