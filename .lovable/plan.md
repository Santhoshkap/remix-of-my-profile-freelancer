

# Fix Certification Spheres — Spread Out & Readable

## Problems
1. **Spheres clump together** — all 24 spawn in the same small area (`r(20)`) and the strong center-pulling impulse (`-150 * delta`) crushes them into a tight ball
2. **Text unreadable** — when spheres overlap you can't see individual cert names; they spin and overlap

## Solution

### 1. Spread initial spawn positions wider
- Change spawn from `r(20)` to `r(40)` so spheres start much further apart
- Offset Y spawn from `-25` to `-10` so they don't all drop from way below

### 2. Weaken the center-pulling force
- Reduce the Y impulse multiplier from `-150` to `-30` (same as X/Z at `-50` → `-30`)
- This keeps spheres gently floating rather than slamming into center mass

### 3. Increase linear damping
- Raise `linearDamping` from `0.75` to `4.0` so spheres slow down quickly and stay spread out instead of bouncing wildly

### 4. Widen camera FOV
- Increase `fov` from `32.5` to `45` so the viewport captures more spread-out spheres

### 5. Make spheres slightly smaller to reduce overlap
- Reduce scale values from `[0.7, 0.85, 0.95, 0.8, 1.0]` to `[0.55, 0.65, 0.7, 0.6, 0.75]`

### 6. Reduce pointer collider size
- Shrink pointer `BallCollider` from `2` to `1.5` for gentler interaction — spheres don't explode away on hover

## Files Modified
- `src/components/CertificationsSection.tsx` — spawn positions, impulse forces, damping, FOV, sphere scales

