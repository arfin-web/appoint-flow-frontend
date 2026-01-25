"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Staff, StaffStatus } from "@/types";

const staffSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    staffType: z.string().min(2, "Staff type must be at least 2 characters"),
    dailyCapacity: z.number().min(1, "Capacity must be at least 1"),
    status: z.nativeEnum(StaffStatus),
});

type StaffFormValues = z.infer<typeof staffSchema>;

interface StaffFormProps {
    initialData?: Staff | null;
    onSubmit: (data: StaffFormValues) => Promise<void>;
    onCancel: () => void;
    isSubmitting: boolean;
}

export function StaffForm({ initialData, onSubmit, onCancel, isSubmitting }: StaffFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<StaffFormValues>({
        resolver: zodResolver(staffSchema),
        defaultValues: initialData ? {
            name: initialData.name,
            staffType: initialData.staffType,
            dailyCapacity: initialData.dailyCapacity,
            status: initialData.status,
        } : {
            name: "",
            staffType: "Consultant",
            dailyCapacity: 5,
            status: StaffStatus.AVAILABLE,
        },
    });

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-200">
                <h3 className="text-xl font-bold mb-6">{initialData ? "Edit Staff Member" : "Add New Staff Member"}</h3>
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
                            onClick={onCancel}
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
    );
}
