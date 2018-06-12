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
            lastLoadedIndex: 0
        };

        this.fitSlides = this.fitSlides.bind(this);
        this.debouncedFitSlides = utils.debounce(this.fitSlides);
    }

    componentDidMount() {
        const innerSlidesCount = this.getInnerSlidesCount();
        this.setState({
            innerSlidesCount: innerSlidesCount,
            lastLoadedIndex: innerSlidesCount
        });
        window.addEventListener('resize', this.debouncedFitSlides);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.debouncedFitSlides);
    }

    componentDidUpdate() {
        this.$carousel.style.setProperty('--offset', this.state.offset);
    }

    getInnerSlidesCount() {
        return Number(getComputedStyle(this.$carousel).getPropertyValue('--slides'));
    }

    moveSlider(operator) {
        this.setState(prev => {
            const startIndex = Math.max(prev.startIndex + operator, 0);
            return {
                startIndex: startIndex,
                offset: prev.offset - (operator * 100 / prev.innerSlidesCount),
                lastLoadedIndex: Math.max(prev.lastLoadedIndex, (startIndex + prev.innerSlidesCount))
            };
        });
    }

    prev() {
        if (this.state.startIndex <= 0) {
            return;
        }
        this.moveSlider(-1);
    }

    next() {
        if ((this.state.startIndex + this.state.innerSlidesCount) >= Children.count(this.props.children)) {
            return;
        }
        this.moveSlider(1);
    }

    fitSlides() {
        const innerSlidesCount = this.getInnerSlidesCount();
        this.setState(prev => {
            return {
                innerSlidesCount: innerSlidesCount,
                offset: prev.offset - (prev.offset + (prev.startIndex * 100 / innerSlidesCount)),
                lastLoadedIndex: Math.max(prev.lastLoadedIndex, (prev.startIndex + innerSlidesCount))
            };
        });
    }

    render() {
        return (
            <div className="rw-carousel" ref={element => {
                this.$carousel = element
            }}>
                {this.state.innerSlidesCount && (
                    <Fragment>
                        <div className="rw-carousel__wrapper">
                            <div className="rw-carousel__slides">
                                {Children.map(this.props.children, (Slide, index) => {
                                    return (
                                        <div className="rw-carousel__slide">
                                            {index < (this.state.lastLoadedIndex) ? Slide : null}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Fragment>
                )}
            </div>
        );
    }
}

export default Carousel;