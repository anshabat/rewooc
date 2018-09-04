import './App.css';
import React, {Component} from 'react';
import Header from '../../components/Header/Header';
import Dropdown from '../Nav/Dropdown/Dropdown';
import ListNav from '../Nav/ListNav/ListNav';
import Nav from '../Nav/Nav';
import Autocomplete from '../Autocomplete/Autocomplete';
import Phone from "../Phone/Phone";
import Image from '../UI/Image/Image';
import MiniCart from '../Shop/Cart/MiniCart/MiniCart';
import * as utils from '../../shared';
import HomeLayout_1 from '../../layouts/homepage/HomeLayout_1/HomeLayout_1';
import {connect} from 'react-redux';

class App extends Component {
    constructor(props) {
        super(props);
        /*this.state = {
            cart: this.props.appData.cart
        };*/

        //this.onAddToCart = this.onAddToCart.bind(this);
    }

    /*onAddToCart(id, e) {
        e.preventDefault();
        jQuery.ajax({
            url: utils.getAjaxEndpoint('rewooc_add_to_cart'),
            method: 'post',
            data: {
                productId: id
            },
            success: (cartData) => {
                if (!cartData.error) {
                    this.setState({cart: cartData});
                }
            }
        })
    }*/

    render() {
        return (
            <div className={`pc-app pc-app--${this.props.appData.themeMods.rewooc_site_layout}`}>
                <div className="pc-app__header">
                    <Header
                        headlineLeft={<Nav items={this.props.appData.headerNavigation} navs={[ListNav, Dropdown]}/>}
                        headlineRight={<Phone phoneNumber={this.props.appData.themeMods.rewooc_site_phone}/>}
                        mainLeft={<Image image={this.props.appData.themeMods.custom_logo}/>}
                        mainRight={<MiniCart count={this.props.cart.count}
                                             subtotal={Number(this.props.cart.subtotal)}/>}
                        mainCenter={<Autocomplete delay="500" minChars="3" limit="6"/>}
                    />
                </div>

                <div className="rw-app__homepage">
                    <HomeLayout_1
                        main={this.props.appData.widgets.homepage_main}
                        sidebar={this.props.appData.widgets.homepage_sidebar}
                        onAddToCart={this.props.onAddToCart}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddToCart: (id) => dispatch({type: 'ADD_TO_CART', id: id})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);