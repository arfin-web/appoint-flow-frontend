import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Zap, Bell, Clock, ShieldCheck, BarChart3 } from "lucide-react";
import { ContainerWrapper } from "./ContainerWrapper";

const features = [
    {
        title: "Smart Auto-Assignment",
        description: "Intelligently assign appointments to the most suitable staff based on workload and expertise.",
        icon: <Users className="w-10 h-10 text-primary" />,
        className: "md:col-span-2",
    },
    {
        title: "Queue Management",
        description: "Manage overflow with a dynamic waiting queue that auto-updates in real-time.",
        icon: <Zap className="w-10 h-10 text-yellow-500" />,
        className: "md:col-span-1",
    },
    {
        title: "Conflict Prevention",
        description: "Our algorithm ensures zero double-bookings or overlapping staff schedules.",
        icon: <ShieldCheck className="w-10 h-10 text-green-500" />,
        className: "md:col-span-1",
    },
    {
        title: "Real-time Dashboard",
        description: "Track performance, staff status, and customer wait times from one central hub.",
        icon: <BarChart3 className="w-10 h-10 text-blue-500" />,
        className: "md:col-span-2",
    },
    {
        title: "Automated Notifications",
        description: "Send instant SMS or Email alerts for booking confirmations and queue status.",
        icon: <Bell className="w-10 h-10 text-purple-500" />,
        className: "md:col-span-1",
    },
    {
        title: "Advanced Analytics",
        description: "Analyze peak hours and busy periods to optimize your staff scheduling.",
        icon: <Clock className="w-10 h-10 text-orange-500" />,
        className: "md:col-span-1",
    },
];

export function Features() {
    return (
        <section id="features" className="py-24 bg-muted/30">
            <ContainerWrapper>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Everything you need to <br /> manage your flow</h2>
                    <p className="text-lg text-muted-foreground">
                        AppointFlow packs powerful tools into a simple interface, designed for businesses of all sizes.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className={`border-none shadow-md hover:shadow-xl transition-all hover:-translate-y-1 ${feature.className}`}>
                            <CardHeader>
                                <div className="mb-4">{feature.icon}</div>
                                <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base text-muted-foreground">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </ContainerWrapper>
        </section>
    );
}
