
import { useState } from 'react'
import {
  Activity, BookOpen, CalendarDays, CarFront, ChevronRight,
  CircleCheck, Gauge, LayoutDashboard, Settings, Trophy,
  Map, BarChart3, Music, User, ClipboardList, Target,
  Clock, Flame, Lock, Play
} from 'lucide-react'

const pages = [
  { name: 'Home Garage', icon: LayoutDashboard },
  { name: 'Study Planner', icon: CalendarDays },
  { name: 'Study Circuit', icon: Activity },
  { name: 'Roadmap', icon: Map },
  { name: 'Syllabus Tracker', icon: BookOpen },
  { name: 'Reports & Tests', icon: BarChart3 },
  { name: 'Garage & Collection', icon: CarFront },
  { name: 'Music Room', icon: Music },
  { name: 'Achievement Vault', icon: Trophy },
  { name: 'Profile & Settings', icon: Settings },
]

const descriptions: Record<string, string> = {
  'Study Planner': 'Your preparation schedule and daily missions.',
  'Study Circuit': 'Track your study journey checkpoint by checkpoint.',
  Roadmap: 'Your long-term academic racing career.',
  'Syllabus Tracker': 'Monitor your syllabus chapter by chapter.',
  'Reports & Tests': 'Understand your performance and mock test results.',
  'Garage & Collection': 'Explore your vehicle collection and upgrades.',
  'Music Room': 'Your personal focus music space.',
  'Achievement Vault': 'Your milestones, trophies and earned rewards.',
  'Profile & Settings': 'Manage your identity and app preferences.',
}

function Stat({ label, value, note }: { label: string; value: string; note: string }) {
  return <article className="stat-card">
    <span>{label}</span><strong>{value}</strong><small>{note}</small>
  </article>
}

function Home({ navigate }: { navigate: (page: string) => void }) {
  return <>
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow red">YOUR NEXT MILE STARTS HERE</span>
        <h2>PREPARE.<br/>PROGRESS.<br/><em>PREVAIL.</em></h2>
        <p>Your personal command centre for the road to achievement.</p>
        <button className="primary" onClick={() => navigate('Study Planner')}>START RACE <ChevronRight size={17}/></button>
      </div>
      <div className="car-art">
        <div className="orbit orbit-one"/>
        <div className="orbit orbit-two"/>
        <div className="car-symbol"><CarFront size={118} strokeWidth={0.8}/></div>
        <span className="car-caption">GARAGE // VEHICLE 001</span>
      </div>
    </section>
    <section className="stats">
      <Stat label="CAREER RANK" value="ROOKIE DRIVER" note="Your journey begins here"/>
      <Stat label="EXPERIENCE POINTS" value="0 XP" note="Earn XP through real progress"/>
      <Stat label="DAILY PROGRESS" value="0%" note="No completed missions yet"/>
    </section>
    <section className="lower">
      <div className="panel">
        <div className="panel-head"><div><span className="eyebrow">MISSION CONTROL</span><h3>Today's mission</h3></div><Gauge size={20}/></div>
        <div className="empty"><CircleCheck size={25}/><b>No mission assigned yet</b><p>Your study plan will appear here.</p></div>
      </div>
      <div className="panel">
        <div className="panel-head"><div><span className="eyebrow">QUICK ACCESS</span><h3>Launch a module</h3></div></div>
        {['Study Planner','Syllabus Tracker','Reports & Tests'].map((x,i)=>
          <button className="quick" key={x} onClick={() => navigate(x)}>
            <span className="quick-num">0{i+1}</span>{x}<ChevronRight size={16}/>
          </button>
        )}
      </div>
    </section>
  </>
}

