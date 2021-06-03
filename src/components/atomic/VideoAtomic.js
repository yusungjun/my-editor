import { Popper } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import React, { useState } from 'react';
import { DeleteAtomic } from './AtomicFunction';

import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

const VideoAtomic = ({editor, block, type, src}) => {
    const [align, setAlign] = useState('center');
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <div style={{ display: 'flex', justifyContent: align }}>
            <div
                onClick={handleClick}
                style={{ position:'relative', resize: 'both', overflow: 'auto', width:'60vw'  }}
            >
                <video id="background-video" preload={`auto`} controls style={{width:'100%'}}>
                    <source src={src} type="video/mp4" />
                </video>
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
                {!editor.readOnly &&
                    <img src='/rozeus_editor/images/transparentImg.png' style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} alt='___' />
                }
        </div>
        </div>
    )
}

export default inject(({ editor }) => ({
    editor: editor,
}))(observer(VideoAtomic));