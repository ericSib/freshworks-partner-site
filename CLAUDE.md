# CLAUDE.md — Constitution Freshworks Partner Site

> **Ce fichier est auto-charge par Claude Code a chaque session.** Il fixe les regles non negociables et la procedure obligatoire de demarrage de session.

---

## Ancrage — Manifeste Agile

**Ce projet est gouverne par le Manifeste Agile.** Les 4 valeurs et les 12 principes sont non negociables. Toute regle de ce fichier, tout workflow de `docs/PROCESS.md`, et toute decision de refinement sont subordonnes a eux.

### Les 4 valeurs, appliquees au projet WaS

| Valeur Agile | Traduction WaS |
|---|---|
| **Individus et echanges > processus et outils** | Refinement Three Amigos en premier, backlog en second. Le dialogue PO-Dev-QA prime sur la documentation. |
| **Produit fonctionnel > documentation plethorique** | Le KPI est un **site qui genere des leads** (RDV Calendly, formulaire, quiz ITSM). Chaque sprint se termine par une demo sur le site reel, jamais par un status report. |
| **Collaboration du client > negociation du contrat** | Le PO (Eric Sib) est **co-constructeur** a chaque iteration. Le stakeholder valide en conditions reelles des le Sprint 1. |
| **Reactivite au changement > suivi d'un plan** | Le Sprint Goal engage, la liste des stories est un forecast. Les feature flags permettent de pivoter a chaud. Une decision PO peut remonter le backlog a tout moment via la boucle universelle. |

### Les 12 principes, traduits en regles operationnelles

1. **Satisfaction client par livraison precoce et continue** → Demo obligatoire a chaque Sprint Review (tous les 7 jours). Aucun sprint ne se termine sans livraison fonctionnelle testee en production.
2. **Accueillir le changement meme tardif** → Aucune regle de « freeze » de backlog. Un arbitrage PO peut reorganiser le sprint en cours dans la limite du Sprint Goal.
3. **Livraison frequente (1 semaine cible)** → Cadence sprint 1 semaine **stricte**. Pas de sprint de 2 semaines « parce que c'est complexe ».
4. **Collaboration quotidienne metier x dev** → L'equipe 3 Amigos (PO/Dev/QA) collabore a chaque session. Le refinement Three Amigos materialise les 3 chapeaux.
5. **Personnes motivees, environnement et soutien** → Rythme soutenable. Mieux vaut reporter une story que bruler.
6. **Face-a-face = canal le plus efficace** → Le « face-a-face » se traduit par le **refinement Three Amigos** ou les 3 chapeaux dialoguent explicitement, ainsi que par la **demo live** de la Sprint Review.
7. **Produit qui fonctionne = meilleur indicateur de progres** → Le progres se mesure en Sprint Goal atteint + demo live qui fonctionne sans bricolage.
8. **Rythme soutenable indefiniment** → Capacite Sprint ≤ 20 SP. Si Sprint N deborde, report en Sprint N+1.
9. **Excellence technique et qualite de conception** → Quality gates non negociables : coverage ≥ 70 %, axe-core WCAG 2.1 AA, Lighthouse ≥ 90, TDD strict.
10. **Simplicite = maximiser le travail a NE PAS faire** → YAGNI strict. Le site est un vitrine lead-gen, pas un SaaS.
11. **Meilleures architectures issues d'equipes auto-organisees** → Les skills (PO, dev-*, qa-*) portent chacun une expertise. Claude Code + Eric = equipe auto-organisee.
12. **Reflexion reguliere et ajustement** → Retrospective systematique a chaque fin de sprint. Chaque insight Keep/Drop/Try entre dans la boucle universelle.

**Regle de souverainete** : si un workflow de `docs/PROCESS.md` ou une regle de ce fichier entre en conflit avec une valeur ou un principe du Manifeste, c'est le Manifeste qui prime. Le conflit est remonte au PO et resolu via la boucle universelle.

---

## Procedure obligatoire de demarrage de session

**AVANT toute action productive (code, refinement, maquette, decision), je DOIS :**

1. **Lire** [`CLAUDE.md`](CLAUDE.md) — constitution, regles immuables
2. **Lire** [`docs/PROCESS.md`](docs/PROCESS.md) — process et workflows du projet
3. **Lire** [`docs/PO-CADRAGE.md`](docs/PO-CADRAGE.md) — vision produit, KPIs, personas, stack
4. **Lire** le **sprint en cours** dans [`docs/backlog/sprint-current.md`](docs/backlog/sprint-current.md) — Sprint Goal + stories engagees
5. **Lire** le **dernier refinement** dans [`docs/refinement/`](docs/refinement/) — decisions actees, red flags
6. **Verifier l'etat Git** (branche, commits WIP, status)

