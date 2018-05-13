import './AutocompleteResults.css';
import React from 'react';

const AutocompleteResults = (props) => {

    return (
        <ul className="rw-autocomplete-results">
            {props.posts.map((post, index) => {
                const active = (props.cursor === index) ? 'rw-autocomplete-results__item--active' : '';
                return (
                    <li className={`rw-autocomplete-results__item ${active}`} key={post.id}>
                        <a
                            className="rw-autocomplete-results__link"
                            href={'#' + index}
                            ref={elem => {
                                if(active && elem) {
                                    props.getActiveItemRef(elem);
                                }
                            }}
                        >{post.title.rendered}</a>
                    </li>
                )
            })}
        </ul>
    );
};

export default AutocompleteResults;