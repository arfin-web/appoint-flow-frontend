"use server";

import { revalidatePath } from "next/cache";
import { CreateStaffInput, Staff } from "@/types";

const API_URL = process.env.API_URL;

export async function getStaffs(): Promise<Staff[]> {
    const res = await fetch(`${API_URL}/staff`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch staff");
    return res.json();
}

export async function getStaff(id: string): Promise<Staff> {
    const res = await fetch(`${API_URL}/staff/${id}`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch staff member");
    return res.json();
}

export async function createStaff(data: CreateStaffInput): Promise<Staff> {
    const res = await fetch(`${API_URL}/staff`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create staff member");
    revalidatePath("/");
    return res.json();
}

export async function updateStaff(id: string, data: Partial<CreateStaffInput>): Promise<Staff> {
    const res = await fetch(`${API_URL}/staff/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update staff member");
    revalidatePath("/");
    return res.json();
}

export async function deleteStaff(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/staff/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete staff member");
    revalidatePath("/");
}
