
import { useState } from "react";
import { usePersistentState } from "./storage";
import {
  Activity, BookOpen, CalendarDays, CarFront, ChevronRight,
  CircleCheck, Gauge, LayoutDashboard, Settings, Trophy,
  Map, BarChart3, Music, Lock, Plus, Trash2
} from "lucide-react";

import {
  subjects,
  initialChapters,
  initialTasks,
  getChapterProgress,
  getSubjectProgress,
  type Chapter,
  type StudyTask,
  type Subject,
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

function Stat({ label, value, note }: {
  label: string; value: string; note: string;
}) {
  return <article className="stat-card">
    <span>{label}</span><strong>{value}</strong><small>{note}</small>
  </article>;
}

function Home({ navigate, tasks }: {
  navigate: (page: string) => void;
  tasks: StudyTask[];
}) {
  const completed = tasks.filter(t => t.completed).length;
  const progress = tasks.length
    ? Math.round(completed / tasks.length * 100) : 0;

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
        <div className="car-symbol"><CarFront size={118} strokeWidth={0.8}/></div>
        <span className="car-caption">GARAGE // VEHICLE 001</span>
      </div>
    </section>

    <section className="stats">
      <Stat label="CAREER RANK" value="ROOKIE DRIVER" note="Your journey begins here"/>
      <Stat label="EXPERIENCE POINTS" value="0 XP" note="Earn XP through real progress"/>
      <Stat label="DAILY PROGRESS" value={`${progress}%`} note={`${completed} of ${tasks.length} tasks completed`}/>
    </section>

    <section className="lower">
      <div className="panel">
        <div className="panel-head">
          <div><span className="eyebrow">MISSION CONTROL</span><h3>Today's mission</h3></div>
          <Gauge size={20}/>
        </div>
        <div className="empty">
          <CircleCheck size={25}/>
          <b>{tasks.length ? `${tasks.length} study tasks created` : "No mission assigned yet"}</b>
          <p>Your study plan will appear here.</p>
        </div>
      </div>
      <div className="panel">
        <div className="panel-head"><div><span className="eyebrow">QUICK ACCESS</span><h3>Launch a module</h3></div></div>
        {["Study Planner","Syllabus Tracker","Reports & Tests"].map((x,i) =>
          <button className="quick" key={x} onClick={() => navigate(x)}>
            <span className="quick-num">0{i+1}</span>{x}<ChevronRight size={16}/>
          </button>
        )}
      </div>
    </section>
  </>;
}

function SyllabusPage({ chapters, setChapters }: {
  chapters: Chapter[];
  setChapters: (chapters: Chapter[]) => void;
}) {
  const [subject, setSubject] = useState<Subject>("Physics");

  function toggleTopic(chapterId: string, topicId: string) {
    setChapters(chapters.map(chapter => {
      if (chapter.id !== chapterId) return chapter;

      const topics = chapter.topics.map(topic =>
        topic.id === topicId
          ? { ...topic, completed: !topic.completed }
          : topic
      );

      const done = topics.filter(t => t.completed).length;

      return {
        ...chapter,
        topics,
        status: done === topics.length
          ? "completed"
          : done > 0 ? "in-progress" : "not-started",
      };
    }));
  }

  const filtered = chapters.filter(c => c.subject === subject);

  return <section className="module-page">
    <div className="module-banner">
      <span className="eyebrow red">TORVEX / SYLLABUS</span>
      <h2>SYLLABUS COMMAND</h2>
      <p>Track every topic. Measure real progress.</p>
    </div>

    <div className="subject-tabs">
      {subjects.map(s =>
        <button key={s}
          className={subject === s ? "subject-tab selected" : "subject-tab"}
          onClick={() => setSubject(s)}>{s}</button>
      )}
    </div>

    <div className="stats">
      <Stat label="SUBJECT PROGRESS"
        value={`${getSubjectProgress(chapters, subject)}%`}
        note={subject}/>
      <Stat label="CHAPTERS"
        value={`${filtered.filter(c => c.status === "completed").length}/${filtered.length}`}
        note="Completed chapters"/>
    </div>

    <div className="syllabus-list">
      {filtered.map(chapter => (
        <article className="panel syllabus-card" key={chapter.id}>
          <div className="panel-head">
            <div>
              <span className="eyebrow">{chapter.priority.toUpperCase()} PRIORITY</span>
              <h3>{chapter.name}</h3>
            </div>
            <strong>{getChapterProgress(chapter)}%</strong>
          </div>

          <div className="progress-track">
            <div className="progress-fill"
              style={{ width: `${getChapterProgress(chapter)}%` }}/>
          </div>

          {chapter.topics.map(topic => (
            <label className="topic-row" key={topic.id}>
              <input
                type="checkbox"
                checked={topic.completed}
                onChange={() => toggleTopic(chapter.id, topic.id)}
              />
              <span className={topic.completed ? "topic-done" : ""}>
                {topic.name}
              </span>
            </label>
          ))}
        </article>
      ))}
      {filtered.length === 0 && <p>No chapters added yet.</p>}
    </div>
  </section>;
}

function PlannerPage({ tasks, setTasks, chapters }: {
  tasks: StudyTask[];
  setTasks: (tasks: StudyTask[]) => void;
  chapters: Chapter[];
}) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState<Subject>("Physics");
  const [chapterId, setChapterId] = useState("");
  const [minutes, setMinutes] = useState(60);
  const [questions, setQuestions] = useState(30);

  const available = chapters.filter(c => c.subject === subject);

  function addTask() {
    if (!title.trim() || !available.length) return;

    const task: StudyTask = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      subject,
      chapterId: chapterId || available[0].id,
      activity: "questions",
      plannedMinutes: minutes,
      questionTarget: questions,
      completed: false,
      date: new Date().toISOString().slice(0,10),
      notes: "",
    };

    setTasks([...tasks, task]);
    setTitle("");
  }

  function toggleTask(id: string) {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  }

  return <section className="module-page">
    <div className="module-banner">
      <span className="eyebrow red">TORVEX / MISSION CONTROL</span>
      <h2>YOUR DAILY MISSION</h2>
      <p>Create tasks, complete missions and track your work.</p>
    </div>

    <div className="panel planner-form">
      <h3><Plus size={18}/> Create Study Task</h3>

      <input
        className="planner-input"
        placeholder="Enter task name..."
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <label>Subject</label>
      <select value={subject}
        onChange={e => {
          setSubject(e.target.value as Subject);
          setChapterId("");
        }}>
        {subjects.map(s => <option key={s}>{s}</option>)}
      </select>

      <label>Chapter</label>
      <select value={chapterId}
        onChange={e => setChapterId(e.target.value)}>
        {available.map(c =>
          <option key={c.id} value={c.id}>{c.name}</option>
        )}
      </select>

      <label>Planned duration (minutes)</label>
      <input type="number" min="1" value={minutes}
        onChange={e => setMinutes(Math.max(1, Number(e.target.value)))}/>

      <label>Question target</label>
      <input type="number" min="0" value={questions}
        onChange={e => setQuestions(Math.max(0, Number(e.target.value)))}/>

      <button className="primary" onClick={addTask}>
        ADD MISSION <Plus size={16}/>
      </button>
    </div>

    <div className="panel task-panel">
      <div className="panel-head">
        <div><span className="eyebrow">YOUR TASKS</span><h3>Mission list</h3></div>
        <strong>{tasks.filter(t => t.completed).length}/{tasks.length}</strong>
      </div>

      {tasks.map(task => (
        <div className="task-row" key={task.id}>
          <label>
            <input type="checkbox" checked={task.completed}
              onChange={() => toggleTask(task.id)}/>
            <span className={task.completed ? "topic-done" : ""}>
              <b>{task.title}</b>
              <small>{task.subject} · {task.plannedMinutes} min · {task.questionTarget} questions</small>
            </span>
          </label>
          <button className="icon-button"
            aria-label="Delete task"
            onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}>
            <Trash2 size={16}/>
          </button>
        </div>
      ))}

      {tasks.length === 0 && <p className="empty">No tasks yet. Create your first mission above.</p>}
    </div>
  </section>;
}

