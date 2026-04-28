# Sprint Retrospective — Sprint 21 "Couverture SEO Tier 2 + foundations qualité"

> **Date** : 28 avril 2026
> **Format** : Keep / Drop / Try
> **Sprint Goal** : Étendre la surface SEO + durcir qualité — **ATTEINT EN PRODUCTION** (4 outcomes / 4, 9 pts engagés livrés + 3 follow-ups hors capacité = ~12 pts effectifs)
> **Source Review** : [demo/sprint-21.md](../demo/sprint-21.md)

---

## KEEP

### K1 · Pattern "1 commit = 1 intention" maintenu sur 11 commits chirurgicaux
- **Cause racine** : chaque story livrée a son commit dédié avec scope conventional + body explicatif > 5 fichiers. Les 2 fix accessoires (slate-400 dans `c83d8e3`, sitemap dans `098fd7a`) ont été splittés en commits séparés au lieu d'être noyés dans le commit feature.
- **Bilan** : `git log --oneline` lit comme un récit narratif — 11 commits, 11 intentions distinctes. Bisect granulaire reste possible. Pas de regression cascadée à corriger comme en S20 (`794683e` → `90dde7d`).
- **Action** : continuer ce reflexe systématique. Pre-commit `tsc --noEmit` (T29 acquis) renforce la garantie post-S21.

### K2 · TDD strict sur stories code (5/5 stories Bloc 2 + Bloc 3)
- **Cause racine** : sur chaque story qui touche du code (US-S21-1/2/3 + US-26.2 + T33), spec test ecrite AVANT implementation. TDD red verifie sur US-26.2 (2/2 fails au 1er run), TDD red verifie indirectement sur US-S21-1/2/3 (Playwright 0/6 → 6/6 apres slug + i18n).
- **Bilan** : 0 regression introduite. 18 nouveaux tests Playwright (3 specs × 6) + 2 tests RTL US-26.2 = +20 tests. Coverage maintenu.
- **Action** : pattern `pre-commit tsc + TDD strict + push-and-verify prod` est désormais un triplet automatique. Maintenir.

### K3 · Pre-commit `tsc --noEmit` (T29) prouve sa valeur dès le sprint qui l'invente
- **Cause racine** : T29 livré au commit 2 du sprint (`9edea94`), 9 commits suivants ont tous franchi le hook sans drift TS. La régression vécue post-S20 sur `useScrollReveal` (rename incomplet) aurait été bloquée à la source.
- **Bilan** : 0 cascade TS en CI sur l'ensemble du sprint. Cout mesure du hook : ~5-10s/commit (incremental cache). Acceptable.
- **Action** : T29 est devenu un acquis structurel — déplacer son maintien dans la "constitution" CLAUDE.md plutôt que comme story récurrente.

### K4 · DoD SEO/meta enrichie (T28/D40) prévient une régression future réelle
- **Cause racine** : la nouvelle DoD (PROCESS.md §7.2 + _TEMPLATE.md) impose une assertion E2E explicite sur tout texte SEO/meta modifié. Appliquée immédiatement sur les 3 stories US-S21-1/2/3 — chaque spec contient un `toHaveTitle(/.../)` qui bloquerait toute modification future du title sans mise à jour test.
- **Bilan** : la régression D40 vécue post-S20 sur US-S20-1 (`homepage.spec.ts toHaveTitle` non mise à jour) ne pourrait plus se reproduire silencieusement.
- **Action** : observer la S22 — si une story SEO oublie d'appliquer la DoD enrichie, c'est qu'il faut la rendre encore plus visible (ex: section dédiée dans le template story plutôt que checkbox).

