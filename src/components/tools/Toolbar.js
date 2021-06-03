import React from 'react';
import { inject, observer } from 'mobx-react';
import { blockTypeChange, fontChange } from '../func/FontFunction';
import SelectBox from './SelectBox';
import { makeStyles } from '@material-ui/core';
import ToolbarButton from './ToolbarButton';
import ColorPalette from './ColorPalette';
import { InsertAtomic } from '../atomic/AtomicFunction';
import SelectBox2 from './SelectBox2';
import SelectBoxLineHeight from './SelectBoxLineHeight';
import InsertCharcter from './InsertCharcter';
import InsertEmoji from './InsertEmoji';
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';
import BurstModeIcon from '@material-ui/icons/BurstMode';

import InsertLink from './InsertLink';
import { convertToRaw } from 'draft-js';
import { getSelectionText } from 'draftjs-utils';

const useStyles = makeStyles(theme => ({
    main: {
        display:'flex',
        //border: '1px solid #646464',
        //borderBottom:'0px',
        borderBottom: '1px solid #646464',
        padding:'0px 16px',
        justifyContent:'space-between'
    }
}));

const Toolbar = ({ editor, news }) => {
    const classes = useStyles();

    const handleChange = ( target ) => {
        fontChange(editor.setEditorState, editor.editorState, target)
    }

    const blockChange = (target) => {
        blockTypeChange(editor.setEditorState, editor.editorState, target)
    }

    const insertImage = (target) => {
        InsertAtomic(editor, 'image', 'IMMUTABLE', { src:'https://imgnews.pstatic.net/image/022/2021/02/19/20210219502940_20210219093141576.jpg?type=w647'})
    }

    const insertSlider = (target) => {
        InsertAtomic(editor, 'slider', 'IMMUTABLE', { src:target})
    }

    const saveTest = () => {
        // console.log(getSelectionText(editor.editorState));
        const content = editor.editorState.getCurrentContent();
        localStorage.setItem('CONTENT_TEST', JSON.stringify(convertToRaw(content)))
    }

    // const exportTest = () => {
    //     console.log(editor.editorState.getCurrentContent().getPlainText())
    // }

    const showNewsSearch = () => {
        news.setOpen(true);
    }

    return (
        <div className={classes.main}>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
            }}>
                <SelectBox listKey='fontFamily' defaultValue='NOTOSANS' handleSelect={handleChange} />
                <div style={{ width: '6px' }} />
                <SelectBox listKey='fontSize' defaultValue='SIZE_12PX' handleSelect={handleChange} />
                <div style={{ width: '6px' }} />
                <ToolbarButton type='BOLD' size={{ width: '7.4px', height: '9.95px' }} handleClick={handleChange} />
                <div style={{ width: '6px' }} />
                <ToolbarButton type='ITALIC' size={{ width: '5.89px', height: '10px' }} handleClick={handleChange} />
                <div style={{ width: '6px' }} />
                <ToolbarButton type='UNDERLINE' size={{ width: '9.08px', height: '12px' }} handleClick={handleChange} />
                <div style={{ width: '6px' }} />
                <ToolbarButton type='STRIKETHROUGH' size={{ width: '10px', height: '10.23px' }} handleClick={handleChange} />
                <div style={{ width: '6px' }} />
                <ColorPalette listKey='fontColor' defaultValue='COLOR_BLACK' handleSelect={handleChange} />
                <div style={{ width: '6px' }} />
                <ColorPalette listKey='backgroundColor' defaultValue='BACK_WHITE' handleSelect={handleChange} />
                <div style={{ width: '6px' }} />
                <SelectBoxLineHeight listKey='lineHeight' defaultValue='' handleSelect={handleChange} />
                <div style={{ width: '6px' }} />
                <SelectBox2 listKey='blockType' defaultValue='' handleSelect={blockChange} />
                <div style={{ width: '6px' }} />
                <ToolbarButton type='TEXT_LEFT' size={{ width: '10px', height: '10px' }} handleClick={blockChange} />
                <div style={{ width: '6px' }} />
                <ToolbarButton type='TEXT_CENTER' size={{ width: '10px', height: '10px' }} handleClick={blockChange} />
                <div style={{ width: '6px' }} />
                <ToolbarButton type='TEXT_RIGHT' size={{ width: '10px', height: '10px' }} handleClick={blockChange} />
                <div style={{ width: '6px' }} />
                <ToolbarButton type='TEXT_SUP' size={{ width: '10px', height: '10px' }} handleClick={handleChange} />
                <div style={{ width: '6px' }} />
                <ToolbarButton type='TEXT_SUB' size={{ width: '10px', height: '10px' }} handleClick={handleChange} />
                <div style={{ width: '6px' }} />
                <ToolbarButton type='IMG_B' size={{ width: '10px', height: '10px' }} handleClick={insertImage} />
                <div style={{ width: '6px' }} />
                <InsertCharcter />
                <div style={{ width: '6px' }} />
                <InsertEmoji />
                <div style={{ width: '6px' }} />
                <InsertLink/>
                <div style={{ width: '6px' }} />
                <ToolbarButton type='QUOTE_MEMO' size={{ width: '10px', height: '10px' }} handleClick={blockChange} />
                <div style={{ width: '6px' }} />
                <ToolbarButton type='QUOTE_VERTICAL' size={{ width: '10px', height: '10px' }} handleClick={blockChange} />
                <div style={{ width: '6px' }} />
                <ToolbarButton type='QUOTE_BALLOON' size={{ width: '10px', height: '10px' }} handleClick={blockChange} />
                <div style={{ width: '6px' }} />
                <ToolbarButton type='QUOTE_DOUBLE' size={{ width: '10px', height: '10px' }} handleClick={blockChange} />
                <div style={{ width: '6px' }} />
                <BurstModeIcon
                style={{ cursor: 'pointer', margin: '5px', border: '1px solid #646464', background: '#ffffff', width: '35px', height: '35px' }}
                onClick={(e) => insertSlider()} />       
                

            </div>
            <div
                onClick={showNewsSearch}
                style={{
                    cursor: 'pointer',
                    width: '100px',
                    minWidth: '100px',
                    height: '30px',
                    margin: '10px 0px',
                    border: '1px solid #C4C4C4',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0px 5px'
                }}
            >
                뉴스 찾기&nbsp;<FindInPageOutlinedIcon />
            </div>
            {
            // <button onClick={saveTest}>SAVE TEST</button>
            // <button onClick={exportTest}>EXPORT</button>
             }
        </div>
    )

}

export default inject(({ editor, news }) => ({
    editor: editor,
    news: news,
}))(observer(Toolbar));