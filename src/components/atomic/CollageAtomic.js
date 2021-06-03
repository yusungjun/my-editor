import { inject, observer } from 'mobx-react';
import React, { useState } from 'react';
import { ReactPhotoCollage } from "react-photo-collage";

const CollageAtomic = ({ editor, block, type, src }) => {
    const [imgSize, setImgSize] = useState({ width: 320, height:  200});
    const [anchorEl, setAnchorEl] = useState(null);
    const [srcList, setSrcList] = useState([...src]);
    
    const baseUrl = '/rozeus_editor/images'
    const setting = {
        width: '320px',
        height: ['130px', '70px'],
        layout: [1, 4],
        showNumOfRemainingPhotos: true,
        photos: srcList.map(e=>{
            return {source: baseUrl + e}
        })
    };
    return (
        <div style={{display:'flex', justifyContent: 'center' }}>
            <div style={{ resize: 'both', overflow: 'hidden', width: imgSize.width, height: imgSize.height }}>
                <ReactPhotoCollage {...setting} />
            </div>
        </div>
    )
}
export default inject(({ editor }) => ({
    editor: editor,
}))(observer(CollageAtomic));
