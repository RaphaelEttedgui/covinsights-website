import React, {Component} from "react"
import RiskCalculatorEng from "../components/Calculator/RiskCalculatorEng.js"
import { Helmet } from 'react-helmet'

class CalculatorEng extends Component {

  render =() => {
    return (
      <div className="calculator_container">
      <Helmet>
        <title>
          Risk calculator
        </title>
      </Helmet>        
      <div className="calculator_presentation">
        <h2>
          Welcome to the risk calculator !
        </h2>
      </div>
      <RiskCalculatorEng globalRisk={this.props.globalRisk} changeGlobalRisk={this.props.changeGlobalRisk} />
      </div>
  )
  }
}

export default CalculatorEng;