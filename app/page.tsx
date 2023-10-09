"use client";
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ThemeProvider from "./providers/ThemeProvider";
import Button from "./components/Button";

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => setShowSidebar((prev) => !prev);

  return (
    <ThemeProvider>
      <div className="md:flex">
        <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
        <div className="flex h-screen flex-1 flex-col">
          <Navbar showSidebar={showSidebar} />
          <main className="grid flex-1 place-items-center px-4 pt-6 md:px-6">
            <section className="text-center">
              <p className="text-lg font-bold text-medium-grey">
                This board is empty. Create a new column to get started.
              </p>
              <Button size="large" className="mt-6" color="primary">
                + Add New Column
              </Button>
            </section>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
