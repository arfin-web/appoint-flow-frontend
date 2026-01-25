"use client";

import { useState } from "react";
import { ListOrdered, AlertCircle } from "lucide-react";
import { Queue, Staff, Appointment, AppointmentStatus } from "@/types";
import { removeFromQueue } from "@/app/actions/queue";
import { updateAppointment } from "@/app/actions/appointments";
import { isSameDay, addMinutes, parseISO, isWithinInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { QueueHeader } from "./QueueHeader";
import { QueueItem } from "./QueueItem";

interface WaitingQueueProps {
    queue: Queue[];
    staffs: Staff[];
    appointments: Appointment[];
}

export function WaitingQueue({ queue, staffs, appointments }: WaitingQueueProps) {
    const router = useRouter();
    const [isAssigning, setIsAssigning] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleAssignFromQueue = async () => {
        setErrorMessage(null);
        if (queue.length === 0) return;

        setIsAssigning(true);
        try {
            const nextInQueue = [...queue].sort((a, b) => a.position - b.position)[0];
            const appointment = nextInQueue.appointment;

            if (!appointment || !appointment.service) throw new Error("Invalid appointment data in queue");

            const eligibleStaffs = staffs.filter(s =>
                s.status === "AVAILABLE" && s.staffType === appointment.service?.requiredStaffType
            );

            if (eligibleStaffs.length === 0) {
                setErrorMessage(`No ${appointment.service.requiredStaffType} is currently available.`);
                return;
            }

            const appStart = parseISO(appointment.appointmentDate);
            const appEnd = addMinutes(appStart, appointment.service.durationMinutes);

            const availableStaff = eligibleStaffs.find(staff => {
                const todayCount = appointments.filter(a =>
                    a.staffId === staff.id && isSameDay(parseISO(a.appointmentDate), appStart) && a.status !== AppointmentStatus.CANCELLED
                ).length;

                if (todayCount >= staff.dailyCapacity) return false;

                return !appointments.some(a => {
                    if (a.staffId !== staff.id || a.status === AppointmentStatus.CANCELLED) return false;
                    const aStart = parseISO(a.appointmentDate);
                    const aEnd = addMinutes(aStart, a.service?.durationMinutes || 30);
                    return isWithinInterval(appStart, { start: aStart, end: aEnd }) ||
                        isWithinInterval(appEnd, { start: aStart, end: aEnd }) ||
                        (appStart <= aStart && appEnd >= aEnd);
                });
            });

            if (!availableStaff) {
                setErrorMessage("All eligible staff are fully booked or have conflicts at this time.");
                return;
            }

            await updateAppointment(appointment.id, { staffId: availableStaff.id, status: AppointmentStatus.SCHEDULED } as any);
            await removeFromQueue(nextInQueue.id);
            router.refresh();
        } catch (error: any) {
            setErrorMessage(error.message || "Failed to assign appointment");
        } finally {
            setIsAssigning(false);
        }
    };

    const handleRemove = async (id: string) => {
        if (confirm("Remove this customer from the queue?")) {
            await removeFromQueue(id);
            router.refresh();
        }
    };

    const sortedQueue = [...queue].sort((a, b) => a.position - b.position);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <QueueHeader
                queueLength={queue.length}
                onAssign={handleAssignFromQueue}
                isAssigning={isAssigning}
            />

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
                        <QueueItem
                            key={item.id}
                            item={item}
                            index={index}
                            onAssign={handleAssignFromQueue}
                            onRemove={handleRemove}
                            isAssigning={isAssigning}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