function ModulePage({ page }: { page: string }) {
  const content: Record<string, { title: string; subtitle: string; items: string[] }> = {
    "Study Circuit": {
      title: "THE STUDY TRACK",
      subtitle: "Every checkpoint represents a real study mission.",
      items: ["Upcoming checkpoints","Current mission","Completed checkpoints","Daily progress"],
    },
    Roadmap: {
      title: "YOUR CAREER ROADMAP",
      subtitle: "Progress through academic levels and unlock milestones.",
      items: ["Rookie Driver","Pro Driver","Elite Driver","Champion"],
    },
    "Reports & Tests": {
      title: "PERFORMANCE CENTRE",
      subtitle: "Review your study data and test performance.",
      items: ["Daily reports","Weekly reports","Mock test records","Subject performance"],
    },
    "Garage & Collection": {
      title: "YOUR VEHICLE COLLECTION",
      subtitle: "Discover vehicles and garage upgrades.",
      items: ["My vehicles","Vehicle collection","Customisation","Garage environments"],
    },
    "Music Room": {
      title: "FOCUS SOUNDTRACK",
      subtitle: "Your dedicated study music space.",
      items: ["Focus playlists","Saved playlists","Spotify connection"],
    },
    "Achievement Vault": {
      title: "YOUR ACHIEVEMENTS",
      subtitle: "Every milestone records genuine progress.",
      items: ["Trophies","Career milestones","Challenge rewards"],
    },
    "Profile & Settings": {
      title: "DRIVER CONFIGURATION",
      subtitle: "Manage your profile and TORVEX preferences.",
      items: ["Personal profile","Study preferences","Notifications","Privacy and data","App settings"],
    },
  };

  const data = content[page];
  return <section className="module-page">
    <div className="module-banner">
      <span className="eyebrow red">TORVEX / MODULE</span>
      <h2>{data.title}</h2>
      <p>{data.subtitle}</p>
    </div>
    <div className="module-grid">
      {data.items.map((item,index) => (
        <article className="module-card" key={item}>
          <span className="module-number">0{index+1}</span>
          <h3>{item}</h3>
          <p>Module workspace</p>
          <span className="module-status"><Lock size={12}/> COMING NEXT</span>
        </article>
      ))}
    </div>
  </section>;
}

