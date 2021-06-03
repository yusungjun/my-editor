import React from 'react';

const styles = {
    mention: {
        color: "rgba(98, 177, 254, 1.0)",
        direction: "ltr",
        unicodeBidi: "bidi-override"
    }
};
const MentionComponent = props => {
    return (
        <span style={styles.mention} data-offset-key={props.offsetKey}>
            {props.children}
        </span>
    );
};

export default MentionComponent;