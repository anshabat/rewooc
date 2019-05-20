import React from 'react';
import Nav from '../Nav';
import {Link} from 'react-router-dom';
import {siteUrl} from '../../../shared/utilities';

const MegaNav = (props) => (
    <ul className="megaNav">
        {props.items.map(item => (
            <li key={item.ID}>
                <Link to={siteUrl(item.url)}>{item.title}</Link> - {props.depth}
                <Nav parentId={item.ID} depth={props.depth + 1}/>
            </li>
        ))}
    </ul>
);

export default MegaNav;