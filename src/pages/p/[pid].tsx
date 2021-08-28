import { NextPageContext } from 'next';
import React from 'react';
import { resetServerContext } from 'react-beautiful-dnd';

import { PageProps } from '..';
import EditablePage from '../../components/EditablePage';

const Page = ({ pid, blocks, err }: PageProps) => {
  return <EditablePage pid={pid} blocks={blocks} err={err} />;
};

export const getServerSideProps = async (context: NextPageContext) => {
  resetServerContext();

  const pageId = context.query.pid;
  const req = context.req;

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  req && req.headers && req.headers.cookie && headers.append('Cookie', req.headers.cookie);

  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/pages/${pageId}`, {
      method: 'GET',
      credentials: 'include',
      headers,
    }).then((res) => res.json());
    return { props: { blocks: data.page.blocks, pid: pageId, err: false } };
  } catch (err) {
    console.log(err);
    return { props: { blocks: null, pid: null, err: true } };
  }
};

export default Page;
