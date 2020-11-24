import React from "react"
import RiskCalculator from "../components/Calculator/RiskCalculator.js"

export default ({ data }) => {
  return (
      <div>
      <div className="calculator_presentation">
        <h2>
          Welcome to the risk calculator
        </h2>
      </div>
      <RiskCalculator />
      </div>
  )
}