# TransitOps – Page Hierarchy and Navigation Structure

## 1. Authentication
* **Main Page**: None
* **Child Pages**:
  * **Login**
    * *Purpose*: Authenticate authorized system users (Fleet Manager, Dispatcher, Safety Officer, Financial Analyst) to grant access to the platform.

---

## 2. Dashboard
* **Main Page**: **Dashboard**
  * *Purpose*: Provide a centralized operational dashboard displaying key performance indicators, active trips, and critical alert feeds.
* **Child Pages**: None

---

## 3. Fleet
* **Main Page**: **Vehicle List**
  * *Purpose*: View and search the entire directory of registered vehicles, showing registration numbers, types, and current operational states.
* **Child Pages**:
  * **Add Vehicle**
    * *Purpose*: Register a new vehicle, specifying make, license plate, fuel parameters, and loading capacities.
  * **Edit Vehicle**
    * *Purpose*: Modify specifications or change the operational status of an existing vehicle.
  * **Vehicle Details**
    * *Purpose*: View detailed information, active driver assignments, fuel log histories, and maintenance records of a single vehicle.

---

## 4. Drivers
* **Main Page**: **Driver List**
  * *Purpose*: View a directory of all drivers, details on licensing, contact information, and current duty status.
* **Child Pages**:
  * **Add Driver**
    * *Purpose*: Create a profile for a new driver, entering licensing information and emergency contact records.
  * **Edit Driver**
    * *Purpose*: Update personal profiles, licensing dates, or phone numbers for registered drivers.
  * **Driver Details**
    * *Purpose*: Review driver metrics, performance tracking scores, safety incident records, and historical trip logs.

---

## 5. Trips
* **Main Page**: **Trip List**
  * *Purpose*: Monitor all scheduled, active, and completed transit runs across the organization.
* **Child Pages**:
  * **Create Trip**
    * *Purpose*: Assign an available driver and vehicle to dispatch a new transit route with destination details.
  * **Edit Trip**
    * *Purpose*: Reschedule trip times, update routes, or re-assign drivers and vehicles before/during transit.
  * **Trip Details**
    * *Purpose*: Inspect a single trip's real-time progress, timelines, route logs, and associated costs.

---

## 6. Maintenance
* **Main Page**: **Maintenance List**
  * *Purpose*: Overview all pending, scheduled, active, and completed vehicle service records and work orders.
* **Child Pages**:
  * **Create Maintenance**
    * *Purpose*: Schedule a vehicle for routine service, inspection, or register a breakdown repair request.
  * **Edit Maintenance**
    * *Purpose*: Update schedule dates, workshop/vendor assignments, issue logs, or costs on a work order.
  * **Maintenance Details**
    * *Purpose*: Inspect specific repair checklists, part replacements, labor invoices, and mechanics' diagnoses.

---

## 7. Fuel
* **Main Page**: **Fuel Log List**
  * *Purpose*: View all recorded fuel refill transactions, costs, and corresponding odometer readings across the fleet.
* **Child Pages**:
  * **Add Fuel Log**
    * *Purpose*: Log a new fueling transaction, specifying fuel quantity, unit cost, vehicle, and current odometer reading.
  * **Edit Fuel Log**
    * *Purpose*: Modify fuel details, corrections to price, quantity, or odometer fields for an existing transaction.
  * **Fuel Log Details**
    * *Purpose*: Review the full breakdown of a fuel receipt and verify fuel economy metrics calculated for that fill-up.

---

## 8. Analytics
* **Main Page**: **Analytics Overview**
  * *Purpose*: Access standard analytical report templates such as vehicle utilization reports, fuel expenses, and driver scorecards.
* **Child Pages**: None

---

## 9. Settings
* **Main Page**: **System Settings**
  * *Purpose*: Configure global settings, set thresholds (speed limits, low-fuel alarms, idle timers), and manage user accounts.
* **Child Pages**: None

---

## 10. Profile
* **Main Page**: **User Profile**
  * *Purpose*: Manage personal user details, update login passwords, and configure notification preferences.
* **Child Pages**: None

---

# Role-wise Page Access Matrix

The following matrix defines page accessibility by user role (`✓` denotes full access, `R` denotes Read-Only access, and `-` denotes no access):

| Module | Page | Fleet Manager | Dispatcher | Safety Officer | Financial Analyst |
|---|---|:---:|:---:|:---:|:---:|
| **Authentication** | Login | ✓ | ✓ | ✓ | ✓ |
| **Dashboard** | Dashboard | ✓ | ✓ | ✓ | ✓ |
| **Fleet** | Vehicle List | ✓ | ✓ | ✓ | ✓ |
| | Add Vehicle | ✓ | - | - | - |
| | Edit Vehicle | ✓ | - | - | - |
| | Vehicle Details | ✓ | ✓ | ✓ | ✓ |
| **Drivers** | Driver List | ✓ | ✓ | ✓ | ✓ |
| | Add Driver | ✓ | - | - | - |
| | Edit Driver | ✓ | - | - | - |
| | Driver Details | ✓ | ✓ | ✓ | ✓ |
| **Trips** | Trip List | ✓ | ✓ | ✓ | ✓ |
| | Create Trip | ✓ | ✓ | - | - |
| | Edit Trip | ✓ | ✓ | - | - |
| | Trip Details | ✓ | ✓ | ✓ | ✓ |
| **Maintenance** | Maintenance List | ✓ | ✓ | ✓ | ✓ |
| | Create Maintenance | ✓ | - | ✓ | - |
| | Edit Maintenance | ✓ | - | ✓ | - |
| | Maintenance Details | ✓ | ✓ | ✓ | ✓ |
| **Fuel** | Fuel Log List | ✓ | ✓ | ✓ | ✓ |
| | Add Fuel Log | ✓ | ✓ | - | ✓ |
| | Edit Fuel Log | ✓ | - | - | ✓ |
| | Fuel Log Details | ✓ | ✓ | ✓ | ✓ |
| **Analytics** | Analytics Overview | ✓ | ✓ | ✓ | ✓ |
| **Settings** | System Settings | ✓ | - | - | - |
| **Profile** | User Profile | ✓ | ✓ | ✓ | ✓ |
