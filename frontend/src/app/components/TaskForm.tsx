import { useState, useEffect } from "react";
import axios from "axios";

interface TaskFormProps {
  fetchTasks: () => void;
  selectedTask: any;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  fetchTasks,
  selectedTask,
  isEditing,
  setIsEditing,
}) => {
  const [task, setTask] = useState({ title: "", description: "", priority: "", status: "pending" });

  useEffect(() => {
    if (isEditing && selectedTask) {
      setTask(selectedTask);
    }
  }, [isEditing, selectedTask]);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/api/tasks/${selectedTask.id}`, task);
      } else {
        await axios.post("/api/tasks", task);
      }
      setTask({ title: "", description: "", priority: "", status: "pending" });
      setIsEditing(false);
      fetchTasks();
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="text"
        placeholder="Task Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        className="block border p-2 mb-4 w-full"
      />
      <textarea
        placeholder="Task Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        className="block border p-2 mb-4 w-full"
      />
      <input
        type="text"
        placeholder="Task Priority"
        value={task.priority}
        onChange={(e) => setTask({ ...task, priority: e.target.value })}
        className="block border p-2 mb-4 w-full"
      />
      <select
        value={task.status}
        onChange={(e) => setTask({ ...task, status: e.target.value })}
        className="block border p-2 mb-4 w-full"
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <button className="bg-blue-500 text-white p-2" type="submit">
        {isEditing ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
};

export default TaskForm;
