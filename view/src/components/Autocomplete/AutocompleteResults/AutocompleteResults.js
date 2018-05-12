import './AutocompleteResults.css';
import React from 'react';

const AutocompleteResults = (props) => (
    <ul className="rw-autocomplete-results">
        {props.posts.map(post => (
            <li className="rw-autocomplete-results__item" key={post.id}>
                <div>{post.title}</div>
            </li>
        ))}
    </ul>
);

export default AutocompleteResults;