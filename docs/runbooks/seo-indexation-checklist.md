# Runbook — Indexation Google : checklist & monitoring

> **Owner** : Eric Sib (PO)
> **Cadence** : à chaque ajout/modification d'une route indexable + monitoring continu (J+3 / J+7 / J+14 post-deploy)
> **Pré-requis** : runbook [google-search-console.md](./google-search-console.md) déjà exécuté (propriété GSC vérifiée, sitemap soumis une 1re fois)
> **Lié à** : HOTFIX-S22.0a + HOTFIX-S22.0c (Sprint 22) · ex-T48 (Try retro S21)
> **Source incident** : `Coverage-2026-05-08.xlsx` — désindexation 7 → 0 en 24h détectée, cause cache-control `private/no-store`

---

## 1 · Pre-flight checklist AVANT deploy d'une route indexable

À cocher dans la PR description (DoD enrichie SEO/meta — D40/T28 acquis S21) :

### 1.1 · Sitemap & robots
- [ ] La nouvelle route est ajoutée à `src/app/sitemap.ts` (suivre T41 quand livré : auto-loop sur `VALID_SLUGS`)
- [ ] `lastModified` mis à jour dans `LAST_MODIFIED` map de `sitemap.ts`
- [ ] `priority` cohérent avec la hiérarchie business (home 1.0 > services 0.85-0.9 > maturity 0.8 > legal 0.3)
- [ ] `robots.txt` n'exclut pas la route (via `next.config.ts`)

### 1.2 · Headers HTTP (HOTFIX-S22.0a critical)
- [ ] `curl -I {URL}` en local (`npm run start`) retourne `Cache-Control: public, s-maxage=…, stale-while-revalidate=…`
- [ ] Le header NE contient PAS `private`, NE contient PAS `no-store`, NE contient PAS `no-cache`
- [ ] Test E2E `seo-cache-headers.spec.ts` reste vert
- [ ] Security headers intacts (`X-Frame-Options: DENY`, `Content-Security-Policy`, `Strict-Transport-Security`)

### 1.3 · Canonical & hreflang
- [ ] `<link rel="canonical" href="…" />` pointe vers la version FR de la route (cohérent sitemap)
- [ ] Header HTTP `Link: <…>; rel="alternate"; hreflang="fr|en|x-default"` présent
- [ ] Test E2E `sitemap.spec.ts` (T40) reste vert

### 1.4 · Métadonnées
- [ ] `<title>` distinct par locale et par route (FR ≠ EN, route A ≠ route B)
- [ ] `<meta name="description">` distinct par locale, < 160 caractères
- [ ] OG image route-specific (US-S20-3 pattern Edge runtime)
- [ ] JSON-LD `Service` ou autre schema cohérent (US-S20-4)

### 1.5 · Tests automatisés
- [ ] `npm run test` (vitest) : aucune régression
- [ ] `npx playwright test` au moins sur la nouvelle route + `sitemap.spec.ts` + `seo-cache-headers.spec.ts`
- [ ] Pre-commit hook `tsc --noEmit` passe (T29 acquis S21)

---

## 2 · Procédure POST-merge sur main (déclenche auto-deploy Vercel)

### 2.1 · Smoke test production (immédiat, J+0)

```bash
# Remplacer {URL} par chaque nouvelle route
curl -sI https://freshworks.whataservice.fr/{URL} | grep -iE "^(cache-control|link)"
```

Attendu :
- `Cache-Control: public, s-maxage=86400, stale-while-revalidate=604800` (HOTFIX-S22.0a)
- `Link: <...>; rel="alternate"; hreflang="fr|en|x-default"`

Si KO → rollback immédiat (`git revert {commit}` + push) avant de toucher GSC.

### 2.2 · Re-soumettre le sitemap dans GSC

