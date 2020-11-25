import React, { Component } from "react"
import RiskForm from "./RiskForm.js"
import Fab from "@material-ui/core/Fab"
import Grid from "@material-ui/core/Grid"
import AddIcon from "@material-ui/icons/Add"
import Box from "@material-ui/core/Box"
import Chip from '@material-ui/core/Chip';
import DeleteIcon from "@material-ui/icons/Delete"
import CachedIcon from '@material-ui/icons/Cached';
import { IconButton, Button } from "@material-ui/core"
import Tooltip from '@material-ui/core/Tooltip';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import { withStyles } from "@material-ui/core/styles";
import list_activities from '../constants/activities.js';
import FaceIcon from '@material-ui/icons/Face';

/*
***** TODO *****
Ajouter des boutons avec activités toutes faites, permettant de les ajouter en cliquant dessus.

***** END TODO *****
*/

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
});

class RiskCalculator extends Component {
  constructor(props){
    super(props);
    this.state = {activities: [], risks:{}, nextId:0, risk:0, toggleResult:false}
    this.defaultActivityArgs = {
      name:"Activité",
      wearMask: false,
      duration:60,
      nbPeople: 1,
      nbMasked: 0,
      outdoors: false,
      talking: "normal",
      distance: "normal",
      riskProfile: "normal",
      showForm:false,
    }
    this.refResult = React.createRef();
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
    result = Math.round(result * 100);
    this.setState({risk:result});
    this.setState({toggleResult:true})
  }

  toggleResult = () => {
    this.setState({toggleResult:true});
  }

  showResult = () => {
    this.refResult.current.scrollIntoView();
    return (
      <Box pt="1rem" justify="right" m="auto">
        Your total risk is {this.state.risk} %.
      </Box>
    )
  }

  addActivity = (args) => {
    const myId = [this.state.nextId]
    const widget = (
      <Grid item className="activity_list">
          <RiskForm id={myId} updateRisk={this.updateRisk} {...args}>
              <div className="delete_button">
              <Tooltip title="Supprimer">
              <IconButton aria-label="delete" size="small" onClick={() => this.clear(myId[0])}>
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

  // Premade activities are already filled.
  addPremadeActivity = (args) => {
    const myId = [this.state.nextId]
    const widget = (
      <Grid item className="activity_list">
          <RiskForm id={myId} showForm={true} updateRisk={this.updateRisk} {...args}>
              <div className="delete_button">
              <Tooltip title="Supprimer">
              <IconButton z-index={5000} aria-label="delete" size="small" onClick={() => this.clear(myId[0])}>
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
    this.addActivity(this.defaultActivityArgs);
  }

  clearAll = () => {
    this.setState({ nextId: 0, activities: [], risks:{}, risk:0, toggleResult:false })
  }

  clear = id => {
    var widgets = this.state.activities.slice();
    var myRisks = this.state.risks;
    widgets[id] = <div />
    myRisks[id] = 0;
    this.setState({ activities: widgets, risks:myRisks })
  }

  generatePremadeCards = () => {
    const { classes } = this.props;
    return (
      <div id="premade_cards" className={classes.root}>
          {list_activities.map((item, index) => {
            return (
                  <Chip icon={<FaceIcon />} label={item.name} clickable onClick={() => {this.addPremadeActivity(item)}} />
            )
          })}
      </div>
    )
  }

  render = () => {
    return (
      <div className="risk_calculator">
        <Grid container spacing={1} justify="center" alignitems="center">
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
          <Grid container spacing={0.5}   alignItems="center" justify="center">
            <Grid item>
              <Fab
                onClick={() => {this.getRisk(); this.toggleResult()}}
                variant="extended"
              >
                <TouchAppIcon />
                <Box p="0.5rem">Compute my risk</Box>
              </Fab>
            </Grid>
          </Grid>
        </Box>
        </div>
        <div id="premade_activities">
            {this.generatePremadeCards()}
        </div>

        <div id="calculator-result" ref={this.refResult}>
        {this.state.toggleResult && this.showResult()}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(RiskCalculator);
