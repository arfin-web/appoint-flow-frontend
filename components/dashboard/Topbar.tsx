"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Topbar() {
    const pathname = usePathname();

    const getBreadcrumb = () => {
        const parts = pathname.split('/').filter(Boolean);
        if (parts.length <= 1) return "Overview";
        return parts[parts.length - 1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <header className="h-20 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
            <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold tracking-tight">{getBreadcrumb()}</h2>
                <div className="hidden md:flex relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search anything..."
                        className="pl-9 bg-background/50 border-none ring-1 ring-border focus-visible:ring-primary shadow-none h-9 rounded-full"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="rounded-full relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-card" />
                </Button>
                <div className="h-8 w-px bg-border mx-2" />
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold">Admin User</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-medium">Workspace Owner</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                        <User className="w-6 h-6" />
                    </div>
                </div>
            </div>
        </header>
    );
}
