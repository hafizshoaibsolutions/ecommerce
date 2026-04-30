<!-- COMPONENT DOCUMENTATION -->

# E-Commerce Component Library

This document provides an overview of all the components built for the e-commerce application based on the visual UI diagram.

## 📦 Available Components

### 1. **HeroSection** (`HeroSection.js`)
- **Purpose**: Main landing page hero with featured product showcase
- **Features**:
  - Left: Title, description, dual CTAs (Shop Now, Explore Collection)
  - Right: Product image with gradient background
  - Feature cards: Free Shipping, Easy Returns, Secure Payment
  - Fully responsive design
- **Usage**: Import and place on home page layout
```jsx
import HeroSection from '@/components/HeroSection';
<HeroSection />
```

---

### 2. **CategorySection** (`categorySection.js`)
- **Purpose**: Display product categories in a grid layout
- **Features**:
  - 4-column grid on desktop, responsive on mobile
  - Category cards with hover effects
  - Fetches categories from API
  - Fallback mock data included
- **Usage**:
```jsx
import CategorySection from '@/components/categorySection';
<CategorySection />
```

---

### 3. **FeaturedProducts** (`FeaturedProducts.js`)
- **Purpose**: Showcase best-selling and featured products
- **Features**:
  - Product grid with image, name, rating, price
  - Quick action buttons (View, Add to Cart)
  - Sale badge support
  - Star ratings with review count
  - API integration with fallback data
- **Usage**:
```jsx
import FeaturedProducts from '@/components/FeaturedProducts';
<FeaturedProducts />
```

---

### 4. **PromoBanner** (`PromoBanner.js`)
- **Purpose**: Limited-time promotional offer display
- **Features**:
  - Eye-catching gradient background
  - Bold "UP TO 50% OFF" messaging
  - Floating icons and decorative elements
  - Call-to-action button
  - Responsive two-column layout
- **Usage**:
```jsx
import PromoBanner from '@/components/PromoBanner';
<PromoBanner />
```

---

### 5. **WhyChooseUs** (`WhyChooseUs.js`)
- **Purpose**: Display key value propositions
- **Features**:
  - 4 feature cards with icons
  - Hover animation effects
  - Topics: Free Shipping, Easy Returns, Secure Payment, 24/7 Support
  - Icon from lucide-react
- **Usage**:
```jsx
import WhyChooseUs from '@/components/WhyChooseUs';
<WhyChooseUs />
```

---

### 6. **Testimonials** (`Testimonials.js`)
- **Purpose**: Social proof with customer reviews
- **Features**:
  - 3-column card layout
  - Star ratings
  - Customer avatar, name, role
  - Quote testimonial text
  - Responsive design
- **Usage**:
```jsx
import Testimonials from '@/components/Testimonials';
<Testimonials />
```

---

### 7. **Newsletter** (`Newsletter.js`)
- **Purpose**: Email subscription component
- **Features**:
  - Email input field
  - Subscribe button
  - Success message display
  - Privacy disclaimer
  - Gradient purple background
  - Form validation
- **Usage**:
```jsx
import Newsletter from '@/components/Newsletter';
<Newsletter />
```

---

### 8. **Footer** (`Footer.js`)
- **Purpose**: Website footer with links and information
- **Features**:
  - Logo and brand description
  - 4 link columns (Quick, Support, Company, Legal)
  - Social media icons
  - Contact information (address, phone, email)
  - Payment methods display
  - Copyright information
- **Usage**:
```jsx
import Footer from '@/components/Footer';
<Footer />
```

---

### 9. **ProductDetail** (`ProductDetail.js`)
- **Purpose**: Individual product page with all details
- **Features**:
  - Large product images with gallery
  - Price display with compare-at pricing
  - Color and size selection
  - Quantity selector with +/- buttons
  - Add to cart button
  - Heart (wishlist) button
  - Share button
  - Key features list
  - Star rating with reviews
- **Usage**:
```jsx
import ProductDetail from '@/components/ProductDetail';
<ProductDetail product={productData} />
```

---

### 10. **CartSection** (`CartSection.js`)
- **Purpose**: Shopping cart page
- **Features**:
  - List of cart items with image, name, price
  - Quantity adjustment
  - Remove item button
  - Order summary sidebar
  - Subtotal, shipping, tax, total calculation
  - Free shipping indicator
  - Proceed to checkout button
- **Usage**:
```jsx
import CartSection from '@/components/CartSection';
<CartSection />
```

---

### 11. **CheckoutSection** (`CheckoutSection.js`)
- **Purpose**: Multi-step checkout process
- **Features**:
  - Step indicator (3 steps)
  - Step 1: Shipping address form
  - Step 2: Shipping method selection
  - Step 3: Payment information
  - Order summary sidebar
  - Back/Next navigation
  - Security badge
- **Usage**:
```jsx
import CheckoutSection from '@/components/CheckoutSection';
<CheckoutSection />
```

---

### 12. **AuthLayout** (`AuthLayout.js`)
- **Purpose**: Login and Signup authentication component
- **Features**:
  - Toggle between login/signup modes
  - Email and password inputs
  - Name field (signup only)
  - Confirm password (signup only)
  - Remember me checkbox (login only)
  - Forgot password link (login only)
  - Show/hide password toggle
  - Social login buttons (Google, Facebook)
  - Form validation
- **Usage**:
```jsx
import AuthLayout from '@/components/AuthLayout';
<AuthLayout mode="login" />
// or
<AuthLayout mode="signup" />
```

---

### 13. **AboutSection** (`AboutSection.js`)
- **Purpose**: About page with company information
- **Features**:
  - Hero image
  - Company description
  - Stats display (50K customers, 25+ countries, etc.)
  - Core values section with 4 value cards
  - Team section
  - Responsive grid layout
