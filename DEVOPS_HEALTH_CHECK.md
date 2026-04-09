# DevOps Health Check — freshworks-partner-site

**Date** : 2026-04-08
**Stack** : Next.js 16.2.2 (Turbopack) + React 19 + Tailwind 4 + next-intl 4
**Auditeur** : Scheduled task (automated)

---

## 1. DEPLOYABILITE

| Critere | Statut | Detail |
|---------|--------|--------|
| Build sans erreur | :red_circle: **ECHEC** | `new Resend()` au top-level de `route.ts:5` crash sans `RESEND_API_KEY` |
| TypeScript | :white_check_mark: | Compilation TS OK (erreur a la collecte des pages, pas au type-check) |
| Dockerfile | :x: Absent | Deploiement presume via Vercel |
| .dockerignore | :x: Absent | Non necessaire sans Dockerfile |
| Secrets hardcodes | :white_check_mark: | Aucun secret hardcode — `process.env` utilise partout |
| .env.example | :white_check_mark: | Present et documente (`RESEND_API_KEY`, `CONTACT_EMAIL`, analytics) |
| .gitignore | :white_check_mark: | Couvre node_modules, .next, .env*, .vercel, coverage |

### Cause racine du build failure
```
Error: Missing API key. Pass it to the constructor `new Resend("re_123")`
```
**Fichier** : `src/app/api/contact/route.ts:5`
```typescript
const resend = new Resend(process.env.RESEND_API_KEY); // <- top-level, execute au build
```
L'instanciation de `Resend` au module-level est evaluee pendant `next build` (collecte SSG). Sans la variable d'environnement, le constructeur throw.

**Fix recommande** : Instanciation lazy dans le handler :
```typescript
export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  // ...
}
```

---

## 2. HEALTH & READINESS

| Critere | Statut | Detail |
|---------|--------|--------|
| Endpoint `/health` | :x: Absent | Aucun endpoint de sante |
| Verification deps externes | :x: Absent | Resend API non verifiee au demarrage |

**Recommandation** : Ajouter `src/app/api/health/route.ts` :
```typescript
export async function GET() {
  return Response.json({ status: "ok", timestamp: new Date().toISOString() });
}
```

---

## 3. OBSERVABILITE

| Critere | Statut | Detail |
|---------|--------|--------|
| Logging structure (JSON) | :x: Non | `console.log` / `console.error` en texte libre |
| console.log de debug | :warning: 1 occurrence | `route.ts:32` — log dev-mode quand API key absente (acceptable) |
| console.error | :white_check_mark: 1 occurrence | `route.ts:79` — catch d'erreur avec prefixe `[Contact Form]` |
| Correlation ID | :x: Absent | Pas de request ID propage |
| Monitoring / APM | :x: Absent | Ni Sentry, ni Vercel Analytics, ni equivalent |
| Error Boundary React | Non verifie | Non audite dans ce run |

**Recommandation** : Integrer Sentry (`@sentry/nextjs`) pour le error tracking en production. Le volume de logs est acceptable pour un site vitrine.

---

## 4. METRIQUES DORA (semaine du 05-08 avril 2026)

### Historique Git (19 commits sur main)

| Date | feat | fix | refactor | chore | docs | WIP |
|------|------|-----|----------|-------|------|-----|
| 05 avr | 0 | 0 | 0 | 1 | 0 | 0 |
| 06 avr | 3 | 0 | 4 | 1 | 0 | 0 |
| 07 avr | 2 | 1 | 0 | 1 | 0 | 2 |
| 08 avr | 1 | 1 | 0 | 1 | 1 | 0 |

### Estimations DORA

| Metrique | Valeur | Evaluation |
|----------|--------|------------|
| **Deployment Frequency** | ~4-5 commits/jour sur main | :warning: Volume eleve, mais direct-push sans PR |
| **Lead Time for Changes** | ~0 (commit direct) | Non mesurable — pas de workflow branch/PR |
| **Change Failure Rate** | 2 fix / 6 feat = **33%** | :red_circle: Eleve — regressions detectees post-feat |

### Problemes workflow

