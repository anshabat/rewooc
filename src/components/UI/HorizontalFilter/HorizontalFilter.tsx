import './HorizontalFilter.scss'
import React, {
  FC,
  MouseEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react'
import Icon from '../Icon/Icon'
import classNames from 'classnames'
import ChoiceList from '../Form/ChoiceList/ChoiceList'
import {
  getAttributeValue,
  TOrderFilterAttribute,
} from '../../../api/order/ordersFilterApi'
import InputButton from '../Form/InputButton/InputButton'
import { TFilterValues } from 'app-services/filter'
import RangeSlider from '../Form/RangeSlider/RangeSlider'

interface TProps {
  attributes: TOrderFilterAttribute[]
  onClear?: (e: MouseEvent<HTMLButtonElement>) => void
  onFilter: (values: TFilterValues<string>) => void
}

const HorizontalFilter: FC<TProps> = (props) => {
  const { attributes, onFilter, onClear } = props
  const [openedAttribute, setOpenedAttribute] = useState<number | null>(null)

  const listItemRefs: React.MutableRefObject<any>[] = []
  attributes.forEach((_, index) => {
    listItemRefs[index] = useRef<any>()
  })

  const isFilterApplied = attributes.some((attribute) => attribute.isApplied)

  const clickOutsideFilterHandler = (e: any) => {
    const clickedInside = listItemRefs.some((i) =>
      i.current?.contains(e.target)
    )
    if (!clickedInside) {
      setOpenedAttribute(null)
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', clickOutsideFilterHandler)
    return () => {
      document.body.removeEventListener('click', clickOutsideFilterHandler)
    }
  }, [])

  const toggleAttributeVisibility = (index: number): void => {
    setOpenedAttribute((currentIndex) =>
      currentIndex === index ? null : index
    )
  }

  const renderAttributeComponent = function (
    attr: TOrderFilterAttribute
  ): ReactElement {
    const { type, key } = attr
    const value = getAttributeValue(attr)
    switch (type) {
      case 'choice':
        return (
          <ChoiceList
            options={attr.options}
            values={value}
            onChange={(newValues) => {
              onFilter({ [key]: newValues })
            }}
          />
        )
      case 'text':
        return (
          <InputButton
            label="Filter by id"
            hideLabel
            value={value}
            onApply={(value) => {
              onFilter({ [key]: [value] })
            }}
          />
        )
      case 'range':
        return (
          <RangeSlider
            min={value[0]}
            max={value[1]}
            onApply={({ min, max }) => {
              onFilter({ [key]: [min, max] })
            }}
          />
        )
      default:
        return <div>no component found</div>
    }
  }

  return (
    <nav className="rw-horizontal-filter">
      <ul className="rw-horizontal-filter__list">
        {attributes.map((attribute, index) => {
          const attributeClasses = classNames(
            'rw-horizontal-filter__attribute',
            {
              'rw-horizontal-filter__attribute--active': attribute.isApplied,
            }
          )
          return (
            <li
              ref={listItemRefs[index]}
              className={attributeClasses}
              key={attribute.label}
            >
              <button
                className="rw-horizontal-filter__label"
                onClick={() => {
                  toggleAttributeVisibility(index)
                }}
              >
                {attribute.label}
                <Icon name="fa-angle-down" />
              </button>
              {index === openedAttribute ? (
                <div className="rw-horizontal-filter__dropdown">
                  {renderAttributeComponent(attribute)}
                </div>
              ) : null}
            </li>
          )
        })}
      </ul>
      {isFilterApplied ? (
        <button className="rw-horizontal-filter__clear" onClick={onClear}>
          Clear
        </button>
      ) : null}
    </nav>
  )
}

export default HorizontalFilter