### K5 · Push-and-verify post-deploy révèle 1 finding critique (sitemap manquant)
- **Cause racine** : pattern S20 K4 reproduit. Push des 9 commits Bloc 1+2+3, attente deploy Vercel, smoke test prod : `curl /sitemap.xml | grep -c "<url>"` retourne 7 au lieu des 10 attendus → fix immédiat (`098fd7a`).
- **Bilan** : sans ce smoke test, les 3 nouvelles routes services seraient restées invisibles à Google (sitemap = voie principale d'indexation). Bug intercepté avant que GSC ne re-crawle.
- **Action** : maintenir le pattern. Considerer un test E2E qui asserte sitemap.xml contient toutes les routes actives (Try T40 candidate).

### K6 · Audit findings buffer (T35/D13 acquis) absorbe 3 follow-ups sans dérailler le sprint
- **Cause racine** : 3 follow-ups non prévus initialement (US-26.1 hotfix HIGH, slate-400 a11y pré-existant, sitemap fix) totalisent ~3 pts effort. Capacité S21 = 20 pts, engagée 9 pts → marge ~11 pts. Les 3 follow-ups consomment ~3 pts de cette marge, laissant ~8 pts non utilisés.
- **Bilan** : la sous-engagement Sprint Planning S21 (9/20 pts vs 18/20 en S20) a été sciemment conservatrice et s'est révélée la bonne calibration. Le buffer T35 n'est plus theorique — il est mesurable.
- **Action** : maintenir un engagement à ~50% de capacité tant que le calibrage T36 n'est pas fait.

### K7 · Réutilisation du pattern code path générique de US-S20-2 (route `[slug]` + `ServicePageContent`)
- **Cause racine** : US-S20-2 avait livré une route dynamique générique `src/app/[locale]/services/[slug]/page.tsx` + composant `ServicePageContent.tsx` paramétré par i18n namespace. US-S21-1/2/3 = juste 3 entrées dans VALID_SLUGS + 3 blocs i18n × 2 langues. Pas de boilerplate code path à dupliquer.
- **Bilan** : les 3 pages livrées en 1 session, chacune avec 6 tests E2E pass. Pattern à maintenir pour tout futur ajout de page service (Tier 3+).
- **Action** : pour Phase 2, refactorer `sitemap.ts` pour boucler dynamiquement sur VALID_SLUGS (Try T41 candidate, ~1 pt) — éliminerait le finding S21 (sitemap oublié).

---

## DROP

### D15 · Sitemap.ts hardcodé n'a pas été mis à jour avec les nouveaux slugs
- **Cause racine** : `src/app/sitemap.ts` hardcode chaque route via `bilingualEntry()` au lieu de boucler sur `VALID_SLUGS` du fichier `[slug]/page.tsx`. L'ajout de slug a fait apparaître la route en runtime mais a oublié de l'enregistrer dans le sitemap.
- **Coût** : 1 commit follow-up `098fd7a` + ~30 minutes (detection post-deploy + fix + test update + push). Heureusement intercepté par le smoke test post-deploy (K5).
- **Action** : voir Try T41 — refactor sitemap pour source unique de vérité (lecture VALID_SLUGS depuis page.tsx ou config partagé).

### D16 · Velocite atypique (12 pts effectifs en 1 session) toujours non calibrée — Try T36 S20 reporté en S21 puis non livré
- **Cause racine** : T36 (calibrage story-points ↔ heures-Claude) listé en marge S21 mais non engagé Sprint Planning, et donc non exécuté pendant le sprint malgré la marge effective ~8 pts disponible.
- **Coût** : impossible de planifier finement la capacité S22+. Risque sur-engagement persistant.
- **Action** : voir Try T42 — engager T36 explicitement en Bloc 1 du Sprint 22 (force la calibration).

### D17 · Pages services Tier 1 (freshservice + freshdesk) n'ont toujours pas de spec E2E + axe-core
- **Cause racine** : US-S20-2 n'a livré aucun spec dédié pour les 2 pages services. Le bug a11y `text-slate-500` (corrigé `c83d8e3` en S21) aurait été détecté dès S20 si une spec axe-core existait. C'est par chance qu'on a écrit la spec axe-core US-S21-3 et qu'on a importé le composant partagé.
- **Coût** : 30 jours en prod avec WCAG AA non conforme sur 2 pages SEO prioritaires (heureusement non détecté par utilisateur réel).
- **Action** : voir Try T43 — créer 2 specs E2E rétroactives (`services-freshservice.spec.ts` + `services-freshdesk.spec.ts`) pour combler la dette de couverture S20.

### D18 · Story T37 (3 pages services) sous-estimée à 5 pts mais réelle ~5-6 pts contenu pur
- **Cause racine** : l'estimation 5 pts (1 + 2 + 2) a sous-estimé le volume i18n nécessaire. Chaque page = ~58 cles i18n × 2 langues = ~116 entrées. 3 pages = ~350 cles ajoutées (vs ~60 estimé "20 cles × 3 pages").
- **Coût** : pas de coût direct (livré dans le sprint), mais dilue le signal "1 pt = X heures-Claude" qui sera utilisé pour T36 calibration.
- **Action** : voir Try T44 — quand l'estimation d'une story implique du contenu i18n, partir du volume de cles attendu (audit composant cible) plutôt que d'une intuition holistique.

---

## TRY — entrées Sprint 22

### T40 · Test E2E asserte sitemap.xml contient toutes les routes actives
- **Quoi** : ajouter `tests/e2e/sitemap.spec.ts` qui demande `/sitemap.xml`, parse le XML, et asserte que chaque slug de `VALID_SLUGS` du fichier `[slug]/page.tsx` est présent dans le sitemap.
- **Pourquoi** : Drop S21 D15 — éviter de re-laisser un slug livré sans entrée sitemap. Test bloque le merge si oubli.
- **Estimation** : 1 pt.
- **Sprint cible** : S22.

### T41 · Refactor sitemap.ts pour boucler dynamiquement sur VALID_SLUGS
- **Quoi** : extraire `VALID_SLUGS` de `src/app/[locale]/services/[slug]/page.tsx` dans `src/config/services-slugs.ts` partagé. Importer dans `sitemap.ts` et boucler. Source unique de verité.
- **Pourquoi** : Drop S21 D15 + KEEP K7. Une fois fait, T40 (test sitemap) devient redondant pour les slugs services.
- **Estimation** : 1 pt.
- **Sprint cible** : S22.

### T42 · Calibrage capacité Claude Code (T36 reporté de S20)
- **Quoi** : analyse rétro-fit S19 + S20 + S21 — pour chaque story livrée, estimer "heures-Claude effectives en session" + "jours-PO équivalents en cadence WaS humaine habituelle". Documenter ratio dans CLAUDE.md ou PROCESS.md.
- **Pourquoi** : Drop S21 D16 — sans calibration, sur-engagement ou sous-engagement persistant des sprints futurs. Le pattern "9-12 pts effectifs en 1 session intensive" est récurrent (S19, S20, S21) — il faut acter quelle vraie capacité Claude Code délivre.
- **Estimation** : 1 pt (analyse + rédaction).
- **Sprint cible** : **S22 Bloc 1 obligatoire** (vs reporté de nouveau).

### T43 · Specs E2E rétroactives sur freshservice + freshdesk (combler dette S20)
- **Quoi** : créer `tests/e2e/services-freshservice.spec.ts` + `tests/e2e/services-freshdesk.spec.ts` sur le même pattern que les 3 specs S21 (SEO title + Schema.org + axe-core FR/EN).
- **Pourquoi** : Drop S21 D17 — 2 pages services Tier 1 sans test E2E + axe-core. Si une futur changement casse, on ne le verrait pas.
- **Estimation** : 1 pt (les 2 ensemble, pattern déjà éprouvé).
- **Sprint cible** : S22.

### T44 · Estimation i18n basee sur volume de cles (pas intuition holistique)
- **Quoi** : ajout dans `_TEMPLATE.md` story d'une section "Volume i18n attendu" qui force l'estimateur à compter les cles avant de poser un story-point. Pattern : "X cles × N langues = Y entrées → ~ Z pts contenu pur".
- **Pourquoi** : Drop S21 D18 — l'estimation T37 5 pts a tenu mais a sous-estimé d'un facteur ~6 le volume réel de cles i18n. Cela dilue les signaux pour T42 calibration.
- **Estimation** : 0 pt (process, edit template).
- **Sprint cible** : S22.

### T45 · Promotion T29 (pre-commit tsc) au statut d'acquis structurel CLAUDE.md
- **Quoi** : documenter dans CLAUDE.md §"Quality" que `tsc --noEmit` au pre-commit est un acquis non-negociable (pas juste une story livrée). Ajouter la commande de bypass `git commit --no-verify` autorisée seulement en urgence justifiée.
- **Pourquoi** : Keep S21 K3 — T29 a prouvé sa valeur, il faut le sortir du backlog stories pour le mettre dans la constitution.
- **Estimation** : 0 pt (process, edit CLAUDE.md).
- **Sprint cible** : S22.

### T46 · Story candidate S22 — pages services Tier 3 (3 pages restantes : ESM Sprints + Managed Excellence + CX/ESM Transformation)
- **Quoi** : 3 pages service restantes du catalogue (cx-esm-transformation, esm-sprints, managed-excellence) — slug + i18n + spec E2E. Volume ~3 pages × 58 cles × 2 langues = ~350 cles.
- **Pourquoi** : compléter la couverture SEO catalogue full (10 → 13 routes) une fois le pattern T41 sitemap dynamique acquis.
- **Estimation** : 5 pts (volume identique à T37 S21 + bénéfice du pattern partagé).
- **Sprint cible** : S22 ou S23 selon priorisation PO.

### T47 · Réintégrer story RF1 (vérification Vercel preview hotfix US-26.1) dans le pattern hotfix
- **Quoi** : pour tout futur hotfix urgent (D38/D39 pattern), exiger une étape "verify Vercel preview" AVANT le push main. Pattern à formaliser dans `docs/runbooks/hotfix-procedure.md`.
- **Pourquoi** : RF1 du refinement S21 mentionnait "Vercel preview US-26.1 non vérifié au démarrage S21". En pratique le hotfix a tenu (les 11 commits S21 ont validé indirectement le runtime), mais le risque était réel.
- **Estimation** : 1 pt (rédaction runbook + référence dans CLAUDE.md).
- **Sprint cible** : S22 ou backlog selon prochain hotfix.

---

## Bilan chiffré Sprint 21

| Métrique | S20 (référence) | S21 |
|---|---|---|
| Pts engagés | 18 | 9 |
| Pts livrés | 18 + 1 bonus = 19 effectifs (105%) | 9 engagés + ~3 hors capacité = ~12 effectifs (133%) |
| Stories Done (engagées) | 13 | 10 |
| Stories Done (hors capacité) | 0 | 3 (US-26.1 + slate-400 + sitemap) |
| Commits feature | 8 | 3 (US-S21-1/2/3) |
| Commits docs/process | 6 | 4 (refinement S21 + setup + DoD enrich + sprint-current) |
| Commits chore/ci | 2 | 2 (US-26.1 deps + T29 hook) |
| Commits fix | 2 | 3 (slate-400 + US-26.2 + sitemap) |
| Commits refactor | 0 | 1 (T33 mock localStorage) |
| Tests unitaires | +45 (913 → 958) | **+2** (958 → 960) |
| Tests E2E | 0 ajoutés | **+18** (3 specs services × 6) |
| Cles i18n ajoutées | +280 | **+~360** (services Tier 2 × 2 langues + 2 a11y) |
| Décisions PO actées | 9 (D28-D36) | 0 nouvelles décisions structurelles + 5 arbitrages Sprint Planning Q1-Q5 |
| Routes indexables prod | 7 | **10** (+3 services Tier 2) |
| Vuln HIGH | 1 (next 16.2.2 DoS) | **0** (US-26.1 hotfix livré 27/04) |
| Increment livré en prod | ✅ | ✅ |
| Sprint Goal atteint | ✅ 100% | ✅ 100% |

**Verdict** : sprint exemplaire en discipline (TDD strict, 1 commit = 1 intention, push-and-verify boucle courte) et en consolidation (T29 + T28 + T34/T35/T39 acquis = guard-rails durables). Capacité sous-engagée volontairement (9/20) pour absorber les follow-ups S20 et le buffer T35 — pari réussi (3 follow-ups absorbés sans dérailler).

Le sprint S21 marque une **maturité process** : les apprentissages des retros S19+S20 (D11 mock leak, D12 review prematurée, D13 audit buffer, D14 vélocité atypique, D40 bug coverage SEO, D41 drift TS) sont **livrés comme stories Sprint 21** plutôt que rester comme intentions. Le pre-commit `tsc --noEmit` (T29/D41) en est l'illustration — il a prevenu sa propre régression dans le sprint qui l'a inventé.

**Apprentissage central S21** : *un sprint a moindre capacité avec foundations process en Bloc 1 produit plus de qualité durable qu'un sprint plein qui empile des features*. La marge audit findings n'est plus théorique.

---

*Sprint Retrospective S21 cloturée le 28/04/2026 — gate T22 (retro committee avant Sprint Planning N+1) sera respectée. Voir [backlog/sprint-current.md](../backlog/sprint-current.md) pour la cloture du sprint.*
