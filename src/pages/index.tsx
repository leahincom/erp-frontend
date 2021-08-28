import type { NextPageContext } from 'next';

import EditablePage from '../components/EditablePage';
import { BlockType } from '../types/';

export interface PageProps {
  pid: string;
  blocks: BlockType[];
  err: Error;
}

const IndexPage = ({ pid, blocks, err }: PageProps) => {
  return <EditablePage pid={pid} blocks={blocks} err={err} />;
};

export const getServerSideProps = async (context: NextPageContext) => {
  const blocks = [{ tag: 'p', html: '', imageUrl: '' }];
  const res = context.res;
  const req = context.req;
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  req && req.headers && req.headers.cookie && headers.append('Cookie', req.headers.cookie);

  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/pages`, {
      method: 'POST',
      credentials: 'include',
      headers,
      body: JSON.stringify({
        blocks,
      }),
    }).then((res) => res.json());
    const pageId = data.pageId;
    const creator = data.creator;
    const query = !creator ? '?public=true' : '';
    res?.writeHead(302, { Location: `/p/${pageId}${query}` });
    res?.end();
    return { props: {} };
  } catch (err) {
    console.log(err);
    return { props: { blocks: null, pid: null, err: true } };
  }
};

export default IndexPage;
