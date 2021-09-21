import './ChoiceList.scss'
import React, { FC, useState } from 'react'
import ChoiceField from '../ChoiceField/ChoiceField'

interface ChoiceListProps {
  options: { label: string; value: string }[]
}

const ChoiceList: FC<ChoiceListProps> = (props) => {
  const { options } = props
  const [checked, setChecked] = useState<string[]>([])
  const checkField = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setChecked((prev) => [...prev, e.target.name])
    } else {
      setChecked((prev) => prev.filter((p) => p !== e.target.name))
    }
    //console.log(e.target.checked, e.target.name)
  }
  console.log(checked)
  return (
    <div className="rw-choice-list">
      {options.map((option) => (
        <ChoiceField
          type="checkbox"
          label={option.label}
          name={option.value}
          key={option.value}
          onChange={checkField}
        />
      ))}
    </div>
  )
}

export default ChoiceList
