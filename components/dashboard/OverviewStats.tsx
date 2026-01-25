"use client";

import {
    CalendarCheck2,
    CircleCheck,
    Clock,
    Users
} from "lucide-react";

interface OverviewStatsProps {
    totalAppointments: number;
    completed: number;
    pending: number;
    queueCount: number;
}

export function OverviewStats({ totalAppointments, completed, pending, queueCount }: OverviewStatsProps) {
    const cards = [
        {
            label: "Total Today",
            value: totalAppointments,
            icon: <CalendarCheck2 className="w-5 h-5" />,
            color: "bg-blue-500/10 text-blue-500",
            description: "Appointments scheduled for today"
        },
        {
            label: "Completed",
            value: completed,
            icon: <CircleCheck className="w-5 h-5" />,
            color: "bg-green-500/10 text-green-500",
            description: "Appointments already finished"
        },
        {
            label: "Pending",
            value: pending,
            icon: <Clock className="w-5 h-5" />,
            color: "bg-yellow-500/10 text-yellow-500",
            description: "Upcoming or in-progress"
        },
        {
            label: "Waiting Queue",
            value: queueCount,
            icon: <Users className="w-5 h-5" />,
            color: "bg-purple-500/10 text-purple-500",
            description: "Customers in waiting"
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => (
                <div key={index} className="bg-card border border-border p-6 rounded-2xl flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className={`p-2 rounded-xl ${card.color}`}>
                            {card.icon}
                        </div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold tracking-tight">{card.value}</div>
                        <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
                    </div>
                    <p className="text-xs text-muted-foreground opacity-60">
                        {card.description}
                    </p>
                </div>
            ))}
        </div>
    );
}
