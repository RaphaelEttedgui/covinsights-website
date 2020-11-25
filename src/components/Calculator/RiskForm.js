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
    heures:Math.floor(this.props.duration/60),
    minutes:this.props.duration % 60,
    universe: new BasicUniverse(),
  }

  setActivityRisk = () => {
    var maskProportion = 0;
    if(this.state.nbMasked === 0)
    {
      maskProportion = 0;
    }
    else{
      maskProportion = this.state.nbPeople / this.state.nbMasked;
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
    var result = Math.round((profile.getProfileRisk()*interaction.getActivityRisk() + Number.EPSILON) * 100) / 100;
    this.setState({risk: result});
    this.props.updateRisk(this.props.id[0], result);
  }

  componentDidMount = () => {
    this.setActivityRisk();
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

  handleHours = (event) => {
    this.setState({heures:Number(event.target.value)})
    this.computeDuration();
  }

  handleMinutes = (event) => {
    this.setState({minutes:Number(event.target.value)});
    this.computeDuration();
  }

  computeDuration = () => {
    this.setState({duration:60*this.state.heures+this.state.minutes});
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
      <Tooltip title="Modifier">
      <IconButton className="edit_button" aria-label="delete" size="small" onClick={() => this.setState({ showForm: false })}>
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
          {this.props.children}
            <Grid container spacing={1} className="form_activity_grid">
                  <Grid item>
                      <TextField id="outlined-basic" size="small" label="Nom de l'activité" variant="outlined" defaultValue={this.state.name} onChange={this.handleNameField} />
                  </Grid>
                  <Grid item>
                      <TextField id="outlined-basic" style={{width: 90}} type="number" InputLabelProps={{shrink: true,}} label="heures" variant="outlined" defaultValue={this.state.heures} onChange={this.handleHours} />
                  </Grid>
                  <Grid item>
                      <TextField id="outlined-basic" style={{width: 90}} type="number" InputLabelProps={{shrink: true,}} label="minutes" variant="outlined" defaultValue={this.state.minutes} onChange={this.handleMinutes} />
                  </Grid>
                  <Grid item>
                  <FormControlLabel
                      control={<Checkbox color="primary" checked={this.state.outdoors}
                        onChange={this.handleChange}
                        name="outdoors"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />} label="Est-ce en extérieur ?" />
                  </Grid>
                  <Grid item>
                  <FormControlLabel
                      control={<Checkbox color="primary" checked={this.state.wearMask}
                        onChange={this.handleChange}
                        name="wearMask"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />} label="Portez-vous un masque ?" />
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
                      <InputLabel id="demo-simple-select-label">Masks</InputLabel>
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
                  <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">Conversation</InputLabel>
                      <Select
                        native 
                        id="demo-simple-select"
                        value={this.state.talking}
                        onChange={this.handleTalking}
                        label="Nb people"
                      >
                        <option value="normal">Normale</option>
                        <option value="quiet">Sans parler</option>
                        <option value="loud">Forte</option>
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
                        <option value="normal">Normale</option>
                        <option value="close">Proche</option>
                        <option value="long">Longue</option>
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
                        <option value="worker">Travailleur de première ligne</option>
                        <option value="nonWorker">Télétravaille</option>
                      </Select>
                    </FormControl>
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
