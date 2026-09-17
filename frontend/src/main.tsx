import { Amplify } from 'aws-amplify';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

Amplify.configure({
  Auth: {
    region: import.meta.env.VITE_BUCKET_REGION,
    userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_COGNITO_USER_POO_WEB_CLIENT_ID,
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
