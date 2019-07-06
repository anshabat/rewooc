import './Home.scss';
import React, {Component} from 'react';
import SectionPrimary from '../../components/UI/sections/SectionPrimary/SectionPrimary';
import axios from 'axios';
import ProductCard from '../../components/Shop/Product/ProductCard/ProductCard';
import CardPost from '../../components/Posts/CardPost/CardPost';
import ListPost from '../../components/Posts/ListPost/ListPost';
import Loader from '../../components/UI/Loader/Loader';
import Grid from '../../components/UI/Grid/Grid';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            appData: null
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
                            <SectionPrimary title="Featured Products">
                                <Grid items={this.state.appData.featuredProducts}>
                                    {(item) => (
                                        <ProductCard
                                            {...item}
                                            onAddToCart={this.props.onAddToCart}
                                        />
                                    )}
                                </Grid>
                            </SectionPrimary>
                        </div>
                    )}
                    {this.state.appData.blogPosts.length && (
                        <div className="rw-home__main-item">
                            <SectionPrimary title="Blog posts">
                                <Grid items={this.state.appData.blogPosts}>
                                    {(item) => (
                                        <CardPost {...item}/>
                                    )}
                                </Grid>
                            </SectionPrimary>
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

export default Home;