import React from 'react';
import { Card } from '../ui/Card';
import { mockRides } from '../../utils/mockData';
import { formatCurrency } from '../../utils/fareCalculator';
import { Car, Calendar } from 'lucide-react';

export const DriverRides: React.FC = () => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">My Ride History</h1>
      <div className="space-y-4">
        {mockRides.slice(5, 10).map(ride => (
          <Card key={ride.id} padding="md">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-800 flex items-center gap-2">
                  <Car className="w-4 h-4 text-primary-500" />
                  Ride #{ride.id.substring(0, 8)}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4" />
                  {ride.completedAt?.toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-green-600">+{formatCurrency(ride.fare)}</p>
                <p className="text-xs text-gray-500">{ride.distance} km</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
