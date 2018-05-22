import React from 'react';

const Image = (props) => {
    console.log(props.image);
    return (
        <img src={props.image.src}
             alt={props.image.alt}
             width={props.image.width}
             height={props.image.height}
        />
    );
};

export default Image;