# NEETCraft — NEET 2025 Study Dashboard

A premium, production-grade study dashboard for NEET preparation.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Recharts** (charts)
- **localStorage** (data persistence)
- **Lucide React** (icons)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Features

### 📊 Dashboard
- 4 stat cards: Days Left, Study Days, Hours Studied, Mock Tests
- Circular progress ring for daily question target
- Animated flame streak card
- XP Level system (E → D → C → B → A → S)
- Smart insights panel

### 📅 Plan
- Time-blocked daily schedule
- Color-coded by subject (Physics=Purple, Chemistry=Orange, Biology=Green)
- Click to mark complete with animation
- Add custom sessions

### 📌 Tasks
- Add topics with subject selector
- Auto-generates spaced repetition: Day 3, 7, 14, 30
- Filter: all / active / done
- Hover to delete

### 🔁 Revision
- Groups: Overdue (red) / Due Today (amber) / Upcoming (purple) / Done (green)
- Summary stat cards
- One-click mark done (+8 XP)

### 📈 Stats
- Donut chart: subject distribution
- Accuracy bars per subject
- Weekly daily question bar chart
- XP weekly line chart

### ⏱ Focus Timer
- Presets: 25 / 45 / 90 minutes
- Animated SVG ring (purple → amber → red as time runs out)
- Start / Pause / Reset
- Session complete popup with +50 XP reward

### 🎮 Gamification
- XP system: +10 per task, +1 per question, +50 per focus session
- Level progression with color-coded badges
- XP popups on every action
- Toast notifications (non-intrusive)

## Data

All data is saved to `localStorage` under key `neetcraft_v1`.
Reset by running `localStorage.removeItem('neetcraft_v1')` in DevTools.

## Folder Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx         # Main app shell
│   └── globals.css
├── components/
│   ├── layout/
│   │   └── Sidebar.tsx
│   ├── ui/
│   │   ├── Card.tsx
│   │   ├── CircularProgress.tsx
│   │   ├── NotificationToast.tsx
│   │   ├── PageHeader.tsx
│   │   ├── SubjectBadge.tsx
│   │   └── XpPopup.tsx
│   ├── dashboard/Dashboard.tsx
│   ├── plan/Plan.tsx
│   ├── tasks/Tasks.tsx
│   ├── revision/Revision.tsx
│   ├── stats/Stats.tsx
│   └── timer/FocusTimer.tsx
├── hooks/
│   ├── useAppData.ts
│   ├── useNotifications.ts
│   └── useTimer.ts
└── lib/
    ├── constants.ts
    └── types.ts
```
