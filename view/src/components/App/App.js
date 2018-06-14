import './App.css';
import React, {Component} from 'react';
import Header from '../../components/Header/Header';
import Dropdown from '../Nav/Dropdown/Dropdown';
import ListNav from '../Nav/ListNav/ListNav';
import Nav from '../Nav/Nav';
import Autocomplete from '../Autocomplete/Autocomplete';
import HeroBanner from '../../components/Banners/HeroBanner/HeroBanner';
import Phone from "../Phone/Phone";
import Card from '../UI/Card/Card';
import Image from '../UI/Image/Image';
import Carousel from '../UI/Carousel/Carousel';
import ProductCard from '../Shop/Product/ProductCard/ProductCard';
import MiniCart from '../Shop/Cart/MiniCart/MiniCart';
import * as utils from '../../shared';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: {
                count: this.props.appData.cart.count,
                subtotal: this.props.appData.cart.subtotal
            }
        };

        this.onAddToCart = this.onAddToCart.bind(this);
    }

    onAddToCart(id, e) {
        e.preventDefault();
        console.log(`add ${id}`);
        jQuery.ajax({
            url: utils.getAjaxEndpoint('rewooc_add_to_cart'),
            success: (data) => {
                console.log(data);
            }
        })
    }

    render() {
        return (
            <div className={`pc-app pc-app--${this.props.appData.themeMods.rewooc_site_layout}`}>
                <div className="pc-app__header">
                    <Header
                        headlineLeft={<Nav items={this.props.appData.headerNavigation} navs={[ListNav, Dropdown]}/>}
                        headlineRight={<Phone phoneNumber={this.props.appData.themeMods.rewooc_site_phone}/>}
                        mainLeft={<Image image={this.props.appData.themeMods.custom_logo}/>}
                        mainRight={<MiniCart count={this.state.cart.count}
                                             subtotal={Number(this.state.cart.subtotal)}/>}
                        mainCenter={<Autocomplete delay="500" minChars="3" limit="6"/>}
                    />
                </div>
                {/*<div className="pc-app__main-banner"><HeroBanner/></div>*/}
                <div className="pc-app__featured">
                    <div className="ps-container">
                        <Card title="Featured Products">
                            <div className="rw-carousel__arrows">
                                <button className="rw-carousel__arrows" onClick={() => this.$carousel.prev()}>
                                    Prev
                                </button>
                                <button className="rw-carousel__arrows" onClick={() => this.$carousel.next()}>
                                    Next
                                </button>
                            </div>
                            <Carousel ref={carousel => {
                                this.$carousel = carousel;
                            }}>
                                {this.props.appData.featuredProducts.map(product => (
                                    <ProductCard
                                        {...product}
                                        key={product.id}
                                        onAddToCart={this.onAddToCart}
                                    />
                                ))}
                            </Carousel>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;