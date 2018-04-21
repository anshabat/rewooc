import '../../assets/css/shared/link.css';
import './Nav.css';
import React, {Component} from 'react';

let allItems = [];
let allNavs = [];

class Nav extends Component {
    constructor(props) {
        super(props);
        /* Save origins in closure for reusing in component recursion */
        allItems = props.items || allItems;
        allNavs = props.navs || allNavs;

        this.childItems = allItems.filter(
            item => Number(item.menu_item_parent) === props.parentId
        );
        this.ChildNav = allNavs[props.depth - 1] || allNavs[allNavs.length - 1];
        this.state = {
            openedItems: []
        }
    }

    hasChildItems(item) {
        return allItems.some(i => Number(i.menu_item_parent) === item.ID)
    }

    showItem(item) {
        if (!this.hasChildItems(item)) {
            return;
        }
        this.setState((prevState) => {
            prevState.openedItems.push(item.ID);
            return {openedItems: prevState.openedItems}
        });
    }

    hideItem(item) {
        if (!this.hasChildItems(item)) {
            return;
        }
        this.setState((prevState) => {
            let index = prevState.openedItems.indexOf(item.ID);
            prevState.openedItems.splice(index, 1);
            return {openedItems: prevState.openedItems}
        });
    }

    render() {
        return (this.childItems.length && this.props.opened) ? (
            <this.ChildNav
                items={this.childItems}
                parentId={this.props.parentId}
                depth={this.props.depth}
                showItem={this.showItem.bind(this)}
                hideItem={this.hideItem.bind(this)}
                openedItems={this.state.openedItems}
                hasChildItems={this.hasChildItems.bind(this)}
            />
        ) : null;
    }
}

Nav.defaultProps = {
    parentId: 0,
    depth: 1,
    opened: true
};

export default Nav;
