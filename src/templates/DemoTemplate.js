import { Fab, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ReactJson from 'react-json-view';
import { convertToRaw } from 'draft-js';

import AutorenewIcon from '@material-ui/icons/Autorenew';
import { getDemoData } from '../common/interface/common';

import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';

import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import ListIcon from '@material-ui/icons/List';
import LinkIcon from '@material-ui/icons/Link';
import FormatSizeIcon from '@material-ui/icons/FormatSize';

//import ForumIcon from '@material-ui/icons/Forum';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
// import CommentIcon from '@material-ui/icons/Comment';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FontDownloadIcon from '@material-ui/icons/FontDownload';

import BlockIcon from '@material-ui/icons/Block';
import ImageIcon from '@material-ui/icons/Image';
import YouTubeIcon from '@material-ui/icons/YouTube';
import BurstModeIcon from '@material-ui/icons/BurstMode';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SaveIcon from '@material-ui/icons/Save';
import { observer, inject } from 'mobx-react';

const DemoTemplate = ({ toolbar, editorComponent, searchNews, editor }) => {

    const demoLocation = 'http://106.247.124.178/rozeus_editor';
    // const demoLocation = 'http://localhost:3001/rozeus_editor'
    const [data, setData] = useState();
    const [loadStatus, setLoadStatus] = useState({
        json: false,
        fpc: false,
        spc: false,
        tmob: false,
        fmob: false
    });

    useEffect(()=>{
        window.addEventListener('message', function (e) {
            if (e.data && e.data.raw){
                const targetJson = e.data
                localStorage.setItem('CONTENT_TEST', JSON.stringify(targetJson))
                if (targetJson && targetJson !== ''){
                    setData(targetJson);
                }
            }
        });
    },[])

    useEffect(() => {
        getDemoData()
            .then(function (response) {
                if (response) {
                    setData(JSON.parse(response));
                    setLoadStatus({...loadStatus,json:true})
                }
            });
    },[])

    useEffect(() => {
        if(loadStatus.json && loadStatus.fpc && loadStatus.spc && loadStatus.tmob && loadStatus.fmob){
            document.getElementById('1pc').contentWindow.postMessage({ type: 'SET', param: { type: 'data', data: data.raw } }, '*');
            document.getElementById('2pc').contentWindow.postMessage({ type: 'SET', param: { type: 'data', data: data.raw } }, '*');
            document.getElementById('3mob').contentWindow.postMessage({ type: 'SET', param: { type: 'data', data: data.raw } }, '*');
            document.getElementById('4mob').contentWindow.postMessage({ type: 'SET', param: { type: 'data', data: data.raw } }, '*');
        }
    }, [data, loadStatus])

    const initDefault = (target) => {
        setLoadStatus({ ...loadStatus, [target]: true })
    }

    const getData = () => {
        document.getElementById('1pc').contentWindow.postMessage({ type: 'GET' }, '*');
    }
    const setFont = (action) => {
        document.getElementById('3mob').contentWindow.postMessage({ type: 'SET', param: { type: 'font', action: action } }, '*');
    }
    const setList = (action) => {
        document.getElementById('3mob').contentWindow.postMessage({ type: 'SET', param: { type: 'list', action: action } }, '*');
    }
    const setLink = (action) => {
        const url = window.prompt('링크 url을 입력하세요','http://naver.com');
        document.getElementById('3mob').contentWindow.postMessage({ type: 'SET', param: { type: 'link', action: url } }, '*');
    }
    const setQuote = (action) => {
        document.getElementById('3mob').contentWindow.postMessage({ type: 'SET', param: { type: 'quote', action: action } }, '*');
    }
    const setDelete = (action) => {
        document.getElementById('3mob').contentWindow.postMessage({ type: 'SET', param: { type: 'delete', action: action } }, '*');
    }
    const setAlign = (action) => {
        document.getElementById('3mob').contentWindow.postMessage({ type: 'SET', param: { type: 'align', action: action } }, '*');
    }
    const setImage = () => {
        const url = window.prompt('이미지 url을 입력하세요', 'https://www.1xbetkrs.com/wp-content/uploads/2020/03/0-e1583216806476.jpg');
        document.getElementById('3mob').contentWindow.postMessage({ type: 'SET', param: { type: 'image', action: url } }, '*');
    }
    const setImageSlide = (action) => {
        document.getElementById('3mob').contentWindow.postMessage({ type: 'SET', param: { type: 'slider', action: action } }, '*');
    }
    const setImageCollage = (action) => {
        document.getElementById('3mob').contentWindow.postMessage({ type: 'SET', param: { type: 'collage', action: action } }, '*');
    }
    const setVideo = () => {
        const url = window.prompt('동영상 url을 입력하세요', 'https://www.youtube.com/watch?v=ufRkMIqIFCw');
        document.getElementById('3mob').contentWindow.postMessage({ type: 'SET', param: { type: 'video', action: url } }, '*');
    }
    const setTest = (action) => {
        document.getElementById('3mob').contentWindow.postMessage({ type: 'SET', param: { type: 'test', action: action } }, '*');
    }
    const setLocalSave = (action) => {
        document.getElementById('3mob').contentWindow.postMessage({ type: 'SET', param: { type: 'save', action: action } }, '*');
    }
    return (
        <div>
            
            <div style={{ display: 'flex' }}>
                <div style={{width:'50%'}}>
                    <Typography>1. PC(WIDE) Normal Edit</Typography>
                    <div style={{ height: '800px', padding:'20px' }}>
                        <iframe 
                            id='1pc'
                            title='EDIT ABLE'
                            style={{ width: '100%', height: 'calc(100% - 30px)', overflowX: 'hidden', overflow: 'auto', minHeight: '200px', border:'1px solid #646464' }}
                            src={demoLocation+'?toolbar=true&editMode=true'}
                            frameBorder="0"
                            scrolling="yes"
                            allowFullScreen
                            onLoad={(e) => initDefault('fpc')}
                        />
                    </div>
                </div>
                <div style={{ width: '50%', height: '800px' }}>
                    <Typography>2. PC(WIDE) Normal View</Typography>
                    <div style={{ height: '800px', padding: '20px' }}>
                        <iframe
                            id='2pc'
                            title='VIEW'
                            style={{ width: '100%', height: 'calc(100% - 30px)', overflowX: 'hidden', overflow: 'auto', minHeight: '200px', border: '1px solid #646464' }}
                            src={demoLocation +'?toolbar=true&editMode=false'}
                            frameBorder="0"
                            scrolling="yes"
                            allowFullScreen
                            onLoad={(e) => initDefault('spc')}
                        />
                    </div>
                </div>
            </div>
            
            <div style={{ display: 'flex' }}>
                <div style={{ width: '460px', minWidth: '460px'}}>
                    <Typography>3. Mobile(Small) Normal Edit</Typography>
                    <div style={{ height: '600px', padding: '0px 20px' }}>
                        <iframe
                            id='3mob'
                            title='MOBILE EDIT ABLE'
                            style={{ width: '100%', height: '100%', overflowX: 'hidden', overflowY: 'auto', minHeight: '200px', border: '1px solid #646464' }}
                            src={demoLocation +'?toolbar=false&editMode=true'}
                            frameBorder="0"
                            scrolling="yes"
                            allowFullScreen
                            onLoad={(e) => initDefault('tmob')}
                        />
                    </div>
                    <div style={{ padding: '0px 20px' }} >
                        <div style={{ width:'100%', height:'100%', border: '1px solid #646464', borderTop:'0px', background:'#cccccc'}}>
                            NATIVE AREA<br/>
                            <SaveIcon 
                                style={{ cursor:'pointer', margin:'5px', border: '1px solid #646464', background:'#ffffff', width: '35px', height: '35px'}} 
                                onClick={(e) => setLocalSave()} />
                            <FormatBoldIcon 
                                style={{ cursor:'pointer', margin:'5px', border: '1px solid #646464', background:'#ffffff', width: '35px', height: '35px'}} 
                                onClick={(e) => setFont("BOLD")} />
                            <FormatItalicIcon 
                                style={{ cursor: 'pointer', margin: '5px', border: '1px solid #646464', background: '#ffffff', width: '35px', height: '35px' }} 
                                onClick={(e) => setFont("ITALIC")} />
                            <FormatUnderlinedIcon 
                                style={{ cursor: 'pointer', margin: '5px', border: '1px solid #646464', background: '#ffffff', width: '35px', height: '35px' }} 
                                onClick={(e) => setFont("UNDERLINE")} />
                            <StrikethroughSIcon 
                                style={{ cursor: 'pointer', margin: '5px', border: '1px solid #646464', background: '#ffffff', width: '35px', height: '35px' }} 
                                onClick={(e) => setFont("STRIKETHROUGH")} />
                            <FormatSizeIcon
                                style={{ cursor: 'pointer', margin: '5px', border: '1px solid #646464', background: '#ffffff', width: '35px', height: '35px' }}
                                onClick={(e) => setFont("SIZE")} />
                            <FormatListNumberedIcon
                                style={{ cursor: 'pointer', margin: '5px', border: '1px solid #646464', background: '#ffffff', width: '35px', height: '35px' }}
                                onClick={(e) => setList("ordered-list-item")} />
                            <FormatListBulletedIcon
                                style={{ cursor: 'pointer', margin: '5px', border: '1px solid #646464', background: '#ffffff', width: '35px', height: '35px' }}
                                onClick={(e) => setList("unordered-list-item")} />
                            <ListIcon
                                style={{ cursor: 'pointer', margin: '5px', border: '1px solid #646464', background: '#ffffff', width: '35px', height: '35px' }}
                                onClick={(e) => setList("UL_SQUARE")} />
                            <LinkIcon
                                style={{ cursor: 'pointer', margin: '5px', border: '1px solid #646464', background: '#ffffff', width: '35px', height: '35px' }}
                                onClick={(e) => setLink()} />
                            <InsertDriveFileIcon
                                style={{ cursor: 'pointer', margin: '5px', border: '1px solid #646464', background: '#ffffff', width: '35px', height: '35px', transform: 'rotate(90deg)' }}
                                onClick={(e) => setQuote('QUOTE_MEMO')} />
                            <VerticalSplitIcon
                                style={{ cursor: 'pointer', margin: '5px', border: '1px solid #646464', background: '#ffffff', width: '35px', height: '35px', transform: 'rotate(180deg)' }}
                                onClick={(e) => setQuote('QUOTE_VERTICAL')} />
                            <ChatBubbleIcon
                                style={{ cursor: 'pointer', margin: '5px', border: '1px solid #646464', background: '#ffffff', width: '35px', height: '35px' }}
                                onClick={(e) => setQuote('QUOTE_BALLOON')} />
                            <FormatQuoteIcon
                                style={{ cursor: 'pointer', margin: '5px', border: '1px solid #646464', background: '#ffffff', width: '35px', height: '35px' }}
                                onClick={(e) => setQuote('QUOTE_DOUBLE')} />
                            <DeleteForeverIcon
                                style={{ cursor: 'pointer', margin: '5px', border: '1px solid #646464', background: '#ffffff', width: '35px', height: '35px' }}
                                onClick={(e) => setDelete()} />
                            <FormatAlignCenterIcon
                                style={{ cursor: 'pointer', margin: '5px', border: '1px solid #646464', background: '#ffffff', width: '35px', height: '35px' }}
                                onClick={(e) => setAlign()} />
                            <FontDownloadIcon
                                style={{ cursor: 'pointer', margin: '5px', border: '1px solid #646464', background: '#ffffff', width: '35px', height: '35px' }}
                                onClick={(e) => setFont('GyeonggiBatang')} />
                            <BlockIcon
                                style={{ cursor: 'pointer', margin: '5px', border: '1px solid #646464', background: '#ffffff', width: '35px', height: '35px' }}
                                onClick={(e) => setTest()} />    
                            <ImageIcon
                                style={{ cursor: 'pointer', margin: '5px', border: '1px solid #646464', background: '#ffffff', width: '35px', height: '35px' }}
                                onClick={(e) => setImage()} />        
                            <YouTubeIcon
                                style={{ cursor: 'pointer', margin: '5px', border: '1px solid #646464', background: '#ffffff', width: '35px', height: '35px' }}
                                onClick={(e) => setVideo()} />        
                            <BurstModeIcon
                                style={{ cursor: 'pointer', margin: '5px', border: '1px solid #646464', background: '#ffffff', width: '35px', height: '35px' }}
                                onClick={(e) => setImageSlide([
                                    '/io_og_contactUs.png',
                                    '/io_og_numbers.png',
                                    '/io_og_partner.png',
                                    '/io_og_resources.png',
                                ])} />        
                            <DashboardIcon
                                style={{ cursor: 'pointer', margin: '5px', border: '1px solid #646464', background: '#ffffff', width: '35px', height: '35px' }}
                                onClick={(e) => setImageCollage([
                                    '/io_og_contactUs.png',
                                    '/io_og_numbers.png',
                                    '/io_og_partner.png',
                                    '/io_og_resources.png',
                                    '/io_og_contactUs.png',
                                    '/io_og_numbers.png',
                                ])} />       
                        </div>
                    </div>
                    <div style={{ height: '16px' }} />
                </div>
                <div style={{ width: '460px', minWidth:'460px' }}>
                    <Typography>4. Mobile(Small) Normal View</Typography>
                    <div style={{ height: '670px', padding: '0px 20px' }}>
                        <iframe
                            id='4mob'
                            title='MOBILE VIEW'
                            style={{ width: '100%', height: '100%', overflowX: 'hidden', overflowY: 'auto', minHeight: '200px', border: '1px solid #646464' }}
                            src={demoLocation +'?toolbar=true&editMode=false'}
                            frameBorder="0"
                            scrolling="yes"
                            allowFullScreen
                            onLoad={(e) => initDefault('fmob')}
                        />
                    </div>
                    <div style={{ height: '16px' }} />
                </div>
                <div style={{ flexGrow:1, height: '600px', overflow:'auto' }}>
                    <Typography>5. Data Sample</Typography>
                    <div>
                        {data && 
                            <ReactJson src={data} />
                        }
                    </div>
                </div>
            </div>
            <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                <Fab aria-label="add" style={{ background:'#ED1C24', color:'#ffffff', opacity:'0.4'}}>
                    <AutorenewIcon onClick={getData} />
                </Fab>
            </div>
        </div>
    );
};

export default inject(({ editor, news }) => ({
    editor: editor,
    news: news,
}))(observer(DemoTemplate));