import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function DashboardPreview() {
    return (
        <>
            {/* Dashboard Preview / Visual element */}
            <div className="mt-16 md:mt-24 relative max-w-6xl mx-auto">
                <div className="relative rounded-3xl border border-primary/20 bg-card shadow-[0_0_50px_-12px_rgba(var(--primary),0.3)] overflow-hidden aspect-video group">
                    <div className="absolute inset-0 bg-linear-to-tr from-primary/10 to-transparent opacity-50 z-10 pointer-events-none" />

                    <Image
                        src="/dashboard.png"
                        alt="AppointFlow Dashboard Preview"
                        fill
                        className="object-cover object-top"
                        priority
                    />

                    {/* Overlay Gradient to blend with background */}
                    <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-40 z-10 pointer-events-none" />
                </div>

                {/* Floating badges */}
                <div className="absolute -top-6 -right-3 md:-top-10 md:-right-10 bg-primary p-4 rounded-xl shadow-lg border border-primary-foreground/10 animate-bounce cursor-default">
                    <span className="text-primary-foreground font-bold text-lg md:text-xl">99% Efficiency</span>
                </div>
                <div className="absolute -bottom-6 -left-3 md:-bottom-10 md:-left-10 bg-card p-4 rounded-xl shadow-lg border border-border">
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
        </>
    )
}