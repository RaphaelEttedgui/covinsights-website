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
                <div className="calculator_introduction">
                <span style={{fontWeight:"bold", fontSize:'1.4em'}}>Family gathering simulator</span>
                <br/>
                <div style={{marginTop:"1rem", textAlign:"left"}} >
                <ul style={{listStylePosition: 'inside', margin:'15px'}}>
                    <li> Import your risk from the calculator;</li>
                    <li> Add the other members of the gathering;</li>
                    <li> Enter informations about the reunion.</li>
                </ul>
                </div>
                </div>
            </div>
            <GatheringEng globalRisk={this.props.globalRisk} />
            </div>
        )
    }
}

export default FamilyGathering;