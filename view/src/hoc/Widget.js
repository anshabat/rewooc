import React from 'react';
import ProductsWidget from '../components/Widgets/ProductsWidget/ProductsWidget';
import PostsWidget from '../components/Widgets/PostsWidget/PostsWidget';

const components = {
    'ProductsWidget': ProductsWidget,
    'PostsWidget': PostsWidget
};

const Widget = (props) => {
    const Component = components[props.component];
    return (
        <Component {...props} />
    );
};

export default Widget;