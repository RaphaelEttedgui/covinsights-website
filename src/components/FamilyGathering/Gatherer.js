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
import {InteractionOne, BasicUniverse} from '../Calculator/MyMath.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

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
        this.state={people:{}, peopleCards:[], nextId:0, toggleResult:false, result:[], globalRisk:0,
        masks:false, outdoors:false, duration:300, talking:"normal", distance:"normal", universe:new BasicUniverse()}
        this.defaultPersonArgs = {
            name:"Bobby",
            age: 20,
            gender: "ND",
            risk:0,
        };
        this.refResult = React.createRef();
    }

    componentDidMount = () => {
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
        var ageFactors = this.state.universe.ageFactors(args.age, args.gender);
        myPeople[myId] = [ageFactors, args.risk];
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
        var ageFactors = this.state.universe.ageFactors(age, gender);
        myPeople[id] = [ageFactors, risk];
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

    toggleResult = () => {
        this.setState({toggleResult:true});
    }

    // Compute the probability that someone is hospitalized, goes to ICU, and dies.
    computeResult = () => {
        /*
		Formulas :
		- Mean number of people hospitalized : sum(p_hosp)
        - Probability that at least one person is hospitalized : 1 - prod(1-p_hosp)
        - Attention, les risques sont entrés par les gens sous forme de pourcentages !!
		*/
		var risk = 1.0;
		var hospRisk = 1.0;
		var reaRisk = 1.0;
		var deathRisk = 1.0;
		var moyenneHosp = 0.0;
		var moyenneRea = 0.0;
		var moyenneDeaths = 0.0;
        var i;
        var interaction = new InteractionOne("Family gathering", this.state.duration, this.state.masks, this.state.masks,
            this.state.talking, this.state.outdoors, this.state.distance);
        var interactionRisk = interaction.getActivityRisk();
        // Using the risk from the calculator.
        // We only compute the risk for his family.
        risk = risk *(1-this.props.globalRisk);
		for(var key in this.state.people){
            // The risk passed by the person via the simulator.
			var myRisk = this.state.people[key][1] / 100
			// We update the probability that no-one has the disease
            risk = risk * (1-myRisk);
            console.log(this.state.people[key])
			for(var current in this.state.people){
                if(current != key){
                    // Updating the risk for person i by taking into account the possible
				    // contamination by person j.
				    myRisk = myRisk + (1-myRisk)*interactionRisk*this.state.people[current][1]/100;
                }
            }
            myRisk = myRisk + (1-myRisk)*interactionRisk*this.props.globalRisk;
			var hospProba = this.state.people[key][0][0]
			var reaProba = this.state.people[key][0][1]
			var deathProba = this.state.people[key][0][2]
			// Updating the proba that no-one gets hospitalized
			hospRisk = hospRisk * (1 - myRisk*hospProba);
			reaRisk = reaRisk * (1 - myRisk*hospProba*reaProba)
			deathRisk = deathRisk  *(1 - myRisk*hospProba*deathProba)
			// Updating the average number of hospitalizations
			moyenneHosp = moyenneHosp + myRisk*hospProba
			moyenneRea = moyenneRea + myRisk*hospProba*reaProba
			moyenneDeaths = moyenneDeaths + myRisk*hospProba*deathProba
		}
		risk = 1-risk;
		hospRisk = 1-hospRisk;
		reaRisk = 1-reaRisk;
        deathRisk = 1-deathRisk;
        console.log([risk, hospRisk, reaRisk, deathRisk, moyenneHosp, moyenneRea, moyenneDeaths]);
        var res = 
		this.setState({result:[risk, hospRisk, reaRisk, deathRisk, moyenneHosp, moyenneRea, moyenneDeaths]});
    }

    showResult = () => {
        this.refResult.current.scrollIntoView();
        const result = this.state.result;
        const pop_restante = 66000000 * 0.85; // 66millions moins les environ 15% déjà infectés.
        const nb_over_70 = pop_restante * 0.14; // 14% de la population a plus de 70 ans.
        const nb_christmas = nb_over_70 / 20; // On estime qu'un sur 20 environ ira à une fête de Noël.
        return (
        <div id ="family_result">
        <Box pt="1rem" justify="right" m="auto">
            <List>
                <ListItem> Probabilité qu'une personne au moins ait le covid : {Math.round(result[0] * 100)}%. </ListItem>
                <ListItem> Probabilité qu'une personne soit hospitalisée : {Math.round(result[1]*100)}%. Bilan :
                {Math.round(result[4]*nb_christmas)} hospitalisations supplémentaires à l'échelle de la France.</ListItem>
                <ListItem>Probabilité qu'une personne aille en réa : {Math.round(result[2]*100)}%.
                Bilan : {Math.round(result[5]*nb_christmas)} réas supplémentaires à l'échelle de la France.</ListItem>
                <ListItem>Probabilité qu'une personne meure : {Math.round(result[3]*100)}%.
                Bilan : {Math.round(result[6]*nb_christmas)} morts supplémentaires à l'échelle de la France.</ListItem>
            </List>
        </Box>
      </div>
      )

    }

    render = () => {
        return (
        <div id="Gatherer_container">
         <Grid container spacing={1} justify="center" alignitems="center">
                {this.state.peopleCards}
        </Grid>
            <div className="addActivity_buttons">
            <Box pt="1rem" justify="right" m="auto">
            <Grid container spacing={1} alignItems="center" justify="center">
                <Grid item>
                <Fab
                    onClick={() => {this.addPerson(this.defaultPersonArgs)}}
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
            </div>
            <div id="premade_profiles">
                {this.generatePremadeCards()}
            </div>  
            
            <div ref={this.refResult}>
            {this.state.toggleResult && this.showResult()}
            </div>
        </div>
        )
    }
}

export default withStyles(styles)(Gathering);