import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useConnectPage } from '../../hooks/useConnectPage'
import ProductCard from '../../components/shop/product/ProductCard/ProductCard'
import Content from '../../components/Layout/Content/Content'
import Grid from '../../components/UI/Grid/Grid'
import {
  catalogPageHideError,
  loadCatalogPage,
} from '../../redux/catalog/catalogActions'
import ContentLoader from '../../components/UI/loaders/ContentLoader/ContentLoader'
import {
  selectCatalogProcess,
  selectProducts,
} from '../../redux/catalog/catalogSelectors'
import { useProductsInCartSelector } from '../../hooks/useProductsInCartSelector'
import ProductContainer from '../../components/shop/product/ProductContainer/ProductContainer'
import Dialog from '../../components/UI/Dialog/Dialog'

const Catalog: FC = () => {
  const { title, loading, error } = useSelector(selectCatalogProcess)
  const products = useSelector(selectProducts)
  const dispatch = useDispatch()
  //const { cartItemsIds, addingToCartId } = useProductsInCartSelector()
  useConnectPage(loadCatalogPage)

  if (loading) return <ContentLoader />

  return (
    <Content title={title}>
      {error ? (
        <Dialog
          isOpened={true}
          onClose={() => {
            dispatch(catalogPageHideError())
          }}
        >
          {error.toString()}
        </Dialog>
      ) : (
        <Grid items={products}>
          {(product) => {
            return (
              <ProductContainer>
                <ProductCard
                  id={product.id}
                  images={product.images}
                  title={product.title}
                  price={product.price}
                  link={product.link}
                />
              </ProductContainer>
            )
          }}
        </Grid>
      )}
    </Content>
  )
}

export default Catalog
