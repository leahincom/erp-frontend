import { useRef, useEffect } from 'react';

import { BlockType } from '../components/EditablePage';

const usePrevious = (value: BlockType[]) => {
  const ref = useRef([{}]);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export default usePrevious;
