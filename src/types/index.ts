export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'passenger' | 'driver' | 'admin';
  avatar?: string;
  rating?: number;
  totalRides?: number;
  createdAt: Date;
}

export interface Driver extends User {
  role: 'driver';
  aadhaarNumber: string;
  rcNumber: string;
  licenseNumber: string;
  documents: {
    aadhaar?: string;
    rc?: string;
    license?: string;
  };
  isApproved: boolean;
  isOnline: boolean;
  isFrozen: boolean;
  currentLocation?: Location;
  vehicleDetails: {
    make: string;
    model: string;
    year: number;
    licensePlate: string;
    color: string;
  };
  earnings: {
    today: number;
    total: number;
    pendingCommission: number;
  };
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Ride {
  id: string;
  passengerId: string;
  driverId?: string;
  type: 'instant' | 'prebook';
  status: 'requested' | 'accepted' | 'ongoing' | 'completed' | 'cancelled';
  pickup: Location;
  destination: Location;
  distance: number;
  fare: number;
  estimatedDuration: number;
  requestedAt: Date;
  scheduledAt?: Date;
  acceptedAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  rating?: number;
  review?: string;
  cancellationFee?: number;
  prebookingFee?: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'ride_request' | 'ride_accepted' | 'ride_completed' | 'prebook_reminder' | 'commission_due';
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  createdAt: Date;
}
