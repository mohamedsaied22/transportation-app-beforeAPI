"use client"

import { cn } from "@/lib/utils";
import { ArrowLeftRight, CalendarDays, Combine, LandPlot, LayoutDashboard, Ship, Truck, Users, Warehouse } from "lucide-react";


import { Montserrat } from "next/font/google";



import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const montserrat = Montserrat ({
    weight: "600",
    subsets: ["latin"]
})

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-orange-500",
    },
    {
        label: "Booking",
        icon: CalendarDays,
        href: "/booking",
        color: "text-teal-600",
    },
    {
        label: "Contractors",
        icon: Truck,
        href: "/contractors",
        color: "text-sky-500"
    },
    {
        label: "Vessels",
        icon: Ship,
        href: "/vessels",
        color: "text-pink-700",
    },
    {
        label: "Cargo",
        icon: Combine,
        href: "/cargos",
        color: "text-violet-500",
    },
    {
        label: "Users",
        icon: Users,
        href: "/users",
        color: "text-green-700",
    },
    {
        label: "Warehouses",
        icon: Warehouse,
        href: "/warehouses",
        color: "text-sky-700",
    },
    {
        label: "Berth",
        icon: LandPlot,
        href: "/berths",
        color: "text-slate-700",
    },
    {
        label: "Transactions",
        icon: ArrowLeftRight,
        href: "/transactions",
        color: "text-emerald-500",
    },
]

const Sidebar = () => {
    const pathName = usePathname();

    return (
        <div className="rounded-lg space-y-4 py-4 flex flex-col h-full bg-white">
            <div className="px-3 py-2  flex-1 text-center mr-auto ml-auto">
                <Link href="/dashboard" >
                <div className="text-white  flex items-center rounded-xl p-1 mb-14 shadow-md">

                    <div className="relative w-full rounded-2xl h-8 mr-4 hover:scale-105 transition duration-300 ">
                        <Image 
                            fill
                            alt="logo"
                            src="/logo.png"
                            className=""
                            />
                    </div>
                            </div>
                </Link>
                <div className="space-y-2 ">
                    {routes.map((route, index) => (
                        <Link 
                        href={route.href}
                        key={route.href}
                        className={cn(
                            "text-md group shadow-md flex p-3 pl-4 justify-start font-medium cursor-pointer hover:shadow-xl from-sky-500 to-sky-700 hover:bg-sky-100 hover:text-sky-700 rounded-xl transition",
                            pathName === route.href ? "bg-sky-100 text-sky-700 shadow-xl from-sky-500 to-sky-700 transition" : "text-sky-900"
                        )}
                        style={{
                            marginTop: index === 1 ? "2rem" : index === 8 ? "2rem" : ".5rem" 
                        }}
                    >
                        <div className="flex items-center flex-1">
                            <route.icon className={cn("h-5 w-5 mr-3 scale-105", route.color)} />
                            {route.label}
                        </div>
                    </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;