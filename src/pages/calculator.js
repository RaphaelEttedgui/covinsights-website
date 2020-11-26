import React, {Component} from "react"
import RiskCalculator from "../components/Calculator/RiskCalculator.js"

class Calculator extends Component {

  render =() => {
    return (
      <div className="calculator_container">
      <div className="calculator_presentation">
        <h2>
          Bienvenue dans le calculateur de risque !
        </h2>
      </div>
      <RiskCalculator globalRisk={this.props.globalRisk} changeGlobalRisk={this.props.changeGlobalRisk} />
      </div>
  )
  }
}

export default Calculator;