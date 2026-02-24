import MotionPage from '../components/MotionPage'
import LeftSidebar from '../components/LeftSidebar'
import TopHeaderBar from '../components/TopHeaderBar'

export default function PostsPage() {
  const breadcrumbs = [{ name: 'Workspace' }, { name: 'Posts' }]

  return (
    <MotionPage>
      <div className="min-h-screen bg-[#0a0a0f] flex">
        <LeftSidebar />
        <div className="flex-1 lg:ml-64">
          <TopHeaderBar breadcrumbs={breadcrumbs} pageTitle="Posts" />
          <main className="p-6">
            <h1 className="text-2xl font-semibold text-white mb-4">Posts</h1>
            <div className="bg-[#13131a] rounded-xl border border-white/10 p-8">
              <p className="text-white/60">No posts yet. Your workspace posts and announcements will appear here.</p>
            </div>
          </main>
        </div>
      </div>
    </MotionPage>
  )
}
