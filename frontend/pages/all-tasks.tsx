import MotionPage from '../components/MotionPage'
import LeftSidebar from '../components/LeftSidebar'
import TopHeaderBar from '../components/TopHeaderBar'
import TaskBoard from '../components/TaskBoard'

export default function AllTasksPage() {
  const breadcrumbs = [{ name: 'Workspace' }, { name: 'All Tasks' }]

  return (
    <MotionPage>
      <div className="min-h-screen bg-[#0a0a0f] flex">
        <LeftSidebar />
        <div className="flex-1 lg:ml-64">
          <TopHeaderBar breadcrumbs={breadcrumbs} pageTitle="All Tasks" />
          <main className="p-6">
            <TaskBoard />
          </main>
        </div>
      </div>
    </MotionPage>
  )
}
