import { SignUp } from '@clerk/nextjs'
import { Navbar } from '@/components/landing-page/Navbar'
import { Footer } from '@/components/landing-page/Footer'

export default function Page() {
    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center h-screen">
                <SignUp />
            </div>
            <Footer />
        </>
    )
}