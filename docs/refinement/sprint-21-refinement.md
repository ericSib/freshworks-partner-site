# Refinement preparatoire — Sprint 21 "Couverture SEO Tier 2 + foundations qualite"

> **Date** : 27 avril 2026
> **Sprint vise** : Sprint 21 (debut 28/04/2026 cible — cadence 1 semaine, Manifeste P3)
> **Duree refinement** : 1 session preparatoire
> **Declencheurs** :
> - Sortie Sprint Retrospective S20 ([sprint-20-retro.md](../retro/sprint-20-retro.md)) — Trys T28-T29 (lockfile §7.2 → renumerotes), T33-T39 (retro S20)
> - Sortie refinement security-scan-2026-04-26 — US-26.2 (a11y QuizEmailGate) inbox S21
> - Decision PO 27/04 — Option B : "Couverture SEO Tier 2 + securite critique"
> - Pre-requis ouverts S19/S20 carry-over : HubSpot custom properties ESM
>
> **Skills mobilises** : `agile-product-owner` + `dev-clean-code` + `dev-git-workflow` + `qa-strategy` + `qa-test-design` + `qa-acceptance` + `qa-unit-integration` + `qa-e2e` + `qa-cicd`

---

## 0 · Pre-requis du Sprint Planning S21 (PROCESS.md §4.1, T22)

| Gate | Statut | Lien |
|---|---|---|
| Retro S20 committee dans `docs/retro/` | ✅ Done | [sprint-20-retro.md](../retro/sprint-20-retro.md) (commit 2d9731a) |
| US-26.1 (vuln HIGH residuelle de S20) traitee | ✅ Hotfix livre | commit 3f9c682 (27/04) |
| Decisions D37-D41 actees au journal CLAUDE.md | ✅ Done | commit f832748 (27/04) |
| Refinement preparatoire S21 (ce document) | ⏳ En cours | ce fichier |
| Stories candidates Ready (DoR) | ⏳ Voir §3 | a confirmer arbitrage PO |

**Conclusion** : 3/5 gates verts. Une fois ce refinement committe et arbitrage PO §6 acte → Sprint Planning S21 OK.

---

## 1 · Decisions et arbitrages

### Decision PO 27/04 — Sprint Goal Option B

> "Option B, priorite au SEO car le site est deja en prod et indexe sur Google."

**Sprint Goal candidat S21** :

> *Etendre la couverture SEO indexable de 7 a 10 routes (3 pages services Tier 2 : Migration ServiceNow + Freddy AI + Audit/Optimisation, FR+EN), durcir la qualite par hooks pre-commit (tsc + DoD SEO/meta), et boucler la conformite a11y AA sur le funnel quiz.*

### Decision PO 27/04 — US-26.1 hors-scope sprint

US-26.1 livre en hotfix immediat (D39, commit 3f9c682) → ne consomme pas de capacite S21. Le scope S21 commence avec capacite pleine (20 pts).

### Arbitrage transverse — Decomposition T37

T37 (retro S20) annoncait "3 pages services Tier 2 × FR+EN ~5 pts" non decompose. Decomposition retenue par effort i18n (le code path `[locale]/services/[slug]/page.tsx` est deja generique et reutilisable, livre par US-S20-2) :

