# Refinement — Sprint 20 "Surface SEO + funnel instrumente"

> **Date** : 26 avril 2026
> **Sprint vise** : Sprint 20 (debut J1 = 27/04/2026)
> **Duree** : 1 session (refinement preparatoire post-rétro S19)
> **Declencheurs** :
> - Demande PO 26/04 : "site performant en attraction SEO + qui convertit"
> - Inbox S20 issue de la rétro S19 (T20-T26 + US-23.1/2 = 12 pts) à reconcilier avec la nouvelle direction
> - Audit SEO formel conduit en pré-refinement (agent SEO + agent Explore)
> **Skills mobilises** : `agile-product-owner` + `marketing:seo-audit` + `dev-architecture` + `qa-strategy` + `qa-test-design` + `qa-unit-integration`

---

## 1 · Decisions et arbitrages

### 1.1 · Pivot du Sprint Goal S20

**Evenement** : demande PO 26/04 — "à la fin de cette session, j'ai un site performant en termes d'attraction sur le moteur de recherche et qui convertit".

**Tension preexistante** : la rétro S19 proposait pour S20 *"Industrialiser les guard-rails qualite et ops decouverts en Phase 2 S19"* (T20-T26 + US-23.1/2 = 12 pts orientes refactoring + a11y unit + runbooks).

**Arbitrage Three Amigos** :
- **PO** : la valeur business est la generation de leads. Le site SMI est en prod et stable, mais sa surface de captage Google est minimale (4 routes indexables, dont 2 maturity level-1 seulement) et le funnel n'est pas mesure (0 call-site GA4 pour les events conversion). Sans surface + sans mesure, on ne peut ni attirer ni optimiser.
- **Dev** : pivoter le Sprint Goal vers SEO + conversion ne contredit pas les guard-rails — on garde les quick wins process (T22-T25, ~3 pts) en buffer, on report le refactoring lourd (US-23.1/2) et l'a11y unit (T20) en S21 ou S22. Cohérent avec le budget refactoring ~20% (D25).
- **QA** : la stratégie de test pivote aussi — au lieu de tester les composants critiques avec axe-core (T20), on teste la presence et la valeur des events GA4 + le rendu SEO (meta, schema, OG) en SSR.

**Decision PO acquise** (reponse 26/04 au Three Amigos) : **pivot confirmé**.

**Sprint Goal S20 retenu** :

> *"Etendre la surface de captage SEO du site (pages services dédiées Freshservice + Freshdesk en FR+EN, schema.org enrichi UK/BE/CH, OG dynamiques) et instrumenter le funnel de conversion (events GA4 quiz + CTA + contact) pour piloter les optimisations à la donnée."*

