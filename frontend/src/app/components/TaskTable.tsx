import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import TaskModal from "../models/TaskModal";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
}

interface TaskTableProps {
  tasks: Task[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onView, onEdit, onDelete }) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleView = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">No tasks available</td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{task.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{task.description}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{task.priority}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{task.status}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-500">
                  <button onClick={() => handleView(task)} className="text-blue-600 hover:text-blue-800">
                    <FaEye />
                  </button>
                  <button onClick={() => onEdit(task.id)} className="text-yellow-600 hover:text-yellow-800 ml-2">
                    <FaEdit />
                  </button>
                  <button onClick={() => onDelete(task.id)} className="text-red-600 hover:text-red-800 ml-2">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {selectedTask && <TaskModal task={selectedTask} onClose={handleCloseModal} />}
    </div>
  );
};

export default TaskTable;
