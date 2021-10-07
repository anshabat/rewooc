import { FilterAttributeValue, IFilterAttributes } from 'app-services/orders'
import React, { FC, ReactElement } from 'react'
import ChoiceList from '../Form/ChoiceList/ChoiceList'
import FormField from '../Form/FormField/FormField'

interface IFilterFactory {
  attribute: FilterAttributeValue
  values: string[]
  onApply: (values: string[]) => void
}

function FilterFactory(props: IFilterFactory): ReactElement {
  const { attribute, values, onApply } = props
  switch (attribute.type) {
    case 'multichoice':
      return (
        <ChoiceList
          options={attribute.values}
          defaultOptions={values}
          onChange={(newValues) => {
            onApply(newValues)
          }}
        />
      )
    case 'range':
      return <FormField label={attribute.label} />
  }
}

export default FilterFactory
