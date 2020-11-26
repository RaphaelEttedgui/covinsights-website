import React, { Children, Component } from "react"
import Checkbox from '@material-ui/core/Checkbox';
import Box from "@material-ui/core/Box"
import { IconButton, Button } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import EditIcon from '@material-ui/icons/Edit'
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip';
import {InteractionCrowd, Activity, BasicUniverse, RiskProfile, WorkerRiskProfile, NonWorkerRiskProfile} from './MyMath.js';

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 80,
  },
    root: {
    display: 'flex',
    pt: "2rem",
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
});

const propsForForm = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  m: "auto",
  border: 0,
  style: { width: "17rem", height: "35rem" },
  boxShadow: 3,
  mx: "auto",
  px: "1rem",
  pt: "2rem",
}

const propsForDisplay = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  m: "auto",
  border: 0,
  style: { width: "16rem", height: "5rem" },
  boxShadow: 3,
  mx: "auto",
  px: "1rem",
  position:"relative",
  bottom:"2rem"
}

class PersonCard extends Component {
  state = {
    showForm: this.props.showForm,
    id: this.props.id,
    name: this.props.name,
    person:this.props.person,
    risk : 0,
    activityRisk : 0,
    universe: new BasicUniverse(),
  }

  render() {
    return (
      <div className="personCard_container">
          {this.state.showForm ? this.showForm() : this.showCreator()}
      </div>
    )
  }
}


export default withStyles(styles)(PersonCard);
