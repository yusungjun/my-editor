import { makeStyles } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';

import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';

import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined';

import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';

const useStyles = makeStyles(theme => ({
    main: {
        cursor: 'pointer',
        width: '30px', 
        height: '30px',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        margin:'10px 0px',
        border: props => props ? '2px solid #545454' : '1px solid #c4c4c4'
    }
}));

const ToolbarButton = ({editor, handleClick, type, size}) => {
    const [showType, setShowType] = useState('');
    const currentStyle = editor.editorState.getCurrentInlineStyle();
    const classes = useStyles(currentStyle.has(type));
    // if (currentStyle.has(type)){
    //     console.log(currentStyle.has(type))
    //     console.log(currentStyle.get(type))
    // }
    
    
    useEffect(()=>{
        switch(type){
            case 'TEXT_LEFT':
                setShowType(<FormatAlignLeftIcon />);
                return ;
            case 'TEXT_CENTER':
                setShowType(<FormatAlignCenterIcon />);
                return ;
            case 'TEXT_RIGHT':
                setShowType(<FormatAlignRightIcon />);
                return ;
            case 'TEXT_SUP':
                setShowType(<VerticalAlignTopIcon />);
                return ;
            case 'TEXT_SUB':
                setShowType(<VerticalAlignBottomIcon />);
                return ;
            case 'IMG_B':
                setShowType(<InsertPhotoOutlinedIcon />);
                return;
            case 'QUOTE_MEMO':
                setShowType(<InsertDriveFileIcon style={{transform: 'rotate(90deg)'}} />);
                return;
            case 'QUOTE_VERTICAL':
                setShowType(<VerticalSplitIcon style={{transform: 'rotate(180deg)'}} />);
                return;
            case 'QUOTE_BALLOON':
                setShowType(<ChatBubbleIcon />);
                return;
            case 'QUOTE_DOUBLE':
                setShowType(<FormatQuoteIcon />);
                return;
            default :
                setShowType('IMG');
                return ;
        }
    }, [type])
    
    return (
        <div className={classes.main}
            onMouseDown={(e) => e.preventDefault()}
            onClick={(e) => handleClick(type)}
        >
            {showType === 'IMG' ? 
                <img 
                    src={'/rozeus_editor/images/ic_toolbar_'+type+'.png'} 
                    alt={type+' BUTTON'} 
                    style={{
                        display:'block',
                        width:size.width,
                        height:size.height
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                />
            :
                <div>{showType}</div>
            }
        </div>
    )
}

export default inject(({ editor }) => ({
    editor: editor,
}))(observer(ToolbarButton));