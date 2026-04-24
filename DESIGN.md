# Design System: Mother Goose Toys Landing Page

**Source:** Uploaded desktop landing-page screenshot  
**Canvas:** Desktop web, 1418 × 913 px  
**Primary font:** Circular Std, multiple weights  
**Purpose:** Source-of-truth design reference for recreating and extending the shown Mother Goose Toys homepage in code or AI design tools.

---

## 1. Visual Theme & Atmosphere

The interface is a restrained, editorial landing page with a soft Scandinavian product-service aesthetic. It uses a muted warm-gray canvas, oversized typographic hierarchy, sparse navigation, and one large lifestyle photograph as the emotional anchor.

The mood is calm, deliberate, premium, and lightly brutalist. The design avoids decorative children’s branding, bright toy-store colors, and excessive softness. Instead, it communicates seriousness, sustainability, and trust through neutral color, large scale, strict alignment, and minimal interaction surfaces.

Key visual qualities:

- Minimalist, grid-driven composition
- Oversized typographic hero statement
- Flat surfaces with almost no elevation
- Sharp rectangular controls
- Muted monochrome palette
- Editorial left-side utility navigation
- Large asymmetrical image placement
- Professional, not childish

---

## 2. Color Palette & Roles

### Core Colors

| Token | Descriptive name | Hex | Role |
|---|---:|---:|---|
| `--color-page` | Warm Concrete Gray | `#DAD9D7` | Main page background, dominant surface color |
| `--color-text-primary` | Charcoal Graphite | `#383838` | Main hero headline, primary text, button background |
| `--color-text-secondary` | Muted Slate Gray | `#505050` | Body copy and secondary explanatory text |
| `--color-text-subtle` | Soft Blue Gray | `#9FA8AD` | Quiet labels such as “Family size” |
| `--color-black` | Pure Black | `#000000` | Navigation labels, icon strokes, side links |
| `--color-white` | Clean White | `#FFFFFF` | Button label text, sidebar/social rail background |
| `--color-divider` | Pale Concrete Line | `#C6C5C3` | Horizontal divider below form controls |
| `--color-image-veil` | Washed Warm White | `#EDECEA` | Lifestyle image wash/low-contrast photo treatment |

### Usage Notes

- The page background is not white. Use Warm Concrete Gray (`#DAD9D7`) as the main layout surface.
- Primary text and CTA surfaces use the same Charcoal Graphite (`#383838`) to keep the interface restrained.
- Use black sparingly for small navigation, utility icons, and vertical category labels.
- Avoid saturated brand accents on this screen. The design relies on scale, spacing, and contrast rather than color variety.

---

## 3. Typography Rules

### Font Family

Use **Circular Std** throughout the interface.

Recommended fallback stack:

```css
font-family: "Circular Std", "Circular", "Avenir Next", "Inter", system-ui, sans-serif;
```

### Weight System

| Use case | Font | Weight | Notes |
|---|---|---:|---|
| Logo / wordmark | Circular Std | 700 | Heavy lowercase stacked wordmark |
| Hero headline | Circular Std | 700–800 | Very large, dense, editorial scale |
| Navigation | Circular Std | 600–700 | Small but bold horizontal nav labels |
| Eyebrow | Circular Std | 600 | Compact, confident intro line |
| Body copy | Circular Std | 400–500 | Short, readable paragraphs |
| Button label | Circular Std | 600–700 | Lowercase, centered, high-contrast |
| Side labels | Circular Std | 600–700 | Vertical rotated text, compact |

### Approximate Type Scale From Screenshot

| Element | Size | Line height | Letter spacing | Color |
|---|---:|---:|---:|---|
| Wordmark | 30 px | 25–28 px | `-0.04em` | `#505050` |
| Top navigation | 16 px | 22 px | `-0.02em` | `#000000` |
| Eyebrow | 12 px | 16 px | `-0.01em` | `#000000` |
| Hero headline | 92–96 px | 0.9–0.95 | `-0.07em` | `#383838` |
| Body copy | 14 px | 18–20 px | `-0.01em` | `#505050` |
| Form label | 15 px | 20 px | `-0.02em` | `#9FA8AD` |
| Radio option | 16 px | 22 px | `-0.02em` | `#000000` |
| CTA button | 15 px | 20 px | `-0.01em` | `#FFFFFF` |
| Vertical side labels | 14 px | 16 px | `-0.02em` | `#000000` |

### Typography Behavior

