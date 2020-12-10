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
          Numbers are expressed in permil (estimated number of transmissions if the activity is done 1000 times).
          <br/> The scale of the x-axis is logarithmic.
          </div>
        </div>
      </div>
      <ComparisonRisksEng />
      </div>
  )
  }
}

export default Insights;