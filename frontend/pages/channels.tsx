import MotionPage from '../components/MotionPage'
import LeftSidebar from '../components/LeftSidebar'
import TopHeaderBar from '../components/TopHeaderBar'

export default function ChannelsPage() {
  const breadcrumbs = [{ name: 'Workspace' }, { name: 'All Channels' }]

  return (
    <MotionPage>
      <div className="min-h-screen bg-[#0a0a0f] flex">
        <LeftSidebar />
        <div className="flex-1 lg:ml-64">
          <TopHeaderBar breadcrumbs={breadcrumbs} pageTitle="All Channels" />
          <main className="p-6">
            <h1 className="text-2xl font-semibold text-white mb-4">All Channels</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {['general', 'welcome', 'design', 'engineering', 'marketing', 'random'].map((channel) => (
                <div key={channel} className="bg-[#13131a] rounded-xl border border-white/10 p-4 hover:border-amber-500/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400">#</span>
                    <span className="text-white font-medium">{channel}</span>
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
