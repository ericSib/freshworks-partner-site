# Sprint Retrospective — Sprint 16 "Core Web Vitals & Performance"

> **Date** : 12 avril 2026
> **Format** : Keep / Drop / Try
> **Sprint Goal** : Lighthouse 90+, performance mobile, seuils qualite — **ATTEINT**

---

## KEEP

### K1 · T1-v2 comme regle permanente
- **Cause racine** : 4eme sprint consecutif sans fantome apres institutionnalisation dans PROCESS.md
- **Action** : ne plus mentionner T1-v2 dans les retros — c'est acquis
- **Metrique** : 0% fantome depuis Sprint 15

### K2 · Ratchet incremental (+5% par sprint)
- **Cause racine** : chaque sprint verrouille les gains du precedent sans friction
- **Action** : continuer jusqu'a coverage 85% / mutation 70%
- **Metrique** : seuils CI montent regulierement sans test failure

### K3 · Forecast a ~50% capacite
- **Cause racine** : 11 pts sur 20 engages, 11 livres. Rythme soutenable.
- **Action** : maintenir. Pas de pression a remplir la capacite.

---

## DROP

### D1 · Planifier une story Lighthouse sans Chrome disponible
- **Cause racine** : la story CWV (5 pts) a ete estimee sans verifier que Chrome CLI etait disponible localement. La config est ecrite mais non validee.
- **Action** : toujours verifier la toolchain avant d'estimer une story d'outillage

---

## TRY — entrees pour le refinement Sprint 17

### T12 · Ajouter Lighthouse CI au workflow e2e.yml
- **Quoi** : installer Chrome sur le runner ubuntu + ajouter un step `npx @lhci/cli autorun`
- **Pourquoi** : valider automatiquement le threshold 90+ a chaque PR
- **Owner** : Dev
- **Metrique** : Lighthouse CI passe en vert dans GitHub Actions

### T13 · Domaine Vercel dashboard config (ops)
- **Quoi** : configurer freshworks.whataservice.fr dans le dashboard Vercel + DNS
- **Pourquoi** : le code pointe vers le nouveau domaine (D14) mais l'ops n'est pas faite
- **Owner** : PO (Eric Sib)
- **Metrique** : site accessible sur freshworks.whataservice.fr

### T14 · Ratchet coverage 85% + mutation 70%
- **Quoi** : monter les seuils au prochain cran
- **Pourquoi** : verrouiller le gain Sprint 16
- **Owner** : Dev

---

*Chaque Try entre dans le refinement preparatoire Sprint 17 via la boucle universelle.*
