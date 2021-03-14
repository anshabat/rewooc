import React, {
  ChangeEvent,
  Component,
  InputHTMLAttributes,
  ReactNode,
} from 'react'
import FormField from '../../../UI/Form/FormField/FormField'
import { trimObject } from '../../../../shared/utilities'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  value: number
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
  hasChanged: boolean
}

interface IState {
  value: number
}

class QuantityField extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      value: props.value,
    }
  }

  componentDidUpdate(prevProps: IProps): void {
    const { value } = this.props
    if (prevProps.hasChanged) {
      this.setState({ value })
    }
  }

  render(): ReactNode {
    const props = trimObject<IProps>(this.props, [
      'onChange',
      'value',
      'hasChanged',
    ])

    return (
      <FormField
        type="number"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          this.setState({ value: Number(e.target.value) })
        }}
        value={this.state.value}
        {...props}
      />
    )
  }
}

export default QuantityField
