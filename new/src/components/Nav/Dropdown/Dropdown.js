import './Dropdown.css';
import React from 'react';
import Nav from '../Nav';
import Link from '../../UI/Link/Link';
import Icon from '../../UI/Icon/Icon';

const Dropdown = (props) => (
    <ul className={`rw-dropdown rw-dropdown--depth-${props.depth}`}>
        {props.items.map(item => (
            <li className="rw-dropdown__item"
                onMouseEnter={() => props.showItem(item)}
                onMouseLeave={() => props.hideItem(item)}
                key={item.ID}
            >
                <Link href={item.url} className="rw-dropdown__link">
                    <a>
                        {item.title}
                        {props.hasChildItems(item) ? (
                            <Icon name="fa-angle-right" classes={['pc-dropdown__arrow']}/>
                        ) : null}
                    </a>
                </Link>
                {props.openedItems.includes(item.ID) ? (
                    <div className="rw-dropdown__drop rw-dropdown__drop--ltr">
                        <Nav parentId={item.ID} depth={props.depth + 1}/>
                    </div>
                ) : null}
            </li>
        ))}
    </ul>
);

export default Dropdown;