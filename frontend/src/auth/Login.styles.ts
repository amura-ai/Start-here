import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.colors.gray[900],
    position: 'relative' as const,
  },
  topIcon: {
    position: 'absolute' as const,
    top: '32px',
    left: '32px',
    color: theme.palette.colors.gray[900],
  },
  themeToggleSlot: {
    position: 'absolute' as const,
    top: '24px',
    right: '24px',
    zIndex: 10,
  },
  bottomImage: {
    position: 'absolute' as const,
    bottom: '0px',
    left: 0,
    width: '100%',
    backgroundImage: 'url(https://amura.ai/wp-content/uploads/2021/03/wavesnew.png)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom',
    backgroundSize: '100%',
  },
  visibility: {
    visibility: 'hidden' as const,
  },
  card: {
    maxWidth: 430,
    minWidth: 0,
    width: '100%',
    padding: '40px 32px',
    '@media (max-width: 480px)': {
      padding: '24px 16px',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '20px',
  },
  textField: {
    '& .MuiInput-root': {
      fontFamily: 'Graphik',
      fontSize: '15px',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#000000',
    },
    '& .MuiInput-underline.Mui-disabled:before': {
      borderBottomStyle: 'solid',
    },
  },
  fieldLabel: {
    fontFamily: 'Graphik',
    fontSize: '1rem',
    fontWeight: 400,
    color: theme.palette.colors.gray[500],
    display: 'block',
    marginBottom: '4px',
  },
  countryMenu: {
    zIndex: '20000 !important' as string,
    '& .MuiPaper-root': {
      backgroundColor: '#FFFFFF',
      maxWidth: '380px',
      width: '380px',
      boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.14)',
    },
    '& .MuiMenu-list': {
      maxHeight: '250px',
    },
    '& .MuiMenuItem-root': {
      fontFamily: 'Graphik',
      fontSize: '15px',
      color: '#5C5A61',
      padding: '13px 16px',
      borderBottom: '1px solid #E1E1E1',
    },
    '& .MuiMenuItem-root:hover': {
      backgroundColor: '#F8F8F8',
    },
    '& .Mui-selected': {
      backgroundColor: '#F1F1F1 !important',
      fontWeight: 600,
    },
    '& .MuiTypography-root': {
      fontFamily: 'Graphik',
      color: '#5C5A61',
    },
  },
  phoneInput: {
    width: 'calc(100% - 2px)',
    borderBottom: '1px solid transparent',
    background: 'transparent',
    '& .MuiPhoneNumber-flagButton': {
      minWidth: '30px !important',
      '&:hover': {
        background: 'transparent',
      },
    },
    '&:hover': {
      background: 'transparent',
    },
    '&:focus-within': {
      background: 'transparent !important',
    },
    '& .MuiInputAdornment-root': {
      height: 'fit-content',
      cursor: 'pointer',
    },
    '& .MuiTypography-root': {
      paddingRight: '0',
    },
    '& .MuiInputBase-root': {
      padding: '8px 8px 8px 0px !important',
      background: 'transparent !important',
      borderBottom: `1px solid ${theme.palette.colors.gray[900]}`,
      '& *': {
        border: 0,
      },
    },
    '& .MuiInputBase-input': {
      padding: '4px 0px !important',
      background: 'transparent !important',
      color: `${theme.palette.colors.gray[900]} !important`,
    },
    '& .MuiInput-underline': {
      '&:after': {
        borderBottom: 'initial',
      },
      '&:before': {
        borderBottom: '0px !important',
      },
    },
    '& .MuiInputBase-input.Mui-disabled': {
      WebkitTextFillColor: '#5C5A61',
    },
  },
  phoneLoginButton: {
    height: '48px',
    borderRadius: '8px',
    fontFamily: 'Graphik',
    fontSize: '15px',
    fontWeight: 600,
    textTransform: 'none' as const,
    backgroundColor: '#3D3D3D',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#2A2A2A',
    },
    '&.Mui-disabled': {
      backgroundColor: '#D6D6D6',
      color: '#9E9E9E',
    },
  },
  loginButton: {
    width: '200px',
    height: '48px',
    borderRadius: '8px',
    fontFamily: 'Graphik',
    fontSize: '15px',
    fontWeight: 600,
    textTransform: 'none' as const,
    backgroundColor: '#3D3D3D',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#2A2A2A',
    },
    '&.Mui-disabled': {
      backgroundColor: '#D6D6D6',
      color: '#9E9E9E',
    },
  },
  backButton: {
    width: '200px',
    height: '48px',
    borderRadius: '8px',
    fontFamily: 'Graphik',
    fontSize: '15px',
    fontWeight: 500,
    color: theme.palette.colors.gray[900],
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette.colors.gray[900]}`,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: theme.palette.colors.gray[900],
      color: theme.palette.colors.system.white,
      borderColor: theme.palette.colors.gray[900],
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  // OTP step
  otpHeading: {
    fontFamily: 'Graphik',
    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: 400,
    color: theme.palette.colors.gray[900],
    textAlign: 'center' as const,
    margin: 0,
  },
  otpBoxWrap: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
  },
  otpBox: {
    width: '52px',
    '& .MuiOutlinedInput-root': {
      fontFamily: 'Graphik',
      fontSize: '22px',
      fontWeight: 400,
      height: '52px',
      borderRadius: '8px',
      color: theme.palette.colors.gray[900],
      '& fieldset': {
        borderColor: theme.palette.colors.gray[300],
      },
      '&:hover fieldset': {
        borderColor: theme.palette.colors.gray[900],
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.colors.gray[900],
        borderWidth: '1.5px',
      },
    },
    '& input': {
      textAlign: 'center' as const,
      padding: '12px 0',
    },
  },
  resendText: {
    fontFamily: 'Graphik',
    fontSize: '15px',
    lineHeight: '20px',
    fontWeight: 400,
    color: theme.palette.colors.gray[900],
    textAlign: 'center' as const,
    margin: 0,
  },
  resendLink: {
    cursor: 'pointer',
    color: theme.palette.colors.gray[900],
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  otpButtons: {
    display: 'flex',
    gap: '12px',
  },
  errorMessage: {
    fontFamily: 'Graphik',
    fontSize: '13px',
    lineHeight: '18px',
    color: '#ff6060',
    textAlign: 'center' as const,
    padding: '0',
    margin: 0,
  },
}));
