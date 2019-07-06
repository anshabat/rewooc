import React, {Component} from 'react';
import Context from './context';

class CP extends Component {
    constructor(props) {
        super(props);

        this.state = {
            carousel: null
        };

        this.getCarousel = this.getCarousel.bind(this);
    }

    getCarousel(carousel) {
        this.setState({carousel})
    }

    render() {
        return (
            <Context.Provider value={{
                getCarousel: this.getCarousel,
                carousel: this.state.carousel
            }}>{this.props.children}</Context.Provider>
        )
    }
}

export default CP;