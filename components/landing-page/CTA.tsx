import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full -z-10" />

            <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-3xl md:text-6xl font-extrabold mb-8 tracking-tighter">
                    Ready to transform your <br /> appointment workflow?
                </h2>
                <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Join thousands of businesses already using AppointFlow to manage their staff and customer queues with ease.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="lg" className="h-14 px-10 rounded-full text-lg group">
                        Get Started Now
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" size="lg" className="h-14 px-10 rounded-full text-lg">
                        Talk to Sales
                    </Button>
                </div>
            </div>
        </section>
    );
}