| ID | Page service | Slug | Effort | Justification effort |
|---|---|---|---|---|
| US-S21-1 | Migration ServiceNow → Freshworks | `migration` | 2 pts | i18n FR+EN dense (volume contenu eleve : checklist 10 etapes, 8 jalons, 4 cas d'echec ServiceNow) + section "garanties zero perte donnees" sensible |
| US-S21-2 | Freddy AI (Copilot + Agent + Insights) | `freddy-ai` | 2 pts | Sujet AI sensible (claims chiffres BCG/Salesforce/Forrester a citer precisement) + mapping use cases ITSM/CX/ESM |
| US-S21-3 | Audit/Optimisation (Health Check) | `audit-optimisation` | 1 pt | Pattern simple : audit deliverable + rapport + roadmap. Contenu plus generique. |

**Note T1-v2 (verification etat reel)** : `VALID_SLUGS = ["freshservice", "freshdesk"]` actuel a `src/app/[locale]/services/[slug]/page.tsx:23`. Aucun des 3 slugs cibles S21 n'existe dans le code. Prix `SERVICE_PRICE_FROM` actuel = `freshservice: 5000, freshdesk: 4000` — necessite extension.

### Arbitrage transverse — Marge S21 + audit findings buffer (T35)

Sprint Goal Option B engage ~10 pts (cf. §5). Capacite ~20 pts. **Marge ~10 pts** disponible. Application de **T35** (formalise dans ce sprint via T29 — voir process trys §4) :

- 5-15% buffer audit findings = 1-3 pts reserves pour follow-ups post-deploy detectes par audit J+30 (T37 trys retro S20)
- Reste ~7 pts = opportunites quality work (T33 + T36 + US-23.1 + US-23.2 + T20 + T26)

**Decision PO requise §6** : quels Should/Could embarquer dans la marge ?

---

## 2 · Strategie de test et risques qualite

### Strategie pyramide pour le sprint

| Niveau | Cible S21 | Outils | Source |
|---|---|---|---|
| **Unit** | Pas de nouveau lib code (les pages services sont contenu pur). T29 ajoute `tsc --noEmit` au pre-commit. T33 refactor mock localStorage en setupFile partage. | Vitest + setupFile partage | Retro D11 (mock leak) |
| **Integration** | T16 i18n parity sur +60-90 nouvelles cles (3 pages × ~25 cles × 2 langues). | T16 existing | DoD universal |
| **E2E** | 3 nouveaux specs Playwright smoke (`services/migration`, `services/freddy-ai`, `services/audit-optimisation`) en FR+EN. + axe-core systematique sur les 3 pages. | Playwright + @axe-core/playwright | Pattern S20 US-S20-2 |
| **Non-fonctionnel** | Lighthouse audit post-deploy sur les 3 nouvelles routes (Performance ≥ 90, Accessibility 100). | Lighthouse CI manuel | KPI cadrage |

### Risques cles

1. **Volume i18n** — +60-90 cles × 2 langues = +120-180 entrees. Risque : drift FR/EN ou typos non detectees. **Mitigation** : T16 parity test bloque le merge + relecture editoriale PO en navigation live (T21 pattern, executee de facto en S20).

2. **Citations sources analystes** — la page Freddy AI doit citer precisement BCG Agentic AI 2025, Salesforce State of Service 2025, Forrester. **Mitigation** : agent `Explore` sur dossier `/Reports/` au demarrage de US-S21-2 pour identifier les chiffres exacts (pattern S20 K5).

3. **T29 pre-commit `tsc --noEmit`** — risque de blocage de commits legitimes si TS strict est sur-sensible. **Mitigation** : test sur drift artificiel avant merge + flag `--incremental` (deja active).

4. **US-26.2 — i18n cle a11y** — ajout d'une cle `quiz.results.gateAriaLabel` qui doit etre traduite + test axe-core. Risque faible mais requis pour DoD WCAG 1.3.1 AA.

5. **Breaking change Next 16.2.4** — deja livre en hotfix US-26.1. 958 tests pass + build OK + tsc OK. **Risque residuel** : Vercel preview deploy (pas encore verifie, à faire post-push). Si KO → rollback via `git revert 3f9c682 + npm ci`.

### Tests prealables a ecrire AVANT implementation (TDD strict)

- US-S21-1 : E2E spec `tests/e2e/services-migration.spec.ts` (2 tests : FR + EN, smoke + axe-core)
- US-S21-2 : E2E spec `tests/e2e/services-freddy-ai.spec.ts`
- US-S21-3 : E2E spec `tests/e2e/services-audit-optimisation.spec.ts`
- T29 : test artificiel (commiter un fichier avec erreur TS, verifier que le commit est bloque)
- T28 : pas de test code (process), mais checklist DoD ajoutee dans `docs/PROCESS.md`
- US-26.2 : extension de `tests/e2e/quiz-itsm.spec.ts` avec assertion axe-core post-gate

---

## 3 · Stories raffinees

### US-S21-1 — Page service Migration ServiceNow → Freshworks (FR+EN)

**Estimation** : 2 pts · **Priorite** : Must · **DoR** : ✅ Ready

#### PO — Clarifications et valeur

- Mot-cle SEO cible : **"migration ServiceNow Freshworks"** (~30-100 vol/mois FR, intent transactionnel haut)
- Positionnement : "12+ ans de customisation ServiceNow accumulee → migrer sans casser l'operationnel"
- Sources analystes a citer : **Forrester Wave ESM Q4 2025** (Freshworks Strong Performer) + cas clients WaS si dispo
- CTA principal : "Reserver un audit migration gratuit" (Calendly)

#### Dev — Plan technique

- Fichier route : `src/app/[locale]/services/[slug]/page.tsx` — ajout `"migration"` dans `VALID_SLUGS`
- Prix : `SERVICE_PRICE_FROM["migration"] = 12_000` (a confirmer PO)
- Type service : `SERVICE_TYPE["migration"] = "Migration consulting"` (schema.org)
- i18n : ajout cles `services.migration.*` dans `src/messages/{fr,en}.json` (~25 cles × 2 langues)
- Composant `ServicePageContent.tsx` deja generique (US-S20-2) → 0 modif code
- Sitemap auto-genere via `src/app/sitemap.ts` (boucle sur VALID_SLUGS) → 0 modif code

#### QA — Plan de test

- E2E `services-migration.spec.ts` (FR + EN) : status 200 + h1 visible + breadcrumb + CTA Calendly + 0 console error
- axe-core : 0 violation critical/serious
- T16 i18n parity : passe avec +25 cles × 2 langues
- Smoke prod post-deploy : `curl https://freshworks.whataservice.fr/fr/services/migration` 200

### US-S21-2 — Page service Freddy AI (Copilot + Agent + Insights) (FR+EN)

**Estimation** : 2 pts · **Priorite** : Must · **DoR** : ✅ Ready

#### PO — Clarifications et valeur

- Mot-cle SEO cible : **"Freddy AI Freshworks consultant"** (~20-50 vol/mois FR, intent informational + transactionnel emergeant)
- Positionnement : 3 produits Freddy (Copilot agents, Agent autonome L1, Insights analytics) — usage cas par segment ITSM/CX/ESM
- Sources analystes a citer (validees S20) :
  - **BCG Agentic AI 2025** : +50% productivite, +18 pts CSAT
  - **Salesforce State of Service 2025** : ROI moyen IA support
  - **Freshservice Benchmark 2025** : 34% deflection avec Freddy Agent
- CTA : "Tester Freddy AI sur votre cas d'usage" (Calendly)

#### Dev — Plan technique

- Idem US-S21-1 : ajout `"freddy-ai"` dans `VALID_SLUGS` + prix + type
- Prix : `SERVICE_PRICE_FROM["freddy-ai"] = 8_000` (a confirmer PO)
- i18n : ~30 cles × 2 langues (volume legerement superieur car 3 produits a presenter)
- Risque specifique : claims AI sensibles → necessite citation explicite des sources (pattern S20 K5)

#### QA — Plan de test

- Idem US-S21-1 + verification que les chiffres BCG/Salesforce/Forrester citees sont presents dans `<small>` ou attribute `cite`
- E2E `services-freddy-ai.spec.ts` (FR + EN)
- axe-core : 0 violation critical/serious

### US-S21-3 — Page service Audit/Optimisation Health Check (FR+EN)

**Estimation** : 1 pt · **Priorite** : Must · **DoR** : ✅ Ready

#### PO — Clarifications et valeur

- Mot-cle SEO cible : **"audit Freshservice"** + **"optimisation Freshdesk"** (~50-150 vol/mois FR, intent decision-making)
- Positionnement : Health Check 2 semaines, livrable rapport + roadmap actionnable
- Sources : Freshservice Benchmark 2025 (criteres comparatifs)
- CTA : "Lancer un Health Check (devis 24h)" (Calendly + form contact)

#### Dev — Plan technique

- Idem US-S21-1/2 mais volume contenu plus reduit (~20 cles × 2 langues)
- Prix : `SERVICE_PRICE_FROM["audit-optimisation"] = 6_000` (a confirmer PO)

#### QA — Plan de test

- Idem (E2E + axe-core + T16)

### US-26.2 — aria-label QuizEmailGate (WCAG 1.3.1 AA)

**Estimation** : 1 pt · **Priorite** : Should · **DoR** : ✅ Ready (deja redigee dans `docs/stories-ready/US-26.2.md`)

#### Confirmation Three Amigos

- **PO** : valide la formulation "Saisissez votre email professionnel" (FR) / "Enter your work email" (EN)
- **Dev** : 3 fichiers (composant + 2 i18n) — scope chirurgical
- **QA** : extension de `quiz-itsm.spec.ts` avec axe-core post-gate

### T28 — DoD enrichie SEO/meta (process)

**Estimation** : 0.5 pt → arrondi a **1 pt** · **Priorite** : Must · **DoR** : ✅ Ready

#### PO — Valeur

Eviter une regression D40 future : toute story qui modifie un texte SEO/meta DOIT lister les tests E2E qui asserent dessus.

#### Dev — Plan technique

- Edit `docs/PROCESS.md` §7.2 (DoD) : ajouter checklist conditionnelle "si la story modifie titre/meta/h1/og-title → lister les tests E2E qui asserent dessus dans la PR description"
- Edit `_TEMPLATE.md` story : ajouter section "Tests E2E qui asserent les meta/title impactes"

#### QA — Plan de test

- Process pure, pas de test code. Verification : la prochaine story SEO (US-S21-1) applique la nouvelle DoD.

### T29 — Pre-commit `tsc --noEmit` au husky hook

**Estimation** : 1 pt · **Priorite** : Must · **DoR** : ✅ Ready

#### PO — Valeur

D41 acte : bloquer le drift TS au commit, pas en CI. Eviter la regression cascade que la session 26-27/04 a vecue 3 fois.

#### Dev — Plan technique

- Edit `.husky/pre-commit` : ajouter `npx tsc --noEmit` apres `next lint --quiet`
- Verifier `tsconfig.json` : `incremental: true` (deja active)
- Test artificiel : creer un fichier avec erreur TS (ex: `let x: number = "string"`), tenter `git commit`, verifier que le commit est bloque, supprimer le fichier de test

#### QA — Plan de test

- Test manuel sur drift artificiel
- Mesure cout : `time git commit ...` avant et apres (objectif < +15s sur le projet S20 actuel)

### T33 — Refactor mock localStorage en setupFile partage

**Estimation** : 1 pt · **Priorite** : Should · **DoR** : ✅ Ready (sortie retro S20)

#### Dev — Plan technique

- Creer `vitest.setup.ts` (ou etendre l'existant)
- Extraire le mock localStorage de `src/lib/__tests__/analytics.test.ts:35`
- Reset automatique en `beforeEach` (`vi.clearAllMocks()` doit pouvoir s'executer sans casser le mock)
- Verifier 0 regression sur les tests analytics + cookie banner + tous consommateurs localStorage

### T34 — "Sprint Goal 100% ?" gate explicit Review (PROCESS.md §4.3)

**Estimation** : 0 pt · **Priorite** : Should · **DoR** : ✅ Ready

#### Dev — Plan technique

- Edit `docs/PROCESS.md` §4.3 : ajouter en gate prealable de la Sprint Review : "verifier explicitement 'tous les outcomes du Sprint Goal sont livres en prod ?' (pas juste les pts). Si NON → continuer le sprint, pas Review prematuree"

### T35 — Audit findings buffer 5-15% (PROCESS.md §4.1)

**Estimation** : 0 pt · **Priorite** : Should · **DoR** : ✅ Ready

#### Dev — Plan technique

- Edit `docs/PROCESS.md` §4.1 : "si Sprint Planning N+1 commence par un audit formel (D30), reserver explicitement 1-3 pts de buffer dans la capacite pour les follow-ups que l'audit revelera post-deploy"
- Application de facto S21 : pas d'audit formel pre-Sprint Planning S21 (pas un sprint SEO majeur), donc buffer libre

### T36 — Calibrage capacite Claude Code (story pts ↔ heures-session)

**Estimation** : 1 pt · **Priorite** : Should · **DoR** : ✅ Ready

#### Dev — Plan technique

- Analyse retro-fit S20 : pour chaque story livree S20, estimer "combien de jours-PO en cadence WaS habituelle vs heures-Claude en session"
- Documenter ratio dans `CLAUDE.md` ou `docs/PROCESS.md`
- Output : tableau de conversion + heuristique "1 pt Claude = X minutes-session"

### T39 — Test live navigation incognito (PROCESS.md §4.3)

**Estimation** : 0 pt · **Priorite** : Should · **DoR** : ✅ Ready

#### Dev — Plan technique

- Edit `docs/PROCESS.md` §4.3 : "avant de cloturer la Sprint Review, le PO valide en navigation incognito sur le site reel les principaux parcours (homepage, formulaire contact, quiz, cookie banner, pages services). Bug detecte = story bug fix immediate avant cloture"

---

## 4 · Setup transverse

| Tache | Effort | Owner | Trigger |
|---|---|---|---|
| Confirmer prix `SERVICE_PRICE_FROM` pour 3 nouveaux slugs | 5 min | PO | Avant US-S21-1 |
| Confirmer libelles a11y FR/EN US-26.2 | 5 min | PO | Avant US-26.2 |
| Lancer agent Explore sur `/Downloads/Reports/` pour Freddy AI | 10 min | Claude | Au demarrage US-S21-2 |
| Telecharger / verifier Forrester Wave ESM Q4 2025 PDF | a faire | PO | Avant US-S21-1 |

---

## 5 · Capacite et plan d'enchainement

### Capacite engagee (cible 10 pts, marge ~10 pts pour quality work + buffer)

| Ordre | ID | Titre | Pts | Priorite |
|---|---|---|---|---|
| 1 | T29 | Pre-commit `tsc --noEmit` (foundation D41) | 1 | Must |
| 2 | T28 | DoD enrichie SEO/meta (foundation D40) | 1 | Must |
| 3 | T34 | "Sprint Goal 100% ?" gate Review | 0 | Must |
| 4 | T35 | Audit findings buffer 5-15% | 0 | Must |
| 5 | T39 | Test live incognito Sprint Review | 0 | Must |
| 6 | US-S21-3 | Page service Audit/Optimisation (warm-up pattern) | 1 | Must |
| 7 | US-S21-1 | Page service Migration ServiceNow | 2 | Must |
| 8 | US-S21-2 | Page service Freddy AI | 2 | Must |
| 9 | US-26.2 | aria-label QuizEmailGate (WCAG 1.3.1 AA) | 1 | Should |
| **Total engage** | | | **8 pts** (avec process 0 pt) | |

### Marge candidates (~10-12 pts a arbitrer §6)

| ID | Titre | Pts | Recommandation |
|---|---|---|---|
| T33 | Refactor mock localStorage setupFile | 1 | ✅ Recommande (clean win retro D11) |
| T36 | Calibrage capacite Claude Code | 1 | 🟡 Optionnel (peut etre fait en S22 si capacite serree) |
| US-23.1 | Decompose `generate-pdf.ts` | 2 | 🟡 Refacto lourd, valeur indirecte |
| US-23.2 | Extract MobileMenu + useFocusTrap | 3 | 🟡 Refacto lourd, valeur a11y indirecte |
| T20 | vitest-axe sur composants quiz | 2 | 🟡 a11y unit, axe-core E2E suffit court terme |
| T26 | checkResend `/emails` health check | 1 | 🔴 Cosmetique, pas urgent |

**Recommandation Three Amigos** : engager T33 (1 pt) en plus → total 9 pts engages. Reste ~11 pts marge libre pour audit findings + opportunites emergentes (pattern S20 = sain).

### Plan d'enchainement propose

**Bloc 1 — Foundations process (1 demi-session)** : T29 + T28 + T34 + T35 + T39 (3 pts effectifs)
- Ces 5 stories sont des edits docs + un hook husky. Elles posent les guard-rails pour tout le reste du sprint.

**Bloc 2 — Pages services Tier 2 (2-3 demi-sessions)** : US-S21-3 → US-S21-1 → US-S21-2 (5 pts)
- Ordre choisi : du + simple (audit-optim) au + complexe (freddy-ai). Permet de roder le pattern et finir sur la page la plus visible.

**Bloc 3 — A11y + quality (1 demi-session)** : US-26.2 + T33 (2 pts)
- Stories isolees, livrables independamment.

**Bloc 4 — Cloture** : Sprint Review + Retro S21

---

## 6 · Decisions PO requises (avant Sprint Planning S21)

### Q1 — Marge engagee

> Doit-on engager T33 (1 pt) en plus des 8 pts du Bloc 1+2+3, pour un total de 9 pts ? Ou rester strict a 8 pts pour preserver la marge audit ?

**Recommandation** : engager T33 (clean win post-retro D11, scope chirurgical 1 pt).

### Q2 — Prix `SERVICE_PRICE_FROM` pour 3 nouveaux slugs

> Confirmer / ajuster :
> - `migration` : 12 000 € (mission lourde, due diligence + migration)
> - `freddy-ai` : 8 000 € (config + integration + training)
> - `audit-optimisation` : 6 000 € (Health Check 2 semaines)

### Q3 — Libelles a11y US-26.2

> Confirmer :
> - FR : "Saisissez votre email professionnel"
> - EN : "Enter your work email"

### Q4 — Pre-requis HubSpot ESM

> Le pre-requis "HubSpot custom properties ESM" (carry-over depuis S19, toujours ouvert) doit-il etre adresse en S21 ou rester en backlog jusqu'a un prospect ESM concret ?

**Recommandation** : rester en backlog (pas de prospect ESM imminent, evite de complexifier S21).

### Q5 — Sprint Goal final

> Validation du Sprint Goal : *"Etendre la couverture SEO indexable de 7 a 10 routes (3 pages services Tier 2 : Migration ServiceNow + Freddy AI + Audit/Optimisation, FR+EN), durcir la qualite par hooks pre-commit (tsc + DoD SEO/meta), et boucler la conformite a11y AA sur le funnel quiz."*

---

## 7 · Quality gates (rappel universel)

- [ ] `npm run build` passe — 0 erreur
- [ ] `npm run lint` — 0 erreur
- [ ] `npx tsc --noEmit` — 0 erreur (T29 acquis post-merge)
- [ ] `npm run test` — 958+ pass
- [ ] `npm run test:coverage` — ≥ 80%
- [ ] `npx playwright test` — 55+ pass (3 nouveaux specs services + 1 extension quiz)
- [ ] `npm audit` — 0 HIGH (baseline post US-26.1)
- [ ] axe-core — 0 violation critical/serious sur 3 nouvelles pages services + page quiz post-gate
- [ ] T16 i18n parity FR/EN — passe avec +60-90 cles × 2 langues
- [ ] Lighthouse — ≥ 90 sur 4 categories pour 3 nouvelles routes services
- [ ] Smoke prod post-deploy — 6 routes (3 × 2 langues) status 200

---

## 8 · Red flags detectes

### RF1 — Vercel preview US-26.1 non verifie

Le hotfix US-26.1 (next 16.2.4) est livre en commit local. **Vercel preview deploy n'a pas encore ete verifie**. Risque : si le upgrade Next casse quelque chose en runtime preview, le sprint S21 demarre sur une regression cachee.

**Mitigation** : verifier Vercel preview AVANT le Sprint Planning S21. Si KO → rollback `git revert 3f9c682 + npm ci`.

### RF2 — postcss MOD residuelle

next 16.2.4 pin postcss 8.4.31 exact (vulnerable XSS). Pas de fix patch dans next 16.x sans bump majeur. **Action** : monitor changelog Next 17 (eta ?) ou attendre patch upstream Vercel. Pas urgent (XSS via `</style>` requiert un attaquant qui peut injecter du CSS — non applicable au site WaS qui ne prend pas de CSS user).

### RF3 — Ecart velocite S20 (19 pts en 1 session) non resorbe

Sans T36 livre, le PO peut continuer a sur-engager ou sous-engager les sprints futurs. **Action** : T36 recommande en marge S21 (1 pt).

### RF4 — Pre-requis HubSpot ESM = blocage 1er prospect ESM reel

Si un prospect ESM contacte WaS au cours du sprint, le SMI ESM ne peut pas pousser les scores HubSpot. **Action** : pas de mitigation S21 (Q4 PO), accepte comme risque metier.

---

## 9 · Sortie de la session (stories Ready)

### Stories qui passent Ready (9)

- US-S21-1 (Migration ServiceNow) — 2 pts
- US-S21-2 (Freddy AI) — 2 pts
- US-S21-3 (Audit/Optimisation) — 1 pt
- T28 (DoD SEO/meta) — 1 pt
- T29 (pre-commit tsc) — 1 pt
- T33 (mock localStorage setupFile) — 1 pt — **conditionnel Q1**
- T34 (Sprint Goal gate Review) — 0 pt
- T35 (audit findings buffer) — 0 pt
- T39 (test live incognito) — 0 pt
- US-26.2 (aria-label QuizEmailGate) — 1 pt — deja Ready

### Stories qui restent en Inbox S22+

- US-23.1 (decompose generate-pdf.ts) — 2 pts
- US-23.2 (extract MobileMenu) — 3 pts
- T20 (vitest-axe quiz) — 2 pts
- T26 (checkResend `/emails`) — 1 pt
- T36 (calibrage capacite) — 1 pt — **conditionnel marge S21**
- T37 — DECOMPOSE en US-S21-1/2/3, ne reste plus comme entry inbox
- T38 (4 articles blog Ghost spike) — backlog S22+

---

## 10 · Update backlog (acte refinement, post-arbitrage PO §6)

### Sprint 21 — `docs/backlog/sprint-current.md`

A creer une fois Q1-Q5 §6 arbitrees. Template : reprend le format S20 avec sections par phase + verification T1-v2 + Sprint Goal + table stories engagees.

### Stories Ready — `docs/stories-ready/`

A creer 6 nouvelles fiches stories :
- US-S21-1.md (Migration ServiceNow)
- US-S21-2.md (Freddy AI)
- US-S21-3.md (Audit/Optimisation)
- T28.md (DoD SEO/meta)
- T29.md (pre-commit tsc)
- T33.md (mock localStorage setupFile)

Note : T34/T35/T39 = process pure (edits PROCESS.md), pas de fiche story dedicacee. US-26.2 deja Ready dans `docs/stories-ready/US-26.2.md`.

### Memory `MEMORY.md`

Ajouter : "Sprint 21 demarre avec capacite 9 pts engages (T29+T28+US-S21-1/2/3+T33+US-26.2) + marge ~11 pts." (a faire en cloture refinement post-arbitrage).

---

*Refinement preparatoire S21 ouvert 27/04/2026. Boucle universelle : Evenement (cloture S20 + decision PO Option B + securite scan + retro trys T28-T29 T33-T39) → Refinement Three Amigos (ce document) → Update backlog (post-arbitrage Q1-Q5 PO).*
