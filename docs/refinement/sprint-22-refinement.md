# Refinement preparatoire — Sprint 22 "SEO recovery + calibration capacité + dette E2E Tier 1"

> **Date** : 8 mai 2026
> **Sprint vise** : Sprint 22 (debut 08/05/2026 — cadence 1 semaine, Manifeste P3)
> **Duree refinement** : 1 session preparatoire Three Amigos
> **Declencheurs** :
> - Decouverte PO 08/05 — rapport export GSC `Coverage-2026-05-08.xlsx` revele desindexation totale (7 pages indexees le 02/05 → 0 le 03/05, 12 pages "non indexees" stable depuis 5 jours)
> - Trys retro S21 (T40-T48) — dont T48 absorbe par hotfix
> - Carry-over S20→S21→S22 obligatoire : T42 calibration capacite Claude Code
> - Cloture Sprint 21 (28-29/04/2026) — 4/4 outcomes en prod, mais SEO ineficace
>
> **Skills mobilises** : `dev-architecture` + `dev-clean-code` + `qa-strategy` (Three Amigos triade) + `agile-product-owner` + `dev-git-workflow` + `qa-test-design` + `qa-acceptance` + `qa-e2e` + `qa-cicd`

---

## 0 · Pre-requis du Sprint Planning S22 (PROCESS.md §4.1, T22)

| Gate | Statut | Lien |
|---|---|---|
| Retro S21 committee dans `docs/retro/` | ✅ Done | [sprint-21-retro.md](../retro/sprint-21-retro.md) |
| Sprint 21 cloture en prod | ✅ Done | [sprint-21.md](../demo/sprint-21.md) |
| Refinement preparatoire S22 (ce document) | ⏳ En cours | ce fichier |
| Stories candidates Ready (DoR) | ⏳ Voir §3 | a confirmer arbitrage PO |
| Audit findings buffer (T35) applique | ✅ N/A | sprint NON declenche par audit, declenche par incident SEO |

**Conclusion** : 3/4 gates verts. Une fois ce refinement committe + arbitrage PO §6 acte → Sprint Planning S22 OK.

---

## 1 · Decisions et arbitrages

### Decision PO 08/05 — Sprint Goal

> "Intègre au sprint planning et démarre le sprint. Pour l'approche, résolvons le problème en incluant les QA et les dev."

**Sprint Goal candidat S22** :

> *Restaurer l'indexation Google (≥7 routes en index a J+14) via correction headers cache-control + canonical, calibrer la capacite Claude Code (T42 obligatoire depuis S20), et combler la dette E2E sur les pages services Tier 1.*

### Decision PO 08/05 — Approche Three Amigos

PO a explicitement demande l'invocation des skills `/dev-architecture`, `/dev-clean-code`, `/qa-strategy` pour la conception du fix. Ce refinement materialise les 3 chapeaux (architect/dev/QA) dans la spec ci-dessous (§3 HOTFIX-S22.0a-c).

### Arbitrage transverse — Promotion du bug T48 en hotfix sprint-anchor

T48 (Try retro S21, 1 pt) etait : "Investiguer header `cache-control: private, no-cache, no-store` sur pages services + runbook GSC". Le rapport GSC du 08/05 confirme l'impact business (desindexation totale 7 → 0). **T48 est promu story P0 = HOTFIX-S22.0a/b/c** et devient le pilier S22.

### Arbitrage transverse — Capacite et sous-engagement intentionnel

Pattern S19+S20+S21 = velocite atypique (1 session intensive vs cadence Manifeste 1 semaine). **T42 reporte de S20 puis S21 = OBLIGATOIRE Bloc 1 S22**. L'engagement est volontairement reduit (~8 pts vs 20 pts capacite) pour :
- Absorber l'incertitude post-incident SEO (re-investigation possible si fix insuffisant a J+7)
- Liberer du temps pour T42 calibration meta-process
- Conserver la marge buffer T35 (audit findings post-deploy J+7/J+14)

---

## 2 · Three Amigos — analyse architecturale + clean code + QA

### 🏗️ Hat 1 — Architect (`dev-architecture`)

