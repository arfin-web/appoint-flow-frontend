import Link from "next/link";
import { Calendar, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
    return (
        <footer className="bg-background border-t">
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="bg-primary p-1.5 rounded-lg">
                                <Calendar className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold">AppointFlow</span>
                        </Link>
                        <p className="text-muted-foreground mb-6">
                            Empowering businesses with smart appointment and queue management solutions.
                            Simplify scheduling, optimize staff, and delight customers.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="p-2 bg-muted rounded-full hover:bg-primary/20 hover:text-primary transition-all">
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 bg-muted rounded-full hover:bg-primary/20 hover:text-primary transition-all">
                                <Github className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 bg-muted rounded-full hover:bg-primary/20 hover:text-primary transition-all">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="#features" className="hover:text-primary">Features</Link></li>
                            <li><Link href="#" className="hover:text-primary">Staff Dashboard</Link></li>
                            <li><Link href="#" className="hover:text-primary">Queue View</Link></li>
                            <li><Link href="#" className="hover:text-primary">Integrations</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary">Documentation</Link></li>
                            <li><Link href="#" className="hover:text-primary">API Reference</Link></li>
                            <li><Link href="#" className="hover:text-primary">Community</Link></li>
                            <li><Link href="#" className="hover:text-primary">Help Center</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Stay Updated</h4>
                        <p className="text-sm text-muted-foreground mb-4">Subscribe to our newsletter for latest updates.</p>
                        <div className="flex items-center gap-2">
                            <input
                                type="email"
                                placeholder="email@example.com"
                                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <Button>
                                <Mail className="w-6 h-6" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© 2026 AppointFlow. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-primary">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary">Terms of Service</Link>
                        <Link href="#" className="hover:text-primary">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
