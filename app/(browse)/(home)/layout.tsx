import React from "react";
import { Navbar } from "../_components/navbar";
import { Sidebar } from "../_components/sidebar";
import { Container } from "../_components/conteiner";

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
                <Container>
                    {children}
                </Container>
            </div>
        </>
    )
} 

export default Browse;