**Question** : ou loge le fix cache-control dans la stack actuelle ?

**Stack actuel** : Layered Architecture (default Claude Code per skill `dev-architecture`).

```
next.config.ts          → Config layer (cross-cutting HTTP concerns)
src/proxy.ts            → Middleware layer (locale routing — single concern)
src/app/[locale]/...    → Route handlers (presentation)
src/components/...      → View components
src/lib/...             → Service layer
src/config/...          → Domain config (site, navigation, offers...)
```

**Decision architecturale** : `next.config.ts headers()` — voir matrice :

| Option | Pour | Contre | Verdict |
|---|---|---|---|
| **A. `next.config.ts headers()`** | Declaratif, scope URL pattern, OCP (extension du `securityHeaders` sans modif), DIP (depend abstraction Next.js) | — | ✅ RETENU |
| B. `src/proxy.ts` middleware | Programmatique | Viole SRP (locale routing + cache concerns), couplage fort, complexifie tests | ❌ |
| C. Vercel `vercel.json` | Specifique plateforme | Casse portabilite, divergence stack | ❌ |

**Regle de dependance respectee** : `next.config.ts` n'importe rien du domaine, uniquement types Next.js (`NextConfig`).

### 🧹 Hat 2 — Clean Code (`dev-clean-code`)

| Principe | Application au fix | Mitigation risque |
|---|---|---|
| **SRP** | Separer constante `INDEXABLE_CACHE_CONTROL` du tableau `securityHeaders` existant — 2 responsabilites distinctes | Toute regression security-headers reste isolee |
| **DRY** | Definir `S_MAXAGE_INDEXABLE_SECONDS` + `STALE_WHILE_REVALIDATE_SECONDS` comme constantes nommees, pas de magic numbers | Reutilisable si futur middleware ou Edge config |
| **KISS** | 1 regex source pattern `/(:locale(fr\|en))/(:path*)` couvrant 10 routes vs 10 regles individuelles | Maintenance triviale |
| **YAGNI** | Pas de strategie cache-per-route premature (sitemap.xml = next.js statique built-time, robots.txt idem) | Code minimal |
| **Naming** | UPPER_SNAKE_CASE constants, kebab-case fichier (existant `next.config.ts`) | Conformite skill `dev-clean-code` |
| **No magic numbers** | `86_400` → `S_MAXAGE_INDEXABLE_SECONDS` avec comment `// 1 jour — Googlebot re-crawl quotidien` | Lisibilite futur reader |
| **No `any`** | Types Next.js stricts (`NextConfig`, `MetadataRoute`) | TS strict deja active |

### 🧪 Hat 3 — QA Strategy (`qa-strategy`)

#### Phase 1 — Analyse risque HOTFIX-S22.0a

| Dimension | Evaluation | Justification |
|---|---|---|
| Impact defaillance | **CRITIQUE** | KPI conversion cadrage = 0 si Google n'indexe pas. Lead organique nul. |
| Probabilite defaut | **ELEVEE** | Modification headers = surface CSP/securite fragile. Cache mal configure = serveur stale ou pas de cache du tout |
| Complexite technique | **MOYENNE** | Next.js headers() + middleware behavior + Vercel CDN edge = 3 surfaces independantes |
| Frequence changement | **FAIBLE** post-fix | Config immuable une fois validee |

**Risk score global** = CRITIQUE × ELEVEE = **TOP PRIORITY** → impose TDD strict + non-regression exhaustive sur 3 surfaces (cache + securite + sitemap).

#### Phase 2 — Modele test : Trophee (qa-strategy)

Ce projet est une SPA frontend (Next.js App Router + React 19) → modele Trophee :

```
15% Static (TS strict + ESLint) ─── deja en place
25% Unit (Vitest)               ─── 960 tests
40% Integration (RTL + i18n)    ─── 220 tests
20% E2E (Playwright)            ─── 78 tests
```

**HOTFIX-S22.0a** : pas de logique pure → **0 unit test** ; pose un contrat HTTP → **2 nouveaux E2E specs**.

#### Phase 3 — Test plan HOTFIX-S22.0a

