import './Home.scss';
import React, {Component} from 'react';
import SectionPrimary from '../../components/UI/sections/SectionPrimary/SectionPrimary';
import axios from 'axios';
import ProductCard from '../../components/Shop/Product/ProductCard/ProductCard';
import CardPost from '../../components/Posts/CardPost/CardPost';
import ListPost from '../../components/Posts/ListPost/ListPost';
import Loader from '../../components/UI/Loader/Loader';
import Grid from '../../components/UI/Grid/Grid';
import Carousel from '../../components/UI/Carousel/Carousel';
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

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

    getCarousel(carousel) {
        this.setState({carousel})
    }

    render() {
        return this.state.appData ? (
            <div className="rw-home">
                <div className="rw-home__main">
                    {this.state.appData.featuredProducts.length && (
                        <div className="rw-home__main-item">
                            <SectionPrimary title="Featured Products" carousel={this.state.carousel}>
                                <Carousel getCarousel={this.getCarousel.bind(this)}>
                                    {this.state.appData.featuredProducts.map(item => (
                                        <ProductCard
                                            {...item}
                                            key={item.id}
                                            onAddToCart={this.props.onAddToCart}
                                        />
                                    ))}
                                </Carousel>
                            </SectionPrimary>
                        </div>
                    )}
                    {this.state.appData.blogPosts.length && (
                        <div className="rw-home__main-item">
                            <CarouselProvider
                                naturalSlideWidth={50}
                                naturalSlideHeight={10}
                                totalSlides={this.state.appData.blogPosts.length}
                            >
                                <SectionPrimary title="Blog posts">
                                    <>
                                        <ButtonBack>Back</ButtonBack>
                                        <ButtonNext>Next</ButtonNext>
                                        <Slider>
                                            {this.state.appData.blogPosts.map((item) => (
                                                <Slide index={item.id} key={item.id}>
                                                    <CardPost {...item}/>
                                                </Slide>
                                            ))}
                                        </Slider>
                                    </>
                                </SectionPrimary>
                            </CarouselProvider>
                        </div>
                    )}
                    {this.state.appData.blogPosts.length && (
                        <div className="rw-home__main-item">
                            <SectionPrimary title="Latest news">
                                <ul className="rw-posts-widget">
                                    {this.state.appData.blogPosts.map(post => (
                                        <li className="rw-posts-widget__item" key={post.id}>
                                            <ListPost {...post}/>
                                        </li>
                                    ))}
                                </ul>
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