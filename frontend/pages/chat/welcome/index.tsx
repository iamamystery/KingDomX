import MotionPage from '../../../components/MotionPage'
import LeftSidebar from '../../../components/LeftSidebar'
import TopHeaderBar from '../../../components/TopHeaderBar'

export default function WelcomeChannelPage() {
  const breadcrumbs = [{ name: 'Workspace' }, { name: 'Chat' }, { name: 'welcome' }]

  return (
    <MotionPage>
      <div className="min-h-screen bg-[#0a0a0f] flex">
        <LeftSidebar />
        <div className="flex-1 lg:ml-64">
          <TopHeaderBar breadcrumbs={breadcrumbs} pageTitle="#welcome" />
          <main className="p-6">
            <div className="max-w-3xl mx-auto">
              <div className="bg-[#13131a] rounded-xl border border-white/10 p-6 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-amber-400 text-2xl">#</span>
                  <h1 className="text-xl font-semibold text-white">welcome</h1>
                </div>
                <p className="text-white/60">Welcome new team members! Introduce yourself here.</p>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white">AC</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium text-sm">Alice Chen</span>
                      <span className="text-white/40 text-xs">2 days ago</span>
                    </div>
                    <p className="text-white/80 text-sm">Hi everyone! Excited to join the team. Looking forward to collaborating with you all! 🎉</p>
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
