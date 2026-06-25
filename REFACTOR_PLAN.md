# Phase 2 Refactor Implementation Plan

## Overview

This document details **safe refactors** that preserve all existing behavior, UI, styling, and interactions while improving maintainability and reducing duplication.

All changes follow the constraint: **Users should not visually notice any difference.**

---

## Refactor 1: Extract Shared Modal Components

### Scope
Fix duplicate modal patterns between QuestModal.tsx and ForgottenWorkshopModal.tsx

### Files to Create
1. `src/components/ModalTabs.tsx` — Reusable tab UI
2. `src/components/MediaGallery.tsx` — Reusable media gallery with thumbnails
3. `src/components/ModalShell.tsx` — Consistent modal wrapper (optional, if patterns warrant)

### Files to Modify
- `src/components/QuestModal.tsx` — Use new components
- `src/components/ForgottenWorkshopModal.tsx` — Use new components

### Expected Impact
- **Reduce QuestModal**: 437 → ~250 lines
- **Reduce ForgottenWorkshopModal**: 326 → ~200 lines
- **Improve maintainability**: Changes to modal UI apply to both automatically
- **Bug fixes**: Single source of truth for gallery behavior

### Implementation Steps

1. **Create ModalTabs.tsx**
   - Accept `tabs` array, `activeTab` state, `onTabChange` callback
   - Render consistent tab UI with filtering
   - Preserve styling (font-mono, gold accents, etc.)

2. **Create MediaGallery.tsx**
   - Accept `media` array, current `index`, `onIndexChange` callback
   - Render image/video, navigation arrows, thumbnail dots
   - Handle OptimizedImage/OptimizedVideo rendering
   - Preserve all styling and animations

3. **Update QuestModal.tsx**
   - Remove tab rendering code → use `<ModalTabs />`
   - Remove gallery code → use `<MediaGallery />`
   - Keep modal shell, header, tab content rendering
   - No behavior change

4. **Update ForgottenWorkshopModal.tsx**
   - Same extraction pattern as QuestModal
   - No behavior change

### Testing
- Verify tabs switch correctly in both modals
- Verify media navigation (arrows, keyboard, dots) works
- Verify animations on tab/media change
- Check responsive behavior on mobile

---

## Refactor 2: Extract Terminal Commands

### Scope
Move 15+ command handlers from Terminal.tsx inline switch cases to structured registry

### Files to Create
1. `src/commands/commandRegistry.ts` — Command handlers map
2. `src/commands/commands.ts` — Individual command implementations

### Files to Modify
- `src/components/Terminal.tsx` — Use registry instead of inline cases

### Expected Impact
- **Reduce Terminal.tsx**: 330 → ~150 lines
- **Improve maintainability**: Adding new commands is clear pattern (add to registry)
- **Better testability**: Commands are pure functions

### Implementation Steps

1. **Create commandRegistry.ts**
   ```typescript
   type CommandHandler = (args: {
     push: (lines: Line[]) => void
     mkLine: (kind: LineKind, text: string) => Line
     // hooks, context
   }) => void

   export const commandRegistry: Record<string, CommandHandler> = {
     'help': handleHelp,
     'about': handleAbout,
     'projects': handleProjects,
     // ... etc
   }
   ```

2. **Create commands.ts** (or split per command)
   - Export individual handlers
   - Keep logic identical to current implementation
   - Pure functions receiving mkLine, push, data sources

3. **Update Terminal.tsx**
   ```typescript
   // Before: switch(normalized) { case 'help': ... case 'projects': ... }
   // After:
   const handler = commandRegistry[normalized]
   if (handler) {
     handler({ push, mkLine, ... })
   } else {
     push([mkLine("error", "Command not found...")])
   }
   ```

### Testing
- Run all 11 commands in terminal
- Verify output format unchanged
- Check command history/navigation still works

---

## Refactor 3: Extract Status Constants

### Scope
Centralize status colors, labels, badges used across components

### Files to Create
1. `src/constants/statusConfig.ts` — Status colors, labels, styling
2. `src/constants/achievementMappings.ts` — Project → achievement ID mappings

