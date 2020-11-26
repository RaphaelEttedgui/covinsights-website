import React, { Component } from "react"
import PersonCard from "./PersonCard.js"
import Fab from "@material-ui/core/Fab"
import Grid from "@material-ui/core/Grid"
import AddIcon from "@material-ui/icons/Add"
import Box from "@material-ui/core/Box"
import Chip from '@material-ui/core/Chip';
import CachedIcon from '@material-ui/icons/Cached';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import { withStyles } from "@material-ui/core/styles";
import profiles from '../constants/profiles.js';
import FaceIcon from '@material-ui/icons/Face';
import InteractionOne from '../Calculator/MyMath.js'

/*
**********
** TODO **
**********

Ajouter des cases pour le type de réunion familiale (une ligne en bas)
-> masque ou non, intérieur/extérieur, 
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

class Gathering extends Component{
    constructor(props){
        super(props);
        // globalRisk contains the person Risk derived from the calculator.
        this.state={people:{}, peopleCards:[], nextId:0, toggleResult:false, globalRisk:0,
        masks:false, outdoors:false, talking:"normal", distance:"normal"}
        this.defaultPersonArgs = {
            name:"Bobby",
            age: 20,
            gender: "ND",
            risk:0,
        }
    }

    componentDidMount = () => {
        console.log(this.props.globalRisk);
        this.addPerson(this.defaultPersonArgs);
    }

    // We only add the card, the person is added on submit.
    addPerson = (args) => {
        const myId = this.state.nextId;
        const myNewCard = (
            <Grid item className="person_list">
                <PersonCard id={myId} showForm={false} updatePerson={this.updatePerson} delete={this.clear} {...args} />
            </Grid>
          )
        this.setState({ nextId: this.state.nextId + 1 });
        var myCards = this.state.peopleCards.slice();
        myCards.push(myNewCard);
        this.setState({ peopleCards:myCards });
    }

    // For a premade, we directly enter the person
    addPremadePerson = (args) => {
        const myId = this.state.nextId;
        const myNewCard = (
            <Grid item className="person_list">
                <PersonCard id={myId} showForm={true} updatePerson={this.updatePerson} delete={this.clear} {...args} />
            </Grid>
          )
        this.setState({ nextId: this.state.nextId + 1 });
        var myCards = this.state.peopleCards.slice();
        var myPeople = this.state.people;
        myPeople[myId] = [args.age, args.gender, args.risk]
        myCards.push(myNewCard);
        this.setState({ peopleCards:myCards });
    }

    clear = id => {
        // Updating the cards and the people.
        var myCards = this.state.peopleCards.slice();
        var myPeople = this.state.people;
        myCards[id] = <div />
        delete myPeople[id];
        this.setState({ peopleCards: myCards, people:myPeople})
    }

    clearAll = () => {
        this.setState({ nextId: 0, peopleCards: [], people:{}, toggleResult:false });
    }

    // Called by the children on mount and submit
    updatePerson = (id, age, gender, risk) => {
        var myPeople = this.state.people;
        myPeople[id] = [age, gender, risk];
        this.setState({people:myPeople});
      }

    generatePremadeCards = () => {
    const { classes } = this.props;
    return (
        <div id="premade_cards" className={classes.root}>
            {profiles.map((item, index) => {
            return (
                    <Chip icon={<FaceIcon />} label={item.name} clickable onClick={() => {this.addPremadePerson(item)}} />
            )
            })}
        </div>
    )
    }

    computeResult = () => {
        console.log(this.state.people);
    }

    render = () => {
        return (
        <div id="Gatherer_container">
         <Grid container spacing={1} justify="center" alignitems="center">
                {this.state.peopleCards}
        </Grid>
            <div className="addActivity_buttons">
            <Box pt="1rem" justify="right" m="auto">
            <Grid container spacing={1}   alignItems="center" justify="center">
                <Grid item>
                <Fab
                    onClick={() => {this.addPerson(this.defaultActivityArgs)}}
                    color="primary"
                    variant="extended"
                >
                    <AddIcon />
                    <Box p="0.5rem">Personne</Box>
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
            <Grid container spacing={1}   alignItems="center" justify="center">
                <Grid item>
                <Fab
                    onClick={() => {this.toggleResult(); this.computeResult()}}
                    variant="extended"
                >
                    <TouchAppIcon />
                    <Box p="0.5rem">Calculer le bilan</Box>
                </Fab>
                </Grid>
            </Grid>
            </Box>
            <div id="premade_profiles">
                {this.generatePremadeCards()}
            </div>
            </div>
        </div>
        )
    }
}

export default withStyles(styles)(Gathering);