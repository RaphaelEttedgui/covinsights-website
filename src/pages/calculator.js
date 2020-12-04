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
        <div className="calculator_introduction">
          Entrez vos activités de la semaine en cliquant sur "nouvelle activité" où sur l'une des activités pré-rentrées.
          <br/>
          Vous pouvez ensuite calculer votre probabilité d'être contaminé cette semaine, et l'évolution de l'épidémie si tout le monde
          fait les mêmes activités. Contribuez-vous à améliorer, ou empirer la situation ?
        </div>
      </div>
      <RiskCalculator globalRisk={this.props.globalRisk} changeGlobalRisk={this.props.changeGlobalRisk} />
      </div>
  )
  }
}

export default Calculator;