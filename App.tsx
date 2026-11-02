
import { useState } from "react";
import { usePersistentState } from "./storage";
import {
  Activity, BookOpen, CalendarDays, CarFront, ChevronRight,
  Gauge, LayoutDashboard, Settings, Trophy,
  Map, BarChart3, Music, Plus, Trash2, Clock3, Target,
  Check, Lock, Play
} from "lucide-react";
import {
  subjects, initialChapters, initialTasks, initialSessions,
  getChapterProgress, getSubjectProgress, getStudyStats,
  type Chapter, type StudyTask, type StudySession, type Subject
} from "./studyData";

const pages = [
  { name: "Home Garage", icon: LayoutDashboard },
  { name: "Study Planner", icon: CalendarDays },
  { name: "Study Circuit", icon: Activity },
  { name: "Roadmap", icon: Map },
  { name: "Syllabus Tracker", icon: BookOpen },
  { name: "Reports & Tests", icon: BarChart3 },
  { name: "Garage & Collection", icon: CarFront },
  { name: "Music Room", icon: Music },
  { name: "Achievement Vault", icon: Trophy },
  { name: "Profile & Settings", icon: Settings },
];

const today = () => new Date().toISOString().slice(0, 10);

function Banner({ eyebrow, title, subtitle }: {
  eyebrow: string; title: string; subtitle: string;
}) {
  return <div className="module-banner">
    <span className="eyebrow red">{eyebrow}</span>
    <h2>{title}</h2><p>{subtitle}</p>
  </div>;
}

function Stat({ label, value, note }: {
  label: string; value: string; note: string;
}) {
  return <article className="stat-card">
    <span>{label}</span><strong>{value}</strong><small>{note}</small>
  </article>;
}

function Home({ navigate, tasks, chapters, sessions }: any) {
  const done = tasks.filter((t: StudyTask) => t.completed).length;
  const progress = tasks.length ? Math.round(done / tasks.length * 100) : 0;
  const stats = getStudyStats(sessions);
  const todayTasks = tasks.filter((t: StudyTask) => t.date === today());

  return <>
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow red">YOUR NEXT MILE STARTS HERE</span>
        <h2>PREPARE.<br/>PROGRESS.<br/><em>PREVAIL.</em></h2>
        <p>Your personal command centre for the road to achievement.</p>
        <button className="primary" onClick={() => navigate("Study Planner")}>
          START RACE <ChevronRight size={17}/>
        </button>
      </div>
      <div className="car-art">
        <div className="orbit orbit-one"/>
        <div className="orbit orbit-two"/>
        <div className="car-visual">
          <svg viewBox="0 0 760 300" role="img" aria-label="Silver sports car">
            <defs>
              <linearGradient id="torvexMetal" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#fff"/><stop offset=".45" stopColor="#71839c"/>
                <stop offset=".75" stopColor="#dce5f1"/><stop offset="1" stopColor="#26364e"/>
              </linearGradient>
              <linearGradient id="torvexGlass" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#526d8e"/><stop offset="1" stopColor="#080e18"/>
              </linearGradient>
            </defs>
            <ellipse cx="390" cy="245" rx="280" ry="20" fill="#000" opacity=".7"/>
            <path d="M75 205 L115 164 Q145 145 220 135 L300 78 Q325 58 382 59 L500 65 Q540 70 575 112 L645 148 Q680 165 690 200 L675 220 L90 225Z" fill="url(#torvexMetal)" stroke="#edf3fa" strokeWidth="3"/>
            <path d="M250 132 L320 82 Q345 69 382 72 L487 78 Q515 82 540 137Z" fill="url(#torvexGlass)" stroke="#c1d0e3" strokeWidth="3"/>
            <path d="M393 73 L393 134 M494 80 L540 137" stroke="#aabbd0" strokeWidth="3"/>
            <path d="M110 180 L180 174 L165 192 L105 198Z" fill="#fff"/>
            <path d="M625 164 L675 181 L680 195 L625 190Z" fill="#ed4855"/>
            <path d="M130 205 L650 205" stroke="#172335" strokeWidth="8"/>
            {[230,565].map(x => <g key={x}>
              <circle cx={x} cy="210" r="43" fill="#080d16" stroke="#9ba9bc" strokeWidth="7"/>
              <circle cx={x} cy="210" r="25" fill="#263449" stroke="#e0e6ef" strokeWidth="3"/>
              <circle cx={x} cy="210" r="8" fill="#cbd5e1"/>
            </g>)}
            <path d="M150 153 L215 145 M590 145 L642 164" stroke="#fff" strokeWidth="2" opacity=".7"/>
          </svg>
        </div>
        <span className="car-caption">TORVEX // VEHICLE 001</span>
      </div>
    </section>

    <section className="stats">
      <Stat label="CAREER RANK" value="ROOKIE DRIVER" note="Your journey begins here"/>
      <Stat label="EXPERIENCE POINTS" value={`${done * 50} XP`} note="50 XP per completed mission"/>
      <Stat label="DAILY PROGRESS" value={`${progress}%`} note={`${done} of ${tasks.length} tasks completed`}/>
    </section>

    <section className="stats">
      <Stat label="STUDY TIME" value={`${stats.totalHours} HRS`} note="Recorded sessions"/>
      <Stat label="QUESTIONS ATTEMPTED" value={`${stats.questionsAttempted}`} note="Manually recorded"/>
      <Stat label="SYLLABUS PROGRESS" value={`${chapters.length ? Math.round(chapters.reduce((a: number,c: Chapter) => a + getChapterProgress(c),0)/chapters.length) : 0}%`} note="Across available chapters"/>
    </section>

    <section className="lower">
      <div className="panel">
        <div className="panel-head">
          <div><span className="eyebrow">MISSION CONTROL</span><h3>Today's missions</h3></div>
          <Gauge size={20}/>
        </div>
        {todayTasks.length ? todayTasks.slice(0,5).map((t: StudyTask) =>
          <div className="task-row" key={t.id}>
            <span>{t.title}<small>{t.subject} · {t.plannedMinutes} min</small></span>
            {t.completed ? <Check color="#6dbb91"/> : <Clock3/>}
          </div>
        ) : <div className="empty"><Target size={25}/><b>No missions scheduled today</b><p>Create your first mission in Study Planner.</p></div>}
      </div>
      <div className="panel">
        <div className="panel-head"><div><span className="eyebrow">QUICK ACCESS</span><h3>Launch a module</h3></div></div>
        {["Study Planner","Study Circuit","Syllabus Tracker","Reports & Tests"].map((x,i) =>
          <button className="quick" key={x} onClick={() => navigate(x)}>
            <span className="quick-num">0{i+1}</span>{x}<ChevronRight size={16}/>
          </button>
        )}
      </div>
    </section>
  </>;
}

