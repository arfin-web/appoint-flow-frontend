"use client";

import React from "react";
import { OverviewStats } from "./OverviewStats";
import { StaffWorkload } from "./StaffWorkload";
import { ActivityLog } from "./ActivityLog";
import { Staff, Appointment, Queue, ActivityLog as ActivityLogType, AppointmentStatus } from "@/types";

interface OverviewSectionProps {
    staffs: Staff[];
    appointments: Appointment[];
    queue: Queue[];
    logs: ActivityLogType[];
}

export function OverviewSection({ staffs, appointments, queue, logs }: OverviewSectionProps) {
    const today = new Date().toISOString().split('T')[0];
    const todaysAppointments = appointments.filter(a => a.appointmentDate.startsWith(today));

    const completed = todaysAppointments.filter(a => a.status === AppointmentStatus.COMPLETED).length;
    const pending = todaysAppointments.filter(a =>
        a.status === AppointmentStatus.SCHEDULED || a.status === AppointmentStatus.WAITING
    ).length;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <OverviewStats
                totalAppointments={todaysAppointments.length}
                completed={completed}
                pending={pending}
                queueCount={queue.length}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <StaffWorkload staffs={staffs} appointments={appointments} />
                <ActivityLog logs={logs.slice(0, 10)} />
            </div>
        </div>
    );
}