### Files to Modify
- `src/components/ForgottenWorkshopModal.tsx` — Import statusColors
- `src/components/Terminal.tsx` — Import status mappings if used
- `src/App.tsx` — Import PROJECT_ACHIEVEMENTS

### Expected Impact
- **Single source of truth**: Status styling defined once
- **Easier maintenance**: Update status display everywhere at once
- **Better type safety**: Status-to-color mapping explicit

### Implementation Steps

1. **Create constants/statusConfig.ts**
   ```typescript
   export const STATUS_COLORS: Record<'abandoned'|'cancelled'|'lost'|'prototype', {
     badge: string
     accent: string
     label: string
   }> = {
     abandoned: { badge: "var(--accent-gold)", accent: "text-yellow-600", label: "ABANDONED" },
     // ...
   }
   ```

2. **Create constants/achievementMappings.ts**
   ```typescript
   export const PROJECT_ACHIEVEMENTS: Record<string, string> = {
     icces: "first_production_project",
     // ...
   }
   ```

3. **Update importing files**
   - Replace inline objects with imports
   - No logic change, just moved definitions

### Testing
- Verify status badge colors unchanged in ForgottenWorkshop modal
- Verify achievement unlock still works
- No visual changes

---

## Refactor 4: Remove Dead State (ForgottenWorkshopPanel)

### Scope
Remove unused `selectedProject` state from ForgottenWorkshopPanel

### Files to Modify
- `src/components/ForgottenWorkshopPanel.tsx` (line 21)

### Implementation
```typescript
// Before:
const [selectedProject, setSelectedProject] = useState(null)
// ↓ Unused

// After:
// Line removed entirely
```

### Impact
- **Code clarity**: No confusing dead state
- **Slight bundle reduction**: Unused state declaration removed
- **Maintenance**: No accidental future usage

### Testing
- Build succeeds
- ForgottenWorkshop panel still renders list correctly
- Clicking projects opens modal (via parent callback)

---

## Refactor 5: Decompose SkillTree (Optional, High Effort)

### Scope
Split SkillTree.tsx (726 lines) into focused, reusable components

### Files to Create
1. `src/components/SkillNode.tsx` — Individual skill node rendering
2. `src/components/SkillConnection.tsx` — SVG paths between nodes
3. `src/hooks/useSkillTreeLayout.ts` — Node positioning logic
4. `src/hooks/useSkillTreeInteraction.ts` — Selection, hover, click handling
5. `src/components/SkillTreeCanvas.tsx` — Canvas container for tree

### Expected Impact
- **Reduce SkillTree.tsx**: 726 → ~200 lines (moved to hooks/children)
- **Better reusability**: SkillNode usable elsewhere
- **Easier testing**: Individual concerns testable
- **Maintenance**: Changes to one concern don't touch others

### Risk Assessment
- **Medium risk**: Complex component, needs thorough testing
- **Medium effort**: 4-6 hours with testing
- **Worth doing**: SkillTree is the largest component, hardest to maintain

### Implementation Approach
- Extract layout math to `useSkillTreeLayout` hook first
- Extract interaction logic to `useSkillTreeInteraction` hook
- Extract SkillNode rendering to component
- Keep SkillTree.tsx as orchestrator
- Test each piece independently

### Testing
- Verify node hover effects work
- Verify selection highlighting
- Verify connection lines render
- Verify responsive resizing
- Verify animations smooth

---

## Refactor 6: Type Panel Props (Low Effort)

### Scope
Replace `ComponentType<any>` with properly typed panel props

### Files to Modify
- `src/config/panelRegistry.ts` (line 21)
- `src/components/PanelShell.tsx` (prop typing)

### Implementation Steps
```typescript
// Before:
export type PanelEntry = {
  component: ComponentType<any>  // ← Unsafe
  // ...
}

// After:
export type PanelComponentProps = {
  onProjectClick?: (id: string, title: string) => void
  onQuestSelect?: (quest: Quest) => void
  onProjectClick?: (projectId: string) => void
}

export type PanelEntry = {
  component: ComponentType<PanelComponentProps>
  // ...
}
```

