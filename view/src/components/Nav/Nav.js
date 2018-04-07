import './Nav.css';
import '../../vendor/css/shared/link.css';
import React, {Component} from 'react';
import TreeNav from './TreeNav/TreeNav';
import MegaNav from './MegaNav/MegaNav';

let items = [];

class Nav extends Component {
    constructor(props) {
        super(props);

        /* Save origin items in closure for reusing in component recursion */
        items = props.items || items;

        this.childItems = items.filter(
            item => Number(item.menu_item_parent) === this.props.parentId
        );
        this.childTag = this.getChildTag(this.props.level);
    }

    getChildTag(level) {
        switch (level) {
            case 1:
                return MegaNav;
            case 2:
                return TreeNav;
            default:
                return MegaNav;
        }
    }

    render() {
        return (this.childItems.length && this.child !== this.constructor) ? (
            <this.childTag
                items={this.childItems}
                parentId={this.props.parentId}
                level={this.props.level}
            />
        ) : null;
    }
}

Nav.defaultProps = {
    parentId: 0,
    level: 1
};

export default Nav;
