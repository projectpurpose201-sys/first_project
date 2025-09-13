import React from 'react';
import { Card } from '../ui/Card';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Phone, Edit } from 'lucide-react';
import { Button } from '../ui/Button';

export const PassengerProfile: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">My Profile</h1>
      <Card>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <img
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=0ea5e9&color=fff`}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <Button size="sm" className="absolute bottom-0 right-0 !p-2 rounded-full">
              <Edit className="w-4 h-4" />
            </Button>
          </div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          
          <div className="w-full space-y-3 text-left pt-4 border-t">
            <div className="flex items-center space-x-3 text-gray-600">
              <Mail className="w-5 h-5" />
              <span>{user.email || 'No email provided'}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Phone className="w-5 h-5" />
              <span>{user.phone || 'No phone provided'}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
