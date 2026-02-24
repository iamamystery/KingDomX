import MotionPage from '../../../components/MotionPage'
import LeftSidebar from '../../../components/LeftSidebar'
import TopHeaderBar from '../../../components/TopHeaderBar'

export default function ProjectNotesPage() {
  const breadcrumbs = [{ name: 'Workspace' }, { name: 'Docs' }, { name: 'Project Notes' }]

  return (
    <MotionPage>
      <div className="min-h-screen bg-[#0a0a0f] flex">
        <LeftSidebar />
        <div className="flex-1 lg:ml-64">
          <TopHeaderBar breadcrumbs={breadcrumbs} pageTitle="Project Notes" />
          <main className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-[#13131a] rounded-xl border border-white/10 p-8">
                <h1 className="text-3xl font-semibold text-white mb-4">Project Notes</h1>
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/80 leading-relaxed mb-4">
                    Welcome to the project notes documentation. This is where you can document important 
                    information about your projects, meeting notes, and technical specifications.
                  </p>
                  <h2 className="text-xl font-medium text-white mt-6 mb-3">Getting Started</h2>
                  <p className="text-white/80 leading-relaxed mb-4">
                    Use this space to organize your project documentation. You can create sections, 
                    add code snippets, and collaborate with your team members.
                  </p>
                  <div className="bg-[#1a1a23] rounded-lg p-4 mt-4">
                    <p className="text-white/60 text-sm italic">Last updated: Just now</p>
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
