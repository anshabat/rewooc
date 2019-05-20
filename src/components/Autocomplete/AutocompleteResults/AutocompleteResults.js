import './AutocompleteResults.scss';
import React, {Component} from 'react';
import {siteUrl} from '../../../shared/utilities';

class AutocompleteResults extends Component {

    componentDidMount() {
        document.addEventListener('click', this.props.close, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.props.close, true);
    }

    render() {
        return (
            <ul className="rw-autocomplete-results">
                {this.props.posts.map((post, index) => {
                    const active = (this.props.cursor === index) ? 'rw-autocomplete-results__item--active' : '';
                    return (
                        <li className={`rw-autocomplete-results__item ${active}`} key={post.id}>
                            <a className="rw-autocomplete-results__link"
                                href={siteUrl(post.link)}
                                ref={elem => {
                                    if (active && elem) {
                                        this.props.getActiveItemRef(elem);
                                    }
                                }}
                                onMouseOver={(e) => this.props.onLinkHover(e, index)}
                            >{post.title} ({post.price})</a>
                        </li>
                    )
                })}
            </ul>
        );
    }
}

export default AutocompleteResults;