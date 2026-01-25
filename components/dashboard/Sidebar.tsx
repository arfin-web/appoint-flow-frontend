"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    CalendarDays,
    Users,
    Settings2,
    ListOrdered,
    Calendar,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard className="w-5 h-5" />, href: "/dashboard" },
    { id: "appointments", label: "Appointments", icon: <CalendarDays className="w-5 h-5" />, href: "/dashboard/appointments" },
    { id: "staff", label: "Staff", icon: <Users className="w-5 h-5" />, href: "/dashboard/staff" },
    { id: "services", label: "Services", icon: <Settings2 className="w-5 h-5" />, href: "/dashboard/services" },
    { id: "queue", label: "Waiting Queue", icon: <ListOrdered className="w-5 h-5" />, href: "/dashboard/queue" },
];

export function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <aside
            className={cn(
                "h-screen bg-card border-r border-border flex flex-col transition-all duration-300 relative shrink-0",
                isCollapsed ? "w-20" : "w-64"
            )}
        >
            <Link href="/">
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-primary p-2 rounded-lg shrink-0">
                        <Calendar className="w-6 h-6 text-primary-foreground" />
                    </div>
                    {!isCollapsed && (
                        <span className="text-xl font-bold tracking-tight truncate">AppointFlow</span>
                    )}
                </div>
            </Link>

            <nav className="flex-1 px-4 py-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium group relative",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <div className={cn("shrink-0", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary transition-colors")}>
                                {item.icon}
                            </div>
                            {!isCollapsed && <span className="truncate">{item.label}</span>}

                            {/* Active Indicator Line */}
                            {isActive && !isCollapsed && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full" />
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Collapse Toggle */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-20 bg-background border border-border rounded-full p-1 shadow-md hover:bg-muted transition-colors z-50"
            >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
        </aside>
    );
}
