import React, { Component } from 'react'
import FormField from '../../../UI/Form/FormField/FormField'

class QuantityField extends Component {
  state = {
    value: this.props.value,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.hasChanged) {
      this.setState({ value: this.props.value })
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
