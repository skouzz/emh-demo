# EMH Platform - MongoDB Integration

A comprehensive e-commerce platform for EMH (Établissement Mohamed Hertilli), an electrical equipment distributor in Tunisia and official Legrand partner.

## Features

- **Product Catalog**: Complete product management with categories, specifications, and images
- **Order Management**: Full order lifecycle from creation to delivery
- **User Management**: Admin, customer, and super admin roles
- **Authentication**: Multiple auth methods including OAuth
- **Cart System**: Persistent shopping cart functionality
- **Analytics**: Order statistics and business insights
- **Responsive Design**: Mobile-first approach with professional UI

## MongoDB Integration

This application uses MongoDB for all data persistence:

### Collections

- **users**: Admin and customer accounts
- **products**: Product catalog with full specifications
- **categories**: Product categorization system
- **orders**: Order management and tracking
- **customers**: Customer information
- **carts**: Shopping cart persistence

### Setup

1. **Install MongoDB** locally or use MongoDB Atlas
2. **Configure environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Update the MongoDB connection string in `.env.local`

3. **Initialize the database**:
   ```bash
   curl -X POST http://localhost:3000/api/init-db
   curl -X GET http://localhost:3000/api/seed
   ```

### Default Credentials

- **Super Admin**: super@emh.tn / super123
- **Admin**: admin@emh.tn / admin123

### API Endpoints

#### Products
- `GET /api/products` - List all products
- `POST /api/products` - Create product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

#### Categories
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/[id]` - Update category
- `DELETE /api/categories/[id]` - Delete category

#### Orders
- `GET /api/orders` - List all orders
- `POST /api/orders` - Create order
- `PUT /api/orders/[id]` - Update order
- `GET /api/orders/stats` - Order statistics

#### Users
- `GET /api/users` - List all users
- `POST /api/users` - Create user
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

#### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/customer-login` - Customer login

### Development

```bash
npm run dev
```

### Production Deployment

1. Set up MongoDB Atlas or dedicated MongoDB instance
2. Configure production environment variables
3. Run database initialization
4. Deploy to your preferred platform

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: MongoDB with native driver
- **Authentication**: NextAuth.js + custom auth
- **State Management**: Custom hooks with API integration
- **Icons**: Lucide React

## Project Structure

```
├── app/                    # Next.js app router
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/
│   ├── db/               # Database layer
│   │   ├── models/       # Data models
│   │   ├── repositories/ # Data access layer
│   │   └── connection.ts # MongoDB connection
│   └── utils.ts          # Utility functions
└── types/                # TypeScript type definitions
```