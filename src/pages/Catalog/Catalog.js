import React, {Component} from "react";
import ProductCard from "../../components/shop/product/ProductCard/ProductCard";
import Content from "../../components/Layout/Content/Content";
import Grid from "../../components/UI/Grid/Grid"
import {connect} from "react-redux";
import {apiUrl} from "../../shared/utilities";
import {loadProducts} from "../../redux/actionCreators";
import ContentLoader from "../../components/UI/loaders/ContentLoader/ContentLoader";

class Catalog extends Component {
  componentDidMount() {
    this.props.loadProducts(apiUrl(window.location.pathname))
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.props.loadProducts(apiUrl(window.location.pathname))
    }
  }

  render() {
    const {products, loading, title} = this.props;

    if (loading) return <ContentLoader/>;

    return (
      <Content title={title}>
        <Grid items={products}>
          {product => <ProductCard {...product} />}
        </Grid>
      </Content>
    );
  }
}

const mapStateToProps = ({products}) => {
  return {
    title: products.title,
    products: products.items,
    loading: products.loading
  }
};
const mapDispatchToProps = {loadProducts};

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);