"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Service } from "@/types";

const serviceSchema = z.object({
    name: z.string().min(2, "Service name must be at least 2 characters"),
    durationMinutes: z.number().min(5, "Minimum duration is 5 minutes"),
    requiredStaffType: z.string().min(2, "Staff type must be at least 2 characters"),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
    initialData?: Service | null;
    onSubmit: (data: ServiceFormValues) => Promise<void>;
    onCancel: () => void;
    isSubmitting: boolean;
}

export function ServiceForm({ initialData, onSubmit, onCancel, isSubmitting }: ServiceFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ServiceFormValues>({
        resolver: zodResolver(serviceSchema),
        defaultValues: initialData ? {
            name: initialData.name,
            durationMinutes: initialData.durationMinutes,
            requiredStaffType: initialData.requiredStaffType,
        } : {
            name: "",
            durationMinutes: 30,
            requiredStaffType: "Consultant",
        },
    });

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-200">
                <h3 className="text-xl font-bold mb-6">{initialData ? "Edit Service" : "Add New Service"}</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="s-name">Service Name</Label>
                        <Input
                            id="s-name"
                            {...register("name")}
                            placeholder="e.g. General Consultation"
                        />
                        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="s-duration">Duration (mins)</Label>
                            <select
                                id="s-duration"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                {...register("durationMinutes", { valueAsNumber: true })}
                            >
                                <option value={15}>15 Minutes</option>
                                <option value={30}>30 Minutes</option>
                                <option value={60}>60 Minutes</option>
                                <option value={120}>120 Minutes</option>
                            </select>
                            {errors.durationMinutes && <p className="text-xs text-destructive">{errors.durationMinutes.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="s-staff-type">Required Staff Type</Label>
                            <Input
                                id="s-staff-type"
                                {...register("requiredStaffType")}
                                placeholder="e.g. Doctor"
                            />
                            {errors.requiredStaffType && <p className="text-xs text-destructive">{errors.requiredStaffType.message}</p>}
                        </div>
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
                            {isSubmitting ? "Saving..." : "Save Service"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
