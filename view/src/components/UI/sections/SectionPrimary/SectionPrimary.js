import './SectionPrimary.css';
import React from 'react';

const SectionPrimary = (props) => {
    return (
        <section className="rw-section-primary">
            <h1 className="rw-section-primary__header">
                {props.title}
            </h1>
            <div className="rw-section-primary__body">
                {props.children}
            </div>
        </section>
    );
};

export default SectionPrimary;