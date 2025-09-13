import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Phone, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { useAuth } from '../../contexts/AuthContext';
import { useAppState } from '../../contexts/AppStateContext';
import { auth } from '../../firebase';
import { RecaptchaVerifier } from 'firebase/auth';

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, sendOtp, verifyOtp, confirmationResult } = useAuth();
  const { selectedRole, goToRoleSelection, goToSignup } = useAppState();

  const isPassenger = selectedRole === 'passenger';

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
      });
    }
  };

  useEffect(() => {
    if (isPassenger) {
      setupRecaptcha();
    }
  }, [isPassenger]);

  const handleEmailLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setError('');
    if (!phone.startsWith('+91')) {
      setError('Please enter phone number with +91 country code.');
      return;
    }
    if (!window.recaptchaVerifier) {
      setError('Recaptcha not initialized.');
      return;
    }
    setIsLoading(true);
    try {
      await sendOtp(phone, window.recaptchaVerifier);
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError('');
    setIsLoading(true);
    try {
      await verifyOtp(otp);
    } catch (err: any) {
      setError(err.message || 'Failed to verify OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPassenger) {
      if (confirmationResult) {
        handleVerifyOtp();
      } else {
        handleSendOtp();
      }
    } else {
      handleEmailLogin();
    }
  };

  if (!selectedRole) return null;

  const config = {
    passenger: { title: 'Welcome Back', subtitle: 'Book your ride in seconds', primaryColor: 'bg-gradient-primary' },
    driver: { title: 'Driver Portal', subtitle: 'Start earning', primaryColor: 'bg-gradient-secondary' },
    admin: { title: 'Admin Dashboard', subtitle: 'Manage the platform', primaryColor: 'bg-gradient-accent' },
  }[selectedRole];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
        <div className={`${config.primaryColor} p-6 rounded-t-xl text-white`}>
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" icon={ArrowLeft} onClick={goToRoleSelection} className="text-white hover:bg-white/20 p-2" />
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold">{config.title}</h1>
              <p className="text-white/90">{config.subtitle}</p>
            </div>
            <div className="w-10"></div>
          </div>
        </div>
        
        <Card className="rounded-t-none border-t-0" padding="lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {isPassenger ? (
              <>
                <Input label="Phone Number" type="tel" value={phone} onChange={setPhone} placeholder="+91 98765 43210" icon={Phone} fullWidth disabled={!!confirmationResult} />
                {confirmationResult && (
                  <Input label="OTP" type="number" value={otp} onChange={setOtp} placeholder="Enter 6-digit OTP" icon={Lock} fullWidth />
                )}
              </>
            ) : (
              <>
                <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="Enter your email" icon={Mail} fullWidth />
                <Input label="Password" type="password" value={password} onChange={setPassword} placeholder="Enter your password" icon={Lock} fullWidth />
              </>
            )}

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <Button type="submit" variant="primary" size="lg" fullWidth icon={ArrowRight} iconPosition="right" disabled={isLoading}>
              {isLoading ? 'Processing...' : isPassenger ? (confirmationResult ? 'Verify OTP' : 'Send OTP') : 'Sign In'}
            </Button>
          </form>

          {selectedRole !== 'admin' && (
            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button onClick={() => goToSignup(selectedRole)} className="text-primary-600 hover:text-primary-700 font-medium">
                Sign up here
              </button>
            </div>
          )}
        </Card>
      </motion.div>
      <div id="recaptcha-container"></div>
    </div>
  );
};
