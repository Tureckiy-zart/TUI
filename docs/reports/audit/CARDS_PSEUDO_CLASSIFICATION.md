# Cards Pseudo-Classification

**Date:** 2026-01-01  
**Purpose:** Classification of all Card-like components into categories: DOMAIN_CARD / RUDIMENT_CARD / PSEUDO_CARD / NOT_A_CARD

---

## Classification Framework

### DOMAIN_CARD
**Definition:** Component representing a business entity (Event, Venue, Artist, Ticket, etc.)  
**Criteria:**
- Represents a business entity
- Has domain-specific props (event, venue, artist, ticket)
- Has unique domain logic and responsibility
- Cannot be replaced by generic Card without losing domain meaning

### RUDIMENT_CARD
**Definition:** Card created only for visual variation without unique domain responsibility  
**Criteria:**
- Stylistic duplicate of another card
- No unique domain logic
- Created only for visual variation
- Can be replaced by composition without losing functionality

### PSEUDO_CARD
**Definition:** Component behaving like a Card (surface + padding + content) but not named or treated as one  
**Criteria:**
- Uses Card/Surface/Box with border + radius + shadow + padding
- Has card-like visual structure
- Not named as Card
- Behaves like a card but serves different purpose

### NOT_A_CARD
**Definition:** Component that is not a card (sections, menus, skeletons, utilities)  
**Criteria:**
- Uses cards internally but is not a card itself
- Skeleton/loading state component
- Menu/overlay component
- Section/layout component

---

## Classification Results

### DOMAIN_CARD (7 components)

#### 1. EventCard
**Path:** `src/PATTERNS/cards/EventCard/EventCard.tsx`  
**Classification:** ✅ **DOMAIN_CARD**  
**Justification:** Represents Event business entity with domain-specific props (title, date, venue, price, tickets) and unique domain logic (badge positioning, metadata rows, ticket button).

#### 2. VenueCard
**Path:** `src/PATTERNS/cards/VenueCard/VenueCard.tsx`  
**Classification:** ✅ **DOMAIN_CARD**  
**Justification:** Represents Venue business entity with domain-specific props (name, location, events count, capacity) and unique domain logic (popular badge, location metadata, events/capacity footer).

#### 3. ArtistCard
**Path:** `src/PATTERNS/cards/ArtistCard/ArtistCard.tsx`  
**Classification:** ✅ **DOMAIN_CARD**  
**Justification:** Represents Artist business entity with domain-specific props (name, genres, followers, plays) and unique domain logic (popular badge, genres display, followers/plays metadata).

#### 4. TicketCard
**Path:** `src/PATTERNS/cards/TicketCard/TicketCard.tsx`  
**Classification:** ✅ **DOMAIN_CARD**  
**Justification:** Represents Ticket business entity with domain-specific props (event, date, price, availability) and unique domain logic (VIP/discount badges, availability states, purchase button).

#### 5. CategoryCard
**Path:** `src/PATTERNS/cards/CategoryCard/CategoryCard.tsx`  
**Classification:** ✅ **DOMAIN_CARD**  
**Justification:** Represents Category business entity with domain-specific props (title, description, image) and unique domain logic (featured badge, image overlay).

#### 6. PromoCard
**Path:** `src/PATTERNS/cards/PromoCard/PromoCard.tsx`  
**Classification:** ✅ **DOMAIN_CARD**  
**Justification:** Represents Promotional content business entity with domain-specific props (title, description, CTA) and unique domain logic (featured badge, CTA button with domain tokens).

#### 7. ProfileCard
**Path:** `src/DOMAIN/auth/ProfileCard.tsx`  
**Classification:** ✅ **DOMAIN_CARD**  
**Justification:** Represents User Profile business entity with domain-specific props (name, email, avatar) and unique domain logic (profile validation, avatar placeholder).

---

### RUDIMENT_CARD (0 components)

**Result:** No rudiment cards found. All domain cards have unique domain responsibilities and cannot be considered stylistic duplicates.

**Analysis:** All 7 domain cards represent distinct business entities with unique domain logic. None are stylistic-only duplicates.

