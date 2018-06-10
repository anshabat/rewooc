import './Carousel.css';
import React, {Component, Children, Fragment} from 'react';
import * as utils from '../../../utilities/utilities';

class Carousel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            offset: 0,
            startIndex: 0,
            innerSlidesCount: 0,
        };

        this.fitSlides = this.fitSlides.bind(this);
    }

    getInnerSlidesCount() {
        return Number(getComputedStyle(this.carouselRef).getPropertyValue('--slides'));
    };

    moveSlider(operator) {
        if (operator === 1) {
            if ((this.state.startIndex + this.state.innerSlidesCount) >= Children.count(this.props.children)) {
                return;
            }
        } else {
            if (this.state.startIndex <= 0) {
                return;
            }
        }

        this.setState(prev => {
            return {
                startIndex: Math.max(prev.startIndex + operator, 0),
                offset: prev.offset - (operator * 100 / prev.innerSlidesCount)
            };
        });
    }

    componentDidMount() {
        this.setState({innerSlidesCount: this.getInnerSlidesCount()});
        window.addEventListener('resize', utils.debounce(this.fitSlides));
    }

    componentDidUpdate() {
        this.carouselRef.style.setProperty('--offset', this.state.offset);
    }

    fitSlides() {
        const innerSlidesCount = this.getInnerSlidesCount();
        this.setState(prev => {
            return {
                innerSlidesCount: innerSlidesCount,
                offset: prev.offset - (prev.offset + (prev.startIndex * 100 / innerSlidesCount))
            };
        });
    }

    render() {
        return (
            <div className="rw-carousel" ref={element => {
                this.carouselRef = element
            }}>
                {this.state.innerSlidesCount && (
                    <Fragment>
                        <div className="rw-carousel__arrows">
                            <button className="rw-carousel__arrows" onClick={() => this.moveSlider(1)}>UP</button>
                            <button className="rw-carousel__arrows" onClick={() => this.moveSlider(-1)}>Down</button>
                        </div>
                        <div className="rw-carousel__wrapper">
                            <div className="rw-carousel__slides">
                                {Children.map(this.props.children, Slide => (
                                    <div className="rw-carousel__slide">
                                        {Slide}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Fragment>
                )}
            </div>
        );
    }
}

export default Carousel;