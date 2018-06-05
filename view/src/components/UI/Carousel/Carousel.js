import './Carousel.css';
import React, {Component} from 'react';
import Slide from './Slide/Slide';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
            slidesNumber: null
        };
    }

    getSlidesNumber() {
        return Number(getComputedStyle(this.carouselRef).getPropertyValue('--slides'));
    };

    moveSlider(operator) {
        this.setState({slidesNumber: this.getSlidesNumber()});

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
            return {activeItemIndex: Math.max(prev.activeItemIndex + operator, 0)};
        });

        /*this.setState(prev => {
            return {offset: prev.offset + (operator * 100 / this.slidesNumber)}
        });*/
    }

    componentDidMount() {
        this.setState({slidesNumber: this.getSlidesNumber()});
    }

    render() {
        const innerItems = this.state.items.filter((item, index) => {
            return (index >= this.state.activeItemIndex) && (index < this.state.activeItemIndex + this.state.slidesNumber);
        });
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
                            <ReactCSSTransitionGroup
                                component="div"
                                className="rw-carousel__slides"
                                transitionName="carousel"
                            >
                                {innerItems.map((item) => (
                                    <div className="rw-carousel__slide" key={item}>
                                        <Slide item={item}/>
                                    </div>
                                ))}
                            </ReactCSSTransitionGroup>
                        </div>
                    </React.Fragment>
                )}
            </div>
        );
    }
}

export default Carousel;