import cookies from 'next-cookies';
import App, { AppContext } from 'next/app';
import type { AppProps } from 'next/app';

import Layout from '../components/Layout';
import UserProvider from '../context/UserContext';

import '../styles/initializeStyle.ts';
import 'fontsource-nunito-sans';
import 'fontsource-roboto';

interface newAppProps extends AppProps {
  isAuthenticated: boolean;
}

function MyApp({ Component, pageProps, isAuthenticated }: newAppProps) {
  return (
    <UserProvider isAuthenticated={isAuthenticated}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  let isAuthenticated = false;

  // WARNING - We only check if a cookie called token is present
  // We do not verify the token on the server at this point
  // In this case, it might be fine since we only need the auth state
  // for UI purposes. Any sensitive data fetch is secured separately
  const { token } = cookies(context.ctx);
  if (token) {
    isAuthenticated = true;
  }

  const appProps = await App.getInitialProps(context);
  return { ...appProps, isAuthenticated };
};

export default MyApp;
