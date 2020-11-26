import React, { Component } from "react"
import PersonCard from "./PersonCard.js"
import Fab from "@material-ui/core/Fab"
import Grid from "@material-ui/core/Grid"
import AddIcon from "@material-ui/icons/Add"
import Box from "@material-ui/core/Box"
import Chip from '@material-ui/core/Chip';
import CachedIcon from '@material-ui/icons/Cached';
import { IconButton, Button } from "@material-ui/core"
import Tooltip from '@material-ui/core/Tooltip';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import { withStyles } from "@material-ui/core/styles";
import list_activities from '../constants/activities.js';
import FaceIcon from '@material-ui/icons/Face';

class Gathering extends Component{
    constructor(props){
        super(props);
        this.state={people:{}, peopleCards:[], nextId:0, toggleResult:false}
        this.defaultPersonArgs = {
            name:"Bobby",
            age: 20,
            gender: "ND",
            risk:0,
        }
    }

    componentDidMount = () => {
        this.addPerson(this.defaultPersonArgs);
    }

    addPerson = (args) => {
        const myId = this.state.nextId;
        const myNewCard = (
            <Grid item className="person_list">
                <PersonCard id={myId} showForm={true} updatePerson={this.updatePerson} delete={this.clear} {...args} />
            </Grid>
          )
        this.setState({ nextId: this.state.nextId + 1 });
        var myCards = this.state.peopleCards.slice();
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

    render = () => {
        return (
            <div id="Gatherer_container">
                {this.state.peopleCards}
            </div>
        )
    }
}

export default Gathering;