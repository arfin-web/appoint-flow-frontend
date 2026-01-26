"use client"

import { KeyRound, User, Copy } from 'lucide-react'

export function AdminCredential() {
    return (
        <div className="max-w-md w-full animate-in fade-in slide-in-from-right-8 duration-700 delay-100">
            <div className="bg-card/50 backdrop-blur-md border border-primary/20 rounded-3xl p-8 shadow-2xl relative group overflow-hidden">
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-linear-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="relative space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2.5 rounded-xl border border-primary/20">
                            <KeyRound className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold tracking-tight">Admin Demo</h3>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Testing Credentials</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-background/50 border border-border rounded-2xl p-4 flex items-center justify-between group/item hover:border-primary/30 transition-colors">
                            <div className="flex items-center gap-3">
                                <User className="w-5 h-5 text-muted-foreground" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Username</span>
                                    <code className="text-sm font-bold text-primary">arfin12</code>
                                </div>
                            </div>
                            <button
                                onClick={() => navigator.clipboard.writeText("arfin12")}
                                className="p-2 hover:bg-primary/10 rounded-lg text-muted-foreground hover:text-primary transition-all opacity-0 group-hover/item:opacity-100"
                                title="Copy Username"
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="bg-background/50 border border-border rounded-2xl p-4 flex items-center justify-between group/item hover:border-primary/30 transition-colors">
                            <div className="flex items-center gap-3">
                                <KeyRound className="w-5 h-5 text-muted-foreground" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Password</span>
                                    <code className="text-sm font-bold text-primary">AFap12@$#</code>
                                </div>
                            </div>
                            <button
                                onClick={() => navigator.clipboard.writeText("AFap12@$#")}
                                className="p-2 hover:bg-primary/10 rounded-lg text-muted-foreground hover:text-primary transition-all opacity-0 group-hover/item:opacity-100"
                                title="Copy Password"
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-primary/5 rounded-xl p-3 border border-primary/10">
                        <p className="text-[10px] text-primary/70 leading-relaxed font-medium">
                            Use these credentials to access the admin dashboard features. These are for development and testing purposes only.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}