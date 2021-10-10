import React, { ReactElement, useEffect } from 'react'
import HorizontalFilter from '../../../UI/HorizontalFilter/HorizontalFilter'
import ChoiceList from '../../../UI/Form/ChoiceList/ChoiceList'
import { IFilterComponent } from 'app-services/orders/types'
import { useOrdersFilter } from '../../../../hooks/useOrdersFilter'
import { IOrder } from 'app-types'

interface IProps {
  initialOrders: IOrder[]
  onFilter: (orders: IOrder[]) => void
}

function OrdersFilter(props: IProps): ReactElement {
  const { initialOrders, onFilter } = props

  const { orders, attributes, values, updateValues } = useOrdersFilter(
    initialOrders
  )

  useEffect(() => {
    onFilter(orders)
  }, [orders])

  const attributeComponents: IFilterComponent[] = [
    {
      key: 'status',
      label: 'Status',
      valuesComponent: (
        <ChoiceList
          options={attributes.status}
          defaultOptions={values.status}
          onChange={(newValues) => {
            updateValues({ status: newValues })
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
            updateValues({ delivery: newValues })
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