### Impact
- **Type safety**: Panel props now type-checked
- **Better IDE support**: Autocompletion for panel props
- **No behavior change**: Types reflect current usage

### Testing
- TypeScript builds without errors
- All panels receive correct props
- No runtime changes

---

## Implementation Order (Recommended)

### Phase 2A: Quick Wins (1-2 hours)
1. **Refactor 3**: Extract status constants
2. **Refactor 4**: Remove dead state in ForgottenWorkshopPanel

### Phase 2B: Medium Refactors (3-4 hours)
1. **Refactor 1**: Extract shared modal components
2. **Refactor 2**: Extract terminal commands

### Phase 2C: Polish (1-2 hours)
1. **Refactor 6**: Type panel props
2. Build verification & end-to-end testing

### Phase 2D: Optional (4-6 hours)
1. **Refactor 5**: Decompose SkillTree

---

## Implementation Constraints

All refactors MUST:
- ✅ Preserve existing behavior (100%)
- ✅ Preserve UI appearance (100%)
- ✅ Preserve animations & transitions
- ✅ Preserve styling & theming
- ✅ Preserve user interactions
- ✅ Pass existing functionality tests
- ✅ Maintain TypeScript type safety
- ✅ Not introduce new dependencies

---

## Build & Validation

### Before Each Refactor
```bash
npm run build  # Baseline
npm run type-check  # No TS errors
```

### After Each Refactor
```bash
npm run build  # Should still succeed
npm run type-check  # Should still pass
```

### Manual Testing Checklist
- [ ] Quest Log opens, tabs work, media plays
- [ ] Forgotten Workshop opens, modals work
- [ ] Terminal commands execute correctly
- [ ] Character Shrine displays with SkillTree
- [ ] Timeline renders all milestones
- [ ] World map clickable, nodes activate
- [ ] Achievements unlock on quest click
- [ ] Responsive on mobile/tablet/desktop
- [ ] No console errors/warnings
- [ ] Animations smooth (60fps if possible)

---

## Success Criteria

✅ **All refactors complete** when:
1. Build passes (2,179 modules or similar)
2. All TypeScript checks pass
3. No console errors in preview
4. All 11 terminal commands work
5. All 5 navigation panels open correctly
6. All modals (quests, forgotten, corrupted) function
7. Achievement system works (track unlocks)
8. Responsive layout intact (tested on 3 viewport sizes)
9. Visual appearance identical to before
10. No behavior changes detected by end user

---

## Risk Mitigation

| Refactor | Risk | Mitigation |
|----------|------|-----------|
| Modal components | Medium | Extract incrementally, test before/after |
| Terminal commands | Low | Test each command after extraction |
| Status constants | Very Low | Simple rename, syntax-checked |
| Dead state removal | Very Low | Single line deletion, obvious unused |
| SkillTree decompose | Medium | Extract hooks first, test interaction layer |
| Panel typing | Low | Type-only change, no runtime impact |

---

## Rollback Plan

If any refactor introduces regressions:

1. **Identify**: Regression in which feature/component?
2. **Revert**: `git revert` the specific refactor commit
3. **Root cause**: Understand what went wrong
4. **Re-implement**: Fix issue, reapply refactor
5. **Validate**: Comprehensive testing before next refactor

---

## Timeline Estimate

| Phase | Effort | Timeline |
|-------|--------|----------|
| 2A (Quick wins) | 1-2 hrs | 30 min active dev + test |
| 2B (Medium refactors) | 3-4 hrs | 1.5-2 hrs active dev + 1.5-2 hrs test |
| 2C (Polish) | 1 hr | Validation & fixes |
| 2D (SkillTree, optional) | 4-6 hrs | 2-3 hrs dev + 2-3 hrs test |
| **Total (A+B+C)** | **5-6 hrs** | **Recommended scope** |
| **Total (A+B+C+D)** | **9-12 hrs** | **With SkillTree** |

