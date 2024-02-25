import React from "react";
import { Navbar } from "../_components/navbar";

const Browse = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <>
        <Navbar />
            <div className="flex full-h pt-20">
                {children}
            </div>
        </>
    )
} 

export default Browse;