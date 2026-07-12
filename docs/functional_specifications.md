# TransitOps – Smart Transport Operations Platform
## Functional Specification: Application Pages and Sections

This document defines the application pages for the TransitOps platform, including their purpose, structural sections, user inputs, data tables, summaries, actions, and displayed details.

---

## 1. Authentication

### Page Name: Login
* **Purpose**: Authenticate users to grant secure access to the platform.
* **Sections inside the page**:
  * Login Header
  * Credentials Input Panel
  * Recovery Options
* **Forms**:
  * Login Form:
    * Username / Email Address (Input Field)
    * Password (Password Input Field)
    * Remember Me (Checkbox)
* **Tables**: None
* **Summary cards**: None
* **Filters**: None
* **Search**: None
* **Actions/Buttons**:
  * Sign In (Button)
  * Forgot Password (Link)
* **Information displayed**:
  * Platform branding placeholders (Platform Name, Welcome Message)
  * Field error messages (e.g., "Invalid username or password")

---

## 2. Dashboard

### Page Name: Dashboard
* **Purpose**: Provide a high-level operational overview of the entire transport system.
* **Sections inside the page**:
  * Operational KPIs Panel
  * Critical Alerts Hub
  * Real-Time Operations Tracker
* **Tables**:
  * Active Alerts Table:
    * Alert Severity
    * Category (Fleet, Driver, Trip, Maintenance)
    * Description
    * Trigger Timestamp
    * Status (Active, Resolved)
* **Forms**: None
* **Summary cards**:
  * Fleet Utilization (Total vs. Active Vehicles)
  * Active Trips (Ongoing trips count)
  * Driver Status (Total Drivers, On Duty, Off Duty, Idle)
  * Pending Maintenance (Vehicles requiring service)
  * Daily Expenses (Total operational spend logged today)
  * System Fuel Efficiency (Average km/L or MPG today)
* **Filters**: None
* **Search**: None
* **Actions/Buttons**:
  * Refresh Data (Button)
  * View All Alerts (Button/Link)
* **Information displayed**:
  * Aggregated operational metrics
  * List of critical, unresolved alerts (e.g., "Vehicle X over-speeding", "Driver Y license expiring soon")

---

## 3. Fleet

### Page Name: Vehicle List
* **Purpose**: Browse and manage all registered vehicles in the fleet.
* **Sections inside the page**:
  * Fleet Inventory Statistics
  * Vehicle Search & Filter Panel
  * Vehicle Directory Table
* **Tables**:
  * Vehicle Table:
    * Registration Number
    * Vehicle Name
    * Vehicle Type
    * Capacity
    * Odometer
    * Status
* **Forms**: None
* **Summary cards**:
  * Total Vehicles
  * Available
  * On Trip
  * In Shop
  * Retired
* **Filters**:
  * Vehicle Type (e.g., Truck, Van, Sedan)
  * Status (e.g., Available, On Trip, In Shop, Retired)
* **Search**:
  * Search Input (matches Registration Number, Vehicle Name, or Make/Model)
* **Actions/Buttons**:
  * Add Vehicle (Button)
  * View Details (Row Action)
  * Edit Vehicle (Row Action)
  * Delete Vehicle (Row Action)
* **Information displayed**:
  * Cumulative list of matching vehicles with counts
  * Active status badges next to vehicle registration numbers

### Page Name: Add Vehicle
* **Purpose**: Register a new vehicle in the fleet.
* **Sections inside the page**:
  * Vehicle Identity Information
  * Technical Specifications
  * Operational Capacity
* **Forms**:
  * Add Vehicle Form:
    * Registration Number / License Plate (Input Field)
    * Vehicle Name / Model (Input Field)
    * Vehicle Type (Dropdown: Truck, Van, Sedan, SUV, Bus)
    * Year of Manufacture (Dropdown / Number Input)
    * VIN / Chassis Number (Input Field)
    * Fuel Type (Dropdown: Diesel, Petrol, Electric, Hybrid)
    * Fuel Tank Capacity in Liters (Number Input)
    * Payload Capacity in kg (Number Input)
    * Passenger / Cargo Volume Capacity (Number Input)
    * Current Odometer Reading (Number Input)
    * Starting Operational Status (Dropdown: Available, In Shop, Retired)
