"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, AlertTriangle } from "lucide-react";
import { Staff, Service, Appointment } from "@/types";
import { createAppointment, updateAppointment } from "@/app/actions/appointments";
import { appointmentSchema, AppointmentFormValues } from "@/lib/validations";
import { useAppointmentConflict } from "@/hooks/use-appointment-conflict";
import { FormWrapper } from "./FormWrapper";
import { FormField } from "./FormField";

interface AppointmentFormProps {
    initialData?: Appointment | null;
    staffs: Staff[];
    services: Service[];
    appointments: Appointment[];
    onSuccess: () => void;
    onCancel: () => void;
}

export function AppointmentForm({
    initialData,
    staffs,
    services,
    appointments,
    onSuccess,
    onCancel,
}: AppointmentFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const { conflictError, capacityWarning } = useAppointmentConflict({
        watchedServiceId,
        watchedStaffId,
        watchedDate,
        services,
        staffs,
        appointments,
        initialDataId: initialData?.id,
    });

    const onSubmit = async (data: AppointmentFormValues) => {
        setIsSubmitting(true);
        try {
            const submissionData = {
                ...data,
                staffId: data.staffId || null
            } as any;

            if (initialData) {
                await updateAppointment(initialData.id, submissionData);
            } else {
                await createAppointment(submissionData);
            }
            router.refresh();
            onSuccess();
        } catch (error) {
            console.error("Error saving appointment:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <FormWrapper
            title={initialData ? "Modify Appointment" : "New Appointment"}
            onCancel={onCancel}
            maxWidth="max-w-xl"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <FormField label="Customer Name" error={errors.customerName}>
                    <Input
                        {...register("customerName")}
                        placeholder="e.g. Alice Smith"
                        className={errors.customerName ? "border-destructive" : ""}
                    />
                </FormField>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Service" error={errors.serviceId}>
                        <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            {...register("serviceId")}
                        >
                            <option value="">Select Service</option>
                            {services.map(s => (
                                <option key={s.id} value={s.id}>{s.name} ({s.durationMinutes}m)</option>
                            ))}
                        </select>
                    </FormField>
                    <FormField label="Date & Time" error={errors.appointmentDate}>
                        <Input
                            type="datetime-local"
                            {...register("appointmentDate")}
                        />
                    </FormField>
                </div>

                <FormField label="Assign Staff (Optional)" error={errors.staffId}>
                    <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        {...register("staffId")}
                    >
                        <option value="">Unassigned (Send to Queue)</option>
                        {staffs.map(s => (
                            <option key={s.id} value={s.id}>{s.name} - {s.staffType}</option>
                        ))}
                    </select>
                </FormField>

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
                    <Button type="button" variant="outline" className="flex-1 rounded-full" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit" className="flex-1 rounded-full" disabled={isSubmitting || !!conflictError}>
                        {isSubmitting ? "Processing..." : "Confirm Appointment"}
                    </Button>
                </div>
            </form>
        </FormWrapper>
    );
}
