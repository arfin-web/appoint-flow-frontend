"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Sidebar, DashboardTab } from "@/components/dashboard/Sidebar";
import { OverviewSection } from "@/components/dashboard/OverviewSection";
import { StaffManagement } from "@/components/dashboard/StaffManagement";
import { ServiceManagement } from "@/components/dashboard/ServiceManagement";
import { AppointmentManagement } from "@/components/dashboard/AppointmentManagement";
import { WaitingQueue } from "@/components/dashboard/WaitingQueue";
import { getStaffs } from "@/app/actions/staff";
import { getAppointments } from "@/app/actions/appointments";
import { getQueue } from "@/app/actions/queue";
import { getActivityLogs } from "@/app/actions/activity";
import { Staff, Appointment, Queue, ActivityLog } from "@/types";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<{
        staffs: Staff[];
        appointments: Appointment[];
        queue: Queue[];
        logs: ActivityLog[];
    }>({
        staffs: [],
        appointments: [],
        queue: [],
        logs: [],
    });

    const fetchData = useCallback(async (silent = false) => {
        if (!silent) setIsLoading(true);
        try {
            const [staffs, appointments, queue, logs] = await Promise.all([
                getStaffs(),
                getAppointments(),
                getQueue(),
                getActivityLogs(),
            ]);
            setData({ staffs, appointments, queue, logs });
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        } finally {
            if (!silent) setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
        // Poll for updates every 30 seconds for real-time feel
        const interval = setInterval(() => fetchData(true), 30000);
        return () => clearInterval(interval);
    }, [fetchData]);

    return (
        <div className="flex bg-background h-screen overflow-hidden">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="flex-1 h-full overflow-y-auto p-4 md:p-8 lg:p-12 relative">
                <div className="max-w-7xl mx-auto space-y-8 pb-12">
                    {/* Header */}
                    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold tracking-tight capitalize">{activeTab}</h1>
                            <p className="text-muted-foreground">
                                {activeTab === "overview" && "View your business performance at a glance."}
                                {activeTab === "appointments" && "Manage and schedule your customer appointments."}
                                {activeTab === "staff" && "Manage your staff members and their daily capacity."}
                                {activeTab === "services" && "Configure the services your business offers."}
                                {activeTab === "queue" && "Monitor and assign customers from the waiting queue."}
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => fetchData()}
                            disabled={isLoading}
                            className="rounded-full gap-2 border-primary/20 hover:bg-primary/5"
                        >
                            <RefreshCw className={cn("w-3.5 h-3.5", isLoading && "animate-spin")} />
                            Refresh Data
                        </Button>
                    </header>

                    {/* Main Content Area */}
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center min-h-[500px] gap-4">
                            <Loader2 className="w-10 h-10 animate-spin text-primary opacity-50" />
                            <p className="text-sm font-medium text-muted-foreground animate-pulse">Syncing your workspace...</p>
                        </div>
                    ) : (
                        <div className="min-h-[500px] animate-in slide-in-from-bottom-4 duration-500">
                            {activeTab === "overview" && (
                                <OverviewSection
                                    staffs={data.staffs}
                                    appointments={data.appointments}
                                    queue={data.queue}
                                    logs={data.logs}
                                />
                            )}
                            {activeTab === "appointments" && (
                                <AppointmentManagement
                                    appointments={data.appointments}
                                    staffs={data.staffs}
                                    onRefresh={fetchData}
                                />
                            )}
                            {activeTab === "staff" && (
                                <StaffManagement
                                    staffs={data.staffs}
                                    onRefresh={fetchData}
                                />
                            )}
                            {activeTab === "services" && (
                                <ServiceManagement
                                    onRefresh={fetchData}
                                />
                            )}
                            {activeTab === "queue" && (
                                <WaitingQueue
                                    queue={data.queue}
                                    staffs={data.staffs}
                                    appointments={data.appointments}
                                    onRefresh={fetchData}
                                />
                            )}
                        </div>
                    )}
                </div>

                {/* Footer info */}
                <div className="absolute bottom-4 right-8 text-[10px] text-muted-foreground border-t border-border pt-2 w-full max-w-7xl px-4 md:px-8 lg:px-12 flex justify-between pointer-events-none opacity-50">
                    <span>AppointFlow v1.0 Standard Dashboard</span>
                    <span>All systems operational</span>
                </div>
            </main>
        </div>
    );
}

// Helper utility for dynamic classes
function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
