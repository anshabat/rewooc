import './Carousel.css';
import React, {Component} from 'react';

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
            innerItems: [
                '#1',
                '#2',
                '#3',
                '#4',
            ],
            offset: 0
        };
    }

    moveSlider(operator) {

        if (operator === 1) {
            if (this.state.innerItems[0] === this.state.items[0]) {
                return;
            }
            const innerItems = [...this.state.innerItems];
            let firstInnerItemIndex = this.state.items.findIndex((item) => item === this.state.innerItems[0]);

            //видаляємо останній
            innerItems.pop();
            //добавляємо на початок один
            innerItems.unshift(this.state.items[firstInnerItemIndex - 1]);

            this.setState({innerItems: innerItems});

        } else {
            if (this.state.innerItems[this.state.innerItems.length - 1] === this.state.items[this.state.items.length - 1]) {
                return;
            }
            const innerItems = [...this.state.innerItems];
            let lastInnerItemIndex = this.state.items.findIndex((item) => item === this.state.innerItems[this.state.innerItems.length - 1]);

            //добавляємо один в кінець
            innerItems.push(this.state.items[lastInnerItemIndex + 1]);
            //видаляємо перший
            innerItems.shift();

            this.setState({innerItems: innerItems});
        }

        this.slidesNumber = Number(getComputedStyle(this.carouselRef).getPropertyValue('--slides'));
        this.setState(prev => {
            return {offset: prev.offset + (operator * 100 / this.slidesNumber)}
        });
    }

    componentDidUpdate() {
        //this.carouselRef.style.setProperty('--offset', this.state.offset);
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