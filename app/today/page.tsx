"use client";

import { useEffect, useState } from "react";
import TaskBox from "@/components/TaskBox";
import { fetchTasks } from "@/lib/api";
import type { Task } from "@/lib/types";

export default function TodayTask() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
      const data = await fetchTasks("/tasks/");
      const filteredTasks = data.filter((task: Task) => {
        const dueDate = task.due_date ? new Date(task.due_date).toDateString() : null;
        const today = new Date().toDateString();
        return dueDate === today;
      });
      setTasks(filteredTasks);
      } catch (error) {
      console.error("Error fetching tasks:", error);
      }
    };

    loadTasks();
  });

  return (
    <div className="flex flex-col justify-center items-center p-4 font-[family-name:var(--font-geist-sans)]">
      <h1 className="w-1/2 text-3xl mb-5 font-black">Today</h1>
      <div className="w-full flex flex-col justify-center items-center gap-3">
        {tasks.map((task, index) => (
          <TaskBox key={index} task={task} />
        ))}
      </div>
    </div>
  );
}
