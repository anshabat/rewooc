import './ListNav.scss';
import React from 'react';
import Nav from '../Nav';
import Icon from '../../UI/Icon/Icon';
/*import Link from '../../UI/Link/Link';*/
import Link from 'next/link';
import {siteUrl} from '../../../shared/utilities';

const ListNav = (props) => (
    <ul className={`rw-list-nav rw-list-nav--depth-${props.depth}`}>
        {props.items.map(item => {

            const href = siteUrl(item.url);
            let url;
            let slug;
            if(href.startsWith('http') || href.indexOf('/', 1) === -1){
                url = href;
            } else {
                url = href.substring(href.indexOf('/', 1), 0);
                slug = href.substring(href.indexOf('/', 1) + 1);
            }

            return (
                <li className="rw-list-nav__item"
                    onMouseEnter={() => props.showItem(item)}
                    onMouseLeave={() => props.hideItem(item)}
                    key={item.ID}
                >
                    <Link href={{ pathname: url, query: {slug: slug} }} as={href}>
                        <a>
                            {item.title}
                            {props.hasChildItems(item) ? (
                                <Icon name="fa-angle-down" classes={['rw-list-nav__arrow']}/>
                            ) : null}
                        </a>
                    </Link>
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