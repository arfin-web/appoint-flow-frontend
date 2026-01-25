import * as z from "zod";
import { StaffStatus } from "@/types";

export const staffSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    staffType: z.string().min(2, "Staff type must be at least 2 characters"),
    dailyCapacity: z.number().min(1, "Capacity must be at least 1"),
    status: z.nativeEnum(StaffStatus),
});

export const serviceSchema = z.object({
    name: z.string().min(2, "Service name must be at least 2 characters"),
    durationMinutes: z.number().min(5, "Minimum duration is 5 minutes"),
    requiredStaffType: z.string().min(2, "Staff type must be at least 2 characters"),
});

export const appointmentSchema = z.object({
    customerName: z.string().min(2, "Customer name must be at least 2 characters"),
    serviceId: z.string().min(1, "Please select a service"),
    staffId: z.string().nullable().optional(),
    appointmentDate: z.string().min(1, "Please select a date and time"),
});

export type StaffFormValues = z.infer<typeof staffSchema>;
export type ServiceFormValues = z.infer<typeof serviceSchema>;
export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
