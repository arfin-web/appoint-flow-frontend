"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, AlertTriangle } from "lucide-react";
import { Staff, Service, Appointment, AppointmentStatus } from "@/types";
import { isSameDay, addMinutes, parseISO, isWithinInterval } from "date-fns";

const appointmentSchema = z.object({
    customerName: z.string().min(2, "Customer name must be at least 2 characters"),
    serviceId: z.string().min(1, "Please select a service"),
    staffId: z.string().nullable().optional(),
    appointmentDate: z.string().min(1, "Please select a date and time"),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

interface AppointmentFormProps {
    initialData?: Appointment | null;
    staffs: Staff[];
    services: Service[];
    appointments: Appointment[];
    onSubmit: (data: AppointmentFormValues) => Promise<void>;
    onCancel: () => void;
    isSubmitting: boolean;
}

export function AppointmentForm({
    initialData,
    staffs,
    services,
    appointments,
    onSubmit,
    onCancel,
    isSubmitting
}: AppointmentFormProps) {
    const [conflictError, setConflictError] = useState<string | null>(null);
    const [capacityWarning, setCapacityWarning] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<AppointmentFormValues>({
        resolver: zodResolver(appointmentSchema),
        defaultValues: initialData ? {
            customerName: initialData.customerName,
            serviceId: initialData.serviceId,
            staffId: initialData.staffId || "",
            appointmentDate: new Date(initialData.appointmentDate).toISOString().slice(0, 16),
        } : {
            customerName: "",
            serviceId: "",
            staffId: "",
            appointmentDate: new Date().toISOString().slice(0, 16),
        },
    });

    const watchedServiceId = watch("serviceId");
    const watchedStaffId = watch("staffId");
    const watchedDate = watch("appointmentDate");

    useEffect(() => {
        setConflictError(null);
        setCapacityWarning(null);

        if (!watchedServiceId || !watchedDate) return;

        const selectedService = services.find(s => s.id === watchedServiceId);
        if (!selectedService) return;

        const startTime = parseISO(watchedDate);
        const endTime = addMinutes(startTime, selectedService.durationMinutes);

        if (watchedStaffId) {
            const staff = staffs.find(s => s.id === watchedStaffId);
            if (staff) {
                const todayCount = appointments.filter(a =>
                    a.staffId === staff.id &&
                    isSameDay(parseISO(a.appointmentDate), startTime) &&
                    a.status !== AppointmentStatus.CANCELLED &&
                    a.id !== initialData?.id
                ).length;

                if (todayCount >= staff.dailyCapacity) {
                    setCapacityWarning(`${staff.name} already has ${todayCount} appointments today (Max: ${staff.dailyCapacity})`);
                }
            }

            const hasOverlap = appointments.some(a => {
                if (a.staffId !== watchedStaffId || a.status === AppointmentStatus.CANCELLED || a.id === initialData?.id) return false;

                const aStart = parseISO(a.appointmentDate);
                const aService = services.find(s => s.id === a.serviceId);
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
    }, [watchedStaffId, watchedServiceId, watchedDate, services, appointments, initialData]);

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-xl p-8 animate-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh]">
                <h3 className="text-xl font-bold mb-6">{initialData ? "Modify Appointment" : "New Appointment"}</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-2">
                        <Label>Customer Name</Label>
                        <Input
                            {...register("customerName")}
                            placeholder="e.g. Alice Smith"
                            className={errors.customerName ? "border-destructive" : ""}
                        />
                        {errors.customerName && <p className="text-xs text-destructive">{errors.customerName.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Service</Label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                {...register("serviceId")}
                            >
                                <option value="">Select Service</option>
                                {services.map(s => (
                                    <option key={s.id} value={s.id}>{s.name} ({s.durationMinutes}m)</option>
                                ))}
                            </select>
                            {errors.serviceId && <p className="text-xs text-destructive">{errors.serviceId.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Date & Time</Label>
                            <Input
                                type="datetime-local"
                                {...register("appointmentDate")}
                            />
                            {errors.appointmentDate && <p className="text-xs text-destructive">{errors.appointmentDate.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Assign Staff (Optional)</Label>
                        <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            {...register("staffId")}
                        >
                            <option value="">Unassigned (Send to Queue)</option>
                            {staffs.map(s => (
                                <option key={s.id} value={s.id}>{s.name} - {s.staffType}</option>
                            ))}
                        </select>
                    </div>

                    {conflictError && (
                        <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-lg flex items-center gap-2 text-destructive text-sm font-medium">
                            <AlertCircle className="w-4 h-4" />
                            {conflictError}
                        </div>
                    )}

                    {capacityWarning && !conflictError && (
                        <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg flex items-center gap-2 text-yellow-600 text-sm font-medium">
                            <AlertTriangle className="w-4 h-4" />
                            {capacityWarning}
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <Button type="button" variant="outline" className="flex-1 rounded-full" onClick={onCancel}>Cancel</Button>
                        <Button type="submit" className="flex-1 rounded-full" disabled={isSubmitting || !!conflictError}>
                            {isSubmitting ? "Processing..." : "Confirm Appointment"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
