
import { useState } from "react";
import Garage3D from "./Garage3D";
import { usePersistentState } from "./storage";
import {
  Activity, BookOpen, CalendarDays, CarFront, ChevronRight,
  LayoutDashboard, Settings, Trophy,
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
  const completed = tasks.filter((t: StudyTask) => t.completed);
  const todayTasks = tasks.filter((t: StudyTask) => t.date === today());
  const todayDone = todayTasks.filter((t: StudyTask) => t.completed).length;
  const dailyProgress = todayTasks.length
    ? Math.round((todayDone / todayTasks.length) * 100)
    : 0;

  const xp = completed.length * 50;
  const rank = xp >= 3000 ? "CHAMPION" :
    xp >= 1500 ? "ELITE DRIVER" :
    xp >= 500 ? "PRO DRIVER" : "ROOKIE DRIVER";

  const stats = getStudyStats(sessions);
  const chapterProgress = chapters.length
    ? Math.round(
        chapters.reduce(
          (sum: number, c: Chapter) => sum + getChapterProgress(c), 0
        ) / chapters.length
      )
    : 0;

  const activeDates = new Set([
    ...completed.map((t: StudyTask) => t.date),
    ...sessions.map((s: StudySession) => s.date)
  ]);

  let streak = 0;
  const cursor = new Date(`${today()}T00:00:00`);
  if (!activeDates.has(today())) cursor.setDate(cursor.getDate() - 1);

  while (activeDates.has(
    `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(cursor.getDate()).padStart(2, "0")}`
  )) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  const nextMission = tasks
    .filter((t: StudyTask) => !t.completed)
    .sort((a: StudyTask, b: StudyTask) => a.date.localeCompare(b.date))[0];

  const nextRankXP = xp < 500 ? 500 : xp < 1500 ? 1500 : xp < 3000 ? 3000 : 5000;
  const rankProgress = Math.min(100, Math.round((xp / nextRankXP) * 100));

  return (
    <div className="garage-dashboard">
      <section className="hero hero-premium">
        <div className="hero-copy">
          <span className="eyebrow red">TORVEX PERFORMANCE DIVISION</span>
          <h2>PREPARE.<br />PROGRESS.<br /><em>PREVAIL.</em></h2>
          <p>Your preparation. Your pace. Your next milestone.</p>
          <button className="primary" onClick={() => navigate("Study Planner")}>
            ENTER MISSION CONTROL <ChevronRight size={17} />
          </button>
        </div>

        <div className="car-art">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="car-visual">
            <svg viewBox="0 0 760 300" role="img" aria-label="TORVEX silver performance car">
              <defs>
                <linearGradient id="torvexMetal" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#ffffff" />
                  <stop offset=".45" stopColor="#71839c" />
                  <stop offset=".75" stopColor="#dce5f1" />
                  <stop offset="1" stopColor="#26364e" />
                </linearGradient>
                <linearGradient id="torvexGlass" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#526d8e" />
                  <stop offset="1" stopColor="#080e18" />
                </linearGradient>
              </defs>
              <ellipse cx="390" cy="245" rx="280" ry="20" fill="#000" opacity=".7" />
              <path d="M75 205 L115 164 Q145 145 220 135 L300 78 Q325 58 382 59 L500 65 Q540 70 575 112 L645 148 Q680 165 690 200 L675 220 L90 225Z"
                fill="url(#torvexMetal)" stroke="#edf3fa" strokeWidth="3" />
              <path d="M250 132 L320 82 Q345 69 382 72 L487 78 Q515 82 540 137Z"
                fill="url(#torvexGlass)" stroke="#c1d0e3" strokeWidth="3" />
              <path d="M393 73 L393 134 M494 80 L540 137" stroke="#aabbd0" strokeWidth="3" />
              <path d="M110 180 L180 174 L165 192 L105 198Z" fill="#fff" />
              <path d="M625 164 L675 181 L680 195 L625 190Z" fill="#ed4855" />
              <path d="M130 205 L650 205" stroke="#172335" strokeWidth="8" />
              {[230, 565].map(x => (
                <g key={x}>
                  <circle cx={x} cy="210" r="43" fill="#080d16" stroke="#9ba9bc" strokeWidth="7" />
                  <circle cx={x} cy="210" r="25" fill="#263449" stroke="#e0e6ef" strokeWidth="3" />
                  <circle cx={x} cy="210" r="8" fill="#cbd5e1" />
                </g>
              ))}
              <path d="M150 153 L215 145 M590 145 L642 164" stroke="#fff" strokeWidth="2" opacity=".7" />
            </svg>
          </div>
          <span className="car-caption">TORVEX // PERFORMANCE SERIES</span>
        </div>
        <div className="hero-index">01 <span>/</span> COMMAND</div>
      </section>

      <section className="driver-strip">
        <div>
          <span className="eyebrow">CURRENT CAREER RANK</span>
          <strong>{rank}</strong>
          <div className="rank-track"><div style={{ width: `${rankProgress}%` }} /></div>
          <small>{xp} / {nextRankXP} XP TO NEXT RANK</small>
        </div>
        <div className="driver-xp">
          <Trophy size={21} />
          <span><b>{xp} XP</b><small>EXPERIENCE POINTS</small></span>
        </div>
        <div className="driver-streak">
          <Activity size={21} />
          <span><b>{streak} DAYS</b><small>ACTIVE STREAK</small></span>
        </div>
      </section>

      <section className="dashboard-heading">
        <div>
          <span className="eyebrow">LIVE PERFORMANCE</span>
          <h3>YOUR COMMAND OVERVIEW</h3>
        </div>
        <span className="live-indicator"><i /> DATA FROM YOUR ACTIVITY</span>
      </section>

      <section className="stats stats-premium">
        <Stat label="TODAY'S PROGRESS" value={`${dailyProgress}%`}
          note={`${todayDone} of ${todayTasks.length} missions completed`} />
        <Stat label="TOTAL STUDY TIME" value={`${stats.totalHours} HRS`}
          note="Recorded study sessions" />
        <Stat label="SYLLABUS PROGRESS" value={`${chapterProgress}%`}
          note={`${chapters.length} chapters currently tracked`} />
      </section>

      <section className="dashboard-grid">
        <div className="panel mission-panel">
          <div className="panel-head">
            <div><span className="eyebrow">NEXT OBJECTIVE</span><h3>UPCOMING MISSION</h3></div>
            <Target size={21} />
          </div>

          {nextMission ? (
            <>
              <span className="mission-subject">{nextMission.subject} / {nextMission.activity}</span>
              <h2>{nextMission.title}</h2>
              <div className="mission-meta">
                <span><Clock3 size={15} /> {nextMission.plannedMinutes} MIN</span>
                <span><Target size={15} /> {nextMission.questionTarget} QUESTIONS</span>
              </div>
              <button className="primary" onClick={() => navigate("Study Planner")}>
                VIEW MISSION <ChevronRight size={16} />
              </button>
            </>
          ) : (
            <div className="empty">
              <Check size={26} />
              <b>ALL CLEAR</b>
              <p>No pending missions. Create your next objective.</p>
              <button className="primary" onClick={() => navigate("Study Planner")}>
                CREATE MISSION <Plus size={15} />
              </button>
            </div>
          )}
        </div>

        <div className="panel daily-panel">
          <div className="panel-head">
            <div><span className="eyebrow">TODAY'S SCHEDULE</span><h3>MISSION CHECKLIST</h3></div>
            <CalendarDays size={20} />
          </div>
          <div className="daily-progress">
            <div><b>{dailyProgress}%</b><small>DAILY COMPLETION</small></div>
            <div className="daily-ring" style={{ background: `conic-gradient(#d85b62 ${dailyProgress * 3.6}deg, #263246 0deg)` }}>
              <div>{todayDone}<small>/{todayTasks.length}</small></div>
            </div>
          </div>
          {todayTasks.slice(0, 4).map((t: StudyTask) => (
            <div className="task-row" key={t.id}>
              <span className={t.completed ? "task-check completed" : "task-check"}>
                {t.completed ? <Check size={13} /> : <Clock3 size={13} />}
              </span>
              <span><b>{t.title}</b><small>{t.subject} · {t.plannedMinutes} min</small></span>
              <small>{t.completed ? "DONE" : "PENDING"}</small>
            </div>
          ))}
          {!todayTasks.length && <p className="empty">No missions scheduled for today yet.</p>}
          <button className="text-action" onClick={() => navigate("Study Planner")}>
            OPEN STUDY PLANNER <ChevronRight size={15} />
          </button>
        </div>
      </section>

      <section className="quick-launch">
        <div><span className="eyebrow">YOUR NEXT MOVE</span><h3>CHOOSE YOUR DESTINATION</h3></div>
        {[
          ["01", "Study Planner", CalendarDays],
          ["02", "Syllabus Tracker", BookOpen],
          ["03", "Reports & Tests", BarChart3],
          ["04", "Garage & Collection", CarFront]
        ].map(([number, label, Icon]: any) => (
          <button className="launch-card" key={label} onClick={() => navigate(label)}>
            <span>{number}</span><Icon size={19} /><b>{label}</b><ChevronRight size={15} />
          </button>
        ))}
      </section>
    </div>
  );
            }


