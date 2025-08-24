import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Toaster } from '@/components/ui/toaster';
import { useState } from 'react';

export const AppLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background">
            <div className="flex">
                <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

                <div className="flex-1 ml-0 md:ml-64 transition-all">
                    <Header onMenuClick={() => setSidebarOpen(true)} />
                    <main className="p-6 md:w-full w-screen">
                        <Outlet />
                    </main>
                </div>
            </div>
            <Toaster />
        </div>
    );
};
