import React, { FC, FormEvent, useState } from 'react'
import Button from '../../Button/Button'
import Input from '../Input/Input'
import './RangeSlider.scss'

interface TProps {
  min?: string
  max?: string
  onApply: (value: {min: string, max: string}) => void
}

const RangeSlider: FC<TProps> = (props) => {
  const {onApply, min = '', max = ''} = props
  const [minValue, setMinValue] = useState(min)
  const [maxValue, setMaxValue] = useState(max)

  const handleSubmit = (e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    const min = (target.min.value || '') as string
    const max = (target.max.value || '') as string
    onApply({min, max})
  }

  return (
    <form className="rw-range-slider" onSubmit={handleSubmit}>
      <div className="rw-range-slider__fields">
        <Input
          label="Min"
          hideLabel={true}
          name="min"
          value={minValue}
          onChange={(e) => setMinValue(e.target.value)}
        />
        <Input
          label="Max"
          hideLabel={true}
          name="max"
          value={maxValue}
          onChange={(e) => setMaxValue(e.target.value)}
        />
        <Button size="md" color="secondary">
          OK
        </Button>
      </div>
      <div className="rw-range-slider__slider">slider</div>
    </form>
  )
}

export default RangeSlider
