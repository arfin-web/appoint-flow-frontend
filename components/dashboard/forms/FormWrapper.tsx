"use client";

import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface FormWrapperProps {
    children: ReactNode;
    title: string;
    onCancel: () => void;
    maxWidth?: string;
}

export function FormWrapper({ children, title, onCancel, maxWidth = "max-w-md" }: FormWrapperProps) {
    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className={`bg-card border border-border rounded-2xl shadow-2xl w-full ${maxWidth} p-8 animate-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh]`}>
                <h3 className="text-xl font-bold mb-6">{title}</h3>
                <div className="flex justify-end">
                    <Button onClick={onCancel} variant="outline">Cancel</Button>
                </div>
                {children}
            </div>
        </div>
    );
}
