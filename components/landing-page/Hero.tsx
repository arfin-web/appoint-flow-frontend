import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { DashboardPreview } from "./DashboardPreview";
import { ContainerWrapper } from "./ContainerWrapper";

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] right-[-10%] w-[35%] h-[35%] bg-blue-500/20 blur-[120px] rounded-full" />
            </div>

            <ContainerWrapper>
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
                        <Link href="/sign-in">
                            <Button size="lg" className="h-12 px-8 rounded-full text-base group w-full sm:w-auto">
                                Start Free Trial
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Tooltip>
                            <TooltipTrigger type="button" className="flex justify-center items-center gap-2 h-12 px-8 border border-primary/20 rounded-full text-base w-full sm:w-auto">
                                <Play className="mr-2 w-4 h-4 fill-current" />
                                Watch Demo
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Coming Soon</p>
                            </TooltipContent>
                        </Tooltip>
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

                <DashboardPreview />
            </ContainerWrapper>
        </section>
    );
}
