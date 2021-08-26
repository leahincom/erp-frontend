import { NextPageContext } from 'next';
import cookies from 'next-cookies';
import React, { useState } from 'react';

import Button from '../components/Button';
import Card from '../components/Card';
import { BlockType } from '../components/EditablePage';
import Notice from '../components/Notice';

export type PageType = {
  _id: string;
  updatedAt: string;
  blocks: BlockType[];
  errCode: boolean;
};

type DataType = {
  _id: string;
  page: PageType;
};

const PagesPage = (pages: DataType[]) => {
  const initialPages = pages || [];
  const [cards, setCards] = useState(initialPages.map((data: DataType) => data.page));

  const deleteCard = async (pageId: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API}/pages/${pageId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const cardIndex = cards.map((page: PageType) => page._id).indexOf(pageId);
      const updatedCards = [...cards];
      updatedCards.splice(cardIndex, 1);
      setCards(updatedCards);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h1 className='pageHeading'>Pages</h1>
      <div id='pageList'>
        {cards.length === 0 && (
          <Notice style={{ marginBottom: '2rem' }}>
            <h3>Let's go!</h3>
            <p>Seems like you haven't created any pages so far.</p>
            <p>How about starting now?</p>
          </Notice>
        )}
        {cards.map((page, key) => {
          const updatedAtDate = new Date(Date.parse(page.updatedAt));
          const pageId = page._id;
          const blocks = page.blocks;
          return (
            <Card
              key={key}
              pageId={pageId}
              date={updatedAtDate}
              content={blocks}
              deleteCard={(pageId) => deleteCard(pageId)}
            />
          );
        })}
      </div>
      <Button href='/'>Create A New Page</Button>
    </>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const { token } = cookies(context);
  const res = context.res;
  const req = context.req;

  if (!token) {
    res?.writeHead(302, { Location: `/login` });
    res?.end();
  }

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  req && req.headers && req.headers.cookie && headers.append('Cookie', req.headers.cookie);

  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/pages`, {
      method: 'GET',
      credentials: 'include',
      headers,
    }).then((res) => res.json());
    const pageIdList = data.pages;
    const pages: PageType[] = await Promise.all(
      pageIdList.map(async (id: string) => {
        await fetch(`${process.env.NEXT_PUBLIC_API}/pages/${id}`, {
          method: 'GET',
          credentials: 'include',
          headers,
        }).then((res) => res.json());
      }),
    );

    const filterdPages = pages.filter((page: PageType) => !page.errCode);
    return { props: { pages: filterdPages } };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
};

export default PagesPage;
