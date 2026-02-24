import MotionPage from '../components/MotionPage'
import LeftSidebar from '../components/LeftSidebar'
import TopHeaderBar from '../components/TopHeaderBar'

export default function AssignedCommentsPage() {
  const breadcrumbs = [{ name: 'Workspace' }, { name: 'Assigned Comments' }]

  return (
    <MotionPage>
      <div className="min-h-screen bg-[#0a0a0f] flex">
        <LeftSidebar />
        <div className="flex-1 lg:ml-64">
          <TopHeaderBar breadcrumbs={breadcrumbs} pageTitle="Assigned Comments" />
          <main className="p-6">
            <h1 className="text-2xl font-semibold text-white mb-4">Assigned Comments</h1>
            <div className="bg-[#13131a] rounded-xl border border-white/10 p-8">
              <p className="text-white/60">No assigned comments yet. Comments assigned to you will appear here.</p>
            </div>
          </main>
        </div>
      </div>
    </MotionPage>
  )
}
