
export type Subject = "Physics" | "Chemistry" | "Mathematics";

export type ChapterStatus =
  | "not-started"
  | "in-progress"
  | "completed"
  | "revision-needed";

export interface Topic {
  id: string;
  name: string;
  completed: boolean;
}

export interface Chapter {
  id: string;
  subject: Subject;
  name: string;
  topics: Topic[];
  status: ChapterStatus;
  priority: "high" | "medium" | "low";
}

export interface StudyTask {
  id: string;
  title: string;
  subject: Subject;
  chapterId: string;
  activity:
    | "theory"
    | "questions"
    | "pyq"
    | "revision"
    | "mock-test"
    | "error-analysis";
  plannedMinutes: number;
  questionTarget: number;
  completed: boolean;
  date: string;
  notes: string;
}

export interface StudySession {
  id: string;
  date: string;
  subject: Subject;
  minutes: number;
  questionsAttempted: number;
  correct: number;
  incorrect: number;
}

export const subjects: Subject[] = [
  "Physics",
  "Chemistry",
  "Mathematics",
];

export const initialChapters: Chapter[] = [
  {
    id: "phy-units",
    subject: "Physics",
    name: "Units and Measurements",
    status: "not-started",
    priority: "high",
    topics: [
      { id: "phy-u-1", name: "Units and dimensions", completed: false },
      { id: "phy-u-2", name: "Dimensional analysis", completed: false },
      { id: "phy-u-3", name: "Errors and measurements", completed: false },
    ],
  },
  {
    id: "phy-motion",
    subject: "Physics",
    name: "Laws of Motion",
    status: "not-started",
    priority: "high",
    topics: [
      { id: "phy-m-1", name: "Newton's laws", completed: false },
      { id: "phy-m-2", name: "Friction", completed: false },
      { id: "phy-m-3", name: "Circular motion", completed: false },
    ],
  },
  {
    id: "chem-basic",
    subject: "Chemistry",
    name: "Some Basic Concepts of Chemistry",
    status: "not-started",
    priority: "high",
    topics: [
      { id: "chem-b-1", name: "Mole concept", completed: false },
      { id: "chem-b-2", name: "Stoichiometry", completed: false },
      { id: "chem-b-3", name: "Concentration terms", completed: false },
    ],
  },
  {
    id: "chem-atomic",
    subject: "Chemistry",
    name: "Structure of Atom",
    status: "not-started",
    priority: "medium",
    topics: [
      { id: "chem-a-1", name: "Atomic models", completed: false },
      { id: "chem-a-2", name: "Quantum numbers", completed: false },
      { id: "chem-a-3", name: "Electronic configuration", completed: false },
    ],
  },
  {
    id: "math-functions",
    subject: "Mathematics",
    name: "Relations and Functions",
    status: "not-started",
    priority: "high",
    topics: [
      { id: "math-f-1", name: "Relations", completed: false },
      { id: "math-f-2", name: "Types of functions", completed: false },
      { id: "math-f-3", name: "Composition of functions", completed: false },
    ],
  },
  {
    id: "math-matrices",
    subject: "Mathematics",
    name: "Matrices",
    status: "not-started",
    priority: "medium",
    topics: [
      { id: "math-m-1", name: "Types of matrices", completed: false },
      { id: "math-m-2", name: "Matrix operations", completed: false },
      { id: "math-m-3", name: "Inverse of a matrix", completed: false },
    ],
  },
];

export const initialTasks: StudyTask[] = [];

export const initialSessions: StudySession[] = [];

export const getChapterProgress = (chapter: Chapter): number => {
  if (chapter.topics.length === 0) return 0;
  const completed = chapter.topics.filter(
    (topic) => topic.completed
  ).length;
  return Math.round((completed / chapter.topics.length) * 100);
};

export const getSubjectProgress = (
  chapters: Chapter[],
  subject: Subject
): number => {
  const selected = chapters.filter(
    (chapter) => chapter.subject === subject
  );
  if (selected.length === 0) return 0;

  const total = selected.reduce(
    (sum, chapter) => sum + getChapterProgress(chapter),
    0
  );

  return Math.round(total / selected.length);
};

export const getStudyStats = (sessions: StudySession[]) => {
  const totalMinutes = sessions.reduce(
    (sum, session) => sum + session.minutes,
    0
  );

  const attempted = sessions.reduce(
    (sum, session) => sum + session.questionsAttempted,
    0
  );

  const correct = sessions.reduce(
    (sum, session) => sum + session.correct,
    0
  );

  const incorrect = sessions.reduce(
    (sum, session) => sum + session.incorrect,
    0
  );

  const accuracy =
    correct + incorrect > 0
      ? Math.round((correct / (correct + incorrect)) * 100)
      : 0;

  return {
    totalMinutes,
    totalHours: Math.round((totalMinutes / 60) * 10) / 10,
    questionsAttempted: attempted,
    correct,
    incorrect,
    accuracy,
  };
};