function Planner({ tasks, setTasks, chapters }: any) {
  const [title,setTitle] = useState("");
  const [subject,setSubject] = useState<Subject>("Physics");
  const [chapterId,setChapterId] = useState("");
  const [minutes,setMinutes] = useState(60);
  const [questions,setQuestions] = useState(30);
  const [activity,setActivity] = useState<StudyTask["activity"]>("questions");
  const available = chapters.filter((c: Chapter) => c.subject === subject);

  function addTask() {
    if (!title.trim()) return;
    const task: StudyTask = {
      id: `task-${Date.now()}`, title: title.trim(), subject,
      chapterId: chapterId || available[0]?.id || "",
      activity, plannedMinutes: minutes, questionTarget: questions,
      completed: false, date: today(), notes: ""
    };
    setTasks([...tasks,task]); setTitle("");
  }

  function toggle(id: string) {
    setTasks(tasks.map((t: StudyTask) => t.id === id ? {...t,completed:!t.completed} : t));
  }

  return <section className="module-page">
    <Banner eyebrow="TORVEX / MISSION CONTROL" title="YOUR DAILY MISSION" subtitle="Plan your work. Complete missions. Build consistency."/>
    <div className="stats">
      <Stat label="TOTAL MISSIONS" value={`${tasks.length}`} note="All recorded tasks"/>
      <Stat label="COMPLETED" value={`${tasks.filter((t: StudyTask) => t.completed).length}`} note="Completed missions"/>
      <Stat label="PENDING" value={`${tasks.filter((t: StudyTask) => !t.completed).length}`} note="Missions remaining"/>
    </div>
    <div className="panel planner-form">
      <h3><Plus size={18}/> Create Study Mission</h3>
      <input className="planner-input" placeholder="Mission title..." value={title} onChange={e => setTitle(e.target.value)}/>
      <label>Subject</label>
      <select value={subject} onChange={e => {setSubject(e.target.value as Subject);setChapterId("");}}>
        {subjects.map(s => <option key={s}>{s}</option>)}
      </select>
      <label>Chapter</label>
      <select value={chapterId} onChange={e => setChapterId(e.target.value)}>
        {available.map((c: Chapter) => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <label>Activity</label>
      <select value={activity} onChange={e => setActivity(e.target.value as StudyTask["activity"])}>
        <option value="theory">Theory</option><option value="questions">Question practice</option>
        <option value="pyq">PYQs</option><option value="revision">Revision</option>
        <option value="mock-test">Mock test</option><option value="error-analysis">Error analysis</option>
      </select>
      <label>Planned duration (minutes)</label>
      <input type="number" min="1" value={minutes} onChange={e => setMinutes(Math.max(1,Number(e.target.value)))}/>
      <label>Question target</label>
      <input type="number" min="0" value={questions} onChange={e => setQuestions(Math.max(0,Number(e.target.value)))}/>
      <button className="primary" onClick={addTask}>ADD MISSION <Plus size={16}/></button>
    </div>
    <div className="panel task-panel">
      <div className="panel-head"><div><span className="eyebrow">MISSION LOG</span><h3>All missions</h3></div><strong>{tasks.filter((t: StudyTask) => t.completed).length}/{tasks.length}</strong></div>
      {tasks.map((t: StudyTask) => <div className="task-row" key={t.id}>
        <label><input type="checkbox" checked={t.completed} onChange={() => toggle(t.id)}/>
          <span className={t.completed ? "topic-done" : ""}><b>{t.title}</b><small>{t.subject} · {t.activity} · {t.plannedMinutes} min · {t.questionTarget} questions</small></span>
        </label>
        <button className="icon-button" aria-label="Delete mission" onClick={() => setTasks(tasks.filter((x: StudyTask) => x.id !== t.id))}><Trash2 size={16}/></button>
      </div>)}
      {!tasks.length && <p className="empty">Your mission log is empty.</p>}
    </div>
  </section>;
}

function Syllabus({ chapters,setChapters }: any) {
  const [subject,setSubject] = useState<Subject>("Physics");
  const filtered = chapters.filter((c: Chapter) => c.subject === subject);
  function toggle(chapterId: string,topicId: string) {
    setChapters(chapters.map((c: Chapter) => {
      if (c.id !== chapterId) return c;
      const topics = c.topics.map(t => t.id === topicId ? {...t,completed:!t.completed} : t);
      const done = topics.filter(t => t.completed).length;
      return {...c,topics,status:done === topics.length ? "completed" : done ? "in-progress" : "not-started"};
    }));
  }
  return <section className="module-page">
    <Banner eyebrow="TORVEX / SYLLABUS" title="SYLLABUS COMMAND" subtitle="Track every topic and measure actual preparation progress."/>
    <div className="subject-tabs">{subjects.map(s => <button key={s} className={subject === s ? "subject-tab selected" : "subject-tab"} onClick={() => setSubject(s)}>{s}</button>)}</div>
    <div className="stats"><Stat label="SUBJECT PROGRESS" value={`${getSubjectProgress(chapters,subject)}%`} note={subject}/><Stat label="CHAPTERS" value={`${filtered.filter((c: Chapter) => c.status === "completed").length}/${filtered.length}`} note="Completed chapters"/></div>
    <div className="syllabus-list">{filtered.map((c: Chapter) => <article className="panel syllabus-card" key={c.id}>
      <div className="panel-head"><div><span className="eyebrow">{c.priority.toUpperCase()} PRIORITY</span><h3>{c.name}</h3></div><strong>{getChapterProgress(c)}%</strong></div>
      <div className="progress-track"><div className="progress-fill" style={{width:`${getChapterProgress(c)}%`}}/></div>
      {c.topics.map(t => <label className="topic-row" key={t.id}><input type="checkbox" checked={t.completed} onChange={() => toggle(c.id,t.id)}/><span className={t.completed ? "topic-done" : ""}>{t.name}</span></label>)}
    </article>)}</div>
  </section>;
}

function Circuit({tasks,navigate}: any) {
  const sorted = [...tasks].sort((a: StudyTask,b: StudyTask) => a.date.localeCompare(b.date));
  return <section className="module-page">
    <Banner eyebrow="TORVEX / STUDY CIRCUIT" title="THE STUDY TRACK" subtitle="Every checkpoint represents a real mission. Complete tasks to move forward."/>
    <div className="panel">
      <div className="panel-head"><div><span className="eyebrow">CHECKPOINTS</span><h3>Your mission route</h3></div><Activity/></div>
      {!sorted.length && <div className="empty"><Target/><b>No checkpoints yet</b><p>Add missions to your Study Planner to build your circuit.</p><button className="primary" onClick={() => navigate("Study Planner")}>CREATE MISSIONS</button></div>}
      {sorted.map((t: StudyTask,i: number) => <div className="task-row" key={t.id}>
        <span className="quick-num">0{i+1}</span><span><b>{t.title}</b><small>{t.subject} · {t.date} · {t.plannedMinutes} min</small></span>
        <span className="module-status">{t.completed ? <><Check/> COMPLETE</> : <><Lock/> UPCOMING</>}</span>
      </div>)}
    </div>
  </section>;
}

function Roadmap({tasks,chapters}: any) {
  const done = tasks.filter((t: StudyTask) => t.completed).length;
  const levels = [
    {name:"ROOKIE DRIVER",desc:"Start your preparation journey",goal:0},
    {name:"PRO DRIVER",desc:"Complete 10 study missions",goal:10},
    {name:"ELITE DRIVER",desc:"Complete 30 study missions",goal:30},
    {name:"CHAMPION",desc:"Complete 60 study missions",goal:60}
  ];
  return <section className="module-page">
    <Banner eyebrow="TORVEX / CAREER MODE" title="YOUR CAREER ROADMAP" subtitle="A progression path built around your actual study activity."/>
    <div className="panel">
      <div className="panel-head"><div><span className="eyebrow">CAREER PROGRESS</span><h3>{done} missions completed</h3></div><Trophy/></div>
      <div className="progress-track"><div className="progress-fill" style={{width:`${Math.min(100,done/60*100)}%`}}/></div>
      {levels.map((l,i) => <div className="task-row" key={l.name}>
        <span className="quick-num">0{i+1}</span><span><b>{l.name}</b><small>{l.desc}</small></span>
        <span className="module-status">{done >= l.goal ? <Check/> : <Lock/>} {done >= l.goal ? "UNLOCKED" : `${l.goal-done} TO GO`}</span>
      </div>)}
    </div>
    <div className="stats"><Stat label="CHAPTERS TRACKED" value={`${chapters.length}`} note="Current syllabus data"/><Stat label="MISSIONS COMPLETED" value={`${done}`} note="Recorded completion"/></div>
  </section>;
}

function Reports({tasks,sessions,setSessions}: any) {
  const [subject,setSubject] = useState<Subject>("Physics");
  const [minutes,setMinutes] = useState(60);
  const [attempted,setAttempted] = useState(30);
  const [correct,setCorrect] = useState(20);
  const [incorrect,setIncorrect] = useState(10);
  const stats = getStudyStats(sessions);
  const accuracy = correct+incorrect ? Math.round(correct/(correct+incorrect)*100) : 0;
  function record() {
    const entry: StudySession = {id:`session-${Date.now()}`,date:today(),subject,minutes,questionsAttempted:attempted,correct,incorrect};
    setSessions([...sessions,entry]);
  }
  return <section className="module-page">
    <Banner eyebrow="TORVEX / PERFORMANCE CENTRE" title="PERFORMANCE REPORTS" subtitle="Only recorded data is used. No guessed scores or fake analytics."/>
    <div className="stats">
      <Stat label="TOTAL STUDY TIME" value={`${stats.totalHours} HRS`} note="Recorded sessions"/>
      <Stat label="QUESTIONS ATTEMPTED" value={`${stats.questionsAttempted}`} note="Recorded questions"/>
      <Stat label="ACCURACY" value={`${stats.accuracy}%`} note="From entered correct/incorrect"/>
    </div>
    <div className="panel planner-form">
      <h3><Plus size={18}/> Record a study session</h3>
      <label>Subject</label><select value={subject} onChange={e => setSubject(e.target.value as Subject)}>{subjects.map(s => <option key={s}>{s}</option>)}</select>
      <label>Study time (minutes)</label><input type="number" min="1" value={minutes} onChange={e => setMinutes(Math.max(1,Number(e.target.value)))}/>
      <label>Questions attempted</label><input type="number" min="0" value={attempted} onChange={e => setAttempted(Math.max(0,Number(e.target.value)))}/>
      <label>Correct</label><input type="number" min="0" value={correct} onChange={e => setCorrect(Math.max(0,Number(e.target.value)))}/>
      <label>Incorrect</label><input type="number" min="0" value={incorrect} onChange={e => setIncorrect(Math.max(0,Number(e.target.value)))}/>
      <p className="eyebrow">SESSION ACCURACY: {accuracy}%</p>
      <button className="primary" onClick={record}>SAVE SESSION <Check size={16}/></button>
    </div>
    <div className="panel"><div className="panel-head"><div><span className="eyebrow">SESSION HISTORY</span><h3>Recorded sessions</h3></div></div>
      {sessions.map((s: StudySession) => <div className="task-row" key={s.id}><span><b>{s.subject}</b><small>{s.date} · {s.minutes} min · {s.questionsAttempted} questions</small></span><span>{s.correct}/{s.correct+s.incorrect} correct</span></div>)}
      {!sessions.length && <p className="empty">No sessions recorded yet.</p>}
    </div>
    <div className="panel"><div className="panel-head"><div><span className="eyebrow">MISSION SUMMARY</span><h3>Task completion</h3></div></div>
      <p>{tasks.filter((t: StudyTask) => t.completed).length} completed out of {tasks.length} missions.</p>
    </div>
  </section>;
}

function Garage({ selected, setSelected }: {
  selected: string;
  setSelected: (value: string) => void;
}) {
  const paints = [
    { name: "Silver", color: "#cbd5e1" },
    { name: "Midnight", color: "#263449" },
    { name: "Racing Red", color: "#bd3442" },
    { name: "Ice Blue", color: "#83b9d5" },
    { name: "Pearl White", color: "#f1f0e9" },
    { name: "Graphite", color: "#59616d" }
  ];

  const finish = paints.find(p => p.name === selected) || paints[0];

  return <section className="module-page">
    <Banner eyebrow="TORVEX / VEHICLE COLLECTION" title="THE GARAGE"
      subtitle="Configure your vehicle finish. Your selection is saved automatically."/>
    <div className="panel">
      <div className="car-visual" style={{ width: "100%", maxWidth: 650, margin: "auto" }}>
        <svg viewBox="0 0 760 300">
          <defs>
            <linearGradient id="garageGlass" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#526d8e"/>
              <stop offset="1" stopColor="#080e18"/>
            </linearGradient>
          </defs>
          <ellipse cx="390" cy="245" rx="280" ry="20" fill="#000" opacity=".7"/>
          <path d="M75 205 L115 164 Q145 145 220 135 L300 78 Q325 58 382 59 L500 65 Q540 70 575 112 L645 148 Q680 165 690 200 L675 220 L90 225Z"
            fill={finish.color} stroke="#edf3fa" strokeWidth="3"/>
          <path d="M250 132 L320 82 Q345 69 382 72 L487 78 Q515 82 540 137Z"
            fill="url(#garageGlass)" stroke="#aabbd0" strokeWidth="3"/>
          <path d="M393 73 L393 134" stroke="#aabbd0" strokeWidth="3"/>
          <path d="M110 180 L180 174 L165 192 L105 198Z" fill="#fff"/>
          <path d="M625 164 L675 181 L680 195 L625 190Z" fill="#ed4855"/>
          {[230,565].map(x => <g key={x}>
            <circle cx={x} cy="210" r="43" fill="#080d16" stroke="#9ba9bc" strokeWidth="7"/>
            <circle cx={x} cy="210" r="25" fill="#263449" stroke="#e0e6ef" strokeWidth="3"/>
            <circle cx={x} cy="210" r="8" fill="#cbd5e1"/>
          </g>)}
        </svg>
      </div>
      <h3>PAINT CONFIGURATION</h3>
      <p>Choose a finish for your vehicle.</p>
      <div className="subject-tabs">
        {paints.map(p => <button key={p.name}
          className={selected === p.name ? "subject-tab selected" : "subject-tab"}
          onClick={() => setSelected(p.name)}>
          <span style={{
            display: "inline-block", width: 13, height: 13,
            borderRadius: "50%", background: p.color,
            marginRight: 8, verticalAlign: "middle",
            border: "1px solid #718096"
          }}/>
          {p.name}
        </button>)}
      </div>
      <p className="eyebrow">ACTIVE FINISH: {selected.toUpperCase()}</p>
      <p className="module-status"><Check size={14}/> Selection saved automatically</p>
    </div>
    <div className="module-grid">
      {[
        ["VEHICLE COLLECTION", "Your unlocked vehicle collection"],
        ["WHEEL UPGRADES", "Wheel customisation is a future expansion"],
        ["BODY CUSTOMISATION", "Body kits and aero upgrades are planned"],
        ["SHOWROOM ENVIRONMENTS", "Showroom environments are planned"]
      ].map((item, i) => <article className="module-card" key={item[0]}>
        <span className="module-number">0{i + 1}</span>
        <h3>{item[0]}</h3>
        <p>{item[1]}</p>
      </article>)}
    </div>
  </section>;
}

function SimpleModule({ page, profile, setProfile, playlists, setPlaylists,
  tasks, sessions, chapters }: any) {
  const [playlist, setPlaylist] = useState("");

  if (page === "Profile & Settings") return <section className="module-page">
    <Banner eyebrow="TORVEX / DRIVER CONFIGURATION" title="PROFILE & SETTINGS"
      subtitle="Your driver identity and preparation preferences."/>

    <div className="panel planner-form">
      <h3>Driver profile</h3>
      <label>Display name</label>
      <input value={profile.name} onChange={e =>
        setProfile({ ...profile, name: e.target.value })}/>

      <label>Study language</label>
      <select value={profile.language} onChange={e =>
        setProfile({ ...profile, language: e.target.value })}>
        <option>English</option>
        <option>Hindi</option>
        <option>Hinglish</option>
      </select>

      <label>Challenge duration</label>
      <select value={profile.challenge} onChange={e =>
        setProfile({ ...profile, challenge: e.target.value })}>
        {["5 DAYS", "7 DAYS", "30 DAYS", "60 DAYS", "90 DAYS", "6 MONTHS", "1 YEAR"].map(x =>
          <option key={x}>{x}</option>)}
      </select>

      <label className="topic-row">
        <input type="checkbox" checked={profile.reminders}
          onChange={e => setProfile({ ...profile, reminders: e.target.checked })}/>
        Focus reminders enabled
      </label>
      <p className="eyebrow">PROFILE SAVED AUTOMATICALLY</p>
    </div>
  </section>;

  if (page === "Music Room") return <section className="module-page">
    <Banner eyebrow="TORVEX / FOCUS SOUNDTRACK" title="MUSIC ROOM"
      subtitle="Save and organise your study playlists."/>

    <div className="panel planner-form">
      <h3><Music/> Saved playlists</h3>
      <input className="planner-input" placeholder="Playlist name or Spotify link"
        value={playlist} onChange={e => setPlaylist(e.target.value)}/>
      <button className="primary" onClick={() => {
        if (playlist.trim()) {
          setPlaylists([...playlists, {
            id: `playlist-${Date.now()}`,
            value: playlist.trim()
          }]);
          setPlaylist("");
        }
      }}>SAVE PLAYLIST <Plus size={16}/></button>

      {playlists.map((p: any) => <div className="task-row" key={p.id}>
        <span>{p.value}</span>
        <div style={{ display: "flex", gap: 8 }}>
          {p.value.startsWith("http") && <button className="icon-button"
            onClick={() => window.open(p.value, "_blank", "noopener,noreferrer")}>
            <Play size={16}/>
          </button>}
          <button className="icon-button" onClick={() =>
            setPlaylists(playlists.filter((x: any) => x.id !== p.id))}>
            <Trash2 size={16}/>
          </button>
        </div>
      </div>)}
      {!playlists.length && <p className="empty">No playlists saved yet.</p>}
    </div>
  </section>;

  const completed = tasks.filter((t: StudyTask) => t.completed).length;
  const achievements = [
    { name: "First mission", detail: "Complete your first study mission", unlocked: completed >= 1 },
    { name: "Ten missions", detail: "Complete 10 study missions", unlocked: completed >= 10 },
    { name: "Thirty missions", detail: "Complete 30 study missions", unlocked: completed >= 30 },
    { name: "Sixty missions", detail: "Complete 60 study missions", unlocked: completed >= 60 },
    { name: "First study session", detail: "Record your first study session", unlocked: sessions.length >= 1 },
    { name: "Syllabus milestone", detail: "Complete an entire chapter", unlocked: chapters.some((c: Chapter) => c.status === "completed") }
  ];

  return <section className="module-page">
    <Banner eyebrow="TORVEX / ACHIEVEMENT VAULT" title="YOUR ACHIEVEMENTS"
      subtitle="Milestones unlock from your recorded preparation progress."/>

    <div className="stats">
      <Stat label="UNLOCKED" value={`${achievements.filter(a => a.unlocked).length}/${achievements.length}`}
        note="Earned milestones"/>
      <Stat label="MISSIONS COMPLETED" value={`${completed}`} note="Recorded completions"/>
      <Stat label="STUDY SESSIONS" value={`${sessions.length}`} note="Recorded sessions"/>
    </div>

    <div className="module-grid">
      {achievements.map((a, i) => <article className="module-card" key={a.name}>
        <span className="module-number">0{i + 1}</span>
        <h3>{a.name}</h3>
        <p>{a.detail}</p>
        <span className="module-status">
          {a.unlocked ? <><Trophy size={14}/> UNLOCKED</> : <><Lock size={14}/> LOCKED</>}
        </span>
      </article>)}
    </div>
  </section>;
}

export default function App() {
  const [active, setActive] = useState("Home Garage");
  const [chapters, setChapters] = usePersistentState<Chapter[]>("torvex-chapters-v1", initialChapters);
  const [tasks, setTasks] = usePersistentState<StudyTask[]>("torvex-tasks-v1", initialTasks);
  const [sessions, setSessions] = usePersistentState<StudySession[]>("torvex-sessions-v1", initialSessions);

  const [profile, setProfile] = usePersistentState("torvex-profile-v1", {
    name: "TORVEX DRIVER",
    language: "English",
    challenge: "30 DAYS",
    reminders: true
  });

  const [playlists, setPlaylists] = usePersistentState<any[]>("torvex-playlists-v1", []);
  const [paint, setPaint] = usePersistentState("torvex-garage-paint-v1", "Silver");

  return <div className="shell">
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">T</div>
        <div><strong>TORVEX</strong><small>BUILT FOR AMBITION</small></div>
      </div>
      <div className="side-label">COMMAND CENTRE</div>
      {pages.map(item => <button key={item.name}
        className={active === item.name ? "nav-item active" : "nav-item"}
        onClick={() => setActive(item.name)}>
        <item.icon size={18}/><span>{item.name}</span>
      </button>)}
      <div className="sidebar-foot"><span className="status-dot"/> SYSTEM READY <span>v0.5</span></div>
    </aside>

    <main className="main">
      <header className="topbar">
        <div><span className="eyebrow">TORVEX / COMMAND</span><h1>{active}</h1></div>
        <div className="profile">
          <div className="avatar">{profile.name.trim().charAt(0).toUpperCase() || "T"}</div>
          <div><b>{profile.name || "DRIVER PROFILE"}</b><small>ROOKIE CLASS</small></div>
        </div>
      </header>

      {active === "Home Garage" && <Home navigate={setActive} tasks={tasks} chapters={chapters} sessions={sessions}/>}
      {active === "Study Planner" && <Planner tasks={tasks} setTasks={setTasks} chapters={chapters}/>}
      {active === "Syllabus Tracker" && <Syllabus chapters={chapters} setChapters={setChapters}/>}
      {active === "Study Circuit" && <Circuit tasks={tasks} navigate={setActive}/>}
      {active === "Roadmap" && <Roadmap tasks={tasks} chapters={chapters}/>}
      {active === "Reports & Tests" && <Reports tasks={tasks} sessions={sessions} setSessions={setSessions}/>}
      {active === "Garage & Collection" && <Garage selected={paint} setSelected={setPaint}/>}
      {["Music Room", "Achievement Vault", "Profile & Settings"].includes(active) &&
        <SimpleModule page={active} profile={profile} setProfile={setProfile}
          playlists={playlists} setPlaylists={setPlaylists}
          tasks={tasks} sessions={sessions} chapters={chapters}/>}
      <footer>TORVEX <span>•</span> DRIVEN BY PROGRESS. DEFINED BY ACHIEVEMENT.</footer>
    </main>
  </div>;
        }
