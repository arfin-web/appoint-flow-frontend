import { Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContainerWrapper } from "./ContainerWrapper";

const testimonials = [
    {
        name: "Ariful Islam",
        role: "Founder, Dhakaiya Salon",
        content: "AppointFlow has completely transformed how we manage our salon. The auto-queue feature is a lifesaver during busy weekends in Banani!",
        rating: 5,
        avatar: "A"
    },
    {
        name: "Tasnima Akter",
        role: "Manager, Chittagong Medical Hub",
        content: "Managing doctor appointments used to be a chaos. Now, everything is streamlined. Our patients love the transparency of the waiting queue.",
        rating: 5,
        avatar: "T"
    },
    {
        name: "Tanvir Ahmed",
        role: "Owner, Banani Spa Center",
        content: "The conflict detection is pinpoint accurate. No more double bookings or frustrated clients. Truly the best scheduling tool in Bangladesh.",
        rating: 4,
        avatar: "T"
    },
    {
        name: "Fahmida Hasan",
        role: "Director, Rajshahi Wellness Clinic",
        content: "We've seen a 40% increase in productivity since moving to AppointFlow. The staff management interface is so intuitive for our team.",
        rating: 5,
        avatar: "F"
    },
    {
        name: "Rakibul Hasan",
        role: "CEO, Sylhet Tech Solutions",
        content: "Finally, a world-class appointment system that understands modern business needs. The UI is stunning and performance is top-notch.",
        rating: 5,
        avatar: "R"
    },
    {
        name: "Nushrat Jahan",
        role: "Owner, Uttara Boutique",
        content: "The support team is incredible. They helped us set up our service catalog in no time. Highly recommended for any service business.",
        rating: 5,
        avatar: "N"
    }
];

export function Testimonials() {
    return (
        <section id="testimonials" className="py-24 bg-muted/30 relative overflow-hidden">
            {/* Decorative background circle */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

            <ContainerWrapper>
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Trusted by Businesses Across Bangladesh</h2>
                    <p className="text-muted-foreground text-lg">
                        See how AppointFlow is helping local business owners streamline their operations and delight their customers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className="bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group relative"
                        >
                            <Quote className="absolute top-6 right-8 w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors" />

                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, starIndex) => (
                                    <Star
                                        key={starIndex}
                                        className={cn(
                                            "w-4 h-4",
                                            starIndex < t.rating ? "text-yellow-500 fill-yellow-500" : "text-muted border-muted"
                                        )}
                                    />
                                ))}
                            </div>

                            <p className="text-muted-foreground mb-8 relative z-10 italic leading-relaxed">
                                "{t.content}"
                            </p>

                            <div className="flex items-center gap-4 border-t border-border/50 pt-6">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg border border-primary/20">
                                    {t.avatar}
                                </div>
                                <div>
                                    <h4 className="font-bold">{t.name}</h4>
                                    <p className="text-xs text-muted-foreground font-medium">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ContainerWrapper>
        </section>
    );
}
