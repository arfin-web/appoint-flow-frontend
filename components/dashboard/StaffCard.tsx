"use client";

import { Pencil, Trash2, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Staff, StaffStatus } from "@/types";

interface StaffCardProps {
    staff: Staff;
    onEdit: (staff: Staff) => void;
    onDelete: (id: string) => void;
}

export function StaffCard({ staff, onEdit, onDelete }: StaffCardProps) {
    return (
        <div className="bg-card border border-border p-6 rounded-2xl relative group hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                        {staff.name.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-bold">{staff.name}</h4>
                        <p className="text-xs text-muted-foreground">{staff.staffType}</p>
                    </div>
                </div>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit(staff)}
                        className="p-1.5 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(staff.id)}
                        className="p-1.5 hover:bg-destructive/10 rounded-md text-muted-foreground hover:text-destructive"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Daily Limit</span>
                    <span className="font-semibold">{staff.dailyCapacity} appointments</span>
                </div>

                <div className="flex items-center gap-2">
                    {staff.status === StaffStatus.AVAILABLE ? (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            AVAILABLE
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-destructive bg-destructive/10 px-2 py-1 rounded-full">
                            <ShieldAlert className="w-3.5 h-3.5" />
                            ON LEAVE
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
