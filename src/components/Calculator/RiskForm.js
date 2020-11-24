import React, { Children, Component } from "react"
import Checkbox from '@material-ui/core/Checkbox';
import Box from "@material-ui/core/Box"
import { IconButton, Button } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import EditIcon from '@material-ui/icons/Edit'
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
  style: { width: "15rem", height: "10rem" },
  boxShadow: 3,
  mx: "auto",
  px: "1rem",
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
      <div className="risk_form">
      <Box borderRadius={16} {...propsForDisplay}>
          {this.props.children}
          <IconButton className="edit_button" aria-label="delete" onClick={() => this.setState({ showForm: false })}>
                <EditIcon />
          </IconButton>
          <Grid container spacing={2} alignItems="center">
            < Grid item>
              WearMask : {this.state.wearMask === true ? "True" : "False"}
            </Grid>
        </Grid>
      </Box>
      </div>
    )
  }

  showCreator = () => {
    return (
      <div className="risk_form_creator">
      <Box borderRadius={16} {...propsForForm}>
          {this.props.children}
            <Grid container spacing={1}>
                  <Grid item>
                      <TextField id="outlined-basic" label="Activity Name" variant="outlined" />
                  </Grid>
                  <Grid item>
                  <FormControlLabel
                      control={<Checkbox checked={this.state.wearMask}
                        onChange={this.handleChange}
                        name="wearMask"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />} label="Are you wearing a mask ?" />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => this.setState({ showForm: true })}
                    >
                      {" "}
                      Submit
                    </Button>
                  </Grid>
                  <Grid item>

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
export default RiskForm
