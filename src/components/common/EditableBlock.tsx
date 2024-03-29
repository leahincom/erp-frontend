/* eslint-disable no-case-declarations */
import React, { RefObject } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ContentEditable from 'react-contenteditable';
import { VegaLite } from 'react-vega';

import { uploadImage } from '../../lib/api/post';
import { PlaceholderProps, StateType } from '../../lib/type/type';
import { setCaretToEnd, getCaretCoordinates, getSelection } from '../../utils/';

import ActionMenu from './ActionMenu';
import TagSelectorMenu from './TagSelectorMenu';

const CMD_KEY = '/';

class EditableBlock extends React.Component<any, StateType> {
  contentEditable: RefObject<HTMLDivElement>;
  fileInput: HTMLInputElement | null;

  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleDragHandleClick = this.handleDragHandleClick.bind(this);
    this.openActionMenu = this.openActionMenu.bind(this);
    this.closeActionMenu = this.closeActionMenu.bind(this);
    this.openTagSelectorMenu = this.openTagSelectorMenu.bind(this);
    this.closeTagSelectorMenu = this.closeTagSelectorMenu.bind(this);
    this.handleTagSelection = this.handleTagSelection.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.addPlaceholder = this.addPlaceholder.bind(this);
    this.calculateActionMenuPosition = this.calculateActionMenuPosition.bind(this);
    this.calculateTagSelectorMenuPosition = this.calculateTagSelectorMenuPosition.bind(this);
    this.contentEditable = React.createRef<HTMLDivElement>();
    this.fileInput = null;
    this.state = {
      htmlBackup: '',
      html: '',
      tag: 'p',
      imageUrl: '',
      placeholder: false,
      previousKey: null,
      isTyping: false,
      tagSelectorMenuOpen: false,
      tagSelectorMenuPosition: {
        x: null,
        y: null,
      },
      actionMenuOpen: false,
      actionMenuPosition: {
        x: null,
        y: null,
      },
    };
  }

  componentDidMount() {
    const hasPlaceholder =
      this.contentEditable.current &&
      this.addPlaceholder({
        block: this.contentEditable.current,
        position: this.props.position,
        content: this.props.html || this.props.imageUrl,
      });

    if (!hasPlaceholder) {
      this.setState({
        ...this.state,
        html: this.props.html,
        tag: this.props.tag,
        imageUrl: this.props.imageUrl,
      });
    }
  }

  componentDidUpdate(prevProps: any, prevState: StateType) {
    const stoppedTyping = prevState.isTyping && !this.state.isTyping;
    const hasNoPlaceholder = !this.state.placeholder;
    const htmlChanged = this.props.html !== this.state.html;
    const tagChanged = this.props.tag !== this.state.tag;
    const imageChanged = this.props.imageUrl !== this.state.imageUrl;
    if (((stoppedTyping && htmlChanged) || tagChanged || imageChanged) && hasNoPlaceholder) {
      this.props.updateBlock({
        id: this.props.id,
        html: this.state.html,
        tag: this.state.tag,
        imageUrl: this.state.imageUrl,
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeActionMenu, false);
  }

  handleChange(e: any) {
    this.setState({ ...this.state, html: e.target.value });
  }

  handleFocus() {
    if (this.state.placeholder) {
      this.setState({
        ...this.state,
        html: '',
        placeholder: false,
        isTyping: true,
      });
    } else {
      this.setState({ ...this.state, isTyping: true });
    }
  }

  handleBlur() {
    const hasPlaceholder =
      this.contentEditable.current &&
      this.addPlaceholder({
        block: this.contentEditable.current,
        position: this.props.position,
        content: this.state.html || this.state.imageUrl,
      });
    if (!hasPlaceholder) {
      this.setState({ ...this.state, isTyping: false });
    }
  }

  handleKeyDown(e: any) {
    if (e.key === CMD_KEY) {
      this.setState({ htmlBackup: this.state.html });
    } else if (e.key === 'Backspace' && !this.state.html) {
      this.props.deleteBlock({ id: this.props.id });
    } else if (e.key === 'Enter' && this.state.previousKey !== 'Shift' && !this.state.tagSelectorMenuOpen) {
      e.preventDefault();
      this.props.addBlock({
        id: this.props.id,
        html: this.state.html,
        tag: this.state.tag,
        imageUrl: this.state.imageUrl,
        ref: this.contentEditable.current,
      });
    }
    this.setState({ previousKey: e.key });
  }

  handleKeyUp(e: any) {
    if (e.key === CMD_KEY) {
      this.openTagSelectorMenu('KEY_CMD');
    }
  }

  handleMouseUp() {
    if (this.contentEditable.current) {
      const block = this.contentEditable.current;
      const { selectionStart, selectionEnd } = getSelection(block);
      if (selectionStart !== selectionEnd) {
        this.openActionMenu(block, 'TEXT_SELECTION');
      }
    }
  }

  handleDragHandleClick(e: any) {
    if (e.target) {
      const dragHandle = e.target;
      this.openActionMenu(dragHandle, 'DRAG_HANDLE_CLICK');
    }
  }

  openActionMenu(parent: any, trigger: string) {
    const { x, y } = this.calculateActionMenuPosition(parent, trigger);
    this.setState({
      ...this.state,
      actionMenuPosition: { x, y },
      actionMenuOpen: true,
    });

    setTimeout(() => {
      document.addEventListener('click', this.closeActionMenu);
    }, 100);
  }

  closeActionMenu() {
    this.setState({
      ...this.state,
      actionMenuPosition: { x: null, y: null },
      actionMenuOpen: false,
    });
    document.removeEventListener('click', this.closeActionMenu);
  }

  openTagSelectorMenu(trigger?: string) {
    const { x, y } = this.calculateTagSelectorMenuPosition(trigger);
    this.setState({
      ...this.state,
      tagSelectorMenuPosition: { x, y },
      tagSelectorMenuOpen: true,
    });
    document.addEventListener('click', this.closeTagSelectorMenu);
  }

  closeTagSelectorMenu() {
    this.setState({
      ...this.state,
      htmlBackup: null,
      tagSelectorMenuPosition: { x: null, y: null },
      tagSelectorMenuOpen: false,
    });
    document.removeEventListener('click', this.closeTagSelectorMenu);
  }

  handleTagSelection(tag: string) {
    if (tag === 'tag') {
      this.setState({ ...this.state, tag }, () => {
        this.closeTagSelectorMenu();
        if (this.fileInput) {
          this.fileInput.click();
        }
        this.props.addBlock({
          id: this.props.id,
          html: '',
          tag: 'p',
          imageUrl: '',
          ref: this.contentEditable.current,
        });
      });
    } else {
      if (this.state.isTyping) {
        this.state.htmlBackup &&
          this.setState({ tag, html: this.state.htmlBackup }, () => {
            this.contentEditable.current && setCaretToEnd(this.contentEditable.current);
            this.closeTagSelectorMenu();
          });
      } else {
        if (tag === 'img') {
          this.props.setIsVisible(true);
        }
        this.setState({ ...this.state, tag }, () => {
          this.closeTagSelectorMenu();
        });
      }
    }
  }

  async handleImageUpload() {
    if (this.fileInput && this.fileInput.files && this.fileInput.files[0]) {
      const pageId = this.props.pageId;
      const imageFile = this.fileInput.files[0];
      const formData = new FormData();
      formData.append('image', imageFile);
      try {
        const data = await uploadImage(pageId, formData);
        const imageUrl = data.imageUrl;
        this.setState({ ...this.state, imageUrl });
      } catch (err) {
        console.log(err);
      }
    }
  }

  addPlaceholder({ block, position, content }: PlaceholderProps) {
    const isFirstBlockWithoutHtml = position === 1 && !content;
    const isFirstBlockWithoutSibling = block.parentElement && !block.parentElement.nextElementSibling;

    if (isFirstBlockWithoutHtml && isFirstBlockWithoutSibling) {
      this.setState({
        ...this.state,
        html: 'Type a page title...',
        tag: 'h1',
        imageUrl: '',
        placeholder: true,
        isTyping: false,
      });
      return true;
    } else {
      return false;
    }
  }

  calculateActionMenuPosition(parent: HTMLElement, initiator?: string) {
    switch (initiator) {
      case 'TEXT_SELECTION':
        const { x: endX } = getCaretCoordinates(false);
        const { x: startX, y: startY } = getCaretCoordinates(true);
        const middleX = startX + (endX - startX) / 2;
        return { x: middleX, y: startY };
      case 'DRAG_HANDLE_CLICK':
        const x = parent.offsetLeft - parent.scrollLeft + parent.clientLeft - 90;
        const y = parent.offsetTop - parent.scrollTop + parent.clientTop + 35;
        return { x, y };
      default:
        return { x: null, y: null };
    }
  }

  calculateTagSelectorMenuPosition(initiator?: string) {
    switch (initiator) {
      case 'KEY_CMD':
        const { x: caretLeft, y: caretTop } = getCaretCoordinates(true);
        return { x: caretLeft, y: caretTop };
      case 'ACTION_MENU':
        const { x: actionX, y: actionY } = this.state.actionMenuPosition;
        if (actionX && actionY) {
          return { x: actionX - 40, y: actionY };
        }
      default:
        return { x: null, y: null };
    }
  }

  render() {
    return (
      <>
        {this.state.tagSelectorMenuOpen && (
          <TagSelectorMenu
            position={this.state.tagSelectorMenuPosition}
            closeMenu={this.closeTagSelectorMenu}
            handleSelection={this.handleTagSelection}
          />
        )}
        {this.state.actionMenuOpen && (
          <ActionMenu
            position={this.state.actionMenuPosition}
            actions={{
              deleteBlock: () => this.props.deleteBlock({ id: this.props.id }),
              turnInto: () => this.openTagSelectorMenu('ACTION_MENU'),
            }}
          />
        )}
        <Draggable draggableId={this.props.id} index={this.props.position}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} className='draggable' {...provided.draggableProps}>
              {this.state.tag !== 'img' && (
                <ContentEditable
                  innerRef={this.contentEditable}
                  data-position={this.props.position}
                  data-tag={this.state.tag}
                  html={this.state.html}
                  onChange={this.handleChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  onKeyDown={this.handleKeyDown}
                  onKeyUp={this.handleKeyUp}
                  onMouseUp={this.handleMouseUp}
                  tagName={this.state.tag}
                  className={[
                    'block',
                    this.state.isTyping || this.state.actionMenuOpen || this.state.tagSelectorMenuOpen
                      ? 'blockSelected'
                      : null,
                    this.state.placeholder ? 'placeholder' : null,
                    snapshot.isDragging ? 'isDragging' : null,
                  ].join(' ')}
                />
              )}
              {this.state.tag === 'img' && (
                <div
                  data-position={this.props.position}
                  data-tag={this.state.tag}
                  ref={this.contentEditable}
                  className={[
                    'image',
                    this.state.actionMenuOpen || this.state.tagSelectorMenuOpen ? 'blockSelected' : null,
                  ].join(' ')}
                >
                  {this.props.selectedPlot ? (
                    <VegaLite
                      spec={{
                        description: 'saved plots',
                        mark: this.props.selectedPlot.mark,
                        encoding: JSON.parse(JSON.stringify(this.props.selectedPlot.encoding)),
                        data: { name: 'table' },
                        padding: 5,
                      }}
                      data={{ table: JSON.parse(JSON.stringify(this.props.selectedPlot.data.values)) }}
                    />
                  ) : (
                    <label htmlFor={`${this.props.id}_fileInput`} className='fileInputLabel'>
                      No Plot Selected. Select one first.
                    </label>
                  )}
                  {/* <input
                    id={`${this.props.id}_fileInput`}
                    name={this.state.tag}
                    type='file'
                    onChange={this.handleImageUpload}
                    ref={(ref) => (this.fileInput = ref)}
                    hidden
                  />
                  {!this.state.imageUrl && (
                    <label htmlFor={`${this.props.id}_fileInput`} className='fileInputLabel'>
                      No Image Selected. Click To Select.
                    </label>
                  )}
                  {this.state.imageUrl && (
                    <img src={process.env.NEXT_PUBLIC_API + '/' + this.state.imageUrl} alt={this.state.imageUrl} />
                  )} */}
                </div>
              )}
              <span
                role='button'
                tabIndex={0}
                className='dragHandle'
                onClick={this.handleDragHandleClick}
                {...provided.dragHandleProps}
              >
                <img src='../../assets/icons/Draggable.svg' alt='Icon' />
              </span>
            </div>
          )}
        </Draggable>
      </>
    );
  }
}

export default EditableBlock;
