"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Pencil, Trash2, UserPlus, ShieldAlert, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Staff, StaffStatus } from "@/types";
import { createStaff, updateStaff, deleteStaff } from "@/app/actions/staff";
import { useRouter } from "next/navigation";

const staffSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    staffType: z.string().min(2, "Staff type must be at least 2 characters"),
    dailyCapacity: z.number().min(1, "Capacity must be at least 1"),
    status: z.nativeEnum(StaffStatus),
});

type StaffFormValues = z.infer<typeof staffSchema>;

interface StaffManagementProps {
    staffs: Staff[];
}

export function StaffManagement({ staffs }: StaffManagementProps) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState<Staff | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue
    } = useForm<StaffFormValues>({
        resolver: zodResolver(staffSchema),
        defaultValues: {
            name: "",
            staffType: "Consultant",
            dailyCapacity: 5,
            status: StaffStatus.AVAILABLE,
        },
    });

    const onSubmit = async (data: StaffFormValues) => {
        setIsSubmitting(true);
        try {
            if (isEditing) {
                await updateStaff(isEditing.id, data);
            } else {
                await createStaff(data);
            }
            router.refresh();
            handleClose();
        } catch (error) {
            console.error("Error saving staff:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (staff: Staff) => {
        setIsEditing(staff);
        reset({
            name: staff.name,
            staffType: staff.staffType,
            dailyCapacity: staff.dailyCapacity,
            status: staff.status,
        });
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
        reset({
            name: "",
            staffType: "Consultant",
            dailyCapacity: 5,
            status: StaffStatus.AVAILABLE,
        });
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
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-200">
                        <h3 className="text-xl font-bold mb-6">{isEditing ? "Edit Staff Member" : "Add New Staff Member"}</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    {...register("name")}
                                    placeholder="e.g. John Doe"
                                    className={errors.name ? "border-destructive" : ""}
                                />
                                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="type">Staff Type</Label>
                                    <Input
                                        id="type"
                                        {...register("staffType")}
                                        placeholder="e.g. Doctor"
                                        className={errors.staffType ? "border-destructive" : ""}
                                    />
                                    {errors.staffType && <p className="text-xs text-destructive">{errors.staffType.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="capacity">Daily Capacity</Label>
                                    <Input
                                        id="capacity"
                                        type="number"
                                        {...register("dailyCapacity", { valueAsNumber: true })}
                                        className={errors.dailyCapacity ? "border-destructive" : ""}
                                    />
                                    {errors.dailyCapacity && <p className="text-xs text-destructive">{errors.dailyCapacity.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    {...register("status")}
                                >
                                    <option value={StaffStatus.AVAILABLE}>Available</option>
                                    <option value={StaffStatus.ON_LEAVE}>On Leave</option>
                                </select>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 rounded-full"
                                    onClick={handleClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 rounded-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Saving..." : "Save Staff"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staffs.map((staff) => (
                    <div key={staff.id} className="bg-card border border-border p-6 rounded-2xl relative group hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                                    {staff.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold">{staff.name}</h4>
                                    <p className="text-xs text-muted-foreground">{staff.staffType}</p>
                                </div>
                            </div>

                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEdit(staff)}
                                    className="p-1.5 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground"
                                >
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(staff.id)}
                                    className="p-1.5 hover:bg-destructive/10 rounded-md text-muted-foreground hover:text-destructive"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Daily Limit</span>
                                <span className="font-semibold">{staff.dailyCapacity} appointments</span>
                            </div>

                            <div className="flex items-center gap-2">
                                {staff.status === StaffStatus.AVAILABLE ? (
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        AVAILABLE
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-destructive bg-destructive/10 px-2 py-1 rounded-full">
                                        <ShieldAlert className="w-3.5 h-3.5" />
                                        ON LEAVE
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
