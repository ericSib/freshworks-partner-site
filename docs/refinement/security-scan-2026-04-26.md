# Refinement — Security & Accessibility Scan 2026-04-26

> **Date** : 26 avril 2026
> **Sprint vise** : Sprint 20 (marge 2 pts) + inbox Sprint 21+
> **Duree** : 1 session (post Sprint 20 Planning, J0)
> **Declencheurs** : sortie de la tache planifiee `security--accessibility-scan` du 26/04/2026 (cadence hebdomadaire)
> **Skills mobilises** : `agile-product-owner` + `dev-devops` (deps mgmt) + `qa-nonfunctional` (a11y/security)

---

## 1 · Decisions et arbitrages

### Source du refinement

Sortie de la tache planifiee `security--accessibility-scan` (skill projet) qui couvre :
- Audit des dependances npm (`npm audit` + `npm outdated`)
- Scan OWASP Top 10 sur le code source
- Audit accessibilite WCAG 2.1 AA (forms, headings, alt text, onClick)
- Verification headers de securite Next.js

### Findings synthetiques

| Categorie | Severite | Finding | Effort | Decision PO |
|---|---|---|---|---|
| Deps | 🔴 HIGH | `next` 16.2.2 — DoS Server Components (GHSA-q4gf-8mx6-v5v3) | S | Story → US-26.1 — **S20 marge** |
| Deps | 🟡 MOD | `next-intl` 4.9.0 — open redirect (GHSA-8f24-v5vv-gm5j) | S | Inclus dans US-26.1 |
| Deps | 🟡 MOD | `postcss` <8.5.10 — XSS CSS stringify (transitif via next) | S | Inclus dans US-26.1 (couvert par next 16.2.4) |
| Deps | 🟡 MOD | `dompurify` (transitif via jspdf) — 4 XSS bypass | S | Inclus dans US-26.1 (`npm audit fix`) |
| Deps | 🟢 LOW | `uuid` <14.0.0 (transitif via resend→svix) — buffer bounds | XS | Story → US-26.3 — **veille passive** |
| A11y | 🟢 LOW | Email input sans `<label>`/`aria-label` — `QuizEmailGate.tsx:42` (WCAG 1.3.1) | XS | Story → US-26.2 — **S21 inbox** |
| OWASP | ✅ | A01/A02/A03/A05/A07/A09 — aucune vulnerabilite detectee | — | Pas d'action |
| Headers | ✅ | CSP + HSTS + X-Frame-Options + nosniff + Referrer-Policy + Permissions-Policy — tous configures | — | Pas d'action |

### Arbitrage : injection en S20 vs report S21

**Probleme** : le Sprint 20 vient d'etre engage (18/20 pts, marge 2 pts), Sprint Goal centre sur SEO + funnel (sans rapport avec ces findings). Mais 1 vuln HIGH ne devrait pas attendre 7 jours.

**Options analysees** :
- A · Tout reporter en S21 → 7 jours d'exposition a une DoS HIGH cote Next.js. Refus Manifeste P9 (excellence technique).
- B · Tout charger en S20 → 3 stories (4 pts) > 2 pts marge. Risque de derailler le Sprint Goal SEO.
- C · **Patch deps groupe en S20 marge (2 pts) + a11y en S21 (1 pt) + veille uuid hors sprint (0 pt)** → equilibre.

**Decision PO (proposee)** : option C retenue.
- US-26.1 (2 pts, deps batch) → injectee dans la marge S20, executable J7 apres Sprint Review (avant Retro) ou en background J2-J3.
- US-26.2 (1 pt, a11y QuizEmailGate) → S21 inbox, pas critique (WCAG niveau A respecte via `type="email"` + placeholder, c'est le niveau AA qui sanctionne l'absence de label).
- US-26.3 (0 pt, veille uuid) → process continu, pas de sprint cible. Se resoudra naturellement quand `resend` releasera une version qui upgrade `svix`.

### Arbitrage Epic

Decision proposee : creer **E26 — Hygiene securite hebdomadaire** comme epic distinct, alimentee par chaque execution hebdomadaire de la tache planifiee `security--accessibility-scan`. Symetrique de E23 (Refactoring Radar) pour le tech debt.

**Decision PO candidate D37** : ouverture E26 + budget recurrent ~1-2 pts/sprint en marge (vs ~20% pour E23). Rationale : la majorite des findings hebdo seront des deps minor patches absorbes en marge. Une exposition plus large (audit annuel externe) reste a planifier en Phase 2.

### Arbitrage upgrade strategy

**Probleme** : `npm audit fix --force` propose `next@16.2.4` qui est "outside the stated dependency range". Risque de regression si on accepte le force.

**Decision** : approche progressive en 2 etapes dans US-26.1 :
1. `npm install next@16.2.4 next-intl@4.9.1` explicite (range bump intentionnel, pas de --force)
2. `npm audit fix` pour les transitifs (dompurify) sans --force
3. Verifier `npm audit` final = 0 HIGH + ≤2 MOD restantes (uuid attendu)

**Garde-fou** : la story doit livrer un rollback plan documente (revert commit + `npm ci`).

---

## 2 · Strategie de test et risques qualite

### Tests minimaux a executer apres upgrade (US-26.1)

