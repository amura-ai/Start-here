import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Auth } from 'aws-amplify';

import AuthContext, { AuthState, AuthUser } from './AuthContext';
import { setAuthToken } from '../api/client';
import { ISelectedService } from '../api/types';
import { clearTenantsCache } from './tenantsCache';

interface AuthProviderProps {
  children: React.ReactNode;
}

const SELECTED_SERVICE_STORAGE_KEY = 'amura-dashboard-selected-service';

function loadStoredSelection(): ISelectedService | null {
  try {
    const raw = localStorage.getItem(SELECTED_SERVICE_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ISelectedService) : null;
  } catch {
    return null;
  }
}

/**
 * Independent AuthProvider with Cognito phone + OTP login.
 * Cognito is the sole source of truth — any authenticated user is allowed in.
 */
export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedService, setSelectedServiceState] =
    useState<ISelectedService | null>(() => loadStoredSelection());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cognitoUserRef = useRef<any>(null);

  const setSelectedService = useCallback((service: ISelectedService | null) => {
    setSelectedServiceState(service);
    if (service) {
      localStorage.setItem(SELECTED_SERVICE_STORAGE_KEY, JSON.stringify(service));
    } else {
      localStorage.removeItem(SELECTED_SERVICE_STORAGE_KEY);
    }
  }, []);

  const completeAuth = useCallback(async () => {
    const session = await Auth.currentSession();
    const token = session.getIdToken().getJwtToken();
    const currentUser = await Auth.currentAuthenticatedUser();

    const attrs = currentUser.attributes || {};
    const firstName = attrs['custom:first_name'] || attrs.given_name || attrs.name || '';
    const lastName = attrs['custom:last_name'] || attrs.family_name || '';
    const phone = attrs.phone_number || currentUser.username || '';

    const displayName =
      firstName && lastName ? `${firstName} ${lastName}`.trim() : firstName || lastName || phone;

    setIdToken(token);
    setAuthToken(token);

    // userId for downstream API calls (e.g. getServicesByUser) — Cognito sub is the canonical id.
    const resolvedUserId: string | null = attrs.sub || currentUser.username || null;

    setUser({ username: currentUser.username || '', displayName, phone });
    setUserId(resolvedUserId);
    setIsAuthenticated(true);
  }, []);

  // Restore existing Cognito session on mount
  useEffect(() => {
    const restoreSession = async () => {
      try {
        await completeAuth();
      } catch {
        setUser(null);
        setUserId(null);
        setIdToken(null);
        setAuthToken(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    restoreSession();
  }, [completeAuth]);

  // Phone + OTP flow
  const sendOtp = useCallback(async (phoneNumber: string) => {
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
    const cognitoUser = await Auth.signIn(formattedPhone);
    cognitoUserRef.current = cognitoUser;
  }, []);

  const verifyOtp = useCallback(
    async (otp: string) => {
      if (!cognitoUserRef.current) {
        throw new Error('Please request OTP first');
      }
      const result = await Auth.sendCustomChallengeAnswer(cognitoUserRef.current, otp);
      if (result.challengeName) {
        throw new Error('Additional verification required');
      }
      setIsLoading(true);
      try {
        await completeAuth();
      } finally {
        setIsLoading(false);
      }
    },
    [completeAuth],
  );

  // Username + password fallback
  const signIn = useCallback(
    async (username: string, password: string) => {
      await Auth.signIn(username, password);
      setIsLoading(true);
      try {
        await completeAuth();
      } finally {
        setIsLoading(false);
      }
    },
    [completeAuth],
  );

  const signOut = useCallback(async () => {
    await Auth.signOut();
    setUser(null);
    setUserId(null);
    setIdToken(null);
    setAuthToken(null);
    setIsAuthenticated(false);
    setSelectedService(null);
    clearTenantsCache();
    cognitoUserRef.current = null;
  }, [setSelectedService]);

  const value = useMemo<AuthState>(
    () => ({
      user,
      userId,
      idToken,
      isAuthenticated,
      isLoading,
      selectedService,
      setSelectedService,
      signIn,
      sendOtp,
      verifyOtp,
      signOut,
    }),
    [
      user,
      userId,
      idToken,
      isAuthenticated,
      isLoading,
      selectedService,
      setSelectedService,
      signIn,
      sendOtp,
      verifyOtp,
      signOut,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
