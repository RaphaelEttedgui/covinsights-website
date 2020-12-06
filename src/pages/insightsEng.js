import React, {Component} from "react"
import ComparisonRisksEng from "../components/Insights/ComparisonRisksEng.js"
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
            A few classical activities, ordered by risk over a year:
        </h2>
        <div className="calculator_introduction">
          This chart represents the risk of contamination after one year, when doing only this one activity, every week.
        </div>
      </div>
      <ComparisonRisksEng />
      </div>
  )
  }
}

export default Insights;