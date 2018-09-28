import './ListNav.css';
import React from 'react';
import Nav from '../Nav';
import Icon from '../../UI/Icon/Icon';

const ListNav = (props) => (
    <ul className={`pc-list-nav pc-list-nav--depth-${props.depth}`}>
        {props.items.map(item => (
            <li className="pc-list-nav__item"
                onMouseEnter={() => props.showItem(item)}
                onMouseLeave={() => props.hideItem(item)}
                key={item.ID}
            >
                <a className="pc-list-nav__link" href={item.url}>
                    {item.title}
                    {props.hasChildItems(item) ? (
                        <Icon name="fa-angle-down" classes={['pc-list-nav__arrow']} />
                    ) : null}
                </a>
                {props.openedItems.includes(item.ID) ? (
                    <div className="pc-list-nav__drop pc-list-nav__drop--ltr">
                        <Nav parentId={item.ID} depth={props.depth + 1}/>
                    </div>
                ) : null}
            </li>
        ))}
    </ul>
);

export default ListNav;