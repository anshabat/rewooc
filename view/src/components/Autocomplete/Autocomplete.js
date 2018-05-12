import './Autocomplete.css';
import React, {Component} from 'react';
import Button from '../UI/Button/Button';

class Autocomplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
        this.timerId = null;
        this.getItems = this.getItems.bind(this);
        this.onFieldInput = this.onFieldInput.bind(this);
    }

    getItems(event) {
        console.log(event.target.value);
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
            <div className="pc-search-form">
                <div className="pc-search-form__field">
                    <input
                        className="pc-search-form__control"
                        type="text"
                        placeholder="Enter post title here..."
                        onInput={this.onFieldInput}
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

Autocomplete.defaultProps = {
    delay: 2000,
    minChars: 3
};

export default Autocomplete;