import './Home.scss';
import React, {Component} from 'react';
import SectionPrimary from '../../components/UI/sections/SectionPrimary/SectionPrimary';
import axios from 'axios';
import ProductCard from '../../components/Shop/Product/ProductCard/ProductCard';
import CardPost from '../../components/Posts/CardPost/CardPost';
import Loader from '../../components/UI/Loader/Loader';
import Grid from '../../components/UI/Grid/Grid';
import {Slider, CarouselProvider} from '../../components/Carousel';
import {apiUrl} from '../../shared/utilities';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

   /* componentDidMount() {
        axios.get(apiUrl()).then(({data}) => {
            this.setState({
                appData: data
            });
        })
    }*/

    render() {
        return (
            <div className="rw-home">
                <div className="rw-home__main">
                    {this.props.appData.featuredProducts.length && (
                        <div className="rw-home__main-item">
                            <CarouselProvider>
                                <SectionPrimary title="Featured Products">
                                    <Slider>
                                        {this.props.appData.featuredProducts.map(item => (
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
                    {this.props.appData.blogPosts.length && (
                        <div className="rw-home__main-item">
                            <SectionPrimary title="Latest news">
                                <Grid items={this.props.appData.blogPosts}>
                                    {item => <CardPost {...item}/>}
                                </Grid>
                            </SectionPrimary>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Home;