import React, {Component} from 'react';
import Nav from '../Nav';

class TreeNav extends Component {
    constructor(props) {
        super(props);
        this.items = props.items.filter(item => Number(item.menu_item_parent) === this.props.parentId);
    }

    render() {
        return (this.items.length) ? (
            <ul className="treeNav">
                {this.items.map(item => (
                    <li key={item.ID}>
                        <a href={item.url}>{item.title}</a>
                        <Nav items={this.props.items} parentId={item.ID} level={this.props.level + 1} />
                    </li>
                ))}
            </ul>
        ) : null;
    }
}

export default TreeNav;