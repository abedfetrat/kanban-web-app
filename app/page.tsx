"use client";
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ThemeProvider from "./providers/ThemeProvider";

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => setShowSidebar((prev) => !prev);

  return (
    <ThemeProvider>
      <div className="md:flex">
        <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
        <div className="flex-1">
          <Navbar showSidebar={showSidebar} />
          <main>
            <h1>Hello</h1>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
