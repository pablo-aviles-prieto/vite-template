# React + TypeScript + Vite Template

A modern, production-ready React boilerplate with TypeScript, Tailwind CSS, and a complete testing setup.

## 🚀 Features

- ⚡️ **Vite** - Next generation frontend tooling
- ⚛️ **React 19** - Latest React with TypeScript
- 🎨 **Tailwind CSS v4** - Utility-first CSS framework
- 🧪 **Vitest** - Fast unit testing with React Testing Library
- 🎭 **Playwright** - Reliable end-to-end testing
- 🔍 **Biome** - Fast linter and formatter (with Ultracite config)
- 🐕 **Husky** - Git hooks for quality checks
- 📝 **Commitlint** - Enforce conventional commit messages
- 🔄 **GitHub Actions** - Automated CI/CD workflows

## 📋 Prerequisites

- Node.js (LTS version)
- pnpm (recommended package manager)

```bash
npm install -g pnpm
```

## 🛠️ Getting Started

### 1. Use this template

Click the "Use this template" button on GitHub or clone the repository:

```bash
git clone <your-repo-url>
cd <your-project-name>
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Start development server

```bash
pnpm dev
```

Visit [http://localhost:5173](http://localhost:5173) to see your app.

## 📜 Available Scripts

### Development

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally

### Code Quality

- `pnpm lint` - Run Biome linter
- `pnpm lint:fix` - Fix linting issues automatically

### Testing

#### Unit Tests (Vitest)

- `pnpm test:unit` - Run unit tests once
- `pnpm test:unit:watch` - Run tests in watch mode
- `pnpm test:unit:ui` - Open Vitest UI
- `pnpm test:unit:coverage` - Generate coverage report

#### E2E Tests (Playwright)

- `pnpm test:e2e` - Run E2E tests
- `pnpm test:e2e:ui` - Open Playwright UI
- `pnpm test:e2e:headed` - Run tests in headed mode
- `pnpm test:e2e:report` - Show test report
- `pnpm test:e2e:ui:headed:debug` - Debug tests with UI

## 🧪 Testing Setup

### Unit Testing

Unit tests use **Vitest** with **React Testing Library** and run in a jsdom environment.

Example test location: `src/__tests__/`

```typescript
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '@/app';

describe('App', () => {
  it('renders correctly', () => {
    const { getByText } = render(<App />);
    expect(getByText('Hello world')).toBeInTheDocument();
  });
});
```

### E2E Testing

E2E tests use **Playwright** and run in a real Chromium browser.

Example test location: `e2e/`

```typescript
import { test, expect } from '@playwright/test';

test('has correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('react-template');
});
```

## 🔧 Git Hooks

This template uses Husky to enforce quality checks before commits:

- **Pre-commit**: Runs Biome linter
- **Commit-msg**: Validates commit message format (conventional commits)

### Commit Message Format

```
type(scope?): subject

Examples:
- feat: add user authentication
- fix(ui): resolve button alignment issue
- docs: update README with testing instructions
```

Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`, `revert`

## 🚀 GitHub Actions

Two workflows are configured:

### 1. Code Quality (`code-quality.yml`)

Runs on every push and PR:
- Lints code with Biome

### 2. Tests (`tests.yml`)

Runs on every push and PR:
- Unit tests with Vitest
- E2E tests with Playwright (Chromium only)

## 🏗️ Project Structure

```
.
├── e2e/                  # Playwright E2E tests
├── src/
│   ├── __tests__/       # Vitest unit tests
│   ├── app.tsx          # Main App component
│   └── main.tsx         # Application entry point
├── .github/
│   └── workflows/       # GitHub Actions
├── playwright.config.ts # Playwright configuration
├── vitest.config.ts     # Vitest configuration
├── biome.json           # Biome configuration
└── tailwind.config.ts   # Tailwind configuration
```

## 🎨 Styling

This template uses **Tailwind CSS v4** with the Vite plugin for optimal performance.

```tsx
// Example usage
<div className="flex items-center justify-center min-h-screen">
  <h1 className="text-4xl font-bold text-blue-600">
    Hello World
  </h1>
</div>
```

## 📦 Tech Stack

| Category | Tool | Version |
|----------|------|---------|
| Framework | React | 19.1.1 |
| Build Tool | Vite | 7.1.7 |
| Language | TypeScript | 5.9.3 |
| Styling | Tailwind CSS | 4.1.14 |
| Linting | Biome | 2.2.6 |
| Unit Testing | Vitest | 3.2.4 |
| E2E Testing | Playwright | 1.56.1 |
| Git Hooks | Husky | 9.1.7 |
| Package Manager | pnpm | 9.x |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/)
- [Playwright](https://playwright.dev/)
- [Biome](https://biomejs.dev/)

---

**Happy coding!** 🎉