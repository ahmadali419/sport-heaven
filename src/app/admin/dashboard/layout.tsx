
import NavBar from "@/components/NavBar";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <React.Fragment>
            <NavBar >
                {children}
            </NavBar>
        </React.Fragment>
    );
};

export default DashboardLayout;