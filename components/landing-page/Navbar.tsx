import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from '@clerk/nextjs/server'

interface NavbarProps {
  isLanding?: boolean;
}

export async function Navbar({ isLanding = true }: NavbarProps) {
  const user = await currentUser()

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-background/80 backdrop-blur-md border-border py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-lg group-hover:rotate-12 transition-transform">
              <Calendar className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">AppointFlow</span>
          </Link>

          {/* Desktop Navigation */}
          {isLanding ? (
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
                How it Works
              </Link>
              <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
                Testimonials
              </Link>
            </div>
          ) : null}

          <div className="hidden md:flex items-center gap-4">
            {
              user ? (
                <UserButton />
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/sign-in">
                      Log in
                    </Link>
                  </Button>
                  <Button size="sm" className="rounded-full px-6" asChild>
                    <Link href="/sign-up">
                      Get Started
                    </Link>
                  </Button>
                </>
              )
            }
          </div>

          {/* Mobile Menu Toggle (Client Component) */}
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
