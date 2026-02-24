import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import logo from '../assets/logo.png'

// Icon components
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  )
}

function InboxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
  )
}

function HashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
    </svg>
  )
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  )
}

function LayersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  )
}

function WorkspaceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 01212 5.83 23.931 23.931 0 013 13.255m5 5.255a23.931 23.931 0 01-5-9.331 23.931 23.931 0 015-9.331 23.931 23.931 0 015 9.331 23.931 23.931 0 01-5 9.331m15 5.255a23.931 23.931 0 01-5-9.331 23.931 23.931 0 015-9.331 23.931 23.931 0 015 9.331 23.931 23.931 0 01-5 9.331" />
    </svg>
  )
}

function FileTextIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  )
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

function AutomationsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
}

function ReportsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

// Mock data
const favorites = [
  { name: 'My Tasks', href: '/tasks', icon: StarIcon },
  { name: 'Assigned to Me', href: '/inbox', icon: InboxIcon },
]

const channels = [
  { id: 1, name: 'General', href: '/chat/general', icon: HashIcon },
  { id: 2, name: 'Welcome', href: '/chat/welcome', icon: HashIcon },
  { id: 3, name: 'Project 1', href: '/projects/1', icon: FolderIcon },
]

const directMessages = [
  { id: 1, name: 'Muhammad Jawad', href: '/chat/dm/1', avatar: 'MJ', status: 'online', isYou: true },
]

const spaces = [
  { id: 1, name: 'All Tasks', href: '/tasks', icon: LayersIcon, isDefault: true },
  {
    id: 2, name: 'Team Space', href: '/spaces/2', icon: WorkspaceIcon, expanded: true,
    children: [
      { id: 21, name: 'Project 1', href: '/projects/1', icon: FolderIcon, count: 3 },
      { id: 22, name: 'Project 2', href: '/projects/2', icon: FolderIcon },
      { id: 23, name: 'Project Notes', href: '/docs/project-notes', icon: FileTextIcon },
    ],
  },
]

export default function LeftSidebar() {
  const router = useRouter()
  const currentPath = router.pathname
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    favorites: true, channels: true, dms: true, spaces: true, more: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section as keyof typeof prev] }))
  }

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        w-64 h-screen bg-[#0a0a0f] border-r border-white/10 flex flex-col fixed left-0 top-0 z-50
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile Close Button */}
        <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden absolute top-4 right-4 p-2 text-white/60 hover:text-white">
          <XIcon className="w-5 h-5" />
        </button>

        {/* Workspace Header */}
        <div className="p-3 border-b border-white/10">
          <Link href="/dashboard" className="flex items-center gap-3 hover:bg-white/5 rounded-lg p-2 transition-colors">
            <div className="w-9 h-9 relative">
              <Image src={logo} alt="KingdomX" fill className="object-contain" priority />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-white truncate">Kings Workspace</span>
                <ChevronDownIcon className="w-4 h-4 text-white/40 flex-shrink-0" />
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-4">
          {/* Home */}
          <div className="p-2">
            <NavItem item={{ name: 'Home', href: '/dashboard', icon: HomeIcon }} isActive={currentPath === '/dashboard'} />
          </div>

          {/* Favorites */}
          <SidebarSection title="Favorites" isExpanded={expandedSections.favorites} onToggle={() => toggleSection('favorites')}>
            <div className="space-y-0.5">
              {favorites.map((item) => (
                <NavItem key={item.name} item={item} isActive={currentPath === item.href} compact />
              ))}
            </div>
          </SidebarSection>

          {/* Channels */}
          <SidebarSection title="Channels" isExpanded={expandedSections.channels} onToggle={() => toggleSection('channels')}>
            <div className="space-y-0.5">
              {channels.map((channel) => (
                <NavItem key={channel.id} item={channel} isActive={currentPath === channel.href} compact />
              ))}
            </div>
          </SidebarSection>

          {/* Direct Messages */}
          <SidebarSection title="Direct Messages" isExpanded={expandedSections.dms} onToggle={() => toggleSection('dms')}>
            <div className="space-y-0.5">
              {directMessages.map((dm) => (
                <Link key={dm.id} href={dm.href} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-all ${currentPath === dm.href ? 'bg-amber-500/10 text-amber-400' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
                  <div className="relative">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-medium text-white">{dm.avatar}</div>
                    <span className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border-2 border-[#0a0a0f] ${dm.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`} />
                  </div>
                  <span className="flex-1 text-xs">{dm.name} {dm.isYou && <span className="text-white/30">(you)</span>}</span>
                </Link>
              ))}
            </div>
          </SidebarSection>

          {/* Spaces */}
          <SidebarSection title="Spaces" isExpanded={expandedSections.spaces} onToggle={() => toggleSection('spaces')}>
            <div className="space-y-0.5">
              {spaces.map((space) => (
                <SpaceItem key={space.id} space={space} currentPath={currentPath} />
              ))}
            </div>
          </SidebarSection>

          {/* Bottom Links */}
          <div className="space-y-0.5 pt-2 border-t border-white/10">
            <NavItem item={{ name: 'Calendar', href: '/calendar', icon: CalendarIcon }} isActive={currentPath === '/calendar'} compact />
            <NavItem item={{ name: 'Automations', href: '/automations', icon: AutomationsIcon }} isActive={currentPath === '/automations'} compact />
            <NavItem item={{ name: 'Reports', href: '/reports', icon: ReportsIcon }} isActive={currentPath === '/reports'} compact />
          </div>
        </nav>

        {/* Settings */}
        <div className="p-2 border-t border-white/10">
          <NavItem item={{ name: 'Settings', href: '/settings', icon: SettingsIcon }} isActive={currentPath === '/settings'} compact />
        </div>
      </aside>
    </>
  )
}

