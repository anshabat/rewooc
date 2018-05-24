import './Carousel.css';
import React, {Component} from 'react';

class Carousel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [
                'fist',
                'second',
                'third',
                'fourth',
                'fifth',
                'six',
                'seven',
                'eight',
                'nine',
                'ten'
            ],
            offset: 0
        };
    }

    moveSlider(operator) {
        this.slidesNumber = Number(getComputedStyle(this.carouselRef).getPropertyValue('--slides'));
        this.setState(prev => {
            return {offset: prev.offset + (operator * 100 / this.slidesNumber)}
        });
    }

    componentDidUpdate() {
        this.carouselRef.style.setProperty('--offset', this.state.offset);
    }

    render() {
        return (
            <div className="rw-carousel" ref={element => {
                this.carouselRef = element
            }}>
                <div className="rw-carousel__arrows">
                    <button className="rw-carousel__arrows" onClick={() => this.moveSlider(-1)}>Left</button>
                    <button className="rw-carousel__arrows" onClick={() => this.moveSlider(1)}>Right</button>
                </div>
                <div className="rw-carousel__wrapper">
                    <div className="rw-carousel__slides">
                        {this.state.items.map((item, index) => (
                            <div className="rw-carousel__slide" key={index}>{item}</div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Carousel;