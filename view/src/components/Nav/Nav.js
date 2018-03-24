import React from 'react';

const Nav = (props) => {
    return (
        <ul>
            {props.items.map((item) => {
                return <li key={item.ID}>{item.title}</li>
            })}
        </ul>
    )
};
export default Nav;
