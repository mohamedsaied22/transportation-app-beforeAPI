import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className=" min-h-[100vh] relative bg-gray-100"> 
            <div className="h-full hidden md:w-64 md:flex md:flex-col md:fixed md:inset-y-0 z-[80] ">
               <Sidebar/>
            </div>
            <main className=" md:pl-64">
                <Navbar />
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout;