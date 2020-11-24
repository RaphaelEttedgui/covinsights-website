import React, { Component } from "react"
import Switch from "@material-ui/core/Switch"
import Box from "@material-ui/core/Box"
import { IconButton, Button } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import EditIcon from '@material-ui/icons/Edit'

const defaultProps = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  m: "auto",
  border: 0,
  style: { width: "20rem", height: "10rem" },
  boxShadow: 3,
  mx: "auto",
  p: "1rem",
}

class RiskForm extends Component {
  state = {
    id: this.props.id,
    name: this.props.name,
    showForm: this.props.showForm,
    wearMask: this.props.wearMask,
    nbPeople: this.props.nbPeople,
    maskProportion: this.props.maskProportion,
    outdoors: this.props.outdoors,
    talking: this.props.talking,
    distance: this.props.distance,
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.checked })
  }

  showForm = () => {
    return (
      <div>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            WearMask : {this.state.wearMask === true ? "True" : "False"}
          </Grid>
          <Grid item>
            <IconButton aria-label="delete" onClick={() => this.setState({ showForm: false })}>
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    )
  }

  showCreator = () => {
    return (
      <div>
        <Switch
          checked={this.state.wearMask}
          onChange={this.handleChange}
          name="wearMask"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={() => this.setState({ showForm: true })}
        >
          {" "}
          Submit
        </Button>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h1>Activity {this.state.id}</h1>
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
export default RiskForm
