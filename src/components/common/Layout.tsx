import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

import TabBar from './TabBar';

const HeaderWrapper = styled.header`
  display: flex;
  position: sticky;
  align-items: center;
  justify-content: flex-end;
  padding: 0;
  width: 100%;

  > img {
    opacity: 0.75;
    margin: 20px;
    width: 1.5rem;
    height: 1.5rem;

    :hover {
      opacity: 1;
    }
  }
`;

const ContentWrapper = styled.main`
  margin-bottom: 3rem;
  padding: 1rem 0 1rem 1rem;
  width: 100%;
  max-width: var(--max-width);
`;

type ChildrenType = {
  children: any;
};

const Layout = ({ children }: ChildrenType) => {
  return (
    <div id='layoutRoot'>
      <Head>
        <title>ERP</title>
        <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
        <link rel='icon' href='/favicon.ico' type='image/x-icon' />
      </Head>
      <HeaderWrapper>
        <Link href='https://github.com/konstantinmuenster/notion-clone' passHref>
          <img src='../../assets/icons/Github.svg' alt='Github Icon' />
        </Link>
      </HeaderWrapper>
      <ContentWrapper>{children}</ContentWrapper>
      <TabBar />
    </div>
  );
};

export default Layout;
