import './Home.scss';
import React, {Component} from 'react';
import SectionPrimary from '../../components/UI/sections/SectionPrimary/SectionPrimary';
import SectionSidebar from '../../components/UI/sections/SectionSidebar/SectionSidebar';
import axios from 'axios';
import ProductCard from '../../components/Shop/Product/ProductCard/ProductCard';
import CardPost from '../../components/Posts/CardPost/CardPost';
import ListPost from '../../components/Posts/ListPost/ListPost';

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
                <div className="rw-home__sidebar">
                    {this.state.appData.featuredProducts.length && (
                        <div className="rw-home__sidebar-item">
                            <SectionSidebar title="Sales">
                                <div className="rw-products-widget">
                                    {this.state.appData.featuredProducts.map(product => (
                                        <div className="rw-products-widget__item" key={product.id}>
                                            <ProductCard
                                                {...product}
                                                onAddToCart={this.props.onAddToCart}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </SectionSidebar>
                        </div>
                    )}
                </div>
                <div className="rw-home__main">
                    {this.state.appData.featuredProducts.length && (
                        <div className="rw-home__main-item">
                            <SectionPrimary title="Featured Products">
                                <div className="rw-products-widget rw-products-widget--horizontal">
                                    {this.state.appData.featuredProducts.map(product => (
                                        <div className="rw-products-widget__item" key={product.id}>
                                            <ProductCard
                                                {...product}
                                                onAddToCart={this.props.onAddToCart}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </SectionPrimary>
                        </div>
                    )}
                    {this.state.appData.blogPosts.length && (
                        <div className="rw-home__main-item">
                            <SectionPrimary title="Blog posts">
                                <ul className="rw-posts-widget">
                                    {this.state.appData.blogPosts.map(post => (
                                        <li className="rw-posts-widget__item" key={post.id}>
                                            <CardPost {...post}/>
                                        </li>
                                    ))}
                                </ul>
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
            <div>Loading home...</div>
        );
    }
}

export default Home;