export default function App() {
  const [active, setActive] = useState("Home Garage");
  const [chapters, setChapters] = useState<Chapter[]>(initialChapters);
  const [tasks, setTasks] = useState<StudyTask[]>(initialTasks);

  return <div className="shell">
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">T</div>
        <div><strong>TORVEX</strong><small>BUILT FOR AMBITION</small></div>
      </div>
      <div className="side-label">COMMAND CENTRE</div>
      {pages.map(item => (
        <button key={item.name}
          className={active === item.name ? "nav-item active" : "nav-item"}
          onClick={() => setActive(item.name)}>
          <item.icon size={18}/><span>{item.name}</span>
        </button>
      ))}
      <div className="sidebar-foot"><span className="status-dot"/> SYSTEM READY <span>v0.3</span></div>
    </aside>

    <main className="main">
      <header className="topbar">
        <div><span className="eyebrow">TORVEX / COMMAND</span><h1>{active}</h1></div>
        <div className="profile">
          <div className="avatar">S</div>
          <div><b>DRIVER PROFILE</b><small>ROOKIE CLASS</small></div>
        </div>
      </header>

      {active === "Home Garage" && <Home navigate={setActive} tasks={tasks}/>}
      {active === "Study Planner" && <PlannerPage tasks={tasks} setTasks={setTasks} chapters={chapters}/>}
      {active === "Syllabus Tracker" && <SyllabusPage chapters={chapters} setChapters={setChapters}/>}
      {!["Home Garage","Study Planner","Syllabus Tracker"].includes(active) &&
        <ModulePage page={active}/>}

      <footer>TORVEX <span>•</span> DRIVEN BY PROGRESS. DEFINED BY ACHIEVEMENT.</footer>
    </main>
  </div>;
}
