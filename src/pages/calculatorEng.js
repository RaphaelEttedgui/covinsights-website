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
        <div className="calculator_introduction">
          Enter your weekly activities by clicking on "New activity" or on one of the pre-made cards.
          <br/>
          You can then compute your probability of being contaminated this week, as well as the evolution of the epidemic
          if everyone was doing the same activities. Are you contributing to better, or worsen the situation ?
        </div>
      </div>
      <RiskCalculatorEng globalRisk={this.props.globalRisk} changeGlobalRisk={this.props.changeGlobalRisk} />
      </div>
  )
  }
}

export default CalculatorEng;