import './Content.scss';
import React from 'react';

function Content(props) {
    return (
        <div className="rw-content">
            <div className="rw-content__breadcrumbs">
                <div className="rw-content__container">
                    [Beadcrumbs]
                </div>
            </div>
            <div className="rw-content__container">
                <div className="rw-content__heading">
                    <div className="rw-content__title">{props.title}</div>
                </div>
                <div className="rw-content__body">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Content;