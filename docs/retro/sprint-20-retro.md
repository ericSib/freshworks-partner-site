# Sprint Retrospective — Sprint 20 "Surface SEO + funnel instrumente"

> **Date** : 26 avril 2026
> **Format** : Keep / Drop / Try
> **Sprint Goal** : Etendre la surface SEO + instrumenter le funnel — **ATTEINT EN PRODUCTION** (4 outcomes / 4, 18 pts engages livres + 1 pt bug fix imprevu = 19 pts effectifs)
> **Source Review** : [demo/sprint-20.md](../demo/sprint-20.md)

---

## KEEP

### K1 · Audit SEO formel pre-Sprint Planning (D30) → reproductible chaque sprint SEO/perf
- **Cause racine** : l'audit a livre 4 trouvailles critiques absentes des hypotheses initiales (0 GA4 call-site, OG heritee, areaServed France-only, sitemap dynamique). Sans cet audit, US-S20-2 aurait ete le seul focus du sprint, et les fondations seraient restees en dette.
- **Bilan** : 5 actions WSJF pre-priorisees → 5 / 5 livrees.
- **Action** : pattern institutionnalise (D30). A reproduire systematiquement quand un Sprint Goal cible le SEO ou la perf.

### K2 · Boucle universelle tenue meme sur les follow-ups + bug fixes
- **Cause racine** : 3 follow-ups + 1 bug RGPD imprevu integres en cours de sprint via mini-arbitrage PO en chat. T25 (formalisation ops > 30 min) applique de facto. Aucune Phase 2 silencieuse comme S19 D8.
- **Bilan** : tracabilite complete sur 20 commits, chaque story documentee dans `docs/stories-ready/` avant code (US-S20-BUG.1.md notamment).
- **Action** : continuer le pattern "ask before action" pour tous les findings post-deploy.

### K3 · TDD strict + 1 commit = 1 intention sur 20 commits
- **Cause racine** : chaque story a son test ecrit AVANT l'implementation (sitemap, schema, analytics, sender, OG template, cookie banner, ROI calibration). Commits chirurgicaux avec scope conventional + body explicatif > 5 fichiers.
- **Bilan** : 20 commits, +45 tests unitaires (913 → 958), `git log --oneline` lisible comme un diff narratif, reverter une story unitaire reste possible.
- **Action** : maintenir la regle commitlint + husky.

### K4 · Push-and-verify en boucle courte = revelation post-deploy
- **Cause racine** : chaque commit majeur suivi d'un curl prod. Pattern `poll-until-200` automatise pour OG images, schema 27 Country, balise GSC verification, 4 pages services.
- **Bilan** : 2 incoherences detectees post-deploy (areaServed des 8 Services FR-only, cookie banner fige) auraient ete invisibles 30 jours sinon.
- **Action** : le **post-deploy curl** devient un quality gate aussi important que le pre-merge build. A garder en T-list.

### K5 · Rapport analyste = mine d'or pour calibration content + ROI (US-S20-7 + US-S20-2)
- **Cause racine** : agent Explore a synthetise 6 sous-dossiers de rapports (Forrester, Gartner, BCG, McKinsey, Salesforce, Genesys). 5 rapports cles directement injectes dans le contenu :
  - TEI Freshworks 2024 → calibration `roi.ts` + content benefits Freshservice
  - Forrester Wave ESM Q4 2025 → "Strong Performer" en trust hero
  - Freshservice Benchmark 2025 → 34% deflection / 74% FCR
  - Customer Service Benchmark 2025 → < 4 min first response / < 32 min resolution
  - BCG Agentic AI 2025 → +50% productivite / +18 pts CSAT
- **Bilan** : pages services credibles avec sources citees explicitement (defense legale + SEO long-tail "consultant ITIL 4 Forrester Wave").
- **Action** : a chaque sprint contenu, exploiter explicitement les rapports analystes en source citation. Backlog blog candidate (D10 Ghost spike).

### K6 · D34-D36 process structurel (lockfile + Node + commit rule) anticipe les blocages
- **Cause racine** : PO a detecte CI rouge sur drift `@swc/helpers` next-intl transitive et ajoute 3 decisions structurelles plutot que de bricoler.
- **Bilan** : .nvmrc + force-fresh-build runbook + regle commit lockfile evitent de futurs incidents. Modele de prevention systemique.
- **Action** : maintenir ce reflexe — quand un incident CI ou ops se repete, ouvrir une decision structurelle au lieu de hotfix-en-boucle.

### K7 · Bug fix RGPD detecte par PO en visite live → fix TDD en 15 min
- **Cause racine** : PO a teste le site en navigation live (pas juste curl/build). A vu le popup non fermable. A signale immediatement.
- **Bilan** : bug critique RGPD (bloquait tout le tracking GA4 livre) detecte + fixe + livre en prod le meme apres-midi. 5 tests TDD strict pinned.
- **Action** : ajouter "test live en navigation incognito" comme etape implicit de la Sprint Review (cf. Try T34).

---

## DROP

