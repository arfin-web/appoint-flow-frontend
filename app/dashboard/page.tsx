import { OverviewSection } from "@/components/dashboard/OverviewSection";
import { getStaffs } from "@/app/actions/staff";
import { getAppointments } from "@/app/actions/appointments";
import { getQueue } from "@/app/actions/queue";
import { getActivityLogs } from "@/app/actions/activity";

export default async function OverviewPage() {
    const [staffs, appointments, queue, logs] = await Promise.all([
        getStaffs(),
        getAppointments(),
        getQueue(),
        getActivityLogs(),
    ]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
                <p className="text-muted-foreground">View your business performance at a glance.</p>
            </div>

            <OverviewSection
                staffs={staffs}
                appointments={appointments}
                queue={queue}
                logs={logs}
            />
        </div>
    );
}
