# Inventory Management Information System (InventoryMIS) Web Service

A modern Angular-based web application providing comprehensive inventory management capabilities including product types, purchase orders, sales orders, user management, and dashboard reporting.

## Tech Stack

- **Framework:** Angular 20.3
- **Language:** TypeScript 5.9
- **UI:** Tailwind CSS 4.1
- **State Management:** RxJS 7.8
- **HTTP Client:** Angular HttpClient with Fetch API
- **PDF Generation:** jsPDF, jspdf-autotable, pdfmake
- **Testing:** Jasmine + Karma

## Key Features

- Role-based access control (RBAC)
- JWT authentication with refresh token support
- Dashboard with statistical overview
- Product type management
- Purchase order lifecycle management
- Sales order lifecycle management
- User management
- PDF report generation
- Toast notifications
- Responsive sidebar navigation

## User Roles

| Role | Dashboard | Product Types | Purchase Orders | Sales Orders | User Management |
|------|-----------|---------------|-----------------|--------------|-----------------|
| ADMIN | Yes | Yes | Yes | Yes | Yes |
| MANAGER | Yes | Yes | Yes | Yes | No |
| STOCK_OFFICER | Yes | Yes | Yes | No | No |
| SALES_OFFICER | Yes | No | No | Yes | No |

## Development

First, install dependencies:

```bash
npm install
```

### Development Server

```bash
npm start
```

Open http://localhost:4200. The application auto-reloads on file changes.

### Build

```bash
npm run build
```

Build artifacts will be stored in the `dist/` directory.

### Code Scaffolding

```bash
ng generate component component-name
```

### Testing

```bash
npm test
```

## Project Structure

```
src/app/
  app.config.ts            # App configuration (routing, HTTP, interceptors)
  app.routes.ts            # Route definitions with lazy loading
  app.ts                   # Root component
  environment/
    environment.ts         # Local/UAT API config
    environment-prod.ts    # Production API config
  common/dto/
    inventory/             # DTOs for product types, purchase/sales orders
    usermanagement/        # User and Role DTOs
    report/                # Dashboard and report DTOs
    util/                  # Base DTOs, response wrappers, deserializers
  elements/toast/          # Toast notification component
  components/
    toaster.component.ts   # Toaster wrapper
  services/
    pdf.service.ts         # PDF generation logic
    toaster.service.ts     # Toast notification service
  layout/                  # Main, Auth, Sidebar, Header, Footer layouts
  pages/apps/
    dashboard/             # Dashboard page and service
    inventory/
      product-type/        # Product type management
      purchase-orders/     # Purchase order CRUD + history
      salesOrder/          # Sales order CRUD + history
    security/              # Login, auth guard, HTTP interceptor
    usermanagement/        # User and role management
  public/                  # Static assets
  styles.css               # Global styles
  main.ts                  # Bootstrap file
```

## Architecture

- **Lazy Loading:** All routes use `loadComponent` for code splitting
- **Service Layer:** Each module has dedicated services for API communication
- **DTOs:** Shared data transfer objects in `common/dto/` with generic deserialization
- **HTTP Interceptor:** Attaches JWT tokens and handles 401/403 errors
- **Auth Guard:** Protects private routes
- **Standalone Components:** All components use Angular 20 standalone pattern

## API Configuration

Environments are defined under `src/app/environment/`:

- **Development (local):** `http://207.180.213.111:8081/api/v1`
- **Production:** `http://157.173.97.196:8082/api/v1`

Token whitelist (public endpoints are automatically excluded from interceptor):
- `/security/auth/login`
- `/security/auth/register`

## License

Private - All rights reserved
