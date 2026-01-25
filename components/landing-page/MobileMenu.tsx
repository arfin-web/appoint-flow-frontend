"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                className="md:hidden p-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X /> : <Menu />}
            </button>

            {isOpen ? (
                <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-4 animate-in slide-in-from-top-4 duration-200">
                    <div className="flex flex-col gap-4">
                        <Link
                            href="#features"
                            className="text-lg font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Features
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="text-lg font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            How it Works
                        </Link>
                        <Link
                            href="#pricing"
                            className="text-lg font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Pricing
                        </Link>
                        <hr className="border-border" />
                    </div>
                </div>
            ) : null}
        </>
    );
}
