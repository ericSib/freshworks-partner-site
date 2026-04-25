# Sprint Review — Sprint 19 "SMI complet : ESM + ROI + offer mapping"

> **Date** : 25 avril 2026 (Sprint conduit en 1 session intensive — cadence accelereee post Sprint Review S18)
> **Sprint Goal** : Livrer le Service Maturity Index™ complet — 3 parcours (ITSM/CX/ESM), ROI estime, offre recommandee.
> **Verdict** : **ATTEINT — INCREMENT EN PRODUCTION**

---

## Sprint 19 a ete conduit en 2 phases

- **Phase 1 — Dev (matin/apres-midi)** — 13 / 13 pts livres sur la branche `main`. Code feature-complete, tests CI verts.
- **Phase 2 — Deploy / Ops (soir)** — Publication en prod sur `https://freshworks.whataservice.fr`, configuration ops (env vars, sender Resend), et test reel de la chaine de bout en bout (POST `/api/contact` → email Resend reçu + contact HubSpot cree).

**Sprint Goal n'est vraiment ATTEINT qu'a la fin de la Phase 2.** Le code en `main` non deploye = pas Done au sens du Manifeste Agile P1 ("livraison precoce et continue de produit fonctionnel").

---

## Stories livrees (Done)

| ID | Titre | Pts | Commit(s) |
|---|---|---|---|
| SMI-esm | Full ESM path (config + i18n + UI + API + e2e) | 6 | `1d21502` / `d12f439` / `4f82320` / `fe188cb` |
| SMI-offers | Mapping maturite → offre WaS (matrice 5×3, D22) | 2 | `f2db051` |
| SMI-roi | ROI estime sur la page resultats (Forrester TEI, D21) | 2 | `771ef9e` |
| US-23.4 | (buffer) Suppression exports morts — config | 1 | `47a4822` |
| US-23.5 | (buffer) MaturityPage parameter object | 1 | `c1c3ea0` |
| US-23.3 | (buffer) Extract FormInput composant | 1 | `5d97114` |

**6 / 6 stories Done · 13 / 13 pts livres (100 %)** + 1 hotfix a11y (`aebf9e7`)

## Demo — Sprint Goal couvert end-to-end

| Critere du Sprint Goal | Resultat | Preuve |
|---|---|---|
| Nadia (DRH ESM) complete /quiz en 7 min, voit son score sur 5 dimensions | ✅ | `tests/e2e/quiz-esm.spec.ts` 2/2 (full path + Firefighting branch) |
| Page resultats affiche fourchette ROI EUR (min/max) avec disclaimer | ✅ | composant `QuizROI` + `Intl.NumberFormat` + benchmark Forrester TEI |
| Page resultats affiche l'offre recommandee selon la cellule matrice | ✅ | composant `QuizRecommendedOffer` + `OFFER_MATRIX` (15 cellules) |
| CI green — 0 violation axe-core, coverage maintenue, T16 i18n parity passe | ✅ | 913 unit / 55 E2E / 0 a11y violation apres `aebf9e7` |

## Commits

```
1d21502 feat(quiz): scaffold ESM segment config with 5 dimensions (D20)
d12f439 feat(i18n): add ESM quiz strings in FR and EN (84 keys per locale)
4f82320 feat(quiz): wire ESM card and dispatch in QuizSelector + QuizFlow
fe188cb feat(quiz): wire ESM segment end-to-end (validation, PDF, e2e)
f2db051 feat(quiz): map maturity to recommended offer (SMI-offers, D22)
771ef9e feat(quiz): show indicative ROI band on the results screen (SMI-roi, D21)
47a4822 refactor(config): remove dead exports flagged by Refactoring Radar
c1c3ea0 refactor(quiz): introduce parameter object on MaturityPage
5d97114 refactor(contact): extract FormInput component
aebf9e7 fix(quiz): bump ROI block contrast to WCAG 2.1 AA
```

## Quality gates

| Gate | Cible | Reel |
|---|---|---|
| Unit tests | 100 % pass | 913 / 913 ✅ |
| E2E Playwright | 100 % pass | 55 / 55 ✅ |
| axe-core (5 etats du quiz) | 0 violation critique/serieuse | 0 ✅ (apres hotfix) |
| Lint | 0 erreur | 0 ✅ |
| `npm run build` | passe | ✅ |
| T16 i18n parity FR/EN | passe avec les 84 nouvelles cles ESM | ✅ |
| Conventional commits | 100 % | 10 / 10 ✅ |

## Apprentissages

1. **Le DoR Ready au Sprint Planning a tenu sa promesse.** Les 6 stories engagees etaient toutes a "DoR coche" avant le 1er commit, contrairement a S18. Resultat : 100 % de livraison.
2. **TDD strict sur les fonctions pures.** `offer-mapping.ts` et `roi.ts` ont ete livres avec 100 % de couverture de leur matrice D22 / inputs ROI parce que les tests precedaient l'implementation.
3. **Les unit tests ne suffisent pas pour l'a11y.** 2 violations contrast (`text-slate-500` sur `bg-deep`) ont passe les 913 unit tests + le build. Seul `npx playwright test` (axe-core sur 5 etats) les a sorties. Cf. Try S20 ci-dessous.
4. **Le Refactoring Radar est rentabilise.** US-23.4 (1 pt) et US-23.5 (1 pt) ont reduit la surface cognitive avant que SMI-roi ne touche `MaturityPage`. Le buffer 20 % refactoring (D25, principe Manifeste P9) est devenu un mecanisme de reduction de friction du sprint suivant.
5. **84 cles i18n ecrites en 1 commit, sans relecture editoriale du PO.** Risque scope. Cf. Try S20.

