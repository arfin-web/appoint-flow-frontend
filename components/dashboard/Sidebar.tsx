"use client";

import React from "react";
import Link from "next/link";
import {
    LayoutDashboard,
    CalendarDays,
    Users,
    Settings2,
    ListOrdered,
    Calendar,
    ChevronLeft,
    ChevronRight,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type DashboardTab = "overview" | "appointments" | "staff" | "services" | "queue";

interface SidebarProps {
    activeTab: DashboardTab;
    setActiveTab: (tab: DashboardTab) => void;
}

const navItems: { id: DashboardTab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "appointments", label: "Appointments", icon: <CalendarDays className="w-5 h-5" /> },
    { id: "staff", label: "Staff", icon: <Users className="w-5 h-5" /> },
    { id: "services", label: "Services", icon: <Settings2 className="w-5 h-5" /> },
    { id: "queue", label: "Waiting Queue", icon: <ListOrdered className="w-5 h-5" /> },
];

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    return (
        <aside
            className={cn(
                "h-screen bg-card border-r border-border flex flex-col transition-all duration-300 relative",
                isCollapsed ? "w-20" : "w-64"
            )}
        >
            <div className="p-6 flex items-center gap-3">
                <div className="bg-primary p-2 rounded-lg shrink-0">
                    <Calendar className="w-6 h-6 text-primary-foreground" />
                </div>
                {!isCollapsed && (
                    <span className="text-xl font-bold tracking-tight truncate">AppointFlow</span>
                )}
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium group relative",
                            activeTab === item.id
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                    >
                        <div className={cn("shrink-0", activeTab === item.id ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary transition-colors")}>
                            {item.icon}
                        </div>
                        {!isCollapsed && <span className="truncate">{item.label}</span>}

                        {/* Active Indicator Line */}
                        {activeTab === item.id && !isCollapsed && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full" />
                        )}
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-border mt-auto">
                <Button
                    variant="ghost"
                    className={cn("w-full justify-start gap-3 px-3 py-6 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors")}
                >
                    <LogOut className="w-5 h-5" />
                    {!isCollapsed && <span>Logout</span>}
                </Button>
            </div>

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