---

### PSEUDO_CARD (1 component)

#### 1. NotificationCenter.Panel
**Path:** `src/DOMAIN/notifications/NotificationCenter.Panel.tsx`  
**Classification:** ⚠️ **PSEUDO_CARD**  
**Justification:** Uses Surface component with border, radius, shadow, padding (card-like structure) but is named as Panel, not Card. Serves as side drawer panel, not a card component.

**Card-like Properties:**
- ✅ Uses Surface with `variant="elevated"` (shadow)
- ✅ Has border radius via Surface
- ✅ Has padding via Surface
- ✅ Has background via Surface
- ✅ Structured content (header + scrollable body)

**Decision Required:** KEEP AS IS / REPLACE WITH CardBase / RENAME

**Recommendation:** KEEP AS IS - This is a panel component (side drawer), not a card. The card-like styling is appropriate for a panel surface, but renaming to Card would be misleading.

---

## STEP 5: Pseudo-Card Resolution

**Status:** ✅ Complete  
**Date:** 2026-01-01

### NotificationCenter.Panel Resolution

**Component:** NotificationCenter.Panel  
**Current State:** Uses Surface component with card-like styling  
**Decision:** ✅ **KEEP AS IS**

**Rationale:**
1. **Semantic Correctness:** This is a panel component (side drawer), not a card. Renaming to Card would be semantically incorrect.
2. **Appropriate Styling:** Using Surface with elevated variant is appropriate for a panel surface. Panel surfaces should have elevation, border, radius, and padding - this is correct usage.
3. **No Refactor Needed:** The component correctly uses Surface for its purpose. Replacing with CardBase would be inappropriate (CardBase is for domain cards, not panels).
4. **Documentation:** The component is now documented as a pseudo-card, which is sufficient for architectural clarity.

**Action Taken:** Documented as PSEUDO_CARD with KEEP AS IS decision. No code changes required.

**Deferred Refactors:** None - component is correctly implemented.

---

### NOT_A_CARD (7 components)

#### 1. CardBase
**Path:** `src/PATTERNS/cards/CardBase/CardBase.tsx`  
**Classification:** ✅ **NOT_A_CARD**  
**Justification:** Foundation component (LOCKED). Base layout pattern for domain cards, not a card itself.

#### 2. Card (COMPOSITION)
**Path:** `src/COMPOSITION/layout/Card/Card.tsx`  
**Classification:** ✅ **NOT_A_CARD**  
**Justification:** Foundation component (LOCKED). Generic card container component, not a domain card.

#### 3. Surface
**Path:** `src/COMPOSITION/layout/Surface/Surface.tsx`  
**Classification:** ✅ **NOT_A_CARD**  
**Justification:** Foundation component (LOCKED). Surface elevation variant container, not a card.

#### 4. FeatureSection
**Path:** `src/DOMAIN/sections/FeatureSection.tsx`  
**Classification:** ✅ **NOT_A_CARD**  
**Justification:** Section component that uses Card components internally. It is a layout section, not a card component itself.

#### 5. TrendingSection
**Path:** `src/DOMAIN/sections/TrendingSection.tsx`  
**Classification:** ✅ **NOT_A_CARD**  
**Justification:** Section component that uses Card component internally. It is a layout section, not a card component itself.

#### 6. EventCardSkeleton
**Path:** `src/PATTERNS/states/LoadingState/EventCardSkeleton/EventCardSkeleton.tsx`  
**Classification:** ✅ **NOT_A_CARD**  
**Justification:** Loading skeleton component for EventCard. Mimics card structure for loading states but is not a card component.

#### 7. VenueCardSkeleton
**Path:** `src/PATTERNS/states/LoadingState/VenueCardSkeleton/VenueCardSkeleton.tsx`  
**Classification:** ✅ **NOT_A_CARD**  
**Justification:** Loading skeleton component for VenueCard. Mimics card structure for loading states but is not a card component.

#### 8. HoverCard
**Path:** `src/PATTERNS/menus/hover-card/`  
**Classification:** ✅ **NOT_A_CARD**  
**Justification:** Menu component (Popover wrapper) for hover-triggered content. The name "Card" is misleading - it's a menu component, not a card component.

