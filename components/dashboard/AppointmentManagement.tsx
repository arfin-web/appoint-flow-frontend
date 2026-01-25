"use client";

import { useState, useEffect } from "react";
import { Staff, Service, Appointment, AppointmentStatus } from "@/types";
import { updateAppointment } from "@/app/actions/appointments";
import { getServices } from "@/app/actions/services";
import { isSameDay, parseISO } from "date-fns";
import { useRouter } from "next/navigation";
import { AppointmentForm } from "./forms/AppointmentForm";
import { AppointmentHeader } from "./AppointmentHeader";
import { AppointmentTable } from "./AppointmentTable";

interface AppointmentManagementProps {
    appointments: Appointment[];
    staffs: Staff[];
}

export function AppointmentManagement({ appointments, staffs }: AppointmentManagementProps) {
    const router = useRouter();
    const [services, setServices] = useState<Service[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState<Appointment | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [filterDate, setFilterDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [filterStaff, setFilterStaff] = useState<string>("all");

    useEffect(() => {
        getServices().then(setServices);
    }, []);

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        try {
            if (isEditing) {
                await updateAppointment(isEditing.id, data);
            } else {
                const { createAppointment } = await import("@/app/actions/appointments");
                await createAppointment(data);
            }
            router.refresh();
            handleClose();
        } catch (error) {
            console.error("Error saving appointment:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (appointment: Appointment) => {
        setIsEditing(appointment);
        setIsAdding(true);
    };

    const handleStatusUpdate = async (id: string, status: AppointmentStatus) => {
        try {
            await updateAppointment(id, { status } as any);
            router.refresh();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleClose = () => {
        setIsAdding(false);
        setIsEditing(null);
    };

    const filteredAppointments = appointments.filter(a => {
        const dateMatch = isSameDay(parseISO(a.appointmentDate), parseISO(filterDate));
        const staffMatch = filterStaff === "all" || a.staffId === filterStaff;
        return dateMatch && staffMatch;
    }).sort((a, b) => parseISO(a.appointmentDate).getTime() - parseISO(b.appointmentDate).getTime());

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <AppointmentHeader
                filterDate={filterDate}
                setFilterDate={setFilterDate}
                filterStaff={filterStaff}
                setFilterStaff={setFilterStaff}
                staffs={staffs}
                onAdd={() => setIsAdding(true)}
            />

            {isAdding && (
                <AppointmentForm
                    initialData={isEditing}
                    staffs={staffs}
                    services={services}
                    appointments={appointments}
                    onSubmit={onSubmit}
                    onCancel={handleClose}
                    isSubmitting={isSubmitting}
                />
            )}

            <AppointmentTable
                appointments={filteredAppointments}
                onStatusUpdate={handleStatusUpdate}
                onEdit={handleEdit}
            />
        </div>
    );
}
