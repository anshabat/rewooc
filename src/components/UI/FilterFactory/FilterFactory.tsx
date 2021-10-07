import { IFilterAttributes } from 'app-services/orders'
import React, { FC } from 'react'
import ChoiceList from '../Form/ChoiceList/ChoiceList'
import FormField from '../Form/FormField/FormField'
import { ISelectedAttributes } from '../../shop/account/OrdersFilter/OrdersFilter'

interface IFilterFactory {
  attribute: IFilterAttributes<'status' | 'delivery'>
  values: string[]
  onApply: (values: ISelectedAttributes) => void
}

const FilterFactory: FC<IFilterFactory> = (props) => {
  const { attribute, values, onApply } = props
  switch (attribute.type) {
    case 'multichoice':
      return (
        <ChoiceList
          options={attribute.values}
          defaultOptions={values}
          onChange={(newValues) => {
            onApply({ [attribute.key]: newValues })
          }}
        />
      )
    case 'range':
      return <FormField label={attribute.label} />
  }
}

export default FilterFactory
