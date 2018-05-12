import './Autocomplete.css';
import React, {Component} from 'react';
import axios from 'axios';
import AutocompleteResults from './AutocompleteResults/AutocompleteResults';
import AutocompleteField from './AutocompleteField/AutocompleteField';

class Autocomplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [
                {
                    id: 34,
                    title: 'Samsung Galaxy S8',
                    image: 'http://rewooc/wp-content/uploads/2018/04/3-300x300.jpg',
                    price: '$125'
                },
                {
                    id: 24,
                    title: 'Apple iPhone 8 64GB',
                    image: 'http://rewooc/wp-content/uploads/2018/05/1-300x300.jpg',
                    price: '$680'
                },
                {
                    id: 14,
                    title: 'Samsung Galaxy S8 Blue',
                    image: 'http://rewooc/wp-content/uploads/2018/04/3-300x300.jpg',
                    price: '$125'
                },
                {
                    id: 54,
                    title: 'Apple iPhone 8 64GB Red',
                    image: 'http://rewooc/wp-content/uploads/2018/05/1-300x300.jpg',
                    price: '$680'
                }
            ]
        };
        this.timerId = null;
        this.getItems = this.getItems.bind(this);
        this.onFieldInput = this.onFieldInput.bind(this);
        this.rootElem = null;
    }

    getItems(event) {
        console.log(event.target.value);
        axios.get('/wp-json/wp/v2/posts').then(response => {
            console.log(response);
            const products = [
                {
                    id: 34,
                    title: 'Samsung Galaxy S8',
                    image: 'http://rewooc/wp-content/uploads/2018/04/3-300x300.jpg',
                    price: '$125'
                },
                {
                    id: 24,
                    title: 'Apple iPhone 8 64GB',
                    image: 'http://rewooc/wp-content/uploads/2018/05/1-300x300.jpg',
                    price: '$680'
                },
                {
                    id: 14,
                    title: 'Samsung Galaxy S8 Blue',
                    image: 'http://rewooc/wp-content/uploads/2018/04/3-300x300.jpg',
                    price: '$125'
                },
                {
                    id: 54,
                    title: 'Apple iPhone 8 64GB Red',
                    image: 'http://rewooc/wp-content/uploads/2018/05/1-300x300.jpg',
                    price: '$680'
                }
            ];
            this.setState({posts: products});
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

    onFieldInput(event) {
        event.persist();
        this.delay(Number(this.props.delay))
            .then(() => {
                if (event.target.value.length >= this.props.minChars) {
                    this.getItems(event)
                }
            })
    }

    render() {
        return (
            <div className="rw-autocomplete">
                <div className="rw-autocomplete__field">
                    <AutocompleteField onFieldInput={this.onFieldInput}/>
                </div>
                {this.state.posts.length ? (
                    <div className="rw-autocomplete__results">
                        <AutocompleteResults posts={this.state.posts}/>
                    </div>
                ) : null}
            </div>
        );
    };
}

Autocomplete.defaultProps = {
    delay: 2000,
    minChars: 3
};

export default Autocomplete;