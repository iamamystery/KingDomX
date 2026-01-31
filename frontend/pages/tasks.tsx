import MotionPage from '../components/MotionPage'
import TaskBoard from '../components/TaskBoard'
import NavBar from '../components/NavBar'

export default function TasksPage() {
  return (
    <MotionPage>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <NavBar />
        <main className="max-w-7xl mx-auto p-6">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-sm text-gray-500">Real-time task board — Drag & drop (coming soon)</p>
          <section className="mt-6">
            <TaskBoard />
          </section>
        </main>
      </div>
    </MotionPage>
  )
}