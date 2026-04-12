# Sprint Retrospective — Sprint 17 "Refonte homepage"

> **Date** : 12 avril 2026
> **Format** : Keep / Drop / Try
> **Sprint Goal** : Refonte homepage — **ATTEINT**

---

## KEEP

### K1 · Config comme source de verite
- **Cause racine** : `src/config/offers.ts` pilote le composant Services et le schema SEO. Un seul fichier a modifier pour ajouter/retirer une offre.
- **Action** : maintenir ce pattern pour les pages services dediees (Sprint 19)

### K2 · Refonte contenu avant refonte composant
- **Cause racine** : i18n d'abord (S17-2), composant ensuite (S17-3). Ca evite de coder un composant sur du contenu qui va changer.
- **Action** : toujours ecrire le contenu avant le code UI

### K3 · Pattern inert + aria-hidden pour les overlays
- **Cause racine** : le CTA sticky et le mobile menu utilisent le meme pattern a11y
- **Action** : documenter ce pattern dans les guidelines dev

---

## DROP

### D1 · Pas de refonte des tests i18n existants
- **Cause racine** : les 373 tests i18n verifient les cles, pas le contenu. Apres la refonte, les cles sont stables mais le contenu a change. Les tests passent mais ne valident plus la coherence du contenu.
- **Action** : envisager un test de coherence FR/EN (meme nombre de cartes, memes cles presentes)

---

## TRY — entrees Sprint 18

### T15 · Quiz → Service Maturity Index™ (D16)
- **Quoi** : renommer le quiz, ajouter routing initial (ITSM/CX/ESM), mapping maturite → offre
- **Pourquoi** : decision PO D16, actif strategique #1

### T16 · Test de coherence i18n FR/EN
- **Quoi** : test automatise qui verifie que fr.json et en.json ont les memes cles et le meme nombre d'items par tableau
- **Pourquoi** : eviter les desynchronisations apres une refonte contenu

---

*Chaque Try entre dans le refinement preparatoire Sprint 18 via la boucle universelle.*
