import { Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { getOG } from '../../../common/interface/common';
import Truncate from 'react-truncate';
const UrlComponent = props => {

    const [ ogData, setOGData] = useState(null)
    const [ ogImg, setOGImg] = useState(null)
    const { editor } = props
    const [urlString, setUrlString] = useState();

    useEffect(()=>{

        var url = '';
        props.children.map((item,index)=>{
            return url+=item.props.text
        })
        setUrlString(url);
        var check = false;
        if (url.indexOf('www') > -1) {
            const count = (url.match(/\./g) || []).length;
            if (count > 1) {
                check = true;
            }
        } else {
            check = true;
        }
        if (check){
            getOG(url)
                .then(function (response) {
                    if (response) {
                        setOGData(response)
                        if (response.ogImage.url.search('http')>-1){
                            setOGImg(response.ogImage.url)
                        }else{
                            setOGImg(response.ogUrl+response.ogImage.url)
                        }
                    }else{
                        setOGData(null)
                    }
                })
            }
    },[props])

    const handleClick = () => {
        if(editor.readOnly){
            window.open(urlString)
        }
    }

    return (
        <React.Fragment>
            <div style={{ width:'calc(100% - 32px)', display: 'flex', justifyContent: 'center' }} onClick={handleClick}>
                <div style={{ maxWidth:'360px'}}>
                    {ogData &&
                        <div style={{
                            position: 'relative', 
                            height:'140px',
                            boxShadow: '0px 2px 9px rgba(0, 0, 0, 0.12)',
                        }}>
                            <div style={{ display: 'flex',}}>
                                <div
                                    style={{
                                        width: '140px', maxWidth:'140px',height:'140px', maxHeight:'140px',overflow:'hidden',
                                    }}
                                >

                                    <img
                                        src={ogImg}
                                        alt='THUMNAIL'
                                        style={{ display: 'block', width: '100%', height: '100%' }}
                                        />

                                </div>
                                <div style={{padding:'12px 16px', width:'210px', maxWidth:'210px'}}>
                                    <Typography style={{fontWeight:'bold'}}>{ogData.ogTitle}</Typography>
                                    <div style={{height:'8px'}}/>
                                    <Typography style={{ fontSize: '12px', lineHeight: '20px' }}>
                                        <Truncate lines={2} style={{ fontSize: '12px', lineHeight: '20px' }}>{ogData.ogDescription}</Truncate>
                                    </Typography>
                                </div>
                            </div>
                            <img src='/rozeus_editor/images/transparentImg.png' style={{ position: 'absolute', top: 0, width: '100%', height: '150px'}} alt='___'/>
                        </div>
                    }
                    <Typography>{props.children}</Typography>
                </div>
            </div>
        </React.Fragment>
    );
};

export default inject(({ editor }) => ({
    editor: editor,
}))(observer(UrlComponent));