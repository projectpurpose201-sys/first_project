import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { useAuth } from '../../contexts/AuthContext';
import { useAppState } from '../../contexts/AppStateContext';

export const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signUp } = useAuth();
  const { selectedRole, goToLogin } = useAppState();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await signUp(email, password);
      // You might want to update the user's profile with the name here
    } catch (err: any) {
      setError(err.message || 'Failed to sign up.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedRole) return null;

  const config = {
    passenger: { title: 'Create Passenger Account', subtitle: 'Join us and ride smart', primaryColor: 'bg-gradient-primary' },
    driver: { title: 'Become a Driver', subtitle: 'Start your earning journey', primaryColor: 'bg-gradient-secondary' },
    admin: { title: 'Admin Signup', subtitle: 'Platform management access', primaryColor: 'bg-gradient-accent' },
  }[selectedRole];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
        <div className={`${config.primaryColor} p-6 rounded-t-xl text-white`}>
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" icon={ArrowLeft} onClick={() => goToLogin(selectedRole)} className="text-white hover:bg-white/20 p-2" />
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold">{config.title}</h1>
              <p className="text-white/90">{config.subtitle}</p>
            </div>
            <div className="w-10"></div>
          </div>
        </div>
        
        <Card className="rounded-t-none border-t-0" padding="lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input label="Full Name" type="text" value={name} onChange={setName} placeholder="Enter your full name" icon={User} fullWidth />
            <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="Enter your email" icon={Mail} fullWidth />
            <Input label="Password" type="password" value={password} onChange={setPassword} placeholder="Choose a strong password" icon={Lock} fullWidth />
            
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <Button type="submit" variant="primary" size="lg" fullWidth icon={ArrowRight} iconPosition="right" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button onClick={() => goToLogin(selectedRole)} className="text-primary-600 hover:text-primary-700 font-medium">
              Sign in here
            </button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
