"use client";

import { useState, useEffect } from "react";
import { isSameDay, addMinutes, parseISO, isWithinInterval } from "date-fns";
import { Staff, Service, Appointment, AppointmentStatus } from "@/types";

interface UseAppointmentConflictProps {
    watchedServiceId: string;
    watchedStaffId: string | null | undefined;
    watchedDate: string;
    services: Service[];
    staffs: Staff[];
    appointments: Appointment[];
    initialDataId?: string;
}

export function useAppointmentConflict({
    watchedServiceId,
    watchedStaffId,
    watchedDate,
    services,
    staffs,
    appointments,
    initialDataId,
}: UseAppointmentConflictProps) {
    const [conflictError, setConflictError] = useState<string | null>(null);
    const [capacityWarning, setCapacityWarning] = useState<string | null>(null);

    useEffect(() => {
        setConflictError(null);
        setCapacityWarning(null);

        if (!watchedServiceId || !watchedDate) return;

        const selectedService = services.find((s) => s.id === watchedServiceId);
        if (!selectedService) return;

        const startTime = parseISO(watchedDate);
        const endTime = addMinutes(startTime, selectedService.durationMinutes);

        if (watchedStaffId) {
            const staff = staffs.find((s) => s.id === watchedStaffId);
            if (staff) {
                const todayCount = appointments.filter(
                    (a) =>
                        a.staffId === staff.id &&
                        isSameDay(parseISO(a.appointmentDate), startTime) &&
                        a.status !== AppointmentStatus.CANCELLED &&
                        a.id !== initialDataId
                ).length;

                if (todayCount >= staff.dailyCapacity) {
                    setCapacityWarning(
                        `${staff.name} already has ${todayCount} appointments today (Max: ${staff.dailyCapacity})`
                    );
                }
            }

            const hasOverlap = appointments.some((a) => {
                if (
                    a.staffId !== watchedStaffId ||
                    a.status === AppointmentStatus.CANCELLED ||
                    a.id === initialDataId
                )
                    return false;

                const aStart = parseISO(a.appointmentDate);
                const aService = services.find((s) => s.id === a.serviceId);
                const aEnd = addMinutes(aStart, aService?.durationMinutes || 30);

                return (
                    isWithinInterval(startTime, { start: aStart, end: aEnd }) ||
                    isWithinInterval(endTime, { start: aStart, end: aEnd }) ||
                    (startTime <= aStart && endTime >= aEnd)
                );
            });

            if (hasOverlap) {
                setConflictError("This staff member already has an appointment at this time");
            }
        }
    }, [
        watchedStaffId,
        watchedServiceId,
        watchedDate,
        services,
        appointments,
        initialDataId,
        staffs,
    ]);

    return { conflictError, capacityWarning };
}
