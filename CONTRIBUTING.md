# Contributing to Orivon Browser

Thank you for your interest in contributing! This document provides guidelines for contributing to the Orivon Browser project.

## Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read and follow our Code of Conduct.

## How to Contribute

### Reporting Issues

1. **Check existing issues** — Search to see if the issue already exists
2. **Provide details** — Include:
   - What you were trying to do
   - What happened
   - What you expected to happen
   - Steps to reproduce
   - Your environment (Node version, OS, browser)
3. **Add screenshots/logs** — Visual context helps tremendously
4. **Use templates** — If provided, use issue templates

### Suggesting Enhancements

1. **Use the enhancement template** — Make it clear it's a feature request
2. **Explain the use case** — Why is this needed?
3. **Provide examples** — Show how it would be used
4. **Discuss trade-offs** — What are the implications?

### Pull Requests

#### Prerequisites

Before starting work:

1. **Fork the repository** and clone your fork locally
2. **Create a feature branch** from `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feat/your-feature-name
   ```
3. **Link to an issue** — Reference the issue your PR addresses

#### Development Workflow

1. **Install dependencies** and start development:
   ```bash
   npm install
   npm run dev
   ```

2. **Make your changes** — Keep commits small and focused

3. **Test your changes**:
   ```bash
   npm run type-check
   npm run lint
   npm run test
   npm run build
   ```

4. **Write/update tests** — All features should have tests
   - Aim for 60%+ coverage
   - Write tests as you code, not after
   - Use descriptive test names

5. **Update documentation** — If adding features or changing behavior:
   - Update README.md if needed
   - Add inline code comments
   - Update type definitions in contracts

#### Commit Message Guidelines

Follow conventional commits:

```
type(scope): subject

body

footer
```

**Types:**
- `feat` — A new feature
- `fix` — A bug fix
- `test` — Adding tests
- `docs` — Documentation changes
- `style` — Code style/formatting (no functional changes)
- `refactor` — Code refactoring without feature/fix
- `chore` — Build, dependencies, CI config
- `perf` — Performance improvements

**Examples:**

```
feat(dashboard): add app search functionality

Added search bar to dashboard for quick app discovery.
Implemented fuzzy search with keyboard navigation.

Closes #123
```

```
fix(permissions): prevent duplicate permission requests

Fixes issue where same permission could be requested multiple times.
Added request deduplication in permissionsStore.

Closes #456
```

#### Submitting a PR

1. **Push your branch** to your fork
2. **Open a PR** against the `develop` branch
3. **Fill out the PR template** — Provide context and rationale
4. **Wait for CI** — All checks must pass
5. **Respond to feedback** — Maintainers may request changes
6. **Keep commits clean** — Use `git rebase` to clean up history if needed

**PR Title Format:**

```
[Type] Brief description

Examples:
- [Feature] Add dark mode toggle
- [Fix] Correct tab ordering on close
- [Docs] Update adapter integration guide
```

## Code Style

### TypeScript/React

- **Formatting**: Prettier (auto-format with `npm run format`)
- **Linting**: ESLint rules defined in `.eslintrc.json`
- **Naming**: camelCase for variables/functions, PascalCase for components/types
- **Imports**: Use absolute paths with @ alias (see tsconfig.json)

```typescript
// ✅ Good
import { useAppsStore } from '@/renderer/store/appsStore';
import type { AppManifest } from '@/lib/contracts/types';

// ❌ Bad
import { useAppsStore } from '../../../store/appsStore';
```

### Component Structure

```typescript
// ✅ Recommended structure
import React from 'react';
import { useSomeStore } from '@/renderer/store/someStore';
import './ComponentName.css';

interface Props {
  prop1: string;
  prop2?: number;
}

export const ComponentName: React.FC<Props> = ({ prop1, prop2 = 0 }) => {
  const { action } = useSomeStore();

  return (
    <div className="component-name">
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

### Store/Hook Pattern

```typescript
// ✅ Zustand store
export const useMyStore = create<MyState>((set, get) => ({
  state: initialValue,
  action: async () => {
    // Always use set() for updates
    set({ /* updates */ });
  },
}));
```

## Testing Guidelines

### What to Test

- **Adapters** — Mock data validation, error handling
- **Stores** — State updates, async actions
- **Components** — Rendering, user interactions
- **Contracts** — Type validation

### Writing Tests

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('FeatureName', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should do something when condition X', () => {
    // Setup
    const value = setupValue();

    // Act
    const result = performAction(value);

    // Assert
    expect(result).toBe(expectedValue);
  });

  it('should handle errors gracefully', async () => {
    await expect(riskyOperation()).rejects.toThrow();
  });
});
```

### Running Tests

```bash
npm run test          # Run once
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report
```

## Documentation

### Code Comments

- Document **why**, not what (code shows what)
- Use JSDoc for public APIs
- Keep comments up-to-date with code

```typescript
/**
 * Fetch installed apps from the adapter
 * @returns Promise resolving to array of installed apps
 * @throws Error if adapter fails
 */
export async function fetchInstalledApps(): Promise<InstalledApp[]> {
  // ...
}
```

### README & Guides

- Update README.md if adding features
- Add architecture notes if changing structure
- Document adapter implementations

## Performance

- **Minimize bundle size** — Avoid heavy dependencies
- **Optimize re-renders** — Use Zustand selectors correctly
- **Lazy-load** where possible — Code splitting for pages
- **Test performance** — Watch bundle size in CI

## Security

- **Never commit secrets** — Use `.env.example` for templates
- **Validate IPC messages** — Always validate in main process
- **Avoid eval()** — Never execute arbitrary code
- **Review permissions** — Think about what each API needs

## Accessibility

- **Semantic HTML** — Use proper elements
- **ARIA labels** — Add for screen readers
- **Keyboard navigation** — All features usable via keyboard
- **Color contrast** — Ensure readability

## Troubleshooting

### Common Issues

**"Module not found" errors**
- Check import paths use @ alias
- Verify tsconfig.json paths are correct
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

**Tests failing**
- Ensure mocks are set up correctly
- Check async operations complete
- Clear cache: `npm run test -- --clearCache`

**Type errors**
- Run `npm run type-check` to see all errors
- Check TypeScript version matches
- Verify contracts in src/lib/contracts/types.ts

**Linting issues**
- Auto-fix with `npm run lint:fix`
- Run `npm run format` for formatting
- Check .eslintrc.json for rule details

## Questions?

- Check [README.md](README.md) for general info
- See [Implementation Specs](https://docs.orivonstack.com/) for architecture
- Ask in [Discord](https://discord.gg/DuRg87MvgD) #technical-chat
- Open a discussion issue

## License

By contributing, you agree that your contributions will be licensed under the Apache-2.0 License.

---

Thank you for contributing to Orivon Browser! 🚀
