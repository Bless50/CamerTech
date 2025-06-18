# 🔧 Technician Booking Platform

A comprehensive web application that connects customers with verified technicians across multiple service categories including electrical, plumbing, automotive, electronics repair, home improvement, and appliance services.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Testing](#testing)
- [Deployment](#deployment)
- [License](#license)
- [Support](#support)

## ✨ Features

### For Customers
- 🔍 **Smart Search**: Find technicians by service type, location, and availability
- 📅 **Instant Booking**: Real-time scheduling with immediate confirmation
- 💰 **Transparent Pricing**: Clear CFA pricing with no hidden fees
- ⭐ **Rating System**: Review and rate service providers
- 🔒 **Secure Payments**: Multiple payment methods with encryption
- 📱 **Real-time Tracking**: Live updates on service progress
- 🛡️ **Quality Guarantee**: 100% satisfaction guarantee

### For Service Providers
- 📊 **Analytics Dashboard**: Comprehensive performance metrics
- 💼 **Profile Management**: Detailed service provider profiles
- 📈 **Earnings Tracking**: Revenue analytics and financial reporting
- 🎯 **Benchmark Comparisons**: Industry performance comparisons
- 📱 **Mobile Responsive**: Manage business on any device
- 🔔 **Notification System**: Real-time booking alerts
- 💳 **Fast Payments**: 24-hour payment processing

### For Administrators
- 👥 **User Management**: Comprehensive user and provider administration
- 📊 **Platform Analytics**: Detailed business intelligence dashboards
- 🔍 **Provider Verification**: Background check and skill verification system
- 💰 **Financial Oversight**: Revenue tracking and financial reporting
- 🛠️ **Service Management**: Category and service administration
- 📈 **Performance Monitoring**: Real-time platform metrics

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: React Hooks

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js API Routes
- **Database**: PostgreSQL (Neon/Supabase)
- **Authentication**: NextAuth.js
- **File Storage**: Vercel Blob
- **Email**: Resend

### Development Tools
- **Package Manager**: npm/yarn
- **Linting**: ESLint
- **Formatting**: Prettier
- **Type Checking**: TypeScript
- **Version Control**: Git

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** (v2.0.0 or higher)
- **PostgreSQL** (v13.0.0 or higher) - Optional if using cloud database

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/technician-booking-platform.git
   cd technician-booking-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure your environment variables** (see [Environment Setup](#environment-setup))

5. **Run database migrations** (if using local database)
   ```bash
   npm run db:migrate
   # or
   yarn db:migrate
   ```

6. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

7. **Open your browser** and navigate to `http://localhost:3000`

## 🔧 Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/technician_booking"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email Configuration
RESEND_API_KEY="your-resend-api-key"
FROM_EMAIL="noreply@yourdomain.com"

# File Storage
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"

# Payment Processing (Optional)
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"

# AI Features (Optional)
OPENAI_API_KEY="your-openai-api-key"

# Analytics (Optional)
GOOGLE_ANALYTICS_ID="your-ga-tracking-id"
```

### Database Setup Options

#### Option 1: Neon (Recommended)
1. Create account at [Neon](https://neon.tech)
2. Create a new project
3. Copy the connection string to `DATABASE_URL`

#### Option 2: Supabase
1. Create account at [Supabase](https://supabase.com)
2. Create a new project
3. Copy the connection string to `DATABASE_URL`

#### Option 3: Local PostgreSQL
1. Install PostgreSQL locally
2. Create a database named `technician_booking`
3. Update `DATABASE_URL` with your local credentials

## 📖 Usage

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run type checking
npm run type-check

# Format code
npm run format

# Run tests
npm test

# Run database migrations
npm run db:migrate

# Reset database
npm run db:reset

# Generate database client
npm run db:generate
```

### Key URLs

- **Homepage**: `http://localhost:3000`
- **Search Technicians**: `http://localhost:3000/search`
- **Services**: `http://localhost:3000/services`
- **How It Works**: `http://localhost:3000/how-it-works`
- **Admin Dashboard**: `http://localhost:3000/admin`
- **Customer Dashboard**: `http://localhost:3000/dashboard/customer`
- **Provider Dashboard**: `http://localhost:3000/dashboard/technician`

## 📁 Project Structure

```
technician-booking-platform/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   ├── admin/                    # Admin dashboard
│   ├── api/                      # API routes
│   ├── dashboard/                # User dashboards
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/                   # Reusable components
│   ├── ui/                       # shadcn/ui components
│   ├── analytics-dashboard.tsx   # Analytics components
│   ├── booking-modal.tsx         # Booking functionality
│   └── ...                       # Other components
├── lib/                          # Utility functions
│   ├── analytics.ts              # Analytics utilities
│   ├── auth.ts                   # Authentication config
│   ├── currency.ts               # Currency utilities
│   ├── db.ts                     # Database connection
│   └── utils.ts                  # General utilities
├── hooks/                        # Custom React hooks
├── types/                        # TypeScript type definitions
├── public/                       # Static assets
├── scripts/                      # Database scripts
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── tailwind.config.js            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

### Key Directories

- **`app/`**: Next.js 14 App Router with file-based routing
- **`components/`**: Reusable React components organized by feature
- **`lib/`**: Utility functions, database connections, and configurations
- **`hooks/`**: Custom React hooks for shared logic
- **`types/`**: TypeScript type definitions and interfaces
- **`public/`**: Static assets like images, icons, and fonts

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/signin` - User sign in
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signout` - User sign out

### Booking Endpoints

- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/[id]` - Update booking
- `DELETE /api/bookings/[id]` - Cancel booking

### Provider Endpoints

- `GET /api/providers` - Get all providers
- `GET /api/providers/[id]` - Get provider details
- `POST /api/providers` - Create provider profile
- `PUT /api/providers/[id]` - Update provider profile

### Admin Endpoints

- `GET /api/admin/analytics` - Get platform analytics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/[id]` - Update user status

## 🤝 Contributing

We welcome contributions from the community! Please follow these guidelines:

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Write or update tests**
5. **Run the test suite**
   ```bash
   npm test
   ```
6. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```
7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Create a Pull Request**

### Commit Convention

We use [Conventional Commits](https://conventionalcommits.org/) for commit messages:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions or modifications
- `chore:` Maintenance tasks

### Code Style

- Use **TypeScript** for all new code
- Follow **ESLint** and **Prettier** configurations
- Write **meaningful commit messages**
- Add **JSDoc comments** for complex functions
- Ensure **responsive design** for all UI components
- Write **unit tests** for utility functions
- Write **integration tests** for API endpoints

### Pull Request Guidelines

- Provide a clear description of the changes
- Include screenshots for UI changes
- Ensure all tests pass
- Update documentation if necessary
- Link related issues

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- booking.test.ts
```

### Test Structure

- **Unit Tests**: `__tests__/unit/`
- **Integration Tests**: `__tests__/integration/`
- **E2E Tests**: `__tests__/e2e/`

### Writing Tests

```typescript
// Example unit test
import { formatCurrency } from '@/lib/currency'

describe('formatCurrency', () => {
  it('should format CFA currency correctly', () => {
    expect(formatCurrency(1000, 'CFA')).toBe('1,000 CFA')
  })
})
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Deploy automatically** on push to main branch

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Environment Variables for Production

Ensure all environment variables are configured in your deployment platform:

- Database connection strings
- Authentication secrets
- API keys for third-party services
- Domain-specific URLs

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty

## 🆘 Support

### Getting Help

- **Documentation**: Check this README and inline code comments
- **Issues**: Create an issue on GitHub for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Email**: Contact us at support@technicianplatform.com

### Reporting Issues

When reporting issues, please include:

1. **Environment details** (OS, Node.js version, browser)
2. **Steps to reproduce** the issue
3. **Expected behavior**
4. **Actual behavior**
5. **Screenshots** (if applicable)
6. **Error messages** or logs

### Feature Requests

We welcome feature requests! Please:

1. **Check existing issues** to avoid duplicates
2. **Provide detailed description** of the feature
3. **Explain the use case** and benefits
4. **Consider implementation complexity**

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for hosting and deployment platform
- **shadcn/ui** for beautiful UI components
- **Tailwind CSS** for utility-first styling
- **Open Source Community** for inspiration and contributions

## 📊 Project Status

- **Version**: 1.0.0
- **Status**: Active Development
- **Last Updated**: January 2025
- **Maintainers**: 2
- **Contributors**: 5+

---

**Made with ❤️ by the Technician Booking Platform Team**

For more information, visit our [website](https://technicianplatform.com) or follow us on [Twitter](https://twitter.com/technicianplatform).
```

I've created a comprehensive README file that covers all essential aspects of the technician booking platform project. The README includes:

## 📋 **Complete Documentation Coverage:**

### **Project Overview**
- Clear title and description
- Feature highlights for all user types
- Technology stack details
- Project status and metadata

### **Setup Instructions**
- Prerequisites and system requirements
- Step-by-step installation guide
- Environment configuration
- Database setup options (Neon, Supabase, Local)

### **Development Guidelines**
- Project structure explanation
- Available npm scripts
- API documentation
- Testing procedures

### **Contribution Framework**
- Contributing guidelines
- Code style requirements
- Commit conventions
- Pull request process

### **Deployment & Support**
- Deployment instructions for Vercel
- Environment variable configuration
- Support channels and issue reporting
- License information
