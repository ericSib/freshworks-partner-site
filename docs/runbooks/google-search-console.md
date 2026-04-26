# Runbook — Google Search Console (GSC)

> **Owner** : Eric Sib (PO)
> **Cadence** : ponctuel (setup) puis check hebdomadaire (suivi positions)
> **Pré-requis** : compte Google avec accès au domaine, accès DNS OVH (`manager.ovh.com`)
> **Lié à** : US-S20-1 (S20)

---

## 1 · Setup initial — soumettre la propriété + le sitemap

### 1.1 · Ajouter la propriété

1. Aller sur [search.google.com/search-console](https://search.google.com/search-console)
2. Cliquer **« Ajouter une propriété »**
3. Choisir **« Préfixe d'URL »** (pas « Domaine » — plus simple, suffisant pour notre cas)
4. Saisir : `https://freshworks.whataservice.fr`
5. Cliquer **« Continuer »**

### 1.2 · Vérifier la propriété

Trois méthodes possibles, ordre de préférence :

**Méthode A — Balise HTML meta (recommandée car dans le code, traçable)**

1. Copier la `<meta name="google-site-verification" content="XXX" />` proposée par GSC
2. Ouvrir une PR pour ajouter la meta dans `src/app/[locale]/layout.tsx` :
   ```tsx
   export const metadata: Metadata = {
     // ... existant
     verification: {
       google: "XXX", // valeur fournie par GSC
     },
   };
   ```
3. Push, attendre le déploiement Vercel (~1 min), puis cliquer **« Vérifier »** dans GSC

**Méthode B — DNS TXT record (sur OVH)**

1. Copier la valeur TXT proposée par GSC (`google-site-verification=XXX`)
2. Sur [manager.ovh.com](https://manager.ovh.com) → Web Cloud → Noms de domaine → `whataservice.fr` → Zone DNS
3. Ajouter une entrée :
   - Type : `TXT`
   - Sous-domaine : `freshworks` (pour cibler `freshworks.whataservice.fr`)
   - Valeur : `google-site-verification=XXX`
   - TTL : par défaut
4. Attendre la propagation DNS (~5-30 min) puis cliquer **« Vérifier »**

**Méthode C — Fichier HTML à la racine** : déconseillée (pollue `public/`, pas traçable dans le repo).

### 1.3 · Soumettre le sitemap

Une fois la propriété vérifiée :

1. Menu de gauche → **Sitemaps**
2. Dans le champ « Ajouter un nouveau sitemap », saisir : `sitemap.xml`
3. Cliquer **« Envoyer »**
4. Attendre 24-48h pour le premier crawl. Statut visible dans la liste : `Réussite` ou erreur détaillée.

### 1.4 · Vérifications post-soumission (24-48h après)

- [ ] **Sitemaps** → statut `Réussite` (ou `En cours de lecture` au début)
- [ ] **Pages** → onglet `Indexation` → vérifier que les 10 URLs (5 routes × 2 langues) sont passées de « Découverte » à « Indexée »
- [ ] **Pages** → 0 erreur dans la colonne « Pourquoi cette page n'est pas indexée »
- [ ] Capture d'écran → committer dans `docs/seo/screenshots/gsc-submission-YYYY-MM-DD.png`

---

## 2 · Suivi hebdomadaire

### 2.1 · Onglet Performances

1. Période : « 28 derniers jours » (changer en « 7 derniers jours » pour le pulse hebdo)
2. Comparer : « Période précédente »
3. Métriques à surveiller :
   - **Clics** : volume de visiteurs depuis Google
   - **Impressions** : nombre de fois où les pages WaS apparaissent en SERP
   - **CTR moyen** : clics / impressions (cible >2% sur queries non-brand)
   - **Position moyenne** : position dans les SERP

### 2.2 · Onglet Requêtes

1. Trier par **Impressions** desc — voir sur quoi WaS apparaît
2. Trier par **Position** asc — voir où WaS ranke déjà bien (Top 10) → opportunités d'optimisation
3. Trier par **CTR** desc — voir les pages performantes (lessons à réutiliser)

**KPI cible (rappel cadrage)** :
- Top 10 sur « consultant Freshservice » à 6 mois (échéance ~25/10/2026)
- Top 10 sur « consultant Freshdesk France » à 6 mois (livraison page S20)

### 2.3 · Onglet Pages

1. Vérifier que les pages services Freshservice et Freshdesk (livraison S20) sont indexées
2. Identifier les pages avec des positions instables → potentielles optimisations on-page

---

## 3 · Inspection d'une URL spécifique

Quand on déploie une nouvelle page (ex : `/fr/services/freshservice` après US-S20-2) :

1. Barre de recherche en haut : coller l'URL exacte
2. **« Demander une indexation »** — accélère le crawl initial (vs attendre que Google revienne)
3. Vérifier le rendu Google : « Tester l'URL en direct » → screenshot du rendu côté Google + 0 erreur d'exploration

---

## 4 · Erreurs courantes et résolution

| Erreur GSC | Cause probable | Action |
|---|---|---|
| « Sitemap n'a pas pu être lu » | URL inaccessible ou format XML invalide | `curl https://freshworks.whataservice.fr/sitemap.xml` → vérifier 200 + XML valide |
| « URL bloquée par robots.txt » | Règle Disallow trop large | Inspecter `src/app/robots.ts`, vérifier que la route n'est pas dans Disallow |
| « URL avec balise meta noindex » | `<meta name="robots" content="noindex">` injecté | Inspecter le HTML rendu, retirer la meta |
| « Page redirigée » | Redirect 301/302 inattendu | Vérifier `next.config.ts` redirects + middleware `src/proxy.ts` |
| « Page non trouvée (404) » | Route supprimée ou typo | Confirmer que la route existe dans `src/app/[locale]/...` |

---

## 5 · Liens utiles

- [GSC](https://search.google.com/search-console) — dashboard principal
- [Schema.org Validator](https://validator.schema.org/) — valider les JSON-LD
- [Rich Results Test](https://search.google.com/test/rich-results) — voir comment Google interprète les schemas
- [PageSpeed Insights](https://pagespeed.web.dev/) — Core Web Vitals
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) — vérification mobile

---

## 6 · Prochaines étapes après cette première soumission

- [ ] J+7 : premier check des positions sur « consultant Freshservice », « consultant Freshdesk »
- [ ] J+30 : re-audit SEO avec data réelles (cf. `docs/seo/audit-2026-04-26.md` § « Limitations »)
- [ ] Post-livraison US-S20-2 : inspecter les 2 nouvelles pages services, demander indexation manuelle

---

*Runbook produit le 26/04/2026 — US-S20-1. Mise à jour quand un nouveau cas d'erreur est rencontré (boucle universelle).*
