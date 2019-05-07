import './Autocomplete.css';
import React, {Component} from 'react';
import axios from 'axios';
import AutocompleteResults from './AutocompleteResults/AutocompleteResults';
import AutocompleteField from './AutocompleteField/AutocompleteField';
import {ajaxEndpoint} from '../../shared/utilities';

class Autocomplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            cursor: -1
        };

        this.timerId = null;
        this.containerRef = null;
        this.activeItemRef = null;

        this.getItems = this.getItems.bind(this);
        this.searchItems = this.searchItems.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.iterateResults = this.iterateResults.bind(this);
        this.closeResults = this.closeResults.bind(this);
        this.getActiveItemRef = this.getActiveItemRef.bind(this);
        this.onLinkHover = this.onLinkHover.bind(this);
    }

    getItems(e) {
        axios.get(ajaxEndpoint('rewooc_search_products'), {
            params: {
                'term': e.target.value,
                'limit': this.props.limit
            }
        }).then(response => {
            this.setState({posts: response.data});
        })
    }

    delay(ms) {
        return new Promise((resolve) => {
            clearTimeout(this.timerId);
            this.timerId = setTimeout(() => {
                resolve();
            }, ms);
        });
    }

    searchItems(event) {
        event.persist();
        this.delay(Number(this.props.delay))
            .then(() => {
                if (event.target.value.length >= this.props.minChars) {
                    this.getItems(event)
                }
            })
    }

    onKeyDown(e) {
        switch (e.keyCode) {
            case 38:
            case 40:
                this.iterateResults(e);
                break;
            case 13:
                this.activeItemRef.click();
                break;
            case 27:
                this.closeResults(e);
                break;
            default:
                return;
        }
    }

    iterateResults(e) {
        e.persist();
        e.preventDefault();
        const shift = (e.keyCode === 38) ? -1 : +1;
        this.setState(prev => {
            let cursor = (prev.cursor <= 0 && e.keyCode === 38) ? prev.posts.length : prev.cursor;
            return {cursor: (cursor + shift) % (prev.posts.length)};
        });
    }

    closeResults(e) {
        if (!this.containerRef.contains(e.target) || e.keyCode === 27) {
            this.setState({
                posts: [],
                cursor: -1
            });
        }
    }

    getActiveItemRef(elem) {
        this.activeItemRef = elem;
    }

    onLinkHover(e, index) {
        this.setState({cursor: index});
    }

    render() {
        return (
            <div className="rw-autocomplete" ref={el => {
                this.containerRef = el
            }}>
                <div className="rw-autocomplete__field">
                    <AutocompleteField onFieldInput={this.searchItems} onKeyDown={this.onKeyDown}/>
                </div>
                {this.state.posts.length ? (
                    <div className="rw-autocomplete__results">
                        <AutocompleteResults
                            posts={this.state.posts}
                            getActiveItemRef={this.getActiveItemRef}
                            cursor={this.state.cursor}
                            close={this.closeResults}
                            onLinkHover={this.onLinkHover}
                        />
                    </div>
                ) : null}
            </div>
        );
    };
}

Autocomplete.defaultProps = {
    delay: 500,
    minChars: 3,
    limit: 10
};

export default Autocomplete;