import React from "react"
import RiskCalculator from "../components/Calculator/RiskCalculator.js"

export default ({ data }) => {
  return (
      <div>
      <div className="calculator_presentation">
        <h2>
          Bienvenue dans le calculateur de risque !
        </h2>
      </div>
      <RiskCalculator />
      </div>
  )
}