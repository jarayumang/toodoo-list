"use client";

import { Circle, CheckCircle, X } from "lucide-react";
import { useState } from "react";
import { patchTask, deleteTask } from "@/lib/api";
import type { Task } from "@/lib/types";

interface TaskBoxProps {
  task: Task;
}

const TaskBox: React.FC<TaskBoxProps> = ({ task }) => {
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [editableTask, setEditableTask] = useState({ ...task });

  const handleIconClick = async () => {
    try {
      await patchTask(task.id, { completed: true });
      setIsCompleted(true);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await deleteTask(task.id);
      console.log("Task deleted successfully");
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleSaveClick = async () => {
    try {
      await patchTask(task.id, editableTask);
      console.log("Task updated successfully");
      setIsDetailsOpen(false);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleCancelClick = () => {
    setIsDetailsOpen(false);    
  }

  const handleBackClick = () => {
    setIsDeleteOpen(false);
  };

  return (
    <div
      className="relative w-1/2 border-2 p-3 rounded-lg flex flex-row gap-2 items-center bg-white shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={() => setIsDetailsOpen(true)}
    >
      <X
        size={20}
        className="absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-red-500 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          setIsDeleteOpen(true);
        }}
      />
      {!isCompleted ? (
        <Circle
          size={20}
          className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            handleIconClick();
          }}
        />
      ) : (
        <CheckCircle
          size={20}
          className="text-green-500 transition-transform transform scale-100"
        />
      )}
      <div className="flex flex-col ml-3">
        <h1 className="text-xl font-bold">{task.name}</h1>
        <p className="text-gray-500">{task.description}</p>
        <div className="flex flex-row justify-between mt-2 gap-2">
          {task.due_date && (
            <span className="bg-gray-100 text-gray-700 text-sm font-medium px-2.5 py-0.5 rounded-3xl">
              Due: {new Date(task.due_date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })}
            </span>
          )}
          <span
            className={`text-sm font-medium px-2.5 py-0.5 rounded-3xl ${
              task.priority === "Low"
                ? "bg-green-100 text-green-700"
                : task.priority === "Medium"
                ? "bg-blue-100 text-blue-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {task.priority}
          </span>
        </div>
      </div>

      {isDetailsOpen && (
        <div className="fixed inset-0 bg-transparent bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Edit Task</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                className="border p-2 rounded"
                value={editableTask.name}
                onChange={(e) =>
                  setEditableTask({ ...editableTask, name: e.target.value })
                }
              />
              <textarea
                className="border p-2 rounded"
                value={editableTask.description}
                onChange={(e) =>
                  setEditableTask({ ...editableTask, description: e.target.value })
                }
              />
              <input
                type="date"
                className="border p-2 rounded"
                value={
                  editableTask.due_date
                    ? new Date(editableTask.due_date).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setEditableTask({ ...editableTask, due_date: e.target.value })
                }
              />
              <select
                className="border p-2 rounded"
                value={editableTask.priority}
                onChange={(e) =>
                  setEditableTask({ ...editableTask, priority: e.target.value })
                }
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancelClick();
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSaveClick;
                }}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick;
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteOpen && (
        <div className="fixed inset-0 bg-transparent bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this task?</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBackClick();
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick;
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBox;
