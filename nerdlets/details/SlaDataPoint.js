import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from 'nr1'

export default class SlaDataPoint extends React.Component {
  static propTypes = {
    value: PropTypes.any.isRequired,
    kpi: PropTypes.object.isRequired,
    stat: PropTypes.object.isRequired
  }

  processValue(value) {
    const { stat } = this.props;
    let workingVal = value;
    if (stat.type == "percentile") {
      const percentileKeys = Object.keys(value);
      workingVal = value[percentileKeys[0]].toFixed(2);
    }
    if (stat.type == "decimal") {
      workingVal = workingVal.toFixed(2);
    }
    switch (stat.value.display) {
      case "percentage":
        return `${workingVal}%`;
      case "seconds":
        return `${workingVal} s`;
      case "integer":
        return workingVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      default:
        return workingVal;
    }
  }

  render() {
    const { state, kpi, value } = this.props;
    return (
      <div className="slaContainer">
        <div className="slaComparisonContainer">
        <Icon type={Icon.TYPE.INTERFACE__SIGN__CHECKMARK__V_ALTERNATE} color="#10a600" className="slaComparisonIcon" />
          <div className="slaComparisonItem currentValueContainer">
            <h4 className="slaComparisonItemValue currentValue">{this.processValue(value)}</h4>
            <h6 className="slaComparisonItemLabel currentLabel">Current</h6>
          </div>
          <div className="slaComparisonItem slaValueContainer">
            <h4 className="slaComparisonItemValue slaValue">{this.processValue(kpi.value)}</h4>
            <h6 className="slaComparisonItemLabel slaLabel">Defined SLA</h6>
          </div>
        </div>

        <p className="slaDescription">{this.props.kpi.description}</p>
      </div>
    )
  }
}