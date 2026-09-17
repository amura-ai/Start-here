import { createContext, useContext } from 'react';
import { ISelectedService } from '../api/types';

export interface AuthUser {
  username: string;
  displayName: string;
  phone: string;
}

export interface AuthState {
  user: AuthUser | null;
  userId: string | null;
  idToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  selectedService: ISelectedService | null;
  setSelectedService: (service: ISelectedService | null) => void;
  signIn: (username: string, password: string) => Promise<void>;
  sendOtp: (phoneNumber: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export default AuthContext;
