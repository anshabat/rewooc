import './Autocomplete.css';
import React, {Component} from 'react';
import axios from 'axios';
import AutocompleteResults from './AutocompleteResults/AutocompleteResults';
import AutocompleteField from './AutocompleteField/AutocompleteField';

class Autocomplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            cursor: -1,
            showResults: false
        };
        this.timerId = null;
        this.getItems = this.getItems.bind(this);
        this.searchItems = this.searchItems.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.iterateResults = this.iterateResults.bind(this);
        this.closeResults = this.closeResults.bind(this);
        this.getActiveItemRef = this.getActiveItemRef.bind(this);
        this.containerRef = null;
        this.activeItemRef = null;
    }

    getItems() {
        axios.get('/wp-json/wp/v2/posts').then(response => {
            console.log(response.data);
            this.setState({
                posts: response.data,
                showResults: true
            });
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
                showResults: false,
                cursor: -1
            });
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.closeResults, true);
    }

    getActiveItemRef(elem) {
        this.activeItemRef = elem;
    }

    render() {
        return (
            <div className="rw-autocomplete" ref={el => {
                this.containerRef = el
            }}>
                <div className="rw-autocomplete__field">
                    <AutocompleteField onFieldInput={this.searchItems} onKeyDown={this.onKeyDown}/>
                </div>
                {this.state.showResults ? (
                    <div className="rw-autocomplete__results">
                        <AutocompleteResults
                            posts={this.state.posts}
                            getActiveItemRef={this.getActiveItemRef}
                            cursor={this.state.cursor}
                        />
                    </div>
                ) : null}
            </div>
        );
    };
}

Autocomplete.defaultProps = {
    delay: 500,
    minChars: 3
};

export default Autocomplete;