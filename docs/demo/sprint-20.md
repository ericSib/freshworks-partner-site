# Sprint Review — Sprint 20 "Surface SEO + funnel instrumente"

> **Date** : 26 avril 2026
> **Sprint Goal** : Etendre la surface de captage SEO du site (pages services dediees Freshservice + Freshdesk en FR+EN, schema.org enrichi UK/BE/CH, OG dynamiques) et instrumenter le funnel de conversion (events GA4 quiz + CTA + contact) pour piloter les optimisations a la donnee.
> **Capacite** : 20 pts · **Engage** : 18 pts · **Livre** : 18 pts engages + 1 pt bug fix imprevu = **19 pts effectifs**
> **Verdict** : 🟢 **ATTEINT — 4 outcomes sur 4 livres en prod**
> **Refinement source** : [refinement/sprint-20-refinement.md](../refinement/sprint-20-refinement.md)
> **Audit SEO source** : [seo/audit-2026-04-26.md](../seo/audit-2026-04-26.md)

---

## 1 · Sprint Goal — test d'atteinte par outcome

| Outcome cible | Stories porteuses | Statut | Preuve en prod |
|---|---|---|---|
| Pages services dediees Freshservice + Freshdesk FR+EN | US-S20-2 (5 pts) | ✅ Atteint | 4 routes indexables : `/fr/services/{freshservice,freshdesk}` + EN. Sitemap 7 URLs (vs 5 avant). Service + FAQPage JSON-LD par page. |
| Schema.org enrichi UK/BE/CH | US-S20-4 + follow-up areaServed unification | ✅ Atteint | 27 Country JSON-LD sur `/fr` (vs 11 avant) — 9 schemas × 3 pays. Single source of truth `ORGANIZATION.areaServed`. |
| OG image dynamique per route | US-S20-3 (2 pts) | ✅ Atteint | 3 routes Edge runtime (`/[locale]/opengraph-image`, `/quiz/opengraph-image`, `/maturite/[segment]/[level]/opengraph-image`) → PNG 200 + content-type image/png. |
| Funnel conversion instrumente (events GA4) | US-S20-5 + US-S20-6 (3 pts) | ✅ Atteint | 10 events post-consent (5 funnel quiz + 5 CTA/Calendly/contact). Tracking GA4 actif des qu'un visiteur accepte les cookies. |

**Score d'atteinte** : 4 outcomes / 4 = **100% du Sprint Goal**.

---

## 2 · Stories livrees

### Phase 1 — SEO surface (9 pts)

| Ordre | ID | Titre | Pts | Commit |
|---|---|---|---|---|
| 1 | US-S20-1 | Audit SEO formel + soumission Google Search Console | 1 | [156fed8](156fed8) + [ca850b5](ca850b5) (GSC meta follow-up) |
| 2 | US-S20-4 | Schema.org areaServed UK/BE/CH + meta home raccourcie | 1 | [3691964](3691964) + [2996f18](2996f18) (areaServed unification follow-up) |
| 3 | US-S20-3 | OG image dynamique per route (Next.js opengraph-image) | 2 | [c7508c7](c7508c7) |
| 4 | US-S20-2 | Pages services dediees Freshservice + Freshdesk FR+EN | 5 | [d73ffd0](d73ffd0) |

### Phase 2 — Conversion instrumentation (5 pts, Epic E25)

| Ordre | ID | Titre | Pts | Commit |
|---|---|---|---|---|
| 5 | US-S20-5 | Funnel GA4 quiz (5 events : started/form/lead/results/pdf) | 2 | [b6e4f4b](b6e4f4b) |
| 6 | US-S20-6 | CTA tracking (5 events : hero/sticky/calendly/contact_submit) | 1 | [67aba21](67aba21) |
| 7 | US-S20-7 | Calibration ROI Forrester TEI 2024 | 2 | [3bf92f9](3bf92f9) |

### Phase 3 — Process / Ops / runbooks (4 pts)

