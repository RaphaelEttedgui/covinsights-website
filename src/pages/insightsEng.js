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
        <div className="calculator_introduction">
        <span style={{fontWeight:"bold", fontSize:'1.4em'}}>Activities sorted by risk</span>
          <br/>
          <div style={{marginTop:"1rem", textAlign:"left"}} >
          This graph represents the risk related to several activities, practiced every week for a year.
          This helps visualizing their relative danger.
          </div>
        </div>
      </div>
      <ComparisonRisksEng />
      </div>
  )
  }
}

export default Insights;