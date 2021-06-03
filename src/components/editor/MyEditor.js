import React from 'react';
import ReactDOM from 'react-dom';
import { AtomicBlockUtils, Editor, EditorState, Entity, RichUtils, convertToRaw } from 'draft-js';

export default class MyEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = { editorState: EditorState.createEmpty() };

        this.onChange = (editorState) => this.setState({ editorState });

        this.logState = () => {
            const content = this.state.editorState.getCurrentContent();
            console.log(convertToRaw(content));
        };

        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.addMedia = this._addMedia.bind(this);
        this.addImage = this._addImage.bind(this);
    }

    _handleKeyCommand(command) {
        const { editorState } = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _addMedia(type) {
        const src = window.prompt('Enter a URL');
        if (!src) {
            return;
        }

        const entityKey = Entity.create(type, 'IMMUTABLE', { src });

        const { editorState } = this.state;
        const newState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');

        console.log(convertToRaw(editorState.getCurrentContent()), convertToRaw(newState.getCurrentContent()), Entity.get(entityKey));

        return newState;
    }

    _addImage() {
        this.onChange(this._addMedia('image'));
    }

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <div>
                    <button onMouseDown={this.addImage}>
                        Add Image
					</button>
                </div>
                <div>
                    <Editor
                        blockRendererFn={mediaBlockRenderer}
                        editorState={this.state.editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        placeholder="Enter some text..."
                        ref="editor"
                    />
                </div>
                <input onClick={this.logState} type="button" value="Log State" />
            </div>
        );
    }
}

function mediaBlockRenderer(block) {
    if (block.getType() === 'atomic') {
        return {
            component: Media,
            editable: false
        };
    }
    return null;
}

const Image = (props) => {
    return <img src={props.src} />;
};

const Media = (props) => {

    const entity = Entity.get(props.block.getEntityAt(0));

    const { src } = entity.getData();
    const type = entity.getType();

    let media;
    if (type === 'image') {
        media = <Image src={src} />;
    }

    return media;
};
