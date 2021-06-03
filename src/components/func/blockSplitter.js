import React from 'react'
import { makeStyles} from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import { removeSelectedBlocksStyle } from 'draftjs-utils';
import { EditorState, Modifier, SelectionState } from 'draft-js';
import { OrderedSet } from 'immutable';

const useStyles = makeStyles(theme => ({
    splitter: {
        height:'30px',
        position: 'absolute',
        cursor: 'pointer',
        left: 0,
        right: 0,
        width: '100%',
        maxWidth:'320px',
        margin: '0 auto',
        '&:after': {
            content: '""',
            width: '100%',
            background: '#e4e4e4',
            height:'3px',
            position: 'absolute',
            visibility: 'hidden',
            top: '15px',
            opacity: '0',
        },
        '&:hover:after': {
            transitionProperty: 'opacity',
            transitionDelay: '.05s',
            transitionDuration: '.3s',
            visibility: 'inherit',
            opacity: '1'
        }
    }
}));

function BlockSplitter({editor, blockKey}) {
    const classes = useStyles();
    const split = () => {
        const content = editor.editorState.getCurrentContent();
        const blockMap = content.getBlockMap();
        const block = blockMap.get(blockKey);
        const selection = new SelectionState({
            anchorKey: block.getKey(), // key of block
            anchorOffset: block.getLength(),
            focusKey: block.getKey(),
            focusOffset: block.getLength(), // key of block
            hasFocus: true,
            isBackward: false // isBackward = (focusOffset < anchorOffset)
        });
        const entityKey = Modifier.splitBlock(content, selection);
        editor.setEditorState(EditorState.push(editor.editorState, entityKey,'split-block'));//개행
        editor.setEditorState(removeSelectedBlocksStyle(editor.editorState));//개행 후 블록 스타일 삭제
        // const test = () => {
        //     let contentState = editor.editorState.getCurrentContent()
        //     const contentStateWithEntity = editor.editorState.getCurrentContent().createEntity('STXT', 'IMMUTABLE')
        //     const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
        //     contentState = Modifier.insertText(contentState, editor.editorState.getSelection(), 'test', OrderedSet.of('BOLD'), entityKey);
        //     editor.setEditorState(EditorState.push(editor.editorState,contentState,'insert-characters'))
        // }
        // test();

    }
    const checkVisible = () => {
        let flag = true;
        const nextBlock = editor.editorState.getCurrentContent().getBlockAfter(blockKey);
        if(nextBlock != null && (nextBlock.type == "unstyled" || nextBlock.type.includes("TEXT_"))){
            flag = false;
        }
        return flag;
    }
    return (
        <React.Fragment>
            {
                checkVisible()&&!editor.readOnly&&
                <div className={classes.splitter} onClick={split} onMouseUp={split} contentEditable={'false'} />
            }
        </React.Fragment>
    )
}

export default inject(({ editor }) => ({
    editor: editor,
}))(observer(BlockSplitter));