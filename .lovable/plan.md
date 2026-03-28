

# Enhanced Loading Screen — Cyber Security Boot Sequence

## Overview
Transform the current minimal loading screen into an immersive, cinematic cybersecurity "boot sequence" with animated background effects, glitch animations, and richer visual content.

## Changes

### 1. Animated Background (`Loading.css`)
- Add a **grid overlay** — subtle animated grid lines that pulse, giving a "digital matrix" feel
- Add **floating particles** — 6-8 small glowing dots that drift slowly across the screen using CSS keyframes
- Add a **radial gradient pulse** — a slow-breathing circular glow behind the center content
- Add a **horizontal glitch flicker** on the logo text (brief offset + color split every few seconds)

### 2. Richer Content (`Loading.tsx`)
- Add a **rotating status line** beneath the progress bar that cycles through cybersecurity terms: `"SCANNING NETWORK..."`, `"VERIFYING CREDENTIALS..."`, `"LOADING THREAT INTEL..."`, `"ESTABLISHING SECURE CONNECTION..."` — changes every ~1.5s
- Add **hex data stream** — a row of randomly changing hex characters above the progress bar (like `0xA4 F7 3B 9C ...`) that update every 100ms, giving a "live data" feel
- Add a **circular ring animation** around the "SK" logo — a rotating dashed border that spins slowly
- Add a **subtitle** under the logo: `"CYBERSECURITY OPERATIONS"` in small Orbitron text

### 3. New CSS Animations (`Loading.css`)
- `@keyframes gridPulse` — subtle grid opacity breathing
- `@keyframes particleFloat` — particles drifting diagonally
- `@keyframes glitch` — brief horizontal offset + cyan/magenta color split on logo
- `@keyframes ringRotate` — slow 360° rotation for the logo ring
- `@keyframes hexFlicker` — opacity flicker for hex data

### 4. Exit Enhancement
- On "ACCESS GRANTED", briefly flash the entire screen with a cyan tint before fading out (a quick 150ms flash overlay)

## Files Modified
- `src/components/Loading.tsx` — rotating status text, hex data stream, logo ring, subtitle, flash overlay
- `src/components/styles/Loading.css` — grid background, particles, glitch, ring rotation, all new keyframes

