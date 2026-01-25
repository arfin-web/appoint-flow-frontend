import AdminCredential from '@/components/landing-page/AdminCredential'
import { Footer } from '@/components/landing-page/Footer'
import { Navbar } from '@/components/landing-page/Navbar'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 p-6 pt-24 bg-background relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent -z-10" />

                <div className="flex items-center justify-center animate-in fade-in slide-in-from-left-8 duration-700">
                    <SignIn />
                </div>

                <AdminCredential />
            </main>
            <Footer />
        </div>
    )
}