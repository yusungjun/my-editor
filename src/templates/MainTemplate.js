import React, { useLayoutEffect, useRef, useState } from 'react';

const MainTemplate = ({ toolbar, editorComponent, searchNews }) => {

    const [editHeight, setEditorHeight] = useState(window.innerHeight - 44);
    const refToolbar = useRef();

    // const [size , setSize] = useEffect();

    useLayoutEffect(() => {
        function updateSize() {
            setEditorHeight(window.innerHeight - 44 - refToolbar.current.clientHeight );
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize)
    });

    return (
        <React.Fragment>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{ width: '100%' }} ref={refToolbar}>
                    {toolbar}
                </div>
                <div style={{ width: '100%', height: editHeight }}>
                    {editorComponent}
                </div>
            </div>
            {searchNews}
        </React.Fragment>
    );
};

export default MainTemplate;