# AINC Contract Worker Tracker

This is a [Next.js](https://nextjs.org/) project designed for tracking contract workers. It uses modern React practices and a variety of tools for enhanced development experience.

## Project Structure

```
src/
├── api/ #All the server calls goes here
│   ├── contract-worker/
│   ├── service-contract/
│   ├── index.ts
│   ├── login.ts
│   └── me.ts
├── app/ #All the routes goes here
│   ├── (app)/
│   ├── (auth)/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/ #All the build blocks of UI goes here
│   ├── __tests__/ # Unit tests goes here
│   ├── block/ # The UI thats been made from putting to geather multiple "ui" parts goes here. eg: LoginForm, Contract-worker-table.
│   ├── provider/ # All the context providers in the App goes here.
│   └── ui/ # Basic parts of UI that will shared between "Blocks" goes here eg: Button, Input
├── lib/
│   ├── unit-test/ #All the utils for unit tests goes here.
│   └── utils.ts #All the app utils goes here like "isServer"
└── state/ #All the state of the app goes here
```

## Getting Started

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/suryababus/intuit-contract-work-management.git
cd ainc-contract-worker-tracker
npm install
```

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode
- `npm run build`: Builds the app for production
- `npm start`: Runs the built app in production mode
- `npm run lint`: Lints the codebase
- `npm test`: Runs the test suite
- `npm run test:watch`: Runs the test suite in watch mode
- `npm run test:coverage`: Runs the test suite with coverage reporting

## Development

To run the development server:

```bash
npm run dev
```

Note: Make sure you are running local backend server or change the env variable 'NEXT_PUBLIC_BE_URL' to point the production server.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Testing

Run unit tests with:

```bash
npm test
```

For watch mode:

```bash
npm run test:watch
```

For coverage report:

```bash
npm run test:coverage
```

Tests are configured to collect coverage from all TypeScript and TypeScript React files in the `src` directory.

## Key Dependencies

- React 18
- Next.js 14.2.5
- @tanstack/react-query: For data fetching and caching
- axios: For HTTP requests
- react-hook-form: For form handling
- zod: For schema validation
- zustand: For state management
- @radix-ui: For accessible UI components
- tailwindcss: For styling

## Development Dependencies

- TypeScript
- Jest and React Testing Library: For testing
- ESLint: For code linting
- Tailwind CSS: For Building tailwind css file

## Styling

The project uses Tailwind CSS for styling. Global styles are defined in `src/app/globals.css`.

## Configuration Files

- `.env.local`: Environment variables (not tracked in git)
- `.eslintrc.json`: ESLint configuration
- `.gitignore`: Git ignore file

## Learn More

To learn more about the technologies used in this project, refer to their documentation:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Deployment

1. Run "npm run build" to generate an optimized production build.
2. Once build is generated, run "npm run start" to serve the build.
