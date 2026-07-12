import { RolePageLayout } from '../../components/RolePageLayout';
import { CostliestVehiclesChart, ExpensePieChart, ExportActions, FinancialFilters, FinancialKPICards, FuelAnalyticsTable, QuickInsights, RecentExpensesTable, RevenueLineChart, VehicleProfitabilityTable } from '../../components/FinancialDashboardComponents';
import { costliestVehicles, expenseBreakdown, expenses, fuelAnalytics, insights, kpis, monthlyFinancials, profitability } from './financialData';

export const FinancialDashboard = () => (
  <RolePageLayout activeTab="Analytics" title="Financial Dashboard" subtitle="Monitor operational expenses, profitability and fleet financial performance." showSearch={false}>
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500">Financial overview · Updated today</p><ExportActions expenseRows={expenses} /></div>
    <FinancialKPICards items={kpis} />
    <FinancialFilters />
    <div className="grid gap-6 xl:grid-cols-2"><RevenueLineChart data={monthlyFinancials} /><ExpensePieChart data={expenseBreakdown} /></div>
    <FuelAnalyticsTable data={fuelAnalytics} />
    <VehicleProfitabilityTable data={profitability} />
    <div className="grid gap-6 xl:grid-cols-2"><CostliestVehiclesChart data={costliestVehicles} /><section className="rounded-xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">Financial pulse</p><h2 className="mt-3 text-2xl font-bold">Profitability is trending upward.</h2><p className="mt-3 max-w-md text-sm leading-6 text-slate-300">Net profit grew 19.1% month-over-month, led by stronger utilization and lower fuel cost per kilometer.</p><div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-5"><div><p className="text-2xl font-bold text-white">$143.7k</p><p className="mt-1 text-xs text-slate-400 dark:text-slate-500">Net profit</p></div><div><p className="text-2xl font-bold text-amber-300">18.7%</p><p className="mt-1 text-xs text-slate-400 dark:text-slate-500">Fleet ROI</p></div></div></section></div>
    <RecentExpensesTable data={expenses} />
    <section><div className="mb-4"><h2 className="text-lg font-bold text-slate-800 dark:text-white">Quick Insights</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500">At-a-glance financial signals across the fleet.</p></div><QuickInsights items={insights} /></section>
  </RolePageLayout>
);
