import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { useConnectPage } from '../../hooks/useConnectPage'
import ProductCard from '../../components/shop/product/ProductCard/ProductCard'
import Content from '../../components/Layout/Content/Content'
import Grid from '../../components/UI/Grid/Grid'
import { loadCatalogPage } from '../../redux/catalog/catalogActions'
import ContentLoader from '../../components/UI/loaders/ContentLoader/ContentLoader'
import {
  selectCatalogProcess,
  selectProducts,
} from '../../redux/catalog/catalogSelectors'

const Catalog: FC = () => {
  const { title, loading } = useSelector(selectCatalogProcess)
  const products = useSelector(selectProducts)
  useConnectPage(loadCatalogPage)

  if (loading) return <ContentLoader />

  return (
    <Content title={title}>
      <Grid items={products}>{(product) => <ProductCard {...product} />}</Grid>
    </Content>
  )
}

export default Catalog
