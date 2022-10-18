/*
By Ahmed Al-Ghezi based on the given source
 */
//Source : https://www.geeksforgeeks.org/how-to-create-a-read-more-component-in-reactjs/

import * as React from 'react';
import {useState} from "react";

const ReadMore = (props) => {
    //const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p className="text">

            <div dangerouslySetInnerHTML={isReadMore ? { __html: props.textSmall } : { __html: props.textAll }} />

            <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "...read more" : " show less"}
      </span>
        </p>
    );
};

export default ReadMore;