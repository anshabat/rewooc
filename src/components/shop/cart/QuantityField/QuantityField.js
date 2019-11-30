import "./QuantityField.scss";
import React, {Component} from "react";

class QuantityField extends Component {
  state = {
    value: this.props.value
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.hasChanged) {
      this.setState({value: this.props.value});
    }
  }

  render() {
    const {
      className = "",
      onChange = () => {
      },
      value = "",
      hasChanged = false,
      ...restProps
    } = this.props;

    return (
      <div className="pc-form-field">
        <input
          className={`pc-form-field__control ${className}`.trim()}
          onChange={(e) => {
            this.setState({value: e.target.value});
            onChange(e);
          }}
          value={this.state.value}
          {...restProps}
        />
      </div>
    );
  }
}

export default QuantityField;