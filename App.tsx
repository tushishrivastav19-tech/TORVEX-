import { useState } from 'react'
import { Activity, BookOpen, CalendarDays, CarFront, ChevronRight, CircleCheck, Gauge, LayoutDashboard, Settings, Trophy } from 'lucide-react'

const nav = [
  { label: 'Home Garage', icon: LayoutDashboard },
  { label: 'Study Planner', icon: CalendarDays },
  { label: 'Study Circuit', icon: Activity },
  { label: 'Syllabus Tracker', icon: BookOpen },
  { label: 'Garage & Collection', icon: CarFront },
  { label: 'Achievement Vault', icon: Trophy },
  { label: 'Settings', icon: Settings },
]

export default function App() {
  const [active, setActive] = useState('Home Garage')
  return <div className="shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark">T</div><div><strong>TORVEX</strong><small>BUILT FOR AMBITION</small></div></div>
      <div className="side-label">COMMAND CENTRE</div>
      {nav.map(item => <button key={item.label} className={active === item.label ? 'nav-item active' : 'nav-item'} onClick={() => setActive(item.label)}><item.icon size={18}/><span>{item.label}</span></button>)}
      <div className="sidebar-foot"><span className="status-dot"/> SYSTEM READY <span>v0.1</span></div>
    </aside>
    <main className="main">
      <header className="topbar"><div><span className="eyebrow">TORVEX / COMMAND</span><h1>{active}</h1></div><div className="profile"><div className="avatar">S</div><div><b>DRIVER PROFILE</b><small>ROOKIE CLASS</small></div></div></header>
      <section className="hero">
        <div className="hero-copy"><span className="eyebrow red">YOUR NEXT MILE STARTS HERE</span><h2>PREPARE.<br/>PROGRESS.<br/><em>PREVAIL.</em></h2><p>A focused command centre for your JEE preparation journey.</p><button className="primary" onClick={() => setActive('Study Planner')}>START RACE <ChevronRight size={17}/></button></div>
        <div className="car-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="car-symbol"><CarFront size={118} strokeWidth={0.8}/></div><span className="car-caption">GARAGE // VEHICLE 001</span></div>
      </section>
      <section className="stats">
        <article><span>CAREER RANK</span><strong>ROOKIE DRIVER</strong><small>First chapter begins</small></article>
        <article><span>EXPERIENCE POINTS</span><strong>0 <i>XP</i></strong><small>Earn XP through real progress</small></article>
        <article><span>DAILY PROGRESS</span><strong>0%</strong><div className="progress"><div/></div></article>
      </section>
      <section className="lower">
        <div className="panel"><div className="panel-head"><div><span className="eyebrow">MISSION CONTROL</span><h3>Today's mission</h3></div><Gauge size={20}/></div><div className="empty"><CircleCheck size={25}/><b>No mission assigned yet</b><p>Your approved study plan will appear here.</p></div></div>
        <div className="panel"><div className="panel-head"><div><span className="eyebrow">QUICK ACCESS</span><h3>Launch a module</h3></div></div>{['Study Planner','Study Circuit','Syllabus Tracker'].map((x,i)=><button className="quick" key={x} onClick={()=>setActive(x)}><span className="quick-num">0{i+1}</span>{x}<ChevronRight size={16}/></button>)}</div>
      </section>
      <footer>TORVEX <span>•</span> DRIVEN BY PROGRESS. DEFINED BY ACHIEVEMENT.</footer>
    </main>
  </div>
}
