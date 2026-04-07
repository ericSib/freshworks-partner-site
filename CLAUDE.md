# Project Instructions

## Git Conventions

### Commit Messages
Format: `type(scope): description` — enforced by commitlint + husky.

**Types**: feat, fix, refactor, test, docs, style, perf, chore, ci

**Scopes**: hero, services, products, process, about, contact, metrics, cases, problems, clients, layout, header, footer, i18n, config, ui, seo, a11y, e2e, ci, deps, redesign

### Rules
1. **1 commit = 1 intention**. Never mix feat + refactor + test in one commit.
2. **Scope is mandatory** for feat, fix, refactor, test.
3. **Body required** when the commit touches 5+ files — explain WHY.
4. **Reference tickets** in footer when applicable: `Closes #XX` or `Refs US-XXX`.
5. **No WIP commits** on main. Squash before merge.
6. **Clean up worktree branches** after merge — delete promptly.

### Pre-commit Hooks
- `commit-msg`: commitlint validates conventional format
- `pre-commit`: next lint (quiet mode)
