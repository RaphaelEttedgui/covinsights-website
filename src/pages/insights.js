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
            Quelques activités classiques, classées par risque :
        </h2>
      </div>
      <ComparisonRisks />
      </div>
  )
  }
}

export default Insights;