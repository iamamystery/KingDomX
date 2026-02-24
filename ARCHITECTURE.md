# KingdomX Architecture Overview

## 1. System Architecture

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐   │
│  │   Next.js   │  │  React UI   │  │  Framer Motion      │   │
│  │   Frontend  │  │  Components │  │  Animations         │   │
│  └─────────────┘  └─────────────┘  └─────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼ HTTP/REST + WebSocket
┌─────────────────────────────────────────────────────────────────┐
│                       API GATEWAY LAYER                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐   │
│  │   Express   │  │   CORS      │  │  Rate Limiter       │   │
│  │   Server    │  │   Helmet    │  │  (200 req/15min)    │   │
│  └─────────────┘  └─────────────┘  └─────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SERVICE LAYER                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │
│  │   Auth   │ │  Tasks   │ │ Projects │ │  Calendar        │  │
│  │  Service │ │ Service  │ │ Service  │ │  Service         │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                       │
│  │Automation│ │ Reports  │ │  Users   │                       │
│  │ Service  │ │ Service  │ │ Service  │                       │
│  └──────────┘ └──────────┘ └──────────┘                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                  │
│  ┌─────────────────┐  ┌─────────────────────────────────────┐  │
│  │  Prisma ORM     │  │  SQLite Database                    │  │
│  │  (Type-safe)    │  │  (dev.db)                           │  │
│  └─────────────────┘  └─────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## 2. Technology Stack

### Frontend
- **Framework**: Next.js 14 (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **HTTP Client**: Axios
- **Icons**: Custom SVG components
- **State**: React hooks (useState, useEffect, useMemo)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma 5.x
- **Database**: SQLite (dev), PostgreSQL (prod-ready)
- **Auth**: JWT (jsonwebtoken)
- **Security**: Helmet, CORS, express-rate-limit
- **OAuth**: Passport (Google/GitHub ready)

## 3. Domain Models

### User
```typescript
interface User {
  id: number
  email: string (unique)
  name: string?
  password: string?
  role: 'ADMIN' | 'MANAGER' | 'STAFF' | 'CLIENT'
  createdAt: DateTime
  updatedAt: DateTime
  relations: tasks[], ownedProjects[], calendarEvents[], automations[]
}
```

### Project
```typescript
interface Project {
  id: number
  name: string
  description: string?
  ownerId: number
  owner: User
  tasks: Task[]
  createdAt: DateTime
  updatedAt: DateTime
}
```

### Task
```typescript
interface Task {
  id: number
  title: string
  description: string?
  status: 'todo' | 'in-progress' | 'done'
  position: number?
  dueDate: DateTime?
  assigneeId: number?
  assignee: User?
  projectId: number?
  project: Project?
  createdAt: DateTime
  updatedAt: DateTime
}
```

### CalendarEvent
```typescript
interface CalendarEvent {
  id: number
  title: string
  description: string?
  startDate: DateTime
  endDate: DateTime?
  allDay: boolean
  type: 'event' | 'task' | 'meeting'
  taskId: number?
  task: Task?
  userId: number
  user: User
}
```

### Automation
```typescript
interface Automation {
  id: number
  name: string
  trigger: JSON { type: string, config: any }
  conditions: JSON?
  actions: JSON[] { type: string, config: any }
  status: 'active' | 'paused' | 'disabled'
  runCount: number
  userId: number
  user: User
}
```

## 4. Security Model

### Authentication
- JWT tokens (HS256)
- Bearer token in Authorization header
- Token storage: localStorage (frontend)
- Token expiration: 24 hours

### Authorization
- Role-based access control (RBAC)
- Middleware: verifyToken on protected routes
- User can only access own data (userId filtering)

### Rate Limiting
- 200 requests per 15 minutes per IP
- Applied globally via express-rate-limit

## 5. Data Flow Patterns

### Standard CRUD Flow
1. User action (click, submit)
2. Frontend state update (optimistic or loading)
3. API call via axios with JWT header
4. Backend validation & auth check
5. Database operation via Prisma
6. JSON response
7. Frontend state update with response data
8. UI re-render

### Real-time (WebSocket ready)
- Socket.io configured in backend
- Connection established on server start
- Ready for chat messages and live updates

## 6. Error Handling Strategy

### Frontend
- try/catch on all API calls
- console.error for debugging
- Graceful degradation (show empty states)
- Loading states for async operations

### Backend
- Global error handler middleware
- Consistent error response format
- Database error catching
- Authentication failure handling

## 7. Scalability Considerations

### Current Limits
- SQLite: Good for development, single-file
- Rate limiting: Prevents abuse
- Stateless API: Horizontal scaling ready

### Production Readiness
- Database: Migrate to PostgreSQL
- Caching: Redis ready for session/cache
- File storage: S3 compatible for uploads
- CDN: Static assets served via CDN

## 8. Monorepo Structure

```
/KingDomX
├── /frontend
│   ├── /components      # React components
│   ├── /pages          # Next.js pages
│   ├── /public         # Static assets
│   ├── /styles         # Global styles
│   └── /tests          # Frontend tests
├── /backend
│   ├── /src
│   │   ├── /routes     # API routes
│   │   ├── /middleware # Auth, error handling
│   │   ├── /prisma     # Schema & migrations
│   │   └── /tests      # Backend tests
│   └── package.json
├── /shared
│   └── /types          # Shared TypeScript types
└── README.md
```
