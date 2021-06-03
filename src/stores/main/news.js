import { observable, action } from 'mobx';

export default class NewsStore {
    @observable open = false;

    constructor(root){
        this.root = root;
    }

    @action setOpen = (val) => {
        // console.log('CALL',val)
        this.open = val;
    }

}