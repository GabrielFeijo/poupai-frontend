import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Toaster } from '@/components/ui/toaster';

export const AppLayout = () => {
    return (
        <div className="min-h-screen bg-background">
            <div className="flex">
                <Sidebar />
                <div className="w-[calc(100%-256px)] ml-auto">
                    <Header />
                    <main className="p-6">
                        <Outlet />
                    </main>
                </div>
            </div>
            <Toaster />
        </div>
    );
}