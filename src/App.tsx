import React from "react";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar placeholder */}
      <header className="bg-gray-900 text-white p-4">
        <h1 className="text-xl font-bold">Skinstric</h1>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center">
        <h2 className="text-3xl font-semibold">Welcome to Skinstric</h2>
      </main>

      {/* Footer placeholder */}
      <footer className="bg-gray-100 text-center p-4 text-sm text-gray-600">
        © {new Date().getFullYear()} Skinstric. All rights reserved.
      </footer>
    </div>
  );
}
