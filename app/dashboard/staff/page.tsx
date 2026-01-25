import { StaffManagement } from "@/components/dashboard/StaffManagement";
import { getStaffs } from "@/app/actions/staff";

// Note: StaffManagement will need to be made a client component or wrapped
// I will keep it as it is for now and see if it works as a client component imported here

export default async function StaffPage() {
    const staffs = await getStaffs();

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
                <p className="text-muted-foreground">Manage your staff members and their daily capacity.</p>
            </div>

            <StaffManagement staffs={staffs} />
        </div>
    );
}
