"use client";

import { useEffect, useState } from "react";
import TaskBox from "@/components/TaskBox";
import { fetchTasks } from "@/lib/api";
import type { Task } from "@/lib/types";

export default function CompletedTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks("/tasks/");
        const completeTasks = data.filter((task: Task) => task.completed);
        setTasks(completeTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    loadTasks();
  });

  return (
    <div className="flex flex-col justify-center items-center p-4 font-[family-name:var(--font-geist-sans)]">
      <h1 className="w-1/2 text-3xl mb-5 font-black">All Tasks</h1>
      <div className="w-full flex flex-col justify-center items-center gap-3">
        {tasks.map((task) => (
          <TaskBox key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
