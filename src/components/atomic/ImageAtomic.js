import { Popper } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import React, { useState } from 'react';
import { DeleteAtomic } from './AtomicFunction';

import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

const ImageAtomic = ({ editor, block, type, src }) => {
    const [align, setAlign] = useState('center');
    const [imgSize, setImgSize] = useState({ width: '320px', height: 'auto' });
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        if(!editor.readOnly){
            setAnchorEl(anchorEl ? null : event.currentTarget);
        }else{
            window.open(src);
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const handleImageLoad = (e) => {
        setImgSize({ width: e.target.width + 'px', height: e.target.height + 'px', maxHeight: e.target.height + 'px' })
    }

    return (
        <div style={{display:'flex', justifyContent: align }}>
            <div 
                onClick={handleClick} 
                style={{ resize: 'both', overflow: (!editor.readOnly ? 'auto' : 'none'), width: imgSize.width, height: imgSize.height }}
                >
                <img 
                    src={src} 
                    style={{ width: '100%' }} 
                    alt={type} 
                    onLoad={handleImageLoad}
                />
                <Popper id={id} open={open} anchorEl={anchorEl} placement='top'>
                    <div style={{ cursor: 'pointer' }}>
                        <FormatAlignLeftIcon onClick={(e) => setAlign('flex-start')} />
                        <FormatAlignCenterIcon onClick={(e) => setAlign('center')} />
                        <FormatAlignRightIcon onClick={(e) => setAlign('flex-end')} />
                    </div>
                </Popper>
                <Popper id={id} open={open} anchorEl={anchorEl} placement='top-end'>
                    <div style={{ cursor: 'pointer' }}>
                        <DeleteForeverOutlinedIcon onClick={(e) => DeleteAtomic(block, editor)} />
                    </div>
                </Popper>
            </div>
        </div>
    )
}

export default inject(({ editor }) => ({
    editor: editor,
}))(observer(ImageAtomic));
