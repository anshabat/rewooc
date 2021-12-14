import React, { ReactElement } from 'react'
import HorizontalFilter from '../../../UI/HorizontalFilter/HorizontalFilter'
import ChoiceList from '../../../UI/Form/ChoiceList/ChoiceList'
import { IFilter } from 'app-services/orders'
import { useOrdersFilter } from '../../../../hooks/useOrdersFilter'
import { IOrder } from 'app-types'
import { IOrderValues } from 'app-services/orders/types'
import {TOrdersFilterAttributes} from '../OrdersList/OrdersList'

//TODO remove any
interface IProps {
  orders: IOrder[]
  values: IOrderValues
  onFilter: (values: any) => void
  onClear: () => void
}

function OrdersFilter(props: IProps): ReactElement {
  const { orders, values, onFilter, onClear } = props
  //TODO maybe more attributes to State, and calculate quantity there
  const attributes = useOrdersFilter(orders, values)

  const attributeComponents: IFilter<keyof TOrdersFilterAttributes>[] = [
    {
      key: 'status',
      label: 'Status',
      valuesComponent: (
        <ChoiceList
          options={attributes.status}
          defaultOptions={values.status}
          onChange={(newValues) => {
            onFilter({ status: newValues })
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
            onFilter({ delivery: newValues })
          }}
        />
      ),
      isApplied: Boolean(values.delivery.length),
    },
  ]

  return (
    <div className="rw-order-filter">
      <HorizontalFilter
        attributes={attributeComponents}
        onClear={onClear}
      />
    </div>
  )
}

export default OrdersFilter