* **Tables**: None
* **Summary cards**: None
* **Filters**: None
* **Search**: None
* **Actions/Buttons**:
  * Save Vehicle (Button)
  * Cancel (Button)
* **Information displayed**:
  * Mandatory field markers
  * Helper prompts for capacity metrics

### Page Name: Vehicle Details
* **Purpose**: View detailed specifications, status history, and historical logs of a single vehicle.
* **Sections inside the page**:
  * Vehicle Profile Header
  * Technical Specifications Sheet
  * Associated Resources & Assignments
  * Service & Operations Log Lists
* **Tables**:
  * Maintenance History Table:
    * Service Date
    * Service Type (Routine, Repair, etc.)
    * Cost
    * Provider Name
  * Fuel Logs Summary Table:
    * Fuel Date
    * Quantity Filled (Liters)
    * Total Cost
    * Odometer Reading
* **Forms**: None
* **Summary cards**:
  * Current Status Badge
  * Total Lifetime Odometer
  * Average Fuel Consumption Rate (km/L)
  * Cumulative Maintenance Cost (Year-to-date)
* **Filters**: None
* **Search**: None
* **Actions/Buttons**:
  * Edit Vehicle Info (Button)
  * Update Vehicle Status (Button)
  * Back to Vehicle List (Button)
* **Information displayed**:
  * Complete vehicle records (Make, Model, Year, VIN)
  * Currently assigned driver (Driver name & Link to Driver Profile)
  * Expiry dates for registration, insurance, and roadworthiness permits

---

## 4. Drivers

### Page Name: Driver List
* **Purpose**: Browse and manage the profiles of all transport drivers.
* **Sections inside the page**:
  * Driver Workforce Summary
  * Search & Filter Controls
  * Drivers Directory Table
* **Tables**:
  * Driver Table:
    * License Number
    * Driver Name
    * Contact Information
    * License Type
    * Assigned Vehicle
    * Status
* **Forms**: None
* **Summary cards**:
  * Total Drivers
  * Active / On Duty
  * Idle / Available
  * Off Duty
  * Suspended / Inactive
* **Filters**:
  * Driver Status (Active, Idle, Off Duty, Suspended)
  * License Type (Class A, Class B, Heavy Duty, etc.)
* **Search**:
  * Search Input (matches Driver Name, License Number, or Contact Number)
* **Actions/Buttons**:
  * Add Driver (Button)
  * View Details (Row Action)
  * Edit Driver (Row Action)
  * Delete Driver (Row Action)
* **Information displayed**:
  * Total drivers count
  * Operational status indicator for each driver row

### Page Name: Add Driver
* **Purpose**: Create a profile and register a new driver in the system.
* **Sections inside the page**:
  * Personal Information
  * Licensing & Credentials
  * Contact & Emergency Details
* **Forms**:
  * Add Driver Form:
    * First Name (Input Field)
    * Last Name (Input Field)
    * Date of Birth (Date Input)
    * Personal Contact Number (Input Field)
    * Personal Email Address (Input Field)
    * License Number (Input Field)
    * License Type / Category (Dropdown/Multiselect)
    * License Expiry Date (Date Input)
    * Date of Joining / Hire Date (Date Input)
    * Emergency Contact Name (Input Field)
    * Emergency Contact Phone (Input Field)
    * Status (Dropdown: Active, Idle, Off Duty)
* **Tables**: None
* **Summary cards**: None
* **Filters**: None
* **Search**: None
* **Actions/Buttons**:
  * Save Driver (Button)
  * Cancel (Button)
* **Information displayed**:
  * Mandatory field indicators

