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
            <li> Enter your activities or customize pre-made ones;</li>
            <li> Compute their average risk.</li>
          </ul>
          </div>
        </div>
      </div>
      <RiskCalculatorEng globalRisk={this.props.globalRisk} changeGlobalRisk={this.props.changeGlobalRisk} />
      </div>
  )
  }
}

export default CalculatorEng;