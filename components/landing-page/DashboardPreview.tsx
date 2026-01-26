import { CheckCircle2 } from "lucide-react";

export function DashboardPreview() {
    return (
        <>
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