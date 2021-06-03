import { convertFromRaw, convertToRaw, EditorState, Modifier, RichUtils, SelectionState } from "draft-js";
import { InsertAtomic } from "../atomic/AtomicFunction";
import { blockTypeChange, fontChange, linkTypeChange} from "../func/FontFunction";
import { HASHTAG_REGEX } from '../strategy/hashTag/HashTagStrategy'
import { MENTION_REGEX } from '../strategy/mention/MentionStrategy'
import { getSelectedBlock, getSelectedBlocksType, getBlockBeforeSelectedBlock, removeAllInlineStyles, insertNewUnstyledBlock, addLineBreakRemovingSelection } from 'draftjs-utils';
import { pastedText } from "../func/handler";

export const Inteface = (arg, editor, news) => {
    if (arg.data){
        const { type, param } = arg.data
        if(type){ 
            switch(type){
                case 'SET' : 
                    if(param){
                        switch(param.type){
                            case 'font' :
                                if (!editor.readOnly){
                                    switch(param.action){
                                        case 'SIZE':
                                            setFontSize(editor);
                                            break;
                                        default : 
                                            // // inline style 변경시 
                                            // const block = getSelectedBlock(editor.editorState);
                                            // let selection = new SelectionState({
                                            //     anchorKey: block.getKey(), // key of block
                                            //     anchorOffset: 0,
                                            //     focusKey: block.getKey(),
                                            //     focusOffset: block.getLength(), // key of block
                                            //     hasFocus: true,
                                            //     isBackward: false // isBackward = (focusOffset < anchorOffset)
                                            // });
                                            // let s = new SelectionState(selection);
                                            // editor.editorState = EditorState.forceSelection(editor.editorState, s);
                                            fontChange(editor.setEditorState, editor.editorState, param.action);
                                            break;
                                    }
                                }
                                break;
                            case 'news' :
                                if (!editor.readOnly) {
                                    InsertAtomic(editor, 'news', 'IMMUTABLE', param.data)
                                }
                                break;
                            case 'list' :
                                if (!editor.readOnly) {
                                    const style = param.action === 'UL' ? 'unordered-list-item' : param.action === 'OL'?'ordered-list-item' : param.action;
                                    blockTypeChange(editor.setEditorState, editor.editorState, style);
                                }
                                break;
                            case 'link' :
                                linkTypeChange(editor.setEditorState, editor.editorState, param.action);
                                break;    
                            case 'quote' :
                                blockTypeChange(editor.setEditorState, editor.editorState, param.action);
                                break;
                            case 'align' :
                                const blockType = getSelectedBlocksType(editor.editorState);
                                blockTypeChange(editor.setEditorState, editor.editorState, blockType == 'TEXT_LEFT' ? 'TEXT_CENTER' : (blockType == 'TEXT_CENTER' ? 'TEXT_RIGHT' : 'TEXT_LEFT'));
                                break;        
                            case 'image' :
                                InsertAtomic(editor, 'image', 'IMMUTABLE', { src:param.action+'?type=w647'})
                                break;    
                            case 'slider' :
                                InsertAtomic(editor, 'slider', 'IMMUTABLE', { src:param.action});
                                break;
                            case 'collage' :
                                InsertAtomic(editor, 'collage', 'IMMUTABLE', { src:param.action});
                                break;
                            case 'video' :
                                pastedText(param.action, editor);
                                break;      
                            case 'delete' :
                                const selectedBlock = getSelectedBlock(editor.editorState);
                                const beforeBlock = getBlockBeforeSelectedBlock(editor.editorState);
                                let removeSelection = new SelectionState({
                                    anchorKey: beforeBlock != null ? beforeBlock.key : selectedBlock.key,
                                    anchorOffset: beforeBlock != null ? beforeBlock.text.length : 0,
                                    focusKey: selectedBlock.key,
                                    focusOffset: selectedBlock.text.length
                                });
                                let newContentState = Modifier.removeRange(
                                    editor.editorState.getCurrentContent(),
                                    removeSelection,
                                    "backward"
                                );
                                editor.setEditorState(EditorState.push(editor.editorState, newContentState, 'remove-range'));//줄 삭제
                                if(beforeBlock == null){//첫줄일때 블록 스타일도 제거
                                    blockTypeChange(editor.setEditorState, editor.editorState, 'unstyled');
                                }
                                break;
                            case 'data' :
                                const convert = convertFromRaw(param.data);
                                editor.setEditorStateWithContent(convert)
                                break;                              
                            case 'test' :
                                // editor.setEditorState(addLineBreakRemovingSelection(editor.editorState))
                                break; 
                            case 'save' :
                                localStorage.setItem('CONTENT_TEST', JSON.stringify(convertToRaw(editor.editorState.getCurrentContent())))
                                break;
                            default :
                                break;
                        }
                    }
                    break;
                case 'GET':
                    Sender(editor)
                    break;
                case 'SHOW':
                    news.setOpen(true);
                    break;
                default : 
                    break;
            }
        }
    }

}

