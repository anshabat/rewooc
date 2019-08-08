import './PageLoader.scss';
import React from 'react';
import Loader from '../Loader/Loader';

const PageLoader = () => {
    return (
        <div className="rw-page-loader">
            <Loader/>
        </div>
    );
};

export default PageLoader;