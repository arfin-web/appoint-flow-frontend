import { ServiceManagement } from "@/components/dashboard/ServiceManagement";
import { getServices } from "@/app/actions/services";

export default async function ServicesPage() {
    const services = await getServices();

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Services</h1>
                <p className="text-muted-foreground">Configure the services your business offers.</p>
            </div>

            <ServiceManagement services={services} />
        </div>
    );
}
