import React, {Component} from 'react';

const ConnectCarousel = (ComposedComponent) => {
    return class extends Component {

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
                <ComposedComponent
                    {...this.props}
                    carousel={this.state.carousel}
                >
                    {React.cloneElement(this.props.children, {getCarousel: this.getCarousel})}
                </ComposedComponent>
            )
        }
    }
};

export default ConnectCarousel;