"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Staff } from "@/types";
import { deleteStaff } from "@/app/actions/staff";
import { useRouter } from "next/navigation";
import { StaffForm } from "./forms/StaffForm";
import { StaffCard } from "./StaffCard";

interface StaffManagementProps {
    staffs: Staff[];
}

export function StaffManagement({ staffs }: StaffManagementProps) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState<Staff | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const handleEdit = (staff: Staff) => {
        setIsEditing(staff);
        setIsAdding(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this staff member?")) {
            try {
                await deleteStaff(id);
                router.refresh();
            } catch (error) {
                console.error("Error deleting staff:", error);
            }
        }
    };

    const handleClose = () => {
        setIsAdding(false);
        setIsEditing(null);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Staff Directory</h2>
                <Button onClick={() => setIsAdding(true)} className="rounded-full gap-2">
                    <UserPlus className="w-4 h-4" />
                    Add Staff
                </Button>
            </div>

            {isAdding && (
                <StaffForm
                    initialData={isEditing}
                    onSuccess={handleClose}
                    onCancel={handleClose}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staffs.map((staff) => (
                    <StaffCard
                        key={staff.id}
                        staff={staff}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}
