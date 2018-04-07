import React from 'react';
import Nav from '../Nav';

const TreeNav = (props) => (
    <ul className="treeNav">
        {props.items.map(item => (
            <li key={item.ID}>
                <a href={item.url}>{item.title}</a> - {props.level}
                <Nav parentId={item.ID} level={props.level + 1}/>
            </li>
        ))}
    </ul>
);

export default TreeNav;