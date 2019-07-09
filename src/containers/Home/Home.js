import './Home.scss';
import React, {Component} from 'react';
import SectionPrimary from '../../components/UI/sections/SectionPrimary/SectionPrimary';
import axios from 'axios';
import ProductCard from '../../components/Shop/Product/ProductCard/ProductCard';
import CardPost from '../../components/Posts/CardPost/CardPost';
import Loader from '../../components/UI/Loader/Loader';
import Grid from '../../components/UI/Grid/Grid';
import {Slider, CarouselProvider} from '../../components/Carousel';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            appData: null,
            carousel: null
        }
    }

    componentDidMount() {
        axios.get('http://rewooc.loc/server/wp').then(({data}) => {
            this.setState({
                appData: data
            });
        })
    }

    render() {
        return this.state.appData ? (
            <div className="rw-home">
                <div className="rw-home__main">
                    {this.state.appData.featuredProducts.length && (
                        <div className="rw-home__main-item">
                            <CarouselProvider>
                                <SectionPrimary title="Featured Products">
                                    <Slider>
                                        {this.state.appData.featuredProducts.map(item => (
                                            <ProductCard
                                                {...item}
                                                key={item.id}
                                                onAddToCart={this.props.onAddToCart}
                                            />
                                        ))}
                                    </Slider>
                                </SectionPrimary>
                            </CarouselProvider>
                        </div>
                    )}
                    {this.state.appData.blogPosts.length && (
                        <div className="rw-home__main-item">
                            <SectionPrimary title="Latest news">
                                <Grid items={this.state.appData.blogPosts}>
                                    {item => <CardPost {...item}/>}
                                </Grid>
                            </SectionPrimary>
                        </div>
                    )}
                </div>
            </div>
        ) : (
            <div className="rw-page-loader">
                <Loader/>
            </div>
        );
    }
}

Home.defaultProps = {
    getCarousel: () => {
    }
};

export default Home;