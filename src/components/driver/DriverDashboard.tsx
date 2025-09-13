import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, DollarSign, Star, Clock, Check, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { formatCurrency } from '../../utils/fareCalculator';
import { Map } from '../ui/Map';

const VANIYAMBADI_CENTER: [number, number] = [12.6835, 78.6275];

export const DriverDashboard: React.FC = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [hasRideRequest, setHasRideRequest] = useState(true);

  const todayEarnings = 850;
  const totalRides = 12;
  const rating = 4.7;
  const commission = 85;

  const rideRequest = {
    passengerName: 'Priya Sharma',
    passengerRating: 4.9,
    pickup: 'Connaught Place Metro Station',
    destination: 'IGI Airport Terminal 3',
    fare: 230,
    pickupCoords: [12.6870, 78.6250] as [number, number],
    destCoords: [12.6930, 78.6390] as [number, number],
  };

  const handleAcceptRide = () => setHasRideRequest(false);
  const handleRejectRide = () => setHasRideRequest(false);

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Driver Status</h2>
            <p className="text-gray-600">You are currently {isOnline ? 'online' : 'offline'}</p>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsOnline(!isOnline)} className={`w-16 h-8 rounded-full p-1 transition-colors ${isOnline ? 'bg-green-500' : 'bg-gray-300'}`}>
            <motion.div animate={{ x: isOnline ? 32 : 0 }} className="w-6 h-6 bg-white rounded-full shadow-md" />
          </motion.button>
        </div>
      </Card>

      {hasRideRequest && isOnline && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="border-4 border-primary-500 rounded-xl">
          <Card className="border-0">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-primary-600">New Ride Request!</h3>
              <div className="text-3xl font-bold text-gray-900 mt-2">{formatCurrency(rideRequest.fare)}</div>
            </div>
            <div className="mb-4">
              <Map center={VANIYAMBADI_CENTER} zoom={14} markers={[{position: rideRequest.pickupCoords, popupText: "Pickup"}, {position: rideRequest.destCoords, popupText: "Drop"}]} route={[rideRequest.pickupCoords, rideRequest.destCoords]} className="h-48 w-full rounded-lg" />
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" size="lg" className="flex-1 border-red-500 text-red-600 hover:bg-red-50" icon={X} onClick={handleRejectRide}>Reject</Button>
              <Button variant="primary" size="lg" className="flex-1 bg-green-500 hover:bg-green-600" icon={Check} onClick={handleAcceptRide}>Accept</Button>
            </div>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card hover><div className="text-center"><DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" /><p className="text-2xl font-bold text-gray-900">{formatCurrency(todayEarnings)}</p><p className="text-sm text-gray-600">Today's Earnings</p></div></Card>
        <Card hover><div className="text-center"><Car className="w-8 h-8 text-blue-500 mx-auto mb-2" /><p className="text-2xl font-bold text-gray-900">{totalRides}</p><p className="text-sm text-gray-600">Rides</p></div></Card>
        <Card hover><div className="text-center"><Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" /><p className="text-2xl font-bold text-gray-900">{rating}</p><p className="text-sm text-gray-600">Rating</p></div></Card>
        <Card hover><div className="text-center"><Clock className="w-8 h-8 text-purple-500 mx-auto mb-2" /><p className="text-2xl font-bold text-gray-900">8.5h</p><p className="text-sm text-gray-600">Online</p></div></Card>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <div><h3 className="text-lg font-semibold text-gray-900">Commission Due</h3><p className="text-sm text-gray-600">10% of today's earnings</p></div>
          <div className="text-right"><p className="text-2xl font-bold text-red-600">{formatCurrency(commission)}</p><Button variant="primary" size="sm" className="mt-2">Pay Now</Button></div>
        </div>
      </Card>
    </div>
  );
};
