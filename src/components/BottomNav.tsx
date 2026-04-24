import { NavLink } from "react-router-dom";
import { CalendarCheck, Clock, TrendingUp, Settings } from "lucide-react";

import type { LucideIcon } from "lucide-react";

type NavItem = {
  to: string;
  label: string;
  Icon: LucideIcon;
};

const items: NavItem[] = [
  { to: "/", label: "Today", Icon: CalendarCheck },
  { to: "/history", label: "History", Icon: Clock },
  { to: "/progress", label: "Progress", Icon: TrendingUp },
  { to: "/settings", label: "Settings", Icon: Settings },
];

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around items-center h-16 bg-gray-900 border-t border-gray-800">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === "/"}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center h-full text-xs ${isActive ? "text-amber-400" : "text-gray-500"}`
          }
        >
          <item.Icon size={20} />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNav;
