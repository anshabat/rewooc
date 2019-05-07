import './SectionSidebar.css';
import React from 'react';
import Arrow from '../../Arrow/Arrow';
import carouselProvider from '../../../../providers/carouselProvider';

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
                                <Arrow onClick={() => props.carousel.prev()} ico="Prev"/>
                            </div>
                            <div className="rw-section-sidebar__arrow-right">
                                <Arrow onClick={() => props.carousel.next()} ico="Next"/>
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

export default carouselProvider(SectionSidebar);