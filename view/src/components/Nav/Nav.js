import './Nav.css';
import '../../vendor/css/shared/link.css';
import React, {Component} from 'react';
import TreeNav from './TreeNav/TreeNav';
import MegaNav from './MegaNav/MegaNav';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.items = props.items.filter(item => Number(item.menu_item_parent) === this.props.parentId);
    }

    render() {
        let Tag = TreeNav;
        switch (this.props.level) {
            case 1:
                Tag = TreeNav;
                break;
            case 2:
                Tag = MegaNav;
                break;
            default:
                Tag = MegaNav;
        }
        return (this.items.length && Tag !== this.constructor) ? (
            <Tag items={this.props.items} parentId={this.props.parentId} level={this.props.level}/>
        ) : null;
    }
}

Nav.defaultProps = {
    parentId: 0,
    level: 1
};

export default Nav;
