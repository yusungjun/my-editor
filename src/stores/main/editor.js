import { EditorState } from 'draft-js';
import { observable, action } from 'mobx';
import { FontColor, Background } from '../../components/styles/FontStyle'
import { Strategy } from '../../components/strategy/Strategy'
export default class EditorStore {

    @observable editorState
    @observable fontColor = { ...FontColor }
    @observable backgroundColor = { ...Background }
    @observable readOnly = false

    constructor(root) {
        this.root = root;
        this.editorState = EditorState.createEmpty(Strategy)
        this.fontColor = { ...FontColor }
        this.backgroundColor = { ...Background }
    }

    @action setEditorState = obj => {
        this.editorState = obj
    }

    @action setEditorStateWithContent = (content) =>{
        this.editorState = EditorState.createWithContent(content, Strategy)
    }

    @action setFontColor = (val) => {
        var temp = JSON.parse(JSON.stringify(this.fontColor))
        temp[val] = {color:val}
        this.fontColor = { ...this.fontColor, ...temp }
    }

    @action setBackgroundColor = (val) => {
        var temp = JSON.parse(JSON.stringify(this.backgroundColor))
        temp[val] = { background: val }
        this.backgroundColor = { ...this.backgroundColor, ...temp }
    }

}