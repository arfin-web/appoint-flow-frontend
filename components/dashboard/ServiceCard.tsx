"use client";

import { Pencil, Trash2, Settings, Clock, Briefcase } from "lucide-react";
import { Service } from "@/types";

interface ServiceCardProps {
    service: Service;
    onEdit: (service: Service) => void;
    onDelete: (id: string) => void;
}

export function ServiceCard({ service, onEdit, onDelete }: ServiceCardProps) {
    return (
        <div className="bg-card border border-border p-6 rounded-2xl relative group hover:shadow-lg transition-all flex flex-col gap-4">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
                        <Settings className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-lg">{service.name}</h4>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => onEdit(service)} className="p-1.5 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground">
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDelete(service.id)} className="p-1.5 hover:bg-destructive/10 rounded-md text-muted-foreground hover:text-destructive">
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
    );
}
