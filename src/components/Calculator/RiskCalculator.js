import React, { Component } from "react"
import RiskForm from "./RiskForm.js"
import Fab from "@material-ui/core/Fab"
import Grid from "@material-ui/core/Grid"
import AddIcon from "@material-ui/icons/Add"
import Box from "@material-ui/core/Box"
import ClearIcon from "@material-ui/icons/Clear"
import DeleteIcon from "@material-ui/icons/Delete"
import CachedIcon from '@material-ui/icons/Cached';
import { IconButton, Button } from "@material-ui/core"
import Tooltip from '@material-ui/core/Tooltip';
import TouchAppIcon from '@material-ui/icons/TouchApp';

/*
***** TODO *****
Ajouter des boutons avec activités toutes faites, permettant de les ajouter en cliquant dessus.

***** END TODO *****
*/

class RiskCalculator extends Component {
  constructor(props){
    super(props);
    this.state = {activities: [], risks:{}, nextId:0, risk:0}
    this.defaultActivityArgs = {
      name:"Activity Name",
      wearMask: true,
      duration:60,
      nbPeople: 0,
      nbMasked: 0,
      outdoors: false,
      talking: "normal",
      distance: "normal",
      riskProfile: 0,
    }
  }

  updateRisk = (id, risk) => {
    var tab = this.state.risks;
    tab[id] = risk;
    this.setState({risks: tab});
  }

  getRisk = () => {
    var result = 0;
    for (var key in this.state.risks)
    {
      result = result + (1-result)* this.state.risks[key];
    }
    //this.setState({risk:result});
    console.log(result);
  }

  addActivity = (args) => {
    const myId = [this.state.nextId]
    const widget = (
      <Grid item className="activity_list">
          <RiskForm id={myId} updateRisk={this.updateRisk} {...args}>
              <div className="delete_button">
              <Tooltip title="Delete">
              <IconButton aria-label="delete" onClick={() => this.clear(myId[0])}>
              <DeleteIcon />
              </IconButton>
              </Tooltip>
              </div>
          </RiskForm>
      </Grid>
    )
    this.setState({ nextId: this.state.nextId + 1 })
    var widgets = this.state.activities.slice()
    widgets.push(widget)
    this.setState({ activities: widgets })
  }

  componentDidMount = () => {
    this.addActivity();
  }

  clearAll = () => {
    this.setState({ nextId: 0, activities: [] })
  }

  clear = id => {
    var widgets = this.state.activities.slice()
    widgets[id] = <div />
    this.setState({ activities: widgets })
  }

  render = () => {
    return (
      <div className="risk_calculator">
        <Grid container spacing={2} justify="center" alignitems="center">
          {this.state.activities}
        </Grid>
        <div className="addActivity_buttons">
        <Box pt="1rem" justify="right" m="auto">
          <Grid container spacing={1}   alignItems="center" justify="center">
            <Grid item>
              <Fab
                onClick={() => {this.addActivity(this.defaultActivityArgs)}}
                color="primary"
                variant="extended"
              >
                <AddIcon />
                <Box p="0.5rem">Add activity</Box>
              </Fab>
            </Grid>
            <Grid item>
              <Fab onClick={this.clearAll} color="secondary" variant="extended">
                <CachedIcon />
                <Box p="0.5rem">Reset</Box>
              </Fab>
            </Grid>
          </Grid>
        </Box>
        </div>
        <div className="addActivity_buttons">
        <Box pt="1rem" justify="right" m="auto">
          <Grid container spacing={1}   alignItems="center" justify="center">
            <Grid item>
              <Fab
                onClick={() => {this.getRisk()}}
                variant="extended"
              >
                <TouchAppIcon />
                <Box p="0.5rem">Compute my risk</Box>
              </Fab>
            </Grid>
          </Grid>
        </Box>
        </div>
      </div>
    )
  }
}

export default RiskCalculator
