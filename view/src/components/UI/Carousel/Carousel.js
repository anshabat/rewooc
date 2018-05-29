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
            innerItems: [
                'fist',
                'second',
                'third',
                'fourth',
            ],
            offset: 0
        };
    }

    moveSlider(operator) {

        if (operator === 1) {
            if (this.state.innerItems[0] === this.state.items[0]) {
                return;
            }
        } else {
            if (this.state.innerItems[this.state.innerItems.length - 1] === this.state.items[this.state.items.length - 1]) {
                return;
            }
            let nextItem = this.state.items.findIndex((item) => item === this.state.innerItems[this.state.innerItems.length - 1]);
            const innerItems = this.state.innerItems.concat(this.state.items[nextItem + 1]);
            innerItems.shift();
            console.log(innerItems);
            this.setState({innerItems: innerItems});
        }

        this.slidesNumber = Number(getComputedStyle(this.carouselRef).getPropertyValue('--slides'));
        this.setState(prev => {
            return {offset: prev.offset + (operator * 100 / this.slidesNumber)}
        });
    }

    componentDidUpdate() {
        console.log('update');
        this.carouselRef.style.setProperty('--offset', this.state.offset);
    }

    componentDidMount() {
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
                        {this.state.innerItems.map((item, index) => (
                            <div className="rw-carousel__slide" key={index}>{item}</div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Carousel;