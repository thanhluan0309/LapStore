# TechShop — E-Commerce UI/UX

A modern laptop e-commerce storefront built with Next.js 16, React 19, and Tailwind CSS v4. Designed as a fully-featured UI reference implementation covering the complete shopping journey.

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, categories, featured products, brands, testimonials, newsletter |
| `/products` | Product listing page with filtering and grid layout |
| `/products/[id]` | Product detail page — image gallery, specs, add to cart |
| `/cart` | Shopping cart with quantity management |
| `/checkout` | Checkout form and order summary |
| `/order/success` | Order confirmation page |
| `/wishlist` | Saved products |
| `/signin` | Authentication page |

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **State:** React Context API (Cart, Wishlist)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
├── components/
│   ├── home/             # Homepage sections
│   ├── products/         # PLP & PDP components
│   ├── cart/             # Cart page
│   ├── checkout/         # Checkout flow
│   ├── order/            # Order success
│   ├── wishlist/         # Wishlist page
│   ├── auth/             # Sign-in page
│   ├── layout/           # Navbar, Footer
│   └── ui/               # Shared UI components
├── context/              # CartContext, WishlistContext
├── data/                 # Static product & brand data
├── hooks/                # Custom hooks
└── lib/                  # Utilities
```

## Brands

Apple · Asus · Acer · Dell · HP · Lenovo · Microsoft · Razer
