import { WaitingQueue } from "@/components/dashboard/WaitingQueue";
import { getQueue } from "@/app/actions/queue";
import { getStaffs } from "@/app/actions/staff";
import { getAppointments } from "@/app/actions/appointments";

export default async function QueuePage() {
    const [queue, staffs, appointments] = await Promise.all([
        getQueue(),
        getStaffs(),
        getAppointments(),
    ]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Waiting Queue</h1>
                <p className="text-muted-foreground">Monitor and assign customers from the waiting queue.</p>
            </div>

            <WaitingQueue queue={queue} staffs={staffs} appointments={appointments} />
        </div>
    );
}
