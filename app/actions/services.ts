"use server";

import { revalidatePath } from "next/cache";
import { CreateServiceInput, Service } from "@/types";

const API_URL = process.env.API_URL;

export async function getServices(): Promise<Service[]> {
    const res = await fetch(`${API_URL}/services`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch services");
    return res.json();
}

export async function getService(id: string): Promise<Service> {
    const res = await fetch(`${API_URL}/services/${id}`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch service");
    return res.json();
}

export async function createService(data: CreateServiceInput): Promise<Service> {
    const res = await fetch(`${API_URL}/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create service");
    revalidatePath("/");
    return res.json();
}

export async function updateService(id: string, data: Partial<CreateServiceInput>): Promise<Service> {
    const res = await fetch(`${API_URL}/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update service");
    revalidatePath("/");
    return res.json();
}

export async function deleteService(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/services/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete service");
    revalidatePath("/");
}