### D11 · Mock localStorage global de `analytics.test.ts` leak entre fichiers de test
- **Cause racine** : `analytics.test.ts:35` fait `Object.defineProperty(global, "localStorage", { value: localStorageMock })`. Ce mock leak vers d'autres fichiers de test (CookieBanner.test.tsx) → `vi.clearAllMocks()` clear les `vi.fn()` du store mock → `localStorage.setItem` n'est plus une fonction → tous les tests CookieBanner ont fail au 1er run.
- **Cout** : 10 minutes de diagnostic + workaround mock localStorage local dans CookieBanner.test.tsx.
- **Action** : voir Try T33 — refactor le mock localStorage en setupFile partage (vitest.setup.ts) avec reset automatique inter-fichiers, plutot que mock global qui leak.

### D12 · Sprint Review premature ecrite + supprimee mid-sprint
- **Cause racine** : a la mi-sprint (8 / 17 pts livres), le PO a dit "passe a la review", j'ai ecrit `docs/demo/sprint-20.md` puis le PO a corrige "si pas fini, on doit le finir" → fichier supprime.
- **Cout** : 5 minutes de redaction prematuree + suppression. Confusion sur le statut du sprint.
- **Action** : voir Try T34 — verifier explicitement "Sprint Goal atteint a 100% ?" avant de demarrer la Review. Si non → continuer le sprint, pas Review premature.

### D13 · 2 follow-ups (GSC meta + areaServed unification) hors capacite initiale
- **Cause racine** : audit livre TOP 5 actions WSJF mais 2 follow-ups (GSC verification meta + areaServed unification 8 Services dynamiques) ont emerge en cours de sprint, hors estimation initiale.
- **Cout** : ~1.5 pt d'effort hors capacite engagee. Sprint en pratique a 19 pts effectifs (vs 18 engages).
- **Action** : voir Try T35 — reserver "audit findings buffer" 5-15% dans la capacite des sprints commencant par un audit (D30 pattern). S20 capacite 20 pts, engagement 18 → 2 pts buffer = OK retrospectivement, mais a formaliser.

### D14 · Velocite atypique (19 pts en quelques heures) = mesure imprecise
- **Cause racine** : 1 session intensive a livre 19 pts vs 1 semaine cadence Manifeste P8. Trois hypotheses :
  1. Capacite ~20 SP/semaine est sous-estimee pour Claude Code
  2. Mesure en story points est imprecise (sprint contenait beaucoup de quick wins 1 pt)
  3. Les 5+ pts gros morceaux (US-S20-2) sont sous-estimes a la realite Claude
- **Cout** : difficile de planifier le sprint suivant sans recalibrer. Le PO peut sur-engager si on garde 17-20 pts en reference.
- **Action** : voir Try T36 — exercice de calibration : retroactivement, combien de "vrais" jours-PO chaque story aurait pris en cadence WaS habituelle (PO seul) vs Claude Code en session ? Calibrer la conversion story point ↔ heure-Claude pour planifier mieux.

---

## TRY — entrees Sprint 21

### T33 · Refactor mock localStorage en setupFile partage (vitest.setup.ts)
- **Quoi** : extraire le mock localStorage de `src/lib/__tests__/analytics.test.ts` dans `vitest.setup.ts` global, avec reset automatique en `beforeEach`. Eviter les `Object.defineProperty(global, "localStorage", ...)` qui leak entre fichiers.
- **Pourquoi** : Drop S20 D11 — debug 10 min sur tests CookieBanner. Recurrent si on ajoute d'autres tests qui touchent localStorage.
- **Estimation** : 1 pt (refactor + verifier 0 regression sur les tests analytics + cookie + autres consommateurs).
- **Sprint cible** : S21.

### T34 · "Sprint Goal atteint a 100% ?" comme gate explicit du demarrage Review
- **Quoi** : avant de demarrer la Sprint Review, verifier "tous les outcomes du Sprint Goal sont livres en prod ?" (pas juste les pts). Si NON → continuer le sprint plutot que Review prematuree.
- **Pourquoi** : Drop S20 D12 — Review prematuree mid-sprint, fichier supprime, confusion. La metrique "pts livres" peut tromper si les pts livres ne correspondent pas aux outcomes (ex: 8/17 pts = 47% pts mais 2/4 outcomes seulement).
- **Estimation** : 0 pt (process, ajout dans PROCESS.md §4.3).
- **Sprint cible** : S21.

### T35 · Reserver "audit findings buffer" 5-15% pour les sprints commencant par un audit (D30 pattern)
- **Quoi** : si Sprint Planning N+1 commence par un audit formel (D30), reserver explicitement 1-3 pts de buffer dans la capacite pour les follow-ups que l'audit revelera post-deploy.
- **Pourquoi** : Drop S20 D13 — 2 follow-ups (GSC meta + areaServed unification) ont consomme ~1.5 pt hors capacite. Le buffer de 2 pts S20 a couvert mais n'etait pas explicite.
- **Estimation** : 0 pt (process, ajout dans PROCESS.md §4.1).
- **Sprint cible** : S21.

