# G.R. Solutions - Professional Quote Generator

A modern React SPA for construction and renovation quote generation, built with TypeScript and Vite.

## 🚀 Features

- **Quote Generation**: Professional construction quote calculator with VAT calculations
- **Project Gallery**: Before/after photo showcase
- **Contact Management**: Business contact information and forms
- **Invoice Generation**: Simple invoice creation
- **Authentication**: Secure login system
- **PWA Support**: Progressive Web App capabilities
- **Responsive Design**: Mobile-first approach
- **RTL Support**: Hebrew language support
- **Offline Support**: Works without internet connection

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite 7
- **Styling**: CSS with CSS Variables, responsive design
- **Testing**: Vitest, React Testing Library
- **State Management**: React Context + useReducer
- **Routing**: React Router (HashRouter)
- **PWA**: Service Workers, offline support
- **Security**: CryptoJS for data encryption

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

## 🔧 Development

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Fix linting issues
npm run lint:fix

# Clean build directory
npm run clean
```

## 🚀 Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages:

1. Push to `main` or `master` branch
2. GitHub Actions will automatically build and deploy
3. Your site will be available at `https://your-username.github.io/your-repo-name`

### Manual Deployment

```bash
# Build the project
npm run build:prod

# The dist folder contains the built files
# Upload the contents of dist/ to your web server
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Auth/           # Authentication components
│   ├── Loading/        # Loading components
│   ├── PWA/           # PWA-related components
│   └── Quote/         # Quote-specific components
├── context/           # React Context providers
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── styles/            # CSS files
├── test/              # Test files
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── constants/         # Application constants
```

## 🎨 Design System

- **Colors**: Primary (#667eea), Secondary (#764ba2), Accent (#4facfe)
- **Typography**: Hebrew/RTL support with Segoe UI font
- **Spacing**: Consistent spacing scale (xs, sm, md, lg, xl, xxl)
- **Shadows**: Multiple shadow levels for depth
- **Animations**: Smooth transitions and hover effects

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Breakpoints**: 576px, 768px, 992px, 1200px, 1400px
- **Touch-Friendly**: 44px minimum touch targets
- **Galaxy S22 Ultra**: Specific optimizations included

## 🔒 Security Features

- **Data Encryption**: Local storage data encrypted with CryptoJS
- **Authentication**: Password hashing and verification
- **Input Sanitization**: XSS protection
- **Rate Limiting**: Built-in rate limiting utilities

## ⚡ Performance Optimizations

- **Lazy Loading**: Components loaded on demand
- **Memoization**: useMemo and useCallback usage
- **Debouncing**: Input debouncing for better performance
- **Virtual Scrolling**: For large lists
- **Image Optimization**: Lazy image loading

## 🌐 PWA Features

- **Service Worker**: Offline functionality
- **Install Prompt**: App installation support
- **Offline Detection**: Network status monitoring
- **Background Sync**: Data synchronization

## 📊 Business Logic

- **Quote Calculations**: VAT calculations, totals
- **Project Management**: Before/after photo galleries
- **Client Management**: Contact information storage
- **Invoice Generation**: Simple invoice creation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**G.R. Solutions**
- Email: Zurapapismedov@gmail.com
- Phone: 054-582-0008
- Address: גולדברג הנדבן 14, ראשון לציון

## 🆘 Support

For support, email Zurapapismedov@gmail.com or call 054-582-0008.
