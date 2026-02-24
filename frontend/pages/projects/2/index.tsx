import MotionPage from '../../../components/MotionPage'
import LeftSidebar from '../../../components/LeftSidebar'
import TopHeaderBar from '../../../components/TopHeaderBar'
import TaskBoard from '../../../components/TaskBoard'

export default function Project2Page() {
  const breadcrumbs = [{ name: 'Workspace' }, { name: 'Projects' }, { name: 'Project 2' }]

  return (
    <MotionPage>
      <div className="min-h-screen bg-[#0a0a0f] flex">
        <LeftSidebar />
        <div className="flex-1 lg:ml-64">
          <TopHeaderBar breadcrumbs={breadcrumbs} pageTitle="Project 2" />
          <main className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-white mb-2">Project 2</h1>
              <p className="text-white/60">Secondary project for testing and experimentation</p>
            </div>
            <TaskBoard />
          </main>
        </div>
      </div>
    </MotionPage>
  )
}