**Outcome mesurable end-of-sprint** :
- Sitemap passe de 10 URLs à 14 URLs (+ 2 pages services × 2 langues)
- Schema Organization + Service couvrent 4 pays (FR/UK/BE/CH)
- OG image dynamique générée per route (vs 1 statique aujourd'hui)
- 8-10 events GA4 firing en prod (vs 0 aujourd'hui)
- ROI Forrester calibré sur source publique citée

### 1.2 · Pages services prioritaires — quelles 2 sur les 8 du catalogue ?

**Catalogue D18** = 8 offres. Audit SEO mots-clés :

| Mot-clé candidat | Vol estimé | Intent | Page WaS qui rankerait |
|---|---|---|---|
| consultant Freshservice | 50-150/mois (low) | transactionnel haut | manque |
| migration ServiceNow vers Freshservice | 100-300/mois (med) | transactionnel haut | manque |
| consultant Freshdesk France | 30-80/mois (low) | transactionnel haut | manque |
| Freshservice vs ServiceNow | 300-700/mois (med) | comparatif | FAQ Q5 capte (faible) |
| Freshservice prix | 200-500/mois (med) | comparatif | manque (D15 "à partir de" non visible) |
| Freddy AI Freshworks | 50-150/mois (low) | info+trans | TechStack capte (faible) |

**Options Three Amigos** :
- (a) CX/ESM Transfo + Migration + Audit (3 premium) → forte marge, faible volume search
- (b) **Freshservice + Freshdesk** → mots-clés à plus fort intent transactionnel + alignés KPI cadrage "Top 10 consultant Freshservice 6 mois"
- (c) Migration + Freshservice → top 2 keyword volume mais Freshdesk laissé sans page

**Decision PO acquise** : **option (b)** — Freshservice + Freshdesk, **FR+EN simultané**.

**Note R3** (red flag §6) : FR+EN simultané = ~3000 mots EN à rédiger en 1 sprint. Mitigation : voice "Expert Next Door" déjà cadrée (PO-CADRAGE), templates de structure réutilisables, relecture PO bloc i18n > 50 cles (héritée T21, à appliquer même si reportée comme story formelle).

### 1.3 · Reconciliation inbox S20 initiale

| Story inbox initiale | Pts | Décision | Sprint cible |
|---|---|---|---|
| US-23.1 — Decompose generate-pdf.ts | 2 | Reportée (refactoring lourd) | S21 ou S22 |
| US-23.2 — Extract MobileMenu + useFocusTrap | 3 | Reportée (refactoring lourd) | S21 ou S22 |
| T20 — vitest-axe sur composants critiques quiz | 2 | Reportée (a11y unit, valeur indirect) | S21 |
| T21 — Process : relecture PO i18n > 50 cles | 0 | Active de facto (FR+EN services pages) | S20 implicite |
| T22 — Retro N en gate Sprint Planning N+1 | 1 | **Engagé S20** (process critical) | S20 |
| T23 — Sender Resend variable env + assertion | 1 | **Engagé S20** (ops critical) | S20 |
| T24 — Runbook env vars Vercel + force-fresh-build | 1 | **Engagé S20** (ops critical) | S20 |
| T25 — Mini-refinement obligatoire ops > 30 min | 0 | **Engagé S20** (process formel) | S20 |
| T26 — checkResend health → /emails | 1 | Reportée (cosmétique) | S21 |

**Decision PO acquise** : OK pour reporter US-23.1, US-23.2, T20, T26 en S21+. T22-T25 restent dans S20 comme buffer process/ops.

### 1.4 · Audit SEO formel en pre-Sprint Planning

**Pattern adopté** (D30) : tout sprint dont le Sprint Goal cible explicitement le SEO commence par un audit formel (skill `marketing:seo-audit` + agent Explore code). L'audit S20 a livré :

- TOP 5 priorités WSJF — 4/5 retenues dans les stories ci-dessous (la #4 areaServed UK absorbée dans US-S20-4, la #5 GSC absorbée dans US-S20-1)
- Liste 12 mots-clés FR + 7 EN avec volume estimé (à valider GSC après soumission)
- 5 concurrents identifiés (Almavia CX, Cyber-Cite, Devoteam, Sciforma, Dimo)
- Bugs/dette SEO détectés (sitemap `lastModified: new Date()`, OG images héritées, areaServed FR-only)

Rapport intégré en source dans `docs/seo/audit-2026-04-26.md` (créé en US-S20-1).

---

## 2 · Strategie de test et risques qualite

### 2.1 · Skill `qa-strategy` — analyse risques par story

| Story | Risque qualite principal | Mitigation |
|---|---|---|
| US-S20-1 (Audit + GSC) | Sitemap qui change à chaque build (`lastmod: new Date()`) → bruit crawler, faux positifs SERP | Figer `lastModified` par contenu (timestamp gelé en build), test unitaire qui vérifie l'absence de `new Date()` dynamique |
| US-S20-2 (Pages services FR+EN) | Contenu EN trop calque du FR → ton "Expert Next Door" perdu | Relecture PO ligne à ligne (T21 implicite) + test unitaire qui vérifie 0 phrase strictement traduite mot à mot via dictionnaire de termes interdits |
| US-S20-3 (OG dynamique per route) | Next.js 16 `opengraph-image.tsx` runtime Edge — risque de timeout build si génération lourde | Cap font size + 1 image template paramétrée (pas N templates), test E2E qui crawl l'OG URL sur 4 routes |
| US-S20-4 (Schema UK/BE/CH + meta home) | Modification schema.org peut casser Rich Results | Test unitaire snapshot du JSON-LD émis, validation manuelle Schema.org Validator (URL dans la story) |
| US-S20-5 (Funnel quiz GA4) | Events firing avant consent ou en double — RGPD breach + bruit data | Test unitaire `trackEvent` qui assert `hasConsent()` avant call, test E2E qui vérifie 0 hit GA4 sans consent puis N hits avec consent |
| US-S20-6 (CTA tracking) | Idem US-S20-5 (RGPD + déduplication clicks rapides) | Idem + debounce 300ms sur les CTA (pattern déjà utilisé sur sticky banner) |
| US-S20-7 (Calibration ROI Forrester) | Modèle ROI changé invalide les tests existants `roi.test.ts` | Snapshot des outputs avant/après pour les 15 cellules matrice + assertion que monotonicity + level 5 zero-flag + segment differentiation tiennent toujours (invariants D21) |
| T22-T25 (process/ops) | Documentation qui dérive du réel | T22 = checklist exécutée à chaque planning, T24 = runbook testé en réel par PO une fois |

### 2.2 · Modèle de test applique (skill `qa-strategy`)

Pyramide adaptée au contexte SEO + analytics :
- **Unit (Vitest)** : helpers SEO (sitemap entries, schema generators, OG image generators), helpers analytics (trackEvent gating), valider invariants ROI
- **Integration** : routes Next.js avec generateMetadata, JSON-LD injecté dans le HEAD, sitemap.xml émis correctement
- **E2E (Playwright)** : nouvelles spec `tests/e2e/seo-services-pages.spec.ts` (meta + schema + OG par page) + extension `tests/e2e/quiz-tracking.spec.ts` (events firing après consent)
- **Manuel post-deploy** : Schema.org Validator + Rich Results Test + GSC URL inspection sur les 4 nouvelles pages

### 2.3 · Couverture cible

- Coverage globale ≥ 80% (seuil ratchet maintenu)
- Couverture ≥ 85% sur le nouveau code SEO + analytics (composants pour parties critiques)
- 0 violation critique/serieuse axe-core sur les 4 nouvelles pages services
- 100% des AC Gherkin convertis en specs E2E exécutables

---

## 3 · Stories raffinees

### US-S20-1 — Audit SEO formel + soumission Google Search Console

#### PO — Clarifications et valeur

**Pourquoi** : sans GSC, on est aveugle sur le SEO réel (positions, CTR, queries). L'audit formel devient référentiel pour mesurer les optimisations futures.

**Valeur business** : **forte indirecte** — toute story SEO future sera pilotée par data réelle au lieu d'hypothèses.

**Outcome** : (1) document `docs/seo/audit-2026-04-26.md` formalisé et committé, (2) sitemap.xml soumis et indexé dans GSC, (3) sitemap.ts cleanup (lastModified figé).

#### Dev — Plan technique

```
docs/seo/audit-2026-04-26.md          # nouveau (rapport agent SEO + actions priorisées)
src/app/sitemap.ts                     # remplace `new Date()` par timestamp build figé
src/app/__tests__/sitemap.test.ts      # nouveau (assert pas de Date() dynamique)
```

**GSC submission** = action manuelle PO (pas de code) — runbook documenté dans US-S20-1 :
1. Aller sur https://search.google.com/search-console
2. Add property → URL prefix → `https://freshworks.whataservice.fr`
3. Verify ownership : DNS TXT record sur OVH (ou meta tag injecté dans `[locale]/layout.tsx`)
4. Sitemaps → submit `/sitemap.xml`
5. Vérifier 0 erreur 24h après

#### QA — Plan de test

- Unit : `sitemap.test.ts` — émet 10 URLs (avant), assert le format alternates, assert lastModified non-Date()
- Manuel : runbook GSC suivi, screenshot 0 erreur dans `docs/seo/gsc-submission-screenshot.png`

**Story Points : 1** | **DoR : ✅ Ready**

---

### US-S20-2 — Pages services dédiées Freshservice + Freshdesk (FR+EN)

#### PO — Clarifications et valeur

**Pourquoi** : capter l'intent transactionnel "consultant Freshservice", "consultant Freshdesk France", aligné KPI cadrage Top 10 à 6 mois. Aujourd'hui, ces queries arrivent sur la homepage générique → CTR et conversion sub-optimaux.

**Valeur business** : **forte directe** — sources :
- Vol estimé combiné Freshservice (50-150/mois) + Freshdesk (30-80/mois) = 80-230 sessions/mois potentiel à 6 mois
- Pages dédiées améliorent le quality score Google (intent match)
- Internal linking depuis Hero/Services/FAQ/Footer + JSON-LD Service profond

**Outcome** : 4 nouvelles pages indexables (2 routes × 2 langues) avec 1500-2000 mots SEO chacune.

#### Dev — Plan technique (skill `dev-architecture`)

```
src/app/[locale]/services/[slug]/page.tsx       # nouveau — route dynamique
src/app/[locale]/services/[slug]/__tests__/     # tests metadata + JSON-LD + content render
src/components/sections/services/                # nouveau — composants réutilisables (HeroService, BenefitsGrid, ProcessTimeline, FAQSchema, CTAFinal)
src/config/services-content.ts                   # nouveau — content blocks par service (clés i18n)
src/messages/fr.json                             # +services.freshservice.* et services.freshdesk.* (~250 cles)
src/messages/en.json                             # idem EN
src/app/sitemap.ts                               # +bilingualEntry("/services/freshservice", 0.85, "monthly") + idem freshdesk
src/components/layout/Footer.tsx                 # liens vers les 2 nouvelles pages
src/components/sections/Services.tsx             # cartes Freshservice/Freshdesk → href={`/services/${slug}`}
```

**Pattern de page service** (alignement scroll-narrative homepage) :
1. Hero spécifique (H1 SEO-optimisé : "Consultant Freshservice — Implémentation, optimisation, formation")
2. Problem agitation pour cette plateforme (3 pain points)
3. Notre approche en 4 étapes (Discover → Implement → Optimize → Scale)
4. Bénéfices chiffrés (3-4 metrics)
5. Cas client (1 référence)
6. Pricing "à partir de" (D15)
7. FAQ spécifique (5-7 questions, contribue FAQPage schema dédié)
8. CTA final → /quiz ou /#contact

**Internal linking** :
- Depuis Header (NAV_LINKS étendu avec 2 entrées)
- Depuis Hero homepage (CTA tertiaire "Voir nos services Freshservice")
- Depuis FAQ homepage (Q sur Freshservice → lien vers la page)
- Depuis Footer (section "Services" enrichie)
- Cross-link Freshservice ↔ Freshdesk (related services)

**JSON-LD** : Service schema spécifique + areaServed étendu (cf. US-S20-4) + Offer (priceFrom) → contribue Rich Results.

#### QA — Plan de test

- **Unit (Vitest)** :
  - `services-content.test.ts` — assert structure des content blocks (titles, paragraphs, faq min 5 entrees)
  - `services-page.test.ts` — assert generateMetadata émet title/description/canonical/alternates/openGraph/twitter
  - `services-schema.test.ts` — JSON-LD Service valid + areaServed array de 4 pays
- **Integration** : SSR rendering — H1 unique, 5+ H2, FAQPage schema injecté
- **E2E (Playwright)** :
  - `tests/e2e/services-pages.spec.ts` — visite /fr/services/freshservice + /en/services/freshservice + idem freshdesk → assert title contient le keyword, assert hreflang switcher fonctionne, assert CTA Calendly cliquable
  - axe-core 0 violation critique
- **i18n parity** (T16 existant) : doit passer sur les ~250 nouvelles clés FR + EN

**Story Points : 5** | **DoR : ✅ Ready**

---

### US-S20-3 — OG image dynamique per route (Next.js 16 opengraph-image)

#### PO — Clarifications et valeur

**Pourquoi** : aujourd'hui un partage LinkedIn de `/quiz` ou `/maturite/itsm/level-1` affiche l'OG du root (pris dans `[locale]/layout.tsx`) → faux signal social, perte de CTR sur les partages.

**Valeur business** : **moyenne directe** — chaque partage social mal cadré est un lead potentiel perdu. Quick win.

#### Dev — Plan technique

Next.js 16 supporte `opengraph-image.tsx` (Edge runtime) qui génère une PNG à la volée par route :

```
src/app/[locale]/opengraph-image.tsx              # template homepage (déjà couvert par og-default.png mais on remplace)
src/app/[locale]/quiz/opengraph-image.tsx         # nouveau — variante quiz (titre + badge "Quiz gratuit")
src/app/[locale]/services/[slug]/opengraph-image.tsx  # nouveau — variante service (slug param)
src/app/[locale]/maturite/[segment]/[level]/opengraph-image.tsx  # nouveau — variante maturity
```

**Architecture** : 1 helper partagé `src/lib/og/template.tsx` qui prend `{ title, subtitle, badge?, locale }` et compose l'image avec les couleurs charte (deep #0C1220, accent #B8926A, surface). Évite la duplication de styling.

**Performance** : Edge runtime, < 100KB par image, font Plus Jakarta Sans embed (subset).

**generateMetadata** : ajouter explicitement `openGraph.images` (auto-détecté par Next mais on le rend explicite pour les tests).

#### QA — Plan de test

- **Unit** : `og-template.test.ts` — assert dimensions 1200×630, accept des paramètres optionnels
- **Integration** : `services-page.test.ts` — generateMetadata émet `openGraph.images` non-vide
- **E2E** : `tests/e2e/og-images.spec.ts` — pour 4 routes, fetch `/<route>/opengraph-image` → assert 200 OK + content-type image/png + size < 200KB

**Story Points : 2** | **DoR : ✅ Ready**

---

### US-S20-4 — Schema.org areaServed UK/BE/CH + meta home raccourcie

#### PO — Clarifications et valeur

**Pourquoi** : aujourd'hui `areaServed: France` exclut UK/BE/CH du knowledge graph Google. Bloque l'intent EN UK déclaré dans le brief PO-CADRAGE. Quick win.

Meta description home actuelle = 268 chars (audit) → tronquée par Google à ~155. Reformuler.

**Valeur business** : **moyenne** — Schema = signal Google sur la zone de service ; meta = CTR SERP.

#### Dev — Plan technique

```
src/config/schema.ts
  - ORGANIZATION.areaServed : passer de single GeoCircle Paris+500km
    à array [GeoCircle Paris+500km, Country UK, Country BE, Country CH]
  - Service blocks : areaServed identique
src/app/[locale]/maturite/[segment]/[level]/page.tsx:70
  - serviceSchema.areaServed : array idem
src/messages/fr.json + en.json
  - layout.metadata.description : reformuler en < 155 chars, garder keyword "Freshworks"
```

#### QA — Plan de test

- Unit : `schema.test.ts` — assert ORGANIZATION.areaServed est un array de 4 éléments avec les bons @type
- Unit : `metadata.test.ts` — assert description.length ≤ 155 (FR + EN)
- Manuel : Schema.org Validator post-deploy

**Story Points : 1** | **DoR : ✅ Ready**

---

### US-S20-5 — Instrumenter le funnel GA4 du quiz

#### PO — Clarifications et valeur

**Pourquoi** : 0 call-site des helpers `trackQuizComplete` aujourd'hui (helpers définis S18, jamais appelés). On ne mesure rien du funnel quiz → impossible de savoir où ça décroche, donc impossible d'optimiser.

**Valeur business** : **forte indirecte** — fondation de toute optimisation conversion future.

**Events à émettre** (post-consent) :

| Event | Trigger | Properties |
|---|---|---|
| `quiz_started` | QuizSelector → choix segment | segment (itsm/cx/esm) |
| `quiz_question_completed` | submit d'une question | segment, question_index, response_value |
| `quiz_form_shown` | affichage formulaire lead capture | segment, score_global |
| `quiz_lead_submitted` | submit form succès | segment, score_global, level (1-5) |
| `quiz_results_viewed` | render des résultats | segment, level, has_roi (bool) |
| `quiz_pdf_downloaded` | click download PDF | segment, level |

Note : la signature actuelle `trackQuizComplete(segment: "itsm" | "cx", ...)` doit être étendue à `"esm"` (dette héritée S19).

#### Dev — Plan technique

```
src/lib/analytics.ts
  - Etendre trackQuizComplete signature : segment: QuizSegment (incl. esm)
  - Ajouter trackQuizStarted, trackQuizQuestionCompleted, trackQuizFormShown,
    trackQuizLeadSubmitted, trackQuizResultsViewed, trackQuizPdfDownloaded
src/components/quiz/QuizSelector.tsx       # call trackQuizStarted on segment select
src/components/quiz/QuizQuestion.tsx       # call trackQuizQuestionCompleted on submit
src/components/quiz/QuizForm.tsx           # call trackQuizFormShown on mount, trackQuizLeadSubmitted on success
src/components/quiz/QuizResults.tsx        # call trackQuizResultsViewed on mount
src/components/quiz/QuizPdfDownload.tsx    # call trackQuizPdfDownloaded on click (find actual filename)
```

**Pattern** : créer un hook `useQuizTracking()` qui expose les 6 fonctions, consomme par les composants. Évite la dispersion des call-sites et facilite le mock en test.

#### QA — Plan de test

- **Unit (Vitest)** :
  - `analytics.test.ts` — extend tests existants : assert nouveaux helpers émettent les bons params, assert no-op si !hasConsent()
  - `useQuizTracking.test.ts` — hook testé en isolation
- **Integration** : `QuizSelector.test.tsx` etc. — mock `trackQuizStarted`, assert appelé avec bon segment au click
- **E2E (Playwright)** :
  - Extension de `tests/e2e/quiz-itsm.spec.ts` (ou nouvelle `quiz-tracking.spec.ts`) — accept consent au début, intercepte les requests vers `https://www.google-analytics.com/g/collect`, assert N hits avec les bons event names

**Story Points : 2** | **DoR : ✅ Ready**

---

### US-S20-6 — Instrumenter les CTA homepage (Hero + Sticky + Calendly + Contact)

#### PO — Clarifications et valeur

**Pourquoi** : pareil que US-S20-5 mais pour les conversion points hors quiz. `trackContactSubmit()` est défini mais 0 call-site.

**Valeur business** : **forte indirecte** — sans ces events, aucun A/B test future possible (pas de baseline).

**Events** :

| Event | Trigger | Properties |
|---|---|---|
| `cta_hero_primary_click` | Hero CTA "Réserver un appel" | locale, position |
| `cta_hero_secondary_click` | Hero CTA "Évaluer maturité" | locale |
| `cta_sticky_click` | Sticky CTA banner | locale, scroll_depth |
| `calendly_opened` | Open Calendly popup | source (hero/sticky/contact) |
| `contact_submit` | Form contact succès | success (bool) |

#### Dev — Plan technique

```
src/lib/analytics.ts
  - Ajouter trackCtaHeroPrimary, trackCtaHeroSecondary, trackCtaSticky, trackCalendlyOpened
  - trackContactSubmit existe déjà — l'appeler depuis useContactForm
src/components/sections/Hero.tsx
src/components/ui/StickyCtaBanner.tsx
src/components/ui/CalendlyButton.tsx        (ou wrapper équivalent)
src/components/sections/Contact.tsx + useContactForm.ts
```

#### QA — Plan de test

- Unit : extend `analytics.test.ts`, hook `useContactForm.test.ts` mocke `trackContactSubmit`
- E2E : `tests/e2e/cta-tracking.spec.ts` — intercepte requests GA4, click CTA, assert event fired

**Story Points : 1** | **DoR : ✅ Ready**

---

### US-S20-7 — Calibration ROI Forrester (lecture rapport TEI public + ajustement coefficients)

#### PO — Clarifications et valeur

**Pourquoi** : pré-requis ouvert post-S19. Le ROI estimé affiché en résultat quiz utilise des coefficients heuristiques (D21) — il faut les calibrer sur la source publique citée pour pouvoir défendre les chiffres lors d'un appel client.

**Valeur business** : **moyenne directe** — crédibilité du chiffre ROI = arme de conversion en réunion. Aussi, source citée dans le disclaimer = défense légale.

**Source à utiliser** (à valider PO) :
- Forrester TEI Freshworks 2024 (gratuit en download Freshworks.com avec form lead) — recommandation Three Amigos
- Alternative : whitepaper Freshservice ROI publié par Freshworks (publication marketing, moins crédible)

#### Dev — Plan technique

```
src/lib/quiz/roi.ts
  - Re-calibrer PER_EMPLOYEE_GAIN_AT_LEVEL_1 et SEGMENT_MULTIPLIER selon Forrester
  - Documenter la source en JSDoc (URL + page report)
  - Garder les invariants D21 (monotonicity, level 5 zero-flag, segment differentiation)
src/lib/quiz/__tests__/roi.test.ts
  - Update fixtures attendues
  - Assert disclaimer i18n cite la source
src/messages/{fr,en}.json
  - quiz.roi.disclaimer : ajouter mention "Source : Forrester TEI Freshworks 2024 + modèle interne WaS"
```

#### QA — Plan de test

- Unit : `roi.test.ts` mis à jour, 4 invariants D21 toujours verts
- Snapshot : output ROI pour 5 niveaux × 3 segments × 3 brackets taille = 45 cas, snap committé
- Manuel : PO valide les 5-10 valeurs limites lors du refinement

**Story Points : 2** | **DoR : ⏳ Quasi-Ready** (dépend de la confirmation source par PO en planning)

---

### T22 — Retrospective N en gate du Sprint Planning N+1

#### PO — Clarifications et valeur

**Pourquoi** : retro S18 conduite avec 7 jours de retard (Drop S19 D7). Process à formaliser pour ne pas reproduire.

#### Dev — Plan technique

```
docs/PROCESS.md §4.1
  - Ajouter checklist "Pré-requis Sprint Planning" avec item :
    "[ ] Retro N committee dans docs/retro/sprint-N-retro.md"
CLAUDE.md
  - Section "Situations où je pause et je demande" : ajouter
    "Sprint Planning sans retro N committée → pauser et conduire la retro d'abord"
```

#### QA

- Manuel : checklist appliquée au Sprint Planning S20 (cette session) en démonstration

**Story Points : 1** | **DoR : ✅ Ready**

---

### T23 — Sender Resend en variable d'environnement + assertion

#### PO — Clarifications et valeur

**Pourquoi** : Drop S19 D9 — sender hardcoded 4 call-sites a causé incident D27. Extract en env var rend la migration future de domaine sender (autres sites WaS) triviale.

#### Dev — Plan technique

```
src/lib/email/resend.ts (ou équivalent)
  - Lire process.env.RESEND_FROM_EMAIL au démarrage
  - Default fallback : "noreply@update.whataservice.fr"
  - Au boot (instrumentation), logger la valeur effective (1 fois)
src/lib/email/__tests__/resend.test.ts
  - Assert lecture env var, assert format email valide regex
```

Côté Vercel : ajouter `RESEND_FROM_EMAIL=noreply@update.whataservice.fr` dans Production + Preview + Development.

#### QA

- Unit : assert env reading + format
- Manuel : Vercel env updated + force-fresh-build + smoke test 1 envoi

**Story Points : 1** | **DoR : ✅ Ready**

---

### T24 — Runbook env vars Vercel + force-fresh-build

#### PO — Clarifications et valeur

**Pourquoi** : Drop S19 D10 — confusion `NEXT_PUBLIC_*` invisible après redeploy from cache. Documenter pour ne plus perdre de temps.

#### Dev — Plan technique

```
docs/runbooks/vercel-env-vars.md  # nouveau
```

Contenu :
1. Ajouter une env var via dashboard Vercel
2. **NE PAS cliquer "Redeploy"** (cache)
3. Pour force fresh build : `git commit --allow-empty -m "chore(ci): force fresh build for env vars" && git push`
4. Vérifier dans Vercel Build Logs que la var est pickée
5. Smoke test correspondant (ex: contact form si RESEND_*, GA4 fire si NEXT_PUBLIC_GA_*)

Bonus : section "Debug env var manquante" (curl /api/health?deep=1, etc.).

#### QA

- Manuel : PO suit le runbook une fois (test grandeur nature au prochain ajout d'env)

**Story Points : 1** | **DoR : ✅ Ready**

---

### T25 — Mini-refinement obligatoire pour ops > 30 min

#### PO — Clarifications et valeur

**Pourquoi** : Drop S19 D8 — Phase 2 ops S19 a violé la boucle universelle. Formaliser la règle.

#### Dev — Plan technique

```
CLAUDE.md
  - Section "Boucle universelle" : ajouter sub-règle :
    "Toute opération hors-code estimée > 30 min (ops, DNS, deploy, env vars,
     intégrations tiers) ouvre AVANT exécution un fichier
     docs/refinement/ops-YYYY-MM-DD-<slug>.md avec stories OPS-x.x Ready,
     décisions PO actées, scope chiffré."
docs/PROCESS.md §6
  - Sous-section "Ops > 30 min" qui détaille le pattern
```

#### QA

- Manuel : prochaine ops > 30 min (probable : DNS Apex `whataservice.fr` Phase 2 site ombrelle WaS) déclenche le pattern

**Story Points : 0** | **DoR : ✅ Ready** (process)

---

## 4 · Setup transverse

### 4.1 · Convention de nommage

- ID stories : `US-S20-1` à `US-S20-7` (pas d'epic E24 ouverte — éviter la prolifération d'epics, tout vit sous E22-SEO ou nouvelle E25-Conversion à acter)
- Process tasks : `T22` à `T25` (suite logique post-S19)
- Scope commit nouveau : `seo` (pages services, schema, sitemap), `analytics` (events GA4), existants pour le reste

**Decision PO demandée (D32 candidate)** : ouvrir une nouvelle epic E25 "Conversion instrumentation" pour US-S20-5 / US-S20-6 (et accumuler les futures stories tracking/A-B testing) ? Ou les classer sous E22-SEO ?

### 4.2 · Definition of Ready S20 — checklist

- [x] Format User Story complet (rôle + action + bénéfice)
- [x] 3-5 critères d'acceptation Gherkin par story
- [x] Estimation Fibonacci (toutes ≤ 5 pts ✓)
- [x] Pas de dépendance bloquante non résolue
- [x] Fichiers impactés identifiés
- [x] Données de test définies
- [x] Critères automatisables (QA)

→ **6/7 stories Ready immédiatement, US-S20-7 quasi-Ready** (dépend confirmation source Forrester par PO en planning).

### 4.3 · Capacité et forecast

- Capacité : **20 pts** (cadence 1 semaine, Manifeste P8)
- Engagé Phase 1 dev SEO + conversion : 1 + 5 + 2 + 1 + 2 + 1 + 2 = **14 pts**
- Engagé buffer process/ops : 1 + 1 + 1 + 0 = **3 pts**
- **Total engagé : 17 pts** — marge 3 pts pour absorber Refactoring Radar mensuel ou story émergente

---

## 5 · Quality gates

Pour chaque story de S20 :

- [ ] `npm run build` reste vert
- [ ] `npm run lint` 0 erreur
- [ ] `npm run test` 100% pass
- [ ] Coverage globale ≥ 80% **maintenue**
- [ ] `npx playwright test` pass (estimation : +6 nouveaux specs E2E → ~61 tests)
- [ ] axe-core 0 violation critique/serieuse sur les 4 nouvelles pages services
- [ ] T16 i18n parity FR/EN passe (estimation : +250 cles services × 2 langues)
- [ ] Tests TDD : chaque helper/composant/event tracking a son test ecrit AVANT le code
- [ ] 1 commit par story (scope chirurgical)

**Quality gates spécifiques SEO** :
- [ ] Schema.org Validator → 0 erreur sur Organization, Service, FAQPage, BreadcrumbList
- [ ] Rich Results Test (Google) → 0 erreur sur la homepage et les 2 pages services
- [ ] Meta description ≤ 155 chars (FR + EN, toutes pages)
- [ ] Title ≤ 60 chars (FR + EN, toutes pages)
- [ ] hreflang FR + EN + x-default sur toutes les pages

**Quality gates spécifiques analytics** :
- [ ] 0 hit GA4 émis avant consent (vérifié en E2E)
- [ ] Tous les events listés §3.US-S20-5/6 sont firing en prod après consent
- [ ] Disclaimer ROI cite explicitement la source (Forrester TEI 2024)

---

## 6 · Red flags detectes

### R1 · Volume contenu EN à rédiger en 1 sprint (Pages services FR+EN)

- **Cause** : 2 pages × ~1500 mots × 2 langues = ~6000 mots, dont 3000 EN. Risque qualité linguistique sur ton "Expert Next Door".
- **Impact** : moyen — pages services sub-optimales en EN = baisse CTR et conversion sur le marché UK/IE.
- **Mitigation** :
  1. Tone "Expert Next Door" déjà cadré dans MARKETING-GUIDELINES.docx
  2. Templates de structure réutilisables (helper Hero/Benefits/Process/FAQ partagés)
  3. T21 "relecture PO bloc i18n > 50 cles" appliqué de facto même si reportée comme story formelle
  4. Échantillon EN validé par PO sur 1 section avant rédaction des autres
- **Niveau** : moyen — contournable

### R2 · Source ROI Forrester à confirmer (US-S20-7)

- **Cause** : Forrester TEI Freshworks public ↔ whitepaper Freshservice ROI ↔ Forrester research.com (payant). PO doit choisir.
- **Impact** : faible — mais bloque le démarrage de US-S20-7 jusqu'au choix.
- **Mitigation** : arbitrage demandé en début de Sprint Planning S20. Recommandation Three Amigos = Forrester TEI 2024 (publication officielle Forrester sponsorisée par Freshworks, gratuite avec form, citée comme référence dans tout le marché ITSM).
- **Niveau** : faible

### R3 · Sitemap `lastModified: new Date()` change à chaque build

- **Cause** : tous les `lastmod` du sitemap changent à chaque deploy même si le contenu n'a pas bougé → bruit pour Google, signal pollué.
- **Impact** : faible cosmétique — mais peut décrédibiliser le sitemap pour Google.
- **Mitigation** : fix dans US-S20-1 (figé par contenu, ou timestamp build constant ; cf. story).
- **Niveau** : faible

### R4 · Cluster maturité 3×5=15 pages **n'est PAS dans S20** (clarification cadrage)

- **Cause** : la mémoire MEMORY.md mentionnait "3 parcours quiz ITSM/CX/ESM en prod" — vrai pour le quiz, mais le code maturité = `VALID_SEGMENTS=["itsm","cx"]` + `VALID_LEVELS=["level-1"]` → **2 pages maturité réelles**. ESM + niveaux 2-5 jamais générés (i18n absent).
- **Impact** : moyen — gros gisement SEO long-tail laissé sur la table ("maturité ITSM niveau 3", etc.) = ~50-100 vol/mois × 15 pages.
- **Mitigation** : pas de fix S20 (gros effort contenu PO) — backlog Phase 2 ou S22+. **D31 acté** : cluster maturité étendu = Phase 2.
- **Niveau** : moyen — accepté en l'état pour S20

### R5 · OG image dynamique Edge runtime — risque build (US-S20-3)

- **Cause** : Next.js 16 `opengraph-image.tsx` runtime Edge. Si la génération est lourde (font subset trop gros, composition complexe), peut timeout en build Vercel.
- **Impact** : faible — Vercel a un timeout généreux (60s par function build). Mais à monitorer.
- **Mitigation** : 1 helper template paramétré (pas N templates dupliqués), font subset minimal (Plus Jakarta Sans 600 chars max).
- **Niveau** : faible

---

## 7 · Sortie de la session — Stories Ready

| Story | Pts | DoR | Sprint cible | Ordre dev |
|---|---|---|---|---|
| US-S20-1 — Audit SEO formel + GSC | 1 | ✅ | S20 | 1 (debloque mesure) |
| T25 — Mini-refinement ops > 30 min | 0 | ✅ | S20 | 2 (process, gratuit) |
| T22 — Retro N gate Sprint Planning | 1 | ✅ | S20 | 3 (process) |
| US-S20-4 — Schema UK/BE/CH + meta home | 1 | ✅ | S20 | 4 (quick win) |
| T24 — Runbook Vercel env vars | 1 | ✅ | S20 | 5 (doc) |
| T23 — Sender Resend en env var | 1 | ✅ | S20 | 6 (1 commit) |
| US-S20-5 — Funnel GA4 quiz | 2 | ✅ | S20 | 7 (instrumentation prio) |
| US-S20-6 — CTA tracking | 1 | ✅ | S20 | 8 (suite analytics) |
| US-S20-3 — OG dynamique per route | 2 | ✅ | S20 | 9 (SEO social) |
| US-S20-7 — Calibration ROI Forrester | 2 | ⏳ | S20 | 10 (après confirmation source) |
| US-S20-2 — Pages services FR+EN | 5 | ✅ | S20 | 11 (gros morceau, en parallèle si possible) |

**Total : 17 pts** — sous capacité 20.

**Reportés en S21+** :
- US-23.1 (PDF decompose) — 2 pts
- US-23.2 (MobileMenu + useFocusTrap) — 3 pts
- T20 (vitest-axe quiz) — 2 pts
- T26 (checkResend /emails) — 1 pt
- T21 (process relecture PO i18n > 50 cles) — 0 pt (formalisation reportée mais pratique appliquée S20)

**Backlog Phase 2 (acté D31)** :
- Cluster maturité étendu : ESM + niveaux 2-5 → 13 pages contenu à rédiger (~13 pts)

---

## 8 · Decisions arbitrees par le PO

| ID | Decision | Date | Source |
|---|---|---|---|
| D28 | Pivot Sprint Goal S20 vers SEO surface + conversion instrumentation (vs guard-rails proposés fin S19) | 26/04/2026 | Demande PO + arbitrage Three Amigos |
| D29 | 2 pages services prioritaires = **Freshservice + Freshdesk**, FR+EN simultané | 26/04/2026 | Audit SEO mots-clés + KPI cadrage |
| D30 | Audit SEO formel obligatoire en pré-Sprint Planning quand le Sprint Goal cible le SEO | 26/04/2026 | Pattern à reproduire S21+ |
| D31 | Cluster maturité étendu (ESM + niveaux 2-5) = backlog Phase 2 (hors scope S20) | 26/04/2026 | Clarification scope Three Amigos |

**Decisions à confirmer en début de Sprint Planning S20** :
- D32 (candidate) : ouvrir epic **E25 "Conversion instrumentation"** ou rattacher US-S20-5/6 à E22 SEO ?
- Source ROI Forrester confirmée pour US-S20-7 (Forrester TEI 2024 recommandé)

---

*Refinement produit le 26/04/2026 — issu de la demande PO de pivoter le Sprint Goal S20 vers SEO + conversion. Audit SEO formel exécuté en pré-refinement (rapport intégré dans US-S20-1). Skills mobilisés : agile-product-owner, marketing:seo-audit, dev-architecture, qa-strategy, qa-test-design, qa-unit-integration. 11 stories Ready (17 pts engagés sur 20 capacité).*