```
1. CONTEXTE
   - Goal : 10 routes sitemap servent cache-control public (vs private actuel)
   - Stack : Next 16.2.4 + middleware next-intl 4.9.1 + Vercel CDN
   - Environnements : dev local + Vercel Preview + Production
2. APPROCHE
   - TDD strict (test rouge AVANT modif next.config.ts)
   - Trophee (E2E focused) — pas d'unit pour config declarative
3. CRITERES ENTREE
   - DoR Ready (§3 ci-dessous)
   - Refinement S22 committe
   - 960 tests S21 baseline pass
4. CRITERES SORTIE (DoD)
   - [ ] Test E2E nouveau `seo-cache-headers.spec.ts` vert (10 URLs × cache-control public)
   - [ ] Test E2E `seo-sitemap-hreflang.spec.ts` (T40 S21) reste vert
   - [ ] Test E2E `security-headers.spec.ts` reste vert (CSP intact)
   - [ ] 960 vitest reste pass
   - [ ] Build + lint + tsc OK
   - [ ] Pre-commit hook tsc passe
   - [ ] Push prod + curl validation 10 URLs (cache-control: public verifie en prod)
   - [ ] Action PO post-merge : sitemap re-soumis GSC + Inspection URL "Demander indexation" sur 10 routes
   - [ ] Monitoring J+3 / J+7 / J+14 documenté dans runbook
5. RISQUES (matrice §2)
   - R1 cache trop agressive → s-maxage=86400 (1 jour, pas plus) + stale-while-revalidate
   - R2 regression CSP → tests E2E security-headers
   - R3 cache-control non-cause racine → observation J+7 + runbook fallback
   - R4 bug canonical (1 page) → HOTFIX-S22.0b separe, depend Q2 PO
6. OUTILS
   - Playwright (E2E) + Vitest (unit/integration carry-over)
   - Pre-commit husky : lint-staged + tsc --noEmit (T29 acquis S21)
   - GSC monitoring (action PO manuel)
7. REPORTING
   - Sprint Review S22 demo : screenshot GSC J+7 + curl headers
   - Sprint Retrospective S22 : Keep/Drop/Try sur l'efficacite du fix
```

#### Tests prealables a ecrire AVANT implementation (TDD strict)

| Story | Test prealable | Type | Outil |
|---|---|---|---|
| HOTFIX-S22.0a | `tests/e2e/seo-cache-headers.spec.ts` (rouge) — assert `cache-control` ne contient PAS `no-store` sur 10 URLs | E2E contract | Playwright |
| HOTFIX-S22.0b | (depend Q2) — test canonical equality `<link rel="canonical">` vs URL servie | E2E DOM | Playwright |
| HOTFIX-S22.0c | Pas de test code (process), runbook + monitoring trace | — | Markdown |
| T42 | Pas de test code (meta-process), output = section CLAUDE.md sur calibration | — | Markdown |
| T41 | Test unit `sitemap.test.ts` deja existant (S21 098fd7a) — adapter pour assert loop sur VALID_SLUGS | Unit refactor | Vitest |
| T43 | Specs E2E `services-freshservice.spec.ts` + `services-freshdesk.spec.ts` (dette S20) | E2E smoke + axe | Playwright |
| T47 | Runbook hotfix-procedure.md (process) | — | Markdown |

---

## 3 · Stories raffinees

### HOTFIX-S22.0a — Cache-control public sur routes indexables

**Estimation** : 1.5 pts · **Priorite** : **P0 Must** · **DoR** : ✅ Ready

#### PO — Clarifications et valeur

- KPI cible : **≥ 7 pages dans l'index Google a J+14** (vs 0 actuel, vs 7 pic 02/05)
- Action PO post-merge : re-soumettre sitemap dans GSC > Sitemaps + Inspection URL "Demander indexation" sur 10 routes
- Source verite incident : `Coverage-2026-05-08.xlsx` annexe au refinement

#### Architect (`dev-architecture`)

- **Lieu** : `next.config.ts`, fonction `headers()` deja existante
- **Pattern** : ajouter une 2eme entree dans le tableau retourne, source `/(fr|en)/:path*`
- **Regle dependance** : aucune nouvelle import depuis le domaine ; types Next.js uniquement

