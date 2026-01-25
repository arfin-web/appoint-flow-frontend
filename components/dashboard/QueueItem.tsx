"use client";

import { UserCheck, Trash2, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Queue } from "@/types";
import { format, parseISO } from "date-fns";

interface QueueItemProps {
    item: Queue;
    index: number;
    onAssign: () => void;
    onRemove: (id: string) => void;
    isAssigning: boolean;
}

export function QueueItem({ item, index, onAssign, onRemove, isAssigning }: QueueItemProps) {
    const getOrdinal = (n: number) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return (
        <div className="bg-card border border-border p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-md transition-all">
            <div className="flex items-center gap-6 w-full sm:w-auto">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex flex-col items-center justify-center text-primary shrink-0 text-center">
                    <span className="text-[10px] font-bold uppercase leading-tight">Pos</span>
                    <span className="text-xl font-black">{getOrdinal(index + 1)}</span>
                </div>
                <div className="space-y-1">
                    <h4 className="font-bold text-lg">{item.appointment?.customerName}</h4>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{item.appointment?.service?.name}</span>
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{item.appointment ? format(parseISO(item.appointment.appointmentDate), "MMM dd, HH:mm") : "-"}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full flex-1 sm:flex-none"
                    onClick={onAssign}
                    disabled={index !== 0 || isAssigning}
                >
                    <UserCheck className="w-4 h-4 mr-2" />
                    Assign
                </Button>
                <button
                    onClick={() => onRemove(item.id)}
                    className="p-2 hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded-full transition-colors"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
