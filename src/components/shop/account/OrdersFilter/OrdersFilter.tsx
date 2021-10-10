import React, { ReactElement, useEffect, useState } from 'react'
import HorizontalFilter from '../../../UI/HorizontalFilter/HorizontalFilter'
import ChoiceList from '../../../UI/Form/ChoiceList/ChoiceList'
import { IFilterComponent } from 'app-services/orders/types'
import { useOrdersFilter } from '../../../../hooks/useOrdersFilter'
import { IOrder } from 'app-types'

interface IProps {
  orders: IOrder[]
  onFilter: (orders: IOrder[]) => void
}

export interface IOrderValues {
  status: string[]
  delivery: string[]
}

const initialValues: IOrderValues = {
  status: [],
  delivery: [],
}

function OrdersFilter(props: IProps): ReactElement {
  const { orders, onFilter } = props
  const [values, setValues] = useState(initialValues)
  const {
    filteredOrders,
    attributes,
    applyFilter,
  } = useOrdersFilter(orders)

  useEffect(() => {
    onFilter(filteredOrders)
  }, [filteredOrders])

  useEffect(() => {
    applyFilter(values)
  }, [values])

  const updateAttributes = (newValues: Partial<IOrderValues>) => {
    setValues((prev) => ({ ...prev, ...newValues }))
  }

  const attributeComponents: IFilterComponent[] = [
    {
      key: 'status',
      label: 'Status',
      valuesComponent: (
        <ChoiceList
          options={attributes.status}
          defaultOptions={values.status}
          onChange={(newValues) => {
            updateAttributes({ status: newValues })
          }}
        />
      ),
      isApplied: Boolean(values.status.length),
    },
    {
      key: 'delivery',
      label: 'Delivery',
      valuesComponent: (
        <ChoiceList
          options={attributes.delivery}
          defaultOptions={values.delivery}
          onChange={(newValues) => {
            updateAttributes({ delivery: newValues })
          }}
        />
      ),
      isApplied: Boolean(values.delivery.length),
    },
  ]

  return (
    <div className="rw-order-filter">
      <HorizontalFilter attributes={attributeComponents} />
    </div>
  )
}

export default OrdersFilter
