import './Nav.css';
import '../../vendor/css/shared/link.css';
import React from 'react';

const Nav = (props) => {
    console.log('Default', props.items);

    const renderNav = (parentId, level) => {
        const items = props.items.filter(item => Number(item.menu_item_parent) === parentId);
        if (!items.length) {
            return;
        }
        return (
            <ul className="pc-nav pc-nav--horizontal">
                {items.map(item => {
                    return (
                        <li className="pc-nav__item" key={item.ID}>
                            <a href="#" className="ps-link">{item.title}</a> - {level}
                            {renderNav(item.ID, level + 1)}
                        </li>
                    )
                })}
            </ul>
        )
    };

    return renderNav(0, 1);
};
export default Nav;
