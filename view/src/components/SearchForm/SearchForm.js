import './SearchForm.css';
import React from 'react';
import Button from '../UI/Button/Button';

const SearchForm = (props) => {
    return (
        <div className="pc-search-form">
            <div className="pc-search-form__field">
                <input className="pc-search-form__control" type="text" placeholder="Enter post title here..." />
                <Button className="pc-search-form__button" size="md" color="secondary">Search</Button>
            </div>
            <div className="pc-search-form__autocomplete">
                {/* <SearchFormResults/>*/}
            </div>
        </div>
    );
};

export default SearchForm;