| Ordre | ID | Titre | Pts | Commit |
|---|---|---|---|---|
| 8 | T25 | Mini-refinement obligatoire ops > 30 min (CLAUDE.md + PROCESS.md §6.9) | 0 | [ee6a2f3](ee6a2f3) |
| 9 | T22 | Retro N en gate du Sprint Planning N+1 (PROCESS.md §4.1) | 1 | [d772e46](d772e46) |
| 10 | T24 | Runbook Vercel env vars + force-fresh-build | 1 | [e78f083](e78f083) |
| 11 | T23 | Sender Resend en RESEND_FROM_EMAIL + assertion format | 1 | [c16dd6a](c16dd6a) |
| 12 | OPS-S20.1 | Hotfix lockfile + alignement Node 22 LTS via `.nvmrc` (D34, D35) | 1 | [c2b555e](c2b555e) (PO) + [633e367](633e367) (PO) + [bc7f8b5](bc7f8b5) |

### Bug fix impreve (1 pt hors capacite)

| ID | Titre | Pts | Commit |
|---|---|---|---|
| US-S20-BUG.1 | Cookie banner ne se ferme pas au clic (RGPD blocker, debloque tracking GA4) | 1 | [9437c59](9437c59) |

---

## 3 · Demo live — preuves verifiables en prod

### 3.1 · Pages services indexables

```bash
$ curl -s -o /dev/null -w "%{http_code}\n" https://freshworks.whataservice.fr/fr/services/freshservice
200
$ curl -s -o /dev/null -w "%{http_code}\n" https://freshworks.whataservice.fr/en/services/freshdesk
200
```

Title FR : `Consultant Freshservice France | ITIL 4 & PRINCE2 — What A Service` (≤60c keyword en front)
Title EN : `Freshdesk Consultant | Omnichannel Customer Service — What A Service` (≤60c)

H1 : H1 unique par page, hierarchie H2/H3 coherente sur 7 sections.

### 3.2 · Sitemap mise a jour

```bash
$ curl -s https://freshworks.whataservice.fr/sitemap.xml | grep -c "<url>"
7
```

7 URLs (home + freshservice + freshdesk + quiz + maturite/itsm + maturite/cx + mentions-legales) × 3 hreflang variants chacune = 21 alternates total.

### 3.3 · Schema.org enrichi en prod

```
27 × Country     (9 schemas × 3 pays UK/BE/CH — vs 11 avant fix)
9 × GeoCircle    (1 par schema, Paris+500km — primaire FR)
9 × Service      (1 home + 8 dans StructuredData)
1 × Person, 1 × Organization, 1 × FAQPage (home), 6 × Question/Answer
+ 2 nouveaux Service avec Offer (priceFrom EUR) + 12 Q/A FAQPage (6 par page services)
```

Schema.org Validator : 0 erreur, 0 avertissement, 10 elements racine sur `/fr`.

### 3.4 · OG dynamique per route

```bash
$ curl -s -o /dev/null -w "%{http_code} %{content_type} %{size_download}\n" https://freshworks.whataservice.fr/fr/opengraph-image
200 image/png 41540
$ curl -s -o /dev/null -w "%{http_code} %{content_type} %{size_download}\n" https://freshworks.whataservice.fr/fr/quiz/opengraph-image
200 image/png 43011
$ curl -s -o /dev/null -w "%{http_code} %{content_type} %{size_download}\n" https://freshworks.whataservice.fr/fr/maturite/itsm/level-1/opengraph-image
200 image/png 39116
```

