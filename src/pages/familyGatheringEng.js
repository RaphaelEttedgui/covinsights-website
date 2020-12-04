import React, {Component} from "react";
import GatheringEng from "../components/FamilyGathering/GathererEng.js";
import { Helmet } from 'react-helmet'
import {BasicUniverse} from '../components/Calculator/NewMath.js'

class FamilyGathering extends Component{

    constructor(props){
        super(props);
        this.state = {universe:new BasicUniverse()}
    }


    render = () => {
        return (
            <div>
            <Helmet>
                <title>
                Family Gathering
                </title>
            </Helmet>                    
            <div className="calculator_presentation">
                <h2>
                 Welcome to the family gathering simulator !
                </h2>
                <div className="calculator_introduction">
                Enter the participants to the gathering by clicking on "Person" or one of the premade profiles. You can
                also enter your precise risk profile in the calculator, then import it here.
                <br/>
                As a basis for comparison, the prevalence is currently around {Math.round(this.state.universe.prevalence * 10000) /100} %
                <br />
                You can then compute the outcome for France if everyone does the same kind of family reunion with the same risk profile.
                </div>                
            </div>
            <GatheringEng globalRisk={this.props.globalRisk} />
            </div>
        )
    }
}

export default FamilyGathering;