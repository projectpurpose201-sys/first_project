import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Car, DollarSign, AlertTriangle, Eye, Ban, Check, X } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { mockDrivers, mockRides } from '../../utils/mockData';
import { formatCurrency } from '../../utils/fareCalculator';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'drivers' | 'rides' | 'reports'>('overview');
  const [pendingDrivers] = useState(mockDrivers.filter(d => !d.isApproved));

  const stats = {
    totalRides: mockRides.length,
    activeDrivers: mockDrivers.filter(d => d.isOnline).length,
    totalEarnings: mockRides.reduce((sum, ride) => sum + ride.fare, 0),
    pendingApprovals: pendingDrivers.length,
  };

  const handleApproveDriver = (driverId: string) => {
    console.log('Approving driver:', driverId);
  };

  const handleRejectDriver = (driverId: string) => {
    console.log('Rejecting driver:', driverId);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card hover>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Car className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalRides}</p>
              <p className="text-sm text-gray-600">Total Rides</p>
            </div>
          </div>
        </Card>
        
        <Card hover>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.activeDrivers}</p>
              <p className="text-sm text-gray-600">Active Drivers</p>
            </div>
          </div>
        </Card>
        
        <Card hover>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalEarnings)}</p>
              <p className="text-sm text-gray-600">Total Earnings</p>
            </div>
          </div>
        </Card>
        
        <Card hover>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingApprovals}</p>
              <p className="text-sm text-gray-600">Pending Approvals</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {mockRides.slice(0, 5).map((ride) => (
            <div key={ride.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Ride #{ride.id.slice(0, 8)}</p>
                <p className="text-sm text-gray-600">
                  {ride.pickup.address} → {ride.destination.address}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatCurrency(ride.fare)}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  ride.status === 'completed' ? 'bg-green-100 text-green-800' :
                  ride.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {ride.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderDrivers = () => (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold mb-4">Pending Driver Approvals</h3>
        <div className="space-y-4">
          {pendingDrivers.map((driver) => (
            <div key={driver.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={driver.avatar}
                    alt={driver.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{driver.name}</h4>
                    <p className="text-sm text-gray-600">{driver.phone}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Eye}
                    onClick={() => console.log('View documents')}
                  >
                    View Docs
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={X}
                    className="border-red-500 text-red-600 hover:bg-red-50"
                    onClick={() => handleRejectDriver(driver.id)}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Check}
                    onClick={() => handleApproveDriver(driver.id)}
                  >
                    Approve
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Aadhaar</p>
                  <p className="font-medium">{driver.aadhaarNumber}</p>
                </div>
                <div>
                  <p className="text-gray-600">License</p>
                  <p className="font-medium">{driver.licenseNumber}</p>
                </div>
                <div>
                  <p className="text-gray-600">RC Number</p>
                  <p className="font-medium">{driver.rcNumber}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-4">All Drivers</h3>
        <div className="space-y-3">
          {mockDrivers.filter(d => d.isApproved).map((driver) => (
            <div key={driver.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <img
                  src={driver.avatar}
                  alt={driver.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{driver.name}</p>
                  <p className="text-sm text-gray-600">
                    {driver.vehicleDetails.make} {driver.vehicleDetails.model}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {formatCurrency(driver.earnings.today)}
                  </p>
                  <p className="text-xs text-gray-600">Today's earnings</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  driver.isOnline ? 'bg-green-500' : 'bg-gray-300'
                }`} />
                <Button
                  variant="outline"
                  size="sm"
                  icon={Ban}
                  onClick={() => console.log('Freeze driver')}
                  disabled={driver.isFrozen}
                >
                  {driver.isFrozen ? 'Frozen' : 'Freeze'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: DollarSign },
    { id: 'drivers', label: 'Drivers', icon: Users },
    { id: 'rides', label: 'Rides', icon: Car },
    { id: 'reports', label: 'Reports', icon: AlertTriangle },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
        
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </Card>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'drivers' && renderDrivers()}
      {activeTab === 'rides' && (
        <Card>
          <h3 className="text-lg font-semibold mb-4">All Rides</h3>
          <p className="text-gray-600">Ride management interface would be implemented here...</p>
        </Card>
      )}
      {activeTab === 'reports' && (
        <Card>
          <h3 className="text-lg font-semibold mb-4">Reports & Analytics</h3>
          <p className="text-gray-600">Reports and analytics dashboard would be implemented here...</p>
        </Card>
      )}
    </div>
  );
};
