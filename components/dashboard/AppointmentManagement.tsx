"use client";

import React, { useState, useEffect } from "react";
import { Plus, Pencil, XCircle, CalendarDays, User, Clock, AlertTriangle, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Staff, Service, Appointment, AppointmentStatus, CreateAppointmentInput } from "@/types";
import { createAppointment, updateAppointment, deleteAppointment } from "@/app/actions/appointments";
import { getServices } from "@/app/actions/services";
import { addToQueue } from "@/app/actions/queue";
import { cn } from "@/lib/utils";
import { format, isSameDay, addMinutes, parseISO, isWithinInterval } from "date-fns";

interface AppointmentManagementProps {
    appointments: Appointment[];
    staffs: Staff[];
    onRefresh: () => void;
}

export function AppointmentManagement({ appointments, staffs, onRefresh }: AppointmentManagementProps) {
    const [services, setServices] = useState<Service[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState<Appointment | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [filterDate, setFilterDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [filterStaff, setFilterStaff] = useState<string>("all");

    const [formData, setFormData] = useState<CreateAppointmentInput>({
        customerName: "",
        serviceId: "",
        staffId: "",
        appointmentDate: new Date().toISOString().slice(0, 16),
    });

    const [conflictError, setConflictError] = useState<string | null>(null);
    const [capacityWarning, setCapacityWarning] = useState<string | null>(null);

    useEffect(() => {
        getServices().then(setServices);
    }, []);

    const checkConflicts = () => {
        setConflictError(null);
        setCapacityWarning(null);

        if (!formData.serviceId || !formData.appointmentDate) return;

        const selectedService = services.find(s => s.id === formData.serviceId);
        if (!selectedService) return;

        const startTime = parseISO(formData.appointmentDate);
        const endTime = addMinutes(startTime, selectedService.durationMinutes);

        // 1. Check Daily Capacity for Staff
        if (formData.staffId) {
            const staff = staffs.find(s => s.id === formData.staffId);
            if (staff) {
                const todayCount = appointments.filter(a =>
                    a.staffId === staff.id &&
                    isSameDay(parseISO(a.appointmentDate), startTime) &&
                    a.status !== AppointmentStatus.CANCELLED &&
                    a.id !== isEditing?.id
                ).length;

                if (todayCount >= staff.dailyCapacity) {
                    setCapacityWarning(`${staff.name} already has ${todayCount} appointments today (Max: ${staff.dailyCapacity})`);
                }
            }

            // 2. Check Overlapping Appointments
            const hasOverlap = appointments.some(a => {
                if (a.staffId !== formData.staffId || a.status === AppointmentStatus.CANCELLED || a.id === isEditing?.id) return false;

                const aStart = parseISO(a.appointmentDate);
                const aService = services.find(s => s.id === a.serviceId);
                const aEnd = addMinutes(aStart, aService?.durationMinutes || 30);

                return (
                    isWithinInterval(startTime, { start: aStart, end: aEnd }) ||
                    isWithinInterval(endTime, { start: aStart, end: aEnd }) ||
                    (startTime <= aStart && endTime >= aEnd)
                );
            });

            if (hasOverlap) {
                setConflictError("This staff member already has an appointment at this time");
            }
        }
    };

    useEffect(() => {
        checkConflicts();
    }, [formData.staffId, formData.serviceId, formData.appointmentDate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (conflictError) return;

        setIsSubmitting(true);
        try {
            if (isEditing) {
                await updateAppointment(isEditing.id, formData);
            } else {
                const result = await createAppointment(formData);
                // If no staff assigned, backend usually puts in queue, but we check if we should explicitly add to queue item if needed
                // Assuming backend handles the AUTO-QUEUE if staffId is null/empty
            }
            onRefresh();
            handleClose();
        } catch (error) {
            console.error("Error saving appointment:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (appointment: Appointment) => {
        setFormData({
            customerName: appointment.customerName,
            serviceId: appointment.serviceId,
            staffId: appointment.staffId || "",
            appointmentDate: new Date(appointment.appointmentDate).toISOString().slice(0, 16),
        });
        setIsEditing(appointment);
        setIsAdding(true);
    };

    const handleStatusUpdate = async (id: string, status: AppointmentStatus) => {
        try {
            await updateAppointment(id, { status } as any);
            onRefresh();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleClose = () => {
        setIsAdding(false);
        setIsEditing(null);
        setFormData({ customerName: "", serviceId: "", staffId: "", appointmentDate: new Date().toISOString().slice(0, 16) });
        setConflictError(null);
        setCapacityWarning(null);
    };

    const filteredAppointments = appointments.filter(a => {
        const dateMatch = isSameDay(parseISO(a.appointmentDate), parseISO(filterDate));
        const staffMatch = filterStaff === "all" || a.staffId === filterStaff;
        return dateMatch && staffMatch;
    }).sort((a, b) => parseISO(a.appointmentDate).getTime() - parseISO(b.appointmentDate).getTime());

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
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
                    <Button onClick={() => setIsAdding(true)} className="rounded-full gap-2">
                        <Plus className="w-4 h-4" />
                        Book New
                    </Button>
                </div>
            </div>

            {isAdding && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-xl p-8 animate-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh]">
                        <h3 className="text-xl font-bold mb-6">{isEditing ? "Modify Appointment" : "New Appointment"}</h3>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <Label>Customer Name</Label>
                                <Input
                                    value={formData.customerName}
                                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                                    placeholder="e.g. Alice Smith"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Service</Label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        value={formData.serviceId}
                                        onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Service</option>
                                        {services.map(s => (
                                            <option key={s.id} value={s.id}>{s.name} ({s.durationMinutes}m)</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Date & Time</Label>
                                    <Input
                                        type="datetime-local"
                                        value={formData.appointmentDate}
                                        onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Assign Staff (Optional)</Label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    value={formData.staffId || ""}
                                    onChange={(e) => setFormData({ ...formData, staffId: e.target.value || null })}
                                >
                                    <option value="">Unassigned (Send to Queue)</option>
                                    {staffs.map(s => (
                                        <option key={s.id} value={s.id}>{s.name} - {s.staffType}</option>
                                    ))}
                                </select>

                            </div>

                            {conflictError && (
                                <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-lg flex items-center gap-2 text-destructive text-sm font-medium">
                                    <AlertTriangle className="w-4 h-4" />
                                    {conflictError}
                                </div>
                            )}

                            {capacityWarning && !conflictError && (
                                <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg flex items-center gap-2 text-yellow-600 text-sm font-medium">
                                    <AlertTriangle className="w-4 h-4" />
                                    {capacityWarning}
                                </div>
                            )}

                            <div className="flex gap-3 pt-4">
                                <Button type="button" variant="outline" className="flex-1 rounded-full" onClick={handleClose}>Cancel</Button>
                                <Button type="submit" className="flex-1 rounded-full" disabled={isSubmitting || !!conflictError}>
                                    {isSubmitting ? "Processing..." : "Confirm Appointment"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-muted/50 border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                                <th className="px-6 py-4 font-bold">Time</th>
                                <th className="px-6 py-4 font-bold">Customer</th>
                                <th className="px-6 py-4 font-bold">Service</th>
                                <th className="px-6 py-4 font-bold">Staff</th>
                                <th className="px-6 py-4 font-bold">Status</th>
                                <th className="px-6 py-4 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredAppointments.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground italic">
                                        No appointments found for this day.
                                    </td>
                                </tr>
                            ) : (
                                filteredAppointments.map((app) => (
                                    <tr key={app.id} className="hover:bg-muted/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="font-mono font-bold text-primary">
                                                {format(parseISO(app.appointmentDate), "HH:mm")}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium">{app.customerName}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="block">{app.service?.name || "Service Deleted"}</span>
                                                <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded uppercase">{app.service?.durationMinutes}m</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {app.staff ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                                                        {app.staff.name.charAt(0)}
                                                    </div>
                                                    <span>{app.staff.name}</span>
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground italic text-sm">Waiting for assignment</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider",
                                                app.status === AppointmentStatus.COMPLETED && "bg-green-500/10 text-green-500",
                                                app.status === AppointmentStatus.SCHEDULED && "bg-blue-500/10 text-blue-500",
                                                app.status === AppointmentStatus.CANCELLED && "bg-destructive/10 text-destructive",
                                                app.status === AppointmentStatus.WAITING && "bg-yellow-500/10 text-yellow-500",
                                            )}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                {app.status === AppointmentStatus.SCHEDULED && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(app.id, AppointmentStatus.COMPLETED)}
                                                        className="p-1.5 hover:bg-green-500/10 text-muted-foreground hover:text-green-500 rounded-md transition-colors"
                                                        title="Mark as Completed"
                                                    >
                                                        <CheckCircle2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleEdit(app)}
                                                    className="p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground rounded-md transition-colors"
                                                    title="Edit"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                {app.status !== AppointmentStatus.CANCELLED && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(app.id, AppointmentStatus.CANCELLED)}
                                                        className="p-1.5 hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded-md transition-colors"
                                                        title="Cancel"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
