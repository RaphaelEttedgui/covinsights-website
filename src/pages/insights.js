import React, {Component} from "react"
import ComparisonRisks from "../components/Insights/ComparisonRisks.js"
import { Helmet } from 'react-helmet'

class Insights extends Component {

  render =() => {
    return (
      <div className="calculator_container">
      <Helmet>
        <title>
          Visualisation
        </title>
      </Helmet>        
      <div className="calculator_presentation">
        <div className="calculator_introduction">
        <span style={{fontWeight:"bold", fontSize:'1.4em'}}>Activités classées par risque</span>
          <br/>
          <div style={{marginTop:"1rem", textAlign:"left"}} >
          Chiffres exprimés en pour mille (estimation du nombre de transmissions si l'activité est effectuée mille fois).
          <br/>
          L'échelle de l'axe horizontal est logarithmique.
          </div>
        </div>
      </div>
      <ComparisonRisks />
      </div>
  )
  }
}

export default Insights;