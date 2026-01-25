"use client";

import React, { useState } from "react";
import { ListOrdered, UserCheck, Trash2, Clock, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Queue, Staff, Appointment, AppointmentStatus } from "@/types";
import { removeFromQueue } from "@/app/actions/queue";
import { updateAppointment } from "@/app/actions/appointments";
import { format, parseISO, isSameDay, addMinutes, isWithinInterval } from "date-fns";
import { cn } from "@/lib/utils";

interface WaitingQueueProps {
    queue: Queue[];
    staffs: Staff[];
    appointments: Appointment[];
    onRefresh: () => void;
}

export function WaitingQueue({ queue, staffs, appointments, onRefresh }: WaitingQueueProps) {
    const [isAssigning, setIsAssigning] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const getOrdinal = (n: number) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    const handleAssignFromQueue = async () => {
        setErrorMessage(null);
        if (queue.length === 0) return;

        setIsAssigning(true);
        try {
            // Logic for automatic assignment:
            // 1. Get the first item in queue
            const nextInQueue = queue.sort((a, b) => a.position - b.position)[0];
            const appointment = nextInQueue.appointment;

            if (!appointment || !appointment.service) {
                throw new Error("Invalid appointment data in queue");
            }

            // 2. Find eligible staff
            const eligibleStaffs = staffs.filter(s =>
                s.status === "AVAILABLE" &&
                s.staffType === appointment.service?.requiredStaffType
            );

            if (eligibleStaffs.length === 0) {
                setErrorMessage(`No ${appointment.service.requiredStaffType} is currently available.`);
                setIsAssigning(false);
                return;
            }

            // 3. Find staff with capacity and no conflicts
            const appStart = parseISO(appointment.appointmentDate);
            const appEnd = addMinutes(appStart, appointment.service.durationMinutes);

            const availableStaff = eligibleStaffs.find(staff => {
                // Daily capacity check
                const todayCount = appointments.filter(a =>
                    a.staffId === staff.id &&
                    isSameDay(parseISO(a.appointmentDate), appStart) &&
                    a.status !== AppointmentStatus.CANCELLED
                ).length;

                if (todayCount >= staff.dailyCapacity) return false;

                // Conflict check
                const hasConflict = appointments.some(a => {
                    if (a.staffId !== staff.id || a.status === AppointmentStatus.CANCELLED) return false;
                    const aStart = parseISO(a.appointmentDate);
                    const aEnd = addMinutes(aStart, a.service?.durationMinutes || 30);
                    return (
                        isWithinInterval(appStart, { start: aStart, end: aEnd }) ||
                        isWithinInterval(appEnd, { start: aStart, end: aEnd }) ||
                        (appStart <= aStart && appEnd >= aEnd)
                    );
                });

                return !hasConflict;
            });

            if (!availableStaff) {
                setErrorMessage("All eligible staff are fully booked or have conflicts at this time.");
                setIsAssigning(false);
                return;
            }

            // 4. Assign and remove from queue
            await updateAppointment(appointment.id, {
                staffId: availableStaff.id,
                status: AppointmentStatus.SCHEDULED
            } as any);

            await removeFromQueue(nextInQueue.id);

            onRefresh();
        } catch (error: any) {
            console.error("Assignment error:", error);
            setErrorMessage(error.message || "Failed to assign appointment");
        } finally {
            setIsAssigning(false);
        }
    };

    const sortedQueue = [...queue].sort((a, b) => a.position - b.position);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Waiting Queue</h2>
                    <p className="text-sm text-muted-foreground">{queue.length} customers waiting for assignment</p>
                </div>
                <Button
                    onClick={handleAssignFromQueue}
                    disabled={queue.length === 0 || isAssigning}
                    className="rounded-full gap-2 shadow-lg shadow-primary/20"
                    size="lg"
                >
                    <UserCheck className="w-4 h-4" />
                    {isAssigning ? "Assigning..." : "Assign From Queue"}
                </Button>
            </div>

            {errorMessage && (
                <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-xl flex items-center gap-3 text-destructive animate-in slide-in-from-top-2">
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-sm font-medium">{errorMessage}</p>
                </div>
            )}

            {sortedQueue.length === 0 ? (
                <div className="bg-muted/20 border-2 border-dashed border-border rounded-3xl py-20 flex flex-col items-center justify-center gap-4 text-muted-foreground">
                    <ListOrdered className="w-12 h-12 opacity-20" />
                    <p className="text-lg font-medium">The queue is empty</p>
                    <p className="text-sm">New appointments without assigned staff will appear here.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {sortedQueue.map((item, index) => (
                        <div key={item.id} className="bg-card border border-border p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-md transition-all">
                            <div className="flex items-center gap-6 w-full sm:w-auto">
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex flex-col items-center justify-center text-primary shrink-0">
                                    <span className="text-xs font-bold uppercase">Pos</span>
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
                                    onClick={() => handleAssignFromQueue()}
                                    disabled={index !== 0 || isAssigning}
                                >
                                    <UserCheck className="w-4 h-4 mr-2" />
                                    Assign
                                </Button>
                                <button
                                    onClick={async () => {
                                        if (confirm("Remove this customer from the queue?")) {
                                            await removeFromQueue(item.id);
                                            onRefresh();
                                        }
                                    }}
                                    className="p-2 hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded-full transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