### Page Name: Driver Details
* **Purpose**: View comprehensive driver history, credentials, assignment records, and performance summaries.
* **Sections inside the page**:
  * Driver Profile Overview
  * Professional Credentials Info
  * Performance Metrics Panel
  * Historic Trip Logs
* **Tables**:
  * Trip History Table:
    * Trip ID
    * Date
    * Route Origin & Destination
    * Vehicle Registration
    * Trip Status
* **Forms**: None
* **Summary cards**:
  * Performance Rating (e.g., out of 5 stars)
  * Total Trips Completed
  * Hours Logged (Current month)
  * Safety Violations & Incidents logged
* **Filters**: None
* **Search**: None
* **Actions/Buttons**:
  * Edit Driver Details (Button)
  * Assign Vehicle (Button)
  * Back to Driver List (Button)
* **Information displayed**:
  * Full profile details (DOB, contact details, Emergency contact name & phone)
  * Driver license status and validation notifications (e.g., "License expiring in 15 days")

---

## 5. Trips

### Page Name: Trip List
* **Purpose**: Monitor and track all historical, current, and scheduled trips.
* **Sections inside the page**:
  * Trip Activity Analytics
  * Search & Filters Panel
  * Trip Schedule & Records Table
* **Tables**:
  * Trip Table:
    * Trip ID
    * Vehicle Registration
    * Driver Name
    * Route (Origin to Destination)
    * Scheduled Start Date & Time
    * Actual Start Date & Time
    * Status
* **Forms**: None
* **Summary cards**:
  * Total Trips (This Month)
  * Active Trips
  * Scheduled Trips
  * Completed Trips
  * Delayed / Cancelled Trips
* **Filters**:
  * Trip Status (Scheduled, Active, Completed, Delayed, Cancelled)
  * Date Range (Date Picker: Start & End dates)
* **Search**:
  * Search Input (matches Trip ID, Vehicle Registration, or Driver Name)
* **Actions/Buttons**:
  * Create Trip (Button)
  * View Details (Row Action)
  * Update Status (Row Action)
  * Cancel Trip (Row Action)
* **Information displayed**:
  * Aggregated trip performance metrics
  * Progress updates/indicators on active trip rows

### Page Name: Create Trip
* **Purpose**: Schedule and dispatch a new trip.
* **Sections inside the page**:
  * Basic Trip Information
  * Route Configuration
  * Resource Allocation (Vehicle & Driver)
* **Forms**:
  * Create Trip Form:
    * Route Origin Address (Input Field)
    * Route Destination Address (Input Field)
    * Scheduled Start Date & Time (DateTime Input)
    * Scheduled End Date & Time (DateTime Input)
    * Estimated Distance (Number Input)
    * Assigned Vehicle (Dropdown of available/idle vehicles)
    * Assigned Driver (Dropdown of available/idle drivers)
    * Cargo / Passenger Payload Details (Text Input)
    * Special Instructions / Notes (TextArea)
* **Tables**: None
* **Summary cards**: None
* **Filters**: None
* **Search**: None
* **Actions/Buttons**:
  * Dispatch / Create Trip (Button)
  * Save as Draft (Button)
  * Cancel (Button)
* **Information displayed**:
  * Real-time availability alerts when selecting vehicles or drivers to prevent double-booking

### Page Name: Trip Details
* **Purpose**: Inspect the real-time or historical record of a single trip.
* **Sections inside the page**:
  * Trip Overview Header
  * Assigned Fleet Resources
  * Route Milestone & Status Timeline
  * Associated Operational Expenses
* **Tables**:
  * Trip Expenses Table:
    * Expense ID
    * Category (Fuel, Toll, Allowance, Parking)
    * Description
    * Cost Amount
* **Forms**: None
* **Summary cards**:
  * Current Trip Status
  * Expected vs. Actual Time Elapsed
  * Estimated Remaining Time (if active)
  * Cumulative Trip Cost
