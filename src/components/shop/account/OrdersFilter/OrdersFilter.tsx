import React, { ReactElement } from 'react'
import HorizontalFilter from '../../../UI/HorizontalFilter/HorizontalFilter'
import ChoiceList from '../../../UI/Form/ChoiceList/ChoiceList'
import { IFilter } from 'app-services/filter'
import { IOrder } from 'app-types'
import {IOrderAttributes, TOrdersFilterAttributes} from '../OrdersList/OrdersList'

//TODO remove any
interface IProps {
  attributes: IOrderAttributes
  orders: IOrder[]
  values: TOrdersFilterAttributes
  onFilter: (values: any) => void
  onClear: () => void
}

function OrdersFilter(props: IProps): ReactElement {
  const { attributes, values, onFilter, onClear } = props

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
