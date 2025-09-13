import React from 'react';
import { motion } from 'framer-motion';
import { Home, Car, User, Settings, LogOut, Shield, Clock, MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface NavigationProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeView, onNavigate }) => {
  const { user, logout } = useAuth();

  const getNavItems = () => {
    switch (user?.role) {
      case 'passenger':
        return [
          { icon: Home, label: 'Home' },
          { icon: Clock, label: 'History' },
          { icon: User, label: 'Profile' },
          { icon: Settings, label: 'Settings' },
        ];
      case 'driver':
        return [
          { icon: Home, label: 'Dashboard' },
          { icon: Car, label: 'Rides' },
          { icon: MapPin, label: 'Location' },
          { icon: User, label: 'Profile' },
        ];
      case 'admin':
        return [
          { icon: Shield, label: 'Dashboard' },
          { icon: User, label: 'Drivers' },
          { icon: Car, label: 'Rides' },
          { icon: Settings, label: 'Settings' },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item, index) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onNavigate(item.label)}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors w-16 ${
              activeView === item.label
                ? 'text-primary-600 bg-primary-50'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </motion.button>
        ))}
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: navItems.length * 0.1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={logout}
          className="flex flex-col items-center space-y-1 p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-16"
        >
          <LogOut className="w-6 h-6" />
          <span className="text-xs font-medium">Logout</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
