import { NextPageContext } from 'next';
import cookies from 'next-cookies';
import React, { useState } from 'react';
import styled from 'styled-components';

import Card from '../components/common/Card';
import Notice from '../components/common/Notice';
import { getPage, getPages } from '../lib/api/get';
import { PageType, DataType } from '../lib/type/type';

const PagesWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 20%;
  width: 100%;
  height: 100%;
`;

interface PagesPageProps {
  pages: DataType[];
}

const PagesPage = ({ pages }: PagesPageProps) => {
  const [cards] = useState<PageType[]>(pages ? pages.map((data) => data.page) : []);

  return (
    <PagesWrapper>
      {cards.length === 0 && (
        <Notice style={{ marginBottom: '2rem' }}>
          <h3>Let&apos;s go!</h3>
          <p>Seems like you haven&apos;t created any pages so far.</p>
          <p>How about starting now?</p>
        </Notice>
      )}
      {cards.map((page, key) => {
        const updatedAtDate = new Date(Date.parse(page.updatedAt));
        const pageId = page._id;
        const blocks = page.blocks;
        return <Card key={key} pageId={pageId} date={updatedAtDate} content={blocks} />;
      })}
    </PagesWrapper>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const { token } = cookies(context);
  const req = context.req;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        statusCode: 302,
      },
    };
  }

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  req?.headers.cookie && headers.append('Cookie', req.headers.cookie);

  try {
    const data = await getPages(headers);
    const pageIdList = data.pages;
    const pages: PageType[] = await Promise.all(
      pageIdList.map(async (id: string) => {
        return getPage(headers, id);
      }),
    );

    const filteredPages = pages.filter((page: PageType) => !page.errCode);
    return { props: { pages: filteredPages } };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
};

export default PagesPage;