- Use lowercase-heavy language and compact labels.
- Headlines should be visually dominant and slightly compressed through tight letter spacing.
- Avoid decorative, playful, or handwritten type.
- Keep copy short; the visual hierarchy expects concise blocks.

---

## 4. Component Stylings

## 4.1 Primary CTA Button — Extracted Spec

The `see plans` button is a flat, sharp-edged charcoal rectangle. It is intentionally severe compared to the soft photo and muted background.

### Visual Spec

| Property | Value |
|---|---:|
| Label | `see plans` |
| X position in screenshot | ~129 px |
| Y position in screenshot | ~605 px |
| Width | ~292 px |
| Height | ~77 px |
| Background | Charcoal Graphite `#383838` |
| Text color | Clean White `#FFFFFF` |
| Border radius | `0px` |
| Border | none |
| Shadow | none |
| Font family | Circular Std |
| Font size | ~15 px |
| Font weight | 600–700 |
| Text transform | lowercase |
| Alignment | centered both axes |
| Padding | horizontal 32 px minimum |
| Cursor | pointer |

### Button CSS Reference

```css
.button-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 292px;
  height: 77px;
  background: #383838;
  color: #ffffff;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  font-family: "Circular Std", "Avenir Next", system-ui, sans-serif;
  font-size: 15px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.01em;
  text-transform: lowercase;
}

.button-primary:hover {
  background: #2f2f2f;
}

.button-primary:focus-visible {
  outline: 2px solid #000000;
  outline-offset: 3px;
}
```

### Behavioral Notes

- Do not round the CTA.
- Do not add a shadow.
- Keep the label lowercase.
- Use hover only as a subtle darkening; avoid animated scaling.

---

## 4.2 Header / Top Navigation

The header is sparse and horizontally stretched. The logo sits fixed visually on the left; navigation starts around x=292 px and occupies the upper center.

### Wordmark

- Text: stacked lowercase `mother / goose / toys`
- Approximate position: x=20 px, y=40 px
- Color: Muted Slate Gray (`#505050`)
- Font: Circular Std Bold
- Size: ~30 px
- Line-height: ~25 px
- Letter-spacing: tight (`-0.04em`)

### Navigation Links

Visible links:

- `toy boxes`
- `how it works`
- `why it matters`
- `for parents`
- `pricing`
- `team`

Specs:

- Font: Circular Std Bold/SemiBold
- Size: ~16 px
- Color: Black (`#000000`)
- Spacing between links: 42–56 px
- Align along a single horizontal baseline around y=47 px
- Active/focused link may be underlined or boxed only in tooling; production design should avoid visible blue outlines except keyboard focus.

### Utility Icons

Right side icons:

- Search
- Cart/basket
- Account/profile

Specs:

- Stroke color: Black (`#000000`)
- Size: 22–24 px
- Stroke width: 1.75–2 px
- Spacing: ~28–32 px between icons
- Position: upper-right, vertically aligned with navigation

---

## 4.3 Vertical Left Rail

A secondary vertical navigation appears along the left side.

Labels:

- `sustainability`
- `learning`
- `cleaning`
- `safety`

Specs:

- Writing mode: vertical / rotated text
- Font: Circular Std Bold
- Size: ~14 px
- Color: Black (`#000000`)
- X position: ~31 px
- Vertical spacing: ~90–110 px between labels
- Keep labels minimal and concept-driven.

### Social Rail

Bottom-left white block contains short social labels:

- `in`
- `pi`
- `fb`

Specs:

- Background: White (`#FFFFFF`)
- Width: ~70 px
- Height: ~169 px
- Position: bottom-left
- Labels stacked vertically, centered horizontally
- Font: Circular Std Bold
- Size: ~14 px
- Color: Black (`#000000`)

---

## 4.4 Radio Selection Group

The family-size selector is minimal and monochrome.

### Label

- Text: `Family size`
- Font: Circular Std SemiBold
- Size: ~15 px
- Color: Soft Blue Gray (`#9FA8AD`)
- Margin-bottom: ~16 px

### Radio Controls

Options:

- `one child`
- `multiple children`

Specs:

- Circle diameter: ~19 px
- Border: 2 px solid Charcoal Graphite (`#383838`)
- Fill: transparent unless selected
- Label font: Circular Std Medium/SemiBold
- Label size: ~16 px
- Gap between radio and label: ~10 px
- Gap between options: ~52 px

### Divider

