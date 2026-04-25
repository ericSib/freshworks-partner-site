# Sprint Review — Sprint 18 "Refonte quiz → Service Maturity Index™"

> **Date** : 25 avril 2026 (revue conduite a posteriori, condensee dans le refinement S19)
> **Sprint Goal** : Transformer le quiz en SMI™ avec 3 parcours (ITSM/CX/ESM), ROI estime et mapping maturite → offres.
> **Verdict** : **PARTIELLEMENT ATTEINT** — fondations livrees, parcours ESM + ROI + mapping reportes au Sprint 19.

---

## Stories livrees (Done)

| ID | Titre | Pts | Commit |
|---|---|---|---|
| T16 | Test i18n deep parity FR/EN | 1 | `ba410c1` |
| SMI-rename | Renommage quiz → Service Maturity Index™ (D16) | 2 | `efd55ee` |
| OPS-obs | Observabilite API — logger + correlation ID + deep health (D19) | 1 | `97913b8` |

**3 stories Done · 4 / 13 pts engages livres (31 %)**

## Stories reportees au Sprint 19

| ID | Pts | Raison du report |
|---|---|---|
| SMI-esm | 6 | Spec insuffisante au Sprint Planning — D20 (5 dimensions ESM) tranchee seulement le 25/04 |
| SMI-roi | 2 | Spec insuffisante — source des benchmarks et inputs (D21) tranches le 25/04 |
| SMI-offers | 2 | Spec insuffisante — matrice 5×3 (D22) tranchee le 25/04 |

**3 stories deferred · 10 pts reaffectes au Sprint 19**

## Commits S18

```
ba410c1 test(i18n): add deep FR/EN parity check (T16)
efd55ee feat(quiz): rename quiz to Service Maturity Index™ (D16)
daa537c chore(ci): gitignore reports/ directory
97913b8 feat(api): structured observability layer — logger + correlation ID + deep health (D19)
d706635 docs(process): mise au propre sprint 18 + backfill refinement + stories DoR
```

## Demo

| Critere | Resultat |
|---|---|
| Toute mention "quiz" en surface UI remplacee par "Service Maturity Index™" | ✅ |
| FR/EN parite verifiee par test recursif (CI) | ✅ |
| `/api/health?deep=1` retourne 200/503 selon HubSpot + Resend, avec correlation ID | ✅ |
| Visiteur peut completer un parcours ESM | ❌ Reporte S19 |
| Page resultats affiche fourchette ROI | ❌ Reporte S19 |
| Page resultats affiche offre recommandee selon matrice | ❌ Reporte S19 |

## Apprentissages

1. **DoR Ready avant Sprint Planning n'est pas optionnel.** SMI-esm/roi/offers ont ete engagees avec une spec insuffisante. Resultat : 10 pts reportes. La Sprint Review S18 confirme l'insight critique du Drop S17.
2. **Backfill refinement = aveu de derive.** Le document `sprint-18-refinement.md` ecrit le 16/04 documente apres coup ce qui aurait du etre acte avant. Acceptable une fois ; doit declencher un correctif process.
3. **D19 ajoutee mi-sprint sans passage par refinement** → violation explicite de la boucle universelle (CLAUDE.md). Regularisee dans le backfill, mais c'est un Drop S18.
4. **T16 = le filet i18n attendu.** Le test deep parity (recursif sur fr.json / en.json) a ete actif des Sprint 19 et a permis de valider les 84 nouvelles cles ESM en 1 commit sans desync.
5. **OPS-obs (D19) — observabilite avant les sprints fonctionnels lourds.** Le logger structure et le correlation ID ont permis de tracer chaque submit quiz Sprint 19, y compris en cas de fallback CRM.
