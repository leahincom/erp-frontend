import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import { usePrevious } from '../../hooks';
import objectId from '../../utils/objectId';
import setCaretToEnd from '../../utils/setCaretToEnd';
import EditableBlock from '../EditableBlock';
import Notice from '../Notice';

export type BlockType = {
  _id: string;
  id?: string;
  tag: string;
  html: string;
  imageUrl: string;
};

interface EditablePageProps {
  id: string;
  fetchedBlocks: BlockType[];
  err: Error;
}

const EditablePage = ({ id, fetchedBlocks, err }: EditablePageProps) => {
  const router = useRouter();
  const [blocks, setBlocks] = useState(fetchedBlocks);
  const [currentBlockId, setCurrentBlockId] = useState('');

  const prevBlocks = usePrevious(blocks);

  useEffect(() => {
    const updatePageOnServer = async (blocks: BlockType[]) => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API}/pages/${id}`, {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            blocks,
          }),
        });
      } catch (err) {
        console.log(err);
      }
    };
    if (prevBlocks && prevBlocks !== blocks) {
      updatePageOnServer(blocks);
    }
  }, [blocks, prevBlocks]);

  useEffect(() => {
    if (prevBlocks && blocks && prevBlocks.length + 1 === blocks.length) {
      const nextBlockPosition = blocks.map((b) => b._id).indexOf(currentBlockId) + 1;
      const nextBlock = document.querySelector(`[data-position="${nextBlockPosition}]`);
      if (nextBlock) {
        (nextBlock as HTMLElement).focus();
      }
    }

    if (prevBlocks && blocks && prevBlocks.length - 1 === blocks.length) {
      const lastBlockPosition = prevBlocks.map((b) => b._id).indexOf(currentBlockId);
      const lastBlock = document.querySelector(`[data-position="${lastBlockPosition}]`);
      if (lastBlock) {
        setCaretToEnd(lastBlock);
      }
    }
  }, [blocks, prevBlocks, currentBlockId]);

  const deleteImageOnServer = async (imageUrl: string) => {
    try {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API}/pages/${imageUrl}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
    } catch (err) {
      console.log(err);
    }
  };

  const updateBlockHandler = (currentBlock: BlockType) => {
    const index = blocks.map((b) => b._id).indexOf(currentBlock.id);
    const oldBlock = blocks[index];
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: currentBlock.tag,
      html: currentBlock.html,
      imageUrl: currentBlock.imageUrl,
    };
    setBlocks(updatedBlocks);

    if (oldBlock.imageUrl && oldBlock.imageUrl !== currentBlock.imageUrl) {
      deleteImageOnServer(oldBlock.imageUrl);
    }
  };

  const addBlockHandler = (currentBlock: BlockType) => {
    setCurrentBlockId(currentBlock.id);
    const index = blocks.map((b) => b._id).indexOf(currentBlock.id);
    const updatedBlocks = [...blocks];
    const newBlock = { _id: objectId(), tag: 'p', html: '', imageUrl: '' };
    updatedBlocks.splice(index + 1, 0, newBlock);
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: currentBlock.tag,
      html: currentBlock.html,
      imageUrl: currentBlock.imageUrl,
    };
    setBlocks(updatedBlocks);
  };

  const deleteBlockHandler = (currentBlock: BlockType) => {
    if (blocks.length > 1) {
      setCurrentBlockId(currentBlock.id);
      const index = blocks.map((b) => b._id).indexOf(currentBlock.id);
      const deletedBlock = blocks[index];
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index, 1);
      setBlocks(updatedBlocks);

      if (deletedBlock.tag === 'img' && deletedBlock.imageUrl) {
        deleteImageOnServer(deletedBlock.imageUrl);
      }
    }
  };

  const onDragEndHandler = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination || destination.index === source.index) {
      return;
    }

    const updatedBlocks = [...blocks];
    const removedBlocks = updatedBlocks.splice(source.index - 1, 1);
    updatedBlocks.splice(destination.index - 1, 0, removedBlocks[0]);
    setBlocks(updatedBlocks);
  };

  if (err) {
    return (
      <Notice status='ERROR'>
        <h3>Something went wrong 💔</h3>
        <p>Have you tried to restart the app at '/' ?</p>
      </Notice>
    );
  }

  const isNewPublicPage = router.query.public === 'true';
  return (
    <>
      {isNewPublicPage && (
        <Notice dismissible>
          <h4>Hey 👋 You just created a public page.</h4>
          <p>It will be automatically deleted after 24 hours.</p>
        </Notice>
      )}
      <DragDropContext onDragEnd={onDragEndHandler}>
        <Droppable droppableId={id}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {blocks.map((block: BlockType) => {
                const position = blocks.map((b: BlockType) => b._id).indexOf(block._id) + 1;
                return (
                  <EditableBlock
                    key={block._id}
                    position={position}
                    id={block._id}
                    tag={block.tag}
                    html={block.html}
                    imageUrl={block.imageUrl}
                    pageId={id}
                    addBlock={addBlockHandler}
                    deleteBlock={deleteBlockHandler}
                    updateBlock={updateBlockHandler}
                  />
                );
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default EditablePage;
