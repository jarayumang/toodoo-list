"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchCategories, postTask } from "@/lib/api";

interface Category {
  id: string;
  name: string;
}

export default function NewTask() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [dueDate, setDueDate] = useState<string>("");
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const taskData = {
      name: taskTitle,
      description: taskDescription,
      completed: false,
      priority: priority,
      category: categories[0]?.id,
      due_date: dueDate,
      completed_date: null,
      subtasks: null,
    };

    try {
      const response = await postTask(taskData);
      console.log("Task created:", response);
      router.push("/");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 font-[family-name:var(--font-geist-sans)]">
      <h1 className="w-1/2 text-3xl mb-5 font-black">New Task</h1>
      <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
        <textarea
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
          rows={4}
        />
        <select
          className="border border-gray-300 rounded px-4 py-2"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="" disabled>
            Select Priority
          </option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select
          className="border border-gray-300 rounded px-4 py-2"
          defaultValue=""
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
