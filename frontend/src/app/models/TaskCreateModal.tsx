import React, { useState, useEffect } from "react";
import { Task } from "../types/Types";

interface TaskCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreate: (task: Task) => void;
  onTaskUpdate?: (task: Task) => void;
  taskToEdit?: Task;
}

const TaskCreateModal: React.FC<TaskCreateModalProps> = ({
  isOpen,
  onClose,
  onTaskCreate,
  onTaskUpdate,
  taskToEdit
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Pending"); // Default status
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority);
      setStatus(taskToEdit.status); // Set status if editing
      setIsEditing(true);
    } else {
      setIsEditing(false);
      setTitle("");
      setDescription("");
      setPriority("Low");
      setStatus("Pending"); // Reset status for new tasks
    }
  }, [taskToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const task: Partial<Task> = { // Use Partial<Task> to allow optional properties
      title,
      description,
      priority,
      status,
      id: isEditing ? taskToEdit?.id : undefined, // Only set id if editing
    };
    if (isEditing && onTaskUpdate) {
      onTaskUpdate(task as Task); // Cast to Task if you're sure it meets the criteria
    } else {
      onTaskCreate(task as Task); // Cast to Task if you're sure it meets the criteria
    }
    setTitle("");
    setDescription("");
    setPriority("Low");
    setStatus("Pending"); 
    onClose();  
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">
          {isEditing ? "Edit Task" : "Create a New Task"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Priority</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 mr-2 text-gray-600 bg-gray-200 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-lg"
            >
              {isEditing ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskCreateModal;
