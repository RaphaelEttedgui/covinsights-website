import React, { Component } from "react"
import RiskForm from "./RiskForm.js"
import Fab from "@material-ui/core/Fab"
import Grid from "@material-ui/core/Grid"
import AddIcon from "@material-ui/icons/Add"
import Box from "@material-ui/core/Box"
import ClearIcon from "@material-ui/icons/Clear"
import DeleteIcon from "@material-ui/icons/Delete"
import { IconButton, Button } from "@material-ui/core"

/*
***** TODO *****
Ajouter des boutons avec activités toutes faites, permettant de les ajouter en cliquant dessus.

***** END TODO *****
*/

const defaultBoxProps = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  m: "auto",
  border: 0,
  style: { width: "20rem", height: "10rem" },
  boxShadow: 3,
  mx: "auto",
  p: "1rem",
}

class RiskCalculator extends Component {
  constructor(props){
    super(props);
    this.state = {activities: [], nextId:0,}
    this.defaultActivityArgs = {
      wearMask: true,
      nbPeople: 0,
      maskProportion: 0,
      outdoors: false,
      talking: "normal",
      distance: "normal",
    }
  }

  addActivity = (args = this.defaultActivityArgs) => {
    console.log("bonjour");
    const myId = [this.state.nextId]
    const widget = (
      <Grid item xs={12}>
        <Box borderRadius={16} {...defaultBoxProps}>
          <div>
            <IconButton aria-label="delete" onClick={() => this.clear(myId[0])}>
              <DeleteIcon />
            </IconButton>
          </div>
          <RiskForm id={myId} {...args} />
        </Box>
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
      <div>
        <Grid container spacing={2}>
          {this.state.activities}
        </Grid>
        <Box px="2rem" pt="1rem" justify="center" m="auto">
          <Grid container spacing={1}>
            <Grid item>
              <Fab
                onClick={this.addActivity}
                color="primary"
                variant="extended"
              >
                <AddIcon />
                <Box p="0.5rem">Add activity</Box>
              </Fab>
            </Grid>
            <Grid item>
              <Fab onClick={this.clearAll} color="secondary" variant="extended">
                <ClearIcon />
                <Box p="0.5rem">Reset</Box>
              </Fab>
            </Grid>
          </Grid>
        </Box>
      </div>
    )
  }
}

export default RiskCalculator