**Je ne commence a travailler qu'apres ces 6 lectures.** Si l'une de ces references n'existe pas ou n'est pas a jour, je le signale au PO avant d'avancer.

---

## Carte du projet (ou vivent les choses)

| Tu cherches... | Ouvre... |
|---|---|
| Vision, KPIs, personas, stack, charte graphique | `docs/PO-CADRAGE.md` |
| Process pour une situation donnee | `docs/PROCESS.md` |
| Detail d'une User Story (AC, estimation, notes) | `docs/stories-ready/US-XX.Y.md` |
| Template story standard | `docs/stories-ready/_TEMPLATE.md` |
| Sprint en cours (Sprint Goal, stories) | `docs/backlog/sprint-current.md` |
| Arbitrages PO (decisions D1, D2...) | `docs/refinement/*.md` |
| Config centralisee (site, navigation, images) | `src/config/` |
| Sections homepage | `src/components/sections/` |
| Layout (Header, Footer) | `src/components/layout/` |
| Messages i18n | `src/messages/{fr,en}.json` |
| API routes (contact, quiz) | `src/app/api/` |
| Instructions projet (ce fichier) | `CLAUDE.md` |
| Entry point humain | `README.md` |

---

## Regles immuables

Ces regles ne sont jamais negociables pendant une session. Toute demande qui les contredit doit declencher une pause et une question au PO.

### Scope

1. **Le scope est un site vitrine lead-gen** — pas un SaaS, pas une app. Toute demande d'ajout d'un module applicatif (dashboard, auth, base de donnees) va dans le backlog Phase 2, jamais dans le sprint en cours.
2. **Bilingue FR/EN obligatoire** — tout contenu UI passe par `next-intl` et les fichiers `src/messages/{fr,en}.json`. Aucun texte hardcode dans les composants.
3. **La charte graphique WaS est la source de verite design** — Orange #f49962, Navy #132338, DM Sans (body), Plus Jakarta Sans (headings). Pas de deviation sans arbitrage PO.

### Qualite

4. **TDD strict** — tests ecrits AVANT l'implementation. Un test ecrit apres le code est souvent tautologique.
5. **Coverage ≥ 70 %** sur l'ensemble du projet (seuil CI actuel). Coverage ≥ 80 % sur le nouveau code d'une story.
6. **axe-core WCAG 2.1 AA** — 0 violation critique/serieuse sur chaque page touchee.
7. **Lighthouse ≥ 90** sur les 4 categories (Performance, Accessibility, Best Practices, SEO).
8. **Responsive mobile-first** — breakpoints 375px (mobile) → 768px (tablet) → 1440px (desktop).
9. **Build + lint + tests doivent passer** avant tout merge sur main.

### Securite et conformite

10. **Aucun secret en clair dans le code ou les logs** — utiliser les variables d'environnement (.env.local / GitHub Actions secrets).
11. **RGPD** — pas de cookie analytics sans consentement. Pas de tracking avant acceptation.
12. **Emails** — envoi uniquement via Resend (domaine verifie). Pas de SMTP direct.

### Methode

13. **Conventional Commits** — `type(scope): description`, enforced par commitlint + husky.
14. **1 commit = 1 intention** — ne jamais mixer feat + refactor + test dans un meme commit.
15. **Scope obligatoire** pour feat, fix, refactor, test.
16. **Body requis** quand le commit touche 5+ fichiers — expliquer POURQUOI.
17. **Reference tickets** dans le footer : `Closes #XX` ou `Refs US-XXX`.

**Types** : feat, fix, refactor, test, docs, style, perf, chore, ci

**Scopes** : hero, services, products, process, about, contact, metrics, cases, problems, clients, layout, header, footer, i18n, config, ui, seo, a11y, e2e, ci, deps, redesign, quiz, api, hubspot

### Pre-commit Hooks

- `commit-msg` : commitlint validates conventional format
- `pre-commit` : next lint (quiet mode)

---

## Boucle universelle — Event → Refinement → Backlog

**Toute situation, sans exception, suit la meme boucle** :

```
EVENEMENT  →  REFINEMENT THREE AMIGOS  →  UPDATE BACKLOG
(quel qu'il soit)  (PO + Dev + QA)        (fichiers concernes)
```

**Regle immuable** : aucun evenement ne va directement modifier le backlog sans passer par une session de refinement Three Amigos, meme minimale. Le refinement est le **seul point d'entree** autorise pour modifier le backlog.

Detail complet : voir [`docs/PROCESS.md`](docs/PROCESS.md) section 2.

---

## Rituels de sprint (cadence 1 semaine)

Chaque sprint suit strictement les 4 rituels suivants :

