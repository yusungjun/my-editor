import { EditorState, Modifier } from 'draft-js';
import { inject, observer } from 'mobx-react';
import React from 'react';

import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';

const InsertEmoji = ({editor}) => {
    const insertC = () =>{
        let contentState = editor.editorState.getCurrentContent()
        const contentStateWithEntity = editor.editorState.getCurrentContent().createEntity('STXT', 'IMMUTABLE')
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
        const selection = editor.editorState.getSelection();
        const selectionStart = selection.getStartOffset();
        const selectionEnd = selection.getEndOffset();
        if (selectionEnd === selectionStart) {
            contentState = Modifier.insertText(contentState, editor.editorState.getSelection(), String.fromCharCode(0x231A), null, entityKey);
        } else {
            contentState = Modifier.replaceText(contentState, editor.editorState.getSelection(), String.fromCharCode(0x231A), null, entityKey);
        }
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
            <EmojiEmotionsOutlinedIcon />
        </div>
    )
}

export default inject(({ editor }) => ({
    editor: editor,
}))(observer(InsertEmoji));