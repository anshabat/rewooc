import './PostsWidget.css';
import React from 'react';
import ListPost from '../../Posts/ListPost/ListPost';
import CardPost from '../../Posts/CardPost/CardPost';

const PostsWidget = (props) => {

    let Layout = null;

    switch (props.layout) {
        case 'card':
            Layout = CardPost;
            break;
        case 'list':
        default:
            Layout = ListPost;
            break;
    }

    return (
        <ul className="rw-posts-widget">
            {props.data.posts.map(post => (
                <li className="rw-posts-widget__item" key={post.id}>
                    <Layout {...post}/>
                </li>
            ))}
        </ul>
    );
};

export default PostsWidget;