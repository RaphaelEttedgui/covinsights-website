import React from "react"
import RiskCalculator from "./pages/RiskCalculator.js"
import Layout from './components/Layout.js'

export default ({ data }) => {
  return (
      <Layout>
        <RiskCalculator />
      </Layout>
  )
}