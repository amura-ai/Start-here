// import { makeStyles } from '@mui/styles';
import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
const useStyles = makeStyles()(() => ({
  errorInTenant: {
    // fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 'normal',
    padding: '6px 0px 0px 6px !important',
    fontSize: '13px',
    lineHeight: '130.5%',
    color: '#ff6060',
    margin: '0px',
  },
  sm10Medium: {
    fontFamily: 'Graphik !important',
    fontSize: '10px',
    lineHeight: '12px',
    fontWeight: 600,
    fontStyle: 'normal',
  },
  sm6Medium: {
    fontFamily: 'Graphik !important',
    fontSize: '6px',
    lineHeight: '12px',
    fontWeight: 600,
    fontStyle: 'normal',
  },
  sm10Regular: {
    fontFamily: 'Graphik !important',
    fontSize: '10px',
    lineHeight: '12px',
    fontWeight: 500,
    fontStyle: 'normal',
  },
  sm8Medium: {
    fontFamily: 'Graphik !important',
    fontSize: '8px',
    lineHeight: '12px',
    fontWeight: 600,
    fontStyle: 'normal',
  },
  sm8Regular: {
    fontFamily: 'Graphik !important',
    fontSize: '8px',
    lineHeight: '12px',
    fontWeight: 500,
    fontStyle: 'normal',
  },
  caption12Medium: {
    fontFamily: 'Graphik !important',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 600,
    fontStyle: 'normal',
  },
  caption12Regular: {
    fontFamily: 'Graphik !important',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400,
    fontStyle: 'normal',
  },
  caption10Regular: {
    fontFamily: 'Graphik !important',
    fontSize: '10px',
    lineHeight: '16px',
    fontWeight: 400,
    fontStyle: 'normal',
  },
  body15Medium: {
    fontFamily: 'Graphik !important',
    fontSize: '15px',
    lineHeight: '20px',
    fontWeight: 600,
    fontStyle: 'normal',
  },
  body15Regular: {
    fontFamily: 'Graphik !important',
    fontSize: '15px',
    lineHeight: '20px',
    fontWeight: 400,
    fontStyle: 'normal',
  },
  body14Regular: {
    fontFamily: 'Graphik !important',
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 400,
    fontStyle: 'normal',
  },
  body14Medium: {
    fontFamily: 'Graphik !important',
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 500,
    fontStyle: 'normal',
  },
  body17Medium: {
    fontFamily: 'Graphik !important',
    fontSize: '17px',
    lineHeight: '22px',
    fontWeight: 600,
    fontStyle: 'normal',
  },
  body17Regular: {
    fontFamily: 'Graphik !important',
    fontSize: '17px',
    lineHeight: '22px',
    fontWeight: 400,
    fontStyle: 'normal',
  },
  body20Medium: {
    fontFamily: 'Graphik !important',
    fontSize: '20px',
    lineHeight: '24px',
    fontWeight: 600,
    fontStyle: 'normal',
  },
  body20Regular: {
    fontFamily: 'Graphik !important',
    fontSize: '20px',
    lineHeight: '24px',
    fontWeight: 400,
    fontStyle: 'normal',
  },
  heading1: {
    fontFamily: 'Graphik !important',
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: 600,
    fontStyle: 'normal',
  },
  heading2: {
    fontFamily: 'Graphik !important',
    fontSize: '28px',
    lineHeight: '34px',
    fontWeight: 400,
    fontStyle: 'normal',
  },
  heading3: {
    fontFamily: 'Graphik !important',
    fontSize: '22px',
    lineHeight: '28px',
    fontWeight: 600,
    fontStyle: 'normal',
  },
  largeTitle: {
    fontFamily: 'Graphik !important',
    fontSize: '34px',
    lineHeight: '40px',
    fontWeight: 600,
    fontStyle: 'normal',
  },
  button15Regular: {
    fontFamily: 'Gabarito !important',
    fontSize: '15px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 'normal',
  },
  //used for heading
  button20Regular: {
    fontFamily: 'Gabarito !important',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '24px',
  },
  // non font styles
  itemsCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  spaceBetween: { justifyContent: 'space-between' },
  pointer: {
    cursor: 'pointer',
  },
  flex1: {
    flex: 1,
  },
  textEllipsis: {
    textWrap: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  textCenter: {
    textAlign: 'center',
  },
  gabBody15Medium: {
    fontFamily: 'Gabarito !important',
    fontSize: '15px',
    lineHeight: 'normal',
    fontWeight: 500,
    fontStyle: 'normal',
  },
}));

export const useCommonStyles = () => {
  const { classes } = useStyles();
  return classes;
};
