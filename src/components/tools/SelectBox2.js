import { makeStyles, Popper } from '@material-ui/core';
import React, { useState } from 'react';

import { blockType } from '../../common/constants'

import SubjectIcon from '@material-ui/icons/Subject';

const useStyles = makeStyles(theme => ({
    selectBox: {
        height: '30px',
        margin: '10px 0px',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        border: props => props.anchorEl ? '1px solid #004FC7': '1px solid #C4C4C4',
        borderRadius:'2px',
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
        width: '100px',
        padding: '7px 10px',
        "&:hover": {
            backgroundColor: '#F2F7FB'
        },
    },
}));


const SelectBox2 = ({listKey, defaultValue, handleSelect}) => {


    const targetList = blockType
    const [showValue, setShowValue] = useState(defaultValue);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const classes = useStyles({ listKey, anchorEl});

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

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
                            <SubjectIcon />
                        </div>
                    )
                }
                return null;
            })}
            <Popper id={id} open={open} anchorEl={anchorEl} placement='bottom-start'>
                <div className={classes.listBox}  onClick={handleClick}>
                {targetList && targetList.map((item, index) => {
                    if (item.key !== showValue) {
                        return (
                            <div 
                                key={index} 
                                className={classes.listItem} 
                                onMouseDown={(e) => e.preventDefault()} 
                                onClick={(e) => { setShowValue(item.key); handleSelect(item.key)}}>
                                    <div>
                                        {item.viewText}
                                    </div>
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

export default SelectBox2;