- **Usage**:
```jsx
import AboutSection from '@/components/AboutSection';
<AboutSection />
```

---

### 14. **ContactSection** (`ContactSection.js`)
- **Purpose**: Contact page with form and information
- **Features**:
  - Contact information cards (Email, Phone, Address, Hours)
  - Contact form with validation
  - Success message display
  - Embedded Google Map
  - FAQ section with 4 common questions
  - Email, phone, address, hours display
- **Usage**:
```jsx
import ContactSection from '@/components/ContactSection';
<ContactSection />
```

---

### 15. **UserDashboard** (`UserDashboard.js`)
- **Purpose**: User account management page
- **Features**:
  - Tabbed interface (Profile, Orders, Addresses, Security)
  - Profile information display
  - Order history table with status
  - Saved addresses management
  - Change password form
  - Two-factor authentication settings
  - User sidebar with navigation
- **Usage**:
```jsx
import UserDashboard from '@/components/UserDashboard';
<UserDashboard />
```

---

### 16. **ShopPage** (`ShopPage.js`)
- **Purpose**: Product listing page with filters
- **Features**:
  - Sidebar filters (Category, Price range, Rating)
  - Sort dropdown (Popular, Price, Rating, Newest)
  - Product grid display
  - Category filtering
  - Price range slider
  - Product cards with image, name, rating, price
  - Quick action buttons
  - Pagination
  - Responsive mobile-friendly design
- **Usage**:
```jsx
import ShopPage from '@/components/ShopPage';
<ShopPage />
```

---

## 🎨 Design System

### Colors
- **Primary**: Purple (#7C3AED)
- **Secondary**: Gray scale
- **Accent**: Green, Red for status
- **Background**: White, Gray-50

### Typography
- **Headings**: Bold, sizes from h2 to h6
- **Body**: Regular gray-700
- **Meta**: Small gray-600

### Components Library
- **Icons**: lucide-react (npm install lucide-react)
- **Styling**: Tailwind CSS
- **Form Elements**: Custom styled inputs

---

## 📋 Setup Instructions

### 1. Install Dependencies
```bash
npm install lucide-react
npm install axios  # for API calls
```

### 2. Create Home Page Layout
```jsx
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/categorySection';
import FeaturedProducts from '@/components/FeaturedProducts';
import PromoBanner from '@/components/PromoBanner';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <PromoBanner />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  );
}
```

### 3. Create Shop Page
```jsx
import ShopPage from '@/components/ShopPage';
import Footer from '@/components/Footer';

export default function Shop() {
  return (
    <>
      <ShopPage />
      <Footer />
    </>
  );
}
```

### 4. Create Product Detail Page
```jsx
import ProductDetail from '@/components/ProductDetail';
import Footer from '@/components/Footer';

export default function ProductPage({ params }) {
  // Fetch product data based on params.id
  return (
    <>
      <ProductDetail product={productData} />
      <Footer />
    </>
  );
}
```

### 5. Create Cart Page
```jsx
import CartSection from '@/components/CartSection';
import Footer from '@/components/Footer';

export default function Cart() {
  return (
    <>
      <CartSection />
      <Footer />
    </>
  );
}
```

### 6. Create Checkout Page
```jsx
import CheckoutSection from '@/components/CheckoutSection';
import Footer from '@/components/Footer';

export default function Checkout() {
  return (
    <>
      <CheckoutSection />
      <Footer />
    </>
  );
}
```

### 7. Create Auth Pages
```jsx
import AuthLayout from '@/components/AuthLayout';

export default function Login() {
  return <AuthLayout mode="login" />;
}

export default function Signup() {
  return <AuthLayout mode="signup" />;
}
```

### 8. Create Additional Pages
```jsx
// About page
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <>
      <AboutSection />
      <Footer />
    </>
  );
}

// Contact page
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Contact() {
  return (
    <>
      <ContactSection />
      <Footer />
    </>
  );
}

// Dashboard page
import UserDashboard from '@/components/UserDashboard';
import Footer from '@/components/Footer';

export default function Dashboard() {
  return (
    <>
      <UserDashboard />
      <Footer />
    </>
  );
}
```

---

## 🔌 API Integration Points

### Components that fetch data:
1. **CategorySection** - `/api/categories`
2. **FeaturedProducts** - `/api/products/featured`
3. **ProductDetail** - Accepts product prop
4. **CartSection** - Uses local state (integrate with Redux/Context)
5. **CheckoutSection** - Handles form submission
6. **ContactSection** - Form submission to `/api/contact`

### Fallback Data
All data-fetching components include mock/fallback data for development without backend.

---

## 🎯 Customization Guide

### Change Colors
Update the Tailwind color classes in components:
```jsx
// Replace purple-600 with your color
className="bg-purple-600" // Change this
```

### Add Real Data
Replace axios calls with your actual API endpoints:
```jsx
const response = await axios.get(`${API_BASE}/your-endpoint`);
```

### Modify Content
All text, labels, and content are hardcoded and can be easily modified for different use cases.

---

## 📱 Responsive Breakpoints
- **Mobile**: Default (0px)
- **Tablet**: sm (640px), md (768px)
- **Desktop**: lg (1024px), xl (1280px)

---

## ✅ Component Checklist

- [x] HeroSection
- [x] CategorySection
- [x] FeaturedProducts
- [x] PromoBanner
- [x] WhyChooseUs
- [x] Testimonials
- [x] Newsletter
- [x] Footer
- [x] ProductDetail
- [x] CartSection
- [x] CheckoutSection
- [x] AuthLayout
- [x] AboutSection
- [x] ContactSection
- [x] UserDashboard
- [x] ShopPage

All components are ready to use! 🎉

---

**Last Updated**: April 23, 2026
**Version**: 1.0