* **Filters**: None
* **Search**: None
* **Actions/Buttons**:
  * Edit Trip (Button)
  * Record Expense (Button - opens expense entry modal/redirects)
  * Complete Trip / Log Arrival (Button)
  * Back to Trip List (Button)
* **Information displayed**:
  * Route tracking coordinates and timestamps
  * Total distance traveled (Actual vs. Estimated)
  * Driver information card with direct contact details

---

## 6. Maintenance

### Page Name: Maintenance List
* **Purpose**: Manage scheduled and unscheduled vehicle services, repairs, and inspections.
* **Sections inside the page**:
  * Maintenance Activity Summary
  * Search & Filtering Controls
  * Service Order Directory
* **Tables**:
  * Maintenance Table:
    * Work Order ID
    * Vehicle Registration
    * Service Type
    * Scheduled Date
    * Completion Date
    * Cost
    * Status
* **Forms**: None
* **Summary cards**:
  * Active Work Orders
  * Upcoming Maintenance
  * Vehicles in Shop
  * Completed Maintenance (Current Month)
  * Cumulative Maintenance Cost (Current Month)
* **Filters**:
  * Service Status (Scheduled, In Progress, Completed, Cancelled)
  * Service Type (Routine Service, Repair, Inspection, Bodywork, Accident Recovery)
* **Search**:
  * Search Input (matches Work Order ID or Vehicle Registration)
* **Actions/Buttons**:
  * Create Maintenance (Button)
  * View Details (Row Action)
  * Complete Maintenance (Row Action)
* **Information displayed**:
  * Total maintenance cost sum for active filter selection
  * Flag indicator for overdue/delayed service orders

### Page Name: Create Maintenance
* **Purpose**: Schedule new maintenance tasks or log repair work orders for vehicles.
* **Sections inside the page**:
  * Work Order Creation Form
  * Cost & Vendor Estimation
* **Forms**:
  * Create Maintenance Form:
    * Vehicle Assignment (Dropdown of all registered vehicles)
    * Service Type (Dropdown: Routine Service, Repair, Inspection, Bodywork, Tire Change, Engine Check)
    * Severity / Priority (Dropdown: Low, Medium, High, Critical)
    * Scheduled Start Date & Time (DateTime Input)
    * Estimated Service Duration in Hours/Days (Number Input)
    * Details of Issue / Checklist (TextArea)
    * Service Provider / Workshop Name (Input Field)
    * Estimated Cost (Number Input)
* **Tables**: None
* **Summary cards**: None
* **Filters**: None
* **Search**: None
* **Actions/Buttons**:
  * Create Work Order (Button)
  * Cancel (Button)
* **Information displayed**:
  * Target vehicle information snippet when selected (Model, Odometer reading)

### Page Name: Maintenance Details
* **Purpose**: Review a specific maintenance activity, repair steps, invoice data, and parts utilized.
* **Sections inside the page**:
  * Work Order General Information
  * Diagnostics & Action Taken
  * Resources & Parts Breakdown
  * Invoice & Cost Reconciliation
* **Tables**:
  * Parts and Labor Cost Breakdown Table:
    * Part Name / Labor Description
    * Quantity / Hours Worked
    * Unit Price / Hourly Rate
    * Total Line Cost
* **Forms**: None
* **Summary cards**:
  * Total Maintenance Cost (Parts + Labor)
  * Service Status Badge
  * Days Spent In Workshop
* **Filters**: None
* **Search**: None
* **Actions/Buttons**:
  * Edit Work Order (Button)
  * Mark Service Completed (Button - triggers odometer update and returns vehicle to Available status)
  * Back to Maintenance List (Button)
* **Information displayed**:
  * Diagnosis logs from mechanics
  * Attachment placeholder for digital invoice/service certificate

---

## 7. Fuel & Expense Management

### Page Name: Fuel Logs
* **Purpose**: Track all fuel transactions, quantities, efficiency metrics, and associated receipts.
* **Sections inside the page**:
  * Fuel Efficiency Overview
  * Search & Filters Panel
  * Fuel Logs Directory Table
