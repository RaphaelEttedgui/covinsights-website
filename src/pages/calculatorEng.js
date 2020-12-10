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
        <div className="calculator_introduction">
        <span style={{fontWeight:"bold", fontSize:'1.4em'}}>Risk Calculator</span>
          <br/>
          <div style={{marginTop:"1rem", textAlign:"left"}} >
          <ul style={{listStylePosition: 'inside', margin:'15px'}}>
            <li> Enter your activities and estimate your risk;</li>
            <li> See how the epidemic would evolve if everyone did the same as you;</li>
            <li> Evaluate how dangerous your family gathering would be, using the simulator.</li>
          </ul>
          Numbers used are average across France, and may not correspond to your local situation.
          <br/>
          The details of the computation are in the "About" section.
          </div>
        </div>
      </div>
      <RiskCalculatorEng globalRisk={this.props.globalRisk} changeGlobalRisk={this.props.changeGlobalRisk} />
      </div>
  )
  }
}

export default CalculatorEng;