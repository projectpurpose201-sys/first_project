import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, CreditCard, Star, Phone, Navigation, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { calculateFare, formatCurrency } from '../../utils/fareCalculator';
import { Map } from '../ui/Map';
import { UpiPayment } from './UpiPayment';

// Vaniyambadi Coordinates
const VANIYAMBADI_CENTER: [number, number] = [12.6835, 78.6275];

export const RideBooking: React.FC = () => {
  const [rideType, setRideType] = useState<'instant' | 'prebook'>('instant');
  const [pickup, setPickup] = useState('Vaniyambadi Bus Stand');
  const [destination, setDestination] = useState('Vaniyambadi Railway Station');
  const [distance] = useState(2.1); // Mock distance
  const [showDriverDetails, setShowDriverDetails] = useState(false);
  const [rideStatus, setRideStatus] = useState<'booking' | 'searching' | 'driver_found' | 'ongoing' | 'completed'>('booking');
  const [showUpiModal, setShowUpiModal] = useState(false);

  const fare = calculateFare(distance);

  const mockDriver = {
    name: 'Rajesh Kumar',
    rating: 4.8,
    vehicle: 'Maruti Swift Dzire',
    licensePlate: 'TN 23 AB 1234',
    eta: '3 mins',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  };
  
  const mapMarkers = [
      { position: [12.6870, 78.6250] as [number, number], popupText: 'Pickup: Vaniyambadi Bus Stand' },
      { position: [12.6930, 78.6390] as [number, number], popupText: 'Destination: Vaniyambadi Railway Station' }
  ];
  
  const routeLine = [mapMarkers[0].position, mapMarkers[1].position];

  const handleBookRide = () => {
    if (rideType === 'prebook') {
      setShowUpiModal(true);
      return;
    }
    
    setRideStatus('searching');
    setTimeout(() => {
      setRideStatus('driver_found');
      setShowDriverDetails(true);
    }, 2000);
  };

  const handleUpiPaymentSuccess = () => {
    setShowUpiModal(false);
    setRideStatus('searching');
    setTimeout(() => {
      setRideStatus('driver_found');
      setShowDriverDetails(true);
    }, 2000);
  }

  const handleCancelRide = () => {
    setShowDriverDetails(false);
    setRideStatus('booking');
  };

  if (rideStatus === 'searching') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-6">
        <Card>
          <div className="py-8">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Finding Your Driver...</h3>
            <p className="text-gray-600">Matching you with the nearest driver in Vaniyambadi</p>
          </div>
        </Card>
        <Button variant="outline" size="lg" fullWidth onClick={() => setRideStatus('booking')}>Cancel Search</Button>
      </motion.div>
    );
  }

  if (showDriverDetails && rideStatus === 'driver_found') {
    return (
      <AnimatePresence>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-green-600">Driver Found!</h3>
              <Button variant="ghost" size="sm" icon={X} onClick={handleCancelRide} className="text-gray-500 hover:text-red-600" />
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <img src={mockDriver.avatar} alt={mockDriver.name} className="w-16 h-16 rounded-full object-cover" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{mockDriver.name}</h3>
                <p className="text-gray-600">{mockDriver.vehicle}</p>
                <p className="text-sm text-gray-500">{mockDriver.licensePlate}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1"><Star className="w-4 h-4 text-yellow-400 fill-current" /> <span className="text-sm font-medium">{mockDriver.rating}</span></div>
                <p className="text-sm text-green-600 font-medium">Arriving in {mockDriver.eta}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm" icon={Phone} onClick={() => window.open(`tel:${mockDriver.phone}`)} className="flex-1">Call Driver</Button>
              <Button variant="secondary" size="sm" className="flex-1" icon={Navigation}>Track Live</Button>
            </div>
          </Card>
          <Card padding="sm">
            <Map center={VANIYAMBADI_CENTER} markers={mapMarkers} route={routeLine} />
          </Card>
          <Button variant="outline" size="lg" fullWidth className="border-red-500 text-red-600 hover:bg-red-50" onClick={handleCancelRide}>Cancel Ride (₹5 penalty)</Button>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="space-y-6">
      {showUpiModal && <UpiPayment amount={10} onPaymentSuccess={handleUpiPaymentSuccess} onCancel={() => setShowUpiModal(false)} />}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Book a Ride in Vaniyambadi</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setRideType('instant')} className={`p-4 rounded-lg border-2 transition-all ${rideType === 'instant' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}>
            <div className="text-center"><MapPin className="w-6 h-6 mx-auto mb-2" /><p className="font-medium">Instant Ride</p><p className="text-xs opacity-75">Book now</p></div>
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setRideType('prebook')} className={`p-4 rounded-lg border-2 transition-all ${rideType === 'prebook' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}>
            <div className="text-center"><Clock className="w-6 h-6 mx-auto mb-2" /><p className="font-medium">Prebook</p><p className="text-xs opacity-75">₹10 advance</p></div>
          </motion.button>
        </div>
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label><input type="text" value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="Enter pickup location" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Destination</label><input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Where to?" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all" /></div>
          {rideType === 'prebook' && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}><label className="block text-sm font-medium text-gray-700 mb-2">Schedule Time</label><input type="datetime-local" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all" /></motion.div>}
        </div>
      </Card>

      <AnimatePresence>
        {pickup && destination && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <Card padding="sm" className="mb-4">
              <Map center={VANIYAMBADI_CENTER} markers={mapMarkers} route={routeLine} />
            </Card>
            <Card>
              <h3 className="text-lg font-semibold mb-4">Fare Estimate</h3>
              <div className="space-y-2">
                <div className="flex justify-between"><span>Distance</span><span>{distance} km</span></div>
                <div className="flex justify-between"><span>Base Fare</span><span>{formatCurrency(fare)}</span></div>
                {rideType === 'prebook' && <div className="flex justify-between text-primary-600"><span>Advance Payment</span><span>₹10</span></div>}
                <div className="border-t pt-2 flex justify-between font-bold text-lg"><span>Total</span><span className="text-primary-600">{formatCurrency(fare)}</span></div>
              </div>
              <Button variant="primary" size="lg" fullWidth className="mt-4" icon={CreditCard} onClick={handleBookRide}>
                {rideType === 'instant' ? 'Book Ride Now' : 'Pay ₹10 to Prebook'}
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
