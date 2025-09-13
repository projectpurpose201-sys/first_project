export const calculateFare = (distanceInKm: number): number => {
  let fare = 0;
  
  if (distanceInKm < 1) {
    fare = 40;
  } else if (distanceInKm === 1) {
    fare = 50;
  } else {
    fare = 50 + ((distanceInKm - 1) * 10);
  }
  
  // Round to nearest 10
  return Math.round(fare / 10) * 10;
};

export const calculateCommission = (earnings: number): number => {
  return earnings * 0.1; // 10% commission
};

export const formatCurrency = (amount: number): string => {
  return `₹${amount}`;
};
