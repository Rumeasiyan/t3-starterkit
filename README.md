# Modern T3 Stack Starter Kit

A powerful, type-safe starter kit built with the T3 Stack, featuring Next.js 15, tRPC, Prisma, and a comprehensive suite of development tools.

## 📋 Features

- **Core Technologies**

  - Next.js 15 with App Router
  - TypeScript for Type Safety
  - tRPC for End-to-End Type-Safe APIs
  - Prisma ORM for Database Management
  - NextAuth.js for Authentication
  - Tailwind CSS for Styling
  - Radix UI for Accessible Components
  - React Query for Data Fetching

- **Development Tools**
  - ESLint for Code Linting
  - Prettier for Code Formatting
  - Husky for Git Hooks
  - Commitlint for Conventional Commits
  - TypeScript Strict Mode
  - Tailwind CSS Configuration
  - PostCSS Processing

## 🔧 Requirements

- Node.js 18+
- npm 10+
- Database (Compatible with Prisma)

## ⚡ Quick Start

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-folder>
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Set up the database:

```bash
# Generate Prisma Client
npm run db:generate

# Push the database schema
npm run db:push
```

5. Start the development server:

```bash
npm run dev
```

## 🚀 Development

### Available Scripts

```bash
# Development
npm run dev         # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run preview    # Preview production build

# Database
npm run db:generate  # Generate Prisma client
npm run db:push     # Push schema to database
npm run db:studio   # Open Prisma Studio

# Code Quality
npm run check       # Run all checks
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint issues
npm run format:check # Check formatting
npm run format:write # Fix formatting
npm run typecheck   # Check TypeScript
```

### Code Quality Tools

The project includes:

- ESLint with Next.js and TypeScript configurations
- Prettier for code formatting
- TypeScript in strict mode
- Husky for Git hooks
- Commitlint for conventional commits

### Database Management

Prisma is configured for database management:

- Type-safe database queries
- Schema migrations
- Database seeding
- Prisma Studio for GUI database management

### API Development

tRPC provides:

- End-to-end type safety
- Automatic API documentation
- Integrated with React Query
- Type-safe API routes

### Authentication

NextAuth.js is set up with:

- Multiple authentication providers
- Session management
- Protected routes
- Type-safe authentication

### UI Components

- Radix UI for accessible components
- Tailwind CSS for styling
- Custom component library
- Dark mode support

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) file for details.

## 👏 Credits

This project was bootstrapped with [create-t3-app](https://create.t3.gg/), the best way to start a full-stack, typesafe Next.js app.

Enhanced and maintained by [Rumeasiyan](https://github.com/rumeasiyan) with additional features and optimizations.

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
