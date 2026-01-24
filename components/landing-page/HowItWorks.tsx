import React from "react";

const steps = [
    {
        number: "01",
        title: "Sign up your business",
        description: "Create your workspace and invite your staff members in seconds.",
    },
    {
        number: "02",
        title: "Define your availability",
        description: "Set staff shifts, service durations, and buffer times between appointments.",
    },
    {
        number: "03",
        title: "Automate your queue",
        description: "Sit back as AppointFlow handles incoming bookings and assigns them to free staff.",
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">How it works</h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            We've simplified the complexity of scheduling. From setup to automation, AppointFlow is built for speed.
                        </p>
                        <div className="space-y-8">
                            {steps.map((step, index) => (
                                <div key={index} className="flex gap-6">
                                    <div className="text-4xl font-black text-primary/20">{step.number}</div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                        <p className="text-muted-foreground">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 w-full max-w-lg aspect-square bg-muted/50 rounded-3xl border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
                        <div className="relative w-full h-full p-12">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-primary/10 rounded-full blur-[60px]" />
                            {/* Visual representation of steps */}
                            <div className="relative z-10 w-full h-full flex flex-col justify-between">
                                <div className="bg-card p-4 rounded-xl shadow-lg border border-border w-2/3 ml-auto animate-pulse">
                                    <div className="h-4 w-1/2 bg-muted rounded mb-2" />
                                    <div className="h-4 w-1/3 bg-muted rounded" />
                                </div>
                                <div className="bg-card p-4 rounded-xl shadow-lg border border-border w-1/2 animate-bounce">
                                    <div className="h-4 w-2/3 bg-muted rounded mb-2" />
                                    <div className="h-4 w-1/2 bg-muted rounded" />
                                </div>
                                <div className="bg-primary p-4 rounded-xl shadow-lg border border-primary-foreground/10 w-2/3 ml-auto">
                                    <div className="h-4 w-1/2 bg-primary-foreground/20 rounded mb-2" />
                                    <div className="h-4 w-1/4 bg-primary-foreground/20 rounded" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
