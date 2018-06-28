import './SectionSidebar.css';
import React, {Component} from 'react';
import Arrow from '../../Arrow/Arrow';

class SectionSidebar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            carousel: null
        };

        this.getCarousel = this.getCarousel.bind(this);
    }

    getCarousel(carousel) {
        if (!this.state.carousel) {
            this.setState({carousel: carousel});
        }
    };

    render() {
        return (
            <section className="rw-section-sidebar">
                {this.props.title && (
                    <div className="rw-section-sidebar__header">
                        <h2 className="rw-section-sidebar__title">
                            {this.props.title}
                        </h2>
                        {this.state.carousel && (
                            <div className="rw-section-sidebar__arrows">
                                <div className="rw-section-sidebar__arrow-left">
                                    <Arrow onClick={() => this.state.carousel.prev()} ico="Prev" />
                                </div>
                                <div className="rw-section-sidebar__arrow-right">
                                    <Arrow onClick={() => this.state.carousel.next()} ico="Next" />
                                </div>
                            </div>
                        )}
                    </div>
                )}
                <div className="rw-section-sidebar__body">
                    {React.cloneElement(this.props.children, {getCarousel: this.getCarousel})}
                </div>
            </section>
        );
    }
}

export default SectionSidebar;