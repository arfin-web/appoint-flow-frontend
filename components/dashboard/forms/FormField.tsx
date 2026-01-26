"use client";

import { Label } from "@/components/ui/label";
import { FieldError } from "react-hook-form";

interface FormFieldProps {
    label: string;
    error?: FieldError;
    children: React.ReactNode;
    className?: string;
}

export function FormField({ label, error, children, className = "" }: FormFieldProps) {
    return (
        <div className={`space-y-2 ${className}`}>
            <Label>{label}</Label>
            {children}
            {error && <p className="text-xs text-destructive">{error.message}</p>}
        </div>
    );
}
