import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen py-8">
      <nav className="space-y-4">
        <Link href="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
          Dashboard
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
