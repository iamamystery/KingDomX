import MotionPage from '../../../components/MotionPage'
import LeftSidebar from '../../../components/LeftSidebar'
import TopHeaderBar from '../../../components/TopHeaderBar'

export default function GeneralChannelPage() {
  const breadcrumbs = [{ name: 'Workspace' }, { name: 'Chat' }, { name: 'general' }]

  return (
    <MotionPage>
      <div className="min-h-screen bg-[#0a0a0f] flex">
        <LeftSidebar />
        <div className="flex-1 lg:ml-64">
          <TopHeaderBar breadcrumbs={breadcrumbs} pageTitle="#general" />
          <main className="p-6">
            <div className="max-w-3xl mx-auto">
              <div className="bg-[#13131a] rounded-xl border border-white/10 p-6 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-amber-400 text-2xl">#</span>
                  <h1 className="text-xl font-semibold text-white">general</h1>
                </div>
                <p className="text-white/60">Welcome to the general channel! This is where team-wide announcements and discussions happen.</p>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-xs font-bold text-white">MJ</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium text-sm">Muhammad Jawad</span>
                      <span className="text-white/40 text-xs">10:30 AM</span>
                    </div>
                    <p className="text-white/80 text-sm">Hey team! Welcome to KingdomX workspace.</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </MotionPage>
  )
}
