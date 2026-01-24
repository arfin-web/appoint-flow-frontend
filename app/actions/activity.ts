"use server";

import { ActivityLog } from "@/types";

const API_URL = process.env.API_URL;

export async function getActivityLogs(): Promise<ActivityLog[]> {
    const res = await fetch(`${API_URL}/activity`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch activity logs");
    return res.json();
}
