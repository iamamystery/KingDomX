# KingdomX API Contracts

## Authentication

### POST /api/auth/register
**Request:**
```json
{
  "email": "string (required, valid email)",
  "password": "string (required, min 6 chars)",
  "name": "string (optional)"
}
```

**Response 201:**
```json
{
  "token": "JWT string",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "CLIENT"
  }
}
```

**Response 400:** Email already exists or invalid input

### POST /api/auth/login
**Request:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response 200:**
```json
{
  "token": "JWT string",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "CLIENT"
  }
}
```

**Response 401:** Invalid credentials

### GET /api/auth/me
**Headers:** `Authorization: Bearer <token>`

**Response 200:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "role": "CLIENT",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

**Response 401:** Invalid or missing token

---

## Tasks

### GET /api/tasks
**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `projectId` (optional): Filter by project
- `assigneeId` (optional): Filter by assignee
- `status` (optional): Filter by status (todo, in-progress, done)

**Response 200:**
```json
[
  {
    "id": 1,
    "title": "Task title",
    "description": "Task description",
    "status": "todo",
    "position": 0,
    "dueDate": "2024-01-15T00:00:00Z",
    "assigneeId": 1,
    "projectId": 1,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z",
    "assignee": { "id": 1, "name": "John" },
    "project": { "id": 1, "name": "Project A" }
  }
]
```

### POST /api/tasks
**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "title": "string (required, max 255)",
  "description": "string (optional)",
  "status": "string (optional, default: todo)",
  "dueDate": "ISO date (optional)",
  "assigneeId": "number (optional)",
  "projectId": "number (optional)"
}
```

**Response 201:** Created task object

### PUT /api/tasks/:id
**Headers:** `Authorization: Bearer <token>`

**Request:** Partial task update
```json
{
  "title": "string (optional)",
  "status": "string (optional)",
  "position": "number (optional)"
}
```

**Response 200:** Updated task object

**Response 404:** Task not found or not authorized

### DELETE /api/tasks/:id
**Headers:** `Authorization: Bearer <token>`

**Response 200:** `{ "ok": true }`

---

## Projects

### GET /api/projects
**Headers:** `Authorization: Bearer <token>`

**Response 200:**
```json
[
  {
    "id": 1,
    "name": "Project name",
    "description": "Project description",
    "ownerId": 1,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z",
    "owner": { "id": 1, "name": "John" },
    "tasks": [...],
    "_count": { "tasks": 5 }
  }
]
```

### POST /api/projects
**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "name": "string (required, max 255)",
  "description": "string (optional)"
}
```

**Response 201:** Created project object

---

## Calendar

### GET /api/calendar
**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `start` (required): ISO date for range start
- `end` (required): ISO date for range end

**Response 200:**
```json
[
  {
    "id": 1,
    "title": "Event title",
    "description": "Event description",
    "startDate": "2024-01-15T09:00:00Z",
    "endDate": "2024-01-15T10:00:00Z",
    "allDay": false,
    "type": "event",
    "taskId": null,
    "task": null
  }
]
```

### POST /api/calendar
**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "startDate": "ISO datetime (required)",
  "endDate": "ISO datetime (optional)",
  "allDay": "boolean (optional, default: false)",
  "type": "string (optional, default: event)",
  "taskId": "number (optional)"
}
```

**Response 201:** Created event object

### PUT /api/calendar/:id
**Headers:** `Authorization: Bearer <token>`

**Request:** Partial event update

**Response 200:** Updated event object

**Response 404:** Event not found or not authorized

### DELETE /api/calendar/:id
**Headers:** `Authorization: Bearer <token>`

**Response 200:** `{ "ok": true }`

---

## Automations

### GET /api/automations
**Headers:** `Authorization: Bearer <token>`

**Response 200:**
```json
[
  {
    "id": 1,
    "name": "Automation name",
    "trigger": { "type": "task_status_changed", "config": {} },
    "conditions": { "field": "status", "operator": "equals", "value": "done" },
    "actions": [{ "type": "send_notification", "config": {} }],
    "status": "active",
    "runCount": 42,
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

### POST /api/automations
**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "name": "string (required)",
  "trigger": { "type": "string", "config": "object" },
  "conditions": { "field": "string", "operator": "string", "value": "any" },
  "actions": [{ "type": "string", "config": "object" }]
}
```

**Response 201:** Created automation object

### PUT /api/automations/:id
**Headers:** `Authorization: Bearer <token>`

**Request:** Partial automation update
```json
{
  "name": "string (optional)",
  "status": "active | paused | disabled"
}
```

**Response 200:** Updated automation object

### DELETE /api/automations/:id
**Headers:** `Authorization: Bearer <token>`

**Response 200:** `{ "ok": true }`

### POST /api/automations/:id/run
**Headers:** `Authorization: Bearer <token>`

**Response 200:** Updated automation with incremented runCount

---

## Reports

### GET /api/reports/dashboard
**Headers:** `Authorization: Bearer <token>`

**Response 200:**
```json
{
  "overview": {
    "totalTasks": 50,
    "completedTasks": 30,
    "inProgressTasks": 10,
    "todoTasks": 10,
    "totalProjects": 5,
    "completionRate": 60
  },
  "weekly": {
    "completedThisWeek": 8,
    "trend": "+12%"
  },
  "recentActivity": [
    {
      "id": 1,
      "title": "Task title",
      "status": "done",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ],
  "byProject": [
    {
      "id": 1,
      "name": "Project A",
      "taskCount": 10,
      "completedCount": 6
    }
  ]
}
```

### GET /api/reports/trends
**Headers:** `Authorization: Bearer <token>`

**Response 200:**
```json
{
  "dailyStats": [
    {
      "date": "2024-01-01",
      "created": 2,
      "completed": 1
    }
  ]
}
```

### GET /api/reports/productivity
**Headers:** `Authorization: Bearer <token>`

**Response 200:**
```json
{
  "completedTasks": 30,
  "averageCompletionTime": 48.5,
  "quickWins": 10,
  "longRunning": 5
}
```

---

## Users

### GET /api/users
**Headers:** `Authorization: Bearer <token>`

**Response 200:**
```json
[
  {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "CLIENT"
  }
]
```

---

## Error Response Format

All errors follow this structure:

```json
{
  "error": "Error description",
  "message": "Detailed message",
  "statusCode": 400
}
```

### Common HTTP Status Codes
- **200** - OK (GET, PUT success)
- **201** - Created (POST success)
- **400** - Bad Request (validation error)
- **401** - Unauthorized (invalid/missing token)
- **403** - Forbidden (permission denied)
- **404** - Not Found (resource doesn't exist)
- **500** - Internal Server Error

---

## Authentication Flow

1. User registers/logs in
2. Server validates credentials
3. Server generates JWT token
4. Client stores token in localStorage
5. Client includes token in all subsequent requests: `Authorization: Bearer <token>`
6. Server verifies token on protected routes
7. Server extracts userId from token payload
8. Server filters data by userId (user can only see own data)

---

## Rate Limiting

- **Limit:** 200 requests per 15 minutes per IP
- **Header:** `X-RateLimit-Remaining` shows remaining requests
- **Response 429:** Too many requests

---

## Pagination

Not currently implemented. All list endpoints return full dataset.
Recommended for production: Add `?page=1&limit=20` parameters.
