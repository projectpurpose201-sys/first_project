import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppStateProvider, useAppState } from './contexts/AppStateContext';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { RideBooking } from './components/passenger/RideBooking';
import { DriverDashboard } from './components/driver/DriverDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Navigation } from './components/layout/Navigation';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { RoleSelection } from './components/auth/RoleSelection';
import { PassengerHistory } from './components/passenger/PassengerHistory';
import { PassengerProfile } from './components/passenger/PassengerProfile';
import { DriverRides } from './components/driver/DriverRides';
import { DriverProfile } from './components/driver/DriverProfile';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const { currentView } = useAppState();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    if (currentView === 'role-selection') return <RoleSelection />;
    if (currentView === 'login') return <LoginForm />;
    if (currentView === 'signup') return <SignupForm />;
    return <RoleSelection />; // Fallback
  }

  const renderUserContent = () => {
    switch (user.role) {
      case 'passenger':
        return <PassengerApp />;
      case 'driver':
        return <DriverApp />;
      case 'admin':
        return <AdminApp />;
      default:
        return <RoleSelection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderUserContent()}
    </div>
  );
};

const PassengerApp: React.FC = () => {
  const { passengerView, setPassengerView } = useAppState();

  const renderContent = () => {
    switch (passengerView) {
      case 'Home':
        return <RideBooking />;
      case 'History':
        return <PassengerHistory />;
      case 'Profile':
        return <PassengerProfile />;
      case 'Settings':
        return <div className="p-4"><h1 className="text-xl font-bold">Settings</h1><p>Settings page coming soon.</p></div>;
      default:
        return <RideBooking />;
    }
  };

  return (
    <div className="pb-20">
      <div className="bg-gradient-primary text-white p-6">
        <h1 className="text-2xl font-bold">Book Your Ride</h1>
        <p className="text-white/90">Fast, reliable, and affordable</p>
      </div>
      <div className="p-4 -mt-4">
        {renderContent()}
      </div>
      <Navigation activeView={passengerView} onNavigate={(view) => setPassengerView(view as any)} />
    </div>
  );
};

const DriverApp: React.FC = () => {
  const { driverView, setDriverView } = useAppState();

  const renderContent = () => {
    switch (driverView) {
      case 'Dashboard':
        return <DriverDashboard />;
      case 'Rides':
        return <DriverRides />;
      case 'Profile':
        return <DriverProfile />;
      case 'Location':
         return <div className="p-4"><h1 className="text-xl font-bold">My Location</h1><p>Location page coming soon.</p></div>;
      default:
        return <DriverDashboard />;
    }
  };

  return (
    <div className="pb-20">
      <div className="bg-gradient-secondary text-white p-6">
        <h1 className="text-2xl font-bold">Driver Dashboard</h1>
        <p className="text-white/90">Manage your rides and earnings</p>
      </div>
      <div className="p-4 -mt-4">
        {renderContent()}
      </div>
      <Navigation activeView={driverView} onNavigate={(view) => setDriverView(view as any)} />
    </div>
  );
};

const AdminApp: React.FC = () => {
  const { adminView, setAdminView } = useAppState();
  return (
    <div className="pb-20">
      <div className="bg-gradient-accent text-white p-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p className="text-white/90">Monitor and manage the platform</p>
      </div>
      <div className="p-4 -mt-4">
        <AdminDashboard />
      </div>
      <Navigation activeView={adminView} onNavigate={(view) => setAdminView(view as any)} />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppStateProvider>
          <AppContent />
        </AppStateProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
