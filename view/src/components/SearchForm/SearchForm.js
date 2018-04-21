import '../../assets/css/shared/btn.css';
import './SearchForm.css';
import React from 'react';

const SearchForm = (props) => {
    return (
        <div className="pc-search-form">
            <div className="pc-search-form__field">
                <input className="pc-search-form__control" type="text" placeholder="Enter post title here..." />
                <button className="pc-search-form__button ps-btn ps-btn--md ps-btn--secondary">Search</button>
            </div>
            <div className="pc-search-form__autocomplete">
                {/* <SearchFormResults/>*/}
            </div>
        </div>
    );
};

export default SearchForm;