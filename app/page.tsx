import { Navbar } from "@/components/landing-page/Navbar";
import { Hero } from "@/components/landing-page/Hero";
import { Features } from "@/components/landing-page/Features";
import { HowItWorks } from "@/components/landing-page/HowItWorks";
import { Testimonials } from "@/components/landing-page/Testimonials";
import { Stats } from "@/components/landing-page/Stats";
import { CTA } from "@/components/landing-page/CTA";
import { Footer } from "@/components/landing-page/Footer";

export default function Page() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main>
                <Hero />
                <Stats />
                <Features />
                <HowItWorks />
                <Testimonials />
                <CTA />
            </main>
            <Footer />
        </div>
    );
}