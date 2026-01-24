export enum StaffStatus {
    AVAILABLE = "AVAILABLE",
    ON_LEAVE = "ON_LEAVE",
}

export enum AppointmentStatus {
    SCHEDULED = "SCHEDULED",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
    NO_SHOW = "NO_SHOW",
    WAITING = "WAITING",
}

export interface Staff {
    id: string;
    name: string;
    staffType: string;
    dailyCapacity: number;
    status: StaffStatus;
    createdAt: string;
    updatedAt: string;
}

export interface Service {
    id: string;
    name: string;
    durationMinutes: number;
    requiredStaffType: string;
    createdAt: string;
    updatedAt: string;
}

export interface Appointment {
    id: string;
    customerName: string;
    serviceId: string;
    staffId: string | null;
    appointmentDate: string;
    status: AppointmentStatus;
    service?: Service;
    staff?: Staff;
    createdAt: string;
    updatedAt: string;
}

export interface Queue {
    id: string;
    appointmentId: string;
    position: number;
    appointment?: Appointment;
    createdAt: string;
}

export interface ActivityLog {
    id: string;
    message: string;
    createdAt: string;
}

export type CreateStaffInput = Omit<Staff, "id" | "createdAt" | "updatedAt">;
export type CreateServiceInput = Omit<Service, "id" | "createdAt" | "updatedAt">;
export type CreateAppointmentInput = Omit<Appointment, "id" | "createdAt" | "updatedAt" | "status" | "service" | "staff" | "queueItem">;
