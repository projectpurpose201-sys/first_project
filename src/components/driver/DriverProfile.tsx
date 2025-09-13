import React from 'react';
import { Card } from '../ui/Card';
import { useAuth } from '../../contexts/AuthContext';
import { generateMockDriver } from '../../utils/mockData';
import { Star, ShieldCheck, Edit, Car } from 'lucide-react';
import { Button } from '../ui/Button';

const mockDriverData = generateMockDriver();

export const DriverProfile: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Driver Profile</h1>
      <Card>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <img
              src={mockDriverData.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <Button size="sm" className="absolute bottom-0 right-0 !p-2 rounded-full">
              <Edit className="w-4 h-4" />
            </Button>
          </div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-yellow-500">
              <Star className="w-5 h-5 fill-current" />
              <span className="text-lg font-bold text-gray-800">{mockDriverData.rating}</span>
            </div>
            <span className="text-gray-500">•</span>
            <div className="flex items-center space-x-1 text-green-600">
              <ShieldCheck className="w-5 h-5 fill-current" />
              <span className="text-sm font-medium">KYC Verified</span>
            </div>
          </div>
          
          <div className="w-full space-y-3 text-left pt-4 border-t">
             <div className="flex items-center space-x-3 text-gray-600">
              <Car className="w-5 h-5" />
              <span>{mockDriverData.vehicleDetails.make} {mockDriverData.vehicleDetails.model} ({mockDriverData.vehicleDetails.licensePlate})</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
