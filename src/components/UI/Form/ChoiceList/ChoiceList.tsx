import './ChoiceList.scss'
import React, { FC } from 'react'
import ChoiceField from '../ChoiceField/ChoiceField'

interface ChoiceListProps {
  options: { label: string; value: string }[]
}

const ChoiceList: FC<ChoiceListProps> = (props) => {
  const { options } = props
  return (
    <div className="rw-choice-list">
      {options.map((option) => (
        <ChoiceField
          type="checkbox"
          label={option.label}
          name={option.value}
          key={option.value}
        />
      ))}
    </div>
  )
}

export default ChoiceList
