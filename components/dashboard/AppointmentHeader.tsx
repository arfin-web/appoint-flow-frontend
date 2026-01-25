"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Staff } from "@/types";

interface AppointmentHeaderProps {
    filterDate: string;
    setFilterDate: (date: string) => void;
    filterStaff: string;
    setFilterStaff: (staffId: string) => void;
    staffs: Staff[];
    onAdd: () => void;
}

export function AppointmentHeader({
    filterDate,
    setFilterDate,
    filterStaff,
    setFilterStaff,
    staffs,
    onAdd
}: AppointmentHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Appointments</h2>
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                <Input
                    type="date"
                    className="w-40"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                />
                <select
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                    value={filterStaff}
                    onChange={(e) => setFilterStaff(e.target.value)}
                >
                    <option value="all">All Staff</option>
                    {staffs.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                <Button onClick={onAdd} className="rounded-full gap-2">
                    <Plus className="w-4 h-4" />
                    Book New
                </Button>
            </div>
        </div>
    );
}
