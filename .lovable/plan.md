

## Plan: Hide 3D Character from Hero Section

### Problem
The 3D character model is rendered in the hero section. Simply removing it will break the loading screen — the loader waits for the character model to call `setLoading(100)`, so the site would get stuck on the loading screen forever.

### Changes

**1. `src/App.tsx`** — Remove CharacterModel entirely
- Remove the `lazy` import of CharacterModel
- Remove the `<Suspense><CharacterModel /></Suspense>` block from the JSX
- MainContainer's `children` will be empty (no visual change needed since nothing renders)

**2. `src/components/MainContainer.tsx`** — Remove children pass-through
- Remove `PropsWithChildren` usage and `children` prop
- Remove `{isDesktopView && children}` (line 39)
- Remove `{!isDesktopView && children}` from Landing (line 43), just render `<Landing />`

**3. `src/context/LoadingProvider.tsx`** — Auto-complete loading
- Add a `useEffect` that sets loading to 100 and `isLoading` to false after a short delay (~3 seconds) to let the loading animation play, since no model will trigger completion anymore

**4. `src/components/Landing.tsx`** — Remove `PropsWithChildren`
- Remove `children` prop and `{children}` render since the character is no longer passed in

This keeps all CSS and character source files intact (in case you want to re-enable later) but completely hides the 3D model from the site.

