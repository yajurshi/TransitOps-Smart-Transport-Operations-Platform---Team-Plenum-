import React, { createContext, useContext, useState } from 'react';

// Types
























































































const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('Dashboard');
  const [selectedVehicleReg, setSelectedVehicleReg] = useState(null);
  const [selectedDriverName, setSelectedDriverName] = useState(null);
  const [selectedTripId, setSelectedTripId] = useState(null);
  const [selectedMaintenanceId, setSelectedMaintenanceId] = useState(null);

  // Initial Seed Data
  const [vehicles, setVehicles] = useState([
  { reg: 'GJ-01-AB-1234', name: 'Tata Ace Gold', type: 'Heavy Duty', capacity: 15000, odometer: 124500, status: 'On Trip', region: 'Ahmedabad Zone', assignedTripId: 'TR-1001' },
  { reg: 'GJ-18-CD-9081', name: 'Tata Intra V30', type: 'Van', capacity: 3500, odometer: 45200, status: 'Available', region: 'Surat Zone' },
  { reg: 'GJ-27-EF-5678', name: 'Ashok Leyland Dost+', type: 'Sedan', capacity: 800, odometer: 18900, status: 'Available', region: 'Vadodara Zone' },
  { reg: 'GJ-05-KL-3210', name: 'Mahindra Bolero Pickup', type: 'Heavy Duty', capacity: 18000, odometer: 245000, status: 'In Shop', region: 'Rajkot Zone' },
  { reg: 'GJ-06-MN-8765', name: 'Mahindra Supro', type: 'Light Truck', capacity: 2500, odometer: 87100, status: 'On Trip', region: 'Ahmedabad Zone', assignedTripId: 'TR-1005' },
  { reg: 'GJ-12-PQ-4567', name: 'Tata Intra V30', type: 'Van', capacity: 3500, odometer: 32400, status: 'Available', region: 'Surat Zone' },
  { reg: 'GJ-03-RS-8901', name: 'Ashok Leyland Dost+', type: 'Sedan', capacity: 800, odometer: 95300, status: 'On Trip', region: 'Vadodara Zone', assignedTripId: 'TR-1007' },
  { reg: 'GJ-02-XY-1122', name: 'Tata Ace Gold', type: 'Heavy Duty', capacity: 15000, odometer: 110200, status: 'Available', region: 'Rajkot Zone' },
  { reg: 'GJ-09-ZA-3344', name: 'Mahindra Supro', type: 'Light Truck', capacity: 2500, odometer: 312000, status: 'Retired', region: 'Ahmedabad Zone' },
  { reg: 'GJ-14-BC-5566', name: 'Tata Intra V30', type: 'Van', capacity: 3500, odometer: 67100, status: 'In Shop', region: 'Surat Zone' },
  { reg: 'GJ-10-DE-7788', name: 'Ashok Leyland Dost+', type: 'Sedan', capacity: 800, odometer: 12500, status: 'Available', region: 'Vadodara Zone' },
  { reg: 'GJ-11-FG-9900', name: 'Mahindra Bolero Pickup', type: 'Heavy Duty', capacity: 18000, odometer: 95000, status: 'Available', region: 'Rajkot Zone' }]
  );

  const [drivers, setDrivers] = useState([
  { name: 'Rohan Desai', licenseNumber: 'GJ0120200001234', licenseCategory: 'Heavy Rig', expiryDate: '2029-04-12', safetyScore: 98, status: 'On Trip', assignedTripId: 'TR-1001' },
  { name: 'Priya Patel', licenseNumber: 'GJ0520210045678', licenseCategory: 'Light Commercial', expiryDate: '2028-11-20', safetyScore: 94, status: 'Available' },
  { name: 'Karan Mehta', licenseNumber: 'GJ1820190011223', licenseCategory: 'Standard Class', expiryDate: '2030-01-01', safetyScore: 89, status: 'Available' },
  { name: 'Vishal Shah', licenseNumber: 'GJ2720230088990', licenseCategory: 'Heavy Rig', expiryDate: '2027-08-15', safetyScore: 78, status: 'Available' },
  { name: 'Meera Joshi', licenseNumber: 'GJ0620220055443', licenseCategory: 'Light Commercial', expiryDate: '2029-06-30', safetyScore: 96, status: 'On Trip', assignedTripId: 'TR-1005' },
  { name: 'Rahul Shah', licenseNumber: 'GJ1220180099887', licenseCategory: 'Light Commercial', expiryDate: '2028-03-14', safetyScore: 91, status: 'Available' },
  { name: 'Devang Patel', licenseNumber: 'GJ0320210066778', licenseCategory: 'Standard Class', expiryDate: '2032-10-18', safetyScore: 99, status: 'On Trip', assignedTripId: 'TR-1007' },
  { name: 'Nisha Desai', licenseNumber: 'GJ0220200044332', licenseCategory: 'Heavy Rig', expiryDate: '2030-05-24', safetyScore: 97, status: 'Available' },
  { name: 'Jay Patel', licenseNumber: 'GJ0920170022110', licenseCategory: 'Standard Class', expiryDate: '2029-09-09', safetyScore: 65, status: 'Suspended' },
  { name: 'Chirag Mehta', licenseNumber: 'GJ1420160011009', licenseCategory: 'Standard Class', expiryDate: '2026-03-01', safetyScore: 92, status: 'Expired License' }]
  );

  const [trips, setTrips] = useState([
  { id: 'TR-1001', source: 'Gandhinagar', destination: 'Bhavnagar', vehicleReg: 'GJ-01-AB-1234', vehicleName: 'Tata Ace Gold', driverName: 'Rohan Desai', cargoWeight: 12000, distance: 450, status: 'Dispatched', eta: '2h 15m', region: 'Ahmedabad Zone', date: '2026-07-12', notes: 'Urgent medical supplies.' },
  { id: 'TR-1002', source: 'Ahmedabad', destination: 'Surat', vehicleReg: 'GJ-18-CD-9081', vehicleName: 'Tata Intra V30', driverName: 'Priya Patel', cargoWeight: 2200, distance: 380, status: 'Completed', eta: '--', region: 'Surat Zone', date: '2026-07-11', notes: 'Completed ahead of schedule.' },
  { id: 'TR-1003', source: 'Jamnagar', destination: 'Vapi', vehicleReg: 'GJ-27-EF-5678', vehicleName: 'Ashok Leyland Dost+', driverName: 'Karan Mehta', cargoWeight: 350, distance: 350, status: 'Draft', eta: '4h 30m', region: 'Vadodara Zone', date: '2026-07-12', notes: 'Deliver document cache.' },
  { id: 'TR-1004', source: 'Bharuch', destination: 'Gandhidham', vehicleReg: 'GJ-05-KL-3210', vehicleName: 'Mahindra Bolero Pickup', driverName: 'Vishal Shah', cargoWeight: 14000, distance: 610, status: 'Draft', eta: '--', region: 'Rajkot Zone', date: '2026-07-12', notes: 'Pre-trip check pending repair.' },
  { id: 'TR-1005', source: 'Anand', destination: 'Nadiad', vehicleReg: 'GJ-06-MN-8765', vehicleName: 'Mahindra Supro', driverName: 'Meera Joshi', cargoWeight: 1800, distance: 280, status: 'Dispatched', eta: '1h 05m', region: 'Ahmedabad Zone', date: '2026-07-12' },
  { id: 'TR-1006', source: 'Rajkot', destination: 'Vadodara', vehicleReg: 'GJ-12-PQ-4567', vehicleName: 'Tata Intra V30', driverName: 'Rahul Shah', cargoWeight: 2800, distance: 380, status: 'Completed', eta: '--', region: 'Surat Zone', date: '2026-07-10' },
  { id: 'TR-1007', source: 'Bhuj', destination: 'Mundra', vehicleReg: 'GJ-03-RS-8901', vehicleName: 'Ashok Leyland Dost+', driverName: 'Devang Patel', cargoWeight: 400, distance: 130, status: 'Dispatched', eta: '45m', region: 'Vadodara Zone', date: '2026-07-12' },
  { id: 'TR-1008', source: 'Mehsana', destination: 'Palanpur', vehicleReg: 'GJ-02-XY-1122', vehicleName: 'Tata Ace Gold', driverName: 'Nisha Desai', cargoWeight: 8000, distance: 260, status: 'Draft', eta: '3h 10m', region: 'Rajkot Zone', date: '2026-07-12' }]
  );

  const [maintenance, setMaintenance] = useState([
  { id: 'MT-5001', vehicleReg: 'GJ-05-KL-3210', vehicleName: 'Mahindra Bolero Pickup', issue: 'Engine Overheating', description: 'Coolant leak and radiator crack detected during long-haul run.', repairNotes: 'Replacing radiator unit and coolant pump.', status: 'In Progress', startDate: '2026-07-10', expectedCompletion: '2026-07-14' },
  { id: 'MT-5002', vehicleReg: 'GJ-14-BC-5566', vehicleName: 'Tata Intra V30', issue: 'Brake Pad Replacement', description: 'Squealing noise reported on front brakes. Thickness checked at 3mm.', repairNotes: 'Installing premium heavy-duty front brake pads.', status: 'Scheduled', startDate: '2026-07-13', expectedCompletion: '2026-07-13' }]
  );

  // Trip Lifecycle Business Rules Functions
  const createTrip = (
  tripData,
  dispatchImmediately) =>
  {
    const nextIdNum = Math.max(...trips.map((t) => parseInt(t.id.replace('TR-', '')))) + 1;
    const newTripId = `TR-${nextIdNum}`;
    const initialStatus = dispatchImmediately ? 'Dispatched' : 'Draft';

    // Calculate simulated ETA based on distance (avg speed 60 km/h)
    const hours = Math.floor(tripData.distance / 60);
    const minutes = Math.round((tripData.distance / 60 - hours) * 60);
    const calculatedEta = dispatchImmediately ? `${hours}h ${minutes}m` : '--';

    const newTrip = {
      ...tripData,
      id: newTripId,
      status: initialStatus,
      eta: calculatedEta,
      date: new Date().toISOString().split('T')[0]
    };

    // Update trips list
    setTrips((prev) => [newTrip, ...prev]);

    // If dispatched immediately, lock vehicle and driver
    if (dispatchImmediately) {
      setVehicles((prev) =>
      prev.map((v) =>
      v.reg === tripData.vehicleReg ?
      { ...v, status: 'On Trip', assignedTripId: newTripId } :
      v
      )
      );

      setDrivers((prev) =>
      prev.map((d) =>
      d.name === tripData.driverName ?
      { ...d, status: 'On Trip', assignedTripId: newTripId } :
      d
      )
      );
    }
  };

  const dispatchTrip = (tripId) => {
    let tripInfo = null;

    setTrips((prev) =>
    prev.map((t) => {
      if (t.id === tripId) {
        tripInfo = t;
        // Calculate simulated ETA
        const hours = Math.floor(t.distance / 60);
        const minutes = Math.round((t.distance / 60 - hours) * 60);
        return { ...t, status: 'Dispatched', eta: `${hours}h ${minutes}m` };
      }
      return t;
    })
    );

    if (tripInfo) {
      const { vehicleReg, driverName } = tripInfo;
      setVehicles((prev) =>
      prev.map((v) =>
      v.reg === vehicleReg ?
      { ...v, status: 'On Trip', assignedTripId: tripId } :
      v
      )
      );

      setDrivers((prev) =>
      prev.map((d) =>
      d.name === driverName ?
      { ...d, status: 'On Trip', assignedTripId: tripId } :
      d
      )
      );
    }
  };

  const completeTrip = (tripId) => {
    let tripInfo = null;

    setTrips((prev) =>
    prev.map((t) => {
      if (t.id === tripId) {
        tripInfo = t;
        return { ...t, status: 'Completed', eta: '--' };
      }
      return t;
    })
    );

    if (tripInfo) {
      const { vehicleReg, driverName, distance } = tripInfo;

      // Update vehicle status back to Available, increment odometer by trip distance
      setVehicles((prev) =>
      prev.map((v) =>
      v.reg === vehicleReg ?
      { ...v, status: 'Available', odometer: v.odometer + distance, assignedTripId: undefined } :
      v
      )
      );

      // Update driver back to Available
      setDrivers((prev) =>
      prev.map((d) =>
      d.name === driverName ?
      { ...d, status: 'Available', assignedTripId: undefined } :
      d
      )
      );
    }
  };

  const cancelTrip = (tripId) => {
    let tripInfo = null;

    setTrips((prev) =>
    prev.map((t) => {
      if (t.id === tripId) {
        tripInfo = t;
        return { ...t, status: 'Cancelled', eta: '--' };
      }
      return t;
    })
    );

    if (tripInfo) {
      const { vehicleReg, driverName } = tripInfo;

      // Restore vehicle to Available
      setVehicles((prev) =>
      prev.map((v) =>
      v.reg === vehicleReg ? { ...v, status: 'Available', assignedTripId: undefined } : v
      )
      );

      // Restore driver to Available
      setDrivers((prev) =>
      prev.map((d) =>
      d.name === driverName ? { ...d, status: 'Available', assignedTripId: undefined } : d
      )
      );
    }
  };

  // Fleet Manager CRUD Functions
  const createVehicle = (vehicleData) => {
    if (vehicles.some((v) => v.reg === vehicleData.reg)) return false;
    if (vehicleData.capacity <= 0 || vehicleData.odometer < 0 || vehicleData.cost <= 0) return false;

    setVehicles((prev) => [...prev, { ...vehicleData, status: 'Available' }]);
    return true;
  };

  const editVehicle = (reg, vehicleData) => {
    setVehicles((prev) =>
      prev.map((v) =>
        v.reg === reg
          ? {
              ...v,
              name: vehicleData.name,
              capacity: vehicleData.capacity,
              region: vehicleData.region,
              odometer: vehicleData.odometer,
              status: vehicleData.status
            }
          : v
      )
    );
    return true;
  };

  const retireVehicle = (reg) => {
    const vehicle = vehicles.find((v) => v.reg === reg);
    if (vehicle && vehicle.status === 'On Trip') return false;

    setVehicles((prev) => prev.map((v) => (v.reg === reg ? { ...v, status: 'Retired' } : v)));
    return true;
  };

  const createMaintenance = (maintenanceData) => {
    const vehicle = vehicles.find((v) => v.reg === maintenanceData.vehicleReg);
    if (!vehicle || vehicle.status !== 'Available') return false;

    const hasActiveMaintenance = maintenance.some(
      (m) => m.vehicleReg === maintenanceData.vehicleReg && m.status !== 'Completed'
    );
    if (hasActiveMaintenance) return false;

    const maxId = maintenance.length > 0 ? Math.max(...maintenance.map((m) => parseInt(m.id.replace('MT-', '')))) : 5000;
    const newMaintenance = {
      ...maintenanceData,
      id: `MT-${maxId + 1}`,
      vehicleName: vehicle.name,
      status: 'In Progress',
      startDate: new Date().toISOString().split('T')[0]
    };

    setMaintenance((prev) => [...prev, newMaintenance]);

    setVehicles((prev) =>
      prev.map((v) => (v.reg === maintenanceData.vehicleReg ? { ...v, status: 'In Shop' } : v))
    );
    return true;
  };

  const editMaintenance = (id, data) => {
    setMaintenance((prev) => prev.map((m) => (m.id === id ? { ...m, ...data } : m)));
    return true;
  };

  const closeMaintenance = (id) => {
    const record = maintenance.find((m) => m.id === id);
    if (!record) return false;

    setMaintenance((prev) => prev.map((m) => (m.id === id ? { ...m, status: 'Completed' } : m)));

    setVehicles((prev) =>
      prev.map((v) => {
        if (v.reg === record.vehicleReg && v.status !== 'Retired') {
          return { ...v, status: 'Available' };
        }
        return v;
      })
    );
    return true;
  };

  // Driver CRUD Functions
  const createDriver = (driverData) => {
    if (drivers.some((d) => d.name === driverData.name)) return false;
    setDrivers((prev) => [{ ...driverData, status: 'Available', safetyScore: 100 }, ...prev]);
    return true;
  };

  const editDriver = (name, driverData) => {
    setDrivers((prev) =>
      prev.map((d) =>
        d.name === name ? { ...d, ...driverData } : d
      )
    );
    return true;
  };

  const suspendDriver = (name) => {
    setDrivers((prev) =>
      prev.map((d) =>
        d.name === name ? { ...d, status: 'Suspended' } : d
      )
    );
  };

  const reactivateDriver = (name) => {
    setDrivers((prev) =>
      prev.map((d) =>
        d.name === name && d.status === 'Suspended' ? { ...d, status: 'Available' } : d
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        vehicles,
        drivers,
        trips,
        maintenance,
        selectedVehicleReg,
        setSelectedVehicleReg,
        selectedDriverName,
        setSelectedDriverName,
        selectedTripId,
        setSelectedTripId,
        selectedMaintenanceId,
        setSelectedMaintenanceId,
        createTrip,
        dispatchTrip,
        completeTrip,
        cancelTrip,
        createVehicle,
        editVehicle,
        retireVehicle,
        createMaintenance,
        editMaintenance,
        closeMaintenance,
        createDriver,
        editDriver,
        suspendDriver,
        reactivateDriver
      }}>
      
      {children}
    </AppContext.Provider>);

};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};