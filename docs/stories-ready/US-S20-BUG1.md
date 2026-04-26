# US-S20-BUG.1 — Cookie banner ne se ferme pas au clic (RGPD blocker)

> **Type** : Bug fix
> **Reporté par** : PO (visite live 26/04/2026)
> **Priorité** : 🔴 P0 — bloquant RGPD + bloque tout le tracking GA4 livré US-S20-5/6
> **Estimation** : 1 pt (fix TDD ciblé, ~15 min)
> **Refinement** : §6.3 PROCESS.md (bug reproductible — pas besoin de refinement formel)

---

## Contexte

PO a constaté en visitant `https://freshworks.whataservice.fr` que le popup de consentement RGPD ne se ferme pas quand on clique sur « Accepter » ou « Refuser ». Le composant `CookieBanner` reste visible.

## Reproduction

1. Visiter le site en navigation incognito (cookie consent vide)
2. Le popup s'affiche en bas
3. Cliquer « Accepter » ou « Refuser »
4. **Bug** : le popup ne disparaît pas

## Cause racine (diagnostic)

`src/components/ui/CookieBanner.tsx:8-15` :

```ts
function subscribe(onStoreChange: () => void) {
  function onStorage(e: StorageEvent) {
    if (e.key === CONSENT_KEY) onStoreChange();
  }
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}
```

`useSyncExternalStore` est abonné **uniquement** à l'event `storage`. Or, l'event `storage` du DOM n'est dispatché par le navigateur que pour les **changements faits dans d'AUTRES onglets** ([MDN ref](https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event)).

Quand l'utilisateur clique « Accepter » :
1. `setConsent(true)` écrit `was-analytics-consent=granted` en localStorage ✓
2. Un event custom `was-consent-change` est dispatché ✓ (lu par `GoogleAnalytics.tsx`)
3. **Mais le `subscribe` du CookieBanner n'écoute PAS `was-consent-change`** → `getSnapshot` jamais re-évalué → `shouldShow` reste `true` → popup figé

## Impact

- **RGPD blocker** : utilisateur ne peut pas finaliser son choix de consent. Manque conformité.
- **Tout le tracking GA4 inactif** : `hasConsent()` reste `false` dès la 1ère ouverture, donc tous les events US-S20-5/6 sont no-op. Le travail de mesure conversion livré aujourd'hui est invisible tant que ce bug n'est pas fixé.
- **UX** : popup non fermable = visiteurs frustrés, taux de bounce +.

## Critères d'acceptation (Gherkin)

```gherkin
Scénario : Click "Accepter" ferme le popup
  Étant donné un visiteur sans consent stocké
  Quand le popup CookieBanner s'affiche
  Et qu'il clique sur "Accepter"
  Alors le popup disparaît immédiatement
  Et localStorage contient `was-analytics-consent=granted`

Scénario : Click "Refuser" ferme le popup
  Étant donné un visiteur sans consent stocké
  Quand il clique sur "Refuser"
  Alors le popup disparaît immédiatement
  Et localStorage contient `was-analytics-consent=denied`

Scénario : Le popup ne réapparaît pas après reload
  Étant donné un visiteur ayant déjà accepté ou refusé
  Quand il recharge la page
  Alors le popup ne s'affiche pas

Scénario : Synchro inter-onglets préservée
  Étant donné un visiteur dans 2 onglets ouverts simultanément
  Quand il accepte le consent dans l'onglet A
  Alors le popup disparaît aussi dans l'onglet B (event "storage" classique)
```

## Plan technique

**Fix minimal** dans `src/components/ui/CookieBanner.tsx` : étendre `subscribe` pour écouter aussi `was-consent-change`.

```ts
function subscribe(onStoreChange: () => void) {
  function onStorage(e: StorageEvent) {
    if (e.key === CONSENT_KEY) onStoreChange();
  }
  function onCustom() {
    onStoreChange();
  }
  window.addEventListener("storage", onStorage);
  window.addEventListener("was-consent-change", onCustom);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("was-consent-change", onCustom);
  };
}
```

Et fire `was-consent-change` aussi dans `handleDecline` (consistency avec `handleAccept`).

## Plan de test (TDD)

1. **Unit** (`src/components/ui/__tests__/CookieBanner.test.tsx`, nouveau) :
   - `it("hides after click on Accept")` — render, click, assert nothing visible
   - `it("hides after click on Decline")` — idem
   - `it("does not render when consent already stored")` — preset localStorage, render, expect null
2. **E2E (Playwright)** : skip pour cette fix (le test unit couvre les 3 AC critiques + temps réservé pour US-S20-2)

## Statut

- [ ] Test RED écrit
- [ ] Implémentation
- [ ] Test GREEN
- [ ] Build + lint vert
- [ ] Commit + push
- [ ] Curl prod : popup fonctionnel post-deploy

---

*Story produite le 26/04/2026 — bug fix S20 inline (1 pt). Pris en charge avant US-S20-2 car bloque le tracking livré US-S20-5/6.*
