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
          Welcome to the risk calculator
        </h2>
        <div className="calculator_introduction">
         <span style={{fontWeight:"bold"}}>Are you contributing to better, or worsen the situation ?</span>
          <br/>
          <div style={{marginTop:"1rem"}}>
          Enter the activities you did this week, to compute your risk and how the epidemic would evolve if everyone did the
         exact same things as you !
          </div>
        </div>
      </div>
      <RiskCalculatorEng globalRisk={this.props.globalRisk} changeGlobalRisk={this.props.changeGlobalRisk} />
      </div>
  )
  }
}

export default CalculatorEng;