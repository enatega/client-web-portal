# Restaurant Delivery Management System

This project is a Restaurant Delivery Management System built with modern web technologies.

## Technologies Used

- **Next.js 14**
- **TypeScript**
- **UI Libraries**: Next UI, Chakra UI, or Prime React
- **React Icons** (if required)
- **Tailwind CSS**
- **Cypress** for:
  - Component Testing
  - Integration Testing
  - E2E Testing

## Build Size and Performance

- **Page Size**: Must be between 150KB.
- **Critical JS and CSS**: Must be below 100KB.
- **Bundle Analysis**: Use `webpack-bundle-analyzer` as a dev dependency to analyze the bundle.
- **Dynamic Imports**: Use dynamic imports in Next.js.
- **Image Optimization**: Use the `<Image/>` tag of Next.js.

### Performance Metrics

The app must follow the standard render times as follows:

- **First Contentful Paint (FCP)**: Under 1.8 seconds
- **Largest Contentful Paint (LCP)**: Under 2.5 seconds
- **First Input Delay (FID)**: Under 100 milliseconds
- **Time to Interactive (TTI)**: Under 5 seconds
- **Total Blocking Time (TBT)**: Under 300 milliseconds
- **Cumulative Layout Shift (CLS)**: Under 0.1
- **Speed Index (SI)**: Under 4.3 seconds
- **Time to First Byte (TTFB)**: Under 600 milliseconds
- **First Meaningful Paint (FMP)**: Under 2.5 seconds

Use the browser's Lighthouse tool for performance reports.

## Folder Structure

```plaintext
.
├── app
│   └── (routes and layouts)
├── lib
│   ├── hooks
│   │   ├── useAuth.ts
│   │   ├── useConfiguration.ts
│   │   └── index.ts
│   ├── hoc
│   │   ├── withRouteProtection.ts
│   │   ├── withDataRefresh.ts
│   │   └── index.ts
│   ├── services
│   │   ├── support
│   │   │   ├── support.service.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── ui
│   │   ├── components
│   │   ├── layouts
│   │   └── screens
│   ├── methods
│   │   ├── string.sort.ts
│   │   ├── toSentenceCase.ts
│   │   └── index.ts
│   ├── interfaces
│   │   ├── common
│   │   │   ├── IParent.ts
│   │   │   └── index.ts
│   │   ├── support.interface.ts
│   │   └── index.ts
│   ├── constants
│   │   ├── strings
│   │   │   ├── global.strings.ts
│   │   │   └── support.strings.ts
│   │   ├── headers
│   │   │   ├── global.headers.ts
│   │   │   └── support.headers.ts
│   │   └── index.ts
│   ├── types
│   │   └── index.ts
├── CHANGELOG.md
├── tsconfig.json
├── next.config.js
├── package.json
└── README.md
