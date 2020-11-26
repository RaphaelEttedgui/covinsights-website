import React, {Component} from "react";
import Gathering from "../components/FamilyGathering/Gatherer.js";

class FamilyGathering extends Component{

    constructor(props){
        super(props);
    }


    render = () => {
        return (
            <div>
            <div className="family_presentation">
                <h2>
                 Bienvenue dans le simulateur de réunion familiale !
                </h2>
            </div>
            <Gathering globalRisk={this.props.globalRisk} />
            </div>
        )
    }
}

export default FamilyGathering;