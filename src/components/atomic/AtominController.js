import React from 'react';
import ImageAtomic from './ImageAtomic';
import VideoAtomic from './VideoAtomic';
import YoutubeAtomic from './YoutubeAtomic';
import NewsAtomic from './NewsAtomic';
import BlockSplitter from '../func/blockSplitter';
import SliderAtomic from './SliderAtomic';
import CollageAtomic from './CollageAtomic';

const AtominController = ({ contentState, block }) => {
    var media = null;
    if(block.getEntityAt(0)){
        const entity = contentState.getEntity(block.getEntityAt(0));
        const { src } = entity.getData();
        const type = entity.getType();
        if (type === 'image') {
            media = <ImageAtomic block={block} type={type} src={src} />
        }
        if (type === 'youtube') {
            media = <YoutubeAtomic block={block} type={type} src={src} />
        }
        if (type === 'video') {
            media = <VideoAtomic block={block} type={type} src={src} />
        }
        if (type === 'news') {
            media = <NewsAtomic block={block} type={type} item={entity.getData()} />
        }
        if (type === 'slider') {
            media = <SliderAtomic block={block} type={type} src={src} />
        }
        if (type === 'collage') {
            media = <CollageAtomic block={block} type={type} src={src} />
        }
    }
    return (
        <React.Fragment>
            <div style={{position:'relative', marginBottom: '30px', marginTop: '30px'}}>
                {media}
                <BlockSplitter blockKey={block.key}/>
            </div>
        </React.Fragment>
    );
};

export default AtominController;