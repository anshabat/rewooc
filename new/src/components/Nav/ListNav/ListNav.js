import './ListNav.css';
import React from 'react';
import Nav from '../Nav';
import Icon from '../../UI/Icon/Icon';
import Link from '../../UI/Link/Link';
import {siteUrl} from '../../../shared/utilities';

const ListNav = (props) => (
    <ul className={`rw-list-nav rw-list-nav--depth-${props.depth}`}>
        {props.items.map(item => {
            return (
                <li className="rw-list-nav__item"
                    onMouseEnter={() => props.showItem(item)}
                    onMouseLeave={() => props.hideItem(item)}
                    key={item.ID}
                >
                    <a className="rw-list-nav__link" href={siteUrl(item.url)}>
                        {item.title}
                        {props.hasChildItems(item) ? (
                            <Icon name="fa-angle-down" classes={['rw-list-nav__arrow']} />
                        ) : null}
                    </a>
                    {props.openedItems.includes(item.ID) ? (
                        <div className="rw-list-nav__drop rw-list-nav__drop--ltr">
                            <Nav parentId={item.ID} depth={props.depth + 1}/>
                        </div>
                    ) : null}
                </li>
            )
        })}
    </ul>
);

export default ListNav;