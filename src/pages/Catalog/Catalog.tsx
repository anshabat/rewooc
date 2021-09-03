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
import { useProductsInCartSelector } from '../../hooks/useProductsInCartSelector'

const Catalog: FC = () => {
  const { title, loading } = useSelector(selectCatalogProcess)
  const products = useSelector(selectProducts)
  const { cartItemsIds, addingToCartId } = useProductsInCartSelector()
  useConnectPage(loadCatalogPage)

  if (loading) return <ContentLoader />

  return (
    <Content title={title}>
      <Grid items={products}>
        {(product) => {
          //return <ProductCard {...product} />
          console.log(product.images)
          return (
            <ProductCard
              id={product.id}
              images=""
              title={product.title}
              price={product.price}
              link={product.link}
              isProductInCart={cartItemsIds.includes(product.id)}
              isProductAddingToCart={addingToCartId === product.id}
            />
          )
        }}
      </Grid>
    </Content>
  )
}

export default Catalog
