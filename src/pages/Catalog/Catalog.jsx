import React from 'react'
import { useSelector } from 'react-redux'
import connectPage from '../connectPage'
import ProductCard from '../../components/shop/product/ProductCard/ProductCard'
import Content from '../../components/Layout/Content/Content'
import Grid from '../../components/UI/Grid/Grid'
import { loadCatalogPage } from '../../redux/catalog/catalogActions'
import ContentLoader from '../../components/UI/loaders/ContentLoader/ContentLoader'
import { selectProducts } from '../../redux/catalog/catalogSelectors'

const Catalog = () => {
  const loading = useSelector((state) => state.catalog.loading)
  const title = useSelector((state) => state.catalog.title)
  const products = useSelector(selectProducts)

  if (loading) return <ContentLoader />

  return (
    <Content title={title}>
      <Grid items={products}>{(product) => <ProductCard {...product} />}</Grid>
    </Content>
  )
}

export default connectPage(loadCatalogPage)(Catalog)
