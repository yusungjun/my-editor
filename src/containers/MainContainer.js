import React, { useEffect, useState } from 'react';

import MainTemplate from '../templates/MainTemplate';

import { inject, observer } from 'mobx-react';
import Editor from '../components/editor/Editor';
import Toolbar from '../components/tools/Toolbar';
import { Inteface } from '../components/interface/Interface';
import Search from '../components/news/Search';

const MainContainer = ({ urlParam, editor, news }) => {

    const [showToolbar, setShowToolbar] = useState(true);
    // const [editMode, setEditMode] = useState(false);
    // const [retComp, setRetComp] = useState(<Editor />);

    useEffect(() => {
        window.addEventListener("message", bridge, true);
        return () => {
            window.removeEventListener("message", bridge, true);
        };
    });

    // useEffect(()=>{
    //     testData()
    // },[])

    useEffect(() => {
        if (urlParam && (urlParam.toolbar === 'false' || urlParam.editMode === 'false')){
            setShowToolbar(false)
        }
        if (urlParam && urlParam.editMode === 'false') {
            // console.log('readonly set true')
            editor.readOnly = true//setEditMode(false)
        }
        // if (urlParam && urlParam.load === 'true') {
        //     setRetComp(<LoadTest />)
        // }
    }, [urlParam, editor.readOnly]);

    // const testData = () => {
    //     const param = { "blocks": [{ "key": "1k50v", "text": "https://news.naver.com/main/read.nhn?mode=LSD&mid=shm&sid1=101&oid=001&aid=0012241498", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }, { "key": "3u1ia", "text": "", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }, { "key": "8c27j", "text": "https://www.naver.com/", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }], "entityMap": {} };
    //     const send ={data: { type: 'SET', param: { type: 'data', data: param } }}
    //     Inteface(send,editor)
    // }

    const bridge = ( param ) =>{
        Inteface(param, editor, news )
    }
    
    return (
        <MainTemplate
            toolbar={showToolbar && <Toolbar />}
            editorComponent={<Editor />}
            searchNews={<Search />}
        />
    );

};

export default inject(({ editor, news }) => ({
    editor: editor,
    news: news
}))(observer(MainContainer));
