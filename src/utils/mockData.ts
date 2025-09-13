import { faker } from '@faker-js/faker';
import { User, Driver, Ride, Location } from '../types';

export const mockLocations: Location[] = [
  { lat: 28.6139, lng: 77.2090, address: 'Connaught Place, New Delhi' },
  { lat: 28.5355, lng: 77.3910, address: 'Noida Sector 18' },
  { lat: 28.4595, lng: 77.0266, address: 'Gurgaon Cyber City' },
  { lat: 28.6692, lng: 77.4538, address: 'Ghaziabad' },
  { lat: 28.7041, lng: 77.1025, address: 'Rohini, Delhi' },
];

export const generateMockDriver = (): Driver => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: `+91${faker.string.numeric(10)}`,
  role: 'driver',
  avatar: faker.image.avatar(),
  rating: faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 1 }),
  totalRides: faker.number.int({ min: 50, max: 1000 }),
  createdAt: faker.date.past({ years: 2 }),
  aadhaarNumber: faker.string.numeric(12),
  rcNumber: faker.vehicle.vin(),
  licenseNumber: `DL${faker.string.alphanumeric(8).toUpperCase()}`,
  documents: {
    aadhaar: faker.image.url(),
    rc: faker.image.url(),
    license: faker.image.url(),
  },
  isApproved: faker.datatype.boolean(),
  isOnline: faker.datatype.boolean(),
  isFrozen: false,
  currentLocation: faker.helpers.arrayElement(mockLocations),
  vehicleDetails: {
    make: faker.vehicle.manufacturer(),
    model: faker.vehicle.model(),
    year: faker.number.int({ min: 2015, max: 2024 }),
    licensePlate: faker.vehicle.vrm(),
    color: faker.vehicle.color(),
  },
  earnings: {
    today: faker.number.int({ min: 200, max: 2000 }),
    total: faker.number.int({ min: 5000, max: 50000 }),
    pendingCommission: faker.number.int({ min: 100, max: 1000 }),
  },
});

export const generateMockRide = (): Ride => {
  const pickup = faker.helpers.arrayElement(mockLocations);
  const destination = faker.helpers.arrayElement(mockLocations.filter(l => l !== pickup));
  const distance = faker.number.float({ min: 0.5, max: 25, fractionDigits: 1 });
  
  return {
    id: faker.string.uuid(),
    passengerId: faker.string.uuid(),
    driverId: faker.string.uuid(),
    type: faker.helpers.arrayElement(['instant', 'prebook']),
    status: faker.helpers.arrayElement(['requested', 'accepted', 'ongoing', 'completed']),
    pickup,
    destination,
    distance,
    fare: Math.round((40 + (distance * 10)) / 10) * 10,
    estimatedDuration: faker.number.int({ min: 10, max: 60 }),
    requestedAt: faker.date.recent({ days: 7 }),
    acceptedAt: faker.date.recent({ days: 7 }),
    startedAt: faker.date.recent({ days: 7 }),
    completedAt: faker.date.recent({ days: 7 }),
    rating: faker.number.float({ min: 3, max: 5, fractionDigits: 1 }),
    review: faker.lorem.sentence(),
  };
};

export const mockDrivers = Array.from({ length: 10 }, generateMockDriver);
export const mockRides = Array.from({ length: 20 }, generateMockRide);
