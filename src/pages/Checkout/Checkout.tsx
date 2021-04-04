import React, { useEffect, useState } from 'react'
import Content from '../../components/Layout/Content/Content'
import Button from '../../components/UI/Button/Button'
import { orderApi } from 'app-data'
import { usePageData } from '../../hooks/usePageData'
import ContentLoader from '../../components/UI/loaders/ContentLoader/ContentLoader'

const Checkout: React.FC = () => {
  const data = usePageData()

  useEffect(() => {
    orderApi
      .wooRest()
      .then((data) => {
        console.log('success', data)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }, [])

  if (!data) return <ContentLoader />

  const submitForm = (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    orderApi.createOrder(formData)
  }

  const setValue = () => {
    console.log('value')
  }

  return (
    <Content title="Checkout">
      <form action="" onSubmit={submitForm}>
        <div>
          <input
            type="text"
            name="billing_first_name"
            placeholder="First name"
            value="Andriy"
            onChange={setValue}
          />
        </div>
        <div>
          <input
            type="text"
            name="billing_last_name"
            placeholder="Last name"
            value="Shabat"
            onChange={setValue}
          />
        </div>
        <div>
          <input
            type="text"
            name="billing_country"
            placeholder="Country"
            value="UA"
            onChange={setValue}
          />
        </div>
        <div>
          <input
            type="text"
            name="billing_city"
            placeholder="Address"
            value="Lviv"
            onChange={setValue}
          />
        </div>
        <div>
          <input
            type="text"
            name="billing_address_1"
            placeholder="Address"
            value="Antonycha"
            onChange={setValue}
          />
        </div>
        <div>
          <input
            type="text"
            name="billing_phone"
            placeholder="Address"
            value="0988165441"
            onChange={setValue}
          />
        </div>
        <div>
          <input
            type="text"
            name="billing_email"
            placeholder="Address"
            value="ad1@min.com"
            onChange={setValue}
          />
        </div>
        <div>
          <Button size="lg" color="secondary">
            Submit
          </Button>
        </div>
      </form>
    </Content>
  )
}
export default Checkout
