import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Button from "@/components/Button";
import SidebarToggleStateProvider from "./SidebarToggleStateProvider";

export default function Home() {
  return (
    <SidebarToggleStateProvider>
      <div className="md:flex">
        <Sidebar />
        <div className="flex h-screen flex-1 flex-col">
          <Navbar />
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
    </SidebarToggleStateProvider>
  );
}