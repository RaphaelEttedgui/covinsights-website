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
          Ce graphique présente quelques activités, classées par le risque qu'elle représentent lorsque pratiquées chaque semaine pendant un an.
          Cela permet de visualiser leur différence de risque.
          </div>
        </div>
      </div>
      <ComparisonRisks />
      </div>
  )
  }
}

export default Insights;