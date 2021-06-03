import { makeStyles, Popper } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles(theme => ({
    selectBox: {
        width: '30px',
        height: '30px',
        display: 'flex',
        margin: '10px 0px',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: props => props.anchorEl ? '1px solid #004FC7' : '1px solid #C4C4C4',
        borderRadius: '2px',
        padding: '0px',
        cursor: 'pointer',
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
        backgroundColor: '#ffffff'
    },
    fontSelected: {
        width:'100%',
        display: 'flex',
        justifyContent: 'center',
    },
    fontListItem: {
        padding: '7px 10px',
        "&:hover": {
            backgroundColor: '#F2F7FB'
        }
    },
    backListItem: {
        display:'flex',
        justifyContent:'center',
        width:'30px',
        height:'30px'
    },
    backListItemDiv:{
        width:'calc(100% - 2px)',
        height: 'calc(100% - 2px)',
        minWidth: '10px',
        minHeight: '10px'
    }
}));


const ColorPalette = ({ editor, listKey, defaultValue, handleSelect }) => {

    const [targetList, setTargetList] = useState()
    const [showValue, setShowValue] = useState(defaultValue);
    const [anchorEl, setAnchorEl] = useState(null);

    const classes = useStyles({ listKey, anchorEl });
    const currentStyle = editor.editorState.getCurrentInlineStyle();
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    useEffect(()=>{
        if (listKey === 'fontColor'){
            setTargetList(JSON.parse(JSON.stringify(editor.fontColor)))
        }else{
            setTargetList(JSON.parse(JSON.stringify(editor.backgroundColor)))
        }

    }, [listKey, editor.fontColor, editor.backgroundColor])

    useEffect(() => {
        let flag = false;
        targetList && Object.keys(targetList).map((item, index) => {
            if (currentStyle.has(item)) {
                setShowValue(item)
                flag=true
            }
            return null;
        })
        if(!flag){
            setShowValue(defaultValue)
        }
    }, [targetList, currentStyle, defaultValue])

    
    return (
        <React.Fragment>
            <div
                className={classes.selectBox}
                aria-describedby={id}
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleClick}>
                {listKey === 'fontColor' ?
                    <div className={classes.fontSelected} style={editor.fontColor[showValue]}>
                            A
                    </div>
                    :
                    <div className={classes.backListItemDiv} style={editor.backgroundColor[showValue]} />
                }
            </div>
            <Popper id={id} open={open} anchorEl={anchorEl}>
                <div className={classes.listBox} onClick={handleClick}>
                    {targetList && Object.keys(targetList).map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={listKey === 'fontColor' ? classes.fontListItem : classes.backListItem}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={(e) => { setShowValue(item); handleSelect(item) }}>
                                    {listKey === 'fontColor' ?
                                        <div style={editor.fontColor[item]}>
                                            A
                                        </div>
                                    :
                                        <div className={classes.backListItemDiv} style={editor.backgroundColor[item]} />
                                    }
                                </div>
                            )
                    })}
                </div>
            </Popper>
        </React.Fragment>
    )

}

export default inject(({ editor }) => ({
    editor: editor,
}))(observer(ColorPalette));