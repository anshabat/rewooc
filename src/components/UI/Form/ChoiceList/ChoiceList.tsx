import './ChoiceList.scss'
import React, { FC, useEffect, useState } from 'react'
import ChoiceField from '../ChoiceField/ChoiceField'

interface ChoiceListProps {
  options: { label: string; value: string }[]
  onChange?: (options: string[]) => void
  defaultOptions?: string[]
}

const ChoiceList: FC<ChoiceListProps> = (props) => {
  const { options, onChange, defaultOptions } = props
  const [checkedOptions, setCheckedOptions] = useState<Set<string>>(
    new Set(defaultOptions)
  )

  const checkField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSet = new Set(checkedOptions)
    if (e.target.checked) {
      newSet.add(e.target.name)
    } else {
      newSet.delete(e.target.name)
    }
    setCheckedOptions(newSet)
  }

  useEffect(() => {
    if (
      typeof onChange === 'function' &&
      defaultOptions?.length !== checkedOptions.size
    ) {
      onChange(Array.from(checkedOptions))
    }
  }, [checkedOptions])

  return (
    <div className="rw-choice-list">
      {options.map((option) => (
        <ChoiceField
          type="checkbox"
          label={option.label}
          name={option.value}
          key={option.value}
          onChange={checkField}
          defaultChecked={defaultOptions?.includes(option.value)}
        />
      ))}
    </div>
  )
}

export default ChoiceList
