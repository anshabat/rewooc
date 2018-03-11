import React from 'react';

export default class Nav extends React.Component {
    render() {
        return (
            this.props.items.map((item, index) => {
                return <li key={index+'-key'}>{item.title}</li>
            })
        )
    }
}