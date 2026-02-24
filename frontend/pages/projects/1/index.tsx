import MotionPage from '../../../components/MotionPage'
import LeftSidebar from '../../../components/LeftSidebar'
import TopHeaderBar from '../../../components/TopHeaderBar'
import TaskBoard from '../../../components/TaskBoard'

export default function Project1Page() {
  const breadcrumbs = [{ name: 'Workspace' }, { name: 'Projects' }, { name: 'Project 1' }]

  return (
    <MotionPage>
      <div className="min-h-screen bg-[#0a0a0f] flex">
        <LeftSidebar />
        <div className="flex-1 lg:ml-64">
          <TopHeaderBar breadcrumbs={breadcrumbs} pageTitle="Project 1" />
          <main className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-white mb-2">Project 1</h1>
              <p className="text-white/60">Main product development project with 3 active tasks</p>
            </div>
            <TaskBoard />
          </main>
        </div>
      </div>
    </MotionPage>
  )
}
