import React from "react";

const Image = (props) => (
  <img src={props.image.src}
       alt={props.image.alt}
       width={props.image.width}
       height={props.image.height}
  />
);

export default Image;