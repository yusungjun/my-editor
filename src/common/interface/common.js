import axios from 'axios';

import { news_server_addr, server_addr } from '../constants';

export const getOG = async ( url ) => {

    const path = '/editor/open-graph/info'

    var param = { url: "" };
    if (url) {
        param = {
            url: url,
        }
    }
    const resultList = await axios.post(server_addr + path, param, null)
            .then((response) => {
                return response.data;
            }).catch(err => {
                return null;
            });

    return resultList;
}

export const getBreakMoreNews = async () => {

    //const path = '/main/flash/0/' + breakNews.pageNum + '/' + breakNews.size
    const path = '/main/flash/' + 0 + '/' + 30
    const config = {
        headers: {
            'Authorization': 'Basic cm96ZXVzOnJvemV1czEyMyE=',
            'jwt': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxNDAiLCJhcHBfdmVyIjoiIiwidHlwZSI6IloiLCJleHAiOjE2MTk5MjgxMTMwMTUsInVzZXJJZCI6InBhcmtjaGFuaG9AYmZseXNvZnQuY29tIn0.ETGbE-6LPO4qW-V6fHmRjicCFIO4R99pHrKEZf8PNr8'
        },
    }

    const resultList = await axios.get(news_server_addr + path, config)
        .then((response) => {
            return response;
        }).catch(err => {
            return null;
        });

    return resultList;

}

export const getResizeInfo = (url, width, height) => {

    const img = new Image();
    img.src = url
    var size = '120px 120px';
    var position = 'center center';
    var resizeWidth = 0;
    // var resizeHeight = 0;

    var targetWidth = window.innerWidth * width;

    // var targetHeight = height;
    var resizeVal = 0;
    // var resizeFlag = false;
    resizeVal = targetWidth - img.width;
    resizeWidth = img.width + resizeVal;
    // resizeHeight = img.height + (resizeVal * img.height / img.width);
    // if (resizeHeight < targetHeight) {
    //     resizeVal = targetHeight - resizeHeight;
    //     //console.log("@@@@@@@@@@@@@@@@@@", resizeHeight, targetHeight, resizeVal, resizeWidth, resizeWidth + resizeVal)
    //     resizeWidth = resizeWidth + (resizeVal * ((img.width / img.height) + 1));
    // } else {
    //     if ((targetHeight * 2) < resizeHeight) {
    //         position = 'center -30px'
    //     } else if ((targetHeight + 50) < resizeHeight) {
    //         position = 'center -10px'
    //     } else if ((targetHeight + 5) < resizeHeight) {
    //         position = 'center top'
    //     }
    // }
    // console.log(position)
    size = resizeWidth + 'px auto'

    if (img.width > img.height) {
        // if(ratio <= 1.6){
        //     if(ratio<=1.6 && ratio > 1.2){
        //         const cutWidth = img.height * 1.3;
        //         const cutStart = img.width - cutWidth;
        //         if(cutStart > 0){
        //             console.log("CUT START")
        //             position = (cutStart / 2) + 'px 0px'
        //         }else{
        //             console.log("CUT 0")
        //             if (img.width < 120 || img.height < 120) {
        //                 size = 'corver';
        //             }
        //         }
        //     }
        // }else{
        //     console.log(img.width * 0.8);
        size = (window.innerWidth * 0.34) + 'px auto'
        //size = '120px auto'
        // }
    } else {
        // size = 'auto 105px'
        size = 'auto 120px'

    }


    var retVal = {
        src: img.src,
        width: img.width,
        height: img.height,
        size: size,
        position: position,
    }


    return retVal;

}

export const getDemoData = async () => {

    const path = 'http://106.247.124.178:15000/editorDemo'

    const resultList = await axios.get(path, null, null)
        .then((response) => {
            return response.data.msg[0].body;
        }).catch(err => {
            return null;
        });

    return resultList;
}