### T36 · Calibrage capacite Claude Code (story points ↔ heures-session)
- **Quoi** : exercice de retro-fit sur S20. Pour chaque story livree, estimer "combien de jours-PO en cadence WaS humain habituelle vs heures-Claude en session intensive". Documenter le ratio dans PROCESS.md ou CLAUDE.md.
- **Pourquoi** : Drop S20 D14 — la velocite 19 pts en 1 session decorrele les pts de la duree. Sans recalibrage, le PO peut sur-engager les sprints futurs ou au contraire sous-engager.
- **Estimation** : 1 pt (analyse retro-fit + table de conversion + mention dans CLAUDE.md).
- **Sprint cible** : S21.

### T37 · Story candidate S21 : compléter le scope SEO + content
- **Quoi** : 4 stories backlog candidates pour S21 :
  1. Pages services Tier 2 — Migration ServiceNow + Freddy AI + Audit/Optimisation (3 pages × FR+EN = 6 pages, ~5 pts)
  2. Refactoring Radar mensuel suivant (planifie mensuel D23)
  3. Re-audit SEO J+30 (D30 pattern, post GSC data) — soumettre Ahrefs/SEMrush, comparer estimations vs reel
  4. Restant inbox S20 reportes : T20 (vitest-axe quiz, 2 pts), T26 (checkResend /emails, 1 pt), US-23.1 (PDF decompose, 2 pts), US-23.2 (MobileMenu, 3 pts)
- **Estimation** : a refiner en pre-Sprint Planning S21.
- **Sprint cible** : S21.

### T38 · Backlog blog Ghost spike (D10) — 4 articles candidats issus rapports analystes
- **Quoi** : creer 4 stories backlog pour articles blog (D10 spike Ghost a deroule en S22+) :
  - "From Pilot to Scale: 5 Mistakes Preventing AI ROI" (McKinsey 2/3 still piloting)
  - "Freshservice Benchmark Deep Dive: 34% AI Deflection Reality Check"
  - "Agentic AI Transformation: BCG's Observe-Plan-Act Framework for CS Ops"
  - "Forrester ESM Wave Q4 2025: Why Freshworks Leads Mid-Market"
- **Pourquoi** : Keep S20 K5 — capitaliser sur la mine d'or rapports analystes deja synthese.
- **Estimation** : 0 pt (creation stories en backlog), execution = ~3 pts/article quand Ghost spike termine.
- **Sprint cible** : backlog S22+.

### T39 · "Test live en navigation incognito" comme etape Sprint Review
- **Quoi** : ajouter dans PROCESS.md §4.3 : "Avant de cloturer la Sprint Review, le PO valide en navigation incognito sur le site reel les principaux parcours (homepage, formulaire contact, quiz, cookie banner, pages services). Bug detecte = story bug fix immediate avant cloture."
- **Pourquoi** : Keep S20 K7 — bug RGPD critique detecte par PO en live (pas par tests automatises). Sans test live, le sprint aurait livre un site avec tracking GA4 inactif.
- **Estimation** : 0 pt (process).
- **Sprint cible** : S21.

---

## Bilan chiffre Sprint 20

| Metrique | S19 (reference) | S20 |
|---|---|---|
| Pts engages | 17 | 18 |
| Pts livres | 17 (100%) | 18 + 1 bonus = 19 effectifs (105%) |
| Stories Done | 11 (incl. 5 ops Phase 2) | 13 (12 engagees + 2 follow-ups + 1 bug fix) |
| Stories deferred | 0 | 0 |
| Commits feature | 6 | 8 |
| Commits docs/process | 1 | 6 |
| Commits chore/ci | 1 | 2 |
| Commits fix | 1 (a11y hotfix) | 2 (areaServed unification + cookie banner) |
| Commits test (non-mes, divers) | 0 | 2 (alignment de types) |
| Tests unitaires ajoutes | +44 | +45 |
| Tests E2E ajoutes | +3 | 0 (couverture stable) |
| Cles i18n ajoutees | +192 (96 × 2) | ~280 (140 × 2) |
| Decisions PO actees | 6 (D20-D25) | 9 (D28-D36) |
| Increment livre en prod | ✅ | ✅ |
| Sprint Goal atteint | ✅ | ✅ (100%) |

**Verdict** : sprint exemplaire en livraison (100% Sprint Goal sur 4 outcomes) et discipline process (boucle universelle tenue + 7 KEEP solides). 4 DROPs identifies sont des amplificateurs de qualite — ils nourrissent 7 trys S21 (T33-T39). Apprentissage central : **un audit formel pre-planning + push-and-verify en boucle courte = qualite + velocite cumulables, sans tradeoff**.

Le Sprint 20 marque un tournant : le site est passe d'un site SMI lead-gen (S19) a un **site SEO + conversion instrumente, mesurable, multi-pays, avec contenu data-driven cite sources analystes**.

---

*Sprint Retrospective S20 cloturee le 26/04/2026 — gate T22 (retro committee avant Sprint Planning N+1) respectee. Voir [backlog/sprint-current.md](../backlog/sprint-current.md) pour la cloture du sprint.*
