"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Service } from "@/types";
import { createService, updateService } from "@/app/actions/services";
import { serviceSchema, ServiceFormValues } from "@/lib/validations";
import { FormWrapper } from "./FormWrapper";
import { FormField } from "./FormField";

interface ServiceFormProps {
    initialData?: Service | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export function ServiceForm({ initialData, onSuccess, onCancel }: ServiceFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const onSubmit = async (data: ServiceFormValues) => {
        setIsSubmitting(true);
        try {
            if (initialData) {
                await updateService(initialData.id, data);
            } else {
                await createService(data);
            }
            router.refresh();
            onSuccess();
        } catch (error) {
            console.error("Error saving service:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <FormWrapper
            title={initialData ? "Edit Service" : "Add New Service"}
            onCancel={onCancel}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormField label="Service Name" error={errors.name}>
                    <Input
                        {...register("name")}
                        placeholder="e.g. General Consultation"
                    />
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                    <FormField label="Duration (mins)" error={errors.durationMinutes}>
                        <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            {...register("durationMinutes", { valueAsNumber: true })}
                        >
                            <option value={15}>15 Minutes</option>
                            <option value={30}>30 Minutes</option>
                            <option value={60}>60 Minutes</option>
                            <option value={120}>120 Minutes</option>
                        </select>
                    </FormField>
                    <FormField label="Required Staff Type" error={errors.requiredStaffType}>
                        <Input
                            {...register("requiredStaffType")}
                            placeholder="e.g. Doctor"
                        />
                    </FormField>
                </div>

                <div className="flex gap-3 pt-4">
                    <Button type="button" variant="outline" className="flex-1 rounded-full" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit" className="flex-1 rounded-full" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save Service"}
                    </Button>
                </div>
            </form>
        </FormWrapper>
    );
}
