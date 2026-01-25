"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Service } from "@/types";
import { deleteService } from "@/app/actions/services";
import { useRouter } from "next/navigation";
import { ServiceForm } from "./forms/ServiceForm";
import { ServiceCard } from "./ServiceCard";

interface ServiceManagementProps {
    services: Service[];
}

export function ServiceManagement({ services }: ServiceManagementProps) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState<Service | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const handleEdit = (service: Service) => {
        setIsEditing(service);
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
                <ServiceForm
                    initialData={isEditing}
                    onSuccess={handleClose}
                    onCancel={handleClose}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
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
