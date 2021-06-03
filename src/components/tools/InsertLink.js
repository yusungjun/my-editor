import { EditorState, Modifier, RichUtils } from 'draft-js';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinkIcon from '@material-ui/icons/Link';


const InsertLink = ({editor}) => {
    const [open, setOpen] = useState(false);
    const [link, setLink] = useState('http://');

    const handleChange = (e) => {
        setLink(e.target.value);
    }
    const handleClickOpen = () => {
        setLink('http://');
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    const handlePutLink = (e) => {
        const editorState = editor.editorState;
        const content = editorState.getCurrentContent();
        const contentWithEntity = content.createEntity("link", "MUTABLE", {src: link});
        const entityKey = contentWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentWithEntity });
        editor.setEditorState(RichUtils.toggleLink(
            newEditorState,
            newEditorState.getSelection(),
            entityKey
        ));
        setOpen(false);
        return "handled";
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handlePutLink(e);
        }
    }
    return (
        <React.Fragment>
            <LinkIcon style={{
                cursor: 'pointer',
                height: '30px',
                margin: '10px 0px',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                border: '1px solid #c4c4c4'
            }}
            onClick={handleClickOpen}/>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">링크</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="URL을 입력하세요."
                        type="text"
                        fullWidth
                        value={link}
                        onChange={(e) => handleChange(e)}
                        onKeyPress={(e) => handleKeyPress(e)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">취소</Button>
                    <Button onClick={handlePutLink} color="primary">확인</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>        
    )
}

export default inject(({ editor }) => ({
    editor: editor,
}))(observer(InsertLink));
