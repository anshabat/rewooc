import React, {Component} from "react";
import connectPage from "../connectPage";
import ProductCard from "../../components/shop/product/ProductCard/ProductCard";
import Content from "../../components/Layout/Content/Content";
import Grid from "../../components/UI/Grid/Grid"
import {loadCatalogPage} from "../../redux/actionCreators";
import ContentLoader from "../../components/UI/loaders/ContentLoader/ContentLoader";

class Catalog extends Component {

  render() {
    const {page} = this.props;

    if (page.loading) return <ContentLoader/>;

    return (
      <Content title={page.title}>
        <Grid items={page.products}>
          {product => <ProductCard {...product} />}
        </Grid>
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.catalog,
  }
};
const mapDispatchToProps = dispatch => {
  return {
    loadPage: url => dispatch(loadCatalogPage(url))
  }
};

export default connectPage(mapStateToProps, mapDispatchToProps)(Catalog);