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
import {InteractionOne, BasicUniverse} from '../Calculator/NewMath.js';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from '@material-ui/core/Checkbox';

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
        this.state={people:{}, peopleCards:[], nextId:0, toggleResult:false, result:[],
        masks:false, location:"indoors", duration:300, hours:5, minutes:0, talking:"normal", distance:"normal", universe:new BasicUniverse(), 
        globalRisk:(isNaN(this.props.globalRisk)? 0:this.props.globalRisk)}
        this.defaultPersonArgs = {
            name:"Personne lambda",
            age: 35,
            gender: "ND",
            risk:this.state.universe.prevalence*100,
        };
        this.refResult = React.createRef();
    }

    componentDidUpdate = () => {
        if(this.state.toggleResult){
            this.refResult.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    // We only add the card, the person is added on submit.
    addPerson = (args) => {
        const myId = this.state.nextId;
        const myNewCard = (
            <Grid item className="activity_list">
                <PersonCard id={myId} showForm={false} updatePerson={this.updatePerson} delete={() => {this.clear(myId); this.toggleOffResult()}} {...args}>
                    <div className="delete_button">
                    <Tooltip title="Supprimer">
                    <IconButton aria-label="delete" size="small" onClick={() => {this.clear(myId); this.toggleOffResult()}}>
                    <DeleteIcon />
                    </IconButton>
                    </Tooltip>
                    </div>
                </PersonCard>
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
            <Grid item className="activity_list">
                <PersonCard id={myId} showForm={false} updatePerson={this.updatePerson} delete={() => {this.clear(myId); this.toggleOffResult()}} {...args}>
                    <div className="delete_button">
                    <Tooltip title="Supprimer">
                    <IconButton aria-label="delete" size="small" onClick={() => {this.clear(myId); this.toggleOffResult()}}>
                    <DeleteIcon />
                    </IconButton>
                    </Tooltip>
                    </div>
                </PersonCard>
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
        this.toggleOffResult();
      }

    generatePremadeCards = () => {
    profiles.sort((a, b) => (a.name > b.name) ? 1 : -1);
    const { classes } = this.props;
    return (
        <div id="premade_cards" className={classes.root}>
            {profiles.map((item, index) => {
            return (
                    <Chip icon={<FaceIcon />} label={item.name} clickable onClick={() => {this.addPremadePerson(item); this.toggleOffResult()}} />
            )
            })}
        </div>
    )
    }

    toggleResult = () => {
        this.setState({toggleResult:true});
    }

    toggleOffResult = () => {
        this.setState({toggleResult:false});
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

        var myDuration = 60*this.state.hours + this.state.minutes;
        this.setState({duration:myDuration});
        var interaction = new InteractionOne("Family gathering", myDuration, this.state.masks, this.state.masks,
            this.state.talking, this.state.outdoors, this.state.distance);
        var interactionRisk = interaction.getActivityRisk();
        // Using the risk from the calculator.
        // We only compute the risk for his family.
        risk = risk *(1-this.state.globalRisk);
		for(var key in this.state.people){
            // The risk passed by the person via the simulator.
			var myRisk = this.state.people[key][1] / 100
			// We update the probability that no-one has the disease
            risk = risk * (1-myRisk);
			for(var current in this.state.people){
                if(current != key){
                    // Updating the risk for person i by taking into account the possible
				    // contamination by person j.
				    myRisk = myRisk + (1-myRisk)*interactionRisk*this.state.people[current][1]/100;
                }
            }
            myRisk = myRisk + (1-myRisk)*interactionRisk*this.state.globalRisk;
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
        var res = 
        this.setState({result:[risk, hospRisk, reaRisk, deathRisk, moyenneHosp, moyenneRea, moyenneDeaths]});
    }

    showResult = () => {
        const result = this.state.result;
        var nb_christmas = 7000000; // Voir white paper
        return (
        <div>
        <div id ="family_result" ref={this.refResult}>
        <Box pt="1rem" justify="right" m="auto">
            <span style={{fontWeight:"bold"}}>Bilan sur la France si toutes les réunions sont semblables :</span> <br /> <br/>
            <div className="visible_except_mobile">
            <Grid container spacing={3}>
                <Grid item xs={4}>
                <div className="result_cases">
                    <div className="result_cases_top">
                        {Math.round(result[4]*nb_christmas)}
                    </div>
                    <div className="result_cases_bottom">
                        hospitalisations
                    </div>
                </div>
                </Grid>
                <Grid item xs={4}>
                <div className="result_cases">
                    <div className="result_cases_top">
                    {Math.round(result[5]*nb_christmas)}
                    </div>
                    <div className="result_cases_bottom">
                    réanimations
                    </div>
                </div>
                </Grid>
                <Grid item xs={4}>
                <div className="result_cases">
                    <div className="result_cases_top">
                    {Math.round(result[6]*nb_christmas)}
                    </div>
                    <div className="result_cases_bottom">
                    morts
                    </div>
                </div>
                </Grid>
            </Grid>
            </div>
            <div className="visible_mobile_only">
            <Grid container spacing={1}>
                <Grid item xs={12}>
                <div className="result_cases">
                    <div className="result_cases_top">
                        {Math.round(result[4]*nb_christmas)}
                    </div>
                    <div className="result_cases_bottom">
                        hospitalisations
                    </div>
                </div>
                </Grid>
                <Grid item xs={12}>
                <div className="result_cases">
                    <div className="result_cases_top">
                    {Math.round(result[5]*nb_christmas)}
                    </div>
                    <div className="result_cases_bottom">
                    réas
                    </div>
                </div>
                </Grid>
                <Grid item xs={12}>
                <div className="result_cases">
                    <div className="result_cases_top">
                    {Math.round(result[6]*nb_christmas)}
                    </div>
                    <div className="result_cases_bottom">
                    morts
                    </div>
                </div>
                </Grid>
            </Grid>
            </div>
        </Box>
      </div>
        <div className="explanation_test">
        Ces estimations sont génériques et ne prennent pas en compte d'éventuels problèmes de santé chez des membres de votre famille. <br/>
        Pour alléger le bilan, vous pouvez effectuer des jours de quarantaine avant les fêtes, raccourcir les réunions, et réduire les activités à risque.
        </div>
    </div>
      )

    }

    handleGlobalRisk = (event) => {
        this.setState({globalRisk: Number(event.target.value)/100});
    }

    handleHours = (event) => {
        this.setState({hours: Number(event.target.value)});
    }
    
    handleMinutes = (event) => {
        this.setState({minutes:Number(event.target.value)});
    }

    handleMasks = (event) => {
        this.setState({masks:event.target.checked});
    }

    showMyRisk = () => {
        return (
            <div className="showMyRisk">
            <Box pt="1rem" justify="right" m="auto">
            <Grid container spacing={1} alignItems="center" justify="center">
                <Grid item>
                Entrez votre risque :
                </Grid>
                <Grid item><TextField id="outlined-basic" style={{width: 70}} type="number"
			InputLabelProps={{shrink: true,}} label="Risque" variant="outlined" defaultValue={Math.round(this.state.globalRisk*10000)/100} onChange={this.handleGlobalRisk} />
                </Grid>
                <Grid item>
                %. (Prévalence actuelle : {Math.round(this.state.universe.prevalence * 100000)/1000}%)
                </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center" justify="center">
                <Grid item>
                Durée:
                </Grid>
                <Grid item><TextField id="outlined-basic" style={{width: 70}} type="number"
			InputLabelProps={{shrink: true,}} InputProps={{inputProps: { 
                max: 100, min: 0 }}} label=""  defaultValue={this.state.hours} onChange={this.handleHours} />
                </Grid>
                <Grid item>
                 heures 
                </Grid>
                <Grid item><TextField id="outlined-basic" style={{width: 70}} type="number"
			InputLabelProps={{shrink: true,}} InputProps={{inputProps: { 
                max: 100, min: 0 }}} label=""  defaultValue={this.state.minutes} onChange={this.handleMinutes} />
                </Grid>
                <Grid item>
                minutes.
                </Grid>
                <Grid item>
                    Masques :
                </Grid>
                <Grid item>
                    <Checkbox checked={this.state.masks} onChange={this.handleMasks} />
                </Grid>
            </Grid>
            </Box>
            </div>            
        )
    }

    render = () => {
        return (
        <div className="risk_calculator">
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
                <Fab onClick={() => {this.clearAll(); this.toggleOffResult();}} color="secondary" variant="extended">
                    <CachedIcon />
                    <Box p="0.5rem">Reset</Box>
                </Fab>
                </Grid>
            </Grid>
            </Box>
            </div>
            <div className="addActivity_buttons">
            <Box pt="1rem" justify="right" m="auto">
            <Grid container spacing={1} alignItems="center" justify="center">
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
            {this.showMyRisk()}
            <div id="premade_activities">
            <h4>Exemples de profils (cliquez pour ajouter):</h4>
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