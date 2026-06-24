# Forgotten Workshop

A museum of unfinished creations representing abandoned, cancelled, lost, or prototype projects from the developer's journey.

## Architecture Overview

The Forgotten Workshop integrates seamlessly into the existing RPG portfolio architecture by reusing established patterns:

### Files Created

1. **`src/data/forgottenProjects.ts`** - Data model and sample forgotten projects
   - `ForgottenProject` interface with status, reasons, and lessons learned
   - 5 example projects demonstrating different abandonment scenarios

2. **`src/components/ForgottenWorkshopModal.tsx`** - Project detail modal
   - Reuses QuestModal patterns: tabbed interface, animations, responsive design
   - Tab structure: Overview, Why Abandoned, Lessons Learned
   - Status badges with color-coded styling

3. **`src/components/ForgottenWorkshopPanel.tsx`** - Project list view
   - Grid of project cards with status indicators and year
   - Click to view detailed modal
   - Integrates into PanelShell via navigation registry

### Files Modified

1. **`src/config/navigation.ts`**
   - Added Forgotten Workshop entry with ArchiveX icon
   - Position: x=75, y=60 (bottom-right of world map)
   - Color: #d4a574 (dusty gold - distinct from main sections)
   - Not shown in sidebar (world-map only)

2. **`src/data/types.ts`**
   - Extended `Section` type to include "forgotten-workshop"

3. **`src/data/index.ts`**
   - Added export for `forgottenProjects`

4. **`src/App.tsx`**
   - Added `handleForgottenProjectClick` handler for achievement unlocking
   - Updated panel rendering logic to support forgotten-workshop section

## Design Philosophy

### Visual Distinction
- **Color**: Dusty gold (#d4a574) evokes "ancient workshop" aesthetic
- **Icon**: ArchiveX suggests archived/preserved projects
- **Status Badges**: Clearly differentiate project states
  - Abandoned → Gold
  - Cancelled → Purple
  - Lost → Gray
  - Prototype → Cyan

### Tone
Each project celebrates experimentation and learning rather than failure. The tone emphasizes:
- Strategic decision-making under constraints
- Valuable lessons extracted from abandonment
- Professional growth from unfinished work

### Evidence Handling
- If screenshots/evidence exist, display counts and notes
- If evidence is lost, explicitly state this with respectful messaging
- Treats missing evidence as intentional preservation of incomplete memory

## Data Structure

```typescript
export interface ForgottenProject {
  id: string                          // Unique identifier
  title: string                       // Project name
  year: string                        // Year worked on
  status: ForgottenProjectStatus      // "abandoned" | "cancelled" | "lost" | "prototype"
  summary: string                     // Project description (1-2 sentences)
  reasonAbandoned: string             // Why it was abandoned (paragraph)
  lessonsLearned: string[]            // Key takeaways (bullet list)
  technologies: string[]              // Tech stack used
  evidence?: {
    screenshots?: string[]            // Preserved screenshots
    videos?: string[]                 // Video recordings
    notes?: string                    // Development notes
  }
}
```

## Adding New Forgotten Projects

1. Edit `src/data/forgottenProjects.ts`
2. Add new entry to the `forgottenProjects` array
3. Populate all required fields
4. Consider adding `evidence` for historical projects
5. Build and deploy (no other files need updating)

## Component Reusability

### Patterns Reused from QuestModal
- Tabbed interface with dynamic tab filtering
- AnimatePresence for smooth content transitions
- Motion-wrapped content sections
- Consistent modal shell and styling
- Keyboard navigation support

### Why Separate Components
ForgottenWorkshopModal is separate from QuestModal to:
- Maintain clear separation of concerns
- Allow independent evolution (forgotten projects != quests)
- Avoid complex conditional logic in a single modal
- Keep component props clean and focused

## World Map Integration

The Forgotten Workshop node appears at position (75, 60) on the world map, placing it in the bottom-right quadrant. The dusty gold color makes it visually distinct from the primary sections while maintaining harmony with the RPG aesthetic.

## Achievement Integration

Visiting the Forgotten Workshop unlocks the "Archaeologist" achievement, celebrating interest in learning from past projects.

## Future Enhancements

Potential extensions:
- Filter projects by status or year
- Export project history as a timeline
- Add comparison view showing technology evolution
- Connect to GitHub archive repositories
- Build searchable project archive
- Add images/videos gallery for preserved projects
