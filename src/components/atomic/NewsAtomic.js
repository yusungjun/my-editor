import { makeStyles, Popper, Typography } from '@material-ui/core';
import BackgroundImageOnLoad from 'background-image-on-load';
import { inject, observer } from 'mobx-react';
import React, { useState } from 'react';
import { getResizeInfo } from '../../common/interface/common';
import DateViewer from '../news/DateViewer';
import { DeleteAtomic } from './AtomicFunction';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
const useStyles = makeStyles(theme => ({
    item: {
        display: 'flex',
        width:'452px',
        height: '70px',
        cursor: 'pointer',
        margin: '14px 0px',
        boxShadow: '0px 2px 9px rgba(0, 0, 0, 0.12)',
    },
    thumnail: {
        width: '120px',
        height: '70px',
    },
    detail: {
        height: '70px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: '6px'
    },
    icoArea: {
        width: '200px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }

}));

const NewsAtomic = ({ editor, block, type, item}) => {

    const classes = useStyles();
    const [position, setPosition] = useState('center center');
    const [imgUrl, setImgUrl] = useState('/rozeus_editor/images/ico_news_default.png');
    const [imgLoadStatus, setImgLoadStatus] = useState(false);

    var targetImg = item.img_urls;
    if (item.img_urls) {
        if (item.img_urls.indexOf("#") > 0) {
            targetImg = item.img_urls.substr(0, item.img_urls.indexOf("#"))
        }
    }

    const backgroundLoaded = () => {
        const img = getResizeInfo(targetImg, 0.34, 100);
        setImgUrl(targetImg);
        // setSize(img.size);
        setPosition(img.position);
        setImgLoadStatus(true)
    }

    const backgroundLoadFail = () => {
        setImgUrl('/rozeus_editor/images/ico_news_default.png');
        // setSize('42.64px 46px');
        setImgLoadStatus(false)
    }
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        if(editor.readOnly){
            window.open(item.url)
        }else{
            setAnchorEl(anchorEl ? null : event.currentTarget);
        }
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <div style={{ width: 'calc(100% - 32px)', display: 'flex', justifyContent: 'center' }}>
            <div className={classes.item} onClick={handleClick}>
                <BackgroundImageOnLoad
                    src={targetImg}
                    onLoadBg={backgroundLoaded}
                    onError={backgroundLoadFail}
                />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                        className={classes.thumnail}
                        style={{
                            backgroundImage: 'url(' + imgUrl + ')',
                            backgroundColor: imgLoadStatus ? '#ffffff' : '#F7F7F8',
                            backgroundSize: imgLoadStatus ? '120px auto' : '42.64px 46px',
                            backgroundPosition: imgLoadStatus ? position : 'center center',
                            backgroundRepeat: 'no-repeat',
                            border: '1px solid #E5E5E5'
                        }}
                    />
                </div>
                <div className={classes.detail}>
                    <div style={{ overflow: 'hidden', }}>
                        <Typography component='span' variant='subtitle1' style={{ fontSize: '12px', lineHeight: '14px' }}>{item.title}</Typography>
                    </div>
                    <div className={classes.icoArea}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography component='span' variant='body1' style={{ fontWeight: 'bold', fontSize: '11px' }}>
                                {item.med_nm}
                                <Typography component='span' variant='body1' style={{ fontSize: '8px' }}>&nbsp;|&nbsp;</Typography>
                                {item.cat_nm}
                                <Typography component='span' variant='body1' style={{ fontSize: '8px' }}>&nbsp;|&nbsp;</Typography>
                                <DateViewer target={item.news_dt} />
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
            <Popper id={id} open={open} anchorEl={anchorEl} placement='top-end'>
                <div style={{ cursor: 'pointer' }}>
                    <DeleteForeverOutlinedIcon onClick={(e) => DeleteAtomic(block, editor)} />
                </div>
            </Popper>
        </div>
    )
}

export default inject(({ editor }) => ({
    editor: editor,
}))(observer(NewsAtomic));