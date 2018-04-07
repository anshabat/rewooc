import React from 'react';
import Nav from '../Nav';

const TreeNav = (props) => (
    <ul className="treeNav">
        {props.items.map(item => (
            <li key={item.ID}>
                <a href={item.url}>{item.title}</a> - {props.depth}
                <Nav parentId={item.ID} depth={props.depth + 1}/>
            </li>
        ))}
    </ul>
);

export default TreeNav;