import { useState } from "react";
import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg text-secondaryText">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="lg:ml-72">
        <Navbar setOpen={setOpen} />

        <main className="min-h-[calc(100vh-72px)] p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
