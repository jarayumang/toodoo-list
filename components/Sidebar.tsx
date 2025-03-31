"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NotebookPen,
  ListTodo,
  FileCheck2,
  Layers,
  Sun,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { href: "/new", icon: NotebookPen, label: "New Task" },
    { href: "/", icon: ListTodo, label: "All Tasks" },
    { href: "/today", icon: Sun, label: "Today" },
    { href: "/upcoming", icon: Layers, label: "Upcoming" },
    { href: "/completed", icon: FileCheck2, label: "Completed" },
  ];

  return (
    <aside className="w-64 h-screen bg-[#F5F5F5] text-black text-sm p-4">
      <ul className="mt-4">
        {menuItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;

          return (
            <li key={href} className="py-2">
              <Link
                href={href}
                className={`flex flex-row items-center gap-3 p-2 rounded-md transition-colors 
                ${isActive ? "bg-[#DCDCDC] font-bold" : "hover:bg-[#DCDCDC]"}`}
              >
                <Icon size={14} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
