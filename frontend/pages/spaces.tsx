import MotionPage from '../components/MotionPage'
import LeftSidebar from '../components/LeftSidebar'
import TopHeaderBar from '../components/TopHeaderBar'

export default function SpacesPage() {
  const breadcrumbs = [{ name: 'Workspace' }, { name: 'All Spaces' }]

  return (
    <MotionPage>
      <div className="min-h-screen bg-[#0a0a0f] flex">
        <LeftSidebar />
        <div className="flex-1 lg:ml-64">
          <TopHeaderBar breadcrumbs={breadcrumbs} pageTitle="All Spaces" />
          <main className="p-6">
            <h1 className="text-2xl font-semibold text-white mb-4">All Spaces</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {['All Tasks', 'Team Space', 'Personal', 'Archive'].map((space) => (
                <div key={space} className="bg-[#13131a] rounded-xl border border-white/10 p-4 hover:border-amber-500/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">S</span>
                    </div>
                    <span className="text-white font-medium">{space}</span>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </MotionPage>
  )
}
