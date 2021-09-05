import { NextPageContext } from 'next';
import React, { useState } from 'react';
import { resetServerContext } from 'react-beautiful-dnd';

import Dashboard from '../components/recommend/Dashboard';
import SideBar from '../components/recommend/SideBar';

import { PageProps } from '.';

const Recommendation = ({ pid, blocks, err }: PageProps) => {
  return (
    <>
      <SideBar />
      <Dashboard />
    </>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  resetServerContext();

  const pageId = context.query.pid;
  const req = context.req;

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  req && req.headers && req.headers.cookie && headers.append('Cookie', req.headers.cookie);

  try {
    const data = await getPage(headers, pageId);
    return { props: { blocks: data.page.blocks, pid: pageId, err: false } };
  } catch (err) {
    console.log(err);
    return { props: { blocks: null, pid: null, err: true } };
  }
};

export default Recommendation;
