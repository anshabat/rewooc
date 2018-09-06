import './App.css';
import React, {Component} from 'react';
import Header from '../../components/Header/Header';
import Dropdown from '../../components/Nav/Dropdown/Dropdown';
import ListNav from '../../components/Nav/ListNav/ListNav';
import Nav from '../../components/Nav/Nav';
import Autocomplete from '../../components/Autocomplete/Autocomplete';
import Phone from "../../components/Phone/Phone";
import Image from '../../components/UI/Image/Image';
import MiniCart from '../../components/Shop/Cart/MiniCart/MiniCart';
import HomeLayout_1 from '../../layouts/homepage/HomeLayout_1/HomeLayout_1';
import {connect} from 'react-redux';
import {addToCart} from '../../store/actions/cart';

class App extends Component {
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
        onAddToCart: (id, event) => dispatch(addToCart(id, event))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);