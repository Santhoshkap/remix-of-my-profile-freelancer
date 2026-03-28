

# Plan: Update Metadata, Favicon & Open Graph

## Changes

### 1. Custom Favicon from Headshot
- Copy uploaded headshot to `public/favicon.jpg`
- Add `<link rel="icon">` in `index.html` pointing to `/favicon.jpg`
- Delete `public/favicon.ico` if it exists (browsers auto-request it)

### 2. Update `index.html` Metadata
- **Title**: `Santhosh Kapalavai | GRC & Cybersecurity Leader`
- **Description**: Keep current description
- **OG image**: Point `og:image` and `twitter:image` to `/favicon.jpg` (self-hosted headshot). Note: for best social sharing results, a higher-res version or dedicated OG image (1200x630) would be ideal — but the headshot will work.
- **OG title**: `Santhosh Kapalavai | GRC & Cybersecurity Leader`
- **OG description**: Keep current
- **twitter:site**: Update from `@Lovable` to Santhosh's handle (or remove)
- Add `og:url` meta tag
- Remove the TODO comment

### 3. Copy Headshot for OG Image
- Also copy headshot to `public/images/og-profile.jpg` for the OG image tag (social platforms need an absolute URL, so we'll use a relative path that works with the deployed domain)

## Files Modified

| File | Change |
|------|--------|
| `public/favicon.jpg` | Copied from uploaded headshot |
| `public/images/og-profile.jpg` | Same headshot for OG meta |
| `index.html` | Updated title, favicon link, OG/Twitter meta tags |

