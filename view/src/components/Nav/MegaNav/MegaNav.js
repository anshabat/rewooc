import React from 'react';
import Nav from '../Nav';
import {NavLink} from 'react-router-dom';
import * as utils from '../../../shared/index';

const MegaNav = (props) => (
    <ul className="megaNav">
        {props.items.map(item => (
            <li key={item.ID}>
                <NavLink to={utils.cutUrlDomain(item.url)}>{item.title}</NavLink> - {props.depth}
                <Nav parentId={item.ID} depth={props.depth + 1}/>
            </li>
        ))}
    </ul>
);

export default MegaNav;