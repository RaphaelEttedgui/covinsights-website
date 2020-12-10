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
            <li> Entrez vos activités et estimez votre prise de risque;</li>
            <li> Visualisez comment l'épidémie évoluerait si tout le monde faisait la même chose;</li>
            <li> Evaluez la dangerosité d'un rassemblement familial avec le simulateur, en important votre risque.</li>
          </ul>
          Les chiffres sont pris en moyenne sur la France, et peuvent être différents de votre situation locale.
          Les détails du calcul sont disponibles dans la section "A propos".
          </div>
        </div>
      </div>
      <RiskCalculator globalRisk={this.props.globalRisk} changeGlobalRisk={this.props.changeGlobalRisk} />
      </div>
  )
  }
}

export default Calculator;