function Planner({ tasks, setTasks, chapters }: any) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState<Subject>("Physics");
  const [chapterId, setChapterId] = useState("");
  const [minutes, setMinutes] = useState(60);
  const [questions, setQuestions] = useState(30);
  const [activity, setActivity] = useState<StudyTask["activity"]>("questions");
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [selectedDate, setSelectedDate] = useState(today());

  const available = chapters.filter((c: Chapter) => c.subject === subject);

  function addTask() {
    if (!title.trim()) return;

    const task: StudyTask = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      subject,
      chapterId: chapterId || available[0]?.id || "",
      activity,
      plannedMinutes: minutes,
      questionTarget: questions,
      completed: false,
      date: selectedDate,
      notes: ""
    };

    setTasks([...tasks, task]);
    setTitle("");
    setQuestions(30);
  }

  function toggle(id: string) {
    setTasks(tasks.map((t: StudyTask) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  }

  const filtered = tasks
    .filter((t: StudyTask) =>
      subjectFilter === "All" || t.subject === subjectFilter
    )
    .filter((t: StudyTask) =>
      statusFilter === "All" ||
      (statusFilter === "Completed" ? t.completed : !t.completed)
    )
    .filter((t: StudyTask) =>
      `${t.title} ${t.activity} ${t.subject}`.toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a: StudyTask, b: StudyTask) => {
      if (sortBy === "date") return a.date.localeCompare(b.date);
      if (sortBy === "subject") return a.subject.localeCompare(b.subject);
      if (sortBy === "duration") return b.plannedMinutes - a.plannedMinutes;
      return a.title.localeCompare(b.title);
    });

  const completed = tasks.filter((t: StudyTask) => t.completed).length;
  const pending = tasks.length - completed;

  return (
    <section className="module-page planner-v2">
      <Banner
        eyebrow="TORVEX / MISSION CONTROL"
        title="YOUR DAILY MISSION"
        subtitle="Plan your work. Complete missions. Build consistency."
      />

      <div className="stats">
        <Stat label="TOTAL MISSIONS" value={`${tasks.length}`} note="All recorded tasks" />
        <Stat label="COMPLETED" value={`${completed}`} note="Completed missions" />
        <Stat label="PENDING" value={`${pending}`} note="Missions remaining" />
      </div>

      <div className="panel planner-form">
        <div className="panel-head">
          <div>
            <span className="eyebrow">MISSION BUILDER</span>
            <h3>Create a new mission</h3>
          </div>
          <Plus size={20} />
        </div>

        <label>Mission title</label>
        <input
          className="planner-input"
          placeholder="Example: Electrostatics — PYQ practice"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <div className="planner-fields">
          <div>
            <label>Subject</label>
            <select value={subject} onChange={e => {
              setSubject(e.target.value as Subject);
              setChapterId("");
            }}>
              {subjects.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label>Chapter</label>
            <select value={chapterId} onChange={e => setChapterId(e.target.value)}>
              <option value="">Select chapter</option>
              {available.map((c: Chapter) =>
                <option key={c.id} value={c.id}>{c.name}</option>
              )}
            </select>
          </div>
          <div>
            <label>Activity</label>
            <select value={activity} onChange={e =>
              setActivity(e.target.value as StudyTask["activity"])
            }>
              <option value="theory">Theory</option>
              <option value="questions">Question practice</option>
              <option value="pyq">PYQs</option>
              <option value="revision">Revision</option>
              <option value="mock-test">Mock test</option>
              <option value="error-analysis">Error analysis</option>
            </select>
          </div>
          <div>
            <label>Mission date</label>
            <input type="date" value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)} />
          </div>
          <div>
            <label>Duration (minutes)</label>
            <input type="number" min="1" value={minutes}
              onChange={e => setMinutes(Math.max(1, Number(e.target.value)))} />
          </div>
          <div>
            <label>Question target</label>
            <input type="number" min="0" value={questions}
              onChange={e => setQuestions(Math.max(0, Number(e.target.value)))} />
          </div>
        </div>

        <button className="primary" onClick={addTask} disabled={!title.trim()}>
          ADD MISSION <Plus size={16} />
        </button>
      </div>

      <div className="panel task-panel">
        <div className="panel-head">
          <div>
            <span className="eyebrow">MISSION DATABASE</span>
            <h3>All missions</h3>
          </div>
          <strong>{completed}/{tasks.length}</strong>
        </div>

        <div className="planner-filters">
          <input
            placeholder="Search missions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)}>
            <option>All</option>
            {subjects.map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option>All</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="date">Sort: Date</option>
            <option value="subject">Sort: Subject</option>
            <option value="duration">Sort: Duration</option>
            <option value="title">Sort: Name</option>
          </select>
        </div>

        <div className="planner-results">
          SHOWING {filtered.length} OF {tasks.length} MISSIONS
        </div>

        {filtered.map((t: StudyTask) => (
          <div className="task-row planner-task" key={t.id}>
            <label className="planner-task-main">
              <input type="checkbox" checked={t.completed}
                onChange={() => toggle(t.id)} />
              <span className={t.completed ? "topic-done" : ""}>
                <b>{t.title}</b>
                <small>
                  {t.subject} · {t.activity} · {t.date}
                </small>
                <small>
                  {t.plannedMinutes} min · {t.questionTarget} questions
                </small>
              </span>
            </label>
            <button className="icon-button" aria-label="Delete mission"
              onClick={() => setTasks(tasks.filter((x: StudyTask) => x.id !== t.id))}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        {!filtered.length && (
          <div className="empty">
            <Target size={25} />
            <b>No matching missions</b>
            <p>Try changing your filters or create a new mission.</p>
          </div>
        )}
      </div>
    </section>
  );
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

function Circuit({ tasks, setTasks, navigate }: any) {
  const sorted = [...tasks].sort((a: StudyTask, b: StudyTask) =>
    a.date.localeCompare(b.date)
  );

  const completed = sorted.filter((t: StudyTask) => t.completed).length;
  const pending = sorted.length - completed;
  const progress = sorted.length
    ? Math.round((completed / sorted.length) * 100)
    : 0;

  const nextIndex = sorted.findIndex((t: StudyTask) => !t.completed);
  const nextMission = nextIndex >= 0 ? sorted[nextIndex] : null;

  function toggleTask(id: string) {
    setTasks(tasks.map((t: StudyTask) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  }

  return (
    <section className="module-page circuit-v2">
      <Banner
        eyebrow="TORVEX / STUDY CIRCUIT"
        title="THE STUDY TRACK"
        subtitle="Every checkpoint is a real study mission. Complete your objectives and move along your preparation route."
      />

      <div className="circuit-stats">
        <Stat label="TOTAL CHECKPOINTS" value={`${sorted.length}`} note="Your mission route" />
        <Stat label="COMPLETED" value={`${completed}`} note="Objectives cleared" />
        <Stat label="REMAINING" value={`${pending}`} note="Still on the track" />
      </div>

      <section className="panel circuit-overview">
        <div className="panel-head">
          <div>
            <span className="eyebrow">CAREER PROGRESS</span>
            <h3>Your route to the finish</h3>
          </div>
          <Activity size={21} />
        </div>

        <div className="circuit-progress-copy">
          <strong>{progress}%</strong>
          <span>{completed} of {sorted.length} checkpoints cleared</span>
        </div>

        <div className="circuit-progress-track">
          <div style={{ width: `${progress}%` }} />
        </div>

        {nextMission ? (
          <div className="circuit-next">
            <div>
              <span className="eyebrow red">NEXT CHECKPOINT</span>
              <h3>{nextMission.title}</h3>
              <p>
                {nextMission.subject} · {nextMission.activity} ·
                {" "}{nextMission.plannedMinutes} minutes
              </p>
            </div>
            <button className="primary" onClick={() => navigate("Study Planner")}>
              OPEN MISSION <ChevronRight size={16} />
            </button>
          </div>
        ) : (
          <div className="circuit-finished">
            <Check size={22} />
            <div>
              <b>{sorted.length ? "ROUTE CLEARED" : "READY TO START"}</b>
              <p>
                {sorted.length
                  ? "Every checkpoint on your current route is complete."
                  : "Create your first mission to build your study circuit."}
              </p>
            </div>
            <button className="primary" onClick={() => navigate("Study Planner")}>
              {sorted.length ? "PLAN NEXT ROUTE" : "CREATE MISSION"}
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </section>

      <section className="panel circuit-route">
        <div className="panel-head">
          <div>
            <span className="eyebrow">MISSION CHECKPOINTS</span>
            <h3>Your study route</h3>
          </div>
          <span className="circuit-route-count">
            {completed}/{sorted.length} CLEARED
          </span>
        </div>

        {!sorted.length ? (
          <div className="empty">
            <Target size={28} />
            <b>Your track is waiting</b>
            <p>Add missions in Study Planner and they will appear here automatically.</p>
            <button className="primary" onClick={() => navigate("Study Planner")}>
              BUILD MY ROUTE <ChevronRight size={16} />
            </button>
          </div>
        ) : (
          <div className="circuit-list">
            {sorted.map((t: StudyTask, i: number) => {
              const isNext = i === nextIndex;
              const status = t.completed
                ? "cleared"
                : isNext
                  ? "current"
                  : "upcoming";

              return (
                <article className={`circuit-checkpoint ${status}`} key={t.id}>
                  <div className="circuit-node-column">
                    <div className="circuit-node">
                      {t.completed ? <Check size={17} /> : String(i + 1).padStart(2, "0")}
                    </div>
                    {i !== sorted.length - 1 && <div className="circuit-connector" />}
                  </div>

                  <div className="circuit-checkpoint-content">
                    <div className="circuit-checkpoint-top">
                      <span className="eyebrow">
                        CHECKPOINT {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={`circuit-status ${status}`}>
                        {t.completed ? "CLEARED" : isNext ? "UP NEXT" : "UPCOMING"}
                      </span>
                    </div>

                    <h3>{t.title}</h3>
                    <p>
                      {t.subject} · {t.activity} · {t.date}
                    </p>

                    <div className="circuit-meta">
                      <span><Clock3 size={13} /> {t.plannedMinutes} MIN</span>
                      <span><Target size={13} /> {t.questionTarget} QUESTIONS</span>
                    </div>
                  </div>

                  <button
                    className={t.completed ? "circuit-action is-done" : "circuit-action"}
                    onClick={() => toggleTask(t.id)}
                    aria-label={t.completed ? "Mark mission pending" : "Complete mission"}
                  >
                    {t.completed ? <Check size={16} /> : "COMPLETE"}
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </section>
  );
}


function Roadmap({ tasks, chapters }: any) {
  const done = tasks.filter((t: StudyTask) => t.completed).length;
  const chapterProgress = chapters.length
    ? Math.round(
        chapters.reduce((sum: number, chapter: Chapter) => {
          const total = chapter.topics.length;
          const completed = chapter.topics.filter((topic) => topic.completed).length;
          return sum + (total ? (completed / total) * 100 : 0);
        }, 0) / chapters.length
      )
    : 0;

  const levels = [
    { name: "ROOKIE DRIVER", title: "Ignition", desc: "Begin your preparation journey", goal: 0, reward: "Rookie identity" },
    { name: "PRO DRIVER", title: "First Gear", desc: "Complete 5 study missions", goal: 5, reward: "Pro career badge" },
    { name: "ELITE DRIVER", title: "Full Throttle", desc: "Complete 10 study missions", goal: 10, reward: "Elite career badge" },
    { name: "TRACK MASTER", title: "Precision Run", desc: "Complete 20 study missions", goal: 20, reward: "Track Master badge" },
    { name: "CHAMPION", title: "Victory Lane", desc: "Complete 30 study missions", goal: 30, reward: "Champion career badge" },
    { name: "LEGEND", title: "The Final Lap", desc: "Complete 50 study missions", goal: 50, reward: "Legend career badge" },
  ];

  const currentIndex = levels.reduce(
    (last: number, level: any, index: number) =>
      done >= level.goal ? index : last,
    0
  );

  return (
    <section className="module-page roadmap-v2">
      <Banner
        eyebrow="TORVEX / CAREER MODE"
        title="YOUR CAREER ROADMAP"
        subtitle="Every completed study mission moves your career forward."
      />

      <div className="roadmap-overview">
        <div>
          <span className="eyebrow">CAREER PROGRESS</span>
          <h2>{levels[currentIndex].name}</h2>
          <p>{done} missions completed · {levels.length} career gates</p>
        </div>
        <div className="roadmap-progress-ring">
          <strong>{Math.min(100, Math.round((done / 50) * 100))}%</strong>
          <span>CAREER</span>
        </div>
      </div>

      <div className="roadmap-map">
        <div className="roadmap-map-heading">
          <span className="eyebrow">THE ROAD TO CHAMPION</span>
          <span className="roadmap-map-count">{currentIndex + 1} / {levels.length} GATES OPEN</span>
        </div>

        <div className="roadmap-path">
          {levels.map((level: any, index: number) => {
            const unlocked = done >= level.goal;
            const cleared = index < currentIndex;
            const current = index === currentIndex;

            return (
              <div
                className={`roadmap-level ${cleared ? "cleared" : ""} ${current ? "current" : ""} ${!unlocked ? "locked" : ""}`}
                key={level.name}
                style={{ "--road-offset": `${index % 2 === 0 ? 0 : 42}%` } as React.CSSProperties}
              >
                <div className="roadmap-level-node">
                  {cleared ? <Check size={20} /> : !unlocked ? <Lock size={18} /> : <span>{String(index + 1).padStart(2, "0")}</span>}
                </div>

                <div className="roadmap-level-card">
                  <div className="roadmap-level-top">
                    <span className="roadmap-level-number">GATE 0{index + 1}</span>
                    <span className={`roadmap-level-status ${unlocked ? "open" : ""}`}>
                      {cleared ? "CLEARED" : current ? "CURRENT LEVEL" : unlocked ? "UNLOCKED" : "LOCKED"}
                    </span>
                  </div>
                  <h3>{level.title}</h3>
                  <strong>{level.name}</strong>
                  <p>{level.desc}</p>
                  <div className="roadmap-level-footer">
                    <span><Trophy size={14} /> {level.reward}</span>
                    <span>{level.goal === 0 ? "START" : `${Math.max(0, level.goal - done)} missions left`}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="roadmap-bottom-stats">
        <Stat label="MISSIONS COMPLETED" value={`${done}`} note="Recorded study tasks" />
        <Stat label="CHAPTER PROGRESS" value={`${chapterProgress}%`} note="Based on topic completion" />
      </div>
    </section>
  );
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
      <Garage3D
  modelPath="/models/spectral_gt_rs_game_ready.glb"
  paint={finish.color}
/>
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
      {active === "Study Circuit" && (
  <Circuit tasks={tasks} setTasks={setTasks} navigate={setActive} />
)}
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
