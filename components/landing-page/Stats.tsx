import React from "react";

const stats = [
    { label: "Active Businesses", value: "2,000+" },
    { label: "Appointments Solved", value: "500k+" },
    { label: "Success Rate", value: "99.9%" },
    { label: "Wait Time Reduced", value: "45%" },
];

export function Stats() {
    return (
        <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="space-y-2">
                            <div className="text-3xl md:text-5xl font-extrabold tracking-tight">{stat.value}</div>
                            <div className="text-sm md:text-base font-medium opacity-80 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
