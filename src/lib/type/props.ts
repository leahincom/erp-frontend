import { BlockType } from './type';

export interface PageProps {
  pid: string;
  blocks: BlockType[];
  err: Error;
}
