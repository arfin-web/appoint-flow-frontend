"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Staff, StaffStatus } from "@/types";
import { createStaff, updateStaff } from "@/app/actions/staff";
import { staffSchema, StaffFormValues } from "@/lib/validations";
import { FormWrapper } from "./FormWrapper";
import { FormField } from "./FormField";

interface StaffFormProps {
    initialData?: Staff | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export function StaffForm({ initialData, onSuccess, onCancel }: StaffFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const onSubmit = async (data: StaffFormValues) => {
        setIsSubmitting(true);
        try {
            if (initialData) {
                await updateStaff(initialData.id, data);
            } else {
                await createStaff(data);
            }
            router.refresh();
            onSuccess();
        } catch (error) {
            console.error("Error saving staff:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <FormWrapper
            title={initialData ? "Edit Staff Member" : "Add New Staff Member"}
            onCancel={onCancel}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormField label="Full Name" error={errors.name}>
                    <Input
                        {...register("name")}
                        placeholder="e.g. John Doe"
                        className={errors.name ? "border-destructive" : ""}
                    />
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                    <FormField label="Staff Type" error={errors.staffType}>
                        <Input
                            {...register("staffType")}
                            placeholder="e.g. Doctor"
                            className={errors.staffType ? "border-destructive" : ""}
                        />
                    </FormField>
                    <FormField label="Daily Capacity" error={errors.dailyCapacity}>
                        <Input
                            type="number"
                            {...register("dailyCapacity", { valueAsNumber: true })}
                            className={errors.dailyCapacity ? "border-destructive" : ""}
                        />
                    </FormField>
                </div>

                <FormField label="Status" error={errors.status}>
                    <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...register("status")}
                    >
                        <option value={StaffStatus.AVAILABLE}>Available</option>
                        <option value={StaffStatus.ON_LEAVE}>On Leave</option>
                    </select>
                </FormField>

                <div className="flex gap-3 pt-4">
                    <Button type="button" variant="outline" className="flex-1 rounded-full" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit" className="flex-1 rounded-full" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save Staff"}
                    </Button>
                </div>
            </form>
        </FormWrapper>
    );
}
