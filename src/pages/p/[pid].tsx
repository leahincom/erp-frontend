import { NextPageContext } from 'next';
import React, { useEffect } from 'react';
import { resetServerContext } from 'react-beautiful-dnd';
import { useSetRecoilState } from 'recoil';

import EditablePage from '../../components/common/EditablePage';
import SideBar from '../../components/common/SideBar';
import { getPage } from '../../lib/api/get';
import { isSideBarOpenState } from '../../lib/state/atom';
import { PageProps } from '../../lib/type/props';

const Page = ({ pid, blocks, err }: PageProps) => {
  const setIsVisible = useSetRecoilState(isSideBarOpenState);

  useEffect(() => {
    setIsVisible(false);
  }, []);

  return (
    <>
      <SideBar />
      <EditablePage pid={pid} blocks={blocks} err={err} />
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

export default Page;
