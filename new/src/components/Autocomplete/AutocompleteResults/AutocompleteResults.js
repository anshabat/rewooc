import './AutocompleteResults.css';
import React, {Component} from 'react';
import Link from '../../UI/Link/Link';

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
                            <Link href={post.link} className="rw-autocomplete-results__link">
                                <a ref={elem => {
                                    if (active && elem) {
                                        this.props.getActiveItemRef(elem);
                                    }
                                }}
                                   onMouseOver={(e) => this.props.onLinkHover(e, index)}
                                >
                                    {post.title} ({post.price})
                                </a>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        );
    }
}

export default AutocompleteResults;