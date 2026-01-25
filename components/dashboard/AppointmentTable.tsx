"use client";

import { Pencil, XCircle, CheckCircle2 } from "lucide-react";
import { Appointment, AppointmentStatus } from "@/types";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";

interface AppointmentTableProps {
    appointments: Appointment[];
    onStatusUpdate: (id: string, status: AppointmentStatus) => void;
    onEdit: (appointment: Appointment) => void;
}

export function AppointmentTable({ appointments, onStatusUpdate, onEdit }: AppointmentTableProps) {
    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-muted/50 border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                            <th className="px-6 py-4 font-bold">Time</th>
                            <th className="px-6 py-4 font-bold">Customer</th>
                            <th className="px-6 py-4 font-bold">Service</th>
                            <th className="px-6 py-4 font-bold">Staff</th>
                            <th className="px-6 py-4 font-bold">Status</th>
                            <th className="px-6 py-4 font-bold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {appointments.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground italic">
                                    No appointments found for this day.
                                </td>
                            </tr>
                        ) : (
                            appointments.map((app) => (
                                <tr key={app.id} className="hover:bg-muted/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <span className="font-mono font-bold text-primary">
                                            {format(parseISO(app.appointmentDate), "HH:mm")}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium">{app.customerName}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="block">{app.service?.name || "Service Deleted"}</span>
                                            <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded uppercase">{app.service?.durationMinutes}m</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {app.staff ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                                                    {app.staff.name.charAt(0)}
                                                </div>
                                                <span>{app.staff.name}</span>
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground italic text-sm">Waiting for assignment</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider",
                                            app.status === AppointmentStatus.COMPLETED && "bg-green-500/10 text-green-500",
                                            app.status === AppointmentStatus.SCHEDULED && "bg-blue-500/10 text-blue-500",
                                            app.status === AppointmentStatus.CANCELLED && "bg-destructive/10 text-destructive",
                                            app.status === AppointmentStatus.WAITING && "bg-yellow-500/10 text-yellow-500",
                                        )}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            {app.status === AppointmentStatus.SCHEDULED && (
                                                <button
                                                    onClick={() => onStatusUpdate(app.id, AppointmentStatus.COMPLETED)}
                                                    className="p-1.5 hover:bg-green-500/10 text-muted-foreground hover:text-green-500 rounded-md transition-colors"
                                                    title="Mark as Completed"
                                                >
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => onEdit(app)}
                                                className="p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground rounded-md transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            {app.status !== AppointmentStatus.CANCELLED && (
                                                <button
                                                    onClick={() => onStatusUpdate(app.id, AppointmentStatus.CANCELLED)}
                                                    className="p-1.5 hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded-md transition-colors"
                                                    title="Cancel"
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
