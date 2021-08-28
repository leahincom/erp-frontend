export type PositionType = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

export type ItemType = {
  id: string;
  label: string;
  action: () => void;
};

export type BlockType = {
  _id?: string;
  id: string;
  tag: string;
  html: string;
  imageUrl: string;
};

export type StateType = {
  htmlBackup: string | null;
  html: string;
  tag: string;
  imageUrl: string;
  placeholder: boolean;
  previousKey: string | null;
  isTyping: boolean;
  tagSelectorMenuOpen: boolean;
  tagSelectorMenuPosition: {
    x: number | null;
    y: number | null;
  };
  actionMenuOpen: boolean;
  actionMenuPosition: {
    x: number | null;
    y: number | null;
  };
};

export type PageType = {
  _id: string;
  updatedAt: string;
  blocks: BlockType[];
  errCode: number;
};

export type DataType = {
  message: string;
  page: PageType;
};
