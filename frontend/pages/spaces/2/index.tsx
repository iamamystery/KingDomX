import MotionPage from '../../../components/MotionPage'
import LeftSidebar from '../../../components/LeftSidebar'
import TopHeaderBar from '../../../components/TopHeaderBar'
import TaskBoard from '../../../components/TaskBoard'

export default function TeamSpacePage() {
  const breadcrumbs = [{ name: 'Workspace' }, { name: 'Spaces' }, { name: 'Team Space' }]

  return (
    <MotionPage>
      <div className="min-h-screen bg-[#0a0a0f] flex">
        <LeftSidebar />
        <div className="flex-1 lg:ml-64">
          <TopHeaderBar breadcrumbs={breadcrumbs} pageTitle="Team Space" />
          <main className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-white mb-2">Team Space</h1>
              <p className="text-white/60">Shared workspace for team collaboration</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#13131a] rounded-xl border border-white/10 p-4">
                <h3 className="text-white font-medium mb-2">Project 1</h3>
                <p className="text-white/60 text-sm">3 active tasks</p>
              </div>
              <div className="bg-[#13131a] rounded-xl border border-white/10 p-4">
                <h3 className="text-white font-medium mb-2">Project 2</h3>
                <p className="text-white/60 text-sm">2 active tasks</p>
              </div>
              <div className="bg-[#13131a] rounded-xl border border-white/10 p-4">
                <h3 className="text-white font-medium mb-2">Project Notes</h3>
                <p className="text-white/60 text-sm">Documentation</p>
              </div>
            </div>
            <TaskBoard />
          </main>
        </div>
      </div>
    </MotionPage>
  )
}
