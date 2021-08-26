import { NextPageContext } from 'next';
import cookies from 'next-cookies';
import Router from 'next/router';
import { useEffect } from 'react';

const LogoutPage = () => {
  useEffect(() => {
    const logoutOnServer = async () => {
      const router = Router;
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API}/users/logout`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        router.push('/login');
      } catch (err) {
        console.log(err);
      }
    };
    logoutOnServer();
  }, []);

  return null;
};

export const getServerSideProps = async (context: NextPageContext) => {
  const { token } = cookies(context);
  const res = context.res;

  if (!token) {
    res?.writeHead(302, { Location: `/login` });
    res?.end();
  }

  return { props: {} };
};

export default LogoutPage;
