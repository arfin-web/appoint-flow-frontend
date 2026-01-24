"use server";

import { revalidatePath } from "next/cache";
import { Appointment, CreateAppointmentInput } from "@/types";

const API_URL = process.env.API_URL;

export async function getAppointments(): Promise<Appointment[]> {
    const res = await fetch(`${API_URL}/appointments`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch appointments");
    return res.json();
}

export async function getAppointment(id: string): Promise<Appointment> {
    const res = await fetch(`${API_URL}/appointments/${id}`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch appointment");
    return res.json();
}

export async function createAppointment(data: CreateAppointmentInput): Promise<Appointment> {
    const res = await fetch(`${API_URL}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create appointment");
    revalidatePath("/");
    return res.json();
}

export async function updateAppointment(id: string, data: Partial<CreateAppointmentInput>): Promise<Appointment> {
    const res = await fetch(`${API_URL}/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update appointment");
    revalidatePath("/");
    return res.json();
}

export async function deleteAppointment(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/appointments/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete appointment");
    revalidatePath("/");
}
