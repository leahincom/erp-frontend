import { NextPageContext } from 'next';
import cookies from 'next-cookies';
import Router from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { logout } from '../lib/api/post';
import { userIdState } from '../lib/state';

const LogoutPage = () => {
  const setUserId = useSetRecoilState(userIdState);

  useEffect(() => {
    const logoutOnServer = async () => {
      const router = Router;
      try {
        await logout();
        setUserId(null);
        router.push('/login');
      } catch (err) {
        console.log(err);
      }
    };
    logoutOnServer();
  });

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
