import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';

import { getResizeInfo } from '../../common/interface/common'

import BackgroundImageOnLoad from 'background-image-on-load';

import { makeStyles } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';
//import Truncate from 'react-truncate';
import DateViewer from './DateViewer';
import { InsertAtomic } from '../atomic/AtomicFunction';

const useStyles = makeStyles(theme => ({
    item : {
        display:'flex',
        width:'100%',
        height:'70px',
        cursor: 'pointer',
        margin:'14px 0px'
    },
    thumnail : {
        width: '120px',
        height:'70px',
    },
    detail :{
        flexGrow: 1, 
        height:'70px',
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        paddingLeft:'6px'
    },
    icoArea : {
        width: '100%',
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems:'center'
    }

}));


const CardItem = ({ editor, item }) => {

    const classes = useStyles();
    const [position, setPosition] = useState('center center');
    const [imgUrl, setImgUrl] = useState('/rozeus_editor/images/ico_news_default.png');
    const [imgLoadStatus, setImgLoadStatus ] = useState(false);

    var targetImg = item.img_urls;
    if (item.img_urls) {
        if(item.img_urls.indexOf("#") > 0){
            targetImg = item.img_urls.substr(0, item.img_urls.indexOf("#"))
        }
    }

    const newsClick = () => {
        InsertAtomic(editor, 'news', 'IMMUTABLE', item)
    }

    const backgroundLoaded = () => {
        const img = getResizeInfo(targetImg,0.34,100);
        setImgUrl(targetImg);
        setPosition(img.position);
        setImgLoadStatus(true)
    }

    const backgroundLoadFail = () => {
        setImgUrl('/rozeus_editor/images/ico_news_default.png');
        setImgLoadStatus(false)
    }

    return (
        <div className={classes.item}>
            <BackgroundImageOnLoad
                src={targetImg}
                onLoadBg={backgroundLoaded}
                onError={backgroundLoadFail}
            />
            <div style={{ display: 'flex', alignItems: 'center' }} onClick={newsClick}>
                <div 
                    className={classes.thumnail} 
                    style={{
                        backgroundImage: 'url(' + imgUrl +')',
                        backgroundColor: imgLoadStatus ? '#ffffff' : '#F7F7F8',
                        backgroundSize: imgLoadStatus ? '120px auto' : '42.64px 46px',
                        backgroundPosition: imgLoadStatus ? position : 'center center',
                        backgroundRepeat:'no-repeat',
                        border:'1px solid #E5E5E5'
                    }}
                />
            </div>
            <div className={classes.detail}>
                <div onClick={newsClick} style={{ overflow:'hidden',}}>
                    <Typography component='span' variant='subtitle1' style={{ fontSize: '12px',lineHeight:'14px'}}>{item.title}</Typography>
                </div>
                <div className={classes.icoArea}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography component='span' variant='body1' style={{ fontWeight: 'bold', fontSize: '11px' }}>
                            {item.med_nm}
                        <Typography component='span' variant='body1' style={{ fontSize: '8px' }}>&nbsp;|&nbsp;</Typography>
                            {item.cat_nm}
                        <Typography component='span' variant='body1' style={{ fontSize: '8px' }}>&nbsp;|&nbsp;</Typography>
                            <DateViewer target={item.news_dt}/>
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default inject(({ editor }) => ({
    editor: editor,
}))(observer(CardItem));