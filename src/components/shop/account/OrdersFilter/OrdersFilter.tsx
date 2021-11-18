import React, { ReactElement, useEffect } from 'react'
import HorizontalFilter from '../../../UI/HorizontalFilter/HorizontalFilter'
import ChoiceList from '../../../UI/Form/ChoiceList/ChoiceList'
import { IFilterComponent } from 'app-services/orders'
import { useOrdersFilter } from '../../../../hooks/useOrdersFilter'
import { IOrder } from 'app-types'
import { IOrderValues } from 'app-services/orders/types'

interface IProps {
  initialOrders: IOrder[]
  //todo remove any
  onFilter: (values: any) => void
  values: IOrderValues
}

function OrdersFilter(props: IProps): ReactElement {
  const { initialOrders, onFilter, values } = props

  //TODO remove changing orders state inside useOrdersFilter. It has just change attribute params and call callback like useSorting
  const { attributes, clearFilter } = useOrdersFilter(initialOrders, values)

  /*useEffect(() => {
    onFilter(values)
  }, [values])*/

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
        onClear={clearFilter}
      />
    </div>
  )
}

export default OrdersFilter
