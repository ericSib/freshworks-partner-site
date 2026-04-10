# Stories Ready — Definition of Ready (DoR)

> **But** : stocker les User Stories detaillees et pretes a etre prises par un developpeur.
> Une story n'entre ici **qu'apres validation de la Definition of Ready**.
> Source de verite principale : `../../PRODUCT-BACKLOG.md`.

---

## Pourquoi ce dossier

Le `PRODUCT-BACKLOG.md` maintient le backlog priorise en one-liners, ce qui
facilite la vue d'ensemble mais ne contient pas assez de details pour etre
"Ready" au sens Scrum. Ce dossier sert de tampon entre le backlog et le Sprint.

Chaque story Ready est un fichier Markdown independant : `US-XX.Y.md`.

---

## Definition of Ready (DoR)

Une story est Ready quand toutes les cases sont cochees :

- [ ] **Format standard** : rôle + action + benefice ("En tant que... je veux... afin de...")
- [ ] **3 a 5 criteres d'acceptation** en Given/When/Then (Gherkin)
- [ ] **Estimee** en story points (Fibonacci : 1, 2, 3, 5, 8, 13)
- [ ] **Pas de dependance bloquante** non resolue (decisions, specs, APIs externes)
- [ ] **Fichiers impactes** identifies (chemins relatifs depuis la racine)
- [ ] **Donnees de test** definies (fixtures, mocks, comptes de demo)
- [ ] **Perspective QA** : criteres de test automatisable identifies
- [ ] **DoD applicable** verifiee (voir section 7 du PRODUCT-BACKLOG.md)

---

## Template de story

Utiliser `_TEMPLATE.md` comme point de depart pour chaque nouvelle story.

---

## Workflow

```
Backlog (one-liner) --> [3-Amigos refinement] --> docs/stories-ready/US-XX.Y.md --> Sprint --> Implementation --> Done
```

1. **Refinement** : le PO (ou 3-Amigos) redige la story complete depuis un one-liner du backlog.
2. **Review DoR** : checklist ci-dessus validee.
3. **Sprint Planning** : stories tirees depuis ce dossier vers le sprint actif.
4. **Apres implementation** : supprimer le fichier de ce dossier (il reste trace dans git + PRODUCT-BACKLOG.md historique).

---

## Stories actuellement Ready

| Story | Pts | Sprint cible | Statut DoR |
|-------|-----|--------------|------------|
| *(aucune pour l'instant — a rediger pour Sprint 13)* | — | — | — |

---

## Stories en attente de redaction (prochain Sprint 13)

| Story | Pts | Blocage DoR |
|-------|-----|-------------|
| US-21.1 Eliminer waitForTimeout | 1 | AC Gherkin + criteres flakiness |
| US-18.9 API quiz dediee /api/quiz/submit | 3 | D3 archi a trancher |
| US-21.3 Scan axe-core quiz | 3 | Seuil axe-core + bypass email gate |
| US-21.2 Smoke + a11y /mentions-legales | 2 | AC Gherkin + liste smoke checks |
| US-15.4 Playwright dans CI | 5 | D4 priorisation + strategie cache |

---

*docs/stories-ready/README.md — cree le 10/04/2026 (Phase 1 refinement)*
