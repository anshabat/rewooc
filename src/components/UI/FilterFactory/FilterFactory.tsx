import { IFilterAttributes } from 'app-services/orders'
import React, { FC, ReactElement } from 'react'
import ChoiceList from '../Form/ChoiceList/ChoiceList'
import FormField from '../Form/FormField/FormField'
import { ISelectedAttributes } from '../../shop/account/OrdersFilter/OrdersFilter'

interface IFilterFactory<T> {
  attribute: IFilterAttributes<T>
  values: string[]
  onApply: (values: ISelectedAttributes) => void
  //onApply: (values: { [K in T]: string[] }) => void
}

function FilterFactory<T extends string>(props: IFilterFactory<T>): ReactElement {
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