## Pre-requis ops avant deploiement prod

- [ ] Creation HubSpot custom properties : `smi_esm_score_dim1..5`, `smi_recommended_offer` (singleSelect 8 slugs D18) — action PO/Ops.
- [ ] Lecture exhaustive du rapport Forrester TEI Freshworks public — pour ajuster les coefficients `PER_EMPLOYEE_GAIN_AT_LEVEL_1` dans `roi.ts` (calibration actuelle = ranges publics approximatifs).

---

## Phase 2 — Deploy / Ops (apres-midi/soir 25/04)

### Stories operationnelles livrees

| ID | Titre | Pts | Commit(s) |
|---|---|---|---|
| OPS-26.1 | Domaine custom `freshworks.whataservice.fr` (DNS OVH + Vercel + cert) | 1 | (ops, no code) |
| OPS-26.2 | Push 15 commits S18+S19 + auto-deploy Vercel | 1 | `2a82c58` |
| OPS-26.3 | Configurer 3 env vars Vercel (RESEND_API_KEY, NEXT_PUBLIC_GA_MEASUREMENT_ID, CONTACT_EMAIL) + force fresh build | 1 | `92e8c8e` (empty trigger) |
| OPS-26.4 | Fix sender Resend `noreply@whataservice.fr` → `noreply@update.whataservice.fr` (D27) | 1 | `1e92f10` |
| OPS-26.5 | Smoke test reel : POST `/api/contact` → email reçu + contact HubSpot cree | 0 | (validation only) |

**5 stories ops · 4 pts non engages au Sprint Planning (cf. Drop D8 retro)**

### Decisions actees pendant la Phase 2

| ID | Decision | Source |
|---|---|---|
| D26 | Publication prod sur `freshworks.whataservice.fr` (Pattern A "sous-domaine par activite", apex laisse dormant pour future page ombrelle WaS) | PO arbitrage 25/04 |
| D27 | Sender Resend = `update.whataservice.fr` (best practice Resend pour isoler la reputation d'envoi, partage entre futurs sites WaS) | PO arbitrage 25/04 + screenshot doc Resend |

### Demo Phase 2 — chaine end-to-end validee en prod

| Critere | Resultat | Preuve |
|---|---|---|
| `freshworks.whataservice.fr` resoluble + HTTPS | ✅ | Cert Let's Encrypt R12 valide jusqu'au 24/07/2026 |
| Homepage / quiz / sitemap / robots accessibles | ✅ | curl 200 sur toutes les routes critiques |
| Cartes ESM + ROI + Offre recommandee servies | ✅ | "Services aux employés" + "VOTRE GAIN POTENTIEL" presents dans le HTML |
| HubSpot CRM connecte | ✅ | `/api/health?deep=1` → hubspot ok 262ms |
| GA4 inline (consent-gated) | ✅ | `G-P37MDYJ5M8` present dans `/_next/static/chunks/0dlk8z~uzpgw6.js` |
| Resend send reel | ✅ | POST `/api/contact` 21:54:33 → HTTP 200 + log success + email reçu cote PO + contact HubSpot cree |

### Quality gates Phase 2

| Gate | Reel |
|---|---|
| DNS resolution (`dig`) | ✅ CNAME → 216.150.1.65 / 216.150.16.65 |
| HTTPS / cert auto-renew | ✅ Let's Encrypt R12 |
| Security headers (CSP, HSTS, X-Frame) | ✅ tous actifs |
| Vercel build sur push main | ✅ auto, 90s typique |
| Logs runtime | ✅ 0 erreur sur les 5 dernieres minutes apres `1e92f10` |

### Apprentissages Phase 2

6. **"Done" sans deploy = pas Done.** Le Sprint Review original (matin) a verdict "ATTEINT" alors que rien n'etait en prod. La Phase 2 est ce qui transforme du code vert en valeur livree (Manifeste P1, P3, P7).
7. **Decouverte tardive du desalignement sender Resend.** Aucun test (unit ou E2E) ne couvrait le `from:` real domain : tout etait mocke ou kit-de-dev. Resend a rejete les emails seulement en prod, decouvert par `/api/health?deep=1` et le test reel POST. Cf. Try S20 T23.
8. **Le health check `/api/health?deep=1` a paye sa dette d'investissement (D19, OPS-obs S18).** C'est lui qui a revele "Resend unavailable" puis "Resend degraded" et permis de cibler le diagnostic en 5 min. Sans, on aurait poste un quiz et regarde rien arriver dans la boite.
9. **Configuration env vars cote Vercel = piege multi-source.** Variables ajoutees a "Production" seulement (correct), redeploy from cache (incorrect, NEXT_PUBLIC_ pas re-bake). Solution : forcer un build frais via empty commit. Cf. Try S20 T24.
10. **GA4 consent-gated invisible au curl.** Le `<script gtag>` n'apparait pas dans le HTML SSR car gate par localStorage cote client. Verification correcte = grep le Measurement ID dans les chunks JS, pas dans le HTML.
