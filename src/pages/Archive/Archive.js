import "./Archive.scss";
import React from "react";
import ProductCard from "../../components/shop/product/ProductCard/ProductCard";
import withPageData from "../withPageData";
import Content from "../../components/Layout/Content/Content";
import Grid from "../../components/UI/Grid/Grid"

const Archive = ({products, title}) => {
  return (
    <Content title={title}>
      <Grid items={products}>
        {product => <ProductCard {...product} />}
      </Grid>
    </Content>
  );
};

export default withPageData(Archive);