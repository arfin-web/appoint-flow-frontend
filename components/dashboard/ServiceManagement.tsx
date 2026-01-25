"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Pencil, Trash2, Settings, Clock, Briefcase, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Service } from "@/types";
import { createService, updateService, deleteService } from "@/app/actions/services";
import { useRouter } from "next/navigation";

const serviceSchema = z.object({
    name: z.string().min(2, "Service name must be at least 2 characters"),
    durationMinutes: z.number().min(5, "Minimum duration is 5 minutes"),
    requiredStaffType: z.string().min(2, "Staff type must be at least 2 characters"),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

interface ServiceManagementProps {
    services: Service[]; // Now passed from server component
}

export function ServiceManagement({ services }: ServiceManagementProps) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState<Service | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ServiceFormValues>({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            name: "",
            durationMinutes: 30,
            requiredStaffType: "Consultant",
        },
    });

    const onSubmit = async (data: ServiceFormValues) => {
        setIsSubmitting(true);
        try {
            if (isEditing) {
                await updateService(isEditing.id, data);
            } else {
                await createService(data);
            }
            router.refresh();
            handleClose();
        } catch (error) {
            console.error("Error saving service:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (service: Service) => {
        setIsEditing(service);
        reset({
            name: service.name,
            durationMinutes: service.durationMinutes,
            requiredStaffType: service.requiredStaffType,
        });
        setIsAdding(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this service?")) {
            try {
                await deleteService(id);
                router.refresh();
            } catch (error) {
                console.error("Error deleting service:", error);
            }
        }
    };

    const handleClose = () => {
        setIsAdding(false);
        setIsEditing(null);
        reset({
            name: "",
            durationMinutes: 30,
            requiredStaffType: "Consultant",
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Services Catalog</h2>
                <Button onClick={() => setIsAdding(true)} className="rounded-full gap-2">
                    <Plus className="w-4 h-4" />
                    Add Service
                </Button>
            </div>

            {isAdding && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-200">
                        <h3 className="text-xl font-bold mb-6">{isEditing ? "Edit Service" : "Add New Service"}</h3>
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
                                    onClick={handleClose}
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
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => (
                    <div key={service.id} className="bg-card border border-border p-6 rounded-2xl relative group hover:shadow-lg transition-all flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
                                    <Settings className="w-5 h-5" />
                                </div>
                                <h4 className="font-bold text-lg">{service.name}</h4>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(service)} className="p-1.5 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground">
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(service.id)} className="p-1.5 hover:bg-destructive/10 rounded-md text-muted-foreground hover:text-destructive">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-6 items-center text-sm text-muted-foreground px-1">
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                {service.durationMinutes} Minutes
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Briefcase className="w-4 h-4" />
                                {service.requiredStaffType}
                            </div>
                        </div>
                    </div>
                ))}
                {services.length === 0 && (
                    <div className="col-span-full py-12 text-center text-muted-foreground italic border-2 border-dashed border-border rounded-2xl">
                        No services found. Add your first service to get started.
                    </div>
                )}
            </div>
        </div>
    );
}
