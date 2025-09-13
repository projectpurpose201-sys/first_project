import React from 'react';
import { motion } from 'framer-motion';
import { Users, Car, Shield } from 'lucide-react';
import { useAppState } from '../../contexts/AppStateContext';

export const RoleSelection: React.FC = () => {
  const { goToLogin } = useAppState();

  const roles = [
    { 
      role: 'passenger' as const, 
      title: 'Passenger', 
      subtitle: 'Book rides instantly',
      icon: Users,
      gradient: 'bg-gradient-primary'
    },
    { 
      role: 'driver' as const, 
      title: 'Driver', 
      subtitle: 'Start earning with every ride',
      icon: Car,
      gradient: 'bg-gradient-secondary'
    },
    { 
      role: 'admin' as const, 
      title: 'Admin', 
      subtitle: 'Manage the platform',
      icon: Shield,
      gradient: 'bg-gradient-accent'
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-primary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-6"
      >
        <div className="text-center text-white mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold mb-2"
          >
            RideShare
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/90"
          >
            Choose your role to continue
          </motion.p>
        </div>
        
        <div className="space-y-4">
          {roles.map((option, index) => (
            <motion.button
              key={option.role}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => goToLogin(option.role)}
              className="w-full p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all text-left group"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 ${option.gradient} rounded-lg group-hover:scale-110 transition-transform`}>
                  <option.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{option.title}</h3>
                  <p className="text-gray-600">{option.subtitle}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