- Horizontal line below controls
- Color: Pale Concrete Line (`#C6C5C3`)
- Width: ~388 px
- Height: 1 px
- Margin-top: ~30 px

---

## 4.5 Image Treatment

The hero image is large, documentary, and quiet.

Specs:

- Approximate position: x=565 px, y=337 px
- Approximate size: 853 × 575 px
- The photo uses a bright, low-contrast wash.
- Image subject: family and child play scene in a neutral home interior.
- Edges are sharp, no rounded corners.
- No drop shadow.
- Overall opacity/visual contrast should feel reduced compared with a raw photograph.

Implementation guidance:

```css
.hero-image {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 0;
  box-shadow: none;
  filter: saturate(0.75) contrast(0.82) brightness(1.08);
}
```

---

## 5. Layout Principles

### Desktop Composition

The layout uses a strong asymmetrical grid:

- Left logo and vertical rail act as fixed brand/navigation anchors.
- Main hero content begins around x=129 px.
- Large headline starts near y=192 px.
- Text/form column is placed below the headline on the left.
- Hero photo starts to the right of the form column and fills the lower-right area.

### Approximate Desktop Measurements

| Element | Approximate placement |
|---|---|
| Page canvas | 1418 × 913 px |
| Logo | x=20, y=40 |
| Main nav | x=292, y=37 |
| Hero eyebrow | x=129, y=176 |
| Hero headline | x=127, y=193 |
| Body text column | x=129, y=345, width ~300 px |
| Form group | x=129, y=482 |
| Divider | x=129, y=558, width ~388 px |
| CTA | x=129, y=605, width ~292 px, height ~77 px |
| Hero image | x=565, y=337, width ~853 px, height ~575 px |
| Copyright | bottom-right, x≈1188, y≈890 |

### Spacing Strategy

- Use large negative/empty space as a design feature.
- Maintain broad separation between navigation, headline, form, and image.
- Avoid card containers around the hero content; the screen is mostly flat.
- Use sharp boundaries rather than rounded panels.

### Responsive Guidance

For tablet/mobile adaptations:

- Stack logo, navigation, hero headline, copy, form, CTA, and image vertically.
- Hide or collapse the vertical left rail on narrow screens.
- Convert top nav into a compact menu.
- Keep the primary CTA full-width or near-full-width on mobile.
- Preserve the same warm-gray background and sharp CTA style.

---

## 6. Copywriting & Language Rules

The language is short, direct, and benefit-led. It should feel modern and serious, not cute.

### Current Visible Copy

- Brand: `mother goose toys`
- Eyebrow: `Sustainable practice for family future. Designed with childcare experts`
- Hero: `Better toys. Less clutter.`
- Intro question: `Why parents choose us?`
- Body: `Curated, safe, and sustainable toy boxes delivered to your home. Designed for your child’s development — without the waste.`
- Label: `Family size`
- Options: `one child`, `multiple children`
- CTA: `see plans`

### Voice Rules

- Use sentence fragments intentionally.
- Prefer short nouns and verbs.
- Avoid marketing exaggeration.
- Avoid exclamation marks.
- Keep labels lowercase where already established.
- Use “sustainable,” “safe,” “development,” “learning,” “cleaning,” and “less clutter” as recurring concepts.

---

## 7. Implementation Tokens

```css
:root {
  --mgt-page: #dad9d7;
  --mgt-text-primary: #383838;
  --mgt-text-secondary: #505050;
  --mgt-text-subtle: #9fa8ad;
  --mgt-black: #000000;
  --mgt-white: #ffffff;
  --mgt-divider: #c6c5c3;

  --mgt-font: "Circular Std", "Circular", "Avenir Next", "Inter", system-ui, sans-serif;

  --mgt-radius-none: 0px;
  --mgt-shadow-none: none;

  --mgt-hero-title-size: clamp(56px, 7vw, 96px);
  --mgt-hero-title-line-height: 0.92;
  --mgt-hero-title-tracking: -0.07em;
}
```

---

## 8. Do / Do Not

### Do

- Use Circular Std with tight spacing.
- Keep the warm-gray page background.
- Use flat, rectangular buttons.
- Preserve asymmetry and large whitespace.
- Use black/charcoal for confidence and clarity.
- Treat the photo as a washed, atmospheric element.

### Do Not

- Do not introduce bright toy-like colors.
- Do not round the CTA button.
- Do not add heavy shadows.
- Do not make the layout overly card-based.
- Do not use playful childlike fonts.
- Do not center everything; the composition depends on asymmetry.