function ModulePage({ page, navigate }: { page: string; navigate: (page: string) => void }) {
  const content: Record<string, { title: string; subtitle: string; items: string[] }> = {
    'Study Planner': {
      title: 'YOUR DAILY MISSION',
      subtitle: 'Plan, organise and complete your study sessions.',
      items: ['Daily timetable', 'AI study plan', 'Pending tasks', 'Completed tasks', 'Backlog review'],
    },
    'Study Circuit': {
      title: 'THE STUDY TRACK',
      subtitle: 'Every checkpoint represents a real study mission.',
      items: ['Upcoming checkpoints', 'Current mission', 'Completed checkpoints', 'Daily progress'],
    },
    Roadmap: {
      title: 'YOUR CAREER ROADMAP',
      subtitle: 'Progress through academic levels and unlock milestones.',
      items: ['Rookie Driver', 'Pro Driver', 'Elite Driver', 'Champion'],
    },
    'Syllabus Tracker': {
      title: 'SYLLABUS COMMAND',
      subtitle: 'Track your preparation across subjects and chapters.',
      items: ['Physics', 'Chemistry', 'Mathematics'],
    },
    'Reports & Tests': {
      title: 'PERFORMANCE CENTRE',
      subtitle: 'Review your actual study data and test performance.',
      items: ['Daily reports', 'Weekly reports', 'Mock test records', 'Subject performance'],
    },
    'Garage & Collection': {
      title: 'YOUR VEHICLE COLLECTION',
      subtitle: 'Discover vehicles, customisation and garage upgrades.',
      items: ['My vehicles', 'Vehicle collection', 'Customisation', 'Garage environments'],
    },
    'Music Room': {
      title: 'FOCUS SOUNDTRACK',
      subtitle: 'Your dedicated study music space.',
      items: ['Focus playlists', 'Saved playlists', 'Spotify connection'],
    },
    'Achievement Vault': {
      title: 'YOUR ACHIEVEMENTS',
      subtitle: 'Every milestone records genuine progress.',
      items: ['Trophies', 'Career milestones', 'Challenge rewards'],
    },
    'Profile & Settings': {
      title: 'DRIVER CONFIGURATION',
      subtitle: 'Manage your profile and TORVEX preferences.',
      items: ['Personal profile', 'Study preferences', 'Notifications', 'Privacy and data', 'App settings'],
    },
  }

  const data = content[page]
  return <section className="module-page">
    <div className="module-banner">
      <span className="eyebrow red">TORVEX / MODULE</span>
      <h2>{data.title}</h2>
      <p>{data.subtitle}</p>
    </div>
    <div className="module-grid">
      {data.items.map((item, index) => (
        <article className="module-card" key={item}>
          <span className="module-number">0{index + 1}</span>
          <h3>{item}</h3>
          <p>{page === 'Syllabus Tracker' ? 'Subject workspace' : 'Module workspace'}</p>
          <span className="module-status"><Lock size={12}/> SETUP PENDING</span>
        </article>
      ))}
    </div>
    {page === 'Study Planner' && (
      <div className="panel module-note">
        <h3>Build your first study plan</h3>
        <p>Your timetable and AI planning tools will be configured in the next development phase.</p>
        <button className="primary" onClick={() => navigate('Profile & Settings')}>CONFIGURE PROFILE <ChevronRight size={16}/></button>
      </div>
    )}
  </section>
}

export default function App() {
  const [active, setActive] = useState('Home Garage')

  return <div className="shell">
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">T</div>
        <div><strong>TORVEX</strong><small>BUILT FOR AMBITION</small></div>
      </div>
      <div className="side-label">COMMAND CENTRE</div>
      {pages.map(item => (
        <button key={item.name}
          className={active === item.name ? 'nav-item active' : 'nav-item'}
          onClick={() => setActive(item.name)}>
          <item.icon size={18}/><span>{item.name}</span>
        </button>
      ))}
      <div className="sidebar-foot"><span className="status-dot"/> SYSTEM READY <span>v0.2</span></div>
    </aside>

    <main className="main">
      <header className="topbar">
        <div><span className="eyebrow">TORVEX / COMMAND</span><h1>{active}</h1></div>
        <div className="profile"><div className="avatar">S</div><div><b>DRIVER PROFILE</b><small>ROOKIE CLASS</small></div></div>
      </header>

      {active === 'Home Garage'
        ? <Home navigate={setActive}/>
        : <ModulePage page={active} navigate={setActive}/>
      }

      <footer>TORVEX <span>•</span> DRIVEN BY PROGRESS. DEFINED BY ACHIEVEMENT.</footer>
    </main>
  </div>
}
