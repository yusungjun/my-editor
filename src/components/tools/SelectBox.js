import { makeStyles, Popper } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import { fontFamily, fontSize } from '../../common/constants'
import { FontFamily, FontSize } from '../styles/FontStyle'

const useStyles = makeStyles(theme => ({
    selectBox: {
        height: '30px',
        margin: '10px 0px',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        border: props => props.anchorEl ? '1px solid #004FC7': '1px solid #C4C4C4',
        borderRadius:'2px',
        padding:'0px 10px',
        width: props => props.listKey === 'fontFamily' ? '160px' : '100px',
        cursor:'pointer',
        "&:hover": {
            border: '1px solid #8293B4' 
        },
        "&:active": {
            border: '1px solid #ffffff'
        },
    },
    listBox: {
        padding: '7px 0px',
        border: '1px solid #C4C4C4',
        borderRadius: '2px',
        backgroundColor:'#ffffff'
    },
    listItem: {
        width: props => props.listKey === 'fontFamily' ? '160px' : '100px',
        padding: '7px 10px',
        "&:hover": {
            backgroundColor: '#F2F7FB'
        },
    },
}));


const SelectBox = ({editor, listKey, defaultValue, handleSelect}) => {

    const targetList = listKey === 'fontFamily' ? fontFamily : fontSize
    const [showValue, setShowValue] = useState(defaultValue);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const classes = useStyles({ listKey, anchorEl});
    const currentStyle = editor.editorState.getCurrentInlineStyle();

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    useEffect(() => {
        let flag = false;
        targetList && targetList.map((item, index) => {
            if (currentStyle.has(item.key)) {
                setShowValue(item.key)
                flag = true
            }
            return null;
        })
        if (!flag) {
            setShowValue(defaultValue)
        }
    }, [targetList, currentStyle, defaultValue])

    return (
        <React.Fragment>
            {targetList && targetList.map((item,index)=>{
                if (item.key === showValue){
                    return (
                        <div 
                            key={index} 
                            className={classes.selectBox}  
                            aria-describedby={id} 
                            onMouseDown={(e) => e.preventDefault()} 
                            onClick={handleClick}>
                            {listKey === 'fontFamily' ?
                                <div style={FontFamily[item.key]}>
                                    {item.viewText}
                                </div>
                                :
                                <div>
                                    {item.viewText}
                                </div>
                            }
                            <img src='/rozeus_editor/images/ic_common_select_arrow.png' alt='Select Box' style={{display:'block', width:'10px', height:'5px'}} />
                        </div>
                    )
                }
                return null;
            })}
            <Popper id={id} open={open} anchorEl={anchorEl}>
                <div className={classes.listBox}  onClick={handleClick}>
                {targetList && targetList.map((item, index) => {
                    if (item.key !== showValue) {
                        return (
                            <div 
                                key={index} 
                                className={classes.listItem} 
                                onMouseDown={(e) => e.preventDefault()} 
                                onClick={(e) => { setShowValue(item.key); handleSelect(item.key)}}>
                                {listKey === 'fontFamily' ?
                                    <div style={FontFamily[item.key]}>
                                        {item.viewText}
                                    </div>
                                    :
                                    <div style={FontSize[item.key]}>
                                        {item.viewText}
                                    </div>
                                }
                            </div>
                        )
                    }
                    return null;
                })}
                </div>
            </Popper>
        </React.Fragment>
    )

}

export default inject(({ editor }) => ({
    editor: editor,
}))(observer(SelectBox));