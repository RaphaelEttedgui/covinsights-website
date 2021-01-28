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
        <div className="calculator_introduction">
        <span style={{fontWeight:"bold", fontSize:'1.4em'}}>Calculateur de risque</span>
          <br/>
          <div style={{marginTop:"1rem", textAlign:"left"}} >
          <ul style={{listStylePosition: 'inside', margin:'15px'}}>
            <li> Cliquez sur des exemples d'activités et modifiez-les, ou créez les vôtres;</li>
            <li> Entrez le nombre de personnes, et le nombre d'entre elles portant un masque;</li>
            <li> Calculez une estimation de leur risque.</li>
          </ul>
          </div>
        </div>
      </div>
      <RiskCalculator globalRisk={this.props.globalRisk} changeGlobalRisk={this.props.changeGlobalRisk} />
      </div>
  )
  }
}

export default Calculator;