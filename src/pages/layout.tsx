// import { useState } from 'react'
// import { Button } from './components/ui/button'
// import { Calendar } from './components/ui/calendar'
import { SidebarProvider, SidebarTrigger ,Sidebar} from "@/components/ui/sidebar";
import { AppSidebar } from "./components/navbar";

function Layout() {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <main>
                    <SidebarTrigger />
                    <AppSidebar />
                </main>
            </SidebarProvider>
        </>
    );
}

export default Layout;
