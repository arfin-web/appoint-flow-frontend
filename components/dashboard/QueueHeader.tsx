"use client";

import { UserCheck } from "lucide-react";

interface QueueHeaderProps {
    queueLength: number;
    onAssign: () => void;
    isAssigning: boolean;
}

export function QueueHeader({ queueLength, onAssign, isAssigning }: QueueHeaderProps) {
    return (
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Waiting Queue</h2>
                <p className="text-sm text-muted-foreground">{queueLength} customers waiting for assignment</p>
            </div>
            <button
                onClick={onAssign}
                disabled={queueLength === 0 || isAssigning}
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-11 px-8 rounded-full gap-2 shadow-lg shadow-primary/20 flex items-center justify-center font-medium transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
                <UserCheck className="w-4 h-4" />
                {isAssigning ? "Assigning..." : "Assign From Queue"}
            </button>
        </div>
    );
}
