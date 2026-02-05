# Contributing

Contributions are welcome **within the boundaries of the system**.

TUI follows a strict, token-driven architecture. All contributions must respect locked layers, token ownership rules, and canonical constraints. Architectural discussions take precedence over visual changes.

**Before contributing:**

- Read the architecture and release process:
  - [Documentation Hub](docs/README.md) — canonical documentation index
  - [Architecture Context](docs/ARCHITECTURE_CONTEXT.md) — architecture, Foundation vs Extension rules
  - [Release Process](docs/RELEASE_PROCESS.md) — semantic-release, CI publish, no manual edits

**Commit discipline:** Use Conventional Commits. Releases are cut automatically from commit history after merges to `main`.

**Release discipline:** Version and CHANGELOG changes must go through the automated release process. Manual edits to `package.json` version, CHANGELOG, or git tags are forbidden.

For detailed workflows and checklists, see the documentation in `docs/`.
