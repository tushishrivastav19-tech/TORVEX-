
import { useState } from "react";

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function migrateChapters(saved: any[], defaults: any[]): any[] {
  const topicAliases: Record<string, string[]> = {
    "errorsinmeasurement": ["errorsandmeasurements"],
    "circularmotionandcentripetalforce": ["circularmotion"],
    "typesandalgebraofmatrices": ["typesofmatrices"],
    "adjointandinverse": ["inverseofamatrix"],
    "oneoneintoandontofunctions": ["typesoffunctions"],
  };

  return defaults.map((fresh) => {
    const old = saved.find((chapter) => chapter.id === fresh.id);

    if (!old) return fresh;

    const oldTopics = old.topics || [];

    const topics = fresh.topics.map((topic: any) => {
      const name = normalize(topic.name);
      const possibleNames = [name, ...(topicAliases[name] || [])];

      const previous = oldTopics.find((item: any) =>
        possibleNames.includes(normalize(item.name))
      );

      return {
        ...topic,
        completed: previous ? Boolean(previous.completed) : false,
      };
    });

    const completedCount = topics.filter(
      (topic: any) => topic.completed
    ).length;

    let status = old.status || "not-started";

    if (completedCount === topics.length && topics.length > 0) {
      status = "completed";
    } else if (completedCount > 0) {
      status = "in-progress";
    } else if (status !== "revision-needed") {
      status = "not-started";
    }

    return {
      ...fresh,
      topics,
      status,
      priority: old.priority || fresh.priority,
    };
  });
}

export function usePersistentState<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);

      if (!saved) return initialValue;

      const parsed = JSON.parse(saved) as T;

      if (
        key === "torvex-chapters-v1" &&
        Array.isArray(parsed) &&
        Array.isArray(initialValue)
      ) {
        const migrated = migrateChapters(parsed, initialValue as any[]);
        localStorage.setItem(key, JSON.stringify(migrated));
        return migrated as T;
      }

      return parsed;
    } catch {
      return initialValue;
    }
  });

  function updateValue(nextValue: T) {
    setValue(nextValue);

    try {
      localStorage.setItem(key, JSON.stringify(nextValue));
    } catch {
      console.error("TORVEX could not save data.");
    }
  }

  return [value, updateValue];
}
