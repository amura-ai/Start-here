import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ThemeModeProvider } from './theme/ThemeMode';
import AuthProvider from './auth/AuthProvider';
import AuthGuard from './auth/AuthGuard';
import ServiceGuard from './auth/ServiceGuard';
import Login from './auth/Login';
import SelectService from './auth/SelectService';
import AppLayout from './layout/AppLayout';
import EmptyPage from './components/EmptyPage';

export default function App() {
  return (
    <ThemeModeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />

            {/* Authenticated + admin */}
            <Route element={<AuthGuard />}>
              <Route path="/select-service" element={<SelectService />} />

              {/* Requires a selected service */}
              <Route element={<ServiceGuard />}>
                <Route element={<AppLayout />}>
                  <Route index element={<EmptyPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeModeProvider>
  );
}
