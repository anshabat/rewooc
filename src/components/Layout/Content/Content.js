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
            <section className="rw-content__container">
                <div className="rw-content__heading">
                    <h1 className="rw-content__title">{props.title}</h1>
                </div>
                <div className="rw-content__body">
                    {props.children}
                </div>
            </section>
        </div>
    );
}

export default Content;