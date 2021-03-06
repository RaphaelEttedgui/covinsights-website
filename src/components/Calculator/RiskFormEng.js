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
import {CustomActivity, BasicUniverse, RiskProfile, WorkerRiskProfile, NonWorkerRiskProfile} from './NewMath.js';

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 80,
  },
    root: {
    display: 'flex',
    pt: "3rem",
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

class RiskFormEng extends Component {
  state = {
    showForm: this.props.showForm,
    id: this.props.id,
    name: this.props.name,
    duration: this.props.duration,
    wearMask: this.props.wearMask,
    nbPeople: this.props.nbPeople,
    nbMasked:this.props.nbMasked,
    location:this.props.location,
    talking: this.props.talking,
    distance: this.props.distance,
    riskProfile: this.props.riskProfile,
    heures:Math.floor(this.props.duration/60),
    minutes:this.props.duration % 60,
    activity:{},
    universe: new BasicUniverse(),
  }

  setActivityRisk = () => {
    // setting the duration.
    var newDuration = 60*this.state.heures + this.state.minutes;
    this.setState({duration:newDuration})
    var maskProportion = 0;
    if(this.state.nbMasked === 0)
    {
      maskProportion = 0;
    }
    else{
      maskProportion = this.state.nbPeople / this.state.nbMasked;
    }
    var profile = new RiskProfile();
    // Note that the cap at 50% is before applying the profile.
    // The risk profile represents a variation in the prevalence, not the
    // activity itself.
    if(this.state.riskProfile === "worker")
    {
      profile = new WorkerRiskProfile();
    }
   if(this.state.riskProfile === "nonWorker")
    {
      profile = new NonWorkerRiskProfile();
    }
    var myActivity = new CustomActivity(this.state.name, newDuration, this.state.nbPeople,
        this.state.wearMask, maskProportion, this.state.talking, this.state.location, this.state.distance, profile);
    this.setState({activity:myActivity});
    this.props.updateRisk(this.props.id[0], myActivity);
  }

  componentDidMount = () => {
    this.setActivityRisk();
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

  handleHours = (event) => {
    this.setState({heures:Number(event.target.value)})
  }

  handleMinutes = (event) => {
    this.setState({minutes:Number(event.target.value)});
  }

  handleTalking = (event) => {
    this.setState({talking:event.target.value});
  };

  handleDistance = (event) => {
    this.setState({distance:event.target.value});
  };

  handleRiskProfile = (event) => {
    this.setState({riskProfile:event.target.value});
  };

  handleLocation = (event) => {
    this.setState({location: event.target.value});
  }

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
      <IconButton className="edit_button" aria-label="delete" size="small" onClick={() => {this.setState({ showForm: false }); this.props.edit()}}>
        <EditIcon />
      </IconButton>
      </Tooltip>
      <Box borderRadius={16} {...propsForDisplay}>
          {this.props.children}
          <div className="show_activity">
            {this.state.name}. {/*Risque : {this.state.risk} */}
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
            <Grid container spacing={1} justify="center" className="form_activity_grid">
                  <Grid item className="grid_name_activity">
                      <TextField id="outlined-basic" size="small" style={{width: 180}} label="Activity name" variant="outlined" defaultValue={this.state.name} onChange={this.handleNameField} />
                  </Grid>
                  <Grid container spacing={1} justify="center" className="form_inner_grid">
                      <Grid item>
                          <TextField id="outlined-basic" style={{width: 90}} type="number" InputLabelProps={{shrink: true,}} 
                          InputProps={{inputProps: { 
                            max: 100, min: 0 }}} label="hours" variant="outlined" defaultValue={this.state.heures} onChange={this.handleHours} />
                      </Grid>
                      <Grid item>
                          <TextField id="outlined-basic" style={{width: 90}} type="number" InputLabelProps={{shrink: true,}} 
                          InputProps={{inputProps: { 
                            max: 100, min: 0 }}} label="minutes" variant="outlined" defaultValue={this.state.minutes} onChange={this.handleMinutes} />
                      </Grid>
                      <Grid item>
                      <FormControl className={classes.formControl}>
                          <InputLabel id="demo-simple-select-label">Location</InputLabel>
                          <Select
                            native 
                            id="demo-simple-select"
                            value={this.state.location}
                            onChange={this.handleLocation}
                            label="Endroit"
                          >
                            <option value="indoors">Indoors</option>
                            <option value="outdoors">Outdoors</option>
                            <option value="train">Train with air filtration</option>
                            <option value="car">Moving car, windows opened</option>
                            <option value="plane">Avion</option>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item>
                      <FormControlLabel
                          control={<Checkbox color="primary" checked={this.state.wearMask}
                            onChange={this.handleChange}
                            name="wearMask"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                          />} label="I am wearing a mask" />
                      </Grid>
                      <Grid item>
                        <TextField id="outlined-basic" style={{width: 90}} type="number" InputLabelProps={{shrink: true,}} 
                       InputProps={{inputProps: { 
                        max: 100, min: 0 }}} label="other people" variant="outlined" defaultValue={this.state.nbPeople} onChange={this.handleNbPeople} />
                      </Grid>
                      <Grid item>
                        <TextField id="outlined-basic" style={{width: 90}} type="number" InputLabelProps={{shrink: true,}}
                        InputProps={{inputProps: { 
                          max: this.state.nbPeople, min: 0 }}} label="other masks" variant="outlined" defaultValue={this.state.nbMasked} onChange={this.handleNbMasked} />
                      </Grid>
                      <Grid item>
                      <FormControl className={classes.formControl}>
                          <InputLabel id="demo-simple-select-label">Conversation</InputLabel>
                          <Select
                            native 
                            id="demo-simple-select"
                            value={this.state.talking}
                            onChange={this.handleTalking}
                            label="Nb people"
                          >
                            <option value="quiet">No talking</option>
                            <option value="normal">Normal</option>
                            <option value="loud">Loud</option>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item>
                      <FormControl className={classes.formControl}>
                          <InputLabel id="demo-simple-select-label">Distance</InputLabel>
                          <Select
                            native 
                            style={{width: 90}}
                            id="demo-simple-select"
                            value={this.state.distance}
                            onChange={this.handleDistance}
                            label="Nb people"
                          >
                            <option value="close">Close (&le;30cm)</option>
                            <option value="normal">Normal (1m)</option>
                            <option value="long">Long (2m)</option>
                            <option value="veryLong">Very long (&ge;3m)</option>
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
                            <option value="average">Standard</option>
                            <option value="worker">Frontline worker / active social life</option>
                            <option value="nonWorker">Work from home and careful social life</option>
                          </Select>
                        </FormControl>
                      </Grid>
                  </Grid>
            </Grid>
            <br/>
            <div className={classes.root}>
            <Button
                variant="outlined"
                color="primary"
                onClick={() => {this.setState({ showForm: true }); this.setActivityRisk()}}
              >
                {" "}
                Submit
              </Button>
            </div>
      </Box>
      </div>
    )
  }

  render() {
    return (
      <div className="riskForm_container">
          {this.state.showForm ? this.showForm() : this.showCreator()}
      </div>
    )
  }
}

export default withStyles(styles)(RiskFormEng);
