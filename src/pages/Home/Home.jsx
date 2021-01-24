import './Home.scss'
import React from 'react'
import SectionPrimary from '../../components/UI/sections/SectionPrimary/SectionPrimary'
import ProductCard from '../../components/shop/product/ProductCard/ProductCard'
import CardPost from '../../components/posts/CardPost/CardPost'
import Grid from '../../components/UI/Grid/Grid'
import { Slider, CarouselProvider } from '../../components/carousel'
import withPageData from '../withPageData'

const Home = ({ featuredProducts, blogPosts }) => (
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

export default withPageData(Home)