* **Tables**:
  * Fuel Log Table:
    * Log ID
    * Date
    * Vehicle Registration
    * Driver Name
    * Fuel Quantity (Liters)
    * Total Cost
    * Odometer Reading at Refill
    * Fuel Station/Location
* **Forms**: None
* **Summary cards**:
  * Total Fuel Expenditure (This Month)
  * Total Liters Refueled (This Month)
  * Average Cost per Liter (This Month)
  * Fleet Fuel Economy Rating (Average km/L)
* **Filters**:
  * Date Range Selection (Start/End Date picker)
  * Fuel Type Filter (Diesel, Petrol, Biofuel)
* **Search**:
  * Search Input (matches Log ID, Vehicle Registration, or Driver Name)
* **Actions/Buttons**:
  * Add Expense (Button - redirects to Add Expense page pre-configured with the Fuel category)
  * Export Log (Button - exports CSV/PDF)
* **Information displayed**:
  * Detailed logs of each fuel stop, showing fueling location and corresponding price

### Page Name: Expense Logs
* **Purpose**: View and filter general operational costs related to the transport platform.
* **Sections inside the page**:
  * Cost Allocation Breakdown
  * Search & Filters Panel
  * Expense Log Table
* **Summary cards**:
  * Total General Expenses (This Month)
  * Tolls & Permits Expenses Total
  * Driver Allowances Expenses Total
  * Pending Approval Count
* **Filters**:
  * Expense Category (Toll, Permit, Insurance, Driver Allowance, Maintenance, Fuel, Miscellaneous)
  * Approval Status (Pending, Approved, Rejected)
  * Date Range (Start/End Date picker)
* **Search**:
  * Search Input (matches Expense ID, Reference/Invoice Number, or Vehicle Registration)
* **Actions/Buttons**:
  * Add Expense (Button)
  * Approve Expense (Row Action for administrators)
  * Reject Expense (Row Action for administrators)
* **Information displayed**:
  * Total cumulative expenses for current filtered view
  * Digital receipt upload preview placeholder

### Page Name: Add Expense
* **Purpose**: Record a new expense incurred during fleet operations.
* **Sections inside the page**:
  * Expense Record Form
  * Proof of Purchase / Receipt Upload
* **Forms**:
  * Add Expense Form:
    * Date of Transaction (Date Input)
    * Expense Category (Dropdown: Fuel, Tolls, Parking, Maintenance, Insurance, Driver Allowance, Miscellaneous)
    * Vehicle Association (Dropdown: Optional - list of vehicles)
    * Driver Association (Dropdown: Optional - list of drivers)
    * Trip Association (Dropdown: Optional - list of trips)
    * Total Amount (Number Input)
    * Payment Method (Dropdown: Cash, Company Card, Fuel Card, Reimbursement)
    * Reference / Invoice Number (Input Field)
    * Description / Details (TextArea)
* **Tables**: None
* **Summary cards**: None
* **Filters**: None
* **Search**: None
* **Actions/Buttons**:
  * Save Expense (Button)
  * Cancel (Button)
* **Information displayed**:
  * Form completion indicators

---

## 8. Reports & Analytics

### Page Name: Reports & Analytics
* **Purpose**: Generate and view detailed intelligence reports on fleet performance, driver behavior, costs, and utilization.
* **Sections inside the page**:
  * Ready-to-Run Reports Library
  * Custom Report Generator
  * Generated Reports History
* **Tables**:
  * Reports History Table:
    * Report Name
    * Category (Fleet, Driver, Trip, Financial, Maintenance)
    * Generation Timestamp
    * Generated By (User)
    * Export Format
* **Forms**:
  * Report Configuration Form:
    * Report Template Select (Dropdown: Fleet Utilization, Driver Safety & Idle Scorecard, Maintenance Cost Analysis, Fuel Economy & Costs, Trip Profitability)
    * Parameters Date Range (Date Picker)
    * Scope / Filtering Level (Dropdown/Multiselect: Fleet Group, Individual Vehicle, Driver Group, Individual Driver)
    * Export Format (Dropdown: PDF, CSV, Excel)
