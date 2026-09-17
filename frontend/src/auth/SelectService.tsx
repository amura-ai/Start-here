import { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useAuth } from './AuthContext';
import { useStyles } from './SelectService.styles';
import { getServicesByUser } from '../api/services';
import { ITenantServices } from '../api/types';
import { readTenantsCache, writeTenantsCache, countServices } from './tenantsCache';
import ThemeToggle from '../theme/ThemeToggle';

export default function SelectService() {
  const { userId, selectedService, setSelectedService, signOut } = useAuth();
  const navigate = useNavigate();
  const { classes, cx } = useStyles();

  // If the cache already tells us there's exactly one service, skip the picker
  // entirely — apply it synchronously and redirect before any UI renders.
  const autoRedirect = useMemo(() => {
    if (!userId) return null;
    const cached = readTenantsCache(userId);
    if (!cached || countServices(cached) !== 1) return null;
    const tenant = cached.find((t) => t.services.length === 1);
    const svc = tenant?.services[0];
    if (!tenant || !svc) return null;
    if (
      !selectedService ||
      selectedService.service_id !== svc.service_id ||
      selectedService.tenant_id !== tenant.tenant_id
    ) {
      setSelectedService({
        tenant_id: tenant.tenant_id,
        tenant_name: tenant.tenant_name,
        service_id: svc.service_id,
        service_name: svc.service_name,
      });
    }
    return true;
  }, [userId, selectedService, setSelectedService]);

  const [tenants, setTenants] = useState<ITenantServices[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(
    selectedService?.service_id ?? null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [collapsedTenants, setCollapsedTenants] = useState<Set<string>>(() => new Set());

  const toggleTenant = (tenantId: string) => {
    setCollapsedTenants((prev) => {
      const next = new Set(prev);
      if (next.has(tenantId)) next.delete(tenantId);
      else next.add(tenantId);
      return next;
    });
  };

  useEffect(() => {
    document.title = 'Select Service — Amura';
  }, []);

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    const hydrate = (data: ITenantServices[]) => {
      if (cancelled) return false;
      setTenants(data);
      const totalServices = data.reduce((sum, t) => sum + t.services.length, 0);
      // Auto-select and navigate when only one service is available
      if (totalServices === 1) {
        const tenant = data.find((t) => t.services.length === 1);
        const svc = tenant?.services[0];
        if (tenant && svc) {
          setSelectedService({
            tenant_id: tenant.tenant_id,
            tenant_name: tenant.tenant_name,
            service_id: svc.service_id,
            service_name: svc.service_name,
          });
          navigate('/', { replace: true });
          return true;
        }
      }
      return false;
    };

    // Serve from localStorage cache if fresh — skip the API call on breadcrumb back-nav.
    const cached = readTenantsCache(userId);
    if (cached) {
      setLoading(false);
      setError('');
      if (hydrate(cached)) return undefined;
      return () => {
        cancelled = true;
      };
    }

    (async () => {
      try {
        setLoading(true);
        setError('');
        const res = await getServicesByUser(userId);
        if (cancelled) return;

        const data = res.tenants || [];
        writeTenantsCache(userId, data);
        hydrate(data);
      } catch {
        if (!cancelled) setError('Failed to load services. Please try again.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userId, setSelectedService, navigate]);

  const selectedResolved = useMemo(() => {
    if (!selectedId) return null;
    for (const tenant of tenants) {
      for (const svc of tenant.services) {
        if (svc.service_id === selectedId) {
          return {
            tenant_id: tenant.tenant_id,
            tenant_name: tenant.tenant_name,
            service_id: svc.service_id,
            service_name: svc.service_name,
          };
        }
      }
    }
    return null;
  }, [selectedId, tenants]);

  const handleNext = () => {
    if (!selectedResolved) return;
    setSelectedService(selectedResolved);
    navigate('/', { replace: true });
  };

  const totalServices = tenants.reduce((sum, t) => sum + t.services.length, 0);

  if (autoRedirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.topIcon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="156"
          height="16"
          viewBox="0 0 156 16"
          fill="none"
        >
          <path
            d="M88.3057 9.125C88.3057 9.58159 88.2717 10.0098 88.2109 10.4082C88.2006 10.482 88.1871 10.5533 88.1738 10.6221C87.3674 14.831 83.0776 15.8705 78.8643 15.9893C78.7245 15.9893 78.5851 15.9944 78.4453 15.9971C78.2899 15.9997 78.1371 16 77.9814 16C77.8708 16 77.7571 15.9997 77.6465 15.9971C77.5068 15.9971 77.3672 15.9946 77.2305 15.9893C72.9826 15.8945 68.7061 14.8915 67.918 10.6221C67.905 10.5509 67.8915 10.4793 67.8809 10.4082C67.8177 10.0071 67.7861 9.58159 67.7861 9.125V0C67.865 0 67.9413 0.00280494 68.0176 0.0107422C68.086 0.0160582 68.153 0.0242525 68.2188 0.0322266C69.5833 0.243611 70.6318 1.4279 70.6318 2.86328V8.86719C70.6319 12.3794 73.4572 13.614 77.7236 13.6562C77.8024 13.6589 77.8812 13.6592 77.96 13.6592C78.0971 13.6592 78.2347 13.6589 78.3691 13.6562C82.6351 13.614 85.4599 12.3794 85.46 8.86719V2.86328C85.46 1.5175 86.3825 0.390646 87.6211 0.0820312C87.7054 0.0610913 87.7898 0.0455043 87.874 0.0322266C87.9398 0.0242571 88.0055 0.0160554 88.0742 0.0107422C88.1505 0.00278586 88.2268 5.35172e-06 88.3057 0V9.125ZM35.4453 0C36.5151 0.000128795 37.5192 0.525488 38.1357 1.4043L44.5127 10.5186L50.8896 1.4043C51.509 0.525386 52.5101 0 53.5801 0H55.7539V15.501H52.9102V3.49121L45.6035 13.9287H43.4238L36.1191 3.49121V15.501H33.2734V0H35.4453ZM115.256 0C119.111 0.000116852 121.738 1.45469 121.738 4.35742H121.745C121.745 7.2624 118.986 8.67188 115.021 8.67188L114.051 8.67969L121.743 15.499H118.196L111.371 9.44727C110.831 8.96977 110.132 8.70855 109.413 8.71387H103.645V15.501H100.625V0H115.256ZM11.3154 0C12.1007 0.00804856 12.8806 0.370142 13.3262 1.0957L22.6299 15.4883H19.5049L17.1338 11.7803H5.49707L3.125 15.4883H0L9.30664 1.09277C9.7493 0.369794 10.5327 0.00531649 11.3154 0ZM144.682 0.00292969C145.467 0.00824505 146.25 0.372723 146.692 1.0957L156 15.4883H152.874L150.5 11.7803H138.863L136.492 15.4883H133.366L142.674 1.0957C143.116 0.372786 143.899 0.00830719 144.682 0.00292969ZM7.15723 9.50586H15.4736L11.3154 3.02441L7.15723 9.50586ZM140.523 9.50586H148.84L144.682 3.02441L140.523 9.50586ZM103.643 2.16699V6.54688H115.189C117.195 6.54685 118.615 5.98265 118.615 4.35742C118.615 2.73164 117.195 2.16701 115.189 2.16699H103.643Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className={classes.topRightActions}>
        <ThemeToggle />
        <button type="button" className={classes.signOutLink} onClick={() => signOut()}>
          Sign out
        </button>
      </div>

      <div className={classes.card}>
        <h2 className={classes.heading}>Select a service</h2>
        <p className={classes.subheading}>
          Choose a service to continue to the dashboard.
        </p>

        <div className={classes.divider} />

        {loading ? (
          <div className={classes.loadingWrap}>
            <CircularProgress size={28} />
          </div>
        ) : error ? (
          <>
            <p className={classes.errorMessage}>{error}</p>
            <Button
              className={classes.nextButton}
              variant="contained"
              fullWidth
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </>
        ) : totalServices === 0 ? (
          <p className={classes.emptyState}>
            No services are available for your account. Contact the Amura team to request access.
          </p>
        ) : (
          <>
            <div className={classes.tenantList}>
              {tenants.map((tenant) => {
                const isCollapsed = collapsedTenants.has(tenant.tenant_id);
                const headerId = `tenant-header-${tenant.tenant_id}`;
                const panelId = `tenant-panel-${tenant.tenant_id}`;
                return (
                  <div key={tenant.tenant_id} className={classes.tenantBlock}>
                    <div
                      id={headerId}
                      role="button"
                      tabIndex={0}
                      aria-expanded={!isCollapsed}
                      aria-controls={panelId}
                      className={classes.tenantHeader}
                      onClick={() => toggleTenant(tenant.tenant_id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleTenant(tenant.tenant_id);
                        }
                      }}
                    >
                      <span className={classes.tenantChevron}>
                        {isCollapsed ? (
                          <ChevronRightIcon fontSize="small" />
                        ) : (
                          <ExpandMoreIcon fontSize="small" />
                        )}
                      </span>
                      <span className={classes.tenantName}>{tenant.tenant_name}</span>
                      <span className={classes.tenantCount}>({tenant.services.length})</span>
                    </div>
                    {!isCollapsed && (
                      <div id={panelId} role="region" aria-labelledby={headerId} className={classes.tenantServices}>
                        {tenant.services.map((svc) => {
                          const isSelected = selectedId === svc.service_id;
                          return (
                            <div
                              key={svc.service_id}
                              role="radio"
                              aria-checked={isSelected}
                              tabIndex={0}
                              className={cx(classes.serviceRow, isSelected && classes.serviceRowSelected)}
                              onClick={() => setSelectedId(svc.service_id)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  setSelectedId(svc.service_id);
                                }
                              }}
                            >
                              <span
                                className={cx(
                                  classes.radioOuter,
                                  isSelected && classes.radioOuterSelected,
                                )}
                              >
                                {isSelected && <span className={classes.radioInner} />}
                              </span>
                              <span className={classes.serviceLabel}>{svc.service_name}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <Button
              className={classes.nextButton}
              variant="contained"
              fullWidth
              disabled={!selectedId}
              onClick={handleNext}
            >
              Next
            </Button>
          </>
        )}
      </div>

      <div className={classes.bottomImage} />
    </div>
  );
}
