import React, {Component} from "react";
import GatheringEng from "../components/FamilyGathering/GathererEng.js";
import { Helmet } from 'react-helmet'

class FamilyGathering extends Component{


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
                <span style={{fontWeight:"bold"}}>Is my family gathering dangerous ?</span>
                <br/>
                <div style={{marginTop:"1rem"}}>
                Import your risk profile from the calculator, and enter the members of the family reunion.
                What will be the outcome for the whole country if all reunions are the same as yours ?
                </div>          
                </div>         
            </div>
            <GatheringEng globalRisk={this.props.globalRisk} />
            </div>
        )
    }
}

export default FamilyGathering;