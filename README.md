# Resumatch

Resumatch is an intelligent resume analysis tool that leverages Google Gemini AI to evaluate how well your resume matches the job description. Upload your resume and a job description as PDF files, and get detailed insights about your fit for the position.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x.x or higher
- **Bun** 1.x.x or higher

## 📦 Installation & setup

### 1. Install dependencies

```bash
bun install
```

### 2. Environment configuration

Create `.env` files in the `apps/frontend` and `apps/backend` directories based on the corresponding `.env.example` files.

### 3. Start development

```bash
# Start all services (frontend + backend)
bun run dev
```

## 📦 Architecture

Resumatch is built as a monorepo using Turborepo, organized into the following structure:

```
resumatch/
├── apps/
│   ├── frontend/          # React + Vite application
│   └── backend/           # Standalone tRPC server
├── packages/
│   ├── api/              # Shared API types and tRPC configuration
│   ├── config-typescript/ # Shared TypeScript configuration
│   └── jest-presets/     # Shared Jest configuration
```

### Technology stack

- **Frontend**: React, Vite, Tailwind CSS, shadcn/ui
- **Backend**: tRPC
- **AI integration**: Google Cloud Vertex AI (Gemini)
- **Type safety**: TypeScript, Zod validation
- **Build tools**: Turborepo, Biome (linting/formatting)
- **Package manager and runtime**: Bun

## 🛠️ Development

### Development workflow

1. **Start development servers**
   ```bash
   bun run dev
   ```

2. **Make changes**
   - Frontend code is in `apps/frontend/src/`
   - Backend code is in `apps/backend/src/`
   - Shared API code is in `packages/api/src/`

3. **Code quality checks**
   ```bash
   bun run format-and-lint:fix
   bun run check-types
   ```

4. **Build for production**
   ```bash
   bun run build
   ```