1. **2 WIP commits sur main** (`20f358d`, `80d2cb2`) — violation des conventions projet
2. **Aucune feature branch / PR** — tout est push direct sur main
3. **1 commit sans scope** (`fix: sync main with worktree`) — non conforme aux regles commitlint
4. **Change Failure Rate 33%** — `fix(ui)` et `fix: sync main` suggerent des regressions post-deploy

---

## 5. NEXT.JS SPECIFIQUE

### next.config.ts

| Critere | Statut | Detail |
|---------|--------|--------|
| Security headers | :white_check_mark: **Excellent** | HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Permissions-Policy, Referrer-Policy |
| CSP | :warning: | `unsafe-inline` + `unsafe-eval` presents (necessaire Next.js/Calendly) |
| Image optimization | :white_check_mark: | `remotePatterns` configure pour `images.unsplash.com` |
| i18n | :white_check_mark: | next-intl plugin configure correctement |
| Compression | :white_check_mark: | Active par defaut dans Next.js |

### Patterns de rendu

| Page | Pattern | Adequation |
|------|---------|------------|
| `[locale]/page.tsx` | SSG (static) | :white_check_mark: Optimal — contenu marketing statique |
| `[locale]/mentions-legales` | SSG (static) | :white_check_mark: Contenu legal statique |
| `api/contact` | Route Handler (serverless) | :white_check_mark: Correct pour un formulaire |

### Bundle

| Critere | Statut | Detail |
|---------|--------|--------|
| Analyse du bundle | :red_circle: Non mesurable | Build echoue — impossible d'analyser |
| Dependencies runtime | :white_check_mark: **5 deps** | next, react, react-dom, next-intl, resend |
| DevDependencies | :white_check_mark: | Playwright, ESLint, commitlint, husky, Tailwind, TS |

**Les dependencies sont minimales et bien separees** (runtime vs dev).

---

## 6. EVOLUTION DEPUIS LE DERNIER AUDIT (06 avril)

| Critere | Avant (06 avr) | Maintenant (08 avr) | Tendance |
|---------|----------------|---------------------|----------|
| Build | :white_check_mark: OK | :red_circle: ECHEC | :chart_with_downwards_trend: Regression |
| .env.example | :x: Absent | :white_check_mark: Present | :chart_with_upwards_trend: Ameliore |
| Security headers | :x: Absent | :white_check_mark: Complets | :chart_with_upwards_trend: Ameliore |
| Images config | :warning: Manquant | :white_check_mark: Configure | :chart_with_upwards_trend: Ameliore |
| console.log debug | :white_check_mark: 0 | :warning: 1 (dev-mode) | :left_right_arrow: Stable |
| Change Failure Rate | 0% | 33% | :chart_with_downwards_trend: Degrade |
| Commits | 9 | 19 (+10) | Activite soutenue |

---

## 7. VERDICT

### :red_circle: BLOQUANT (1)

| # | Issue | Fichier | Fix |
|---|-------|---------|-----|
| 1 | **Build casse** — `new Resend()` top-level crash sans env var | `src/app/api/contact/route.ts:5` | Instanciation lazy dans `POST()` |

### :warning: AMELIORATIONS NECESSAIRES AVANT DEPLOIEMENT (5)

| Priorite | Action | Impact |
|----------|--------|--------|
| **P1** | Fix build Resend (bloquant) | Deployabilite |
| **P1** | Ajouter endpoint `/api/health` | Monitoring |
| **P2** | Integrer Sentry ou error tracking | Observabilite |
| **P2** | Instaurer workflow PR (plus de push direct sur main) | Qualite |
| **P3** | Durcir CSP (remplacer `unsafe-inline`/`unsafe-eval` par nonce) | Securite |

### :white_check_mark: POINTS FORTS

- Security headers complets et bien configures (HSTS, CSP, X-Frame-Options, etc.)
- Aucun secret hardcode, `.env.example` documente
- Stack minimale et coherente (5 deps runtime)
- Patterns de rendu adaptes (SSG + Route Handler)
- Validation serveur sur le formulaire contact (email regex, champs requis)
- Conventional commits avec commitlint + husky actifs

---

**Statut global** : :red_circle: **Non deployable** — corriger le build Resend avant deploiement.

*Rapport genere automatiquement le 2026-04-08 — DevOps Health Check Task*