| Test | Commande | Critere |
|---|---|---|
| Build | `npm run build` | 0 erreur, 0 warning critique |
| Lint | `npm run lint` | 0 erreur |
| Unit | `npm run test` | 913 pass (baseline S19) |
| Coverage | `npm run test:coverage` | ≥ 80% maintenu |
| E2E | `npx playwright test` | 55 pass (baseline S19) |
| Audit | `npm audit` | 0 HIGH, 0 MOD non-attendue |
| Smoke prod-like | `npm run build && npm start` | Homepage + quiz + contact rendent sans erreur |

### Risques cles

1. **Next 16.2.4 breaking changes** : revue du CHANGELOG Next.js entre 16.2.2 et 16.2.4 obligatoire. Si breaking → escalade PO + report S21.
2. **next-intl 4.9.0 → 4.9.1** : patch version, faible risque. CHANGELOG rapide a verifier.
3. **dompurify upgrade transitif** : utilise uniquement par `jspdf` cote server (generation PDF quiz). Tester `generate-pdf.ts` regression test (hash MD5 baseline si dispo).
4. **CI/CD** : push d'un upgrade deps + lockfile en S20 doit suivre la regle D36 (commit `chore(deps)` dans le meme push que la modif).

### Risque a11y (US-26.2)

L'absence de label ne casse pas le formulaire (input fonctionne, autocomplete fonctionne), mais :
- Screen readers annoncent "edit text" generique sans contexte
- Conformite WCAG 2.1 AA non atteinte sur cette page
- Test axe-core actuel ne flag PAS l'absence (placeholder + `type=email` suffisent au niveau A, AA exige label visible OU aria-label OU aria-labelledby)

---

## 3 · Stories detaillees

### US-26.1 — Patch hebdo dependances securite (next + next-intl + dompurify)

**Estimation** : 2 pts
**Sprint cible** : Sprint 20 (marge)
**Priorite** : Must (HIGH severity)

Couvre les 4 findings deps : next 16.2.2 → 16.2.4, next-intl 4.9.0 → 4.9.1, postcss (transitif), dompurify (transitif).

Detail complet : [docs/stories-ready/US-26.1.md](../stories-ready/US-26.1.md)

### US-26.2 — aria-label sur QuizEmailGate email input

**Estimation** : 1 pt
**Sprint cible** : Sprint 21 (inbox)
**Priorite** : Should

Ajout d'un `aria-label` traduit FR/EN sur `QuizEmailGate.tsx:42` pour conformite WCAG 1.3.1 AA.

Detail complet : [docs/stories-ready/US-26.2.md](../stories-ready/US-26.2.md)

### US-26.3 — Veille uuid via resend (process continu)

**Estimation** : 0 pt (process)
**Sprint cible** : continu, pas de sprint
**Priorite** : Could

Surveillance hebdomadaire (re-execution scan) jusqu'a ce que `resend` upgrade `svix` qui upgrade `uuid` ≥ 14.0.0. Pas d'action proactive sauf si severite escalade.

Detail complet : [docs/stories-ready/US-26.3.md](../stories-ready/US-26.3.md)

---

## 4 · Decisions PO actees (validees 27/04)

| ID | Decision | Statut |
|---|---|---|
| D37 | **Ouverture Epic E26 "Hygiene securite hebdomadaire"** — alimentee par la tache planifiee `security--accessibility-scan`, budget ~1-2 pts/sprint en marge | ✅ actee 27/04 |
| D38 | **Strategie upgrade deps** — pas de `npm audit fix --force` jamais. Range bumps explicites + audit fix transitifs sans force | ✅ actee 27/04 |
| D39 | **US-26.1 = hotfix immediat hors-sprint** (revision de la candidate "injection en marge S20" qui n'a pas pu etre executee — Sprint 20 clos avant). Vuln HIGH = exposition non negociable, le patch est livre des l'arbitrage PO 27/04 sans attendre le Sprint Planning S21 | ✅ actee 27/04 |

Inscrit au journal CLAUDE.md le 27/04/2026.

**Note renumerotation** : 2 refinements ouverts en parallele (security-scan + ops-lockfile-resync §7.2) avaient chacun propose D37/D38 pour des decisions differentes. Resolution chronologique : security-scan = D37/D38/D39 (ce document), lockfile §7.2 = D40/D41 (cf. [ops-2026-04-26-lockfile-resync.md](ops-2026-04-26-lockfile-resync.md) §7.2 mise a jour).

---

## 5 · Update backlog (acte refinement)

### Sprint 20 — sprint-current.md

- [ ] Ajouter US-26.1 en Phase 3 (process/ops buffer) — **2 pts**
- [ ] Mettre a jour total : 18 pts → 20 pts (capacite saturee, plus de marge — assumed deliberement vu severite HIGH)
- [ ] Ajouter D37/D38/D39 dans le journal apres validation PO

### Sprint 21 — inbox

- [ ] US-26.2 (1 pt) — aria-label QuizEmailGate

### Continu — backlog non-sprint

- [ ] US-26.3 (0 pt) — veille uuid

---

*Refinement issu de la tache planifiee `security--accessibility-scan` 26/04/2026. Boucle universelle respectee : Evenement (scan) → Refinement Three Amigos (ce document) → Update backlog.*