#### Dev (`dev-clean-code`) — Plan technique

```typescript
// AJOUTER en tete de next.config.ts (avant securityHeaders) :
const S_MAXAGE_INDEXABLE_SECONDS = 86_400; // 1 jour — Googlebot re-crawl quotidien
const STALE_WHILE_REVALIDATE_SECONDS = 604_800; // 7 jours — tolerance CDN

const indexableCacheHeaders = [
  {
    key: "Cache-Control",
    value: `public, s-maxage=${S_MAXAGE_INDEXABLE_SECONDS}, stale-while-revalidate=${STALE_WHILE_REVALIDATE_SECONDS}`,
  },
];

// ETENDRE async headers() :
async headers() {
  return [
    { source: "/(.*)", headers: securityHeaders },
    { source: "/:locale(fr|en)/:path*", headers: indexableCacheHeaders },
    { source: "/:locale(fr|en)", headers: indexableCacheHeaders }, // home FR/EN
  ];
}
```

**Aucune modif a `src/proxy.ts`** (SRP preserve : middleware = locale routing only).

#### QA (`qa-strategy`) — Acceptance Criteria

- **AC1** (cache-control public) : `curl -I https://freshworks.whataservice.fr/fr/services/freshservice` retourne `cache-control: public, s-maxage=86400, stale-while-revalidate=604800` (sans `private`, sans `no-store`)
- **AC2** (10 routes) : meme assertion sur les 10 routes du sitemap (FR + EN, services × 5 + home + quiz + maturite × 2 + legal)
- **AC3** (sitemap) : `curl -I /sitemap.xml` reste cachable (verifie public ou immutable)
- **AC4** (CSP non-regression) : tous les security headers existants (`X-Frame-Options`, `CSP`, `HSTS`, etc.) restent presents et inchanges
- **AC5** (test E2E nouveau) : `tests/e2e/seo-cache-headers.spec.ts` ajoute, 10 URLs verifiees programmatiquement
- **AC6** (non-regression E2E) : `seo-sitemap-hreflang.spec.ts` + `security-headers.spec.ts` (si existe) restent verts
- **AC7** (vitest) : 960 tests reste pass
- **AC8** (build) : `npm run build` + `npm run lint` + `tsc --noEmit` OK
- **AC9** (pre-commit) : commit franchit le hook tsc sans drift
- **AC10** (action PO post-merge) : runbook `seo-indexation-checklist.md` documente la procedure GSC manuelle

**DoD globale** : voir `docs/PROCESS.md` §7.2 (T28 acquis S21) — pour story SEO/meta, lister tests E2E qui asserent dessus dans la PR description ✅ (AC5 + AC6 = ce critere).

#### Red flags / risques

- 🟡 **R1** : si Google ne re-index pas a J+7 malgre fix, hypothese cache-control invalidee → ouvrir incident `docs/refinement/incident-2026-05-15-seo-bis.md` et investiguer (sitemap/canonical/robots/qualite contenu)
- 🟡 **R2** : Vercel CDN cache trop agressive → setup `s-maxage=86400` permet purge automatique 24h, monitoring impressions GSC J+3
- 🟢 **R3** : CSP regression detectable par tests E2E security-headers (si existant) — sinon ajouter

---

### HOTFIX-S22.0b — Fix canonical "Page en double" (depend Q2 PO)

**Estimation** : 1 pt · **Priorite** : P1 Should · **DoR** : ⏳ Bloque sur Q2

**Bloqueur** : URL exacte de la page "Page en double : URL canonique differente" inconnue. PO doit recuperer dans GSC > Couverture.

**Si Q2 fournit URL** : analyser `<link rel="canonical">` de la page concernee vs URL servie vs hreflang. Probablement une divergence FR/EN ou avec/sans `/` final.

**Si Q2 reste ouvert** : story reportee S23.

---

### HOTFIX-S22.0c — Runbook seo-indexation-checklist + monitoring

**Estimation** : 0.5 pt · **Priorite** : P0 Must · **DoR** : ✅ Ready

**Livrable** : `docs/runbooks/seo-indexation-checklist.md`

