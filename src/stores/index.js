import EditorStore from "./main/editor";
import NewsStore from "./main/news";

class RootStore {
    constructor() {
        this.editor = new EditorStore(this);
        this.news = new NewsStore(this);
    }
}

export default RootStore;