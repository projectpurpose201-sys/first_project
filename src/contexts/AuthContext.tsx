import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Auth,
  User as FirebaseUser,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth';
import { auth } from '../firebase';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  sendOtp: (phoneNumber: string, appVerifier: RecaptchaVerifier) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  confirmationResult: ConfirmationResult | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// This function maps Firebase user to our app's user type
const mapFirebaseUserToAppUser = (firebaseUser: FirebaseUser, role: 'passenger' | 'driver' | 'admin'): User => {
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email || '',
    phone: firebaseUser.phoneNumber || '',
    name: firebaseUser.displayName || 'New User',
    role: role,
    createdAt: new Date(firebaseUser.metadata.creationTime || Date.now()),
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        // Here, you'd typically fetch the user's role from your database (Firestore)
        // For now, we'll retrieve it from localStorage as a fallback for the demo
        const storedRole = localStorage.getItem('rideshare_role') as 'passenger' | 'driver' | 'admin' || 'passenger';
        const appUser = mapFirebaseUserToAppUser(fbUser, storedRole);
        setUser(appUser);
        localStorage.setItem('rideshare_user', JSON.stringify(appUser));
      } else {
        setUser(null);
        localStorage.removeItem('rideshare_user');
        localStorage.removeItem('rideshare_role');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const sendOtp = async (phoneNumber: string, appVerifier: RecaptchaVerifier) => {
    const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    setConfirmationResult(result);
  };

  const verifyOtp = async (otp: string) => {
    if (!confirmationResult) {
      throw new Error("No confirmation result available. Please send OTP first.");
    }
    await confirmationResult.confirm(otp);
    setConfirmationResult(null); // Clear after successful verification
  };

  const logout = async () => {
    await signOut(auth);
    // Reload to clear all app state
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, firebaseUser, login, signUp, logout, isLoading, sendOtp, verifyOtp, confirmationResult }}>
      {children}
    </AuthContext.Provider>
  );
};
