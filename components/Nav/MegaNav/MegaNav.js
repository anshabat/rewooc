import React from 'react';
import Nav from '../Nav';
import Link from '../../UI/Link/Link';

const MegaNav = (props) => (
    <ul className="megaNav">
        {props.items.map(item => (
            <li key={item.ID}>
                <Link href={item.url}><a>{item.title}</a></Link> - {props.depth}
                <Nav parentId={item.ID} depth={props.depth + 1}/>
            </li>
        ))}
    </ul>
);

export default MegaNav;