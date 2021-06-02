import React, {Component, lazy, Suspense} from "react"
import { Helmet } from 'react-helmet'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

const load = (Component) => (props) => {
  return (
  <Suspense fallback={<CircularProgress />}>
    <Component {...props}/>
  </Suspense>
  )
}

const ComparisonRisks = load(lazy( () =>  import('../components/Insights/ComparisonRisks.js')));
const ScenarioChristmas = load(lazy( () =>  import('../components/Insights/ScenarioChristmas.js')));
const ProfileExamples = load(lazy( () =>  import('../components/Insights/ProfileExamples.js')));

class Insights extends Component {

  constructor(props){
    super(props);
    this.state={current:"scenario", page: ()=><ScenarioChristmas/>}
  }

  handleChange = (event) => {
    this.setState({current:event.target.value});
    if(event.target.value=="graph"){
      this.setState({page:()=><ComparisonRisks/>});
    }
    if(event.target.value=="scenario"){
      this.setState({page:()=><ScenarioChristmas/>})
    }
    if(event.target.value=="profiles"){
      this.setState({page:()=><ProfileExamples/>})
    }

  }

  render =() => {
    return (
      <div className="calculator_container">
      <Helmet>
        <title>
          Visualization
        </title>
      </Helmet>        
      <div className="calculator_presentation">
      <Select
          value={this.state.current}
          onChange={this.handleChange}
        >
          <MenuItem value="graph">
          Activities sorted by risk
          </MenuItem>
          <MenuItem value="scenario">Family gatherings</MenuItem>
          <MenuItem value="profiles">Profile examples</MenuItem>
        </Select>
      </div>
      {this.state.page()}
      </div>
  )
  }
}

export default Insights;