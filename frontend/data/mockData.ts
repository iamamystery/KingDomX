export interface Task {
  id: number
  title: string
  status: 'todo' | 'in-progress' | 'review' | 'done'
  priority: 'Urgent' | 'High' | 'Medium' | 'Low'
  dueDate?: string
  assignees?: string[]
  projectId?: number
  description?: string
  tags?: string[]
  completed?: boolean
}

export interface Project {
  id: number
  name: string
  description: string
  status: 'active' | 'completed' | 'on-hold'
  progress: number
  members: string[]
  dueDate?: string
}

export interface CalendarEvent {
  id: number
  title: string
  date: string
  startDate?: string
  endDate?: string
  allDay?: boolean
  type: 'event' | 'task' | 'meeting' | 'deadline'
  description?: string
}

export interface Automation {
  id: number
  name: string
  trigger: { type: string; config: any }
  conditions?: { field: string; operator: string; value: any }
  actions: { type: string; config: any }[]
  status: 'active' | 'paused' | 'disabled'
  runCount: number
}

export interface User {
  id: number
  name: string
  email: string
  role: 'ADMIN' | 'MANAGER' | 'STAFF' | 'CLIENT'
  avatar?: string
  status: 'online' | 'offline' | 'away'
}

export const mockTasks: Task[] = [
  { id: 1, title: 'Design new landing page', status: 'in-progress', priority: 'High', dueDate: '2026-02-25', assignees: ['Muhammad Jawad'], projectId: 1, description: 'Create a modern landing page design', tags: ['design', 'ui'], completed: false },
  { id: 2, title: 'Fix navigation bug', status: 'todo', priority: 'Urgent', dueDate: '2026-02-24', assignees: ['Alice Chen'], projectId: 1, description: 'Navigation menu not responsive on mobile', tags: ['bug', 'mobile'], completed: false },
  { id: 3, title: 'Update documentation', status: 'done', priority: 'Low', dueDate: '2026-02-20', assignees: ['Bob Smith'], projectId: 2, description: 'Update API documentation', tags: ['docs'], completed: true },
  { id: 4, title: 'Implement user authentication', status: 'in-progress', priority: 'High', dueDate: '2026-02-28', assignees: ['Muhammad Jawad', 'Carol Wu'], projectId: 1, description: 'Add JWT authentication', tags: ['auth', 'backend'], completed: false },
  { id: 5, title: 'Code review', status: 'review', priority: 'Medium', dueDate: '2026-02-26', assignees: ['Alice Chen'], projectId: 3, description: 'Review pull requests', tags: ['review'], completed: false },
  { id: 6, title: 'Setup CI/CD pipeline', status: 'todo', priority: 'High', dueDate: '2026-03-01', assignees: ['Bob Smith'], projectId: 2, description: 'Configure GitHub Actions', tags: ['devops'], completed: false },
  { id: 7, title: 'Client meeting preparation', status: 'todo', priority: 'Medium', dueDate: '2026-02-27', assignees: ['Carol Wu'], projectId: 3, description: 'Prepare presentation slides', tags: ['meeting'], completed: false },
  { id: 8, title: 'Database optimization', status: 'done', priority: 'High', dueDate: '2026-02-18', assignees: ['Muhammad Jawad'], projectId: 2, description: 'Optimize slow queries', tags: ['database', 'performance'], completed: true },
  { id: 9, title: 'Write unit tests', status: 'in-progress', priority: 'Medium', dueDate: '2026-03-05', assignees: ['Alice Chen', 'Bob Smith'], projectId: 1, description: 'Increase test coverage', tags: ['testing'], completed: false },
  { id: 10, title: 'Deploy to production', status: 'todo', priority: 'Urgent', dueDate: '2026-02-24', assignees: ['Muhammad Jawad'], projectId: 1, description: 'Deploy latest release', tags: ['deploy'], completed: false },
  { id: 11, title: 'User feedback analysis', status: 'todo', priority: 'Low', dueDate: '2026-03-10', assignees: ['Carol Wu'], projectId: 3, description: 'Analyze user feedback surveys', tags: ['analytics'], completed: false },
  { id: 12, title: 'Security audit', status: 'review', priority: 'High', dueDate: '2026-02-25', assignees: ['Bob Smith'], projectId: 2, description: 'Run security scan', tags: ['security'], completed: false },
]

export const mockProjects: Project[] = [
  { id: 1, name: 'Website Redesign', description: 'Complete redesign of company website', status: 'active', progress: 65, members: ['Muhammad Jawad', 'Alice Chen', 'Bob Smith'], dueDate: '2026-03-15' },
  { id: 2, name: 'Mobile App', description: 'iOS and Android mobile application', status: 'active', progress: 40, members: ['Muhammad Jawad', 'Carol Wu'], dueDate: '2026-04-20' },
  { id: 3, name: 'Marketing Campaign', description: 'Q1 marketing campaign', status: 'on-hold', progress: 25, members: ['Alice Chen', 'Carol Wu'], dueDate: '2026-03-01' },
  { id: 4, name: 'Internal Tools', description: 'Build internal productivity tools', status: 'completed', progress: 100, members: ['Bob Smith'], dueDate: '2026-02-15' },
]

export const mockUsers: User[] = [
  { id: 1, name: 'Muhammad Jawad', email: 'jawad@kingdomx.com', role: 'ADMIN', status: 'online' },
  { id: 2, name: 'Alice Chen', email: 'alice@kingdomx.com', role: 'MANAGER', status: 'online' },
  { id: 3, name: 'Bob Smith', email: 'bob@kingdomx.com', role: 'STAFF', status: 'away' },
  { id: 4, name: 'Carol Wu', email: 'carol@kingdomx.com', role: 'STAFF', status: 'offline' },
]

export const mockAutomations: Automation[] = [
  { id: 1, name: 'Auto-assign tasks', trigger: { type: 'task_created', config: {} }, actions: [{ type: 'assign_to_lead', config: {} }], status: 'active', runCount: 15 },
  { id: 2, name: 'Due date reminders', trigger: { type: 'due_date_approaching', config: { days_before: 1 } }, actions: [{ type: 'send_notification', config: {} }], status: 'active', runCount: 42 },
  { id: 3, name: 'Status updates', trigger: { type: 'task_completed', config: {} }, actions: [{ type: 'update_progress', config: {} }], status: 'paused', runCount: 8 },
]

export const mockCalendarEvents: CalendarEvent[] = [
  { id: 1, title: 'Team Standup', date: '2026-02-25', type: 'meeting' },
  { id: 2, title: 'Project Review', date: '2026-02-26', type: 'meeting' },
  { id: 3, title: 'Design Deadline', date: '2026-02-25', type: 'deadline' },
  { id: 4, title: 'Client Presentation', date: '2026-02-28', type: 'meeting' },
]
