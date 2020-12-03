import React, {Component} from "react";
import GatheringEng from "../components/FamilyGathering/GathererEng.js";
import { Helmet } from 'react-helmet'

class FamilyGathering extends Component{

    constructor(props){
        super(props);
    }


    render = () => {
        return (
            <div>
            <Helmet>
                <title>
                Family Gathering
                </title>
            </Helmet>                    
            <div className="family_presentation">
                <h2>
                 Welcome to the family gathering simulator !
                </h2>
            </div>
            <GatheringEng globalRisk={this.props.globalRisk} />
            </div>
        )
    }
}

export default FamilyGathering;