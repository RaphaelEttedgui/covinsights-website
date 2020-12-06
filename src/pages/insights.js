import React, {Component} from "react"
import ComparisonRisks from "../components/Insights/ComparisonRisks.js"
import { Helmet } from 'react-helmet'

class Insights extends Component {

  render =() => {
    return (
      <div className="calculator_container">
      <Helmet>
        <title>
          Covinsights
        </title>
      </Helmet>        
      <div className="calculator_presentation">
        <h2>
            Quelques activités, classées par risque sur 1 an :
        </h2>
        <div className="calculator_introduction">
          Le graphique ci-dessous représente le risque d'avoir le covid sur 1 an, en faisant uniquement ce type d'activité chaque semaine.
        </div>
      </div>
      <ComparisonRisks />
      </div>
  )
  }
}

export default Insights;