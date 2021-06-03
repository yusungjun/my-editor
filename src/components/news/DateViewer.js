import React from 'react';

import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/ko';
import 'moment-timezone';

const DateViewer = ({ target }) => {
    const newsDt = moment(target);
    return (
        <Moment fromNow>{newsDt}</Moment>
    )
}

export default DateViewer;