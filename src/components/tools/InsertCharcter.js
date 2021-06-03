import { EditorState, Modifier } from 'draft-js';
import { inject, observer } from 'mobx-react';
import React from 'react';

import EmojiSymbolsOutlinedIcon from '@material-ui/icons/EmojiSymbolsOutlined';

const InsertCharcter = ({editor}) => {
    const insertC = () =>{
        let contentState = editor.editorState.getCurrentContent()
        const contentStateWithEntity = editor.editorState.getCurrentContent().createEntity('STXT', 'IMMUTABLE')
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
        contentState = Modifier.insertText(contentState, editor.editorState.getSelection(), '★', null, entityKey)
        editor.setEditorState(EditorState.push(editor.editorState,contentState,'insert-characters'))
    }
    
    return (
        <div 
            style={{
                cursor: 'pointer',
                height: '30px',
                margin: '10px 0px',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                border: '1px solid #c4c4c4'
            }}
            onClick={insertC}>
            <EmojiSymbolsOutlinedIcon />
        </div>
    )
}

export default inject(({ editor }) => ({
    editor: editor,
}))(observer(InsertCharcter));