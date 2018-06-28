import './SectionSidebar.css';
import React from 'react';
import Arrow from '../../Arrow/Arrow';

const SectionSidebar = (props) => {
    return (
        <section className="rw-section-sidebar">
            {props.title && (
                <div className="rw-section-sidebar__header">
                    <h2 className="rw-section-sidebar__title">
                        {props.title}
                    </h2>
                    {props.carousel && (
                        <div className="rw-section-sidebar__arrows">
                            <div className="rw-section-sidebar__arrow-left">
                                <Arrow ico="<"/>
                            </div>
                            <div className="rw-section-sidebar__arrow-right">
                                <Arrow ico=">"/>
                            </div>
                        </div>
                    )}
                </div>
            )}
            <div className="rw-section-sidebar__body">
                {props.children}
            </div>
        </section>
    );
};

export default SectionSidebar;