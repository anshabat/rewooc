import './Nav.css';
import '../../vendor/css/shared/link.css';
import React, {Component} from 'react';

let items = [];
let navs = [];

const Nav = (props) => {

    /* Save origins in closure for reusing in component recursion */
    items = props.items || items;
    navs = props.navs || navs;

    const childItems = items.filter(
        item => Number(item.menu_item_parent) === props.parentId
    );

    const ChildNav = navs[props.depth - 1] || navs[navs.length - 1];

    return (childItems.length) ? (
        <ChildNav
            items={childItems}
            parentId={props.parentId}
            depth={props.depth}
        />
    ) : null;
};

Nav.defaultProps = {
    parentId: 0,
    depth: 1
};

export default Nav;
