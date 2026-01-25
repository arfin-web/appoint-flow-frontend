import { AppointmentManagement } from "@/components/dashboard/AppointmentManagement";
import { getAppointments } from "@/app/actions/appointments";
import { getStaffs } from "@/app/actions/staff";

export default async function AppointmentsPage() {
    const [appointments, staffs] = await Promise.all([
        getAppointments(),
        getStaffs(),
    ]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
                <p className="text-muted-foreground">Manage and schedule your customer appointments.</p>
            </div>

            <AppointmentManagement appointments={appointments} staffs={staffs} />
        </div>
    );
}
