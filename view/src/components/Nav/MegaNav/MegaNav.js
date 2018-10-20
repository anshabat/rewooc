import React from 'react';
import Nav from '../Nav';
import {NavLink} from 'react-router-dom';
import {siteUrl} from '../../../shared';

const MegaNav = (props) => (
    <ul className="megaNav">
        {props.items.map(item => (
            <li key={item.ID}>
                <NavLink to={siteUrl(item.url)}>{item.title}</NavLink> - {props.depth}
                <Nav parentId={item.ID} depth={props.depth + 1}/>
            </li>
        ))}
    </ul>
);

export default MegaNav;