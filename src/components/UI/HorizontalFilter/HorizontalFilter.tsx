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
import { TOrderFilterAttribute, TOrderFilterValues } from 'src/api/order/ordersFilterApi'

interface TProps {
  attributes: TOrderFilterAttribute[]
  values: TOrderFilterValues
  onClear?: (e: MouseEvent<HTMLButtonElement>) => void
  onFilter: (values: any) => void
}

const HorizontalFilter: FC<TProps> = (props) => {
  const { attributes, values, onFilter, onClear } = props
  const [openedAttribute, setOpenedAttribute] = useState<number | null>(null)

  const listItemRefs: React.MutableRefObject<any>[] = []
  attributes.forEach((attr, index) => {
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
    attr: TOrderFilterAttribute,
    value: any
  ): ReactElement {
    switch (attr.type) {
      case 'choice':
        return (
          <ChoiceList
            options={attr.options}
            defaultOptions={value}
            onChange={(newValues) => {
              onFilter({ [attr.key]: newValues })
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
          const value = values[attribute.key as keyof TOrderFilterValues]
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
                  {renderAttributeComponent(attribute, value)}
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
