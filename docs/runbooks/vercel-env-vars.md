# Runbook — Variables d'environnement Vercel + force-fresh-build

> **Owner** : Eric Sib (PO) + Claude Code
> **Cadence** : ponctuel (à chaque ajout/modification d'env var)
> **Lié à** : T24 (S20), Drop S19 D10
> **Pré-requis** : accès au dashboard Vercel sur le projet `freshworks-partner-site` (team `whataservice`)

---

## Pourquoi ce runbook existe

**Drop S19 D10** : après ajout des env vars `RESEND_API_KEY`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `CONTACT_EMAIL` dans le dashboard Vercel, un clic sur **« Redeploy »** **réutilise le build cache par défaut**. Les env vars `NEXT_PUBLIC_*` sont **inlinées au build** dans le bundle JS — un redeploy from cache ne re-bake pas le bundle, donc les variables semblent « ajoutées mais invisibles côté client ».

Coût constaté : 5 min de confusion + 1 commit empty pour forcer un build frais.

---

## 1 · Inventaire des env vars du projet

Vérifier sur [vercel.com](https://vercel.com/whataservice/freshworks-partner-site/settings/environment-variables) que ces 6 variables sont présentes pour les 3 environnements (Production + Preview + Development) :

| Variable | Type | Source | Inline (NEXT_PUBLIC) |
|---|---|---|---|
| `RESEND_API_KEY` | Secret | Resend dashboard → API Keys | Non |
| `RESEND_FROM_EMAIL` | Secret | Constant `noreply@update.whataservice.fr` (T23) | Non |
| `HUBSPOT_ACCESS_TOKEN` | Secret | HubSpot Private App | Non |
| `CONTACT_EMAIL` | Plain | `contact@whataservice.fr` | Non |
| `LOG_LEVEL` | Plain | `info` (prod) / `debug` (preview/dev) | Non |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Plain | `G-P37MDYJ5M8` | **Oui** ⚠️ |

**Variables `NEXT_PUBLIC_*`** : inlinées au build → **nécessitent un fresh build à chaque modification** (cf. §3).

---

## 2 · Ajouter ou modifier une env var

### 2.1 · Étapes dashboard Vercel

1. Aller sur [vercel.com/whataservice/freshworks-partner-site/settings/environment-variables](https://vercel.com/whataservice/freshworks-partner-site/settings/environment-variables)
2. Cliquer **« Add New »** (ou cliquer sur la variable existante pour l'éditer)
3. Saisir :
   - **Key** : nom exact (respecter la casse — `RESEND_FROM_EMAIL` ≠ `Resend_From_Email`)
   - **Value** : la valeur (Vercel encrypt automatiquement les secrets)
   - **Environments** : cocher **Production + Preview + Development** sauf si raison contraire (ex: token de test uniquement en Development)
4. Cliquer **« Save »**

### 2.2 · ⚠️ NE PAS cliquer « Redeploy » dans la liste des deployments

Le bouton « Redeploy » du dashboard a une checkbox **« Use existing Build Cache »** cochée par défaut → réutilise le bundle précédent → les variables `NEXT_PUBLIC_*` ne sont **pas re-bakées**. C'est ce qui s'est passé en S19 D10.

**Si tu utilises quand même Redeploy** : décoche **« Use existing Build Cache »** dans le modal qui s'ouvre.

### 2.3 · ✅ Force fresh build via commit vide (méthode recommandée)

```bash
git commit --allow-empty -m "chore(ci): force fresh build for env vars"
git push
```

Ce commit vide déclenche un nouveau build complet via le webhook GitHub → Vercel rebuild from scratch → bundle re-baké avec les nouvelles `NEXT_PUBLIC_*`.

Délai typique : 1-2 minutes.

---

## 3 · Vérification post-modification

### 3.1 · Confirmer le pickup côté serveur (env vars non-`NEXT_PUBLIC`)

```bash
# Health check enrichi (D19) — montre l'état des integrations
curl -s "https://freshworks.whataservice.fr/api/health?deep=1" | jq
```

Sortie attendue (extrait) :
```json
{
  "status": "ok",
  "checks": {
    "resend": "ok",      // ou "degraded" si /domains scope manquant (T26 reporté S21)
    "hubspot": "ok"
  }
}
```

### 3.2 · Confirmer le pickup côté client (env vars `NEXT_PUBLIC_*`)

1. Ouvrir [freshworks.whataservice.fr](https://freshworks.whataservice.fr) en navigateur **incognito** (cookie consent vide)
2. DevTools → Console → taper :
   ```js
   document.querySelector('script[src*="googletagmanager"]')?.src
   ```
3. Si le script GA est présent (après acceptation du cookie banner) → `NEXT_PUBLIC_GA_MEASUREMENT_ID` est correctement bakée

### 3.3 · Smoke test fonctionnel

| Variable modifiée | Smoke test |
|---|---|
| `RESEND_API_KEY` ou `RESEND_FROM_EMAIL` | Soumettre le formulaire `/fr#contact` → vérifier réception email + log requestId dans Vercel runtime logs |
| `HUBSPOT_ACCESS_TOKEN` | Soumettre `/fr#contact` → vérifier création contact dans HubSpot CRM (search par email) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | DevTools Network → filtrer `g/collect` → accepter cookie → recharger → voir au moins 1 hit |
| `CONTACT_EMAIL` | Soumettre `/fr#contact` → vérifier que l'email arrive sur la nouvelle adresse |
| `LOG_LEVEL` | Vercel runtime logs → filtrer par level (info / debug / error) → cohérent avec la valeur |

---

## 4 · Debug — variable « ajoutée mais invisible »

### 4.1 · Symptômes

- Tu as ajouté/modifié une env var dans Vercel
- Tu as redéployé (Redeploy ou nouveau push)
- L'app se comporte comme si la variable n'existait pas

### 4.2 · Checklist diagnostic

- [ ] **Casse / typo** : la clé exacte (sensible à la casse) est-elle bien celle utilisée dans le code ?
  ```bash
  grep -rn "process.env\." src/ | grep -i "<NOM_VARIABLE>"
  ```
- [ ] **Environnement coché** : la variable est-elle bien activée pour Production (et non seulement Preview) ?
- [ ] **Redeploy from cache** : si la variable est `NEXT_PUBLIC_*`, refaire un fresh build (cf. §2.3)
- [ ] **Build logs** : Vercel → Deployments → cliquer le dernier build → onglet **Build Logs** → chercher `Building` puis vérifier qu'il n'y a pas `Restored build cache from previous deployment` (signe de cache utilisé)
- [ ] **Runtime logs** : Vercel → Deployments → onglet **Runtime Logs** → filtrer par function (api/contact, api/quiz/submit) → log `process.env.<NOM>` au démarrage de la function (instrumentation T23 sender.ts pattern)

### 4.3 · Si toujours bloqué

```bash
# Inspecter ce que Vercel a effectivement publié
vercel env ls          # liste les env vars (besoin Vercel CLI loggé)
vercel logs --follow   # logs en temps réel
```

Si Vercel CLI pas installé : `npm i -g vercel && vercel login`.

---

## 5 · Cas particulier : suppression d'une env var

1. Vercel dashboard → **« Remove »** sur la variable
2. **Confirmer** : un fresh build est nécessaire pour que le code ne tente plus de la lire
3. Si le code lit la variable sans fallback → l'app va crasher en prod. **Toujours mettre un fallback** dans le code avant de supprimer côté Vercel :
   ```ts
   const value = process.env.MY_VAR ?? "default-fallback";
   ```

---

## 6 · Liens utiles

- [Dashboard Vercel](https://vercel.com/whataservice/freshworks-partner-site)
- [Env Vars settings](https://vercel.com/whataservice/freshworks-partner-site/settings/environment-variables)
- [Build Logs](https://vercel.com/whataservice/freshworks-partner-site/deployments) → cliquer un deployment
- [Vercel Docs : Environment Variables](https://vercel.com/docs/projects/environment-variables)

---

## 7 · Historique des incidents évités grâce à ce runbook

| Date | Incident | Cause | Coût évité |
|---|---|---|---|
| 25/04/2026 | NEXT_PUBLIC_GA_MEASUREMENT_ID invisible après Redeploy from cache | Drop S19 D10 — nécessitait un fresh build | 5 min de diagnostic + 1 commit empty |
| 25/04/2026 | Sender Resend désaligné (noreply@whataservice.fr vs verified update.whataservice.fr) | Drop S19 D9 — hardcoded 4 call-sites, pas d'env var | 30 min de diag + commit fix + redeploy |

Désormais centralisé : `RESEND_FROM_EMAIL` (T23) + ce runbook (T24) + règle « ops > 30 min déclenche refinement » (T25).

---

*Runbook produit le 26/04/2026 — T24 (S20). Mise à jour à chaque nouveau cas d'erreur (boucle universelle, T25).*
