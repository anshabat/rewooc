import './SearchForm.css';
import React, {Component} from 'react';
import Button from '../UI/Button/Button';

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
        this.timerId = null;
        this.getItems = this.getItems.bind(this);
        this.fieldInputHandler = this.fieldInputHandler.bind(this);
        this.limit = this.limit.bind(this);
    }

    getItems(event) {
        console.log(event.target.value);
    }

    postpone(delay) {
        return new Promise((resolve) => {
            clearTimeout(this.timerId);
            this.timerId = setTimeout(() => {
                resolve();
            }, delay);
        });
    }

    limit(value, minValue) {
        return (value.length >= minValue)
    }

    fieldInputHandler(event) {
        event.persist();
        this.postpone(this.props.delay)
            .then(() => {
                if (event.target.value >= 3) {
                    this.getItems(event)
                } else {

                }
            })
    }

    render() {
        return (
            <div className="pc-search-form">
                <div className="pc-search-form__field">
                    <input
                        className="pc-search-form__control"
                        type="text"
                        placeholder="Enter post title here..."
                        onInput={this.fieldInputHandler}
                    />
                    <Button
                        className="pc-search-form__button"
                        size="md"
                        color="secondary"
                    >Search</Button>
                </div>
                <div className="pc-search-form__autocomplete">
                    {/* <Autocomplete/>*/}
                </div>
            </div>
        );
    };
}

export default SearchForm;