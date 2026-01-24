"use server";

import { revalidatePath } from "next/cache";
import { Queue } from "@/types";

const API_URL = process.env.API_URL;

export async function getQueue(): Promise<Queue[]> {
    const res = await fetch(`${API_URL}/queue`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch queue");
    return res.json();
}

export async function addToQueue(appointmentId: string): Promise<Queue> {
    const res = await fetch(`${API_URL}/queue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId }),
    });
    if (!res.ok) throw new Error("Failed to add to queue");
    revalidatePath("/");
    return res.json();
}

export async function removeFromQueue(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/queue/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to remove from queue");
    revalidatePath("/");
}
