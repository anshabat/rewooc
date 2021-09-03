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
import { selectAddingToCartId, selectCartItems } from '../../redux/cart/cartSelectors'

const Catalog: FC = () => {
  const { title, loading } = useSelector(selectCatalogProcess)
  const products = useSelector(selectProducts)
  useConnectPage(loadCatalogPage)
  const cartItems = useSelector(selectCartItems)
  const addingToCartId = useSelector(selectAddingToCartId)

  if (loading) return <ContentLoader />

  return (
    <Content title={title}>
      <Grid items={products}>
        {(product) => {
          console.log(product)
          //return <ProductCard {...product} />
          return (
            <ProductCard
              id={product.id}
              images=""
              title={product.title}
              price={product.price}
              link={product.link}
              isProductInCart={!!cartItems.find(item => item.product.id === product.id)}
              isProductAddingToCart={addingToCartId === product.id}
            />
          )
        }}
      </Grid>
    </Content>
  )
}

export default Catalog
