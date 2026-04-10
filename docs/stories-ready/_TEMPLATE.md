# US-XX.Y : <Titre court>

> **Epic** : E?? — <nom epic>
> **Priorite** : Must / Should / Could
> **Estimation** : ? pts
> **Sprint cible** : Sprint ??
> **Auteur** : <PO>
> **Date** : DD/MM/YYYY

---

## User Story

```
En tant que <role persona>,
je veux <action concrete>,
afin de <benefice mesurable>.
```

---

## Contexte

<1-3 paragraphes expliquant le pourquoi, la source (audit, retro, stakeholder),
et le lien avec le Product Goal / Sprint Goal.>

---

## Criteres d'acceptation (Gherkin)

### Scenario 1 : <titre scenario happy path>

```gherkin
Etant donne <contexte initial>
Quand <action utilisateur / systeme>
Alors <resultat observable>
  ET <assertion complementaire>
```

### Scenario 2 : <titre scenario erreur / edge case>

```gherkin
Etant donne <contexte>
Quand <action>
Alors <resultat>
```

### Scenario 3 : <autre scenario>

```gherkin
Etant donne ...
Quand ...
Alors ...
```

---

## Fichiers impactes

- `src/path/to/file.ts` — <type de modification>
- `src/path/to/other.tsx` — <type de modification>
- `tests/...` — <nouveau test / modif>

---

## Donnees de test

- Fixture : `tests/fixtures/...`
- Mock : `<endpoint mocked>`
- Compte / token : <si applicable>

---

## Dependances

- [ ] Decision bloquante : <D?>
- [ ] Story prerequise : <US-XX.Y>
- [ ] Spec / asset externe : <link>

---

## Definition of Ready — Checklist

- [ ] Format standard (role + action + benefice)
- [ ] 3-5 criteres d'acceptation Gherkin
- [ ] Estimation Fibonacci
- [ ] Pas de dependance bloquante non resolue
- [ ] Fichiers impactes identifies
- [ ] Donnees de test definies
- [ ] Criteres de test automatisable (QA)

---

## Definition of Done — Rappel universel

- [ ] `npm run build` passe
- [ ] `npm run lint` — 0 erreur
- [ ] `npm run test` — tous les tests passent
- [ ] Contenu bilingue FR + EN (si UI)
- [ ] Responsive mobile 375px + desktop 1440px (si UI)
- [ ] Commit conventionnel : `type(scope): description`
- [ ] Aucun secret hardcode

---

## Notes techniques / decisions

<notes facultatives sur l'implementation, les choix d'architecture,
les pieges connus, les liens vers la doc externe, etc.>
