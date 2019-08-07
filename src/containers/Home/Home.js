import './Home.scss';
import React, {Component} from 'react';
import SectionPrimary from '../../components/UI/sections/SectionPrimary/SectionPrimary';
import ProductCard from '../../components/Shop/Product/ProductCard/ProductCard';
import CardPost from '../../components/Posts/CardPost/CardPost';
import Grid from '../../components/UI/Grid/Grid';
import {Slider, CarouselProvider} from '../../components/Carousel';
import pageProvider from '../../providers/pageProvider';

const Home = ({featuredProducts, blogPosts}) => {
    return (
        <div className="rw-home">
            <div className="rw-home__main">
                {featuredProducts.length && (
                    <div className="rw-home__main-item">
                        <CarouselProvider>
                            <SectionPrimary title="Featured Products">
                                <Slider>
                                    {featuredProducts.map(item => (
                                        <ProductCard
                                            {...item}
                                            key={item.id}
                                        />
                                    ))}
                                </Slider>
                            </SectionPrimary>
                        </CarouselProvider>
                    </div>
                )}
                {blogPosts.length && (
                    <div className="rw-home__main-item">
                        <SectionPrimary title="Latest news">
                            <Grid items={blogPosts}>
                                {item => <CardPost {...item}/>}
                            </Grid>
                        </SectionPrimary>
                    </div>
                )}
            </div>
        </div>
    );
};

export default pageProvider(Home);