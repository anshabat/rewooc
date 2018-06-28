import './SectionPrimary.css';
import React from 'react';
import Arrow from '../../Arrow/Arrow';
import ConnectCarousel from '../../../../hoc/ConnectCarousel';

const SectionPrimary = (props) => {
    return (
        <section className="rw-section-primary">
            {props.title && (
                <div className="rw-section-primary__header">
                    <h2 className="rw-section-primary__title">
                        {props.title}
                    </h2>
                    {props.carousel && (
                        <div className="rw-section-primary__arrows">
                            <div className="rw-section-primary__arrow-left">
                                <Arrow onClick={() => props.carousel.prev()} ico="Prev"/>
                            </div>
                            <div className="rw-section-primary__arrow-right">
                                <Arrow onClick={() => props.carousel.next()} ico="Next"/>
                            </div>
                        </div>
                    )}
                </div>
            )}
            <div className="rw-section-primary__body">
                {props.children}
            </div>
        </section>
    );
};

export default ConnectCarousel(SectionPrimary);