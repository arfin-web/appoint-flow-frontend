"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] right-[-10%] w-[35%] h-[35%] bg-blue-500/20 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6 animate-pulse">
                        <span className="text-xs font-bold uppercase tracking-wider">New</span>
                        <span className="text-sm font-medium text-primary-foreground/80">Queue Auto-Assignment 2.0 is here</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70">
                        Streamline Appointments <br />
                        <span className="text-primary italic">Smartly</span> & Effortlessly
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl">
                        AppointFlow manages your staff availability and waiting queues automatically.
                        No more scheduling conflicts, just seamless workflow.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        <Button size="lg" className="h-12 px-8 rounded-full text-base group w-full sm:w-auto">
                            Start Free Trial
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button variant="outline" size="lg" className="h-12 px-8 rounded-full text-base w-full sm:w-auto">
                            <Play className="mr-2 w-4 h-4 fill-current" />
                            Watch Demo
                        </Button>
                    </div>

                    <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            Free 14-day trial
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            No credit card required
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            Enterprise support
                        </div>
                    </div>
                </div>

                {/* Dashboard Preview / Visual element */}
                <div className="mt-16 md:mt-24 relative max-w-6xl mx-auto">
                    <div className="relative rounded-2xl border border-border bg-card shadow-2xl overflow-hidden aspect-video group">
                        <div className="absolute inset-0 bg-linear-to-tr from-primary/5 to-transparent opacity-50" />

                        {/* Mock Dashboard UI Elements */}
                        <div className="absolute top-0 left-0 w-full h-full p-4 md:p-8 flex flex-col gap-6">
                            <div className="flex items-center justify-between border-b pb-4">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                </div>
                                <div className="w-32 h-6 bg-muted rounded-md" />
                            </div>

                            <div className="grid grid-cols-3 gap-6">
                                <div className="h-40 bg-muted/40 rounded-xl" />
                                <div className="h-40 bg-muted/40 rounded-xl" />
                                <div className="h-40 bg-muted/40 rounded-xl" />
                            </div>

                            <div className="flex-1 bg-muted/20 rounded-xl flex items-center justify-center border-2 border-dashed border-border">
                                <span className="text-muted-foreground font-medium opacity-20 text-4xl">Real-time Dashboard Preview</span>
                            </div>
                        </div>

                        {/* Overlay Gradient to blend with background */}
                        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Floating badges */}
                    <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 bg-primary p-4 rounded-xl shadow-lg border border-primary-foreground/10 animate-bounce cursor-default">
                        <span className="text-primary-foreground font-bold text-lg md:text-xl">99% Efficiency</span>
                    </div>
                    <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-card p-4 rounded-xl shadow-lg border border-border hidden md:block">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="font-bold text-sm">Queue Clear</p>
                                <p className="text-xs text-muted-foreground">All staff active</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
