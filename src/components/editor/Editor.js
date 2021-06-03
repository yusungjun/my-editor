
import React, { useEffect, useRef, useState } from 'react';
import { inject, observer } from 'mobx-react';

import { Editor as DraftEditor, EditorState , convertFromRaw, getDefaultKeyBinding, KeyBindingUtil, Modifier, RichUtils, SelectionState, ContentBlock, genKey, ContentState } from 'draft-js'
import { getSelectedBlock, getSelectionInlineStyle, removeSelectedBlocksStyle, addLineBreakRemovingSelection } from 'draftjs-utils'
 
import { blockRenderer, extendedBlockRenderMap, blockStyleFn } from '../func/blockRenderer';
import { pastedFiles, pastedText, droppedFiles} from '../func/handler';

import { FontFamily, FontSize, LineHeight, ListTypeStyle, Subscript} from '../styles/FontStyle'
import { makeStyles } from '@material-ui/core';
import { Strategy } from '../strategy/Strategy';
import { List, OrderedSet } from 'immutable';

const useStyles = makeStyles(theme => ({
    main: {
        height: '100%', 
        //border: '1px solid #646464', 
        padding: '22px 16px', 
        // paddingRight: '0px', 
        background: '#ffffff', 
        overflow: 'auto',
        '&::-webkit-scrollbar-button': {
            width: '0px',
            height: '0px'
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#CBCBCB',
            border: '3px solid transparent',
            borderRadius: '10px',
            backgroundClip: 'content-box'
        },
        '&::-webkit-scrollbar': {
            width: '20px',
            //borderLeft: '1px solid #646464',
        },

    }
}));

const Editor = ({ editor }) => {
    const classes = useStyles();
    const [customStyleMap, setCustomStyleMap] = useState();
    const editorComp = useRef();



    // localstorage
    useEffect(() => {
        localStorage.setItem('enter_block_key','')

        // const data = localStorage.getItem('CONTENT_TEST');
        // if(data != null){
        //     const getSavedEditorData = () => {
        //         return data ? JSON.parse(data) : null;
        //     }
        //     const contentState = getSavedEditorData();
        //     if(contentState.raw != null ){
        //         editor.setEditorState(EditorState.createWithContent(convertFromRaw(contentState.raw),Strategy));
        //     }
        //     else{
        //         editor.setEditorState(EditorState.createWithContent(convertFromRaw(contentState),Strategy));
        //     }
        // }
    }, []);

    useEffect(()=>{
        const fontColor = JSON.parse(JSON.stringify(editor.fontColor))
        const backgroundColor = JSON.parse(JSON.stringify(editor.backgroundColor))
        const temp = { ...FontFamily, ...FontSize, ...Subscript, ...LineHeight, ...fontColor, ...backgroundColor, ...ListTypeStyle }
        setCustomStyleMap(temp)
    }, [editor.fontColor, editor.backgroundColor]);

    useEffect(() => {//한글 입력후 포커스 변경
        localStorage.removeItem('inline-style');

        const initBlock = editor.editorState.getCurrentContent().getBlockBefore(editor.editorState.getSelection().focusKey);
        if(initBlock != null){
            if(localStorage.getItem('enter_block_key') != initBlock.key){
                localStorage.setItem('enter_block_key','')
            }
        }
        let contentState = editor.editorState.getCurrentContent();
        const contentStateWithEntity = editor.editorState.getCurrentContent().createEntity('STXT', 'IMMUTABLE')
        const selection = editor.editorState.getSelection();
        if (selection.anchorOffset === selection.focusOffset && selection.anchorKey === selection.focusKey) {
            contentState = Modifier.insertText(contentState, editor.editorState.getSelection(), '', null, contentStateWithEntity.getLastCreatedEntityKey());
            editor.setEditorState(EditorState.push(editor.editorState,contentState,'insert-characters'));
        } 
    }, [editor.editorState.getSelection().focusKey]);

    const handleFocus = (e) => {
        if(editor.editorState.getSelection().getHasFocus()){
            editorComp.current.focus();
        }else{
            editor.setEditorState(EditorState.moveFocusToEnd(editor.editorState));
        }
    }

    const divHandleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    const divHandleDrop = (e) => {
        e.preventDefault();
    }

    const handlePastedFiles = (file) => {
        pastedFiles(file, editor)
    }

    const handlePastedText = (text) => {
        return pastedText(text, editor);
    }

    const handleDroppedFiles = (selection, file) => {
        droppedFiles(file, editor)
    }

    function keyBindingFn(e) {
        const { hasCommandModifier } = KeyBindingUtil;
        if (e.keyCode == 229){//드래그해서 선택하고 한글 입력시, 이전에 드래그한 텍스트가 undo 되는 오류
            const selection = editor.editorState.getSelection();
            if (selection.anchorKey != selection.focusKey) {
                let contentState = editor.editorState.getCurrentContent();
                const contentStateWithEntity = editor.editorState.getCurrentContent().createEntity('STXT', 'IMMUTABLE');
                contentState = Modifier.replaceText(contentState, editor.editorState.getSelection(), '', null, contentStateWithEntity.getLastCreatedEntityKey());
                editor.setEditorState(EditorState.push(editor.editorState,contentState,'insert-characters'));
            } 
        }

        if (e.keyCode === 13) {//엔터키 이벤트
            localStorage.setItem('enter_block_key','');
            const target = getSelectedBlock(editor.editorState);//엔터키 입력시 포커싱된 블록 키
            if(target.type == 'UL_SQUARE' && target.text == ''){//이 타입일때 새 블록 생성후 빈값에서 엔터를 치면 블록이 해제됨.
                editor.setEditorState(RichUtils.toggleBlockType(editor.editorState, 'unstyled'));
                return false;
            }
            localStorage.setItem('enter_block_key',target.key);
        }

        if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {//ctrl + s
            // editor.setEditorState(RichUtils.toggleBlockType(editor.editorState, 'unstyled'));
            return 'myeditor-save';
        }

        return getDefaultKeyBinding(e);
    }
    return (
        <React.Fragment>
            <div className={classes.main} onClick={handleFocus} /*onDragOver={(e) => divHandleDragOver(e)} onDrop={divHandleDrop}*/>
                <DraftEditor 
                    editorState={editor.editorState}
                    onChange={editor.setEditorState}
                    customStyleMap={customStyleMap}
                    ref={editorComp}
                    blockStyleFn={blockStyleFn}
                    blockRendererFn={blockRenderer}
                    blockRenderMap={extendedBlockRenderMap}
                    handlePastedFiles={handlePastedFiles}
                    handlePastedText={handlePastedText}
                    handleDroppedFiles={handleDroppedFiles}
                    keyBindingFn={keyBindingFn}
                    readOnly={editor.readOnly}
                />
            </div>
        </React.Fragment>
    )

}

export default inject(({ editor }) => ({
    editor: editor,
}))(observer(Editor));