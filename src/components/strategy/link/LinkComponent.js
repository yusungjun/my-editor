import React from 'react';
import { observer, inject } from 'mobx-react';
export const LinkComponent = (props) => {
    // const { contentState, entityKey } = props;
    // const { url } = contentState.getEntity(entityKey).getData();
    const { src } = props.contentState.getEntity(props.entityKey).getData();
    const openLink = () => {
        if(props.editor.readOnly){
            window.open(src);
        }
    }
    return (
        <span
            className={'anchor'}
            href={src}
            style={{ textDecoration: 'none', color: '#0275d8', cursor: 'pointer' }}
            onClick={openLink}
        >{props.children}</span>
    );
};
export default inject(({ editor }) => ({
    editor: editor,
}))(observer(LinkComponent));
