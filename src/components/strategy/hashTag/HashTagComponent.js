import React from 'react';

const styles = {
    hashtag: {
        //border: '1px solid red',
        color: "rgba(95, 184, 138, 1.0)"
    }
};
const HashTagComponent = props => {
    return (
        <span style={styles.hashtag} data-offset-key={props.offsetKey}>
            {props.children}
        </span>
    );
};

export default HashTagComponent;