```
1. SPRINT PLANNING  (Jour 1 matin)
   • Lecture du refinement preparatoire
   • Formulation du Sprint Goal
   • Selection des stories engagees (forecast)
   • Output : sprint-current.md

2. DEVELOPPEMENT + AUTO-DAILY  (Jours 1-6)
   • TDD strict (tests AVANT implementation)
   • Commits conventional, branches < 1 jour
   • Quality gates a chaque merge

3. SPRINT REVIEW  (Jour 7 matin)
   • Demo live sur le site reel (Vercel preview ou production)
   • Verification Sprint Goal atteint oui/non

4. SPRINT RETROSPECTIVE  (Jour 7 apres-midi)
   • Keep / Drop / Try
   • Chaque insight → boucle universelle
```

Detail complet : voir [`docs/PROCESS.md`](docs/PROCESS.md) section 4.

---

## Journal des arbitrages majeurs

> Mise a jour a chaque nouvelle decision structurante.

| Date | ID | Decision | Impact |
|---|---|---|---|
| 2026-04-05 | D1 | Stack Next.js 15 + Tailwind + next-intl | Lock tech |
| 2026-04-05 | D2 | Charte WaS : orange #f49962, navy #132338 | Lock design |
| 2026-04-05 | D3 | CRM HubSpot (API v3 gratuite) + Resend pour emails | Lock integrations |
| 2026-04-05 | D4 | Fonts web : Plus Jakarta Sans (headings) + DM Sans (body) | Fallback Futura STD |
| 2026-04-12 | D5 | HubSpot Private App + 11 proprietes quiz custom creees | Quiz lead pipeline |
| 2026-04-12 | D6 | Resend domaine verifie + cle API en GitHub Actions secrets | Email transactionnel |
| 2026-04-12 | D7 | GA4 Measurement ID en GitHub Actions secrets | Analytics |
| 2026-04-12 | D8 | Adoption framework agile complet (Manifeste, boucle universelle, TDD strict) | Gouvernance projet |
| 2026-04-12 | D9 | **Pas de Freshchat** — pas d'integration chat sur le site | Scope reduit |
| 2026-04-12 | D10 | **Blog : Ghost a explorer** — spike CMS headless avant implementation | Architecture blog |
| 2026-04-12 | D11 | **Pas de ROI Calculator** — le quiz suffit comme lead magnet unique | Scope reduit |
| 2026-04-12 | D12 | **Page pricing : "Sur devis"** — pas d'affichage de prix | Positionnement |
| 2026-04-12 | D13 | **Resend DNS configure** — domaine verifie | Ops done |
| 2026-04-12 | D14 | **Domaine custom : freshworks.whataservice.fr** — remplace le domaine Vercel par defaut | Ops a configurer |

---

## Situations ou je pause et je demande

Je dois **obligatoirement pauser et demander confirmation au PO** quand :

- Une story atteint ou depasse 8 story points (trop grosse pour un sprint d'1 semaine)
- Une demande contredit une regle immuable ci-dessus
- Un red flag du refinement reste ouvert sans resolution
- Un test flaky apparait 3 fois de suite sur le meme parcours
- Un changement d'architecture structurel est envisage
- Une decision RGPD ou securite est en jeu
- Une nouvelle dependance npm est necessaire (ajout, suppression, upgrade majeur)
- Un secret est demande dans du code autre que les variables d'environnement
- Le scope depasse le site vitrine (ajout de fonctionnalites SaaS/app)
- Un quality gate echoue 3 fois de suite sur la meme story
- Une API tierce change de comportement (HubSpot, Resend, GA4)

---

## Commandes utiles

```bash
npm run dev              # Demarre Next.js en mode developpement
npm run build            # Build de production
npm run lint             # ESLint
npm run test             # Vitest (tests unitaires + integration)
npm run test:coverage    # Vitest avec rapport de couverture
npx playwright test      # Playwright E2E (104 tests)
```

---

## KPI d'activation — la seule vraie mesure du succes

| KPI | Cible | Mesure |
|---|---|---|
| Taux de conversion visiteur → lead | > 3% | Vercel Analytics |
| Prises de RDV Calendly | > 5/mois | Dashboard Calendly |
| Soumissions formulaire contact | > 10/mois | HubSpot CRM |
| Completion quiz ITSM maturity | > 20% des visiteurs quiz | GA4 events |
| Lighthouse Performance Score | > 90 (4 categories) | Lighthouse CI |
| Coverage tests | ≥ 70% global, ≥ 80% nouveau code | Vitest |
| Suite E2E | 100% pass (0 flaky) | Playwright |

**Si une decision mine ces KPIs, elle est a revoir.**

---

*Derniere mise a jour : 12 avril 2026 · Version 2.0*
