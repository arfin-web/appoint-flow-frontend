"use client";

import { formatDistanceToNow } from "date-fns";
import { ListRestart, Clock } from "lucide-react";
import { ActivityLog as ActivityLogType } from "@/types";

interface ActivityLogProps {
    logs: ActivityLogType[];
}

export function ActivityLog({ logs }: ActivityLogProps) {
    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col h-[400px]">
            <div className="p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ListRestart className="w-5 h-5 text-primary" />
                    <h3 className="font-bold">Recent Activity</h3>
                </div>
                <span className="text-xs text-muted-foreground">{logs.length} logs recorded</span>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {logs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
                        <Clock className="w-8 h-8 opacity-20" />
                        <p>No activity recorded yet</p>
                    </div>
                ) : (
                    logs.map((log) => (
                        <div key={log.id} className="flex gap-4 relative">
                            <div className="hidden sm:block text-[10px] text-muted-foreground w-16 pt-1 shrink-0 uppercase tracking-tighter">
                                {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="absolute left-[72px] top-6 bottom-[-24px] w-px bg-border last:hidden" />
                            <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5 shrink-0 z-10" />
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-medium leading-relaxed">{log.message}</p>
                                <span className="text-xs text-muted-foreground flex items-center gap-1 italic">
                                    {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
