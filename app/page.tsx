"use client";

import { useEffect, useState } from "react";
import TaskBox from "@/components/TaskBox";
import { fetchTasks } from "@/lib/api";
import type { Task } from "@/lib/types";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"priority" | "dueDate" | "none">("none");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<"High" | "Medium" | "Low" | "">("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks("/tasks/");
        const incompleteTasks = data.filter((task: Task) => !task.completed);
        setTasks(incompleteTasks);
        setFilteredTasks(incompleteTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    let updatedTasks = [...tasks];
    if (filter === "priority" && selectedPriority) {
      updatedTasks = updatedTasks.filter((task) => task.priority === selectedPriority);
    } else if (filter === "dueDate") {
      updatedTasks.sort((a, b) =>
        new Date(a.due_date || 0).getTime() - new Date(b.due_date || 0).getTime()
      );
    }
    setFilteredTasks(updatedTasks);
  }, [filter, tasks, selectedPriority]);

  const handlePriorityFilter = () => {
    setFilter("priority");
    setIsModalOpen(true);
  };

  const applyPriorityFilter = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 font-[family-name:var(--font-geist-sans)]">
      <div className="w-1/2 mb-5 font-black flex flex-row justify-between items-center">
        <h1 className="text-3xl font-bold">Task List</h1>
        <div className="flex justify-center items-center gap-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handlePriorityFilter}
          >
            Filter by Priority
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => setFilter("dueDate")}
          >
            Sort by Due Date
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded"
            onClick={() => {
              setFilter("none");
              setSelectedPriority("");
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-3">
        {filteredTasks.map((task, index) => (
          <TaskBox key={index} task={task} />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-transparent bg-opacity-70 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Filter by Priority</h2>
            <div className="flex flex-col gap-2">
              {["High", "Medium", "Low"].map((priority) => (
                <label key={priority} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={selectedPriority === priority}
                    onChange={() => setSelectedPriority(priority as "High" | "Medium" | "Low")}
                  />
                  {priority}
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={applyPriorityFilter}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