* **Summary cards**:
  * Total Reports Generated (Current month)
  * Scheduled Automated Reports Active
* **Filters**:
  * Category Filter (Tabs / Select: Fleet, Driver, Trip, Maintenance, Financials)
* **Search**:
  * Search Input (matches Report template names)
* **Actions/Buttons**:
  * Run Report (Button)
  * Schedule Report (Button - Configures recurring emails)
  * Download Report (Row Action)
  * Delete Report (Row Action)
* **Information displayed**:
  * Summaries of what each standard report template evaluates:
    * *Fleet Utilization*: Vehicle uptime versus downtime in shop.
    * *Driver Scorecard*: Safety events, total distance, and idle times.
    * *Maintenance Cost*: Total cost breakdown by parts, labor, and category.
    * *Fuel Economy*: Total consumption compared across routes and models.
    * *Trip Profitability*: Overall route expenditures versus planned trip budget.

---

## 9. Settings

### Page Name: Settings
* **Purpose**: Configure system-wide application settings, preferences, thresholds, and integrations.
* **Sections inside the page**:
  * General Organization Preferences
  * Fleet Thresholds & Warnings
  * User & Access Management (RBAC)
* **Tables**:
  * Users Directory Table:
    * User Full Name
    * Email Address
    * Role (Admin, Fleet Manager, Dispatcher, Driver, Viewer)
    * Status (Active, Inactive)
* **Forms**:
  * Organization Details Form:
    * Organization / Company Name (Input Field)
    * Default Timezone (Dropdown)
    * Unit Measurement Preference (Dropdown: Metric (km/L, kg) or Imperial (MPG, lbs))
  * Threshold Configurations Form:
    * Speeding Alarm Trigger Limit (Number Input - km/h or mph)
    * Max Engine Idle Threshold (Number Input - Minutes)
    * Low Fuel Warning Trigger (Number Input - % of tank capacity)
    * Service Notice Period (Number Input - Days or Kilometers remaining before scheduled maintenance date)
  * Add System User Form:
    * Full Name (Input Field)
    * Email Address (Input Field)
    * Access Role (Dropdown: Admin, Fleet Manager, Dispatcher, Viewer)
* **Tables**: None
* **Summary cards**: None
* **Filters**: None
* **Search**: None
* **Actions/Buttons**:
  * Save System Configurations (Button)
  * Create New User (Button)
  * Edit User Permissions (Row Action)
  * Deactivate User Account (Row Action)
* **Information displayed**:
  * Clear operational descriptions of thresholds and rules
  * Current organization license metadata or expiration info

---

## 10. Profile

### Page Name: Profile
* **Purpose**: View and manage individual user account details, credentials, and notification preferences.
* **Sections inside the page**:
  * User Identity Information
  * Security & Authentication Credentials
  * User Notifications Settings
* **Forms**:
  * Update Identity Form:
    * First Name (Input Field)
    * Last Name (Input Field)
    * Work Email Address (Input Field)
    * Telephone/Mobile Number (Input Field)
  * Security Configuration Form:
    * Current Password (Password Input Field)
    * New Password (Password Input Field)
    * Confirm New Password (Password Input Field)
  * Notification Preferences Form:
    * Email Alerts (Checkbox: Maintenance Alerts, Fuel Log Approval requests, Over-speeding notifications)
    * Desktop / Push Alerts (Checkbox: Route Delay warning, New Expense added)
* **Tables**: None
* **Summary cards**: None
* **Filters**: None
* **Search**: None
* **Actions/Buttons**:
  * Save Identity Changes (Button)
  * Change Password (Button)
  * Save Alerts Preferences (Button)
  * Log Out (Button)
* **Information displayed**:
  * Personal username
  * User security role level
  * Account creation date
  * Last recorded login timestamp