const Sender = ( editor ) => {
    const content = editor.editorState.getCurrentContent();
    const rawData = convertToRaw(content);
    const plainText = content.getPlainText();
    const entityMap = rawData.entityMap
    var imgList = [];
    var youtubeList = [];
    var videoList = [];
    var newsList = [];
    var linkList = [];
    var sliderList = [];
    var collageList = [];
    if(entityMap){
        const temp = Object.keys(entityMap).map((item,index)=>{
            return entityMap[item]
        });
        imgList = temp.filter(item => item.type === 'image').map(item => item.data.src);
        youtubeList = temp.filter(item => item.type === 'youtube').map(item => item.data.src);
        videoList = temp.filter(item => item.type === 'video').map(item => item.data.src);
        newsList = temp.filter(item => item.type === 'news').map(item => item.data);
        linkList = temp.filter(item => item.type === 'link').map(item => item.data.src);
        sliderList = temp.filter(item => item.type === 'slider').map(item => item.data.src);
        collageList = temp.filter(item => item.type === 'collage').map(item => item.data.src);
    }

    const retJSON = { 
        raw: rawData, 
        filter:{
            text: plainText,
            imgList : imgList,
            newsList: newsList,
            youtubeList: youtubeList,
            videoList: videoList,
            linkList: linkList,
            sliderList: sliderList,
            collageList: collageList,
            hashTag: getHashtag(plainText),
            mention: getMention(plainText),
        }
    }
    window.parent.postMessage(retJSON, '*')
}


const getHashtag = ( text ) => {
    const temp = text.match(HASHTAG_REGEX);
    const set = new Set(temp);
    const retArr = [...set]
    return retArr;
}

const getMention = (text) => {
    const temp = text.match(MENTION_REGEX);
    const set = new Set(temp);
    const retArr = [...set]
    return retArr;
}

const setFontSize = (editor) => {
    const styleMap = editor.editorState.getCurrentInlineStyle();
    if (styleMap.has('SIZE_10PX')){
        fontChange(editor.setEditorState, editor.editorState, 'SIZE_12PX');
        fontChange(editor.setEditorState, editor.editorState, 'SIZE_10PX');
    } else if(styleMap.has('SIZE_12PX')){
        fontChange(editor.setEditorState, editor.editorState, 'SIZE_14PX');
        fontChange(editor.setEditorState, editor.editorState, 'SIZE_12PX');
    } else if (styleMap.has('SIZE_14PX')) {
        fontChange(editor.setEditorState, editor.editorState, 'SIZE_16PX');
        fontChange(editor.setEditorState, editor.editorState, 'SIZE_14PX');
    } else if (styleMap.has('SIZE_16PX')) {
        fontChange(editor.setEditorState, editor.editorState, 'SIZE_18PX');
        fontChange(editor.setEditorState, editor.editorState, 'SIZE_16PX');
    } else if (styleMap.has('SIZE_18PX')) {
        fontChange(editor.setEditorState, editor.editorState, 'SIZE_20PX');
        fontChange(editor.setEditorState, editor.editorState, 'SIZE_18PX');
    } else if (styleMap.has('SIZE_20PX')) {
        fontChange(editor.setEditorState, editor.editorState, 'SIZE_10PX');
        fontChange(editor.setEditorState, editor.editorState, 'SIZE_20PX');
    } else{
        fontChange(editor.setEditorState, editor.editorState, 'SIZE_18PX');
    }
}