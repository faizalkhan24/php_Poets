"use client"; 

import { useRouter } from "next/navigation"; 
import React from "react";

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login"); 
  };

  return (
    <header className="bg-blue-600 text-white h-16 flex items-center justify-between px-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="flex items-center space-x-4">
        <p>Welcome, Admin</p>
        <button
          className="bg-blue-800 py-2 px-4 rounded hover:bg-blue-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
