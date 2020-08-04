import React, {Component} from "react";
import connectPage from "../connectPage";
import ProductCard from "../../components/shop/product/ProductCard/ProductCard";
import Content from "../../components/Layout/Content/Content";
import Grid from "../../components/UI/Grid/Grid"
import {loadCatalogPage} from "../../actions/loadCatalogPage";
import ContentLoader from "../../components/UI/loaders/ContentLoader/ContentLoader";

class Catalog extends Component {

  render() {
    const {loading, title, products} = this.props;

    products.map(item => {
      console.log(item)
    })

    if (loading) return <ContentLoader/>;

    return (
      <Content title={title}>
        <Grid items={products}>
          {product => <ProductCard {...product} />}
        </Grid>
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.catalog.get('loading'),
    title: state.catalog.get('title'),
    products: state.catalog.get('products')
  }
};
const mapDispatchToProps = dispatch => {
  return {
    loadPage: url => dispatch(loadCatalogPage(url))
  }
};

export default connectPage(mapStateToProps, mapDispatchToProps)(Catalog);