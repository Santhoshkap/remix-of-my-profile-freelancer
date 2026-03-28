

# Fix Mobile Work Cards & Update Location

## 1. Mobile Work Cards Fix (`src/components/Work.tsx` + `src/components/styles/Work.css`)

**Problem**: On mobile (390px), the carousel cards overflow — images take too much space and content gets cramped.

**Solution**:
- Hide the `carousel-image-wrapper` on mobile (≤768px) — keep only text content
- Reduce font sizes and spacing for mobile
- Reduce the carousel number size
- Ensure the carousel info fills the full width

**CSS changes** — add a new mobile breakpoint at `max-width: 768px`:
```css
@media only screen and (max-width: 768px) {
  .carousel-image-wrapper { display: none; }
  .carousel-content { padding: 0 10px; }
  .carousel-slide { padding: 20px 0; }
  .carousel-number h3 { font-size: 28px; }
  .carousel-details h4 { font-size: 17px; }
  .carousel-category { font-size: 13px; }
  .carousel-tools p, .carousel-delivery p { font-size: 12px; }
  .carousel-highlight p { font-size: 11px; }
  .carousel-info { gap: 15px; }
  .work-section h2 { font-size: 32px; margin-bottom: 20px; }
  .carousel-arrow { width: 34px; height: 34px; font-size: 16px; }
  .carousel-arrow-left { left: 5px; }
  .carousel-arrow-right { right: 5px; }
  .carousel-dots { margin-top: 20px; gap: 8px; }
}
```

## 2. Location Update (`src/components/Contact.tsx`)

**Line 16**: Change `"India / Global"` → `"Bangalore, India"`

## Files Modified
| File | Change |
|------|--------|
| `src/components/styles/Work.css` | Add 768px mobile breakpoint hiding images, adjusting sizes |
| `src/components/Contact.tsx` | Update location label |

