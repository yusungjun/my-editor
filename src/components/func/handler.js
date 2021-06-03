/* eslint-disable no-useless-escape */
import { InsertAtomic } from "../atomic/AtomicFunction";

export const pastedFiles = (file, editor) => {
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onloadend = function () {
        var base64data = reader.result;
        InsertAtomic(editor, 'image', 'IMMUTABLE', { src: base64data })
    }
}

export const pastedText = (text, editor) => {
    const regexImg = /^(?=(https?:\/\/)([^\/]*)(\.)(.*))((.*imgurl.*)|(.*img.*)|(.*jpg.*)|(.*jpeg.*)|(.*png.*)|(.*gif.*))/;
    const regexYoutube = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/;
    const regexVideo = /^(?=(https?:\/\/)([^\/]*)(\.)(.*))((.*mp4.*))/;

    if (regexImg.exec(text)) {
        InsertAtomic(editor, 'image', 'IMMUTABLE', { src: text })
        return true;
    } else if (regexYoutube.exec(text)) {
        var youtubeId = null;
        if (text.indexOf('watch?v=') > -1) {
            youtubeId = text.substring(text.indexOf('watch?v=') + 8, text.length)
            InsertAtomic(editor, 'youtube', 'IMMUTABLE', { src: youtubeId })
        } else {
            if (text.indexOf('embed/') > -1) {
                youtubeId = text.substring(text.indexOf('embed/') + 6, text.indexOf('?') > -1 ? text.indexOf('?') : text.length)
                InsertAtomic(editor, 'youtube', 'IMMUTABLE', { src: youtubeId })
            }
        }
        return true;
    } else if (regexVideo.exec(text)) {
        InsertAtomic(editor, 'video', 'IMMUTABLE', { src: text })
        return true;
    }
}

export const droppedFiles = (file, editor) => {
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onloadend = function () {
        var base64data = reader.result;
        InsertAtomic(editor, 'image', 'IMMUTABLE', { src: base64data })
    }
}