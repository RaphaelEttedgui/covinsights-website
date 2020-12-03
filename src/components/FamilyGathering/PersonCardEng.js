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
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from "@material-ui/icons/Delete"
import {InteractionCrowd, Activity, BasicUniverse, RiskProfile, WorkerRiskProfile, NonWorkerRiskProfile} from '../Calculator/MyMath.js';

const propsForForm = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  m: "auto",
  border: 0,
  style: { width: "18rem", height: "13rem" },
  boxShadow: 3,
  mx: "auto",
  pl: "1rem",
  pr: "2rem",
  pt: "0rem",
}

const propsForDisplay = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  m: "auto",
  border: 0,
  style: { width: "14rem", height: "5rem" },
  boxShadow: 3,
  mx: "auto",
  px: "1rem",
}

class PersonCardEng extends Component {
  state = {
    showForm: this.props.showForm,
    id: this.props.id,
    name: this.props.name,
    gender: this.props.gender,
    age: this.props.age,
    risk : this.props.risk,
    activityRisk : 0,
    universe: new BasicUniverse(),
  }

  handleNameField = (e) => {
    this.setState({name: e.target.value});
  }

  handleGender = (e) => {
      this.setState({gender:e.target.value});
  }

  handleAge = (e) => {
      this.setState({age:Number(e.target.value)});
  }

  handleRisk = (e) => {
      this.setState({risk:Number(e.target.value)});
  }

  showForm = () => {
    return (
        <Box borderRadius={16} {...propsForDisplay}>
            <Tooltip title="Modifier">
            <IconButton className="person_edit_button" aria-label="modify" size="small" onClick={() => this.setState({ showForm: false })}>
            <EditIcon />
            </IconButton>
            </Tooltip>
            <div className="person_delete_button_show">
                <Tooltip title="Supprimer">
                <IconButton z-index={5000} aria-label="delete" size="small" onClick={() => this.props.delete(this.state.id)}>
                <DeleteIcon />
                </IconButton>
                </Tooltip>
            </div>
            <div className="show_name_person">
                    <span className="person_name_inner">
                    {this.state.name}.
                    </span>
            </div>
        </Box>
    )
  }

  showCreator = () => {
    return (
        <Box borderRadius={16} {...propsForForm}>
        <div className="person_delete_button_creator">
                <Tooltip title="Delete">
                <IconButton z-index={5000} aria-label="delete" size="small" onClick={() => this.props.delete(this.state.id)}>
                <DeleteIcon />
                </IconButton>
                </Tooltip>
        </div>
        <Grid container spacing={1} justify="center" className="form_activity_grid">
                <Grid item className="grid_name_activity">
                  <TextField id="outlined-basic" size="small" style={{width: 180}} label="Name" variant="outlined" defaultValue={this.state.name} onChange={this.handleNameField} />
                </Grid>
        </Grid>
        <Grid container spacing={1} justify="center" className="form_inner_grid">
                <Grid item>
                          <TextField id="outlined-basic" style={{width: 70}} type="number" InputLabelProps={{shrink: true,}} label="Age" variant="outlined" defaultValue={this.state.age} onChange={this.handleAge} />
                </Grid>
                <Grid item>
                    <FormControl variant="outlined">
                        <InputLabel id="sexe-label" left='5px'>Gender</InputLabel>
                        <Select
                        native 
                        labelId="sexe-label"
                        label="Gender"
                        variant="outlined"
                        id="demo-simple-select"
                        value={this.state.gender}
                        onChange={this.handleGender}
                        >
                        <option value="F">F</option>
                        <option value="M">M</option>
                        <option value="ND">ND</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                          <TextField id="outlined-basic" style={{width: 70}} type="number" label="Risk(%)" variant="outlined" defaultValue={this.state.risk} onChange={this.handleRisk} />
                </Grid>
                <Grid item>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {this.setState({ showForm: true });
                        this.props.updatePerson(this.state.id, this.state.age, this.state.gender, this.state.risk)}}
                    >
                        {" "}
                        Submit
                    </Button>
                </Grid>
        </Grid>
  </Box>
      )
  }

  render() {
    return (
      <div className="personCard_container">
          {this.state.showForm ? this.showForm() : this.showCreator()}
      </div>
    )
  }
}


export default PersonCardEng;