---

## Summary

| Category | Count | Components |
|----------|-------|------------|
| **DOMAIN_CARD** | 7 | EventCard, VenueCard, ArtistCard, TicketCard, CategoryCard, PromoCard, ProfileCard |
| **RUDIMENT_CARD** | 0 | None found |
| **PSEUDO_CARD** | 1 | NotificationCenter.Panel |
| **NOT_A_CARD** | 8 | CardBase, Card (COMPOSITION), Surface, FeatureSection, TrendingSection, EventCardSkeleton, VenueCardSkeleton, HoverCard |

---

## Unclear Cases

**None** - All components have clear classifications.

---

## Removal Candidates

**RUDIMENT_CARD components safe for removal:** 0

**Analysis:** No rudiment cards found. All domain cards represent distinct business entities with unique domain logic.

**Removal Decision:** ✅ **NO REMOVAL REQUIRED**

**Acceptance Criteria:**
- ✅ No domain card is marked for removal
- ✅ All removal candidates are stylistic-only (none found)

---

## STEP 3: Removal Candidates Review (COMPLETE)

**Status:** ✅ Complete  
**Date:** 2026-01-01

**Result:** No rudiment cards found. All domain cards have unique domain responsibilities.

**Decision:** Proceed to pseudo-card resolution (STEP 5). Skip removal step (STEP 4).

---

## Next Steps

1. ✅ **STEP 3:** Review removal candidates - COMPLETE (no candidates found)
2. ⏭️ **STEP 4:** Skip (no removal candidates)
3. **STEP 5:** Resolve pseudo-card (NotificationCenter.Panel)
4. **STEP 6:** Audit closeout

---

**Classification Complete:** 2026-01-01

---

## STEP 6: Audit Closeout

**Status:** ✅ Complete  
**Date:** 2026-01-01

### Final Decisions Summary

**Domain Cards:** 7 components - All STABLE, no changes required  
**Rudiment Cards:** 0 components - None found  
**Pseudo-Cards:** 1 component - NotificationCenter.Panel (KEEP AS IS)  
**Not Cards:** 8 components - Correctly classified

### Cards Area Status

**Status:** ✅ **CLOSED**

**Summary:**
- All domain cards are stable and represent distinct business entities
- No rudiment cards found (no stylistic duplicates)
- All pseudo-cards identified and resolved (NotificationCenter.Panel documented and kept as-is)
- No accidental duplication of Card behavior remains
- Cards area is architecturally closed

### Architectural Closure

**Cards area is officially CLOSED:**

1. ✅ All domain cards are stable (Phase 1 completed)
2. ✅ No rudiment cards to remove
3. ✅ All pseudo-cards identified and documented
4. ✅ No hidden Card-like components remain undocumented
5. ✅ Foundation components (CardBase, Card, Surface) are locked

**Future Changes:**
- New card additions require explicit unlock TUNG
- Domain card modifications require explicit unlock TUNG
- No further cleanup planned without unlock

### Next Domain

**Proceed to next UI domain:** Lists / Tables / Navigation

---

## Cards Cleanup — FINAL

**Date:** 2026-01-01  
**Status:** ✅ **COMPLETE**

### Final Outcome

✅ **All non-domain card rudiments removed or deprecated:** N/A (none found)  
✅ **All pseudo-cards identified and classified:** NotificationCenter.Panel (KEEP AS IS)  
✅ **No accidental duplication of Card behavior remains:** Verified  
✅ **Cards area officially CLOSED:** Confirmed

### Audit Artifacts

1. **CARDS_PSEUDO_INVENTORY.md** - Complete inventory of all Card-like components
2. **CARDS_PSEUDO_CLASSIFICATION.md** - Classification and resolution decisions (this document)

### Conclusion

The Cards cleanup audit is complete. All components have been classified, pseudo-cards have been resolved, and the Cards area is architecturally closed. No further cleanup is required without explicit unlock.

---

**Audit Complete:** 2026-01-01

