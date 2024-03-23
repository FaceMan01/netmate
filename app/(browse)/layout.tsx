import React from "react";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const Browse = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <>
        <Navbar />
            <div className="flex full-h pt-20">
                <Sidebar />
                <div className="flex-1 ml-60">
                    {children}
                </div>
            </div>
        </>
    )
} 

export default Browse;