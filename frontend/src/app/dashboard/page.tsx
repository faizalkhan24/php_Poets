"use client";
import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import TaskTable from "../components/TaskTable";
import ConfirmationModal from "../components/ConfirmationModal";
import TaskCreateModal from "../models/TaskCreateModal";
import { Task } from "../types/Types";
import withAuth from "../components/withAuth";

const DashboardPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<number | undefined>(undefined);
  const [shouldRefetch, setShouldRefetch] = useState<boolean>(false); 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/getall`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [shouldRefetch]); 

  const handleCreateTask = async (task: Task) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      await response.json();
      setShouldRefetch(true);  
      setIsModalOpen(false);  

    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleUpdateTask = async (task: Task) => {
    if (!task.id) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/update/${task.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        const errorText = await response.text(); 
        throw new Error(`Failed to update task: ${errorText}`);
      }

      await response.json();
      setShouldRefetch(true);  
      setSelectedTask(undefined);
      setIsModalOpen(false);   

    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    if (taskToDelete === undefined) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/delete/${taskToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTaskToDelete(undefined);
      setIsConfirmationModalOpen(false);
      setShouldRefetch(true);  

    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleOpenConfirmationModal = (id: number) => {
    setTaskToDelete(id);
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    setTaskToDelete(undefined);
  };

  const handleView = (id: number) => {
    const task = tasks.find(task => task.id === id);
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleEdit = (id: number) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
      setSelectedTask(task);
      setIsModalOpen(true);
    }
  };


  return (
    <DashboardLayout>
      <h2 className="text-3xl font-semibold mb-6">Dashboard Overview</h2>
      <p className="mb-4">
        Welcome to the Admin Dashboard. Use the sidebar to manage tasks or update your profile.
      </p>

      <button
        className="px-4 py-2 mb-4 bg-blue-500 text-white rounded"
        onClick={() => {
          setSelectedTask(undefined); 
          setIsModalOpen(true);
        }}
      >
        Create Task
      </button>

      <TaskTable
        tasks={tasks}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleOpenConfirmationModal}
      />
      <TaskCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskCreate={handleCreateTask}
        onTaskUpdate={handleUpdateTask}
        taskToEdit={selectedTask}
      />
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        message="Are you sure you want to delete this task?"
        onConfirm={handleDelete}
        onCancel={handleCloseConfirmationModal}
      />
    </DashboardLayout>
  );
};

export default withAuth(DashboardPage);
