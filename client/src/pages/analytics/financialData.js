export const kpis = [
  { label: 'Total Revenue', value: '$428,640', change: '+12.4%', trend: 'vs. last month', icon: 'Revenue' },
  { label: 'Operational Cost', value: '$284,920', change: '+5.8%', trend: 'vs. last month', icon: 'Cost' },
  { label: 'Fuel Cost', value: '$118,460', change: '-3.2%', trend: 'vs. last month', icon: 'Fuel' },
  { label: 'Maintenance Cost', value: '$42,780', change: '+8.6%', trend: 'vs. last month', icon: 'Tools' },
  { label: 'Net Profit', value: '$143,720', change: '+19.1%', trend: 'vs. last month', icon: 'Profit' },
  { label: 'Fleet ROI', value: '18.7%', change: '+2.1%', trend: 'vs. last month', icon: 'ROI' },
  { label: 'Fleet Utilization', value: '82.4%', change: '+4.7%', trend: 'vs. last month', icon: 'Utilization' },
  { label: 'Avg. Fuel Efficiency', value: '7.8 km/L', change: '+0.4', trend: 'vs. last month', icon: 'Efficiency' },
];

export const monthlyFinancials = [
  { month: 'Jan', revenue: 312000, expenses: 235000 }, { month: 'Feb', revenue: 328000, expenses: 241000 }, { month: 'Mar', revenue: 347000, expenses: 255000 },
  { month: 'Apr', revenue: 362000, expenses: 260000 }, { month: 'May', revenue: 389000, expenses: 273000 }, { month: 'Jun', revenue: 428640, expenses: 284920 },
];
export const expenseBreakdown = [{ name: 'Fuel', value: 118460 }, { name: 'Maintenance', value: 42780 }, { name: 'Insurance', value: 38800 }, { name: 'Repairs', value: 32100 }, { name: 'Tolls', value: 14780 }, { name: 'Other', value: 38000 }];
export const fuelAnalytics = [
  { vehicle: 'TX-9081 · Heavy Duty Truck', distance: '8,460 km', fuel: '1,245 L', efficiency: '6.8 km/L', fuelCost: '$4,810', perKm: '$0.57', poor: true },
  { vehicle: 'TX-4322 · Transit Van', distance: '6,210 km', fuel: '745 L', efficiency: '8.3 km/L', fuelCost: '$2,880', perKm: '$0.46' },
  { vehicle: 'NY-7811 · Sedan Courier', distance: '5,280 km', fuel: '520 L', efficiency: '10.2 km/L', fuelCost: '$2,010', perKm: '$0.38' },
  { vehicle: 'CA-8899 · Heavy Duty Rig', distance: '7,140 km', fuel: '1,190 L', efficiency: '6.0 km/L', fuelCost: '$4,600', perKm: '$0.64', poor: true },
];
export const profitability = [
  { vehicle: 'NY-7811 · Sedan Courier', revenue: 48600, fuel: 2010, maintenance: 1180, cost: 8520, profit: 40080, roi: 31.4 },
  { vehicle: 'TX-4322 · Transit Van', revenue: 64200, fuel: 2880, maintenance: 2720, cost: 14680, profit: 49520, roi: 28.6 },
  { vehicle: 'TX-9081 · Heavy Duty Truck', revenue: 86300, fuel: 4810, maintenance: 6120, cost: 24960, profit: 61340, roi: 22.1 },
  { vehicle: 'CA-8899 · Heavy Duty Rig', revenue: 52400, fuel: 4600, maintenance: 9320, cost: 29840, profit: 22560, roi: 9.8 },
];
export const costliestVehicles = [{ vehicle: 'CA-8899', cost: 29840 }, { vehicle: 'TX-9081', cost: 24960 }, { vehicle: 'WA-5561', cost: 20780 }, { vehicle: 'TX-4322', cost: 14680 }];
export const expenses = [
  { id: 'EXP-1024', vehicle: 'CA-8899', type: 'Repairs', amount: 4820, date: 'Jun 28, 2026', status: 'Approved' }, { id: 'EXP-1023', vehicle: 'TX-9081', type: 'Fuel', amount: 1280, date: 'Jun 27, 2026', status: 'Approved' },
  { id: 'EXP-1022', vehicle: 'WA-5561', type: 'Maintenance', amount: 2440, date: 'Jun 26, 2026', status: 'Pending' }, { id: 'EXP-1021', vehicle: 'TX-4322', type: 'Tolls', amount: 365, date: 'Jun 25, 2026', status: 'Approved' },
  { id: 'EXP-1020', vehicle: 'NY-7811', type: 'Insurance', amount: 920, date: 'Jun 24, 2026', status: 'Approved' }, { id: 'EXP-1019', vehicle: 'CA-8899', type: 'Fuel', amount: 1420, date: 'Jun 23, 2026', status: 'Pending' },
];
export const insights = [{ label: 'Highest Fuel Consumption', value: 'CA-8899', detail: '1,190 L this month' }, { label: 'Highest Maintenance Cost', value: 'CA-8899', detail: '$9,320 this month' }, { label: 'Best ROI', value: 'NY-7811', detail: '31.4% return' }, { label: 'Worst ROI', value: 'CA-8899', detail: '9.8% return' }, { label: 'Avg. Cost per KM', value: '$0.51', detail: 'Across active fleet' }, { label: 'Most Profitable Vehicle', value: 'TX-9081', detail: '$61,340 net profit' }];
