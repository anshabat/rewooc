import './Carousel.css';
import React, {Component} from 'react';
import Slide from './Slide/Slide';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as utils from '../../../utilities/utilities';

class Carousel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [
                '#1',
                '#2',
                '#3',
                '#4',
                '#5',
                '#6',
                '#7',
                '#8',
                '#9',
                '#10'
            ],
            offset: 0,
            activeItemIndex: 0,
            slidesNumber: 0,
        };

        this.fitSlides = this.fitSlides.bind(this);
    }

    getSlidesNumber() {
        return Number(getComputedStyle(this.carouselRef).getPropertyValue('--slides'));
    };

    moveSlider(operator) {
        if (operator === 1) {
            if ((this.state.activeItemIndex + this.state.slidesNumber) >= this.state.items.length) {
                return;
            }
        } else {
            if (this.state.activeItemIndex <= 0) {
                return;
            }
        }

        this.setState(prev => {
            return {
                activeItemIndex: Math.max(prev.activeItemIndex + operator, 0),
                offset: prev.offset - (operator * 100 / prev.slidesNumber)
            };
        });
    }

    componentDidMount() {
        this.setState({slidesNumber: this.getSlidesNumber()});
        window.addEventListener('resize', utils.debounce(this.fitSlides));
    }

    componentDidUpdate() {
        this.carouselRef.style.setProperty('--offset', this.state.offset);
    }

    fitSlides() {
        console.log('fit');
        const slidesNumber = this.getSlidesNumber();
        this.setState(prev => {
            return {
                slidesNumber: slidesNumber,
                offset: prev.offset - (prev.offset + (prev.activeItemIndex * 100 / slidesNumber))
            };
        });
    }

    render() {
        return (
            <div className="rw-carousel" ref={element => {
                this.carouselRef = element
            }}>
                {this.state.slidesNumber && (
                    <React.Fragment>
                        <div className="rw-carousel__arrows">
                            <button className="rw-carousel__arrows" onClick={() => this.moveSlider(1)}>UP</button>
                            <button className="rw-carousel__arrows" onClick={() => this.moveSlider(-1)}>Down</button>
                        </div>
                        <div className="rw-carousel__wrapper">
                            <div className="rw-carousel__slides">
                                {this.state.items.map((item, index) => (
                                    <div className="rw-carousel__slide" key={item}>
                                        <Slide item={item} index={index}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </div>
        );
    }
}

export default Carousel;