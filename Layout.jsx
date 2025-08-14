import React from "react";
import { Outlet } from "react-router-dom";
import BackButton from "./src/components/BackButton";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <BackButton />
        <h1 className="text-lg font-bold">My Learning App</h1>
      </nav>

      {/* Main content */}
      <main className="flex-grow p-6 bg-gray-100">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        &copy; {new Date().getFullYear()} My Learning App. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
