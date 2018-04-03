import './Nav.css';
import '../../vendor/css/shared/link.css';
import React, {Component} from 'react';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.items = props.items.filter(item => Number(item.menu_item_parent) === this.props.parentId);
    }

    render() {
        return (this.items.length) ? (
            <ul className={`pc-nav pc-nav--horizontal pc-nav--level-${this.props.level}`}>
                {this.items.map(item => (
                    <li className="pc-nav__item" key={item.ID}>
                        <a href={item.url} className="ps-link">{item.title}</a>
                        <Nav items={this.props.items} parentId={item.ID} level={this.props.level + 1}/>
                    </li>
                ))}
            </ul>
        ) : null;
    }
}

Nav.defaultProps = {
    parentId: 0,
    level: 1
};

export default Nav;
