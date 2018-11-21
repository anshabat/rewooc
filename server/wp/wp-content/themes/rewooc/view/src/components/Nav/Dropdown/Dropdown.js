import './Dropdown.css';
import React from 'react';
import Nav from '../Nav';
import Icon from '../../UI/Icon/Icon';
import {NavLink} from 'react-router-dom';
import {siteUrl} from '../../../shared/utilities';

const Dropdown = (props) => (
    <ul className={`pc-dropdown pc-dropdown--depth-${props.depth}`}>
        {props.items.map(item => (
            <li className="pc-dropdown__item"
                onMouseEnter={() => props.showItem(item)}
                onMouseLeave={() => props.hideItem(item)}
                key={item.ID}
            >
                <NavLink className="pc-dropdown__link" to={siteUrl(item.url)}>
                    {item.title}
                    {props.hasChildItems(item) ? (
                        <Icon name="fa-angle-right" classes={['pc-dropdown__arrow']} />
                    ) : null}
                </NavLink>
                {props.openedItems.includes(item.ID) ? (
                    <div className="pc-dropdown__drop pc-dropdown__drop--ltr">
                        <Nav parentId={item.ID} depth={props.depth + 1}/>
                    </div>
                ) : null}
            </li>
        ))}
    </ul>
);

export default Dropdown;