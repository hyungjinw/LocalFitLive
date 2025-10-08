# Design Guidelines: Local Fashion Real-Time Service

## Design Approach
**Reference-Based**: Drawing inspiration from Instagram's visual-first feed, Pinterest's dynamic grid layout, and Airbnb's clean card design. This creates a modern, engaging experience that resonates with early 20s users who expect social-media-quality interfaces.

**Key Principles:**
- Photo-first design with minimal chrome
- Instant visual impact through dynamic grid layouts
- Clean, approachable aesthetics that don't compete with outfit photos
- Mobile-optimized experience (early 20s are mobile-native)

---

## Color Palette

**Light Mode:**
- Primary: 230 65% 60% (soft blue-purple for trust and energy)
- Background: 0 0% 98% (almost white, clean canvas)
- Surface: 0 0% 100% (pure white cards)
- Text Primary: 220 15% 20% (deep charcoal)
- Text Secondary: 220 10% 50% (medium gray)
- Border: 220 15% 90% (subtle dividers)
- Success (Like): 145 65% 50% (fresh green)
- Accent (Hot): 355 75% 60% (vibrant coral-pink)

**Dark Mode:**
- Primary: 230 60% 65% (lighter blue-purple)
- Background: 220 15% 10% (deep charcoal)
- Surface: 220 12% 15% (elevated cards)
- Text Primary: 0 0% 95% (near white)
- Text Secondary: 220 5% 65% (light gray)
- Border: 220 10% 25% (subtle dividers)

---

## Typography

**Font Families:**
- Primary: 'Inter' (Google Fonts) - clean, modern, excellent for UI
- Accent: 'Outfit' (Google Fonts) - friendly, rounded for headers

**Scale:**
- Hero/Display: 2.5rem - 3.5rem (font-bold, Outfit)
- H1: 2rem (font-bold, Outfit)
- H2: 1.5rem (font-semibold, Inter)
- H3: 1.25rem (font-semibold, Inter)
- Body: 1rem (font-normal, Inter)
- Small: 0.875rem (font-normal, Inter)
- Caption: 0.75rem (font-normal, Inter)

---

## Layout System

**Spacing Units:** Tailwind units of 2, 4, 6, 8, 12, 16, 20
- Tight spacing: p-2, gap-2 (within components)
- Standard: p-4, gap-4 (cards, buttons)
- Comfortable: p-6, gap-6 (sections)
- Generous: p-8, p-12, p-16 (page margins, hero)

**Grid System:**
- Mobile: Single column, full-width cards
- Tablet: 2-column masonry grid
- Desktop: 3-4 column dynamic grid (Pinterest-style)

**Container Max-widths:**
- Full sections: max-w-7xl mx-auto
- Content: max-w-6xl mx-auto
- Form/Text: max-w-2xl mx-auto

---

## Component Library

### Navigation
- Fixed top bar with blur backdrop (backdrop-blur-lg)
- Logo + Country selector dropdown + CTA button
- Hamburger menu on mobile
- Height: h-16

### Photo Feed Cards
- Rounded-2xl corners
- Hover lift effect (hover:scale-[1.02] transition)
- Image with overlay gradient at bottom
- User avatar (small, absolute positioned)
- Location tag + temperature badge (top-right)
- Like/Comment counts (bottom overlay)
- Shadow: shadow-lg on hover

### Interaction Elements
- Like button: Heart icon, animated fill on click
- Comment input: Floating bottom sheet on mobile, inline on desktop
- Share: Icon button with modal

### Service Evaluation Form
- Card-based layout with rounded-2xl
- Radio buttons styled as large clickable cards
- Useful/Not Useful: Icon + text, full-width on mobile
- Textarea: rounded-xl, focus ring with primary color
- Submit: Full-width gradient button

### Admin Dashboard
- Sidebar navigation (left, 240px wide on desktop)
- Data table with alternating row colors
- Filter/Search bar at top (sticky)
- Pagination at bottom
- Status badges: rounded-full, colored backgrounds

### Buttons
- Primary: gradient (from primary to accent), text-white, rounded-full, px-6 py-3
- Secondary: border-2 border-current, text-primary, rounded-full, px-6 py-3
- Icon buttons: w-10 h-10, rounded-full, hover:bg-gray-100

---

## Landing Page Structure

### Hero Section (80vh)
- Large background: Collage of outfit photos with overlay gradient
- Centered content: Bold headline + subheadline + country selector + CTA
- Floating cards preview (absolute positioned samples)

### Country Selector
- Prominent dropdown with flags
- Popular countries pinned at top
- Search functionality

### Live Feed Section
- Dynamic masonry grid
- Infinite scroll loading
- Each card shows: Photo, location, temperature, time posted, user info
- Hover reveals: Full caption, like/comment counts

### How It Works
- 3-column layout (stack on mobile)
- Icon + Title + Description cards
- Animated icons (subtle)

### Social Proof
- User testimonials in 2-column grid
- Avatar + Quote + Name + Location
- Ratings displayed as stars

### Service Evaluation (CTA)
- Full-width section with subtle background
- Centered form card (max-w-2xl)
- Large radio options for Useful/Not Useful
- Textarea for requirements
- Submit button

### Footer
- Multi-column (4 on desktop, stack on mobile)
- Links, social media, language selector
- Newsletter signup
- Copyright and legal links

---

## Images

**Hero Background:**
- Collage-style mosaic of diverse outfit photos from various climates
- Subtle overlay gradient (black to transparent, 50% opacity)
- Should feel dynamic and international

**Feed Photos:**
- User-uploaded outfit photos (actual implementation)
- Aspect ratio: flexible, masonry layout adapts
- Lazy loading for performance

**How It Works Icons:**
- Modern line icons for: Upload, Browse, Connect
- Size: 64x64px, primary color

**Testimonial Avatars:**
- Circular, 48x48px
- Placeholder: Gradient backgrounds with initials

---

## Admin Dashboard Design

**Layout:**
- Sidebar: Dark surface, white/light text, fixed position
- Main content: Light background, card-based tables
- Header: Sticky, shows current page title and actions

**Data Display:**
- Table with striped rows (alternate subtle gray)
- Columns: Date, User Feedback Type, Requirements Text, Actions
- Sortable headers
- Export button (top-right)

**Authentication:**
- Simple centered login card
- Logo at top
- Username + Password fields
- Remember me checkbox
- Login button (full-width)

---

## Key Interactions

- **Photo Upload:** Drag-and-drop zone with preview, temperature auto-fetch from location
- **Like Animation:** Heart icon scales and fills with color
- **Comment Thread:** Slide-up panel on mobile, inline expansion on desktop
- **Evaluation Submit:** Loading state, then success message with confetti animation
- **Admin Table Sort:** Click headers, arrow indicators

**Animations:** Minimal, purposeful only
- Page transitions: Subtle fade (200ms)
- Button hovers: Scale 1.05 (150ms)
- Card hovers: Lift with shadow (200ms)
- Modal entry: Slide from bottom on mobile, fade on desktop