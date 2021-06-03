import { EditorState, RichUtils,RichTextEditorUtil } from "draft-js"
import { getSelectedBlock, getSelectionInlineStyle } from 'draftjs-utils'
import _ from 'lodash'
export const fontChange = (setFunc, state, style) => {
    setFunc(RichUtils.toggleInlineStyle(state, style));

    let styles = [...state.getCurrentInlineStyle()];
    styles = !styles.includes(style) ? [...styles, style] : _.without(styles,style);
    localStorage.setItem('inline-style',JSON.stringify(styles));

    // console.log(getSelectedBlock(state))
    // console.log(state.getSelection());
    // localStorage.setItem('inline-style-focus',state.getSelection().focusOffset);
}

export const blockTypeChange = (setFunc, state, style) => {
    setFunc(RichUtils.toggleBlockType(state, style));
    // const selection = state.getSelection()
    // let contentState = state.getCurrentContent();

    // const contentBlock = contentState.getBlockForKey(selection.getStartKey())    
    // var dataMap = contentBlock.getData();
    // dataMap.push(style)
    // // const newEditorState = EditorState.set(state, { currentContent:  Modifier.setBlockType(contentState, state.getSelection(), style)})
    // const newEditorState = EditorState.set(state, { currentContent: Modifier.setBlockData(contentState, state.getSelection(), contentBlock.getData()) })
    // setFunc(newEditorState)
    
}

export const linkTypeChange = (setFunc, state, url) => {
    const contentWithEntity = state.getCurrentContent().createEntity("link", "MUTABLE", {src: url});
    const newEditorState = EditorState.set(state, { currentContent: contentWithEntity });
    setFunc(RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        contentWithEntity.getLastCreatedEntityKey()
    ));
}
