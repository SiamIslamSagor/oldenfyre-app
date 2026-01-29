# Oldenfyre - Vintage Lighters Website

A modern Awwwards-style frontend website for Oldenfyre, a premium brand selling vintage lighters. The design is cinematic, dark, luxurious, and nostalgic.

## Features

- **Cinematic Design**: Dark, luxurious theme with premium gold accents
- **Smooth Animations**: Slow scroll-based animations using Lenis
- **Magnetic Hover Effects**: Interactive buttons that follow cursor movement
- **Text Reveal Animations**: Staggered text reveals for dramatic effect
- **Parallax Images**: Smooth parallax scrolling for visual depth
- **Premium UI Patterns**: Custom cursor, noise texture, gradient effects
- **Responsive Design**: Fully responsive across all devices

## Tech Stack

- **Next.js 16**: React framework for production
- **Tailwind CSS 4**: Utility-first CSS framework
- **Framer Motion**: Production-ready motion library for React
- **GSAP**: Professional-grade animation for the web
- **Lenis**: Smooth scroll library
- **TypeScript**: Type-safe JavaScript

## Project Structure

```
oldenfyre_frontend/
├── app/
│   ├── favicon.ico
│   ├── globals.css          # Global styles with dark theme
│   ├── layout.tsx           # Root layout with providers
│   └── page.tsx             # Main page with all sections
├── components/
│   ├── animations/
│   │   ├── MagneticButton.tsx    # Magnetic hover effect button
│   │   ├── ParallaxImage.tsx    # Parallax scrolling image
│   │   ├── ScrollReveal.tsx     # Scroll-triggered animations
│   │   └── TextReveal.tsx       # Text reveal animations
│   ├── sections/
│   │   ├── Collection.tsx       # Product collection section
│   │   ├── Contact.tsx           # Contact form section
│   │   ├── Craftsmanship.tsx    # Craftsmanship features
│   │   ├── Hero.tsx             # Hero section with animations
│   │   └── Story.tsx            # Brand story section
│   ├── ui/
│   │   ├── CustomCursor.tsx     # Custom cursor component
│   │   ├── Footer.tsx           # Footer component
│   │   ├── Navigation.tsx       # Navigation component
│   │   └── SmoothScroll.tsx     # Smooth scroll wrapper
│   └── SmoothScroll.tsx
└── public/
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Design System

### Colors

- **Background**: `#0a0a0a` (Dark Black)
- **Foreground**: `#f5f5f5` (Light Gray)
- **Gold**: `#c9a962` (Primary Accent)
- **Gold Light**: `#e8d5a3` (Light Accent)
- **Gold Dark**: `#8b7355` (Dark Accent)
- **Charcoal**: `#1a1a1a` (Secondary Background)
- **Charcoal Light**: `#2a2a2a` (Lighter Background)
- **Cream**: `#faf8f5` (Light Text)
- **Cream Dark**: `#e8e4df` (Darker Light Text)

### Typography

- **Font Family**: Geist Sans (Primary), Geist Mono (Secondary)
- **Headings**: Large, light weight with tight tracking
- **Body**: Regular weight with comfortable line height
- **Accents**: Uppercase with wide letter spacing

### Animations

- **Scroll Duration**: 1.5s (Lenis)
- **Easing**: Custom cubic-bezier for smooth transitions
- **Stagger**: 0.12s for text reveals
- **Parallax Speed**: 0.3-0.5 for images

## Key Components

### Navigation

- Fixed position with backdrop blur on scroll
- Magnetic brand logo
- Smooth scroll to sections
- Mobile responsive menu

### Hero Section

- Full-screen cinematic intro
- Text reveal animation
- Decorative geometric elements
- Scroll indicator

### Story Section

- Asymmetric layout with parallax image
- Statistics display
- Brand narrative

### Collection Section

- Grid of product cards
- Hover effects with image zoom
- Price and year display

### Craftsmanship Section

- Feature cards with icons
- Process timeline
- GSAP scroll-triggered animations

### Contact Section

- Minimal form design
- Contact information display
- Newsletter signup

### Footer

- Multi-column layout
- Social links
- Newsletter subscription

## Performance Optimizations

- Static page generation
- Image optimization with Next.js Image component
- Lazy loading for animations
- CSS-in-JS with Tailwind CSS
- Tree-shaking for unused dependencies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary and confidential.

## Credits

Design and development by Oldenfyre Team.
