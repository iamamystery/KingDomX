# KingdomX Component Map

## Frontend Component Hierarchy

### Layout Components
```
App
├── LeftSidebar (Navigation)
│   ├── Logo/Workspace Switcher
│   ├── Main Navigation (Home, Inbox, Chat, Projects, Tasks, Docs)
│   ├── Secondary Navigation (Calendar, Automations, Reports)
│   └── Bottom Navigation (Settings)
├── TopHeaderBar (Page Header)
│   ├── Breadcrumbs
│   ├── Global Search
│   ├── Create Button
│   ├── Notifications
│   └── User Profile Menu
└── Main Content Area (Page-specific)
```

### Page Components

#### Dashboard Page (`pages/dashboard.tsx`)
```
Dashboard
├── Welcome Section
│   ├── User greeting
│   └── Role/Workspace info
├── Quick Actions
│   ├── Invite Team button
│   └── Create Project button
├── Stats Cards (6 KPIs)
│   ├── Active Tasks
│   ├── Overdue
│   ├── Projects
│   ├── Completed Today
│   ├── Team Members
│   └── Productivity
├── Task Board View
│   ├── View Switcher (Board/List/Calendar)
│   ├── Filters (Assignee, Priority)
│   └── TaskBoard component
└── Right Sidebar
    ├── AI Suggestions Panel
    ├── Quick Actions Panel
    └── Recent Activity Panel
```

#### Projects Page (`pages/projects.tsx`)
```
Projects
├── Page Header
│   ├── Title: Projects
│   └── Create Project button
├── Project Grid
│   └── Project Cards (mapped from API)
│       ├── Project name
│       ├── Description
│       ├── Task count
│       └── Created date
├── Loading State
├── Error State
└── Empty State
```

#### Tasks Page (`pages/tasks.tsx`)
```
Tasks
├── Page Header
│   ├── Title: Tasks
│   └── New Task button
└── TaskBoard component
    └── Kanban columns (To Do, In Progress, Done)
```

#### Calendar Page (`pages/calendar.tsx`)
```
Calendar
├── Calendar Header
│   ├── Month/Year display
│   ├── Navigation (Prev/Today/Next)
│   └── New Event button
├── Calendar Grid
│   ├── Day headers (Sun-Sat)
│   └── Day cells (42 cells)
│       ├── Date number
│       └── Event badges
├── Create Event Modal
│   ├── Title input
│   ├── Description textarea
│   ├── Start/End datetime
│   ├── All-day checkbox
│   └── Create/Cancel buttons
└── Event Detail Modal
    ├── Event title
    ├── Description
    ├── Date/time
    ├── Linked task info
    └── Close/Edit buttons
```

#### Automations Page (`pages/automations.tsx`)
```
Automations
├── Page Header
│   ├── Title: Automations
│   └── Create Automation button
├── Active Automations List
│   └── Automation Cards
│       ├── Name
│       ├── Trigger type
│       ├── Actions count
│       ├── Run count
│       └── Status toggle
├── Templates Section
│   └── Template Cards
│       ├── Name
│       ├── Description
│       └── Use Template button
└── Create Automation Modal
    ├── Name input
    ├── Trigger selector
    ├── Action selector
    └── Create/Cancel buttons
```

#### Reports Page (`pages/reports.tsx`)
```
Reports
├── Page Header
│   ├── Title: Reports
│   └── Export Data button
├── Stats Overview (4 cards)
│   ├── Total Tasks
│   ├── Completed
│   ├── In Progress
│   └── Projects
├── Available Reports Grid
│   └── Report Cards
├── Project Progress Section
│   └── Progress bars per project
└── Recent Activity Section
    └── Activity list
```

#### Chat Page (`pages/chat.tsx`)
```
Chat
├── Chat Sidebar
│   ├── Channels list
│   └── Direct Messages list
├── Chat Main Area
│   ├── Channel header
│   ├── Messages list
│   └── Message input
└── Message Components
    ├── Avatar
    ├── Sender name
    ├── Timestamp
    └── Content
```

