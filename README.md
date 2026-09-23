# ShopSphere

ShopSphere is a modern e-commerce storefront built with React, TypeScript, Vite, Tailwind CSS, and Zustand. It includes a customer shopping experience and a lightweight admin console for managing products and orders.

> ShopSphere is currently a front-end demonstration project. Product data, authentication, cart contents, wishlist items, and orders are stored locally in the browser. No production API, database, or payment gateway is connected.

## Features

### Customer storefront

- Responsive home page with featured products and category discovery
- Product catalog with search, filtering, sorting, and pagination
- Product detail pages with image galleries, ratings, pricing, stock information, and related products
- Persistent shopping cart with quantity controls and subtotal calculation
- Wishlist support
- Checkout flow with form validation
- Demo authentication with login, registration, profile, and logout views
- Order history and order detail views
- Accessible navigation, focus states, empty states, loading states, and responsive layouts
- 404 page for unknown routes

### Admin console

- Dashboard with store overview information
- Product management view
- Order management view
- Separate admin layout and route namespace

## Technology Stack

- **React 18** and **TypeScript** for the application UI
- **Vite** for development and production builds
- **React Router** for client-side routing
- **Tailwind CSS** for styling
- **Zustand** for persisted client-side state
- **React Hook Form** and **Zod** for form handling and validation
- **Lucide React** for interface icons
- **Vitest** and **Testing Library** for automated tests

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm 9 or newer

### Installation

```bash
git clone https://github.com/dev-priyanshuyadav/shopsphere.git
cd shopsphere
npm install
```

### Start the development server

```bash
npm run dev
```

Vite will print the local development URL in the terminal, usually `http://localhost:5173`.

### Create a production build

```bash
npm run build
```

### Preview the production build locally

```bash
npm run preview
```

### Run tests

Run the test suite once:

```bash
npm test
```

Run Vitest in watch mode while developing:

```bash
npm run test:watch
```

## Application Routes

### Customer routes

| Route          | Description                        |
| -------------- | ---------------------------------- |
| `/`            | Storefront home page               |
| `/shop`        | Product catalog                    |
| `/product/:id` | Product details                    |
| `/cart`        | Shopping cart                      |
| `/wishlist`    | Saved products                     |
| `/checkout`    | Checkout form and order submission |
| `/login`       | Customer login                     |
| `/register`    | Customer registration              |
| `/orders`      | Order history                      |
| `/profile`     | Customer profile                   |

### Admin routes

| Route             | Description        |
| ----------------- | ------------------ |
| `/admin`          | Admin dashboard    |
| `/admin/products` | Product management |
| `/admin/orders`   | Order management   |

## Project Structure

```text
src/
├── admin/              Admin dashboard, product, and order views
├── components/         Reusable UI grouped by domain
│   ├── cart/
│   ├── common/
│   ├── forms/
│   ├── layout/
│   └── product/
├── hooks/              Shared React hooks
├── layouts/            Customer and admin route layouts
├── pages/              Customer-facing route components
├── services/           Product data service and API helpers
├── store/              Persisted Zustand stores
├── test/               Test setup and shared test configuration
├── types/              Shared TypeScript domain models
└── utils/              Formatting and utility functions
```

## Local Data and Persistence

ShopSphere ships with seeded sample products in `src/services/productService.ts`. The product service simulates asynchronous data access and stores product changes in browser storage.

The following client-side stores are persisted with Zustand:

- Authentication: `shopsphere-auth-storage`
- Cart: `shopsphere-cart-storage`
- Wishlist and order state: managed by the corresponding stores in `src/store/`

To reset the demo state, clear the site data for the local development origin in your browser and reload the application.

## Development Notes

- The checkout flow is for demonstration purposes and does not process real payments.
- Authentication is client-side only and should not be used for real user accounts.
- Product images are loaded from Unsplash URLs, so an internet connection may be required for all product imagery to appear.
- A production deployment should replace the local service and browser storage with a secured API, database, real authentication, server-side authorization, and a payment provider.

## Quality Checks

Before opening a pull request, run:

```bash
npm run build
npm test
```

The build command runs TypeScript checking before generating the Vite production bundle.

## Deployment

ShopSphere can be deployed to any static hosting provider that supports a Vite build, including Vercel, Netlify, GitHub Pages, or Cloudflare Pages. The included `vercel.json` configures the SPA fallback required by React Router.

### Deploy to Vercel

1. Push the project to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and select **Add New Project**.
3. Import the ShopSphere GitHub repository.
4. Keep the detected framework as **Vite**.
5. Confirm these project settings:

- **Install command:** `npm install`
- **Build command:** `npm run build`
- **Output directory:** `dist`

6. Select **Deploy**.

Every new push to the connected production branch will create a new deployment. Vercel preview deployments can be used to review pull requests before merging.

Use the following settings:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Install command:** `npm install`

Because the app uses client-side routing, configure the hosting provider to serve `index.html` as a fallback for application routes such as `/shop` and `/admin`.

## Contributing

1. Create a feature branch from `master`.
2. Make a focused change that follows the existing TypeScript and component patterns.
3. Run `npm run build` and `npm test`.
4. Open a pull request with a concise description of the behavior and verification performed.

## License

No license has been specified for this project yet. Add a license file before distributing ShopSphere or accepting external contributions.
