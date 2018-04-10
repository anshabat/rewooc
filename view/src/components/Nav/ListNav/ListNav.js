import './ListNav.css';
import React from 'react';
import Nav from '../Nav';

const ListNav = (props) => {
    return (
        <ul className={`pc-list-nav pc-list-nav--depth-${props.depth}`}>
            {props.items.map(item => (
                <li className="pc-list-nav__item" key={item.ID}>
                    <a className="pc-list-nav__link"
                       href={item.url}
                    >{item.title}</a>
                    <div className="pc-list-nav__drop">
                        <Nav
                            parentId={item.ID}
                            depth={props.depth + 1}
                        />
                    </div>
                </li>
            ))}
        </ul>
    )
};

export default ListNav;