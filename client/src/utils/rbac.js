export const ROLES = {
  FLEET_MANAGER: 'Fleet Manager',
  DISPATCHER: 'Dispatcher',
  SAFETY_OFFICER: 'Safety Officer',
  FINANCIAL_ANALYST: 'Financial Analyst',
};

// Define access control for each view
export const RBAC_MATRIX = {
  DashboardOverview: [ROLES.FLEET_MANAGER, ROLES.DISPATCHER, ROLES.SAFETY_OFFICER, ROLES.FINANCIAL_ANALYST],
  
  // Fleet Manager & Viewers
  Fleet: [ROLES.FLEET_MANAGER, ROLES.DISPATCHER],
  VehicleDetails: [ROLES.FLEET_MANAGER, ROLES.DISPATCHER],
  
  // Safety Officer & Viewers
  Drivers: [ROLES.FLEET_MANAGER, ROLES.DISPATCHER, ROLES.SAFETY_OFFICER],
  DriverDetails: [ROLES.FLEET_MANAGER, ROLES.DISPATCHER, ROLES.SAFETY_OFFICER],
  
  // Dispatcher & Fleet Manager
  Trips: [ROLES.FLEET_MANAGER, ROLES.DISPATCHER],
  CreateTrip: [ROLES.DISPATCHER],
  TripDetails: [ROLES.FLEET_MANAGER, ROLES.DISPATCHER],
  
  // Maintenance
  Maintenance: [ROLES.FLEET_MANAGER, ROLES.DISPATCHER, ROLES.SAFETY_OFFICER],
  MaintenanceDetails: [ROLES.FLEET_MANAGER, ROLES.DISPATCHER, ROLES.SAFETY_OFFICER],
  
  // Finance
  Fuel: [ROLES.FLEET_MANAGER, ROLES.FINANCIAL_ANALYST],
  
  // Analytics
  Analytics: [ROLES.FLEET_MANAGER, ROLES.DISPATCHER, ROLES.SAFETY_OFFICER, ROLES.FINANCIAL_ANALYST],
  
  // Settings & Profile
  Settings: [ROLES.FLEET_MANAGER, ROLES.DISPATCHER, ROLES.SAFETY_OFFICER, ROLES.FINANCIAL_ANALYST], // (Read-only for non-managers typically)
  Profile: [ROLES.FLEET_MANAGER, ROLES.DISPATCHER, ROLES.SAFETY_OFFICER, ROLES.FINANCIAL_ANALYST],
};

export const hasAccess = (role, view) => {
  if (!RBAC_MATRIX[view]) return false; // Fail safe
  return RBAC_MATRIX[view].includes(role);
};