1. [search.google.com/search-console](https://search.google.com/search-console) → propriété `https://freshworks.whataservice.fr`
2. Menu gauche → **Sitemaps**
3. Trouver l'entrée `sitemap.xml` → vérifier statut `Réussite`
4. Si statut autre → cliquer la ligne, lire le détail erreur
5. **Optionnel** mais recommandé après ajout d'une route : supprimer puis re-soumettre `sitemap.xml` pour forcer re-scan

### 2.3 · Demander indexation manuelle (boost J+0)

Pour chaque NOUVELLE route ajoutée :

1. Menu gauche → **Inspection de l'URL**
2. Coller l'URL complète (ex. `https://freshworks.whataservice.fr/fr/services/migration`)
3. Attendre le rapport (10-30s)
4. Cliquer **« Demander une indexation »** (bouton en haut à droite)
5. Confirmer dans la popup
6. Attendre confirmation « URL ajoutée à une file d'attente d'indexation prioritaire »

Quota GSC : ~10 demandes / jour. Si beaucoup de routes → prioriser home + nouvelles routes.

---

## 3 · Monitoring post-deploy

### 3.1 · J+3 — premier signal

**Action** : ouvrir GSC → **Indexation** → **Pages**

**Critères attendus** :
- Au moins **1 page** dans « Pages indexées » (signal positif que Googlebot a re-crawlé)
- Aucune nouvelle erreur dans « Pages non indexées » (vs baseline)
- `cache-control` correct (re-vérifier `curl -I` au cas où le CDN aurait pris un cache stale)

**Si J+3 = 0 indexée** : passer à §4 (decision tree).

### 3.2 · J+7 — confirmation

**Critères attendus** :
- ≥ **3 pages** dans l'index (home + 1 service + 1 maturity au minimum)
- Au moins quelques impressions dans « Performances » (preuve que Google a servi les pages dans des SERP)

**Si J+7 < 3** : ouvrir un refinement incident `docs/refinement/incident-{date}-seo-bis.md` et démarrer §4.

### 3.3 · J+14 — KPI Sprint Goal

**Critères attendus** :
- ≥ **7 pages** dans l'index (KPI Sprint Goal HOTFIX-S22.0a)
- Au moins 1 keyword tracker (exemple : "migration ServiceNow Freshworks") apparaît dans les requêtes GSC

---

## 4 · Decision tree — diagnostic si indexation échoue

Quand : J+7 < 3 pages indexées OU pic d'indexation puis chute en 24h.

### Étape 1 — Vérifier le headers HTTP

```bash
for url in /fr /fr/services/freshservice /fr/quiz /fr/maturite/itsm/level-1; do
  echo "--- $url ---"
  curl -sI "https://freshworks.whataservice.fr$url" | grep -iE "^(cache-control|x-robots-tag)"
done
```

**Symptômes connus** :
- ❌ `cache-control: private` ou `no-store` → bug HOTFIX-S22.0a régression. Vérifier `next.config.ts headers()` n'a pas été reverté.
- ❌ `x-robots-tag: noindex` → bug applicatif quelque part (middleware ou metadata). Grep le code pour `noindex`.
- ✅ `cache-control: public, s-maxage=…` → header OK, chercher ailleurs (étape 2).

### Étape 2 — Vérifier la couverture GSC

GSC → **Pages** → onglet « Pages non indexées » :
- **« Détectée, actuellement non indexée »** : Google connait l'URL mais n'a pas crawlé. Cause probable : nouveau site avec autorité faible, attendre + GSC Inspection URL.
- **« Explorée, actuellement non indexée »** : Google a crawlé puis refusé. Causes probables : duplicate content, contenu jugé de qualité insuffisante, directives cache hostiles.
- **« Page en double : URL canonique différente »** : conflit canonical. Inspecter la page → comparer canonical déclaré vs URL servie.
- **« Page avec redirection »** : la route redirige (ex. `/` → `/fr`). Normal, ne pas indexer la racine.
- **« Bloquée par robots.txt »** : régression robots.txt. Lire `curl /robots.txt`.
- **« Erreur serveur (5xx) »** : la page a eu des 5xx pendant le crawl. Vérifier logs Vercel.

### Étape 3 — Vérifier le canonical en HTML brut

```bash
curl -s https://freshworks.whataservice.fr/fr/services/freshservice | grep -E '<link rel="canonical"|<link rel="alternate"' | head -5
```

Le canonical doit pointer vers la version FR de la route, sans `/` final, sans paramètre de query.

### Étape 4 — Vérifier la qualité du contenu

Si `cache-control` OK + canonical OK + sitemap OK + GSC dit "Explorée non indexée" → Google juge le contenu insuffisant. Causes possibles :
- Contenu trop léger (< 300 mots de texte unique)
- Trop similaire à une autre page du site (duplication interne)
- Aucun lien interne ne pointe vers cette page (orpheline)

Action : ouvrir une story content+SEO de remédiation dans le sprint suivant.

### Étape 5 — Vérifier l'historique des changements

```bash
git log --oneline next.config.ts src/proxy.ts src/app/sitemap.ts | head -20
```

Si un commit récent a touché ces fichiers, vérifier qu'il n'a pas réintroduit le bug `cache-control: private`.

---

## 5 · Symptômes connus (catalogue)

| Symptôme GSC | Cause root racine | Fix | Sprint |
|---|---|---|---|
| 0 pages indexées 5+ jours | `cache-control: private, no-store` (bug Vercel + middleware next-intl) | Override via `next.config.ts headers()` rule sur `/(fr|en)/*` | HOTFIX-S22.0a (S22) |
| Pic indexation puis chute en 24h | Idem ci-dessus — Google indexe au 1er crawl puis désindexe au 2e | Idem | HOTFIX-S22.0a (S22) |
| « Aucun sitemap référent détecté » | Sitemap pas (encore) re-scanné par Google | Re-soumettre sitemap GSC + Inspection URL | Process |
| « Page en double : URL canonique différente » sur 1 route précise | Divergence `<link rel="canonical">` vs URL servie ou hreflang | Inspecter HTML rendu, aligner canonical avec URL servie | HOTFIX-S22.0b (S22) |
| `lastmod` change à chaque deploy = bruit crawler | `new Date()` à build-time dans sitemap.ts | Frozen dates dans `LAST_MODIFIED` map | US-S20-1 (S20) ✅ |

---

## 6 · Annexes & ressources

- [Google Search Central — Cache-Control headers and Googlebot](https://developers.google.com/search/docs/crawling-indexing/special-tags)
- [Vercel — Cache-Control behavior with Set-Cookie](https://vercel.com/docs/edge-network/caching)
- [Next.js — `headers()` config](https://nextjs.org/docs/app/api-reference/next-config-js/headers)
- Runbook setup initial : [google-search-console.md](./google-search-console.md)
- Runbook hotfix process : `hotfix-procedure.md` (T47 Sprint 22)

---

*Dernière mise à jour : 8 mai 2026 · Version 1.0 (HOTFIX-S22.0c) · Origine : incident désindexation totale 02-03/05/2026 détecté via export GSC `Coverage-2026-05-08.xlsx`*
