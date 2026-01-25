"use client";

import { Users, AlertCircle, CheckCircle2 } from "lucide-react";
import { Staff, Appointment } from "@/types";
import { cn } from "@/lib/utils";

interface StaffWorkloadProps {
    staffs: Staff[];
    appointments: Appointment[];
}

export function StaffWorkload({ staffs, appointments }: StaffWorkloadProps) {
    // Calculate today's workload for each staff
    const today = new Date().toISOString().split('T')[0];

    const workloads = staffs.map(staff => {
        const count = appointments.filter(a =>
            a.staffId === staff.id &&
            a.appointmentDate.startsWith(today) &&
            a.status !== "CANCELLED"
        ).length;

        const isBooked = count >= staff.dailyCapacity;

        return {
            ...staff,
            currentCount: count,
            isBooked
        };
    });

    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col h-[400px]">
            <div className="p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <h3 className="font-bold">Staff Workload (Today)</h3>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {workloads.length === 0 ? (
                    <p className="text-center text-muted-foreground py-10 italic">No staff members found</p>
                ) : (
                    workloads.map((staff) => (
                        <div key={staff.id} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">{staff.name}</span>
                                    <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded-full">
                                        {staff.staffType}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={cn(
                                        "font-bold",
                                        staff.isBooked ? "text-destructive" : "text-foreground"
                                    )}>
                                        {staff.currentCount} / {staff.dailyCapacity}
                                    </span>
                                    {staff.isBooked ? (
                                        <div className="flex items-center gap-1 text-[10px] text-destructive font-bold uppercase tracking-wider">
                                            <AlertCircle className="w-3 h-3" />
                                            Booked
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1 text-[10px] text-green-500 font-bold uppercase tracking-wider">
                                            <CheckCircle2 className="w-3 h-3" />
                                            OK
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div
                                    className={cn(
                                        "h-full transition-all duration-500",
                                        staff.isBooked ? "bg-destructive" : "bg-primary"
                                    )}
                                    style={{ width: `${Math.min((staff.currentCount / staff.dailyCapacity) * 100, 100)}%` }}
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
