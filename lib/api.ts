const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://toodoo-bkau.onrender.com/api";

// Fetch tasks
export const fetchTasks = async (endpoint: string, options?: RequestInit) => {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      ...options,
    });

    if (!res.ok) {
      throw new Error(`Error fetching ${endpoint}: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Fetch categories
export const fetchCategories = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/categories/`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Error fetching categories: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

type PostTaskData = {
  name: string;
  description: string;
  completed: boolean;
  completed_date: string | null;
  due_date: string | null;
  priority: string;
}
// Post a new task
export const postTask = async (taskData: PostTaskData ) => {
  try {
    console.log(taskData)
    const res = await fetch(`${API_BASE_URL}/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (!res.ok) {
      throw new Error(`Error posting task: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error posting task:", error);
    throw error;
  }
};

// Patch an existing task
type PatchTaskData = {
  name?: string;
  description?: string;
  completed?: boolean;
  created_date?: string;
  completed_date?: string;
  due_date?: string | null;
  priority?: string;
};

export const patchTask = async (id: number, taskData: PatchTaskData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (!res.ok) {
      throw new Error(`Error updating task: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id: number) => {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}/`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(`Error deleting task: ${res.statusText}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};