// Sub-components
function NavItem({ item, isActive, compact = false }: { item: { name: string; href: string; icon: any }; isActive: boolean; compact?: boolean }) {
  const Icon = item.icon
  const padding = compact ? 'px-2 py-1.5' : 'px-3 py-2'
  const iconSize = compact ? 'w-4 h-4' : 'w-5 h-5'

  return (
    <Link href={item.href} className={`flex items-center gap-2 ${padding} rounded-lg text-sm transition-all duration-200 group ${isActive ? 'bg-amber-500/10 text-amber-400' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
      <Icon className={`${iconSize} ${isActive ? 'text-amber-400' : 'text-white/50 group-hover:text-white/70'}`} />
      <span className="flex-1 font-medium">{item.name}</span>
    </Link>
  )
}

function SidebarSection({ title, children, isExpanded, onToggle }: { title: string; children: React.ReactNode; isExpanded: boolean; onToggle: () => void }) {
  return (
    <div>
      <button onClick={onToggle} className="w-full flex items-center gap-1 px-2 mb-1 text-xs font-medium text-white/40 hover:text-white/60 transition-colors">
        <motion.span animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.15 }}>
          <ChevronRightIcon className="w-3.5 h-3.5" />
        </motion.span>
        <span>{title}</span>
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SpaceItem({ space, currentPath }: { space: any; currentPath: string }) {
  const [isExpanded, setIsExpanded] = useState(space.expanded || false)
  const Icon = space.icon
  const isActive = currentPath === space.href

  return (
    <div>
      <button onClick={() => setIsExpanded(!isExpanded)} className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-all ${isActive ? 'bg-amber-500/10 text-amber-400' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
        <motion.span animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.15 }}>
          <ChevronRightIcon className="w-3.5 h-3.5" />
        </motion.span>
        <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-white/50'}`} />
        <span className="flex-1 text-xs font-medium text-left">{space.name}</span>
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && space.children && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden ml-4 pl-2 border-l border-white/10">
            {space.children.map((child: any) => (
              <Link key={child.id} href={child.href} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-all mt-0.5 ${currentPath === child.href ? 'text-amber-400 bg-amber-500/5' : 'text-white/50 hover:text-white/70 hover:bg-white/5'}`}>
                <child.icon className="w-3.5 h-3.5" />
                <span className="flex-1">{child.name}</span>
                {child.count && <span className="text-[10px] text-white/30 px-1.5 py-0.5 bg-white/5 rounded">{child.count}</span>}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
