import './PostsWidget.css';
import React from 'react';

const PostsWidget = (props) => {
    console.log(props);
    return (
        <ul>
            {props.posts.map(post => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
};

export default PostsWidget;