Sections requises :
1. Procedure post-deploy : re-soumission sitemap GSC + Demander indexation URL
2. Monitoring J+3 / J+7 / J+14 (criteres : nb pages indexees, nb impressions)
3. Decision tree : si J+7 < seuil, escalade (ouvrir refinement incident)
4. Pre-flight checklist avant deploy SEO (cache-control + canonical + sitemap + robots)
5. Annexe : symptomes connus (private cache-control, canonical mismatch, etc.)

Absorbe **T48** (Try retro S21, 1 pt). Effort reduit a 0.5 pt car la moitie est deja documentee dans CLAUDE.md.

---

### T42 — Calibration capacite Claude Code (story points ↔ heures-session)

**Estimation** : 1 pt · **Priorite** : **P0 Must — bloque depuis S20** · **DoR** : ✅ Ready

**Bloqueur recurrent** : pattern S19+S20+S21 = velocite atypique (sprint compresse 1 session vs cadence Manifeste 1 semaine). T36 → T42 reporte 2 fois.

**Livrable** : section ajoutee dans `CLAUDE.md` ou `docs/PROCESS.md` :
- Definition operationnelle d'un story point pour Claude Code
- Heuristique "1 pt = X heures de session humaine + Y minutes Claude"
- Calibration retroactive sur S19+S20+S21 (donnees reelles)
- Recommandation capacite-cible pour S22+

---

### T41 — Refactor sitemap.ts loop sur VALID_SLUGS (single source of truth)

**Estimation** : 1 pt · **Priorite** : Must · **DoR** : ✅ Ready

**Probleme** : `sitemap.ts` listing manuel des routes services — recurrence du bug detecte audit T35 fin S21 (3 routes Tier 2 oubliees, fix 098fd7a). Si T46 (Tier 3) ajoute 3 nouveaux services, risque elevee de re-oublier.

**Livrable** :
- Refactor `sitemap.ts` pour boucler sur `VALID_SLUGS` import depuis `src/app/[locale]/services/[slug]/page.tsx`
- Source unique de verite : ajouter un slug dans VALID_SLUGS = automatiquement dans sitemap.xml
- Test unit `sitemap.test.ts` adapte pour asserter cette propriete

**Pre-requis pour T46 (Tier 3)** : ce refacto livre la fondation.

---

### T43 — Specs E2E retroactives services Tier 1 (dette S20)

**Estimation** : 1 pt · **Priorite** : Should · **DoR** : ✅ Ready

**Probleme** : Sprint 20 a livre `services/freshservice` + `services/freshdesk` sans specs E2E (vs Sprint 21 qui a livre specs E2E pour Tier 2 — pattern correct). Dette technique residuelle.

**Livrable** :
- `tests/e2e/services-freshservice.spec.ts` (FR + EN, smoke + axe-core)
- `tests/e2e/services-freshdesk.spec.ts` (FR + EN, smoke + axe-core)
- Pattern identique aux specs Tier 2 livres S21 (US-S21-1/2/3)

---

### T47 — Runbook hotfix-procedure.md

**Estimation** : 1 pt · **Priorite** : Should · **DoR** : ✅ Ready

**Livrable** : `docs/runbooks/hotfix-procedure.md` documentant le process hotfix d'apres pattern US-26.1 (vuln Next.js HIGH, S21 sortie de cycle).

Sections :
- Trigger (criticite, hors-sprint vs intra-sprint)
- Procedure : refinement light → branche → TDD → push → smoke prod
- Etape obligatoire "verify Vercel preview" (manque sur US-26.1, leçon retro S21)
- Update CLAUDE.md journal arbitrages (D-XX nouveau)
- Post-mortem si necessaire

---

### T44 + T45 — Process hardening (0 pt cumule)

- T44 (0 pt) : Section "Estimation i18n basee sur volume cles" ajoutee dans `docs/PROCESS.md` §4.1 (heuristique 1 pt = ~50 cles × 2 langues)
- T45 (0 pt) : Promotion T29 (pre-commit tsc) au statut "acquis structurel" dans `CLAUDE.md` §Methode (ajout regle 18 ?)

