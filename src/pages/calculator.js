import React, {Component} from "react"
import RiskCalculator from "../components/Calculator/RiskCalculator.js"
import { Helmet } from 'react-helmet'

class Calculator extends Component {

  render =() => {
    return (
      <div className="calculator_container">
      <Helmet>
        <title>
          Calculateur de risque
        </title>
      </Helmet>        
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