"use client";

import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Settings, Clock, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Service, CreateServiceInput } from "@/types";
import { createService, updateService, deleteService, getServices } from "@/app/actions/services";

interface ServiceManagementProps {
    onRefresh: () => void;
}

export function ServiceManagement({ onRefresh }: ServiceManagementProps) {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<Service | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState<CreateServiceInput>({
        name: "",
        durationMinutes: 30,
        requiredStaffType: "Consultant",
    });

    const fetchServicesData = async () => {
        setIsLoading(true);
        try {
            const data = await getServices();
            setServices(data);
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchServicesData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (isEditing) {
                await updateService(isEditing.id, formData);
            } else {
                await createService(formData);
            }
            onRefresh();
            fetchServicesData();
            setIsAdding(false);
            setIsEditing(null);
            setFormData({ name: "", durationMinutes: 30, requiredStaffType: "Consultant" });
        } catch (error) {
            console.error("Error saving service:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (service: Service) => {
        setFormData({
            name: service.name,
            durationMinutes: service.durationMinutes,
            requiredStaffType: service.requiredStaffType,
        });
        setIsEditing(service);
        setIsAdding(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this service?")) {
            try {
                await deleteService(id);
                fetchServicesData();
                onRefresh();
            } catch (error) {
                console.error("Error deleting service:", error);
            }
        }
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
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="s-name">Service Name</Label>
                                <Input
                                    id="s-name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. General Consultation"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="s-duration">Duration (mins)</Label>
                                    <select
                                        id="s-duration"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={formData.durationMinutes}
                                        onChange={(e) => setFormData({ ...formData, durationMinutes: parseInt(e.target.value) })}
                                    >
                                        <option value={15}>15 Minutes</option>
                                        <option value={30}>30 Minutes</option>
                                        <option value={60}>60 Minutes</option>
                                        <option value={120}>120 Minutes</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="s-staff-type">Required Staff Type</Label>
                                    <Input
                                        id="s-staff-type"
                                        value={formData.requiredStaffType}
                                        onChange={(e) => setFormData({ ...formData, requiredStaffType: e.target.value })}
                                        placeholder="e.g. Doctor"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 rounded-full"
                                    onClick={() => {
                                        setIsAdding(false);
                                        setIsEditing(null);
                                    }}
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

            {isLoading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : (
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
                </div>
            )}
        </div>
    );
}

// Internal Loader component for ServiceManagement
function Loader2({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    )
}
