# Sprint Retrospective — Sprint 15 "Assainir et consolider"

> **Date** : 12 avril 2026
> **Format** : Keep / Drop / Try
> **Sprint Goal** : Assainir les backlogs, monter le mutation score a 60%, consolider les gaps — **ATTEINT**

---

## KEEP

### K1 · T1-v2 (verification au Sprint Planning)
- **Cause racine** : chaque story verifiee en direct avant engagement — 0 fantome (vs 60% en S14)
- **Action** : institutionnaliser comme regle permanente dans PROCESS.md
- **Metrique** : 0% fantome 3 sprints de suite = regle stable

### K2 · Mutation testing comme boussole qualite
- **Cause racine** : hubspot.ts passe de 26% a 70% avec seulement 6 tests — le mutation score cible les tests a plus fort ROI
- **Action** : utiliser le mutation score pour prioriser les efforts de couverture
- **Metrique** : mutation score global 71.43% (objectif : 80% a terme)

### K3 · Forecast conservateur
- **Cause racine** : 9 pts planifies, 9 pts livres, 0 report — rythme soutenable
- **Action** : maintenir le forecast a ~50% de la capacite tant que le projet est en phase de consolidation
- **Metrique** : ratio livre/planifie = 100% sur S15

---

## DROP

### D1 · Tester les animations/observers en jsdom
- **Cause racine** : les branches IntersectionObserver callback et requestAnimationFrame ne sont pas testables en jsdom (pas de layout engine). Ecrire des mocks complexes pour ces branches produit des tests fragiles sans valeur reelle.
- **Action** : accepter la limite jsdom sur ces hooks. Les couvrir uniquement via E2E Playwright (qui a un vrai navigateur).
- **Impact** : useCountUp et useScrollReveal resteront a ~40-60% coverage en unit — c'est voulu.

---

## TRY — entrees pour le refinement Sprint 16

### T8 · Institutionnaliser T1-v2 dans PROCESS.md
- **Quoi** : ajouter la verification au Sprint Planning comme regle permanente (§4.1)
- **Pourquoi** : 3 sprints consecutifs avec le process, il est valide
- **Owner** : PO
- **Metrique** : regle ecrite dans PROCESS.md

### T9 · Domaine custom freshworks.whataservice.fr (D14)
- **Quoi** : configurer le domaine dans Vercel dashboard, mettre a jour le DNS
- **Pourquoi** : decision PO D14 en attente de configuration
- **Owner** : PO (ops Vercel)
- **Metrique** : site accessible sur freshworks.whataservice.fr

### T10 · Ratchet coverage seuil a 80%
- **Quoi** : monter les seuils CI de 75% a 80% (on est a 92%)
- **Pourquoi** : verrouiller le gain Sprint 15
- **Owner** : Dev
- **Metrique** : CI echoue si coverage < 80%

### T11 · Ratchet mutation score a 65%
- **Quoi** : monter le seuil Stryker de 60% a 65% (on est a 71%)
- **Pourquoi** : verrouiller le gain Sprint 15
- **Owner** : Dev
- **Metrique** : `npm run test:mutation` passe avec break: 65

---

*Chaque Try entre dans le refinement preparatoire Sprint 16 via la boucle universelle.*
