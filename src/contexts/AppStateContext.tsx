import React, { createContext, useContext, useState } from 'react';

type Role = 'passenger' | 'driver' | 'admin';
type AppView = 'role-selection' | 'login' | 'signup' | 'app';
type PassengerView = 'Home' | 'History' | 'Profile' | 'Settings';
type DriverView = 'Dashboard' | 'Rides' | 'Location' | 'Profile';
type AdminView = 'Dashboard' | 'Drivers' | 'Rides' | 'Settings';

interface AppStateContextType {
  currentView: AppView;
  selectedRole: Role | null;
  passengerView: PassengerView;
  driverView: DriverView;
  adminView: AdminView;
  setCurrentView: (view: AppView) => void;
  setSelectedRole: (role: Role | null) => void;
  setPassengerView: (view: PassengerView) => void;
  setDriverView: (view: DriverView) => void;
  setAdminView: (view: AdminView) => void;
  goToRoleSelection: () => void;
  goToLogin: (role: Role) => void;
  goToSignup: (role: Role) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('role-selection');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  
  // Sub-navigation states
  const [passengerView, setPassengerView] = useState<PassengerView>('Home');
  const [driverView, setDriverView] = useState<DriverView>('Dashboard');
  const [adminView, setAdminView] = useState<AdminView>('Dashboard');

  const goToRoleSelection = () => {
    setCurrentView('role-selection');
    setSelectedRole(null);
  };

  const goToLogin = (role: Role) => {
    setSelectedRole(role);
    localStorage.setItem('rideshare_role', role); // Store role for persistence
    setCurrentView('login');
  };

  const goToSignup = (role: Role) => {
    setSelectedRole(role);
    localStorage.setItem('rideshare_role', role);
    setCurrentView('signup');
  }

  return (
    <AppStateContext.Provider value={{
      currentView,
      selectedRole,
      passengerView,
      driverView,
      adminView,
      setCurrentView,
      setSelectedRole,
      setPassengerView,
      setDriverView,
      setAdminView,
      goToRoleSelection,
      goToLogin,
      goToSignup,
    }}>
      {children}
    </AppStateContext.Provider>
  );
};