#### Inbox Page (`pages/inbox.tsx`)
```
Inbox
├── Page Header
│   ├── Title: Inbox
│   └── Mark all read button
└── Notifications List
    └── Notification Cards
        ├── Icon (type-based)
        ├── Title
        ├── Description
        ├── Time
        └── Unread indicator
```

#### Docs Page (`pages/docs.tsx`)
```
Docs
├── Page Header
│   ├── Title: Knowledge Base
│   └── New Document button
├── Sidebar
│   ├── Quick Actions
│   └── Folders list
└── Document List
    └── Document Cards
        ├── Icon
        ├── Title
        ├── Updated time
        └── Author
```

#### Settings Page (`pages/settings.tsx`)
```
Settings
├── Page Header
│   └── Title: Settings
├── Settings Sections
│   ├── Account Settings
│   ├── Security Settings
│   ├── Appearance Settings
│   └── Workspace Settings
└── Form Components
    ├── Text inputs
    ├── Select dropdowns
    ├── Toggle switches
    └── Save buttons
```

### Shared Components

#### TaskBoard (`components/TaskBoard.tsx`)
```
TaskBoard
├── Board Controls
│   ├── View switcher
│   └── Filters
└── Kanban Columns
    ├── To Do column
    │   └── SortableTask components
    ├── In Progress column
    │   └── SortableTask components
    └── Done column
        └── SortableTask components
```

#### TaskCard (`components/TaskCard.tsx`)
```
TaskCard
├── Task title
├── Description (truncated)
├── Status badge
├── Priority indicator
├── Assignee avatar
└── Due date
```

#### KanbanColumn (`components/KanbanColumn.tsx`)
```
KanbanColumn
├── Column header
│   ├── Status name
│   └── Task count badge
└── Droppable area
    └── Task cards
```

#### SortableTask (`components/SortableTask.tsx`)
```
SortableTask
├── Drag handle
└── TaskCard content
```

#### TopHeaderBar (`components/TopHeaderBar.tsx`)
```
TopHeaderBar
├── Left section
│   ├── Page title
│   └── Breadcrumbs
├── Center section
│   └── Global search input
└── Right section
    ├── Create button
    ├── Notifications bell
    └── User profile menu
        ├── Avatar
        ├── Name/Email
        └── Logout option
```

#### LeftSidebar (`components/LeftSidebar.tsx`)
```
LeftSidebar
├── Logo section
│   ├── KingdomX logo
│   └── Workspace name
├── Main navigation
│   └── NavItem components
├── Divider
├── Secondary navigation
│   └── NavItem components
└── Bottom navigation
    └── NavItem component
```

### UI Components (`components/ui/`)

#### Button (`components/ui/Button.tsx`)
- Variants: primary, secondary, ghost
- Sizes: sm, md, lg
- States: default, hover, active, disabled, loading

#### Card (`components/ui/Card.tsx`)
- Container with consistent styling
- Optional header, body, footer
- Hover effects

### Animation Components

#### MotionPage (`components/MotionPage.tsx`)
- Page transition wrapper
- Fade and slide animations
- Stagger children support

## Component Data Flow

### Props Down, Events Up Pattern
```
Parent Component
  ↓ props
Child Component
  ↑ callbacks/events
Parent Component (state update)
  ↓ updated props
Child Component (re-render)
```

### State Management
- Local state: useState for component-specific data
- Shared state: Props drilling (current approach)
- No global state manager (Redux/Zustand) - can be added later

### API Integration Pattern
```
Component
  → useEffect
    → axios.get/post/put/delete
      → Backend API
        → Database
      ← Response
    ← Data
  → setState
  → Re-render with data
```

## Component Testing Strategy

### Unit Tests (Jest + React Testing Library)
- Component rendering
- Props handling
- User interactions (clicks, inputs)
- State changes
- Snapshot tests

### Integration Tests
- Component + API interaction
- Form submission flows
- Navigation flows
- Modal open/close

### E2E Tests (Cypress/Playwright)
- Full user journeys
- Cross-page navigation
- Real backend integration
