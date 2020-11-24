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
import {InteractionCrowd, BasicUniverse, RiskProfile, WorkerRiskProfile, NonWorkerRiskProfile} from './MyMath.js';

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 80,
  },
});

const propsForForm = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  m: "auto",
  border: 0,
  style: { width: "17rem", height: "30rem" },
  boxShadow: 3,
  mx: "auto",
  px: "1rem",
}

const propsForDisplay = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  m: "auto",
  border: 0,
  style: { width: "16rem", height: "3rem" },
  boxShadow: 3,
  mx: "auto",
  px: "1rem",
  position:"relative",
  bottom:"2rem"
}

class RiskForm extends Component {
  state = {
    id: this.props.id,
    name: this.props.name,
    duration: this.props.duration,
    showForm: this.props.showForm,
    wearMask: this.props.wearMask,
    nbPeople: this.props.nbPeople,
    nbMasked:this.props.nbMasked,
    outdoors: this.props.outdoors,
    talking: this.props.talking,
    distance: this.props.distance,
    riskProfile: this.props.riskProfile,
    risk : 0,
    activityRisk : 0,
    universe: new BasicUniverse(),
  }

  setActivityRisk = () => {
    var maskProportion = 0;
    if(this.state.nbPeople != 0)
    {
      maskProportion = this.state.nbMasked/this.state.nbPeople;
    }
    var interaction = new InteractionCrowd(this.state.name, this.state.duration, this.state.nbPeople, this.state.wearMask, maskProportion, this.state.talking, this.state.outdoors, this.state.distance);
    this.setState({activityRisk: Math.round((interaction.getActivityRisk() + Number.EPSILON) * 100) / 100});
    var profile = new RiskProfile();
    if(this.state.riskProfile === "worker")
    {
      profile = new WorkerRiskProfile();
    }
   if(this.state.riskProfile === "nonWorker")
    {
      profile = new NonWorkerRiskProfile();
    }

    this.setState({risk: Math.round((profile.getProfileRisk()*interaction.getActivityRisk() + Number.EPSILON) * 100) / 100});
  }

  getRisk = () => {
    this.setActivityRisk();
    return this.state.risk;
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.checked })
  }

  handleNameField = (e) => {
    this.setState({
      name: e.target.value
  });
  }

  handleNbPeople = (event) => {
    this.setState({nbPeople:Number(event.target.value)});
  };

  handleNbMasked = (event) => {
    this.setState({nbMasked:Number(event.target.value)});
  };

  handleTalking = (event) => {
    this.setState({talking:event.target.value});
  };

  handleDistance = (event) => {
    this.setState({distance:event.target.value});
  };

  handleRiskProfile = (event) => {
    this.setState({riskProfile:event.target.value});
  };

  generateNbPeople1 = (i) => {
    return (
    <option value={i}>{i}</option>
    );
  }

  generateNbPeople = () => {
    const numbers = [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return numbers.map((number) => this.generateNbPeople1(number));
  }

  showForm = () => {
    return (
      <div className="risk_form">
      <Tooltip title="Edit">
      <IconButton className="edit_button" aria-label="delete" onClick={() => this.setState({ showForm: false })}>
        <EditIcon />
      </IconButton>
      </Tooltip>
      <Box borderRadius={16} {...propsForDisplay}>
          {this.props.children}
          <div className="show_activity">
            {this.state.name}
            Risk : {this.state.risk}
          </div>
      </Box>
      </div>
    )
  }

  showCreator = () => {
    const { classes } = this.props;
    return (
      <div className="risk_form_creator">
      <Box borderRadius={16} {...propsForForm}>
          {this.props.children}
            <Grid container spacing={1}>
                  <Grid item>
                      <TextField id="outlined-basic" label="Activity Name" variant="outlined" onChange={this.handleNameField} />
                  </Grid>
                  <Grid item>
                  <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">Nb people</InputLabel>
                      <Select
                        native 
                        id="demo-simple-select"
                        value={this.state.nbPeople}
                        onChange={this.handleNbPeople}
                        label="Nb people"
                      >
                        {this.generateNbPeople()}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                  <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">Nb masked</InputLabel>
                      <Select
                        native 
                        id="demo-simple-select"
                        value={this.state.nbMasked}
                        onChange={this.handleNbMasked}
                        label="Nb people"
                      >
                        {this.generateNbPeople()}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                  <FormControlLabel
                      control={<Checkbox color="primary" checked={this.state.outdoors}
                        onChange={this.handleChange}
                        name="outdoors"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />} label="Is it outdoors ?" />
                  </Grid>
                  <Grid item>
                  <FormControlLabel
                      control={<Checkbox color="primary" checked={this.state.wearMask}
                        onChange={this.handleChange}
                        name="wearMask"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />} label="Are you wearing a mask ?" />
                  </Grid>
                  <Grid item>
                  <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">Talking</InputLabel>
                      <Select
                        native 
                        id="demo-simple-select"
                        value={this.state.talking}
                        onChange={this.handleTalking}
                        label="Nb people"
                      >
                        <option value="normal">Normal</option>
                        <option value="quiet">Quiet</option>
                        <option value="loud">Loud</option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                  <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">Distance</InputLabel>
                      <Select
                        native 
                        id="demo-simple-select"
                        value={this.state.distance}
                        onChange={this.handleDistance}
                        label="Nb people"
                      >
                        <option value="normal">Normal</option>
                        <option value="close">Close</option>
                        <option value="long">Long</option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                  <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">Risk profile</InputLabel>
                      <Select
                        native 
                        id="demo-simple-select"
                        value={this.state.riskProfile}
                        onChange={this.handleRiskProfile}
                      >
                        <option value="average">Average</option>
                        <option value="worker">Frontline worker</option>
                        <option value="nonWorker">Work from home</option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {this.setState({ showForm: true }); this.setActivityRisk()}}
                    >
                      {" "}
                      Submit
                    </Button>
                  </Grid>
            </Grid>
      </Box>
      </div>
    )
  }

  render() {
    return (
      <div>
          {this.state.showForm ? this.showForm() : this.showCreator()}
      </div>
    )
  }
}

RiskForm.defaultProps = {
  showForm: false,
  wearMask: false,
  nbPeople: 0,
  maskProportion: 0,
  outdoors: false,
  talking: "normal",
  distance: "normal",
}
export default withStyles(styles)(RiskForm);
