import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { ExpenseChart } from '@/components/dashboard/ExpenseChart';
import { CategoryChart } from '@/components/dashboard/CategoryChart';
import { RecentExpenses } from '@/components/dashboard/RecentExpenses';

export const DashboardPage = () => {
    return (
        <div className="space-y-6">
            <DashboardStats />

            <div className="md:grid md:gap-6 md:grid-cols-2 space-y-6 md:space-y-0">
                <ExpenseChart />
                <CategoryChart />
            </div>

            <RecentExpenses />
        </div>
    );
};