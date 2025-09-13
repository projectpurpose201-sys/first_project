import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/fareCalculator';

interface UpiPaymentProps {
  amount: number;
  onPaymentSuccess: () => void;
  onCancel: () => void;
}

export const UpiPayment: React.FC<UpiPaymentProps> = ({ amount, onPaymentSuccess, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-sm"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Prebook Payment</h2>
            <button onClick={onCancel} className="text-gray-400 hover:text-gray-600"><X /></button>
          </div>
          <p className="text-center text-gray-600 mb-4">Scan the QR code with any UPI app to pay the advance amount.</p>
          
          <div className="flex justify-center mb-4">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=rideshare@okicici&pn=RideShare&am=10.00&cu=INR" alt="UPI QR Code" className="rounded-lg border-4 border-gray-200" />
          </div>

          <div className="text-center mb-6">
            <p className="text-gray-500">Amount to Pay</p>
            <p className="text-4xl font-bold text-primary-600">{formatCurrency(amount)}</p>
          </div>

          <Button fullWidth size="lg" onClick={onPaymentSuccess}>
            I have paid
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
