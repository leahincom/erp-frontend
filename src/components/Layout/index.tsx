import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import styled from 'styled-components';

import { UserStateContext } from '../../context/UserContext';
import Button from '../Button/';
import ContextMenu from '../ContextMenu';

const HeaderBarWrapper = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
  border-radius: 0.5rem;
  background: var(--secondary);
  padding: 1rem;
  width: calc(100% - 2rem);
  max-width: var(--max-width);
`;

const LogoWrapper = styled.div`
  color: var(--primary);
  font-family: var(--accent);
  font-size: 1.5rem;
  font-weight: 700;
`;

const ContentWrapper = styled.main`
  margin: 0;
  padding: 1rem 0 1rem 1rem;
  width: 100%;
  max-width: var(--max-width);
`;

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
  width: calc(100% - 2rem);
  max-width: var(--max-width);
`;

const HrWrapper = styled.hr`
  display: block;
  border: 0;
  border-top: 1px solid var(--tertiary);
  width: 100%;
  height: 1px;
`;

const GitHubWrapper = styled.div`
  margin-left: 1rem;
  width: auto;
  height: auto;

  img {
    opacity: 0.75;
    width: 1.5rem;
    height: 1.5rem;
  }

  img:hover {
    opacity: 1;
  }
`;

const NavWrapper = styled.nav`
  position: relative;
`;

const UserWrapper = styled.div`
  width: auto;
  height: auto;

  img {
    margin: 0.125rem 0.125rem 0 0;
    width: 1.6rem;
    height: 1.6rem;
  }

  img:hover,
  img:focus {
    cursor: pointer;
  }
`;

type ChildrenType = {
  children: React.Component[];
};

const Layout = ({ children }: ChildrenType) => {
  const router = useRouter();
  const state = useContext(UserStateContext);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  const isLoginPage = router.pathname === '/login';
  const isAuth = state.isAuth;

  const toggleContextMenu = () => {
    setIsContextMenuOpen(!isContextMenuOpen);
  };

  const closeContextMenu = () => {
    setIsContextMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    closeContextMenu();
    router.push(path);
  };

  return (
    <div id='layoutRoot'>
      <Head>
        <title>Notion Clone</title>
        <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
        <link rel='icon' href='/favicon.ico' type='image/x-icon' />
      </Head>
      <HeaderBarWrapper>
        <LogoWrapper>
          <a href='/' role='link'>
            notion<span style={{ fontSize: '1.25rem' }}>.clone</span>
          </a>
        </LogoWrapper>
        <NavWrapper>
          {!isLoginPage && !isAuth && <Button href='/login'>Login</Button>}
          {!isLoginPage && isAuth && (
            <UserWrapper>
              <span role='button' tabIndex={0} onClick={() => toggleContextMenu()}>
                <img src='../../assets/icons/User.svg' alt='User Icon' />
              </span>
            </UserWrapper>
          )}
          {!isLoginPage && isAuth && isContextMenuOpen && (
            <ContextMenu
              menuItems={[
                {
                  id: 'pages',
                  label: 'Pages',
                  action: () => handleNavigation('/pages'),
                },
                {
                  id: 'account',
                  label: 'Account',
                  action: () => handleNavigation('/account'),
                },
                {
                  id: 'logout',
                  label: 'Logout',
                  action: () => handleNavigation('/logout'),
                },
              ]}
              closeAction={() => closeContextMenu()}
              isTopNavigation={true}
            />
          )}
        </NavWrapper>
      </HeaderBarWrapper>
      <ContentWrapper>{children}</ContentWrapper>
      <FooterWrapper>
        <HrWrapper />
        <GitHubWrapper>
          <Link href='https://github.com/konstantinmuenster/notion-clone' passHref>
            <img src='../../assets/icons/Github.svg' alt='Github Icon' />
          </Link>
        </GitHubWrapper>
      </FooterWrapper>
    </div>
  );
};

export default Layout;
