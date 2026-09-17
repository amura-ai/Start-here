import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { MuiTelInput } from 'mui-tel-input';

import { useAuth } from './AuthContext';
import { useStyles } from './Login.styles';
import ThemeToggle from '../theme/ThemeToggle';
import pageBottom from '../assets/images/pageBottom.png';

type LoginStep = 'phone' | 'otp';

const RESEND_TIMER = 60;

export default function Login() {
  const { sendOtp, verifyOtp, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { classes } = useStyles();

  const [step, setStep] = useState<LoginStep>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState('');
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    document.title = 'Amura';
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await sendOtp(phoneNumber.replace(/[^0-9+]/g, ''));
      setStep('otp');
      setResendTimer(RESEND_TIMER);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to send OTP. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await verifyOtp(otpDigits.join(''));
      navigate('/', { replace: true });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid OTP. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = useCallback(async () => {
    if (resendTimer > 0) return;
    setError('');
    try {
      await sendOtp(phoneNumber.replace(/[^0-9+]/g, ''));
      setResendTimer(RESEND_TIMER);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to resend OTP.';
      setError(message);
    }
  }, [phoneNumber, resendTimer, sendOtp]);

  const handleBack = () => {
    setStep('phone');
    setOtpDigits(['', '', '', '']);
    setError('');
    setResendTimer(0);
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = digit;
    setOtpDigits(newDigits);
    if (digit && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
    // Auto-submit when all 4 digits are entered
    if (digit && index === 3 && newDigits.every((d) => d !== '')) {
      setTimeout(() => {
        const form = otpRefs.current[0]?.closest('form');
        form?.requestSubmit();
      }, 100);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (!pasted) return;
    const newDigits = ['', '', '', ''];
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setOtpDigits(newDigits);
    otpRefs.current[Math.min(pasted.length, 3)]?.focus();
    // Auto-submit if all 4 digits pasted
    if (pasted.length === 4) {
      setTimeout(() => {
        const form = otpRefs.current[0]?.closest('form');
        form?.requestSubmit();
      }, 100);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.topIcon}>
        <svg xmlns="http://www.w3.org/2000/svg" width="156" height="16" viewBox="0 0 156 16" fill="none">
          <path
            d="M88.3057 9.125C88.3057 9.58159 88.2717 10.0098 88.2109 10.4082C88.2006 10.482 88.1871 10.5533 88.1738 10.6221C87.3674 14.831 83.0776 15.8705 78.8643 15.9893C78.7245 15.9893 78.5851 15.9944 78.4453 15.9971C78.2899 15.9997 78.1371 16 77.9814 16C77.8708 16 77.7571 15.9997 77.6465 15.9971C77.5068 15.9971 77.3672 15.9946 77.2305 15.9893C72.9826 15.8945 68.7061 14.8915 67.918 10.6221C67.905 10.5509 67.8915 10.4793 67.8809 10.4082C67.8177 10.0071 67.7861 9.58159 67.7861 9.125V0C67.865 0 67.9413 0.00280494 68.0176 0.0107422C68.086 0.0160582 68.153 0.0242525 68.2188 0.0322266C69.5833 0.243611 70.6318 1.4279 70.6318 2.86328V8.86719C70.6319 12.3794 73.4572 13.614 77.7236 13.6562C77.8024 13.6589 77.8812 13.6592 77.96 13.6592C78.0971 13.6592 78.2347 13.6589 78.3691 13.6562C82.6351 13.614 85.4599 12.3794 85.46 8.86719V2.86328C85.46 1.5175 86.3825 0.390646 87.6211 0.0820312C87.7054 0.0610913 87.7898 0.0455043 87.874 0.0322266C87.9398 0.0242571 88.0055 0.0160554 88.0742 0.0107422C88.1505 0.00278586 88.2268 5.35172e-06 88.3057 0V9.125ZM35.4453 0C36.5151 0.000128795 37.5192 0.525488 38.1357 1.4043L44.5127 10.5186L50.8896 1.4043C51.509 0.525386 52.5101 0 53.5801 0H55.7539V15.501H52.9102V3.49121L45.6035 13.9287H43.4238L36.1191 3.49121V15.501H33.2734V0H35.4453ZM115.256 0C119.111 0.000116852 121.738 1.45469 121.738 4.35742H121.745C121.745 7.2624 118.986 8.67188 115.021 8.67188L114.051 8.67969L121.743 15.499H118.196L111.371 9.44727C110.831 8.96977 110.132 8.70855 109.413 8.71387H103.645V15.501H100.625V0H115.256ZM11.3154 0C12.1007 0.00804856 12.8806 0.370142 13.3262 1.0957L22.6299 15.4883H19.5049L17.1338 11.7803H5.49707L3.125 15.4883H0L9.30664 1.09277C9.7493 0.369794 10.5327 0.00531649 11.3154 0ZM144.682 0.00292969C145.467 0.00824505 146.25 0.372723 146.692 1.0957L156 15.4883H152.874L150.5 11.7803H138.863L136.492 15.4883H133.366L142.674 1.0957C143.116 0.372786 143.899 0.00830719 144.682 0.00292969ZM7.15723 9.50586H15.4736L11.3154 3.02441L7.15723 9.50586ZM140.523 9.50586H148.84L144.682 3.02441L140.523 9.50586ZM103.643 2.16699V6.54688H115.189C117.195 6.54685 118.615 5.98265 118.615 4.35742C118.615 2.73164 117.195 2.16701 115.189 2.16699H103.643Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className={classes.themeToggleSlot}>
        <ThemeToggle />
      </div>

      <div className={classes.card}>
        {step === 'phone' ? (
          <form className={classes.form} onSubmit={handleSendOtp}>
            <div style={{ width: '100%' }}>
              <span className={classes.fieldLabel}>Mobile Number</span>
              <MuiTelInput
                className={classes.phoneInput}
                MenuProps={{ className: classes.countryMenu }}
                variant="standard"
                fullWidth
                autoFocus
                defaultCountry="IN"
                forceCallingCode
                disableFormatting
                focusOnSelectCountry
                preferredCountries={['IN', 'AE', 'US', 'CH', 'NZ']}
                value={phoneNumber}
                onChange={(value) => {
                  setPhoneNumber(value);
                  setError('');
                }}
                disabled={loading}
                inputProps={{ autoComplete: 'tel' }}
              />
            </div>

            {error && <p className={classes.errorMessage}>{error}</p>}

            <Button
              className={classes.phoneLoginButton}
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading || phoneNumber.replace(/[^0-9]/g, '').length < 10}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>
          </form>
        ) : (
          <form className={classes.form} onSubmit={handleVerifyOtp}>
            <p className={classes.otpHeading}>Enter the OTP sent to your mobile</p>

            <div className={classes.otpBoxWrap} onPaste={handleOtpPaste}>
              {otpDigits.map((digit, i) => (
                <TextField
                  key={i}
                  className={classes.otpBox}
                  variant="outlined"
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  inputRef={(el) => { otpRefs.current[i] = el; }}
                  autoFocus={i === 0}
                  disabled={loading}
                  inputProps={{ maxLength: 1, inputMode: 'numeric', autoComplete: 'off' }}
                />
              ))}
            </div>

            <p className={classes.resendText}>
              {resendTimer > 0 ? (
                `Resend OTP in ${resendTimer} seconds`
              ) : (
                <span className={classes.resendLink} onClick={handleResendOtp}>
                  Resend OTP
                </span>
              )}
            </p>

            {error && <p className={classes.errorMessage}>{error}</p>}

            <div className={classes.otpButtons}>
              <button
                className={classes.backButton}
                onClick={handleBack}
                disabled={loading}
                type="button"
              >
                Back
              </button>
            </div>
          </form>
        )}
      </div>

      <div className={classes.bottomImage}>
        <img src={pageBottom} width="100%" className={classes.visibility} alt="Bottom" />
      </div>
    </div>
  );
}
