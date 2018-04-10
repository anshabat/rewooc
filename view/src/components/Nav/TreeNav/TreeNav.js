import './TreeNav.css';
import React from 'react';
import Nav from '../Nav';

const TreeNav = (props) => (
    <ul className="pc-tree-nav">
        {props.items.map(item => (
            <li className="pc-tree-nav__item" key={item.ID}>
                <a className="pc-tree-nav__link"
                   href={item.url}>{item.title}</a>
                <div className="pc-tree-nav__drop">
                    <Nav
                        parentId={item.ID}
                        depth={props.depth + 1}
                    />
                </div>
            </li>
        ))}
    </ul>
);

export default TreeNav;