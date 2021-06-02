import React, {Component } from "react"
import Box from "@material-ui/core/Box"
import List from "@material-ui/core/List"
import Listitem from "@material-ui/core/ListItem"
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid'
import {ReactComponent as ML} from "../../images/limit_mai_linh.svg"
import Evolution from "../Calculator/BasicEvolution.js"
import { BasicUniverse } from "../Calculator/NewMath";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


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

const propsForDisplay = {
  bgcolor: "#F6F6F6",
  borderColor: "text.primary",
  m: "auto",
  border: 0,
  style: { width: "80%", height: "100%" },
  boxShadow: 3,
  mx: "auto",
  p: "1rem",
  position:"relative",
  bottom:"2rem"
}

class ProfileCard extends Component {
    constructor(props)
    {
        super(props)
        this.myRef = React.createRef();
        this.state = {
          show: "activités",
          value: 0,
          universe: new BasicUniverse(),
          riskFactor: 0.435,
          evolution:()=><Evolution risk={0.04}/>
          }
    }

    handleChange = (event, newValue) => {
      if(newValue==0){
        this.setState({show:"activités", value:newValue});
      }
      else{
        this.setState({show:"impact", value:newValue})
      }
    }

  generateActivities = () => {
    return(
      <div>
      <List>
        <Listitem>Théâtre (intérieur, avec masque) (x1)</Listitem>
        <Listitem>Repas à 5 avec ses collègues (intérieur, avec masques) (x1)</Listitem>
        <Listitem>Dîner à 2 (intérieur, sans masque, 2h, ami prudent)</Listitem>
        <Listitem>Travail en open space (avec masque, 5 jours)</Listitem>
        <Listitem>Faire ses courses (30mn, avec masque) (x2)</Listitem>
        <Listitem>Transports en commun (1h, avec masque) (x5)</Listitem>
      </List>
      </div>
    )
  }

  generateImpact = () => {
    return(
      <div style={{marginTop:"1em"}}>
        <Evolution riskFactor={this.state.riskFactor}/>
      </div>
    )
  }

  showProfile = () => {
    var risk = this.state.riskFactor * this.state.universe.prevalence;
    return (
      <div className="profile_container">
      <Box borderRadius={16} {...propsForDisplay}>
      <div style={{textAlign:"center", marginBottom:'0.5em', fontSize:'1.5em', fontWeight:"500", borderStyle:"solid", borderWidth:"thin", padding:"0.5em"}}>
        Limit Linh
        </div>
          <Grid container spacing={1} justify="center" style={{height:"70"}}>
            <Grid item xs={12} sm={4}>
            <div className="svg_container">
                <svg style={{width:"100%", height:"100%",display:"block", margin:"auto"}}>
                  <ML style={{display:"block", margin:"auto", height:"90%"}}/>
                </svg>
            </div>
            </Grid>
            <Grid item xs={12} sm={8}>
            <div style={{textAlign:"center", fontWeight:"500"}}>
                <Tabs value={this.state.value} onChange={this.handleChange} indicatorColor="primary" aria-label="simple tabs example">
                  <Tab label="activités" />
                  <Tab label="impact" />
                </Tabs>
                </div>
               {(this.state.show=="activités") ? this.generateActivities() : this.generateImpact()}

            </Grid>
          </Grid>

        <div style={{marginTop:"1em", fontSize:"1.4em", fontWeight:"500", textAlign:"center", width:"100%"}}>
        Risque total : {Math.round((risk * 10000 + Number.EPSILON)) / 100} % par semaine, {Math.round(((1-Math.pow(1-risk, 12)) * 10000 + Number.EPSILON)) / 100} % sur 3 mois.
        </div>

        
      </Box>
      </div>
    )
  }

  render() {
    return (
      <div className="risk_calculator">
          {this.showProfile()}
      </div>
    )
  }
}

export default withStyles(styles)(ProfileCard);
