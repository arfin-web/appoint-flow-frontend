"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface ContainerWrapperProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export function ContainerWrapper({ children, className, id }: ContainerWrapperProps) {
    return (
        <div
            id={id}
            className={cn(
                "container mx-auto px-4 md:px-6 lg:px-8",
                className
            )}
        >
            {children}
        </div>
    );
}