---

## 4 · Stories reportees S23+ (acte refinement S22)

| Story | Pts | Raison report S23+ |
|---|---|---|
| US-23.1 — Decompose generate-pdf.ts | 2 | Refacto lourd, valeur indirecte (carry-over S20→S21→S22) |
| US-23.2 — Extract MobileMenu + useFocusTrap | 3 | Refacto lourd, valeur a11y indirecte (carry-over S20→S21→S22) |
| T20 — vitest-axe quiz components | 2 | E2E axe suffit court terme |
| T26 — checkResend `/emails` health | 1 | Cosmetique, non urgent |
| T46 — Pages services Tier 3 (3 pages) | 5 | Depend T41 livre + capacite dispo |
| HOTFIX-S22.0b | 1 | Si Q2 PO non resolu fin S22 |

---

## 5 · Capacite et engagement

**Capacite S22** : 20 pts (cadence 1 semaine, Manifeste P8)

**Engagement propose** :

| Bloc | Stories | Pts |
|---|---|---|
| **Bloc 1 — SEO recovery (P0 Must)** | HOTFIX-S22.0a + HOTFIX-S22.0c [+ HOTFIX-S22.0b si Q2 OK] | 2 [+1] |
| **Bloc 2 — Process & calibration (P0/P1 Must)** | T42 + T44 + T45 | 1 |
| **Bloc 3 — Quality work (Should)** | T41 + T43 + T47 | 3 |
| **Total engage** | | **6 pts (7 si HOTFIX-S22.0b)** |

**Marge** : 13-14 pts pour buffer audit findings + opportunisme S22.

**Justification sous-engagement** : pattern S19/S20/S21 valide ce pattern (S21 = 9 engages, ~13 effectifs livres). Reproduire cette discipline au lieu de surengager.

---

## 6 · Arbitrages PO requis avant Sprint Planning S22

| Question | Reponse PO 08/05 (implicite via demande "demarre le sprint") |
|---|---|
| Q1 Periemtre execution | ✅ Integration Sprint Planning S22 (vs hotfix hors-sprint US-26.1 pattern D39) |
| Q2 URL "Page en double" GSC | ⏳ **A FOURNIR PAR PO** post-Sprint Planning (n'empeche pas demarrage HOTFIX-S22.0a) |
| Q3 Action GSC manuelle post-merge | ✅ Confirme implicite (PO sait operer GSC, dej a fait pour S20/S21) |
| Q4 Engagement total accepte | ⏳ A confirmer 6 pts (vs option full 8 pts si Q2 fourni vite) |
| Q5 Sprint Goal valide | ⏳ A confirmer libelle propose §1 |

**Decision PO requise minimum** : Q4 + Q5. Sans ces 2 OK explicites, le sprint demarre uniquement sur HOTFIX-S22.0a (story autonome P0 deblocant business).

---

## 7 · Plan d'enchainement propose

| Jour | Bloc | Stories |
|---|---|---|
| **J0 (08/05 apres-midi)** | Setup | Refinement committe + sprint-current.md update |
| **J0 (08/05 apres-midi)** | **Bloc 1.0a** | TDD HOTFIX-S22.0a : test E2E rouge → fix next.config.ts → vert → push prod |
| **J1 (09/05 matin)** | Bloc 1.0c | Runbook seo-indexation-checklist.md + verification curl prod |
| **J1 (09/05 apres-midi)** | Bloc 2 | T42 calibration + T44 + T45 |
| **J2-J3** | Bloc 1.0b si Q2 | HOTFIX-S22.0b canonical fix |
| **J3-J5** | Bloc 3 | T41 sitemap loop + T43 specs E2E retro + T47 runbook hotfix |
| **J6-J7** | Buffer audit | Monitoring GSC J+3 / J+7 + ajustements |
| **J7** | Cloture | Sprint Review (demo curl + GSC) + Retrospective |

---

*Refinement S22 redige 08/05/2026 — Three Amigos triade `dev-architecture` + `dev-clean-code` + `qa-strategy` mobilisee a la demande PO. Pret pour Sprint Planning des Q4+Q5 confirmes par PO.*
