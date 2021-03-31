import './Home.scss'
import React from 'react'
import { IBlogPost, IProduct } from 'app-types'
import SectionPrimary from '../../components/UI/sections/SectionPrimary/SectionPrimary'
import ProductCard from '../../components/shop/product/ProductCard/ProductCard'
import CardPost from '../../components/posts/CardPost/CardPost'
import Grid from '../../components/UI/Grid/Grid'
import { Slider, CarouselProvider } from '../../components/carousel'
import { usePageData } from '../../hooks/usePageData'
import ContentLoader from '../../components/UI/loaders/ContentLoader/ContentLoader'

interface IProps {
  featuredProducts: IProduct[]
  blogPosts: IBlogPost[]
}

const Home: React.FC = () => {
  const data = usePageData<IProps>()

  if (!data) return <ContentLoader />

  const { featuredProducts, blogPosts } = data

  return (
    <div className="rw-home">
      <div className="rw-home__main">
        {featuredProducts.length && (
          <div className="rw-home__main-item">
            <CarouselProvider>
              <SectionPrimary title="Featured Products">
                <Slider>
                  {featuredProducts.map((item) => (
                    <ProductCard {...item} key={item.id} />
                  ))}
                </Slider>
              </SectionPrimary>
            </CarouselProvider>
          </div>
        )}
        {blogPosts.length && (
          <div className="rw-home__main-item">
            <SectionPrimary title="Latest news">
              <Grid items={blogPosts}>{(item) => <CardPost {...item} />}</Grid>
            </SectionPrimary>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
