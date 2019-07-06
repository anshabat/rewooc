import './Grid.scss';
import React from 'react';

const Grid = (props) => {
    return (
        <ul className="rw-grid">
            {props.items.map(item => (
                <li className="rw-grid__item" key={item.id}>
                    {props.children(item)}
                </li>
            ))}
        </ul>
    );
};

export default Grid;