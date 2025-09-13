import React from 'react';
import { Card } from '../ui/Card';
import { mockRides } from '../../utils/mockData';
import { formatCurrency } from '../../utils/fareCalculator';
import { Star, MapPin } from 'lucide-react';

export const PassengerHistory: React.FC = () => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">My Ride History</h1>
      <div className="space-y-4">
        {mockRides.slice(0, 5).map(ride => (
          <Card key={ride.id} padding="md">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-800">
                  {ride.pickup.address.split(',')[0]} to {ride.destination.address.split(',')[0]}
                </p>
                <p className="text-sm text-gray-500">
                  {ride.completedAt?.toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-primary-600">{formatCurrency(ride.fare)}</p>
                {ride.rating && (
                  <div className="flex items-center justify-end space-x-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{ride.rating}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
