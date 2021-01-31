import React, { Component } from 'react'
import FormField from '../../../UI/Form/FormField/FormField'

class QuantityField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
    }
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props
    if (prevProps.hasChanged) {
      this.setState({ value })
    }
  }

  render() {
    // TODO eslint this
    // eslint-disable-next-line no-unused-vars
    const { onChange, value, hasChanged, ...restProps } = this.props

    return (
      <FormField
        type="number"
        onChange={(e) => {
          this.setState({ value: e.target.value })
        }}
        value={this.state.value}
        {...restProps}
      />
    )
  }
}

export default QuantityField
