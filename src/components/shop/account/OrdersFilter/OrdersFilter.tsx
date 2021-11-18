import React, { ReactElement, useEffect } from 'react'
import HorizontalFilter from '../../../UI/HorizontalFilter/HorizontalFilter'
import ChoiceList from '../../../UI/Form/ChoiceList/ChoiceList'
import { IFilterComponent } from 'app-services/orders'
import { useOrdersFilter } from '../../../../hooks/useOrdersFilter'
import { IOrder } from 'app-types'
import { IOrderValues } from 'app-services/orders/types'

//TODO remove any
interface IProps {
  initialOrders: IOrder[]
  values: IOrderValues
  onFilter: (values: any) => void
  onClear: () => void
}

function OrdersFilter(props: IProps): ReactElement {
  const { initialOrders, values, onFilter, onClear } = props
  //TODO maybe more attributes to State, and calculate quantity there
  const attributes = useOrdersFilter(initialOrders, values)

  const attributeComponents: IFilterComponent[] = [
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
