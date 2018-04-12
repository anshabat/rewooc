import './TreeNav.css';
import React from 'react';
import Nav from '../Nav';

const TreeNav = (props) => (
    <ul className={`pc-tree-nav pc-tree-nav--depth-${props.depth}`}>
        {props.items.map(item => (
            <li className="pc-tree-nav__item"
                onMouseEnter={() => props.showItem(item)}
                onMouseLeave={() => props.hideItem(item)}
                key={item.ID}
            >
                <a className="pc-tree-nav__link" href={item.url}>
                    {item.title}
                </a>
                {props.openedItems.includes(item.ID) ? (
                    <div className="pc-tree-nav__drop">
                        <Nav
                            parentId={item.ID}
                            depth={props.depth + 1}
                        />
                    </div>
                ) : null}
            </li>
        ))}
    </ul>
);

export default TreeNav;