Templates personalises (badge "Quiz gratuit", "Diagnostic", etc.) + tokens charte WaS (deep #0C1220, accent #B8926A).

### 3.5 · Funnel GA4 — 10 events post-consent

| Event | Trigger |
|---|---|
| `quiz_started` | QuizFlow — choix segment ITSM/CX/ESM |
| `quiz_form_shown` | QuizResultsPreview — gate email visible |
| `quiz_lead_submitted` | useQuizSubmit — POST OK |
| `quiz_results_viewed` | QuizResultsPreview — render results |
| `quiz_pdf_downloaded` | QuizResultsPreview — click PDF |
| `cta_hero_click` | Hero — primary (#contact) ou secondary (/quiz) |
| `cta_sticky_click` | StickyCtaBanner — clic sur CTA |
| `calendly_opened` | StickyCtaBanner OU CalendlyPopup OU pages services (4 sources) |
| `contact_submit` | useContactForm — POST OK |
| `quiz_complete` | (legacy S18, etendu pour ESM en S20) |

Tous **post-consent** (RGPD-safe). Defensive guard `hasConsent()` try/catch (Safari private mode + sandboxed iframes).

### 3.6 · Cookie banner fonctionnel (US-S20-BUG.1)

Bug detecte par PO en visite live : popup ne se fermait pas. Cause = `useSyncExternalStore` ne s'abonnait qu'a l'event DOM `storage` (cross-tab uniquement, pas same-tab). Fix : ecouter aussi l'event custom `was-consent-change` dispatche par `setConsent()`. **5 tests TDD passants.**

### 3.7 · ROI calibre Forrester TEI 2024

Coefficients `roi.ts` recalibres :
- ITSM 380 → 200 €/employe/an (TEI baseline + 25% WaS value-add)
- CX 240 → 160 €/employe/an (concentre sur agents)
- ESM 320 → 220 €/employe/an (broader reach HR+IT+Facilities)

Hierarchie ESM > ITSM > CX (vs ITSM > ESM > CX avant) — reflete le scope d'impact par employe.

Disclaimer FR + EN cite explicitement la source : *"Forrester TEI Freshworks 2024 (composite 7 000 employes : 356% ROI, $2,84M NPV) et notre modele interne. Non contractuelle."*

---

## 4 · Apprentissages

### 4.1 · L'audit SEO formel pre-Sprint Planning (D30) a paye au-dela des esperances

L'audit a livre le scope reel du sprint :
- 4 trouvailles critiques absentes des hypotheses initiales (0 GA4 call-site, OG heritee, areaServed France-only, sitemap dynamique)
- TOP 5 actions WSJF pre-priorisees → 5/5 livrees
- Identification du gap "fondations vs surface" (US-S20-5/6 d'abord, US-S20-2 ensuite)

Pattern a reproduire : **chaque sprint dont le goal cible le SEO ou la perf commence par un audit formel** (D30 institutionnalise).

### 4.2 · Le push-and-verify en boucle courte = revelation post-deploy

Chaque commit majeur a ete suivi d'un curl prod. **Resultat** : 2 incoherences detectees post-deploy (areaServed des 8 Services FR-only, cookie banner fige) auraient ete invisibles 30 jours sinon.

Le **post-deploy curl** est un quality gate aussi important que le pre-merge build.

### 4.3 · Boucle universelle tenue meme sur les follow-ups + bug fixes

3 follow-ups + 1 bug fix RGBP integres en cours de sprint via mini-arbitrage PO en chat (T25 applique de facto). Aucune Phase 2 silencieuse comme S19 D8.

Stories livrees hors backlog initial mais avec tracabilite complete :
- US-S20-1 follow-up (GSC meta) — demande PO directe
- US-S20-4 follow-up (areaServed unification) — finding audit live
- US-S20-BUG.1 (cookie banner) — bug PO live + story documentee dans `docs/stories-ready/US-S20-BUG1.md`

### 4.4 · Rapport analyste = mine d'or pour la calibration content + ROI

L'agent Explore a livre une synthese de 6 sous-dossiers de rapports (Forrester, Gartner, BCG, McKinsey, Salesforce, Genesys, IDC). 5 rapports cles directement injectes dans le contenu :
- TEI Freshworks 2024 → calibration ROI + content benefits Freshservice
- Forrester Wave ESM Q4 2025 → "Strong Performer" en trust hero
- Freshservice Benchmark 2025 → 34% deflection / 74% FCR / 21h resolution
- Customer Service Benchmark 2025 → < 4 min first response / < 32 min resolution
- BCG Agentic AI 2025 → +50% productivite / +18 pts CSAT

Pattern a backlogger : **a chaque sprint contenu, exploiter explicitement les rapports analystes en source citation** (credibilite + SEO long-tail "consultant ITIL 4 Forrester Wave").

### 4.5 · Velocite atypique (19 pts en 1 session) = signal a investiguer

Le sprint a livre 19 pts effectifs en quelques heures de session intensive vs 1 semaine cadence. **Tension a arbitrer en Retro** :
- Soit la capacite Manifeste P8 (~20 SP/semaine) est sous-estimee pour Claude Code
- Soit la mesure en story points est imprecise (le sprint contenait beaucoup de quick wins 1 pt)
- Soit les 5+ pts gros morceaux (US-S20-2) sont sous-estimes a la realite Claude

A creuser dans la retro.

### 4.6 · D34/D35/D36 (lockfile + Node + commit rule) = correction process avant qu'elle bloque

PO a detecte CI rouge sur drift `@swc/helpers` next-intl transitive et ajoute 3 decisions structurelles :
- D34 : hotfix `package-lock.json` regenere
- D35 : `.nvmrc` Node 22 LTS = single source of truth
- D36 : regle commit lockfile (scope `chore(deps)`, dans le meme push que la modif deps)

Ces 3 decisions evitent de futurs incidents lockfile/Node a venir. **Modeles de prevention systemique.**

---

## 5 · Feedback PO

| Sujet | Feedback | Action |
|---|---|---|
| Pivot Sprint Goal SEO + conversion (D28) | Valide en debut sprint, maintenu | Pattern reproductible |
| Pages services FR+EN simultane (D29) | Valide, scope A complet | Livre 100% |
| Audit SEO pre-planning (D30) | Valide comme pattern | Reproduit chaque sprint SEO |
| Source ROI Forrester TEI 2024 (D33) | Valide | Calibration livree |
| Epic E25 Conversion (D32) | Valide, ouvert | Accumulera A/B tests + heatmaps |
| Cluster maturite etendu Phase 2 (D31) | Confirme hors scope | Backlog tres futur |
| Bug RGBP cookie banner | Detecte par PO en visite live | Fix immediat S20 |
| Hotfix lockfile + Node alignement (D34-D36) | PO a propose et trace | Livre OPS-S20.1 |

---

## 6 · Metriques chiffrees

| Metrique | Avant S20 | Apres S20 | Delta |
|---|---|---|---|
| Routes indexables Google | 4 | **7** | **+3** (services freshservice + freshdesk + freshservice-en + freshdesk-en) |
| Sitemap URLs | 10 (5 × 2 langues) | **14** (7 × 2 langues) | **+4** |
| Schemas JSON-LD `@type` distincts en prod | 11 | 12 + 6 nouveaux Q/A FAQ | enrichi |
| Pays couverts par `areaServed` | 1 (France) | **4** (FR/UK/BE/CH) sur 9 schemas | **cluster geo coherent** |
| Call-sites GA4 actifs | 0 | **10** (5 quiz + 5 CTA/contact) | **+10** |
| Tests unitaires | 913 | **958** | **+45** |
| E2E Playwright | 55 | 55 | stable |
| Coverage globale | ≥ 80% | ≥ 80% maintenue | stable |
| Commits Sprint | — | **20** | — |
| Decisions PO actees | D27 | **D36** | **+9 (D28-D36)** |
| Increment livre en prod | ✅ | ✅ | maintenu |
| Bug RGBP en prod | ⚠️ present | ✅ fixe | debloque tracking |
| Cookie banner fonctionnel | ❌ fige | ✅ se ferme | **debloque RGPD + GA4** |

---

## 7 · Sprint Goal — verdict final

> **🟢 ATTEINT — 4 outcomes sur 4 livres + 1 bug fix imprevu RGPD**

Site desormais :
- **+3 routes indexables** (pages services FR+EN) — capte l'intent transactionnel "consultant Freshservice/Freshdesk"
- **Signal Google coherent FR/UK/BE/CH** sur 9 schemas (vs incoherence 1 vs 8 avant)
- **OG dynamique per route** — partages sociaux affichent enfin la bonne preview
- **Funnel conversion mesurable** — 10 events GA4 firing post-consent
- **Cookie banner fonctionnel** — debloque tout le tracking livre US-S20-5/6
- **ROI defendable** — calibre sur Forrester TEI 2024 cite explicitement

20 commits en prod (b5f1fef..b41ab07), 958/958 tests pass, 0 violation a11y, build vert, GSC actif (sitemap soumis), Resend operationnel.

---

*Sprint Review S20 conduite le 26/04/2026 — Skill `agile-product-owner` mobilise. Verdict ATTEINT (100% Sprint Goal + 1 bug fix bonus). Voir [retro/sprint-20-retro.md](../retro/sprint-20-retro.md) pour les Keep/Drop/Try.*
